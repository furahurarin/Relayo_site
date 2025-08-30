// app/api/apply/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { applyRatelimit } from "@/lib/ratelimit";
import { verifyTurnstile } from "@/lib/turnstile";
import { inngest } from "@/lib/inngest";

export const runtime = "nodejs"; // Resendや外部APIを使うのでNodeランタイム推奨

// 受信ペイロードの型定義
const Schema = z.object({
  name: z.string().min(1),
  company: z.string().optional().default(""),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  detail: z.string().min(10),
  cfToken: z.string().min(10), // Turnstileのトークン
  hp: z.string().optional().default(""), // 蜜壺（見えないフィールド）任意
});

export async function POST(req: Request) {
  // IPアドレス（レート制限＆Turnstile検証で使用）
  const ip =
    (req.headers.get("x-forwarded-for")?.split(",")[0] || "").trim() ||
    req.headers.get("x-real-ip") ||
    undefined;

  // まずレート制限
  const { success: passLimit } = await applyRatelimit.limit(ip || "unknown");
  if (!passLimit) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  // JSONパース & バリデーション
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  const parsed = Schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const data = parsed.data;

  // 蜜壺（ボットがよく埋める隠し入力）に値があれば、成功っぽく返して無視
  if (data.hp && data.hp.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Turnstile をサーバー側で検証
  const human = await verifyTurnstile(data.cfToken, ip);
  if (!human) {
    return NextResponse.json({ ok: false, error: "bot_detected" }, { status: 400 });
  }

  // UA（任意）
  const ua = req.headers.get("user-agent") || "";

  // DB保存（service_roleでサーバーから実行）
  const { error } = await supabaseAdmin.from("applications").insert({
    name: data.name,
    company: data.company,
    email: data.email,
    phone: data.phone,
    detail: data.detail,
    ua,
    ip,
    status: "received",
  });
  if (error) {
    console.error("[apply] DB insert error:", error);
    return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
  }

  // Inngest イベントを発火（裏で自動返信・社内通知などを実行）
  await inngest.send({
    name: "application/received",
    data: {
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      detail: data.detail,
      ip,
      ua,
    },
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
