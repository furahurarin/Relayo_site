// app/pricing/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, ShieldCheck, CheckCircle2, Sparkles } from "lucide-react";
import ContactCTA from "@/components/cta/ContactCTA";
import { PRICING } from "@/lib/pricing";

const siteDescription =
  "中小企業・個人事業主向けのWeb/アプリ制作。Next.js + Tailwindで高速・保守しやすいサイトを短納期で提供。予約/会員/決済、LINE連携、運用保守まで一気通貫。";

export const metadata: Metadata = {
  title: "料金",
  description: siteDescription,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "料金",
    description: siteDescription,
    url: "/pricing",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "料金",
    description: siteDescription,
    images: ["/og.png"],
  },
};

// ---------- tiny components (tokenized colors) ----------
const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--accent)/0.35)] px-2 py-0.5 text-xs text-[hsl(var(--foreground))/0.9]">
    <CheckCircle2 className="h-3.5 w-3.5" /> {children}
  </span>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--accent)/0.45)] px-2 py-0.5 text-xs text-[hsl(var(--foreground))]">
    <Sparkles className="h-3.5 w-3.5" /> {children}
  </span>
);

// ---------- page ----------
export const dynamic = "force-static";

export default function PricingPage() {
  const { setPlans, lpPack, soloGroups, monthlyPlans, meta } = PRICING;

  // 構造化データ（OfferCatalog）
  const offerCatalogLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Relayo Pricing",
    itemListElement: [
      ...setPlans.map((p) => ({
        "@type": "Offer" as const,
        name: p.name,
        price: p.price.text.replace(/[^\d]/g, ""), // 数値だけを抽出（検索エンジン向け）
        priceCurrency: "JPY",
      })),
      {
        "@type": "Offer" as const,
        name: lpPack.name,
        price: lpPack.price.text.replace(/[^\d]/g, ""),
        priceCurrency: "JPY",
      },
      ...monthlyPlans.map((m) => ({
        "@type": "Offer" as const,
        name: m.name,
        price: m.price.text.replace(/[^\d]/g, "") || "0",
        priceCurrency: "JPY",
      })),
    ],
  };

  return (
    <main className="container mx-auto space-y-12 px-4 py-12">
      {/* Hero */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">料金</h1>
        <p className="text-muted-foreground">
          情報は <strong>セットプラン</strong> → <strong>LPパック</strong> →{" "}
          <strong>単体メニュー</strong> → <strong>月額</strong> の順に掲載。価格はすべて
          <strong> {meta.tax}</strong> です。ドメイン/サーバ等の実費は別途となります。
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Tag>{meta.tax}表示</Tag>
          <Tag>契約縛りなし</Tag>
          <Tag>無料見積</Tag>
          <Tag>{meta.businessHours}</Tag>
        </div>
        <div className="mt-2 flex gap-3">
          <ContactCTA />
          <Button asChild variant="secondary" size="lg">
            <Link href="/services">サービス内容を確認</Link>
          </Button>
        </div>
      </section>

      {/* セットプラン */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">セットプラン</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {setPlans.map((p) => (
            <Card
              key={p.code}
              className={p.popular ? "border-border bg-secondary" : "border-border"}
            >
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{p.name}</CardTitle>
                  {p.popular && <Badge>いちばん人気</Badge>}
                </div>
                {p.catch && <p className="text-sm text-muted-foreground">{p.catch}</p>}
                <p className="text-2xl font-bold">{p.price.text}</p>
                <p className="text-xs text-muted-foreground">
                  ページ構成：{p.pages} ／ {p.form}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                  {p.includes.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>
                    SLA：{p.sla.label}
                    {p.sla.p1 ? `（P1=${p.sla.p1}` : ""}
                    {p.sla.p2 ? `／P2=${p.sla.p2}` : ""}
                    {p.sla.p3 ? `／P3=${p.sla.p3}` : ""}
                    {p.sla.p1 ? "）" : ""}
                  </p>
                  <p>納期目安：{p.leadTime.note}</p>
                </div>
                <div className="pt-2">
                  <ContactCTA />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* LPパック */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">LPパック</h2>
        <Card className="border-border">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{lpPack.name}</CardTitle>
              <Badge>まず出す</Badge>
            </div>
            <p className="text-2xl font-bold">{lpPack.price.text}</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              {lpPack.includes.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>
                SLA：{lpPack.sla.label}
                {lpPack.sla.p1 ? `（P1=${lpPack.sla.p1}` : ""}
                {lpPack.sla.p2 ? `／P2=${lpPack.sla.p2}` : ""}
                {lpPack.sla.p3 ? `／P3=${lpPack.sla.p3}` : ""}
                {lpPack.sla.p1 ? "）" : ""}
              </p>
              <p>納期目安：{lpPack.leadTime.note}</p>
            </div>
            <div className="pt-2">
              <ContactCTA />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 単体メニュー */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">単体メニュー（サービスごとの定額）</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {soloGroups.map((group) => (
            <Card key={group.code} className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">{group.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="divide-y divide-border">
                  {group.items.map((it) => (
                    <li
                      key={it.name}
                      className="flex items-start justify-between gap-4 py-2 text-foreground"
                    >
                      <span className="pr-4">{it.name}</span>
                      <span className="shrink-0 font-semibold">{it.price.text}</span>
                    </li>
                  ))}
                </ul>
                <ul className="mt-2 space-y-1 text-xs text-muted-foreground/80">
                  {group.items
                    .filter((it) => it.note)
                    .map((it) => (
                      <li key={`${it.name}-note`}>※ {it.note}</li>
                    ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-xs text-muted-foreground/80">
          ※ 「〜」表記は要件により変動。個別見積は無料です。
        </p>
      </section>

      {/* 月額（運用・保守） */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">月額（運用・保守）</h2>
        <div className="grid gap-6 md:grid-cols-5">
          {monthlyPlans.map((m) => (
            <Card key={m.code} className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">{m.name}</CardTitle>
                <p className="text-xl font-bold">{m.price.text}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                  {m.features.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground">初動：{m.initial}</p>
                <ContactCTA />
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          すべて契約縛りなし／翌月からアップ/ダウン可。「これだけやってほしい」に合わせて単発パックのみでの運用も可能です。
        </p>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">よくある質問</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">解約後のサイトは？</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              納品物はお客さま名義の資産。運用SaaSの契約は別ですが、サイト自体は使い続けられます。
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">見積のブレについて</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              本ページの価格は標準ケースの定額です。範囲が増える場合のみ、事前に追加メニューでご相談のうえ調整します。
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">納期の目安</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Starter-LP：{lpPack.leadTime.note}／Standard：
              {setPlans.find((p) => p.code === "standard")?.leadTime.note}／Growth：
              {setPlans.find((p) => p.code === "growth")?.leadTime.note}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 注意書き */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">注意書き（重要）</h2>
        <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--accent)/0.25)] p-4 text-[hsl(var(--foreground))]">
          <p className="flex items-start gap-2">
            <Info className="mt-0.5 h-5 w-5" />
            表示価格は{meta.tax}です。ドメイン/サーバ等の実費は別。要件・素材の準備状況・連携サービス・セキュリティ要件により増減します。
          </p>
        </div>
        <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--accent)/0.25)] p-4 text-[hsl(var(--foreground))]">
          <p className="flex items-start gap-2">
            <ShieldCheck className="mt-0.5 h-5 w-5" />
            契約前に範囲と前提、除外項目、変更管理、SLAを明文化します。まずは「お問い合わせ」から。
          </p>
        </div>
        <div className="flex gap-3">
          <ContactCTA />
          <Button asChild variant="secondary">
            <Link href="/services">サービス内容を確認</Link>
          </Button>
        </div>
      </section>

      {/* 構造化データ */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogLd) }}
      />
    </main>
  );
}
