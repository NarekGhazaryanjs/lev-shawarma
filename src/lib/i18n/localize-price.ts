import type { Locale } from "@/lib/i18n/config";

export function localizePrice(price: string, locale: Locale) {
  if (locale === "hy" || !price) return price;
  return price.replace(/դրամ/g, "драм").replace(/դր\./g, "драм").replace(/դր\b/g, "драм");
}
