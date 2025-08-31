// app/api/inngest/route.ts（本番用・最小）
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const maxDuration = 300;

import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest";
import { sendEmails } from "@/inngest/send-emails";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [sendEmails], // ← 1本だけ登録（重複起動を防ぐ）
  // signingKey は指定しない：INNGEST_SIGNING_KEY を使う
});
