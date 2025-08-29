// app/contact/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Clipboard, CheckCircle2, Megaphone } from "lucide-react";
import { track, EVENTS } from "@/lib/track";
import { BRAND, CAMPAIGN, CONTACT } from "@/lib/constants";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const intake = `以下をメール本文にコピペしてご回答ください。未定は「未定」でOKです。
提出先：${BRAND.email}

1. プロジェクト概要
- 会社名／屋号：
- ご担当者名：
- 連絡用メール：
- 事業の一言紹介（20〜60字）：
- 目的（複数可）：集客 / 予約増 / 採用 / ブランド整備 / その他（　）

2. 期日と体制
- 希望公開時期：ASAP / 1か月 / 2–3か月 / 未定
- 決裁・承認の流れ：

3. 予算感・規模
- 予算帯：〜20万 / 20–60万 / 60–120万 / 120万〜 / 未定
- 想定ページ数：LP / 〜10p / 〜20p / 20p〜 / 未定

4. 必要機能（複数可）
- 予約 / 会員 / 決済 / ブログ / LINE連携 / 多言語 / 未定
- 既存ツールやSaaS（予約・決済など）：

5. 成果指標（KPI）
- 目標（例：問い合わせ◯件/月、予約◯件/月、CVR◯%）：
- 優先順位（例：速度＞デザイン＞SEO など）：

6. 参考情報
- 参考サイトURL（2〜3件）：
- ロゴ・写真素材：あり / なし（ストック画像でOK）
- コピーテキスト：あり / なし（叩き台の作成を希望）

7. 制作後の運用
- 更新主体：自社で更新 / Relayoへ依頼 / 未定
- 保守希望：Lite / Std / Pro / 未定

8. キャンペーン適用（先着${CAMPAIGN.seats}社）
- 希望しますか？：はい / いいえ
- 実績掲載・レビューの協力：同意する / 同意しない
- 素材提出期限（KO+7日）の順守：同意する / 同意しない

9. 自由記述
- 実現したいこと、NG例、競合との差別化、悩みなど：`;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(intake);
      setCopied(true);
      track(EVENTS.SHEET_COPY, { section: "contact" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 権限がない場合は無視（手動コピー対応）
    }
  };

  return (
    <main className="bg-white py-16">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">お問い合わせ</h1>
        <p className="mb-10 text-gray-600">
          すべてメールで完結する<strong>非対面ヒアリング</strong>で進めます。フォームは不要です。
          下の「メールで相談」から直接メールを送るか、「診断シート」をコピーしてご返信ください。
        </p>

        {/* 1) メールで相談 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">メールで相談</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-gray-700">
              宛先：{" "}
              <a
                href={CONTACT.mailto}
                className="text-blue-600 underline-offset-2 hover:underline"
                aria-label="メールで相談（メール作成画面を開く）"
                data-umami-event={EVENTS.EMAIL_CLICK}
                data-umami-event-section="contact-email"
              >
                {BRAND.email}
              </a>
              <br />
              件名の例：<span className="font-mono">料金相談（キャンペーン希望）</span>
            </div>
            <Button asChild size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
              <a
                href={`${CONTACT.mailto}?subject=${encodeURIComponent("料金相談（キャンペーン希望）")}`}
                aria-label="メールを作成する"
                data-umami-event={EVENTS.EMAIL_CLICK}
                data-umami-event-section="contact-email"
              >
                <Mail className="mr-2 h-5 w-5" />
                メールを作成
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* 2) 診断シート */}
        <Card className="mb-8" id="get-sheet">
          <CardHeader>
            <CardTitle className="text-xl">非対面ヒアリング｜診断シート</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-3 text-sm text-gray-600">
              そのままコピーしてメール本文に貼り付けてください（未定OK／箇条書きで結構です）。
            </p>
            <pre className="whitespace-pre-wrap rounded-md border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-800">
              {intake}
            </pre>
            <div className="mt-3 flex gap-2">
              <Button onClick={onCopy} variant="outline" aria-label="診断シートをコピーする">
                {copied ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" /> コピーしました
                  </>
                ) : (
                  <>
                    <Clipboard className="mr-2 h-4 w-4" /> シートをコピー
                  </>
                )}
              </Button>
              <Button asChild variant="secondary">
                <Link
                  href="/#faq"
                  aria-label="よくある質問を見る"
                  data-umami-event={EVENTS.CTA_FAQ}
                  data-umami-event-section="contact-sheet"
                >
                  よくある質問を見る
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 3) キャンペーン注記 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Megaphone className="h-5 w-5 text-emerald-600" />
              {CAMPAIGN.name}（先着{CAMPAIGN.seats}社）
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-emerald-900">
            <p>
              <strong>制作費 ¥0（諸経費のみ） × 保守{CAMPAIGN.freeCareMonths}ヶ月 ¥0（Lite相当）</strong>
              ／<strong>{CAMPAIGN.freeCancelNote}</strong>
            </p>
            <p>
              対象範囲：{CAMPAIGN.scope}／条件：実績掲載・レビュー協力、素材提出=KO+7日。
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
