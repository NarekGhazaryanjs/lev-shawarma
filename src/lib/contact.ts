import type { Locale } from "@/lib/i18n/config";
import { localized } from "@/lib/i18n/localized";
import { prisma } from "@/lib/prisma";

export type ContactContent = {
  label: string;
  title: string;
  intro: string;
  paragraph1: string;
  paragraph2: string;
  image: string;
};

export async function getContactContent(locale: Locale = "hy") {
  const contact = await prisma.contactPage.findUnique({ where: { id: 1 } });
  if (!contact) {
    throw new Error("Contact page content is missing");
  }

  return {
    label: localized(contact, "label", locale),
    title: localized(contact, "title", locale),
    intro: localized(contact, "intro", locale),
    paragraph1: localized(contact, "paragraph1", locale),
    paragraph2: localized(contact, "paragraph2", locale),
    image: contact.image,
  } satisfies ContactContent;
}
