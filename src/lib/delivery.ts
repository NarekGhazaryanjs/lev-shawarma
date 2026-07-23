import type { Locale } from "@/lib/i18n/config";
import { localized } from "@/lib/i18n/localized";
import { prisma } from "@/lib/prisma";

export type DeliveryContent = {
  label: string;
  title: string;
  intro: string;
  paragraph1: string;
  paragraph2: string;
  image: string;
  step1Title: string;
  step1Text: string;
  step2Title: string;
  step2Text: string;
  step3Title: string;
  step3Text: string;
};

export async function getDeliveryContent(locale: Locale = "hy") {
  const delivery = await prisma.deliveryPage.findUnique({ where: { id: 1 } });
  if (!delivery) {
    throw new Error("Delivery page content is missing");
  }

  return {
    label: localized(delivery, "label", locale),
    title: localized(delivery, "title", locale),
    intro: localized(delivery, "intro", locale),
    paragraph1: localized(delivery, "paragraph1", locale),
    paragraph2: localized(delivery, "paragraph2", locale),
    image: delivery.image,
    step1Title: localized(delivery, "step1Title", locale),
    step1Text: localized(delivery, "step1Text", locale),
    step2Title: localized(delivery, "step2Title", locale),
    step2Text: localized(delivery, "step2Text", locale),
    step3Title: localized(delivery, "step3Title", locale),
    step3Text: localized(delivery, "step3Text", locale),
  } satisfies DeliveryContent;
}
