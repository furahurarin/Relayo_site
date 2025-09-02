// components/cta/FloatingContactCTA.tsx
"use client";
import { useEffect, useState } from "react";
import ContactCTA from "./ContactCTA";

export default function FloatingContactCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-3 z-50 px-4">
      <div className="mx-auto max-w-screen-sm rounded-2xl bg-white/90 shadow-lg backdrop-blur p-3">
        <p className="mb-2 text-center text-sm text-gray-600">
          2分で完了。営業電話は行いません。メールで丁寧にご案内します。
        </p>
        <ContactCTA full />
      </div>
    </div>
  );
}
