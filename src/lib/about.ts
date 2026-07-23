import type { Locale } from "@/lib/i18n/config";
import { localized } from "@/lib/i18n/localized";
import { prisma } from "@/lib/prisma";

export type AboutContent = {
  label: string;
  title: string;
  intro: string;
  paragraph1: string;
  paragraph2: string;
  image: string;
};

export async function getAboutContent(locale: Locale = "hy") {
  const about = await prisma.aboutPage.findUnique({ where: { id: 1 } });
  if (!about) {
    throw new Error("About page content is missing");
  }

  return {
    label: localized(about, "label", locale),
    title: localized(about, "title", locale),
    intro: localized(about, "intro", locale),
    paragraph1: localized(about, "paragraph1", locale),
    paragraph2: localized(about, "paragraph2", locale),
    image: about.image,
  } satisfies AboutContent;
}
