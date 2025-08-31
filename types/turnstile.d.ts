// types/turnstile.d.ts
export {};

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
          "timeout-callback"?: () => void;
          "refresh-expired"?: "auto" | "manual" | "never";
          appearance?: "always" | "execute" | "interaction-only";
          theme?: "auto" | "light" | "dark";
          action?: string;
        }
      ) => string;
      reset?: (id?: string) => void;
      remove?: (id?: string) => void;
    };
  }
}
