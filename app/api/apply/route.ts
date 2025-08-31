// app/api/apply/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { applyRatelimit } from "@/lib/ratelimit";
import { verifyTurnstile } from "@/lib/turnstile";
import { inngest } from "@/lib/inngest";

export const runtime = "nodejs"; // Resend等の外部APIを使うため Node.js ランタイム

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
  // IP（レート制限 & Turnstile 検証用）
  const ip =
    (req.headers.get("x-forwarded-for")?.split(",")[0] || "").trim() ||
    req.headers.get("x-real-ip") ||
    undefined;

  // レート制限
  try {
    const { success } = await applyRatelimit.limit(ip || "unknown");
    if (!success) {
      return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
    }
  } catch {
    // ライブラリ不調でも落とさず継続（任意）
  }

  // JSONパース
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // バリデーション（V1→V2の順で試す）
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

  // 蜜壺（隠しフィールド）に値があれば成功風に返して終了
  if (data.hp && data.hp.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Turnstile 検証（サーバ側）
  const human = await verifyTurnstile(data.cfToken, ip);
  if (!human) {
    return NextResponse.json({ ok: false, error: "bot_detected" }, { status: 400 });
  }

  // UA（任意）
  const ua = req.headers.get("user-agent") || "";

  // DB保存（Supabase）
  const { error: dbErr } = await supabaseAdmin.from("applications").insert({
    name: data.name,
    company: data.company ?? "",
    email: data.email,
    phone: data.phone ?? "",
    detail: data.detail,
    ua,
    ip,
    status: "received",
  });

  if (dbErr) {
    console.error("[apply] DB insert error:", dbErr);
    return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
  }

  // 非同期処理（メール送信など）
  const eventPayload = {
    name: data.name,
    email: data.email,
    message: data.detail,
    submittedAt: new Date().toISOString(),
    company: data.company ?? "",
    phone: data.phone ?? "",
    ip,
    ua,
  };

  // 既存の send-emails 関数に合わせたイベント
  await inngest.send({ name: "lead/created", data: eventPayload });

  // もし別のワークフローで使うなら互換イベントも送信（任意）
  await inngest.send({ name: "application/received", data: eventPayload });

  return NextResponse.json({ ok: true }, { status: 200 });
}
