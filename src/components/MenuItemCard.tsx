"use client";

import type { MenuItemView } from "@/lib/menu";

export function MenuItemCard({
  item,
  onImageClick,
  viewImageOf,
}: {
  item: MenuItemView;
  onImageClick?: (item: MenuItemView) => void;
  viewImageOf?: string;
}) {
  function handleImageClick() {
    if (!item.image || !onImageClick) return;
    onImageClick(item);
  }

  return (
    <article className="surface group overflow-hidden transition duration-500 hover:-translate-y-1.5 hover:border-brand/15 hover:shadow-[0_28px_70px_rgba(184,50,26,0.12)]">
      {item.image ? (
        <button
          type="button"
          className="menu-image-trigger aspect-[1.12/1] w-full overflow-hidden bg-brand-soft"
          onClick={handleImageClick}
          aria-label={viewImageOf?.replace("{name}", item.name) ?? `Դիտել ${item.name} նկարը`}
        >
          <img
            src={item.image}
            alt={item.name}
            className="pointer-events-none h-full w-full object-cover transition duration-700 group-hover:scale-105"
            draggable={false}
          />
          <span className="menu-image-hint" aria-hidden="true">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path
                d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M20 16v2a2 2 0 01-2 2h-2M8 20H6a2 2 0 01-2-2v-2M15 3h6v6M9 21H3v-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      ) : (
        <div className="flex aspect-[1.12/1] items-center justify-center bg-brand-soft text-brand">
          LEV
        </div>
      )}
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold leading-tight">{item.name}</h3>
          {item.price ? (
            <strong className="shrink-0 rounded-full bg-brand-soft px-3 py-1 text-sm text-brand">
              {item.price}
            </strong>
          ) : null}
        </div>
        {item.description ? <p className="text-soft leading-7">{item.description}</p> : null}
      </div>
    </article>
  );
}
