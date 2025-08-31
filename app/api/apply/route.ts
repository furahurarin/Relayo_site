// app/api/apply/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { z } from "zod";
import { isIP } from "node:net";
import { supabaseAdmin } from "@/lib/supabase";
import { applyRatelimit } from "@/lib/ratelimit";
import { verifyTurnstile } from "@/lib/turnstile";
import { inngest } from "@/lib/inngest";

/** 受信ペイロード（互換のため2系統どちらも許容） */
const SchemaV1 = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10),
  ["cf-turnstile-response"]: z.string().min(10), // Turnstile token
  company: z.string().optional().default(""),
  phone: z.string().optional().default(""),
  hp: z.string().optional().default(""), // 蜜壺
});

const SchemaV2 = z.object({
  name: z.string().min(1),
  company: z.string().optional().default(""),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  detail: z.string().min(10),
  cfToken: z.string().min(10), // Turnstile token
  hp: z.string().optional().default(""), // 蜜壺
});

type Normalized = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  detail: string; // = message
  cfToken: string;
  hp?: string;
};

export async function POST(req: Request) {
  // ---- IP 取得（Header の優先順位を増やす）----
  const forwarded = (req.headers.get("x-forwarded-for") ?? "")
    .split(",")[0]
    ?.trim();
  const cf = (req.headers.get("cf-connecting-ip") ?? "").trim();
  const real = (req.headers.get("x-real-ip") ?? "").trim();

  const ipRaw = (forwarded || cf || real || "").trim();
  const ipForDb = isIP(ipRaw) ? ipRaw : null; // inet に安全な値のみ保存

  // ---- レート制限（本番：Upstash）----
  const { success } = await applyRatelimit.limit(ipRaw || "unknown");
  if (!success) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  // ---- JSON パース ----
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // ---- バリデーション（V1 → V2 の順）----
  let data: Normalized | null = null;

  const v1 = SchemaV1.safeParse(body);
  if (v1.success) {
    data = {
      name: v1.data.name,
      company: v1.data.company,
      email: v1.data.email.toLowerCase().trim(),
      phone: v1.data.phone,
      detail: v1.data.message,
      cfToken: v1.data["cf-turnstile-response"],
      hp: v1.data.hp,
    };
  } else {
    const v2 = SchemaV2.safeParse(body);
    if (v2.success) {
      data = {
        name: v2.data.name,
        company: v2.data.company,
        email: v2.data.email.toLowerCase().trim(),
        phone: v2.data.phone,
        detail: v2.data.detail,
        cfToken: v2.data.cfToken,
        hp: v2.data.hp,
      };
    }
  }

  if (!data) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // ---- 蜜壺（隠しフィールド）----
  if (data.hp && data.hp.trim() !== "") {
    // 反応だけ成功にして終了（実処理はしない）
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // ---- Turnstile 検証 ----
  const human = await verifyTurnstile(data.cfToken, ipRaw || undefined);
  if (!human) {
    return NextResponse.json({ ok: false, error: "bot_detected" }, { status: 400 });
  }

  // ---- UA 収集（任意）----
  const ua = req.headers.get("user-agent") || "";

  // ---- DB 保存（Supabase / service role）----
  try {
    const { data: inserted, error: dbErr } = await supabaseAdmin
      .from("applications")
      .insert([
        {
          name: data.name,
          company: data.company ?? "",
          email: data.email,
          phone: data.phone ?? "",
          detail: data.detail,
          ua,
          ip: ipForDb, // inet 型
          status: "received",
        },
      ])
      .select();

    if (dbErr) {
      // 可能な限り詳細を出して原因特定を早くする
      console.error("[apply] DB insert error:", {
        message: dbErr.message,
        details: (dbErr as any).details,
        hint: (dbErr as any).hint,
        code: dbErr.code,
      });
      return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
    }

    // ---- 非同期処理（メール通知など）----
    const eventPayload = {
      name: data.name,
      email: data.email,
      message: data.detail,
      submittedAt: new Date().toISOString(),
      company: data.company ?? "",
      phone: data.phone ?? "",
      ip: ipRaw || undefined, // ログ用途
      ua,
      id: inserted?.[0]?.id, // 作成レコードIDがあれば付与
    };

    // Inngest 失敗は非致命に
    try {
      await inngest.send({ name: "lead/created", data: eventPayload });
      await inngest.send({ name: "application/received", data: eventPayload });
    } catch (e) {
      console.warn("[apply] inngest send failed (non-fatal)", e);
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    console.error("[apply] Unexpected DB layer error:", e);
    return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
  }
}
