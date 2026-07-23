import { AdminCategoriesManager } from "@/components/admin/AdminCategoriesManager";

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="lev-eyebrow mb-2">Categories</p>
        <h1 className="text-3xl font-bold">Կատեգորիաներ</h1>
      </div>
      <AdminCategoriesManager />
    </div>
  );
}
