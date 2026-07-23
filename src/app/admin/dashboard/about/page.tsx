import { AdminAboutForm } from "@/components/admin/AdminAboutForm";

export default function AdminAboutPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="label mb-2">Մեր մասին</p>
        <h1 className="title-lg">Էջի կառավարում</h1>
        <p className="text-soft mt-3 max-w-2xl">
          Փոխեք վերնագրերը, տեքստերը և նկարը։ Փոփոխությունները անմիջապես երևում են կայքում։
        </p>
      </div>
      <AdminAboutForm />
    </div>
  );
}
