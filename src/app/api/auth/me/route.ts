import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/session";

export async function GET() {
  const session = await getAdminSession();
  return NextResponse.json({
    isLoggedIn: Boolean(session.isLoggedIn),
    username: session.username || "",
  });
}
