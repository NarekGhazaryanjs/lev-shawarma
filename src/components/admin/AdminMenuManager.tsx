"use client";

import { useEffect, useState } from "react";
import { BilingualField } from "@/components/admin/BilingualField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { MENU_CATEGORIES } from "@/lib/categories";

type Category = { id: number; name: string };
type MenuItem = {
  id: number;
  name: string;
  nameRu: string;
  price: string;
  description: string;
  descriptionRu: string;
  image: string;
  featured: boolean;
  categoryId: number;
};

const emptyForm = {
  name: "",
  nameRu: "",
  price: "",
  description: "",
  descriptionRu: "",
  image: "",
  featured: false,
  categoryId: 0,
};

export function AdminMenuManager() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  async function load() {
    const [menuRes, categoriesRes] = await Promise.all([
      fetch("/api/menu", { cache: "no-store" }),
      fetch("/api/categories", { cache: "no-store" }),
    ]);
    const menuData = await menuRes.json();
    const categoriesData = await categoriesRes.json();

    const ordered = MENU_CATEGORIES.map((name) =>
      categoriesData.find((category: Category) => category.name === name)
    ).filter(Boolean) as Category[];

    setItems(menuData);
    setCategories(ordered);
    setForm((current) =>
      current.categoryId || !ordered[0]
        ? current
        : { ...current, categoryId: ordered[0].id }
    );
  }

  useEffect(() => {
    load();
  }, []);

  function resetForm() {
    setForm({
      ...emptyForm,
      categoryId: categories[0]?.id || 0,
    });
    setEditingId(null);
  }

  async function saveItem(event: React.FormEvent) {
    event.preventDefault();

    const response = await fetch(editingId ? `/api/menu/${editingId}` : "/api/menu", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      resetForm();
      await load();
    }
  }

  async function editItem(item: MenuItem) {
    const response = await fetch(`/api/menu/${item.id}`, { cache: "no-store" });
    if (!response.ok) return;

    const fresh = (await response.json()) as MenuItem;
    setEditingId(fresh.id);
    setForm({
      name: fresh.name,
      nameRu: fresh.nameRu || "",
      price: fresh.price,
      description: fresh.description,
      descriptionRu: fresh.descriptionRu || "",
      image: fresh.image,
      featured: fresh.featured,
      categoryId: fresh.categoryId,
    });
  }

  async function deleteItem(id: number) {
    if (!confirm("Ջնջե՞լ ուտեստը")) return;
    await fetch(`/api/menu/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="space-y-6">
      <div className="surface p-6">
        <h2 className="mb-4 text-2xl font-bold">{editingId ? "Խմբագրել ուտեստ" : "Նոր ուտեստ"}</h2>
        <form onSubmit={saveItem} className="grid gap-4">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-ink-soft">Ենթաբաժին</span>
            <select
              className="w-full rounded-2xl border border-black/10 bg-cream px-4 py-3 outline-none focus:border-brand"
              value={form.categoryId}
              onChange={(event) => setForm({ ...form, categoryId: Number(event.target.value) })}
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <BilingualField
            label="Վերնագիր"
            valueHy={form.name}
            valueRu={form.nameRu}
            onChangeHy={(name) => setForm({ ...form, name })}
            onChangeRu={(nameRu) => setForm({ ...form, nameRu })}
            required
          />

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-ink-soft">Գին</span>
            <input
              className="w-full rounded-2xl border border-black/10 bg-cream px-4 py-3 outline-none focus:border-brand"
              placeholder="օր. 2,100 դր."
              value={form.price}
              onChange={(event) => setForm({ ...form, price: event.target.value })}
              required
            />
          </label>

          <BilingualField
            label="Նկարագրություն"
            valueHy={form.description}
            valueRu={form.descriptionRu}
            onChangeHy={(description) => setForm({ ...form, description })}
            onChangeRu={(descriptionRu) => setForm({ ...form, descriptionRu })}
            multiline
          />

          <div>
            <span className="mb-2 block text-sm font-semibold text-ink-soft">Նկար</span>
            <ImageUploadField
              value={form.image}
              onChange={(url) => setForm({ ...form, image: url })}
            />
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-black/10 bg-cream px-4 py-3">
            <input
              type="checkbox"
              className="h-5 w-5 accent-[var(--brand)]"
              checked={form.featured}
              onChange={(event) => setForm({ ...form, featured: event.target.checked })}
            />
            <span className="font-semibold">Ցուցադրել գլխավոր էջում</span>
          </label>

          <div className="flex gap-3">
            <button type="submit" className="btn btn-brand">
              Պահպանել
            </button>
            {editingId ? (
              <button type="button" onClick={resetForm} className="btn btn-ghost">
                Չեղարկել
              </button>
            ) : null}
          </div>
        </form>
      </div>

      <div className="grid gap-4">
        {items.map((item) => (
          <div key={item.id} className="surface flex flex-col gap-4 p-5 md:flex-row md:items-center">
            {item.image ? (
              <img src={item.image} alt={item.name} className="h-24 w-32 shrink-0 rounded-2xl object-cover" />
            ) : (
              <div className="flex h-24 w-32 shrink-0 flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-black/15 bg-brand-soft/30 text-center">
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 text-brand/70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-soft px-1 text-[10px] font-semibold leading-tight">Նկար չկա</span>
              </div>
            )}
            <div className="flex-1">
              <p className="label mb-1">
                {categories.find((category) => category.id === item.categoryId)?.name}
              </p>
              <h3 className="text-xl font-semibold">{item.name}</h3>
              {item.featured ? (
                <span className="text-brand mt-1 inline-block text-xs font-bold uppercase tracking-wide">
                  Գլխավոր էջ
                </span>
              ) : null}
              {item.price ? <p className="text-brand mt-1 font-bold">{item.price}</p> : null}
              {item.description ? <p className="text-soft mt-1">{item.description}</p> : null}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => editItem(item)} className="btn btn-ghost">
                Խմբագրել
              </button>
              <button type="button" onClick={() => deleteItem(item.id)} className="btn btn-ghost">
                Ջնջել
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
