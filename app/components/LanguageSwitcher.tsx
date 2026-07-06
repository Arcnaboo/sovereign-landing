"use client";

import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/content/types";

export function LanguageSwitcher({ current }: { current: Locale }) {
  const router = useRouter();

  async function setLocale(locale: Locale) {
    await fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale }),
    });
    router.refresh();
  }

  return (
    <div className="flex items-center gap-1 rounded-sm border border-platinum/15 p-0.5">
      {(["en", "tr"] as Locale[]).map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => setLocale(locale)}
          className={`rounded-sm px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition ${
            current === locale
              ? "bg-gold/20 text-gold"
              : "text-platinum/45 hover:text-platinum"
          }`}
          aria-label={locale === "en" ? "English" : "Türkçe"}
        >
          {locale}
        </button>
      ))}
    </div>
  );
}
