"use client";

import { useEffect, useState } from "react";

type Settings = {
  brandName: string;
  brandNameHy: string;
  brandNameRu: string;
  phone: string;
  address: string;
  addressRu: string;
};

export function AdminSettingsForm() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((response) => response.json())
      .then((data) =>
        setSettings({
          brandName: data.brandName,
          brandNameHy: data.brandNameHy,
          brandNameRu: data.brandNameRu || "",
          phone: data.phone,
          address: data.address,
          addressRu: data.addressRu || "",
        })
      );
  }, []);

  async function saveSettings(event: React.FormEvent) {
    event.preventDefault();
    if (!settings) return;

    const response = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    if (response.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  if (!settings) {
    return <p className="text-soft">Բեռնվում է...</p>;
  }

  return (
    <form onSubmit={saveSettings} className="surface grid gap-4 p-6 md:grid-cols-2">
      <label className="block">
        <span className="text-soft mb-2 block text-sm font-semibold">Անվանում</span>
        <input
          className="w-full rounded-2xl border border-black/10 bg-cream px-4 py-3 outline-none focus:border-brand"
          value={settings.brandName}
          onChange={(event) => setSettings({ ...settings, brandName: event.target.value })}
        />
      </label>
      <label className="block">
        <span className="text-soft mb-2 block text-sm font-semibold">Անվանում (հայերեն)</span>
        <input
          className="w-full rounded-2xl border border-black/10 bg-cream px-4 py-3 outline-none focus:border-brand"
          value={settings.brandNameHy}
          onChange={(event) => setSettings({ ...settings, brandNameHy: event.target.value })}
        />
      </label>
      <label className="block">
        <span className="text-soft mb-2 block text-sm font-semibold">Անվանում (ռուսերեն)</span>
        <input
          className="w-full rounded-2xl border border-black/10 bg-cream px-4 py-3 outline-none focus:border-brand"
          value={settings.brandNameRu}
          onChange={(event) => setSettings({ ...settings, brandNameRu: event.target.value })}
        />
      </label>
      <label className="block">
        <span className="text-soft mb-2 block text-sm font-semibold">Հեռախոս</span>
        <input
          className="w-full rounded-2xl border border-black/10 bg-cream px-4 py-3 outline-none focus:border-brand"
          value={settings.phone}
          onChange={(event) => setSettings({ ...settings, phone: event.target.value })}
        />
      </label>
      <label className="block md:col-span-2">
        <span className="text-soft mb-2 block text-sm font-semibold">Հասցե (հայերեն / անգլերեն)</span>
        <input
          className="w-full rounded-2xl border border-black/10 bg-cream px-4 py-3 outline-none focus:border-brand"
          value={settings.address}
          onChange={(event) => setSettings({ ...settings, address: event.target.value })}
        />
      </label>
      <label className="block md:col-span-2">
        <span className="text-soft mb-2 block text-sm font-semibold">Հասցե (ռուսերեն)</span>
        <input
          className="w-full rounded-2xl border border-black/10 bg-cream px-4 py-3 outline-none focus:border-brand"
          value={settings.addressRu}
          onChange={(event) => setSettings({ ...settings, addressRu: event.target.value })}
        />
      </label>
      <button type="submit" className="btn btn-brand md:col-span-2">
        Պահպանել
      </button>
      {saved ? <p className="text-brand text-sm md:col-span-2">Պահպանված է</p> : null}
    </form>
  );
}
