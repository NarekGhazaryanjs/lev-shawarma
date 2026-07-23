import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getSiteSettings } from "@/lib/menu";

export function generateStaticParams() {
  return [{ locale: "hy" }, { locale: "ru" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const [settings, dict] = await Promise.all([getSiteSettings(), Promise.resolve(getDictionary(locale))]);

  return (
    <>
      <SiteHeader settings={settings} locale={locale} dict={dict} />
      <main>{children}</main>
      <SiteFooter settings={settings} locale={locale} dict={dict} />
    </>
  );
}
