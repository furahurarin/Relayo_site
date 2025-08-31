// components/forms/ApplicationForm.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: string | HTMLElement,
        opts: {
          sitekey: string;
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => void;
      reset?: (id?: string | HTMLElement) => void;
    };
  }
}

const Schema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  company: z.string().optional(),
  email: z.string().email("メールアドレスの形式が正しくありません"),
  phone: z.string().optional(),
  detail: z.string().min(10, "ご要件を具体的にご記入ください（10文字以上）"),
  cfToken: z.string().min(10, "認証に失敗しました。再度お試しください"),
  agree: z.literal(true, {
    errorMap: () => ({ message: "規約とプライバシーに同意が必要です" }),
  }),
  hp: z.string().optional(), // 蜜壺（スパム対策）
});

export default function ApplicationForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [error, setError] = useState<string | null>(null);
  const [cfToken, setCfToken] = useState("");
  const widgetRef = useRef<HTMLDivElement>(null);

  // Turnstile を描画（レイアウトでスクリプト読込済み）
  useEffect(() => {
    let tries = 0;
    const t = setInterval(() => {
      if (window.turnstile && widgetRef.current) {
        window.turnstile.render(widgetRef.current, {
          sitekey:
            (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string) ||
            (process.env.TURNSTILE_SITE_KEY as string),
          callback: (token) => setCfToken(token),
          "error-callback": () =>
            setError(
              "認証エラーが発生しました。ページを再読み込みしてください。"
            ),
          "expired-callback": () => setCfToken(""),
          theme: "auto",
        });
        clearInterval(t);
      } else if (++tries > 50) {
        clearInterval(t);
        setError(
          "認証スクリプトの読み込みに失敗しました。少し時間をおいてお試しください。"
        );
      }
    }, 200);
    return () => clearInterval(t);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") || ""),
      company: String(fd.get("company") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      detail: String(fd.get("detail") || ""),
      cfToken,
      agree: fd.get("agree") === "on",
      hp: String(fd.get("hp") || ""),
    };

    const parsed = Schema.safeParse(raw);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || "入力に不備があります");
      setLoading(false);
      return;
    }

    // サーバー側のスキーマに合わせてキーをマッピングして送信
    const payload = {
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.detail, // ← detail を message へ
      ["cf-turnstile-response"]: parsed.data.cfToken, // ← トークン名を合わせる
      // company / phone / hp / agree は現状サーバーでは未使用
    };

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (res.ok && json.ok) {
        setOk(true);
        (e.currentTarget as HTMLFormElement).reset();
        setCfToken("");
        // すべての Turnstile ウィジェットをリセット
        window.turnstile?.reset?.();
      } else {
        setError("送信に失敗しました（" + (json.error || "unknown") + "）");
      }
    } catch (err: any) {
      setError("ネットワークエラーが発生しました。時間をおいて再試行してください。");
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
          <p>
            ありがとうございます。自動返信メールをお送りしました。1営業日以内に担当よりご連絡いたします。
          </p>
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
        {/* onSubmit に変更（action は使用しない） */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">お名前 *</label>
              <input
                name="name"
                required
                className="w-full rounded-md border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">会社名</label>
              <input
                name="company"
                className="w-full rounded-md border px-3 py-2"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">
                メールアドレス *
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-md border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">電話番号</label>
              <input name="phone" className="w-full rounded-md border px-3 py-2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              ご要件・相談内容 *
            </label>
            <textarea
              name="detail"
              required
              rows={6}
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          {/* Turnstile ウィジェット（手動 render） */}
          <div ref={widgetRef} className="cf-turnstile" />

          {/* 蜜壺（ボット向け。ユーザーには非表示） */}
          <input name="hp" className="hidden" tabIndex={-1} autoComplete="off" />

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

          <Button type="submit" disabled={loading || !cfToken} className="w-full md:w-auto">
            {loading ? "送信中..." : "送信する"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
