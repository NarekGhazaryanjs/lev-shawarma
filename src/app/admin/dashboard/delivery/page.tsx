import { AdminDeliveryForm } from "@/components/admin/AdminDeliveryForm";

export default function AdminDeliveryPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="label mb-2">Առաքում</p>
        <h1 className="title-lg">Էջի կառավարում</h1>
        <p className="text-soft mt-3 max-w-2xl">
          Փոխեք առաքման մասին տեքստերը, նկարը և պատվերի քայլերը։ Փոփոխությունները անմիջապես երևում են
          կայքում։
        </p>
      </div>
      <AdminDeliveryForm />
    </div>
  );
}
