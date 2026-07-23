import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session.isLoggedIn) {
    redirect("/admin");
  }

  return <AdminShell username={session.username}>{children}</AdminShell>;
}
