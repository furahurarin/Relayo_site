// /types/turnstile.d.ts
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
          action?: string;
          appearance?: "always" | "execute" | "interaction-only";
          "refresh-expired"?: "auto" | "manual" | boolean;
          retry?: "auto" | "never";
          "retry-interval"?: number;
          cData?: string;
          execution?: "render" | "execute";
        } & Record<string, any>
      ) => string; // renderはwidgetId(string)を返す
      reset?: (id?: string | HTMLElement) => void;
    };
  }
}

export {};
