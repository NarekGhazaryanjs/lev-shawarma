import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { getAdminSession } from "@/lib/session";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session.isLoggedIn) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center py-16">
      <AdminLoginForm />
    </div>
  );
}
