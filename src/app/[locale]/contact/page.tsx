import Link from "next/link";
import { notFound } from "next/navigation";
import { getContactContent } from "@/lib/contact";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { localizePath } from "@/lib/i18n/paths";
import { getLocalizedAddress } from "@/lib/i18n/localized-settings";
import { getSiteSettings } from "@/lib/menu";

export const dynamic = "force-dynamic";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;

  const [contact, settings, dict] = await Promise.all([
    getContactContent(locale),
    getSiteSettings(),
    Promise.resolve(getDictionary(locale)),
  ]);
  const phoneHref = `tel:${settings.phone.replace(/\s/g, "")}`;
  const address = getLocalizedAddress(settings, locale);
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(settings.address)}&z=16&output=embed`;

  return (
    <div className="shell pb-20 pt-12 md:pt-16">
      <p className="label mb-3">{contact.label}</p>
      <h1 className="title-lg mb-10">{contact.title}</h1>

      <div className="space-y-6">
        <div className="surface overflow-hidden">
          <div className="grid items-stretch lg:grid-cols-[0.95fr_1.05fr]">
            {contact.image ? (
              <div className="about-media">
                <img src={contact.image} alt={contact.title} className="about-image" />
              </div>
            ) : null}

            <div className="flex flex-col justify-center gap-6 p-8 md:p-12">
              {contact.intro ? <p className="text-lg leading-8 text-ink">{contact.intro}</p> : null}
              {contact.paragraph1 ? (
                <p className="text-soft text-lg leading-8">{contact.paragraph1}</p>
              ) : null}
              {contact.paragraph2 ? (
                <p className="text-soft text-lg leading-8">{contact.paragraph2}</p>
              ) : null}

              <div className="flex flex-col gap-3 border-t border-black/8 pt-6 sm:flex-row">
                <a href={phoneHref} className="btn btn-brand">
                  {settings.phone}
                </a>
                <Link href={localizePath("/menu", locale)} className="btn btn-ghost">
                  {dict.common.menu}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="surface p-8 md:p-10">
            <p className="label mb-2">{dict.contact.details}</p>
            <h2 className="title-lg mb-6">{dict.contact.findUs}</h2>
            <div className="space-y-5">
              <div>
                <p className="text-soft mb-1 text-sm font-semibold">{dict.common.address}</p>
                <p className="text-lg leading-8">{address}</p>
              </div>
              <div>
                <p className="text-soft mb-1 text-sm font-semibold">{dict.common.phone}</p>
                <a href={phoneHref} className="footer-link footer-link-strong text-lg">
                  {settings.phone}
                </a>
              </div>
              <div>
                <p className="text-soft mb-3 text-sm font-semibold">{dict.common.social}</p>
                <div className="footer-social-row">
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
              </div>
            </div>
          </div>

          <div className="surface overflow-hidden">
            <iframe
              title="LEV Shawarma map"
              src={mapSrc}
              className="h-full min-h-80 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
