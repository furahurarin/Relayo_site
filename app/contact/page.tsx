// app/contact/page.tsx
"use client";

/**
 * Turnstile 無効化版（後日再有効化しやすい構成）
 * - ボット対策：honeypot ＋ 5秒未満送信ブロック
 * - Step1: 用件（カテゴリ）→ 目的・希望（任意項目はカテゴリで出し分け）
 * - Step2: 連絡先 → 完了
 * - 予算ではなく「希望プラン」、納期は「公開目標」（短納期加算なしを明記）
 * - UTM/リファラ/現在のパスを自動付与して本文へ追記
 * - Umami イベントは既存命名＋新命名の両対応
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";

type Plan = "starter_lp" | "essential" | "standard" | "growth" | "";
type Launch =
  | "lp_5_10" // 5–10 営業日（LP目安）
  | "ess_2_3w" // 2–3 週間（Essential目安）
  | "std_3_4w" // 3–4 週間（Standard目安）
  | "gro_4_6w" // 4–6 週間（Growth目安）
  | "undecided"
  | "";
type Category =
  | "quote_new"        // 新規制作・見積
  | "improve"          // 改善・リニューアル相談
  | "incident"         // 不具合・障害連絡
  | "billing_docs"     // 見積/請求/契約/発注書など
  | "care_change"      // 保守プランの相談・変更
  | "recruit_partner"  // 採用/協業
  | "media_pr"         // メディア・取材
  | "other"            // その他
  | "";

type Diagnosis = {
  category: Category;           // 用件カテゴリ
  goal: string[];               // 目的（複数選択）
  goalOther: string;            // 目的の自由入力
  plan: Plan;                   // 希望プラン（任意）
  launch: Launch;               // 公開目標（任意）※短納期加算なし
  priority: "speed" | "cost" | "scope" | ""; // 優先度（任意）
  assets: ("texts" | "photos" | "logo" | "existing_site" | "none")[]; // 素材状況（任意）
  industry: string;             // 業種
  hasSite: "あり" | "なし" | "";
  siteUrl: string;

  // 不具合カテゴリ向け（任意）
  severity: "p1" | "p2" | "p3" | "";
  incidentNote: string;         // 発生日/事象/影響範囲など
};

export default function ContactPage() {
  /** ---------- 入力（ステップ2） ---------- */
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState(""); // honeypot：埋まっていたら送信しない

  /** ---------- 診断シート（ステップ1） ---------- */
  const [diag, setDiag] = useState<Diagnosis>({
    category: "",
    goal: [],
    goalOther: "",
    plan: "",
    launch: "",
    priority: "",
    assets: [],
    industry: "",
    hasSite: "",
    siteUrl: "",
    severity: "",
    incidentNote: "",
  });

  /** ---------- メタ（自動追記用） ---------- */
  const [meta, setMeta] = useState<{
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    referrer?: string;
    pathname?: string;
  }>({});

  /** ---------- 状態 ---------- */
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mountedAt, setMountedAt] = useState<number>(0); // タイムトラップ

  const successRef = useRef<HTMLDivElement | null>(null);
  const errorRef = useRef<HTMLDivElement | null>(null);

  /** ---------- 定義 ---------- */
  const categories: { value: Category; label: string; hint?: string }[] = [
    { value: "quote_new", label: "新規制作・見積", hint: "要件のヒアリング後に概算→確定見積" },
    { value: "improve", label: "改善・リニューアル相談", hint: "既存サイトの改善/追加" },
    {
      value: "incident",
      label: "不具合・障害連絡（SLA）",
      hint: "P1=重大（決済/フォーム不可等）/ P2=中度 / P3=軽度",
    },
    { value: "billing_docs", label: "見積/請求/契約/発注書の発行", hint: "書類のみのご依頼" },
    { value: "care_change", label: "保守プランの相談・変更" },
    { value: "recruit_partner", label: "採用/協業のご連絡" },
    { value: "media_pr", label: "メディア/取材のご連絡" },
    { value: "other", label: "その他（自由入力）" },
  ];

  const goals = [
    "集客を増やしたい",
    "予約/問い合わせ導線を改善したい",
    "サイトのリニューアル",
    "新規サイト立ち上げ",
    "EC/オンライン決済を入れたい",
    "SNS/LINE連携を強化したい",
    "ABテストで改善を回したい",
    "ページ/コンテンツを増やしたい",
    "その他（自由入力）",
  ];

  const planOptions: { value: Plan; label: string }[] = [
    { value: "starter_lp", label: "Starter-LP" },
    { value: "essential", label: "Essential" },
    { value: "standard", label: "Standard" },
    { value: "growth", label: "Growth" },
  ];

  const launchOptions: { value: Launch; label: string }[] = [
    { value: "lp_5_10", label: "5–10 営業日（LP目安）" },
    { value: "ess_2_3w", label: "2–3 週間（Essential目安）" },
    { value: "std_3_4w", label: "3–4 週間（Standard目安）" },
    { value: "gro_4_6w", label: "4–6 週間（Growth目安）" },
    { value: "undecided", label: "未定" },
  ];

  /** ---------- バリデーション ---------- */
  const isEmailValid = /\S+@\S+\.\S+/.test(email);

  // カテゴリ別のStep1必須条件
  const canNext = (() => {
    if (!diag.category) return false;

    // 不具合は目的必須にしない
    if (diag.category === "incident") {
      const hasUrlIfSite = diag.hasSite === "あり" ? diag.siteUrl.trim().length >= 4 : true;
      return !!diag.industry && !!diag.hasSite && hasUrlIfSite;
    }

    // その他は目的必須にしない（自由入力で担保）
    if (diag.category === "other") {
      const hasUrlIfSite = diag.hasSite === "あり" ? diag.siteUrl.trim().length >= 4 : true;
      return !!diag.industry && !!diag.hasSite && hasUrlIfSite;
    }

    // それ以外は目的必須
    const hasGoal =
      diag.goal.length > 0 ||
      (diag.goal.includes("その他（自由入力）") && diag.goalOther.trim().length > 0);
    const hasUrlIfSite = diag.hasSite === "あり" ? diag.siteUrl.trim().length >= 4 : true;
    return hasGoal && !!diag.industry && !!diag.hasSite && hasUrlIfSite;
  })();

  const canSubmit = !!name && isEmailValid && !loading && hp === "";

  /** ---------- Umami（存在する時だけ発火） ---------- */
  const track = (event: string, data?: Record<string, any>) =>
    (typeof window !== "undefined" && (window as any)?.umami?.track?.(event, data));

  /** ---------- 初期化：plan/UTM/リファラ ---------- */
  useEffect(() => {
    if (typeof window === "undefined") return;
    setMountedAt(Date.now());
    const p = new URLSearchParams(window.location.search);
    const qp = p.get("plan");
    const isPlan =
      qp === "starter_lp" || qp === "essential" || qp === "standard" || qp === "growth";

    setMeta({
      utm_source: p.get("utm_source") ?? undefined,
      utm_medium: p.get("utm_medium") ?? undefined,
      utm_campaign: p.get("utm_campaign") ?? undefined,
      utm_content: p.get("utm_content") ?? undefined,
      utm_term: p.get("utm_term") ?? undefined,
      referrer: document.referrer || undefined,
      pathname: window.location.pathname,
    });

    if (isPlan) {
      setDiag((d) => ({ ...d, plan: qp as Plan }));
    }
  }, []);

  /** ---------- フォーカス制御（SR向け） ---------- */
  useEffect(() => {
    if (done && successRef.current) successRef.current.focus();
  }, [done]);
  useEffect(() => {
    if (error && errorRef.current) errorRef.current.focus();
  }, [error]);

  /** ---------- 送信 ---------- */
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    // タイムトラップ：5秒未満の超高速送信は拒否（簡易ボット対策）
    if (Date.now() - mountedAt < 5000) {
      setError("送信に失敗しました。しばらくしてから再度お試しください。");
      track("contact_submit_blocked_fast");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      track("contact_submit_clicked");
      track("submit_contact_form_started");

      const planLabel = planOptions.find((x) => x.value === diag.plan)?.label ?? "未選択";
      const launchLabel = launchOptions.find((x) => x.value === diag.launch)?.label ?? "未定";
      const priorityLabel =
        diag.priority === "speed"
          ? "スピード優先"
          : diag.priority === "cost"
          ? "コスト優先"
          : diag.priority === "scope"
          ? "内容優先"
          : "未選択";
      const assetsLabel =
        diag.assets.length > 0
          ? diag.assets
              .map((a) =>
                a === "texts"
                  ? "原稿あり"
                  : a === "photos"
                  ? "写真あり"
                  : a === "logo"
                  ? "ロゴあり"
                  : a === "existing_site"
                  ? "既存サイトあり"
                  : "未準備が多い",
              )
              .join(", ")
          : "未選択";

      const categoryLabel =
        categories.find((c) => c.value === diag.category)?.label ?? "未選択";

      const severityLabel =
        diag.severity === "p1" ? "P1（重大）"
        : diag.severity === "p2" ? "P2（中度）"
        : diag.severity === "p3" ? "P3（軽度）"
        : "未選択";

      const goalText =
        diag.goal.length > 0
          ? diag.goal.join(", ") + (diag.goal.includes("その他（自由入力）") && diag.goalOther ? ` / ${diag.goalOther}` : "")
          : diag.category === "other" || diag.category === "incident"
          ? "(目的は任意)"
          : "未選択";

      const metaText =
        "\n\n--- 参照情報 ---\n" +
        `referrer: ${meta.referrer ?? "-"}\n` +
        `pathname: ${meta.pathname ?? "-"}\n` +
        `utm_source: ${meta.utm_source ?? "-"} / utm_medium: ${meta.utm_medium ?? "-"} / utm_campaign: ${meta.utm_campaign ?? "-"}\n` +
        `utm_content: ${meta.utm_content ?? "-"} / utm_term: ${meta.utm_term ?? "-"}\n`;

      const diagText =
        "\n\n--- 診断シート ---\n" +
        `用件カテゴリ: ${categoryLabel}\n` +
        `目的: ${goalText}\n` +
        `希望プラン: ${planLabel}\n` +
        `公開目標: ${launchLabel}（短納期加算なし・段階公開で対応）\n` +
        `優先度: ${priorityLabel}\n` +
        `素材: ${assetsLabel}\n` +
        `業種: ${diag.industry}\n` +
        `現サイト: ${diag.hasSite}${diag.siteUrl ? ` / ${diag.siteUrl}` : ""}\n` +
        (diag.category === "incident"
          ? `重要度: ${severityLabel}\n事象メモ: ${diag.incidentNote || "-"}\n`
          : "");

      // honeypot が埋まっていたらサーバー送信しない（ボット想定）
      if (hp.trim() !== "") throw new Error("送信に失敗しました。");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company: company || undefined,
          tel: tel || undefined,
          message: (message || "") + diagText + metaText,
          // turnstileToken: undefined // ← 将来有効化時に復帰
        }),
      });

      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !json?.ok) throw new Error(json?.error || "送信に失敗しました。");

      setDone(true);
      setStep(3);
      track("contact_submit_succeeded");
      track("submit_contact_form_succeeded");

      // 入力リセット
      setName("");
      setCompany("");
      setEmail("");
      setTel("");
      setMessage("");
      setDiag({
        category: "",
        goal: [],
        goalOther: "",
        plan: "",
        launch: "",
        priority: "",
        assets: [],
        industry: "",
        hasSite: "",
        siteUrl: "",
        severity: "",
        incidentNote: "",
      });
    } catch (err: any) {
      const msg = String(err?.message || err || "");
      setError(msg || "送信に失敗しました。");
      track("contact_submit_failed", { reason: msg });
      track("submit_contact_form_failed", { reason: msg });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  /** ---------- UI ---------- */
  return (
    <main className="min-h-[calc(100vh-6rem)] py-12">
      <div className="container mx-auto max-w-3xl px-4">
        <Card className="shadow-lg">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6" aria-hidden="true" />
              <CardTitle className="text-2xl">お問い合わせ</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              約2分で完了。<span className="font-medium">営業電話は行いません</span>。原則24時間以内にメールで返信します。
            </p>
          </CardHeader>

          <CardContent>
            {/* 完了メッセージ */}
            {done && step === 3 && (
              <div
                className="mb-6 flex items-start gap-3 rounded-lg border p-4"
                role="status"
                aria-live="polite"
                tabIndex={-1}
                ref={successRef}
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5" aria-hidden="true" />
                <div>
                  <p className="font-medium">送信が完了しました。</p>
                  <p className="text-sm text-muted-foreground">
                    原則24時間以内にメールでご連絡します。自動返信メールもご確認ください。
                  </p>
                </div>
              </div>
            )}

            {/* エラーメッセージ */}
            {error && (
              <div
                className="mb-6 flex items-start gap-3 rounded-lg border border-destructive/50 p-4"
                role="alert"
                aria-live="assertive"
                tabIndex={-1}
                ref={errorRef}
              >
                <AlertCircle className="mt-0.5 h-5 w-5 text-destructive" aria-hidden="true" />
                <div>
                  <p className="font-medium text-destructive">エラーが発生しました</p>
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>
              </div>
            )}

            {/* --- ステップ1：診断シート --- */}
            {step === 1 && (
              <section className="space-y-8" id="get-sheet" aria-label="診断シート">
                {/* ステッパー */}
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="rounded-full border px-2 py-0.5 font-medium">1</span> 用件と目的
                  <span className="mx-2 text-xs opacity-60">→</span>
                  <span className="rounded-full border px-2 py-0.5">2</span> 連絡先
                </div>

                {/* 1) 用件カテゴリ */}
                <div>
                  <h2 className="mb-3 text-lg font-semibold">ご用件（必須）</h2>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {categories.map((c) => (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => {
                          setDiag((d) => ({ ...d, category: c.value }));
                          track("contact_category_changed", { category: c.value });
                        }}
                        className={`rounded-xl border px-4 py-3 text-left ${
                          diag.category === c.value
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                        aria-pressed={diag.category === c.value}
                      >
                        <div className="font-medium">{c.label}</div>
                        {c.hint && (
                          <div className="mt-0.5 text-xs text-muted-foreground">{c.hint}</div>
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    ※「その他」は自由入力であらゆるお問い合わせにお使いください。
                  </p>
                </div>

                {/* 2) 目的（カテゴリに応じて任意/必須切替） */}
                <div>
                  <h2 className="mb-3 text-lg font-semibold">ご相談の目的（複数選択可）</h2>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {goals.map((g) => {
                      const selected = diag.goal.includes(g);
                      return (
                        <button
                          key={g}
                          type="button"
                          onClick={() =>
                            setDiag((d) => ({
                              ...d,
                              goal: selected ? d.goal.filter((x) => x !== g) : [...d.goal, g],
                            }))
                          }
                          className={`rounded-xl border px-4 py-3 text-left ${
                            selected ? "border-blue-600 bg-blue-50" : "border-gray-300 hover:bg-gray-50"
                          }`}
                          aria-pressed={selected}
                        >
                          {g}
                        </button>
                      );
                    })}
                  </div>
                  {diag.goal.includes("その他（自由入力）") && (
                    <input
                      type="text"
                      placeholder="目的の補足（自由入力）"
                      className="mt-3 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
                      value={diag.goalOther}
                      onChange={(e) => setDiag((d) => ({ ...d, goalOther: e.target.value }))}
                    />
                  )}
                  <p className="mt-2 text-xs text-muted-foreground">
                    ※「不具合・障害連絡」「その他」の場合、目的は未選択でも次へ進めます。
                  </p>
                </div>

                {/* 3) 希望プラン / 公開目標 */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <fieldset>
                    <legend className="mb-3 block text-lg font-semibold">希望プラン（任意）</legend>
                    {planOptions.map((p) => (
                      <label key={p.value} className="mb-2 block">
                        <input
                          type="radio"
                          name="plan"
                          className="mr-2"
                          onChange={() => setDiag((d) => ({ ...d, plan: p.value }))}
                          checked={diag.plan === p.value}
                        />
                        {p.label}
                      </label>
                    ))}
                    <p className="mt-1 block text-xs text-muted-foreground">
                      ※ 迷っていても大丈夫です。未選択のまま送信できます。
                    </p>
                  </fieldset>

                  <div>
                    <label className="mb-3 block text-lg font-semibold" htmlFor="launch">
                      公開目標（任意）
                    </label>
                    <select
                      id="launch"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
                      value={diag.launch}
                      onChange={(e) => setDiag((d) => ({ ...d, launch: e.target.value as Launch }))}
                    >
                      <option value="">未選択</option>
                      {launchOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <p className="mt-1 text-xs text-muted-foreground">
                      ※ 短納期加算はありません。段階公開で柔軟に対応します。
                    </p>
                  </div>
                </div>

                {/* 4) 業種 / 現サイト有無 */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-3 block text-lg font-semibold" htmlFor="industry">
                      業種（必須）
                    </label>
                    <input
                      id="industry"
                      type="text"
                      placeholder="例）美容院 / 整骨院 / 飲食"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
                      value={diag.industry}
                      onChange={(e) => setDiag((d) => ({ ...d, industry: e.target.value }))}
                    />
                  </div>

                  <fieldset>
                    <legend className="mb-3 block text-lg font-semibold">現サイトの有無（必須）</legend>
                    {(["あり", "なし"] as const).map((v) => (
                      <label key={v} className="mr-4">
                        <input
                          type="radio"
                          name="hasSite"
                          className="mr-2"
                          onChange={() => setDiag((d) => ({ ...d, hasSite: v }))}
                          checked={diag.hasSite === v}
                        />
                        {v}
                      </label>
                    ))}
                    {diag.hasSite === "あり" && (
                      <input
                        type="url"
                        placeholder="現サイトURL"
                        className="mt-3 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
                        value={diag.siteUrl}
                        onChange={(e) => setDiag((d) => ({ ...d, siteUrl: e.target.value }))}
                      />
                    )}
                  </fieldset>
                </div>

                {/* 5) 優先事項 / 素材（任意） */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-3 block text-lg font-semibold" htmlFor="priority">
                      優先したいこと（任意）
                    </label>
                    <select
                      id="priority"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
                      value={diag.priority}
                      onChange={(e) =>
                        setDiag((d) => ({ ...d, priority: e.target.value as Diagnosis["priority"] }))
                      }
                    >
                      <option value="">未選択</option>
                      <option value="speed">スピード（できるだけ早く）</option>
                      <option value="cost">コスト（費用を抑えたい）</option>
                      <option value="scope">内容（機能やページを優先）</option>
                    </select>
                  </div>

                  <fieldset>
                    <legend className="mb-3 block text-lg font-semibold">素材の準備状況（任意）</legend>
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      {[
                        ["texts", "原稿あり"],
                        ["photos", "写真あり"],
                        ["logo", "ロゴあり"],
                        ["existing_site", "既存サイトあり"],
                        ["none", "未準備が多い"],
                      ].map(([v, l]) => {
                        const set = new Set(diag.assets);
                        const checked = set.has(v as any);
                        return (
                          <label key={v} className="inline-flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e) => {
                                const next = new Set(set);
                                e.target.checked ? next.add(v as any) : next.delete(v as any);
                                setDiag((d) => ({ ...d, assets: Array.from(next) as any }));
                              }}
                            />
                            {l}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>

                {/* 6) 不具合・障害カテゴリの追加入力 */}
                {diag.category === "incident" && (
                  <div className="rounded-xl border p-4">
                    <p className="mb-2 text-sm font-semibold">不具合・障害の詳細（任意）</p>
                    <div className="mb-3 text-xs text-muted-foreground">
                      重要度の目安：P1=重大（決済/フォーム不可など）／P2=中度（機能の一部不調）／P3=軽度（表示崩れ/誤字等）
                    </div>
                    <div className="mb-4">
                      {(["p1", "p2", "p3"] as const).map((v) => (
                        <label key={v} className="mr-4">
                          <input
                            type="radio"
                            name="severity"
                            className="mr-2"
                            onChange={() => setDiag((d) => ({ ...d, severity: v }))}
                            checked={diag.severity === v}
                          />
                          {v.toUpperCase()}
                        </label>
                      ))}
                    </div>
                    <textarea
                      placeholder="発生日・事象・影響範囲・再現手順など"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
                      rows={4}
                      value={diag.incidentNote}
                      onChange={(e) => setDiag((d) => ({ ...d, incidentNote: e.target.value }))}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    disabled={!canNext}
                    aria-disabled={!canNext}
                    onClick={() => {
                      track("contact_step1_completed", { category: diag.category });
                      setStep(2);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    次へ（連絡先の入力）
                  </Button>
                </div>
              </section>
            )}

            {/* --- ステップ2：連絡先フォーム --- */}
            {step === 2 && (
              <form onSubmit={onSubmit} className="space-y-5" noValidate>
                {/* honeypot（人は見えない） */}
                <input
                  type="text"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  className="hidden"
                  aria-hidden="true"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium" htmlFor="name">
                      お名前 <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="山田 太郎"
                      autoComplete="name"
                      className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium" htmlFor="company">
                      会社名
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="株式会社〇〇"
                      autoComplete="organization"
                      className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium" htmlFor="email">
                      メールアドレス <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      aria-invalid={email !== "" && !isEmailValid}
                      aria-describedby="email-error"
                      className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
                    />
                    {!isEmailValid && email !== "" && (
                      <p id="email-error" className="text-xs text-destructive">
                        メールアドレスの形式が正しくありません。
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium" htmlFor="tel">
                      電話番号
                    </label>
                    <input
                      id="tel"
                      type="tel"
                      value={tel}
                      onChange={(e) => setTel(e.target.value)}
                      placeholder="090-1234-5678"
                      autoComplete="tel"
                      className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium" htmlFor="message">
                    ご要望（任意 / 「その他」はできるだけ詳しく）
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder={
                      diag.category === "other"
                        ? "ご相談内容を自由にご記入ください。"
                        : "ご相談内容・現状の課題など（例：先にLPを公開し、後から会社概要と事例を追加したい）"
                    }
                    className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" disabled={!canSubmit} aria-disabled={!canSubmit} className="w-full sm:w-auto">
                    {loading ? "送信中..." : "送信する"}
                  </Button>
                  <p className="mt-2 text-xs text-muted-foreground">
                    送信により、
                    <Link href="/legal/privacy" className="underline underline-offset-4">
                      プライバシーポリシー
                    </Link>
                    ・
                    <Link href="/legal/tokusho" className="underline underline-offset-4">
                      特定商取引法に基づく表記
                    </Link>
                    に同意したものとみなします。
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-sm text-blue-700 underline-offset-4 hover:underline"
                  >
                    ← 診断シートに戻る
                  </button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* フッター注意書き（信頼感の補強） */}
        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-muted-foreground">
          個人情報はお問い合わせ対応のみに利用します。営業目的の連絡は行いません。必要に応じて秘密保持契約（NDA）にも対応します。
        </p>
      </div>
    </main>
  );
}
