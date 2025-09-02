// app/contact/page.tsx
"use client";

/**
 * Turnstile 無効化版（後日再有効化しやすい構成）
 * - ボット対策：honeypot のみ
 * - 診断シート（Step1）→ 連絡先（Step2）→ 完了（Step3）
 * - Umami イベントは既存命名＋新命名の両対応
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";

type Diagnosis = {
  goal: string[]; // 複数選択
  budget: string; // 〜30 / 30〜80 / 80〜150 / 150〜 / 未定
  timeline: string; // 2週間 / 1ヶ月 / 2〜3ヶ月 / 未定
  industry: string; // 業種
  hasSite: "あり" | "なし" | "";
  siteUrl: string;
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
    goal: [],
    budget: "",
    timeline: "",
    industry: "",
    hasSite: "",
    siteUrl: "",
  });

  /** ---------- 状態 ---------- */
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const successRef = useRef<HTMLDivElement | null>(null);
  const errorRef = useRef<HTMLDivElement | null>(null);

  /** ---------- バリデーション ---------- */
  const goals = [
    "集客を増やしたい",
    "予約/問い合わせ導線を改善したい",
    "サイトのリニューアル",
    "新規サイト立ち上げ",
    "EC/オンライン決済を入れたい",
    "SNS/LINE連携を強化したい",
  ];
  const canNext =
    diag.goal.length > 0 &&
    !!diag.budget &&
    !!diag.timeline &&
    !!diag.industry &&
    !!diag.hasSite &&
    (diag.hasSite === "なし" || (diag.hasSite === "あり" && diag.siteUrl.trim().length >= 4));

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const canSubmit = !!name && isEmailValid && !loading && hp === "";

  /** ---------- Umami（存在する時だけ発火） ---------- */
  const track = (event: string, data?: Record<string, any>) =>
    (typeof window !== "undefined" && (window as any)?.umami?.track?.(event, data));

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

    setLoading(true);
    setError(null);
    try {
      track("contact_submit_clicked");
      track("submit_contact_form_started");

      const diagText =
        "\n\n--- 診断シート ---\n" +
        `目的: ${diag.goal.join(", ")}\n` +
        `予算: ${diag.budget}\n` +
        `期日: ${diag.timeline}\n` +
        `業種: ${diag.industry}\n` +
        `現サイト: ${diag.hasSite}${diag.siteUrl ? ` / ${diag.siteUrl}` : ""}\n`;

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
          message: (message || "") + diagText,
          // turnstileToken: undefined // ← 将来有効化時に復帰
        }),
      });

      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
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
        goal: [],
        budget: "",
        timeline: "",
        industry: "",
        hasSite: "",
        siteUrl: "",
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
              2分で完了。営業電話は行いません。回答はメールでお送りします。
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
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <fieldset>
                    <legend className="mb-3 block text-lg font-semibold">ご予算感</legend>
                    {["〜30万円", "30〜80万円", "80〜150万円", "150万円〜", "未定"].map((b) => (
                      <label key={b} className="mb-2 block">
                        <input
                          type="radio"
                          name="budget"
                          className="mr-2"
                          onChange={() => setDiag((d) => ({ ...d, budget: b }))}
                          checked={diag.budget === b}
                        />
                        {b}
                      </label>
                    ))}
                  </fieldset>

                  <fieldset>
                    <legend className="mb-3 block text-lg font-semibold">希望リリース時期</legend>
                    {["2週間以内", "1ヶ月以内", "2〜3ヶ月", "未定"].map((t) => (
                      <label key={t} className="mb-2 block">
                        <input
                          type="radio"
                          name="timeline"
                          className="mr-2"
                          onChange={() => setDiag((d) => ({ ...d, timeline: t }))}
                          checked={diag.timeline === t}
                        />
                        {t}
                      </label>
                    ))}
                  </fieldset>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-3 block text-lg font-semibold" htmlFor="industry">
                      業種
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
                    <legend className="mb-3 block text-lg font-semibold">現サイトの有無</legend>
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

                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    disabled={!canNext}
                    aria-disabled={!canNext}
                    onClick={() => {
                      track("contact_step1_completed");
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
                    ご要望（任意）
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="ご相談内容・現状の課題・ご希望の予算や納期など"
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
      </div>
    </main>
  );
}
