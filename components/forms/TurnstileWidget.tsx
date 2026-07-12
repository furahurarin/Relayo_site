"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const LOAD_TIMEOUT_MS = 15_000;
const READY_POLL_MS = 100;

export type TurnstileWidgetHandle = {
  reset: () => void;
};

type TurnstileWidgetProps = {
  siteKey?: string;
  onVerify: (token: string) => void;
  onError: () => void;
  onExpire: () => void;
  onTimeout: () => void;
};

const TurnstileWidget = forwardRef<
  TurnstileWidgetHandle,
  TurnstileWidgetProps
>(function TurnstileWidget(
  { siteKey, onVerify, onError, onExpire, onTimeout },
  ref,
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const callbacksRef = useRef({ onVerify, onError, onExpire, onTimeout });

  callbacksRef.current = { onVerify, onError, onExpire, onTimeout };

  const reset = useCallback(() => {
    const widgetId = widgetIdRef.current;
    if (!widgetId || typeof window === "undefined") return;

    try {
      window.turnstile?.reset(widgetId);
    } catch {
      callbacksRef.current.onError();
    }
  }, []);

  useImperativeHandle(ref, () => ({ reset }), [reset]);

  useEffect(() => {
    if (!siteKey) return;

    let disposed = false;
    let renderFailed = false;
    let pollId: number | undefined;
    let timeoutId: number | undefined;

    const resetAfterCallback = () => {
      window.setTimeout(() => {
        if (!disposed) reset();
      }, 0);
    };

    const renderWidget = () => {
      if (
        disposed ||
        renderFailed ||
        widgetIdRef.current ||
        !containerRef.current ||
        !window.turnstile
      ) {
        return;
      }

      try {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          appearance: "always",
          execution: "render",
          size: "flexible",
          theme: "light",
          callback: (token) => {
            setLoadError(null);
            callbacksRef.current.onVerify(token);
          },
          "error-callback": () => {
            callbacksRef.current.onError();
            resetAfterCallback();
          },
          "expired-callback": () => {
            callbacksRef.current.onExpire();
            resetAfterCallback();
          },
          "timeout-callback": () => {
            callbacksRef.current.onTimeout();
            resetAfterCallback();
          },
        });
        setLoadError(null);
        if (pollId !== undefined) window.clearInterval(pollId);
        if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      } catch {
        renderFailed = true;
        setLoadError(
          "本人確認を表示できませんでした。ページを再読み込みしてお試しください。",
        );
        callbacksRef.current.onError();
        if (pollId !== undefined) window.clearInterval(pollId);
        if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      }
    };

    renderWidget();
    if (!widgetIdRef.current) {
      pollId = window.setInterval(renderWidget, READY_POLL_MS);
      timeoutId = window.setTimeout(() => {
        if (!disposed && !widgetIdRef.current) {
          setLoadError(
            "本人確認の読み込みに時間がかかっています。通信環境をご確認ください。",
          );
          callbacksRef.current.onError();
        }
      }, LOAD_TIMEOUT_MS);
    }

    return () => {
      disposed = true;
      if (pollId !== undefined) window.clearInterval(pollId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);

      const widgetId = widgetIdRef.current;
      widgetIdRef.current = null;
      if (widgetId) {
        try {
          window.turnstile?.remove(widgetId);
        } catch {
          // The iframe may already have been removed during navigation.
        }
      }
    };
  }, [reset, siteKey]);

  if (!siteKey) {
    return (
      <p className="text-sm text-destructive" role="alert">
        本人確認を利用できません。時間をおいてから再度お試しください。
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <div
        ref={containerRef}
        className="min-h-[65px] max-w-full overflow-hidden"
        aria-label="Cloudflare Turnstileによる本人確認"
      />
      {loadError && (
        <p className="text-sm text-destructive" role="alert">
          {loadError}
        </p>
      )}
    </div>
  );
});

export default TurnstileWidget;
