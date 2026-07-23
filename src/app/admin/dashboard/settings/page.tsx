import { AdminSettingsForm } from "@/components/admin/AdminSettingsForm";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="lev-eyebrow mb-2">Settings</p>
        <h1 className="text-3xl font-bold">Կայքի կարգավորումներ</h1>
      </div>
      <AdminSettingsForm />
    </div>
  );
}
