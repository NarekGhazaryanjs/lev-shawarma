import type { Locale } from "@/lib/i18n/config";
import { localizePrice } from "@/lib/i18n/localize-price";
import { localized } from "@/lib/i18n/localized";
import { getCategoryLabel, type MenuCategoryName } from "@/lib/categories";
import { prisma } from "@/lib/prisma";

export type MenuItemView = {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  badges: string[];
  featured: boolean;
  category: string;
  categoryId: number;
};

export function parseBadges(value: string) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export async function getMenuItems(featuredOnly = false, locale: Locale = "hy") {
  const items = await prisma.menuItem.findMany({
    include: { category: true },
    orderBy: [{ category: { sortOrder: "asc" } }, { sortOrder: "asc" }, { id: "asc" }],
    where: featuredOnly ? { featured: true } : undefined,
  });

  return items.map((item) => ({
    id: item.id,
    name: localized(item, "name", locale),
    price: localizePrice(item.price, locale),
    description: localized(item, "description", locale),
    image: item.image,
    badges: parseBadges(item.badges),
    featured: item.featured,
    category: item.category.name,
    categoryId: item.categoryId,
    categoryLabel: getCategoryLabel(item.category.name as MenuCategoryName, locale),
  })) satisfies (MenuItemView & { categoryLabel: string })[];
}

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function getGalleryImages() {
  return prisma.galleryImage.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function getSiteSettings() {
  const settings = await prisma.siteSetting.findUnique({ where: { id: 1 } });
  if (!settings) {
    throw new Error("Site settings are missing");
  }
  return settings;
}
