import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const aboutSchema = z.object({
  label: z.string().min(1).optional(),
  labelRu: z.string().optional(),
  title: z.string().min(1).optional(),
  titleRu: z.string().optional(),
  intro: z.string().optional(),
  introRu: z.string().optional(),
  paragraph1: z.string().optional(),
  paragraph1Ru: z.string().optional(),
  paragraph2: z.string().optional(),
  paragraph2Ru: z.string().optional(),
  image: z.string().optional(),
});

export async function GET() {
  const about = await prisma.aboutPage.findUnique({ where: { id: 1 } });
  if (!about) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(about);
}

export async function PUT(request: Request) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const body = await request.json();
  const parsed = aboutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const about = await prisma.aboutPage.update({
    where: { id: 1 },
    data: parsed.data,
  });

  return NextResponse.json(about);
}
