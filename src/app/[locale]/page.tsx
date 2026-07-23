import Link from "next/link";
import { notFound } from "next/navigation";
import { FeaturedMenuGrid } from "@/components/FeaturedMenuGrid";
import { MENU_CATEGORIES, getCategoryLabel, getMenuCategoryHref } from "@/lib/categories";
import { getHomeContent } from "@/lib/home";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { localizePath } from "@/lib/i18n/paths";
import { getLocalizedAddress, getLocalizedBrand } from "@/lib/i18n/localized-settings";
import { getMenuItems, getSiteSettings } from "@/lib/menu";

export const dynamic = "force-dynamic";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;

  const [settings, featured, home, dict] = await Promise.all([
    getSiteSettings(),
    getMenuItems(true, locale),
    getHomeContent(locale),
    Promise.resolve(getDictionary(locale)),
  ]);

  const phoneHref = `tel:${settings.phone.replace(/\s/g, "")}`;
  const heroImage = "/images/hero.png";
  const address = getLocalizedAddress(settings, locale);
  const brandSubtitle = getLocalizedBrand(settings, locale);

  return (
    <>
      <section className="shell pt-10 pb-14 md:pt-14">
        <div className="home-hero surface overflow-hidden">
          <div className="grid items-stretch lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
              <p className="label mb-4">{settings.brandName}</p>
              <h1 className="title-xl mb-4">{brandSubtitle}</h1>
              <p className="text-soft mb-2 max-w-lg text-lg leading-8">{home.heroTagline}</p>
              <p className="text-soft mb-8 text-sm">{address}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href={localizePath("/menu", locale)} className="btn btn-brand">
                  {dict.common.viewMenu}
                </Link>
                <a href={phoneHref} className="btn btn-ghost">
                  {settings.phone}
                </a>
              </div>
            </div>
            <div className="home-hero-media">
              <img src={heroImage} alt={settings.brandName} className="home-hero-image" />
            </div>
          </div>
        </div>
      </section>

      {featured.length > 0 ? (
        <section className="shell pb-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="label mb-2">{dict.home.hit}</p>
              <h2 className="title-lg">{dict.home.hitTitle}</h2>
            </div>
            <Link href={localizePath("/menu", locale)} className="footer-link">
              {dict.home.allItems}
            </Link>
          </div>
          <FeaturedMenuGrid items={featured} viewImageOf={dict.common.viewImageOf} />
        </section>
      ) : null}

      <section className="shell pb-16">
        <div className="mb-8">
          <p className="label mb-2">{dict.home.menuSection}</p>
          <h2 className="title-lg">{dict.home.pickCategory}</h2>
        </div>
        <div className="home-category-grid">
          {MENU_CATEGORIES.map((category) => (
            <Link
              key={category}
              href={getMenuCategoryHref(category, locale)}
              className="home-category-card"
            >
              {getCategoryLabel(category, locale)}
            </Link>
          ))}
        </div>
      </section>

      <section className="shell pb-16">
        <div className="surface p-8 md:p-10">
          <p className="label mb-2">{dict.home.order}</p>
          <h2 className="title-lg mb-8">{dict.home.howToOrder}</h2>
          <div className="home-steps">
            <div className="home-step">
              <span className="home-step-num">1</span>
              <div>
                <h3 className="mb-2 text-lg font-bold">{home.step1Title}</h3>
                <p className="text-soft leading-7">{home.step1Text}</p>
              </div>
            </div>
            <div className="home-step">
              <span className="home-step-num">2</span>
              <div>
                <h3 className="mb-2 text-lg font-bold">{home.step2Title}</h3>
                <p className="text-soft leading-7">
                  {home.step2Text}{" "}
                  <a href={phoneHref} className="footer-link footer-link-strong">
                    {settings.phone}
                  </a>
                </p>
              </div>
            </div>
            <div className="home-step">
              <span className="home-step-num">3</span>
              <div>
                <h3 className="mb-2 text-lg font-bold">{home.step3Title}</h3>
                <p className="text-soft leading-7">{home.step3Text}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell pb-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="surface p-8 md:p-10">
            <p className="label mb-2">{dict.home.aboutTitle}</p>
            <h2 className="title-lg mb-4">{settings.brandName}</h2>
            <p className="text-soft mb-6 leading-8">{home.aboutText}</p>
            <Link href={localizePath("/about", locale)} className="btn btn-ghost w-fit">
              {dict.common.learnMore}
            </Link>
          </div>
          <div className="surface p-8 md:p-10">
            <p className="label mb-2">{dict.home.contactTitle}</p>
            <h2 className="title-lg mb-6">{dict.home.findUs}</h2>
            <div className="space-y-4">
              <p className="text-soft leading-7">{address}</p>
              <a href={phoneHref} className="footer-link footer-link-strong block">
                {settings.phone}
              </a>
              <div className="footer-social-row pt-2">
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social"
                >
                  Instagram
                </a>
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social"
                >
                  Facebook
                </a>
              </div>
              <Link href={localizePath("/contact", locale)} className="btn btn-brand mt-4 w-fit">
                {dict.common.contactPage}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
