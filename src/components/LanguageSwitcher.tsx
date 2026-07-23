"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { localeLabels, locales } from "@/lib/i18n/config";
import { localizePath, stripLocale } from "@/lib/i18n/paths";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(nextLocale: Locale) {
    if (nextLocale === locale) return;
    document.cookie = `locale=${nextLocale};path=/;max-age=31536000`;
    const path = stripLocale(pathname);
    router.push(localizePath(path, nextLocale));
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-black/10 bg-white/70 p-1">
      {locales.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => switchLocale(item)}
          className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
            item === locale ? "bg-brand text-white" : "text-ink-soft hover:text-ink"
          }`}
        >
          {localeLabels[item]}
        </button>
      ))}
    </div>
  );
}
