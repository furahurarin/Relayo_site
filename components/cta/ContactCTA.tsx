// components/cta/ContactCTA.tsx
"use client";
import Link from "next/link";

type Props = { variant?: "primary" | "ghost"; full?: boolean; small?: boolean };

export default function ContactCTA({ variant = "primary", full, small }: Props) {
  // ベースのスタイル：角丸、中央寄せ、トランジション
  const base =
    "inline-flex items-center justify-center rounded-full font-bold tracking-wide transition-all duration-300 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 active:scale-95";

  const size = small ? "px-5 py-2 text-sm" : "px-8 py-3.5 text-base";
  const width = full ? "w-full" : "";

  // ■ Primary (メインボタン): グラデーション ＋ 影 ＋ 光沢感
  const primary =
    // 背景色（グラデーション）
    "bg-gradient-to-r from-blue-600 to-cyan-500 " +
    // 文字色
    "text-white " +
    // ボーダー（うっすら内側の光）
    "border border-white/10 " +
    // 影（青い発光感）
    "shadow-lg shadow-blue-500/30 " +
    // ホバー時：少し明るく、少し浮く
    "hover:shadow-blue-500/50 hover:brightness-110 hover:-translate-y-0.5 " +
    // visitedでも白文字を維持
    "visited:text-white";

  // ■ Ghost (サブボタン/リンク風): 文字メイン ＋ ホバーで背景
  const ghost =
    "text-blue-600 dark:text-blue-400 bg-transparent " +
    "hover:bg-blue-50 dark:hover:bg-blue-900/20 " +
    "visited:text-blue-600 dark:visited:text-blue-400";

  const styles = variant === "primary" ? primary : ghost;
  
  // 文言を少し行動喚起（Call to Action）寄りに変更しても良いですが、
  // ここでは汎用性の高い「お問い合わせ」のままにします。
  const label = "お問い合わせ";

  return (
    <Link
      href="/contact"
      data-cta={variant}
      className={`${base} ${size} ${styles} ${width}`}
      onClick={() => (window as any)?.umami?.track?.("click_contact_cta")}
      aria-label={`${label}フォームへ移動`}
    >
      {label}
    </Link>
  );
}