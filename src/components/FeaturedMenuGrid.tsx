"use client";

import { useState } from "react";
import type { MenuItemView } from "@/lib/menu";
import { ImageLightbox } from "@/components/ImageLightbox";
import { MenuItemCard } from "@/components/MenuItemCard";

export function FeaturedMenuGrid({
  items,
  viewImageOf,
}: {
  items: MenuItemView[];
  viewImageOf?: string;
}) {
  const [preview, setPreview] = useState<MenuItemView | null>(null);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onImageClick={setPreview}
            viewImageOf={viewImageOf}
          />
        ))}
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
