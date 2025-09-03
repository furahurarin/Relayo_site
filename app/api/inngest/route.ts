// app/api/inngest/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const maxDuration = 300;

import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest";
import { sendEmails } from "@/inngest/send-emails";

/**
 * ❌ ここで環境変数チェックや throw をしないこと！
 *  import時に例外を投げると、build の "Collecting page data" で落ちます。
 */

// INNGEST_SIGNING_KEY は env から自動取得されます（未設定でも serve 自体は通る）
export const { GET, POST } = serve({
  client: inngest,
  functions: [sendEmails],
});
