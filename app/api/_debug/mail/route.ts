// app/api/_debug/mail/route.ts
import { NextResponse } from "next/server";

// 念のため Node.js ランタイムを明示
export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ ok: true, marker: "app-router-detected" });
}
