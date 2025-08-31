// components/forms/ApplicationForm.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const REQUIRE_TURNSTILE =
  (process.env.NEXT_PUBLIC_REQUIRE_TURNSTILE ?? "0") !== "0";
const SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??
  process.env.TURNSTILE_SITE_KEY ??
  "";

// Turnstileスクリプト読込（多重読込防止）
const loadScript = (src: string) =>
  new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined") return resolve();
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load: ${src}`));
    document.head.appendChild(s);
  });

const Schema = z
  .object({
    name: z.string().min(1, "お名前を入力してください"),
    company: z.string().optional(),
    email: z.string().email("メールアドレスの形式が正しくありません"),
    tel: z.string().optional(),
    message: z.string().min(10, "ご要件を具体的にご記入ください（10文字以上）"),
    turnstileToken: z.string().optional(),
    agree: z.literal(true, {
      errorMap: () => ({ message: "規約とプライバシーに同意が必要です" }),
    }),
    hp: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    if (REQUIRE_TURNSTILE) {
      if (!val.turnstileToken || val.turnstileToken.length < 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "認証に失敗しました。再度お試しください",
          path: ["turnstileToken"],
        });
      }
    }
  });

export default function ApplicationForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [error, setError] = useState<string | null>(null);

  // Turnstile
  const [token, setToken] = useState("");
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const pendingExecRef = useRef(false); // execute後に再送信用

  useEffect(() => {
    if (!REQUIRE_TURNSTILE) return;
    let cancelled = false;
    (async () => {
      try {
        if (!SITE_KEY) {
          setError("ボット検証キーが未設定です。管理者にお問い合わせください。");
          return;
        }
        await loadScript(
          "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        );
        if (cancelled || !widgetRef.current) return;

        // 既存ウィジェットをクリア
        if (widgetIdRef.current && (window as any).turnstile?.reset) {
          (window as any).turnstile.reset(widgetIdRef.current);
          widgetIdRef.current = null;
        }

        // Invisible + execute モード（表示なし）
        const id = (window as any).turnstile?.render?.(widgetRef.current, {
          sitekey: SITE_KEY,
          size: "invisible",
          appearance: "execute",
          action: "application_form",
          "refresh-expired": "auto",
          callback: (tkn: string) => {
            setToken(tkn);
            // トークン取得後に pending なら自動再送信
            if (pendingExecRef.current && formRef.current) {
              pendingExecRef.current = false;
              formRef.current.requestSubmit();
            }
          },
          "error-callback": () =>
            setError(
              "認証エラーが発生しました。ページを再読み込みしてからお試しください。"
            ),
          "expired-callback": () => setToken(""),
        });
        if (typeof id === "string") widgetIdRef.current = id;
      } catch (e) {
        console.error(e);
        setError(
          "ボット検証の初期化に失敗しました。時間をおいて再度お試しください。"
        );
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    // Invisibleモード：トークンが無ければまず execute して戻る
    if (REQUIRE_TURNSTILE && !token) {
      if (widgetIdRef.current && (window as any).turnstile?.execute) {
        pendingExecRef.current = true;
        (window as any).turnstile.execute(widgetIdRef.current);
        return; // callback 後に requestSubmit される
      }
    }

    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") || ""),
      company: String(fd.get("company") || ""),
      email: String(fd.get("email") || ""),
      tel: String(fd.get("tel") || ""),
      message: String(fd.get("message") || ""),
      turnstileToken: REQUIRE_TURNSTILE ? token : "",
      agree: fd.get("agree") === "on",
      hp: String(fd.get("hp") || ""),
    };

    // 蜜壺が埋まっていたら中止（成功を装う）
    if (raw.hp) {
      setLoading(false);
      setOk(true);
      return;
    }

    const parsed = Schema.safeParse(raw);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || "入力に不備があります");
      setLoading(false);
      return;
    }

    const payload: Record<string, any> = {
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company || undefined,
      tel: parsed.data.tel || undefined,
      phone: parsed.data.tel || undefined, // 互換
      message: parsed.data.message,
      detail: parsed.data.message, // 互換
    };
    if (REQUIRE_TURNSTILE) {
      payload.cfToken = parsed.data.turnstileToken;
      payload.turnstileToken = parsed.data.turnstileToken;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };

      if (res.ok && json.ok) {
        setOk(true);
        formRef.current?.reset?.();
        setToken("");

        // 次回に備えて invisible を再準備
        if (REQUIRE_TURNSTILE && (window as any).turnstile?.reset && widgetIdRef.current) {
          (window as any).turnstile.reset(widgetIdRef.current);
        }
      } else {
        throw new Error(json.error || "送信に失敗しました。");
      }
    } catch (err: any) {
      setError(err?.message || "ネットワークエラーが発生しました。時間をおいて再試行してください。");
    } finally {
      setLoading(false);
    }
  }

  if (ok) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>送信が完了しました</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>ありがとうございます。自動返信メールをお送りしました。1営業日以内に担当よりご連絡いたします。</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>お申し込みフォーム</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">お名前 *</label>
              <input name="name" required className="w-full rounded-md border px-3 py-2" autoComplete="name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">会社名</label>
              <input name="company" className="w-full rounded-md border px-3 py-2" autoComplete="organization" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">メールアドレス *</label>
              <input name="email" type="email" required className="w-full rounded-md border px-3 py-2" autoComplete="email" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">電話番号</label>
              <input name="tel" className="w-full rounded-md border px-3 py-2" autoComplete="tel" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">ご要件・相談内容 *</label>
            <textarea name="message" required rows={6} className="w-full rounded-md border px-3 py-2" />
          </div>

          {/* Turnstile（Invisible。DOMには置くが非表示） */}
          {REQUIRE_TURNSTILE ? (
            <div
              ref={widgetRef}
              style={{ width: 0, height: 0, overflow: "hidden", position: "absolute", opacity: 0, pointerEvents: "none" }}
              aria-hidden="true"
            />
          ) : null}

          {/* 蜜壺（確実に視覚非表示 & フォーカス不可） */}
          <div
            style={{
              position: "absolute",
              left: "-10000px",
              top: "auto",
              width: "1px",
              height: "1px",
              overflow: "hidden",
            }}
            aria-hidden="true"
          >
            <label htmlFor="hp">HP</label>
            <input id="hp" name="hp" tabIndex={-1} autoComplete="off" />
          </div>

          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" name="agree" />
            <span>
              <a className="underline" href="/legal/terms" target="_blank" rel="noreferrer">
                利用規約
              </a>{" "}
              と{" "}
              <a className="underline" href="/legal/privacy" target="_blank" rel="noreferrer">
                プライバシー
              </a>{" "}
              に同意します
            </span>
          </label>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full md:w-auto">
            {loading ? "送信中..." : "送信する"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}