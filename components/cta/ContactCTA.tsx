// components/cta/ContactCTA.tsx
"use client";
import Link from "next/link";

type Props = { variant?: "primary" | "ghost"; full?: boolean; small?: boolean };

export default function ContactCTA({ variant = "primary", full, small }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-2xl font-semibold transition-colors duration-200 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const size = small ? "px-4 py-2 text-sm" : "px-6 py-3 text-base";
  const width = full ? "w-full" : "";

  // 塗り：文字＝白（visited時も白を維持）
  const primary =
    "bg-[hsl(var(--cta))] text-[hsl(var(--cta-foreground))] " +
    "visited:text-[hsl(var(--cta-foreground))] " +
    "hover:bg-[hsl(var(--cta-hover))] active:bg-[hsl(var(--cta-active))] " +
    "focus-visible:ring-[hsl(var(--cta-ring))]";

  // リンク風：visitedでも同じ色を維持
  const ghost =
    "text-[hsl(var(--cta-ghost))] visited:text-[hsl(var(--cta-ghost))] " +
    "underline-offset-4 hover:text-[hsl(var(--cta-hover))] hover:underline " +
    "focus-visible:ring-[hsl(var(--cta-ring))]";

  const styles = variant === "primary" ? primary : ghost;
  const label = "お問い合わせ";

  return (
    <Link
      href="/contact"
      data-cta={variant}                            // ← CSS除外フラグ
      className={`${base} ${size} ${styles} ${width}`}
      onClick={() => (window as any)?.umami?.track?.("click_contact_cta")}
      aria-label={`${label}（フォームへ）`}
    >
      {label}
    </Link>
  );
}
