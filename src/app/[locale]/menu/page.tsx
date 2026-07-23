import { notFound } from "next/navigation";
import { MenuBoard } from "@/components/MenuBoard";
import { resolveCategoryParam } from "@/lib/categories";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getMenuItems } from "@/lib/menu";

export const dynamic = "force-dynamic";

export default async function MenuPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ cat?: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;

  const { cat } = await searchParams;
  const [items, dict] = await Promise.all([
    getMenuItems(false, locale),
    Promise.resolve(getDictionary(locale)),
  ]);
  const initialCategory = resolveCategoryParam(cat);

  return (
    <MenuBoard items={items} initialCategory={initialCategory} locale={locale} dict={dict} />
  );
}
