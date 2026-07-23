import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/session";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const admin = await prisma.admin.findUnique({
    where: { username: parsed.data.username },
  });

  if (!admin || !(await bcrypt.compare(parsed.data.password, admin.password))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const session = await getAdminSession();
  session.isLoggedIn = true;
  session.username = admin.username;
  await session.save();

  return NextResponse.json({ ok: true, username: admin.username });
}
