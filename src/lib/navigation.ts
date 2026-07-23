import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/paths";

export function getMainLinks(dict: Dictionary, locale: Locale) {
  return [
    { href: localizePath("/", locale), label: dict.nav.home },
    { href: localizePath("/about", locale), label: dict.nav.about },
    { href: localizePath("/menu", locale), label: dict.nav.menu },
    { href: localizePath("/delivery", locale), label: dict.nav.delivery },
    { href: localizePath("/contact", locale), label: dict.nav.contact },
  ] as const;
}
