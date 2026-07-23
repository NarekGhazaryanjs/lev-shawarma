"use client";

import { useEffect, useState } from "react";

type Category = { id: number; name: string; sortOrder: number };

export function AdminCategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [editingId, setEditingId] = useState<number | null>(null);

  async function load() {
    const response = await fetch("/api/categories");
    setCategories(await response.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function saveCategory(event: React.FormEvent) {
    event.preventDefault();
    const response = await fetch(editingId ? `/api/categories/${editingId}` : "/api/categories", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, sortOrder }),
    });

    if (response.ok) {
      setName("");
      setSortOrder(0);
      setEditingId(null);
      await load();
    }
  }

  async function deleteCategory(id: number) {
    if (!confirm("Ջնջե՞լ կատեգորիան")) return;
    await fetch(`/api/categories/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="space-y-6">
      <form onSubmit={saveCategory} className="lev-card grid gap-4 p-6 md:grid-cols-3">
        <input
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          placeholder="Կատեգորիայի անուն"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <input
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          type="number"
          placeholder="Դասավորություն"
          value={sortOrder}
          onChange={(event) => setSortOrder(Number(event.target.value))}
        />
        <button type="submit" className="lev-btn lev-btn-primary">
          {editingId ? "Թարմացնել" : "Ավելացնել"}
        </button>
      </form>

      <div className="grid gap-3">
        {categories.map((category) => (
          <div key={category.id} className="lev-card flex items-center justify-between p-5">
            <div>
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <p className="text-lev-muted">Դասավորություն: {category.sortOrder}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="lev-btn lev-btn-secondary"
                onClick={() => {
                  setEditingId(category.id);
                  setName(category.name);
                  setSortOrder(category.sortOrder);
                }}
              >
                Խմբագրել
              </button>
              <button
                type="button"
                className="lev-btn lev-btn-secondary"
                onClick={() => deleteCategory(category.id)}
              >
                Ջնջել
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
