import Link from "next/link";
import { notFound } from "next/navigation";
import { getAboutContent } from "@/lib/about";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { localizePath } from "@/lib/i18n/paths";
import { getSiteSettings } from "@/lib/menu";

export const dynamic = "force-dynamic";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;

  const [about, settings, dict] = await Promise.all([
    getAboutContent(locale),
    getSiteSettings(),
    Promise.resolve(getDictionary(locale)),
  ]);
  const phoneHref = `tel:${settings.phone.replace(/\s/g, "")}`;

  return (
    <div className="shell pb-20 pt-12 md:pt-16">
      <p className="label mb-3">{about.label}</p>
      <h1 className="title-lg mb-10">{about.title}</h1>

      <div className="surface overflow-hidden">
        <div className="grid items-stretch lg:grid-cols-[0.95fr_1.05fr]">
          {about.image ? (
            <div className="about-media">
              <img src={about.image} alt={about.title} className="about-image" />
            </div>
          ) : null}

          <div className="flex flex-col justify-center gap-6 p-8 md:p-12">
            {about.intro ? <p className="text-lg leading-8 text-ink">{about.intro}</p> : null}
            {about.paragraph1 ? (
              <p className="text-soft text-lg leading-8">{about.paragraph1}</p>
            ) : null}
            {about.paragraph2 ? (
              <p className="text-soft text-lg leading-8">{about.paragraph2}</p>
            ) : null}

            <div className="flex flex-col gap-3 border-t border-black/8 pt-6 sm:flex-row">
              <Link href={localizePath("/menu", locale)} className="btn btn-brand">
                {dict.common.menu}
              </Link>
              <a href={phoneHref} className="btn btn-ghost">
                {settings.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
