import type { Locale } from "@/lib/i18n/config";

export function localizePath(path: string, locale: Locale) {
  const stripped = path.replace(/^\/(hy|ru)(?=\/|$)/, "") || "/";
  const suffix = stripped === "/" ? "" : stripped;
  return `/${locale}${suffix}`;
}

export function stripLocale(pathname: string) {
  return pathname.replace(/^\/(hy|ru)(?=\/|$)/, "") || "/";
}
