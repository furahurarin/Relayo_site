declare global {
  type TurnstileWidgetId = string;

  type TurnstileRenderOptions = {
    sitekey: string;
    callback?: (token: string, preClearanceObtained?: boolean) => void;
    "error-callback"?: (errorCode?: string) => void;
    "expired-callback"?: () => void;
    "timeout-callback"?: () => void;
    action?: string;
    appearance?: "always" | "execute" | "interaction-only";
    cData?: string;
    execution?: "render" | "execute";
    language?: string;
    "refresh-expired"?: "auto" | "manual" | "never";
    "refresh-timeout"?: "auto" | "manual" | "never";
    retry?: "auto" | "never";
    "retry-interval"?: number;
    size?: "normal" | "compact" | "flexible";
    tabindex?: number;
    theme?: "light" | "dark" | "auto";
  };

  type Turnstile = {
    render: (
      element: string | HTMLElement,
      options: TurnstileRenderOptions,
    ) => TurnstileWidgetId;
    reset: (widgetId?: TurnstileWidgetId | HTMLElement) => void;
    remove: (widgetId?: TurnstileWidgetId | HTMLElement) => void;
    getResponse?: (widgetId?: TurnstileWidgetId | HTMLElement) => string;
    isExpired?: (widgetId?: TurnstileWidgetId | HTMLElement) => boolean;
  };

  interface Window {
    turnstile?: Turnstile;
  }
}

export {};
