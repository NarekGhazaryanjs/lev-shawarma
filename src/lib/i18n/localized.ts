import type { Locale } from "@/lib/i18n/config";

export function localized(
  record: Record<string, unknown>,
  field: string,
  locale: Locale
): string {
  if (locale === "ru") {
    const ruValue = record[`${field}Ru`];
    if (typeof ruValue === "string" && ruValue.trim()) {
      return ruValue;
    }
  }

  const value = record[field];
  return typeof value === "string" ? value : "";
}
