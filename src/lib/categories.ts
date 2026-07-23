export const CATEGORY_DEFINITIONS = [
  { slug: "shawarma", hy: "Շաուրմա", ru: "Шаурма" },
  { slug: "sets", hy: "Սեթեր", ru: "Сеты" },
  { slug: "khorovats", hy: "Խորոված", ru: "Шашлык" },
  { slug: "other", hy: "Այլ ուտեստներ", ru: "Другие блюда" },
  { slug: "bakery", hy: "Հացաբուլկեղեն", ru: "Выпечка" },
  { slug: "salads", hy: "Աղցաններ", ru: "Салаты" },
  { slug: "drinks", hy: "Խմիչք", ru: "Напитки" },
] as const;

export type CategorySlug = (typeof CATEGORY_DEFINITIONS)[number]["slug"];
export type MenuCategoryName = (typeof CATEGORY_DEFINITIONS)[number]["hy"];

export const MENU_CATEGORIES = CATEGORY_DEFINITIONS.map((category) => category.hy) as MenuCategoryName[];

export const CATEGORY_SLUGS = Object.fromEntries(
  CATEGORY_DEFINITIONS.map((category) => [category.hy, category.slug])
) as Record<MenuCategoryName, CategorySlug>;

const SLUG_TO_CATEGORY = Object.fromEntries(
  CATEGORY_DEFINITIONS.map((category) => [category.slug, category.hy])
) as Record<CategorySlug, MenuCategoryName>;

const HY_TO_RU = Object.fromEntries(
  CATEGORY_DEFINITIONS.map((category) => [category.hy, category.ru])
) as Record<MenuCategoryName, string>;

export function getSlugFromCategory(name: MenuCategoryName) {
  return CATEGORY_SLUGS[name];
}

export function getCategoryLabel(name: MenuCategoryName, locale: "hy" | "ru") {
  if (locale === "ru") return HY_TO_RU[name];
  return name;
}

export function resolveCategoryParam(param?: string | null): MenuCategoryName {
  if (!param) return MENU_CATEGORIES[0];
  if (param in SLUG_TO_CATEGORY) return SLUG_TO_CATEGORY[param as CategorySlug];
  if (MENU_CATEGORIES.includes(param as MenuCategoryName)) {
    return param as MenuCategoryName;
  }
  return MENU_CATEGORIES[0];
}

export function getMenuCategoryHref(name: MenuCategoryName, locale: "hy" | "ru" = "hy") {
  return `/${locale}/menu?cat=${getSlugFromCategory(name)}`;
}
