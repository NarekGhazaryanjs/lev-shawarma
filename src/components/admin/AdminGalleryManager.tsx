"use client";

import { useEffect, useState } from "react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type GalleryImage = { id: number; image: string; alt: string; sortOrder: number };

export function AdminGalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [image, setImage] = useState("");
  const [alt, setAlt] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [editingId, setEditingId] = useState<number | null>(null);

  async function load() {
    const response = await fetch("/api/gallery");
    setImages(await response.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function saveImage(event: React.FormEvent) {
    event.preventDefault();
    const response = await fetch(editingId ? `/api/gallery/${editingId}` : "/api/gallery", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image, alt, sortOrder }),
    });

    if (response.ok) {
      setImage("");
      setAlt("");
      setSortOrder(0);
      setEditingId(null);
      await load();
    }
  }

  async function deleteImage(id: number) {
    if (!confirm("Ջնջե՞լ նկարը")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="space-y-6">
      <form onSubmit={saveImage} className="lev-card space-y-4 p-6">
        <div>
          <span className="text-soft mb-2 block text-sm font-semibold">Նկար</span>
          <ImageUploadField value={image} onChange={setImage} />
        </div>
        <input
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          placeholder="Alt տեքստ"
          value={alt}
          onChange={(event) => setAlt(event.target.value)}
        />
        <input
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          type="number"
          placeholder="Դասավորություն"
          value={sortOrder}
          onChange={(event) => setSortOrder(Number(event.target.value))}
        />
        <button type="submit" className="lev-btn lev-btn-primary">
          {editingId ? "Թարմացնել" : "Ավելացնել"}
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2">
        {images.map((item) => (
          <div key={item.id} className="lev-card overflow-hidden">
            <img src={item.image} alt={item.alt} className="aspect-[4/3] w-full object-cover" />
            <div className="flex items-center justify-between p-4">
              <div>
                <p>{item.alt || "LEV Shawarma"}</p>
                <p className="text-sm text-lev-muted">#{item.sortOrder}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="lev-btn lev-btn-secondary"
                  onClick={() => {
                    setEditingId(item.id);
                    setImage(item.image);
                    setAlt(item.alt);
                    setSortOrder(item.sortOrder);
                  }}
                >
                  Խմբագրել
                </button>
                <button
                  type="button"
                  className="lev-btn lev-btn-secondary"
                  onClick={() => deleteImage(item.id)}
                >
                  Ջնջել
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
