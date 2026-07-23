export const locales = ["hy", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "hy";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const localeLabels: Record<Locale, string> = {
  hy: "Հայ",
  ru: "Рус",
};
