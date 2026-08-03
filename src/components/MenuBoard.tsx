"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { MenuItemView } from "@/lib/menu";
import {
  MENU_CATEGORIES,
  getCategoryLabel,
  type MenuCategoryName,
  getMenuCategoryHref,
} from "@/lib/categories";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { ImageLightbox } from "@/components/ImageLightbox";
import { MenuItemCard } from "@/components/MenuItemCard";
import { InteractivePill } from "@/components/InteractivePill";

export function MenuBoard({
  items,
  initialCategory,
  locale,
  dict,
}: {
  items: MenuItemView[];
  initialCategory: MenuCategoryName;
  locale: Locale;
  dict: Dictionary;
}) {
  const router = useRouter();
  const [active, setActive] = useState<MenuCategoryName>(initialCategory);
  const [preview, setPreview] = useState<MenuItemView | null>(null);

  useEffect(() => {
    setActive(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    setPreview(null);
  }, [active]);

  function selectCategory(category: MenuCategoryName) {
    setActive(category);
    router.replace(getMenuCategoryHref(category, locale), { scroll: false });
  }

  const filtered = items.filter((item) => item.category === active);

  return (
    <>
      <div className="shell pb-20">
        <div className="mb-10 pt-12 md:pt-16">
          <p className="label mb-3">{dict.menu.eyebrow}</p>
          <h1 className="title-lg text-blue-600">{dict.menu.title}</h1>
        </div>

        <div className="pill-rail mb-8">
          {MENU_CATEGORIES.map((category) => (
            <InteractivePill
              key={category}
              active={active === category}
              onClick={() => selectCategory(category)}
            >
              {getCategoryLabel(category, locale)}
            </InteractivePill>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div key={active} className="reveal-grid grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((item, index) => (
              <div
                key={item.id}
                className="reveal-item"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <MenuItemCard
                  item={item}
                  onImageClick={setPreview}
                  viewImageOf={dict.common.viewImageOf}
                />
              </div>
            ))}
          </div>
        ) : (
          <div key={`${active}-empty`} className="reveal-grid surface p-10 text-center">
            <p className="text-soft text-lg">{dict.menu.empty}</p>
          </div>
        )}
      </div>

      {preview?.image ? (
        <ImageLightbox
          src={preview.image}
          alt={preview.name}
          subtitle={preview.price || undefined}
          open
          onClose={() => setPreview(null)}
        />
      ) : null}
    </>
  );
}
