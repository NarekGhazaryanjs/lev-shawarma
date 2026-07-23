import { AdminGalleryManager } from "@/components/admin/AdminGalleryManager";

export default function AdminGalleryPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="lev-eyebrow mb-2">Gallery</p>
        <h1 className="text-3xl font-bold">Նկարների գալերեա</h1>
      </div>
      <AdminGalleryManager />
    </div>
  );
}
