import { AdminContactForm } from "@/components/admin/AdminContactForm";

export default function AdminContactPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="label mb-2">Կապ</p>
        <h1 className="title-lg">Էջի կառավարում</h1>
        <p className="text-soft mt-3 max-w-2xl">
          Փոխեք վերնագրերը, տեքստերը և նկարը։ Հեռախոսահամարն ու հասցեն կարգավորվում են «Կարգավորումներ»
          բաժնում։
        </p>
      </div>
      <AdminContactForm />
    </div>
  );
}
