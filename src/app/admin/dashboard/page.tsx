import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const menuCount = await prisma.menuItem.count();

  return (
    <div className="space-y-6">
      <div>
        <p className="label mb-2">Dashboard</p>
        <h1 className="title-lg">Կառավարման վահանակ</h1>
      </div>
      <div className="surface max-w-sm p-6">
        <p className="text-soft">Ուտեստներ</p>
        <p className="text-4xl font-bold">{menuCount}</p>
      </div>
    </div>
  );
}
