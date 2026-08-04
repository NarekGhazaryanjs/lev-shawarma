"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    setLoading(false);

    if (!response.ok) {
      setError("Սխալ մուտքանուն կամ գաղտնաբառ");
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="surface mx-auto max-w-md p-8">
      <p className="label mb-2">LEV Admin</p>
      <h1 className="title-lg mb-6">Մուտք</h1>
      <div className="space-y-4">
        <label className="block">
          <span className="text-soft mb-2 block text-sm font-semibold">Մուտքանուն</span>
          <input
            className="w-full rounded-2xl border border-black/10 bg-cream px-4 py-3 outline-none focus:border-brand"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-soft mb-2 block text-sm font-semibold">Գաղտնաբառ</span>
          <input
            type="password"
            className="w-full rounded-2xl border border-black/10 bg-cream px-4 py-3 outline-none focus:border-brand"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        {error ? <p className="text-sm text-brand">{error}</p> : null}
        <button type="submit" disabled={loading} className="btn btn-brand w-full">
          {loading ? "Մուտք..." : "Մուտք գործել"}
        </button>
      </div>
    </form>
  );
}
