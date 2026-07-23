import Link from "next/link";
import { notFound } from "next/navigation";
import { getDeliveryContent } from "@/lib/delivery";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { localizePath } from "@/lib/i18n/paths";
import { getLocalizedAddress } from "@/lib/i18n/localized-settings";
import { getSiteSettings } from "@/lib/menu";

export const dynamic = "force-dynamic";

export default async function DeliveryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;

  const [delivery, settings, dict] = await Promise.all([
    getDeliveryContent(locale),
    getSiteSettings(),
    Promise.resolve(getDictionary(locale)),
  ]);
  const phoneHref = `tel:${settings.phone.replace(/\s/g, "")}`;
  const address = getLocalizedAddress(settings, locale);

  const steps = [
    { title: delivery.step1Title, text: delivery.step1Text },
    { title: delivery.step2Title, text: delivery.step2Text },
    { title: delivery.step3Title, text: delivery.step3Text },
  ].filter((step) => step.title || step.text);

  return (
    <div className="shell pb-20 pt-12 md:pt-16">
      <p className="label mb-3">{delivery.label}</p>
      <h1 className="title-lg mb-10">{delivery.title}</h1>

      <div className="space-y-6">
        <div className="surface overflow-hidden">
          <div className="grid items-stretch lg:grid-cols-[0.95fr_1.05fr]">
            {delivery.image ? (
              <div className="about-media">
                <img src={delivery.image} alt={delivery.title} className="about-image" />
              </div>
            ) : null}

            <div className="flex flex-col justify-center gap-6 p-8 md:p-12">
              {delivery.intro ? <p className="text-lg leading-8 text-ink">{delivery.intro}</p> : null}
              {delivery.paragraph1 ? (
                <p className="text-soft text-lg leading-8">{delivery.paragraph1}</p>
              ) : null}
              {delivery.paragraph2 ? (
                <p className="text-soft text-lg leading-8">{delivery.paragraph2}</p>
              ) : null}

              <div className="flex flex-col gap-3 border-t border-black/8 pt-6 sm:flex-row">
                <a href={phoneHref} className="btn btn-brand">
                  {dict.common.callPhone} {settings.phone}
                </a>
                <Link href={localizePath("/menu", locale)} className="btn btn-ghost">
                  {dict.common.viewMenu}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {steps.length > 0 ? (
          <div className="surface p-8 md:p-10">
            <p className="label mb-2">{dict.delivery.order}</p>
            <h2 className="title-lg mb-8">{dict.delivery.howToOrder}</h2>
            <div className="home-steps">
              {steps.map((step, index) => (
                <div key={index} className="home-step">
                  <span className="home-step-num">{index + 1}</span>
                  <div>
                    {step.title ? <h3 className="mb-2 text-lg font-bold">{step.title}</h3> : null}
                    {step.text ? <p className="text-soft leading-7">{step.text}</p> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="surface flex flex-col gap-4 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="label mb-2">{dict.common.address}</p>
            <p className="text-lg font-semibold">{address}</p>
          </div>
          <a href={phoneHref} className="btn btn-brand w-fit">
            {settings.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
