import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const homeSchema = z.object({
  heroTagline: z.string().optional(),
  heroTaglineRu: z.string().optional(),
  aboutText: z.string().optional(),
  aboutTextRu: z.string().optional(),
  step1Title: z.string().optional(),
  step1TitleRu: z.string().optional(),
  step1Text: z.string().optional(),
  step1TextRu: z.string().optional(),
  step2Title: z.string().optional(),
  step2TitleRu: z.string().optional(),
  step2Text: z.string().optional(),
  step2TextRu: z.string().optional(),
  step3Title: z.string().optional(),
  step3TitleRu: z.string().optional(),
  step3Text: z.string().optional(),
  step3TextRu: z.string().optional(),
});

export async function GET() {
  const home = await prisma.homePage.findUnique({ where: { id: 1 } });
  if (!home) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(home);
}

export async function PUT(request: Request) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const body = await request.json();
  const parsed = homeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const home = await prisma.homePage.update({
    where: { id: 1 },
    data: parsed.data,
  });

  return NextResponse.json(home);
}
