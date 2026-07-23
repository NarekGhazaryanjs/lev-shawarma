"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin/dashboard", label: "Գլխավոր" },
  { href: "/admin/dashboard/home", label: "Գլխավոր էջ" },
  { href: "/admin/dashboard/menu", label: "Մենյու" },
  { href: "/admin/dashboard/about", label: "Մեր մասին" },
  { href: "/admin/dashboard/delivery", label: "Առաքում" },
  { href: "/admin/dashboard/contact", label: "Կապ" },
  { href: "/admin/dashboard/settings", label: "Կարգավորումներ" },
];

export function AdminShell({
  username,
  children,
}: {
  username: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-cream text-ink">
      <div className="shell grid gap-6 py-8 lg:grid-cols-[240px_1fr]">
        <aside className="surface h-fit p-5">
          <p className="label mb-2">Admin</p>
          <h1 className="mb-1 text-xl font-bold">LEV Panel</h1>
          <p className="text-soft mb-6 text-sm">{username}</p>
          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  pathname === link.href
                    ? "bg-brand text-white"
                    : "text-ink-soft hover:bg-black/5 hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-2">
            <Link href="/" className="btn btn-ghost text-sm">
              Կայքը դիտել
            </Link>
            <button type="button" onClick={logout} className="btn btn-ghost text-sm">
              Ելք
            </button>
          </div>
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
}
