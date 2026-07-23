import type { Locale } from "@/lib/i18n/config";
import { localized } from "@/lib/i18n/localized";
import { prisma } from "@/lib/prisma";

export type HomeContent = {
  heroTagline: string;
  aboutText: string;
  step1Title: string;
  step1Text: string;
  step2Title: string;
  step2Text: string;
  step3Title: string;
  step3Text: string;
};

export async function getHomeContent(locale: Locale = "hy") {
  const home = await prisma.homePage.findUnique({ where: { id: 1 } });
  if (!home) {
    throw new Error("Home page content is missing");
  }

  return {
    heroTagline: localized(home, "heroTagline", locale),
    aboutText: localized(home, "aboutText", locale),
    step1Title: localized(home, "step1Title", locale),
    step1Text: localized(home, "step1Text", locale),
    step2Title: localized(home, "step2Title", locale),
    step2Text: localized(home, "step2Text", locale),
    step3Title: localized(home, "step3Title", locale),
    step3Text: localized(home, "step3Text", locale),
  } satisfies HomeContent;
}
