// app/contact/page.tsx
"use client";

/**
 * - Step1: 用件（カテゴリ）→ 具体的な状況・希望
 * - Step2: 連絡先 → 完了
 * - 一言要約はなし。本文だけ必須。
 * - 「箇条書きで構いません」は使わない。
 * - 不具合セクションの「必須／任意」を整理（重要度＝必須、テキスト詳細＝任意）。
 * - 希望プランは Starter / Standard / Growth / LPパック。
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";

type Plan = "starter_lp" | "essential" | "standard" | "growth" | "";
type Launch =
  | "lp_5_10" // 5–10 営業日（LPパック目安）
  | "ess_2_3w" // 2–3 週間（Starterプラン目安）
  | "std_3_4w" // 3–4 週間（Standard目安）
  | "gro_4_6w" // 4–6 週間（Growth目安）
  | "undecided"
  | "";
type Category =
  | "quote_new" // 新規制作・見積
  | "improve" // 改善・リニューアル相談
  | "incident" // 不具合・障害連絡
  | "billing_docs" // 見積/請求/契約/発注書など
  | "care_change" // 保守プランの相談・変更
  | "recruit" // 制作パートナー募集
  | "other" // その他
  | "";
type Priority = "speed" | "cost" | "scope" | "";

type DiagState = {
  // 共通
  category: Category;
  summary: string; // 内部用サマリ（UIでは直接使わない）
  detail: string; // 具体的な状況・希望（必須）

  // 新規/改善系（任意）
  goal: string[];
  goalOther: string;
  plan: Plan;
  launch: Launch;
  priority: Priority;
  assets: ("texts" | "photos" | "logo" | "existing_site" | "none")[];
  industry: string;
  hasSite: "あり" | "なし" | "";
  siteUrl: string;

  // 不具合カテゴリ向け（任意）
  severity: "p1" | "p2" | "p3" | "";
  incidentNote: string;
};

export default function ContactPage() {
  /** ---------- 入力（ステップ2） ---------- */
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [agree, setAgree] = useState(false);

  /** ---------- 診断（ステップ1） ---------- */
  const [diag, setDiag] = useState<DiagState>({
    category: "",
    summary: "",
    detail: "",
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

  /** ---------- 進行状態 ---------- */
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** ---------- Honeypot & タイマー ---------- */
  const [hp, setHp] = useState("");
  const [startedAt] = useState(() => Date.now());

  /** ---------- UTM / リファラ ---------- */
  const [utm, setUtm] = useState<Record<string, string>>({});
  const [pathInfo, setPathInfo] = useState<{ pathname?: string; search?: string }>({});

  const successRef = useRef<HTMLDivElement | null>(null);
  const errorRef = useRef<HTMLDivElement | null>(null);

  /** ---------- カテゴリ/目的/プラン候補 ---------- */

  const categories: { value: Category; label: string; desc: string }[] = [
    {
      value: "quote_new",
      label: "新規ホームページの制作・見積もり",
      desc: "新しくホームページを立ち上げたい方向け",
    },
    {
      value: "improve",
      label: "既存サイトの改善・リニューアルの相談",
      desc: "今のサイトの見づらさや導線を改善したい方向け",
    },
    {
      value: "incident",
      label: "不具合・障害の連絡",
      desc: "表示崩れやフォーム不調などのトラブル",
    },
    {
      value: "billing_docs",
      label: "見積書・請求書・契約書の発行に関する相談",
      desc: "書類まわりのご相談はこちら",
    },
    {
      value: "care_change",
      label: "運用・保守プランの相談・変更",
      desc: "プラン見直しやスポット対応のご相談",
    },
    {
      value: "recruit",
      label: "制作パートナー・業務委託に関するお問い合わせ",
      desc: "デザイナー/エンジニアの方など",
    },
    {
      value: "other",
      label: "その他のお問い合わせ",
      desc: "上記以外のご相談はこちら",
    },
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
    { value: "essential", label: "Starter プラン" },
    { value: "standard", label: "Standard プラン" },
    { value: "growth", label: "Growth プラン" },
    { value: "starter_lp", label: "LPパック（LPのみ）" },
  ];

  const launchOptions: { value: Launch; label: string }[] = [
    { value: "lp_5_10", label: "5–10 営業日（LPパック目安）" },
    { value: "ess_2_3w", label: "2–3 週間（Starterプラン目安）" },
    { value: "std_3_4w", label: "3–4 週間（Standard目安）" },
    { value: "gro_4_6w", label: "4–6 週間（Growth目安）" },
    { value: "undecided", label: "未定" },
  ];

  /** ---------- バリデーション ---------- */
  const isEmailValid = /\S+@\S+\.\S+/.test(email);

  // Step1 の必須条件
  const canNext = (() => {
    if (!diag.category) return false;
    if (!diag.detail) return false;
    if (diag.category === "incident" && !diag.severity) return false;
    return true;
  })();

  // Step2 の送信ボタン活性条件
  const canSubmit =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    isEmailValid &&
    agree &&
    !!diag.category &&
    !!diag.detail;

  /** ---------- UTM とパスの取得 ---------- */
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const params = new URLSearchParams(window.location.search);
      const utmParams: Record<string, string> = {};
      ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((key) => {
        const v = params.get(key);
        if (v) utmParams[key] = v;
      });
      setUtm(utmParams);
    } catch {
      // ignore
    }

    try {
      setPathInfo({
        pathname: window.location.pathname,
        search: window.location.search || "",
      });
    } catch {
      // ignore
    }
  }, []);

  /** ---------- クエリから初期カテゴリを推定 ---------- */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const c = params.get("c") || "";
    const qp = params.get("plan") || "";

    const map: Record<string, Category> = {
      new: "quote_new",
      improve: "improve",
      incident: "incident",
      billing: "billing_docs",
      care: "care_change",
      recruit: "recruit",
      other: "other",
    };

    const category = map[c] ?? "";
    const isPlan = qp && ["starter_lp", "essential", "standard", "growth"].includes(qp);

    if (category) {
      setDiag((d) => ({ ...d, category }));
    }

    if (isPlan) {
      setDiag((d) => ({ ...d, plan: qp as Plan }));
    }
  }, []);

  /** ---------- Umami/計測 ---------- */
  const track = (event: string, data?: Record<string, any>) => {
    try {
      
      window.umami?.track?.(event, data);
    } catch {
      // ignore
    }
  };

  /** ---------- サマリー文字列生成（運営側向け） ---------- */
  const buildSummary = () => {
    const categoryLabel =
      categories.find((c) => c.value === diag.category)?.label ?? "未選択";

    const planLabel =
      planOptions.find((x) => x.value === diag.plan)?.label ?? "未選択";
    const launchLabel =
      launchOptions.find((x) => x.value === diag.launch)?.label ?? "未定";
    const priorityLabel =
      diag.priority === "speed"
        ? "スピード優先"
        : diag.priority === "cost"
        ? "コスト優先"
        : diag.priority === "scope"
        ? "ボリューム優先"
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

    const goalText =
      diag.goal.length > 0
        ? diag.goal.join(", ") +
          (diag.goal.includes("その他（自由入力）") && diag.goalOther
            ? ` / ${diag.goalOther}`
            : "")
        : diag.category === "other" || diag.category === "incident"
        ? "(目的は任意)"
        : "未選択";

    const severityLabel =
      diag.severity === "p1"
        ? "P1（重大）"
        : diag.severity === "p2"
        ? "P2（中度）"
        : diag.severity === "p3"
        ? "P3（軽度）"
        : diag.category === "incident"
        ? "未選択"
        : "対象外";

    // UIでは一言要約を入力させないので、詳細の先頭行から自動サマリを作成
    const autoSummary = diag.detail
      ? diag.detail.split(/\r?\n/)[0].slice(0, 80)
      : "";

    const summaryLine = autoSummary || diag.summary || "-";

    return [
      `ご要件カテゴリ: ${categoryLabel}`,
      "",
      `要約: ${summaryLine}`,
      "",
      "▼ 詳細（そのまま本文にも含まれます）",
      diag.detail || "-",
      "",
      "▼ 目的・希望",
      `目的: ${goalText}`,
      `希望プラン: ${planLabel}`,
      `公開目標: ${launchLabel}`,
      `優先したいこと: ${priorityLabel}`,
      "",
      "▼ 現状・素材",
      `業種: ${diag.industry || "-"}`,
      `現サイトの有無: ${
        diag.hasSite === "あり"
          ? `あり / ${diag.siteUrl || "URL未記入"}`
          : diag.hasSite === "なし"
          ? "なし"
          : "未選択"
      }`,
      `素材の状況: ${assetsLabel}`,
      "",
      "▼ 不具合・障害（該当する場合）",
      `重要度: ${severityLabel}`,
      `詳細: ${diag.incidentNote || "-"}`,
    ].join("\n");
  };

  /** ---------- 本文生成 ---------- */
  const buildMessage = () => {
    const base = buildSummary();

    const utmLines =
      Object.keys(utm).length > 0
        ? [
            "",
            "▼ 計測用情報（自動取得）",
            ...Object.entries(utm).map(
              ([k, v]) => `${k}: ${decodeURIComponent(v)}`,
            ),
          ]
        : [];

    const pathLine =
      pathInfo.pathname || pathInfo.search
        ? `アクセス元URL: ${pathInfo.pathname || ""}${pathInfo.search || ""}`
        : "";

    const ipLine = ""; // IPはサーバーログで確認

    return [base, pathLine, ipLine, ...utmLines].filter(Boolean).join("\n");
  };

  /** ---------- 送信 ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const elapsedSec = (Date.now() - startedAt) / 1000;
    if (elapsedSec < 5) {
      setError("送信が早すぎます。恐れ入りますが数秒おいてから再度お試しください。");
      return;
    }

    if (hp.trim() !== "") {
      // honeypot: Bot は静かに成功したふりをする
      setDone(true);
      setStep(3);
      return;
    }

    if (!canSubmit) return;

    setSending(true);
    track("submit_contact_form_started");

    const payload = {
      name: name.trim(),
      email: email.trim(),
      company: company.trim() || undefined,
      tel: tel.trim() || undefined,
      detail: buildMessage(),
      category: diag.category,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg =
          typeof data.error === "string"
            ? data.error
            : `送信に失敗しました（${res.status}）`;
        setError(msg);
        setDone(false);
        track("submit_contact_form_failed", { status: res.status, msg });
        errorRef.current?.focus();
        return;
      }

      setDone(true);
      setStep(3);
      track("submit_contact_form_succeeded");

      successRef.current?.focus();
    } catch (err) {
      console.error(err);
      setError("通信エラーが発生しました。時間をおいて再度お試しください。");
      setDone(false);
      track("submit_contact_form_failed", { error: String(err) });
      errorRef.current?.focus();
    } finally {
      setSending(false);
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
              約2分で完了。ご相談内容を確認のうえ、原則24時間以内にメールで返信します。
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
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" aria-hidden="true" />
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

            {/* ステップ表示 */}
            <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span
                  className={`h-6 w-6 rounded-full text-center text-[11px] font-semibold ${
                    step === 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  1
                </span>
                <span className={step === 1 ? "font-semibold text-gray-900" : ""}>
                  ご要件とご希望の整理
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`h-6 w-6 rounded-full text-center text-[11px] font-semibold ${
                    step === 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  2
                </span>
                <span className={step === 2 ? "font-semibold text-gray-900" : ""}>
                  連絡先の入力・送信
                </span>
              </div>
            </div>

            {/* ステップ1：診断シート */}
            {step === 1 && (
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!canNext) return;
                  setStep(2);
                }}
              >
                {/* カテゴリ選択 */}
                <section aria-labelledby="category-heading" className="space-y-3">
                  <div>
                    <h2
                      id="category-heading"
                      className="text-sm font-semibold text-gray-900"
                    >
                      ご要件を教えてください（必須）
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      一番近いものをお選びください。迷う場合は「その他」を選んでいただいても問題ありません。
                    </p>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {categories.map((c) => (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => {
                          setDiag((d) => ({ ...d, category: c.value }));
                          track("select_contact_category", { category: c.value });
                        }}
                        className={`rounded-xl border p-3 text-left text-xs sm:text-sm ${
                          diag.category === c.value
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                        aria-pressed={diag.category === c.value}
                      >
                        <div className="font-semibold text-gray-900">{c.label}</div>
                        <div className="mt-1 text-[11px] text-muted-foreground">
                          {c.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </section>

                {/* 詳細（必須） */}
                <section aria-labelledby="detail-heading" className="space-y-3">
                  <div>
                    <h2
                      id="detail-heading"
                      className="text-sm font-semibold text-gray-900"
                    >
                      具体的な状況やご希望を教えてください（必須）
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      今の状況と、気になっている点・実現したいことを書いてください。
                    </p>
                  </div>

                  <div className="space-y-2">
                    <textarea
                      id="detail"
                      required
                      value={diag.detail}
                      onChange={(e) =>
                        setDiag((d) => ({ ...d, detail: e.target.value }))
                      }
                      rows={6}
                      className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                      placeholder={`例）
いまのホームページが古く、スマホで見づらい
新しく始めたサービスの情報が載せられていない
問い合わせフォームが分かりづらく、最近は問い合わせが減っている

など、今の状況と気になっている点をご自由にお書きください。`}
                    />
                  </div>
                </section>

                {/* 目的・希望（新規/改善系のみ） */}
                {(diag.category === "quote_new" || diag.category === "improve") && (
                  <section aria-labelledby="goal-heading" className="space-y-3">
                    <div>
                      <h2
                        id="goal-heading"
                        className="text-sm font-semibold text-gray-900"
                      >
                        サイトの目的・ゴール（任意）
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        近いものがあれば教えてください。複数選択も可能です。
                      </p>
                    </div>

                    <div className="grid gap-2 md:grid-cols-2">
                      {goals.map((g) => {
                        const selected = diag.goal.includes(g);
                        return (
                          <button
                            key={g}
                            type="button"
                            onClick={() =>
                              setDiag((d) => ({
                                ...d,
                                goal: selected
                                  ? d.goal.filter((x) => x !== g)
                                  : [...d.goal, g],
                              }))
                            }
                            className={`rounded-xl border px-4 py-3 text-left ${
                              selected
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-300 hover:bg-gray-50"
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
                        onChange={(e) =>
                          setDiag((d) => ({ ...d, goalOther: e.target.value }))
                        }
                      />
                    )}
                  </section>
                )}

                {/* 希望プラン・公開目標（任意） */}
                {(diag.category === "quote_new" || diag.category === "improve") && (
                  <section aria-labelledby="plan-heading" className="space-y-3">
                    <div>
                      <h2
                        id="plan-heading"
                        className="text-sm font-semibold text-gray-900"
                      >
                        希望するプランや公開の目安（任意）
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        現時点でのイメージで構いません。未定の場合は空欄のままで大丈夫です。
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray-900">ご希望のプラン</p>
                      <div className="flex flex-wrap gap-2">
                        {planOptions.map((p) => (
                          <label key={p.value}>
                            <input
                              type="radio"
                              name="plan"
                              className="mr-2"
                              onChange={() =>
                                setDiag((d) => ({ ...d, plan: p.value }))
                              }
                              checked={diag.plan === p.value}
                            />
                            {p.label}
                          </label>
                        ))}
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        料金や内容の詳細は{" "}
                        <Link
                          href="/pricing"
                          className="text-blue-700 underline-offset-2 hover:underline"
                          target="_blank"
                        >
                          料金ページ
                        </Link>
                        でもご確認いただけます。
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray-900">公開の目安</p>
                      <select
                        value={diag.launch}
                        onChange={(e) =>
                          setDiag((d) => ({
                            ...d,
                            launch: e.target.value as Launch,
                          }))
                        }
                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">選択しない（未定）</option>
                        {launchOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <p className="text-[11px] text-muted-foreground">
                        短納期であっても、特別な追加料金はいただいていません。
                        素材のご用意状況やボリュームに応じて、実現できるスケジュールをご提案します。
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray-900">
                        優先したいこと（任意）
                      </p>
                      <div className="flex flex-wrap gap-3 text-xs">
                        {[
                          { value: "speed", label: "スピード" },
                          { value: "cost", label: "コスト" },
                          { value: "scope", label: "ボリューム（やりたいことの幅）" },
                        ].map((p) => (
                          <label key={p.value} className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="priority"
                              onChange={() =>
                                setDiag((d) => ({ ...d, priority: p.value as Priority }))
                              }
                              checked={diag.priority === p.value}
                            />
                            {p.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {/* 素材・現状 */}
                {(diag.category === "quote_new" || diag.category === "improve") && (
                  <section aria-labelledby="assets-heading" className="space-y-3">
                    <div>
                      <h2
                        id="assets-heading"
                        className="text-sm font-semibold text-gray-900"
                      >
                        現状のご準備状況（任意）
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        分かる範囲で書いていただければ大丈夫です。あとから変更も可能です。
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-medium" htmlFor="industry">
                        業種・業態
                      </label>
                      <input
                        id="industry"
                        type="text"
                        placeholder="例）内科クリニック／美容室／士業事務所 など"
                        className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                        value={diag.industry}
                        onChange={(e) =>
                          setDiag((d) => ({ ...d, industry: e.target.value }))
                        }
                      />
                    </div>

                    <fieldset>
                      <legend className="mb-3 block text-xs font-medium">
                        現在のホームページ
                      </legend>
                      {(["あり", "なし"] as const).map((v) => (
                        <label key={v} className="mr-4 text-xs">
                          <input
                            type="radio"
                            name="hasSite"
                            className="mr-2"
                            onChange={() =>
                              setDiag((d) => ({ ...d, hasSite: v }))
                            }
                            checked={diag.hasSite === v}
                          />
                          {v}
                        </label>
                      ))}
                      {diag.hasSite === "あり" && (
                        <input
                          type="url"
                          placeholder="現サイトURL"
                          className="mt-3 w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                          value={diag.siteUrl}
                          onChange={(e) =>
                            setDiag((d) => ({ ...d, siteUrl: e.target.value }))
                          }
                        />
                      )}
                    </fieldset>

                    <fieldset>
                      <legend className="mb-3 block text-xs font-medium">
                        すでにご用意のあるもの（任意）
                      </legend>
                      <div className="flex flex-wrap gap-3 text-xs">
                        {[
                          { value: "texts", label: "原稿" },
                          { value: "photos", label: "写真" },
                          { value: "logo", label: "ロゴ" },
                          { value: "existing_site", label: "既存サイト" },
                          { value: "none", label: "まだあまり準備できていない" },
                        ].map((a) => {
                          const checked = diag.assets.includes(a.value as any);
                          return (
                            <label key={a.value} className="flex items-center gap-1">
                              <input
                                type="checkbox"
                                onChange={() => {
                                  setDiag((d) => {
                                    const exists = d.assets.includes(a.value as any);
                                    if (exists) {
                                      return {
                                        ...d,
                                        assets: d.assets.filter(
                                          (x) => x !== (a.value as any),
                                        ),
                                      };
                                    }
                                    return {
                                      ...d,
                                      assets: [...d.assets, a.value as any],
                                    };
                                  });
                                }}
                                checked={checked}
                              />
                              {a.label}
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>
                  </section>
                )}

                {/* 不具合・障害カテゴリ用 */}
                {diag.category === "incident" && (
                  <section aria-labelledby="incident-heading" className="space-y-3">
                    <div>
                      <h2
                        id="incident-heading"
                        className="text-sm font-semibold text-gray-900"
                      >
                        不具合・障害について（必須項目あり）
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        重要度の選択は必須です。文章での詳細は、書ける範囲で大丈夫です。
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="mb-2 text-xs font-medium text-gray-900">
                          重要度（必須）
                        </p>
                        <div className="mb-3 text-[11px] text-muted-foreground">
                          目安：P1 = 重大（決済・フォーム送信などができない）／
                          P2 = 中度（機能の一部が不安定）／
                          P3 = 軽度（表示崩れ・誤字など）
                        </div>
                        <div className="mb-1">
                          {(["p1", "p2", "p3"] as const).map((v) => (
                            <label key={v} className="mr-4 text-xs">
                              <input
                                type="radio"
                                name="severity"
                                className="mr-2"
                                onChange={() =>
                                  setDiag((d) => ({ ...d, severity: v }))
                                }
                                checked={diag.severity === v}
                              />
                              {v.toUpperCase()}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs font-medium text-gray-900">
                          状況の詳細（任意）
                        </p>
                        <textarea
                          placeholder="発生日・発生しているページURL・どのような操作をしたときに起きるか・影響範囲などが分かる範囲であれば記載してください。"
                          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                          rows={4}
                          value={diag.incidentNote}
                          onChange={(e) =>
                            setDiag((d) => ({
                              ...d,
                              incidentNote: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                  </section>
                )}

                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={!canNext}>
                    次へ（連絡先の入力へ進む）
                  </Button>
                </div>
              </form>
            )}

            {/* ステップ2：連絡先入力 */}
            {step === 2 && (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <section aria-labelledby="contact-heading" className="space-y-3">
                  <div>
                    <h2
                      id="contact-heading"
                      className="text-sm font-semibold text-gray-900"
                    >
                      ご連絡先
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      お問い合わせへの回答をお送りするために必要な情報になります。
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium" htmlFor="name">
                      お名前（必須）
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
                      会社名・屋号
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="株式会社◯◯／山田クリニック など"
                      autoComplete="organization"
                      className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium" htmlFor="email">
                      メールアドレス（必須）
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
                    <p className="text-xs text-muted-foreground">
                      原則、メールでご連絡します。お急ぎの場合など、電話連絡をご希望の際はその旨を本文にご記載ください。
                    </p>
                  </div>
                </section>

                {/* 同意チェックボックス */}
                <section aria-label="同意事項" className="space-y-3">
                  <div className="flex items-start gap-2">
                    <input
                      id="agree"
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      className="mt-1"
                      required
                    />
                    <label htmlFor="agree" className="text-xs text-gray-800">
                      <span className="font-medium">
                        プライバシーポリシーと利用規約に同意のうえ送信します。
                      </span>
                      <br />
                      お預かりした情報は、お問い合わせ対応以外の目的には利用しません。
                    </label>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    <Link
                      href="/legal/privacy"
                      className="text-blue-700 underline-offset-2 hover:underline"
                      target="_blank"
                    >
                      プライバシーポリシー
                    </Link>{" "}
                    ／{" "}
                    <Link
                      href="/legal/terms"
                      className="text-blue-700 underline-offset-2 hover:underline"
                      target="_blank"
                    >
                      利用規約
                    </Link>
                  </p>
                </section>

                {/* honeypot */}
                <div className="hidden">
                  <label htmlFor="hp">Leave this field empty</label>
                  <input
                    id="hp"
                    type="text"
                    autoComplete="off"
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    disabled={sending}
                  >
                    ← 戻る
                  </Button>
                  <Button type="submit" disabled={!canSubmit || sending}>
                    {sending ? "送信中..." : "送信する"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* フッター注意書き */}
        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-muted-foreground">
          個人情報はお問い合わせ対応のみに利用します。営業目的の連絡は行いません。必要に応じて秘密保持契約（NDA）にも対応します。
        </p>
      </div>
    </main>
  );
}
