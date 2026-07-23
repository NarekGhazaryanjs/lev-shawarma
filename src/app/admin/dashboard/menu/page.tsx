import { AdminMenuManager } from "@/components/admin/AdminMenuManager";
import { MENU_CATEGORIES } from "@/lib/categories";

export default function AdminMenuPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="label mb-2">Մենյու</p>
        <h1 className="title-lg">Ուտեստների կառավարում</h1>
        <p className="text-soft mt-3 max-w-2xl">
          Ենթաբաժիններ՝ {MENU_CATEGORIES.join(" · ")}
        </p>
      </div>
      <AdminMenuManager />
    </div>
  );
}
