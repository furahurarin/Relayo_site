// app/contact/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";

/** Turnstileスクリプトを読み込む（多重読込を防止） */
const loadScript = (src: string) =>
  new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load: ${src}`));
    document.head.appendChild(s);
  });

export default function ContactPage() {
  // 入力
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [message, setMessage] = useState("");

  // 状態
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Turnstile
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  const tsContainerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        if (!siteKey) return;
        await loadScript("https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit");
        if (cancelled || !tsContainerRef.current) return;

        // 既存があればリセット
        if (widgetIdRef.current && (window as any).turnstile?.reset) {
          (window as any).turnstile.reset(widgetIdRef.current);
          widgetIdRef.current = null;
        }

        // 明示レンダリング
        const id = (window as any).turnstile?.render?.(tsContainerRef.current, {
          sitekey: siteKey,
          action: "contact_form",
          appearance: "always",
          theme: "auto",
          "refresh-expired": "auto",
          callback: (tkn: string) => setToken(tkn),
          "error-callback": () => setToken(null),
          "expired-callback": () => setToken(null),
        });

        if (typeof id === "string") widgetIdRef.current = id;
      } catch (e) {
        console.error(e);
        setError("ボット検証の初期化に失敗しました。時間をおいて再度お試しください。");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [siteKey]);

  const canSubmit = !!name && !!email && !!token && !loading;

  // Umami があれば送る（無ければ無視）
  const track = (event: string, data?: Record<string, any>) =>
    (typeof window !== "undefined" && (window as any)?.umami?.track?.(event, data));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError(null);
    try {
      track("contact_submit_clicked");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company: company || undefined,
          tel: tel || undefined,
          message: message || undefined,
          turnstileToken: token,
        }),
      });

      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "送信に失敗しました。");

      setDone(true);
      track("contact_submit_succeeded");

      // 入力リセット
      setName("");
      setCompany("");
      setEmail("");
      setTel("");
      setMessage("");
      setToken(null);

      // ウィジェットリセット（戻り値は void）
      if ((window as any).turnstile?.reset && widgetIdRef.current) {
        (window as any).turnstile.reset(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    } catch (err: any) {
      setError(err?.message || "送信に失敗しました。");
      track("contact_submit_failed", { reason: String(err?.message || err) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-6rem)] py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="shadow-lg">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6" />
              <CardTitle className="text-2xl">お問い合わせ</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              送信後すぐに受付メールを自動送信します。届かない場合は迷惑メールをご確認ください。
            </p>
          </CardHeader>

          <CardContent>
            {done && (
              <div className="mb-6 rounded-lg border p-4 flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5" />
                <div>
                  <p className="font-medium">送信が完了しました。</p>
                  <p className="text-sm text-muted-foreground">
                    1営業日以内に担当者よりご連絡いたします。自動返信メールもご確認ください。
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 rounded-lg border border-destructive/50 p-4 flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 text-destructive" />
                <div>
                  <p className="font-medium text-destructive">エラーが発生しました</p>
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    お名前 <span className="text-destructive">*</span>
                  </label>
                  <input
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
                  <label className="block text-sm font-medium">会社名</label>
                  <input
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
                  <label className="block text-sm font-medium">
                    メールアドレス <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">電話番号</label>
                  <input
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
                <label className="block text-sm font-medium">ご要件</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder="ご相談内容・現状の課題・ご希望の予算や納期など"
                  className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Turnstile Widget */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">ボット対策</label>
                {!siteKey ? (
                  <p className="text-sm text-destructive">
                    NEXT_PUBLIC_TURNSTILE_SITE_KEY が未設定です（本番環境の Env に設定してください）。
                  </p>
                ) : (
                  <div ref={tsContainerRef} className="cf-turnstile w-[300px] h-[65px]" />
                )}
                <p className="text-xs text-muted-foreground">
                  このサイトは Cloudflare Turnstile により保護されています。
                </p>
              </div>

              <div className="pt-2">
                <Button type="submit" disabled={!canSubmit} className="w-full sm:w-auto">
                  {loading ? "送信中..." : "送信する"}
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">
                  送信により、プライバシーポリシーに同意したものとみなします。
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
