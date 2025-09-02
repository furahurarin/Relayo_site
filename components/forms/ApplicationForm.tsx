// components/forms/ApplicationForm.tsx
// - Turnstile 無効（関連コードは削除済み）
// - honeypot, UTM/リファラ自動付与, localStorage 一時保存は維持
"use client";

import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ===== バリデーション定義 =====
const PlanEnum = z.enum(["starter_lp", "essential", "standard", "growth"]);
const Schema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  company: z.string().optional(),
  email: z.string().email("メールアドレスの形式が正しくありません"),
  phone: z.string().optional(),
  website: z.string().url("URLの形式が正しくありません").optional().or(z.literal("")),
  type: z.enum(["new", "renew", "lp"], { required_error: "ご相談種別を選択してください" }),
  // 予算の代わりに「希望プラン（任意）」でヒアリング
  plan: PlanEnum.optional(),
  // 旧: budget はプラン整合のため残すが、値は plan と同一（サーバ側での集計互換目的）
  budget: PlanEnum.optional(),
  // 公開目標（任意）※短納期加算は無し
  timeline: z.enum(["lp_5_10", "ess_2_3w", "std_3_4w", "gro_4_6w", "undecided"]).optional(),
  // 優先度・素材・決裁
  priority: z.enum(["speed", "cost", "scope"]).optional(),
  assets: z.array(z.enum(["texts", "photos", "logo", "existing_site", "none"])).optional(),
  decision: z.enum(["now_1w", "by_2w", "over_1m"]).optional(),

  features: z.array(z.string()).optional(),
  message: z.string().min(10, "ご要件を具体的にご記入ください（10文字以上）"),
  hp: z.string().optional(), // 蜜壺（bot対策）

  // メタ
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  utm_term: z.string().optional(),
  referrer: z.string().optional(),
  pathname: z.string().optional(),
});

type FormData = z.infer<typeof Schema>;

const isPlan = (v: string | null): v is z.infer<typeof PlanEnum> =>
  v === "starter_lp" || v === "essential" || v === "standard" || v === "growth";

export default function ApplicationForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | string>(null);
  const [err, setErr] = useState<string | null>(null);

  // ===== 既定値（/pricing?plan=standard 等を反映）=====
  const defaults = useMemo(() => {
    if (typeof window === "undefined") return {};
    const p = new URLSearchParams(window.location.search);
    const qp = p.get("plan");
    const plan = isPlan(qp) ? qp : undefined;

    return {
      plan,
      // 互換: budget は plan と同値を入れておく（既存集計の破壊回避）
      budget: plan,
      type: plan === "starter_lp" ? ("lp" as const) : plan ? ("new" as const) : undefined,
      utm_source: p.get("utm_source") ?? undefined,
      utm_medium: p.get("utm_medium") ?? undefined,
      utm_campaign: p.get("utm_campaign") ?? undefined,
      utm_content: p.get("utm_content") ?? undefined,
      utm_term: p.get("utm_term") ?? undefined,
      referrer: document.referrer || undefined,
      pathname: window.location.pathname,
    } satisfies Partial<FormData>;
  }, []);

  // ===== ローカル保存の読み出し =====
  const [data, setData] = useState<Partial<FormData>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = localStorage.getItem("contact.tmp") ?? "{}";
      const saved = JSON.parse(raw);
      return { ...saved, ...defaults };
    } catch {
      return defaults;
    }
  });

  // ===== 自動保存 =====
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("contact.tmp", JSON.stringify(data));
  }, [data]);

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    setOk(null);

    const payload: FormData = {
      name: (data.name ?? "").trim(),
      company: (data.company ?? "").trim() || undefined,
      email: (data.email ?? "").trim(),
      phone: (data.phone ?? "").trim() || undefined,
      website: (data.website ?? "").trim() || "",
      type: (data.type as any) ?? undefined,

      plan: (data.plan as any) ?? undefined,
      budget: (data.plan as any) ?? undefined, // 互換のため plan を複写
      timeline: (data.timeline as any) ?? undefined,
      priority: (data.priority as any) ?? undefined,
      assets: (data.assets as any) ?? [],
      decision: (data.decision as any) ?? undefined,

      features: (data.features as string[]) ?? [],
      message: (data.message ?? "").trim(),
      hp: (data.hp ?? "") || undefined, // honeypot

      utm_source: (data.utm_source as string) ?? undefined,
      utm_medium: (data.utm_medium as string) ?? undefined,
      utm_campaign: (data.utm_campaign as string) ?? undefined,
      utm_content: (data.utm_content as string) ?? undefined,
      utm_term: (data.utm_term as string) ?? undefined,
      referrer: (data.referrer as string) ?? (typeof document !== "undefined" ? document.referrer : undefined),
      pathname: (data.pathname as string) ?? (typeof window !== "undefined" ? window.location.pathname : undefined),
    };

    // 蜜壺ヒットは即中止（成功扱いにしない）
    if (payload.hp && payload.hp.trim() !== "") {
      setLoading(false);
      return;
    }

    const parsed = Schema.safeParse(payload);
    if (!parsed.success) {
      setErr(parsed.error.issues[0]?.message ?? "入力内容をご確認ください。");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error(await res.text());
      setOk("送信しました。折り返しメールでご連絡します（通常、翌営業日以内）。");
      setData({});
      localStorage.removeItem("contact.tmp");
    } catch (e: any) {
      setErr("送信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  // ===== UI =====
  return (
    <Card>
      <CardHeader>
        <CardTitle>お問い合わせ（無料診断つき）</CardTitle>
        <p className="text-sm text-muted-foreground">
          必須は最小限です。送信すると、折り返しメールでご連絡します。
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* 基本（必須を先頭に） */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium" htmlFor="name">お名前 *</label>
              <input
                id="name"
                className="mt-1 w-full rounded-md border p-2"
                value={data.name ?? ""}
                onChange={(e) => set("name", e.target.value)}
                required
                aria-required={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="company">会社名（任意）</label>
              <input
                id="company"
                className="mt-1 w-full rounded-md border p-2"
                value={data.company ?? ""}
                onChange={(e) => set("company", e.target.value)}
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium" htmlFor="email">メールアドレス *</label>
              <input
                id="email"
                type="email"
                className="mt-1 w-full rounded-md border p-2"
                value={data.email ?? ""}
                onChange={(e) => set("email", e.target.value)}
                required
                aria-required={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="phone">電話番号（任意）</label>
              <input
                id="phone"
                className="mt-1 w-full rounded-md border p-2"
                value={data.phone ?? ""}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="ハイフンなし可"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium" htmlFor="website">現状URL（任意）</label>
              <input
                id="website"
                type="url"
                className="mt-1 w-full rounded-md border p-2"
                value={data.website ?? ""}
                onChange={(e) => set("website", e.target.value)}
                placeholder="https://"
              />
            </div>
          </div>

          {/* 相談種別 & 希望プラン */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium" htmlFor="type">ご相談種別 *</label>
              <select
                id="type"
                className="mt-1 w-full rounded-md border p-2"
                value={(data.type as string) ?? ""}
                onChange={(e) => set("type", e.target.value as FormData["type"]) }
                required
                aria-required={true}
              >
                <option value="" disabled>選択してください</option>
                <option value="new">新規サイト</option>
                <option value="renew">リニューアル</option>
                <option value="lp">LP制作</option>
              </select>
            </div>

            <div>
              <fieldset className="mt-1">
                <legend className="block text-sm font-medium">希望プラン（任意）</legend>
                <div className="mt-2 grid grid-cols-1 gap-2 text-sm">
                  {[
                    ["starter_lp","Starter-LP（〜約¥80k目安）"],
                    ["essential","Essential（〜約¥138k目安）"],
                    ["standard","Standard（〜約¥198k目安）"],
                    ["growth","Growth（約¥348k〜目安）"],
                  ].map(([val,label]) => (
                    <label key={val} className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name="plan"
                        checked={data.plan === (val as any)}
                        onChange={() => { set("plan", val as any); set("budget", val as any); }}
                      />
                      {label}
                    </label>
                  ))}
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="plan"
                      checked={!data.plan}
                      onChange={() => { set("plan", undefined as any); set("budget", undefined as any); }}
                    />
                    未定・相談したい
                  </label>
                </div>
              </fieldset>
            </div>
          </div>

          {/* 公開目標・優先度・素材 */}
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium" htmlFor="timeline">公開目標（任意）</label>
              <select
                id="timeline"
                className="mt-1 w-full rounded-md border p-2"
                value={(data.timeline as string) ?? ""}
                onChange={(e) => set("timeline", e.target.value as FormData["timeline"]) }
              >
                <option value="">未定 / 相談したい</option>
                <option value="lp_5_10">5–10 営業日（LP想定）</option>
                <option value="ess_2_3w">2–3 週間（Essential目安）</option>
                <option value="std_3_4w">3–4 週間（Standard目安）</option>
                <option value="gro_4_6w">4–6 週間（Growth目安）</option>
                <option value="undecided">未定</option>
              </select>
              <p className="mt-1 text-xs text-muted-foreground">
                短納期料金はありません。必要に応じてスコープを段階化し、前倒し公開で対応します。
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium" htmlFor="priority">優先したいこと（任意）</label>
              <select
                id="priority"
                className="mt-1 w-full rounded-md border p-2"
                value={(data.priority as string) ?? ""}
                onChange={(e) => set("priority", e.target.value as FormData["priority"])}
              >
                <option value="">未選択</option>
                <option value="speed">スピード（できるだけ早く）</option>
                <option value="cost">コスト（費用を抑えたい）</option>
                <option value="scope">内容（機能やページを優先）</option>
              </select>
            </div>

            <div>
              <fieldset className="mt-1">
                <legend className="block text-sm font-medium">素材の準備状況（任意）</legend>
                <div className="mt-2 grid grid-cols-2 gap-y-2 text-sm">
                  {[
                    ["texts","原稿あり"],
                    ["photos","写真あり"],
                    ["logo","ロゴあり"],
                    ["existing_site","既存サイトあり"],
                    ["none","未準備が多い"],
                  ].map(([v,l]) => {
                    const assets = new Set(data.assets ?? []);
                    const checked = assets.has(v as any);
                    return (
                      <label key={v} className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            const next = new Set(assets);
                            e.target.checked ? next.add(v as any) : next.delete(v as any);
                            set("assets", Array.from(next) as any);
                          }}
                        />
                        {l}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          </div>

          {/* 決裁 */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium" htmlFor="decision">社内決裁の見込み（任意）</label>
              <select
                id="decision"
                className="mt-1 w-full rounded-md border p-2"
                value={(data.decision as string) ?? ""}
                onChange={(e) => set("decision", e.target.value as FormData["decision"])}
              >
                <option value="">未定</option>
                <option value="now_1w">即決〜1週間</option>
                <option value="by_2w">2週間以内</option>
                <option value="over_1m">1ヶ月以上</option>
              </select>
            </div>

            <div>
              <fieldset className="mt-1">
                <legend className="block text-sm font-medium">検討中の機能（任意）</legend>
                <div className="mt-2 grid grid-cols-2 gap-y-2 text-sm">
                  {["予約", "決済", "会員", "多言語", "ブログ/CMS", "LP追加", "API連携", "その他"].map((f) => {
                    const features = new Set(data.features ?? []);
                    const checked = features.has(f);
                    return (
                      <label key={f} className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            const next = new Set(features);
                            e.target.checked ? next.add(f) : next.delete(f);
                            set("features", Array.from(next));
                          }}
                        />
                        {f}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          </div>

          {/* 詳細 */}
          <div>
            <label className="block text-sm font-medium" htmlFor="message">ご要件・現状の課題 *</label>
            <textarea
              id="message"
              className="mt-1 w-full rounded-md border p-2"
              rows={5}
              value={data.message ?? ""}
              onChange={(e) => set("message", e.target.value)}
              placeholder="例）先にLPを公開し、後から会社概要と事例を追加したい／問い合わせを月◯件に増やしたい 等"
              required
              aria-required={true}
            />
          </div>

          {/* 蜜壺（人には見えない） */}
          <input
            type="text"
            name="hp"
            value={data.hp ?? ""}
            onChange={(e) => set("hp", e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {/* 送信 */}
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={loading}>
              {loading ? "送信中..." : "送信する"}
            </Button>
            {ok && <p className="text-sm text-emerald-600">{ok}</p>}
            {err && <p className="text-sm text-red-600">{err}</p>}
          </div>

          {/* 免責・注記 */}
          <p className="text-xs text-muted-foreground">
            価格は税別。ドメイン/サーバ等の実費は別。入力内容は見積・連絡のみに使用します（
            <a href="/legal/privacy" className="underline underline-offset-4">プライバシーポリシー</a>）。
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
