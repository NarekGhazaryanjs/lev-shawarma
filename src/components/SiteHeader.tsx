"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { InteractivePill } from "@/components/InteractivePill";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { getMainLinks } from "@/lib/navigation";
import { getLocalizedBrand } from "@/lib/i18n/localized-settings";
import { localizePath } from "@/lib/i18n/paths";

type Settings = {
  brandName: string;
  brandNameHy: string;
  brandNameRu: string;
};

export function SiteHeader({
  settings,
  locale,
  dict,
}: {
  settings: Settings;
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = getMainLinks(dict, locale);
  const brandSubtitle = getLocalizedBrand(settings, locale);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[#fffdf9]/88 backdrop-blur-xl">
      <div className="shell flex items-center justify-between gap-4 py-4">
        <Link href={localizePath("/", locale)} className="group flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-brand text-sm font-extrabold text-white transition duration-300 group-hover:scale-105 group-hover:shadow-[0_12px_28px_rgba(184,50,26,0.28)]">
            L
          </span>
          <span>
            <strong className="block text-base leading-none transition group-hover:text-brand">
              {settings.brandName}
            </strong>
            <small className="text-soft text-sm">{brandSubtitle}</small>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <InteractivePill key={link.href} href={link.href} active={pathname === link.href}>
              {link.label}
            </InteractivePill>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <button
            type="button"
            className="inline-flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-black/10 transition hover:border-brand/25 hover:bg-brand-soft/40 lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={dict.common.openMenu}
          >
            <span className={`h-0.5 w-5 bg-ink transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-ink transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 bg-ink transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-black/5 bg-[#fffdf9] px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <InteractivePill
                key={link.href}
                href={link.href}
                active={pathname === link.href}
                className="w-full justify-center"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </InteractivePill>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
