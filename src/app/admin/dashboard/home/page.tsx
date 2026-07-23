import { AdminHomeForm } from "@/components/admin/AdminHomeForm";

export default function AdminHomePage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="label mb-2">Գլխավոր</p>
        <h1 className="title-lg">Էջի կառավարում</h1>
        <p className="text-soft mt-3 max-w-2xl">
          Խմբագրեք գլխավոր էջի տեքստերը հայերեն և ռուսերեն։ Վերնագրերի նշումները (Հիթ, Մենյու և
          այլն) թարգմանվում են ավտոմատ։
        </p>
      </div>
      <AdminHomeForm />
    </div>
  );
}
