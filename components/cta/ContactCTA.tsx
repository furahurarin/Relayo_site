// components/cta/ContactCTA.tsx
"use client";
import Link from "next/link";

type Props = { variant?: "primary" | "ghost"; full?: boolean; small?: boolean };

export default function ContactCTA({ variant = "primary", full, small }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-2xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const size = small ? "px-4 py-2 text-sm" : "px-6 py-3 text-base";
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600"
      : "text-blue-700 hover:text-blue-900";
  const width = full ? "w-full" : "";

  return (
    <Link
      href="/contact"
      className={`${base} ${size} ${styles} ${width}`}
      onClick={() => (window as any)?.umami?.track?.("click_contact_cta")}
      aria-label="お問い合わせ（無料診断つき）フォームへ"
    >
      お問い合わせ（無料診断つき）
    </Link>
  );
}
