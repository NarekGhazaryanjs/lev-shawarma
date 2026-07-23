import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/session";

export async function requireAdminApi() {
  const session = await getAdminSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return session;
}
