import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const deliverySchema = z.object({
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
  const delivery = await prisma.deliveryPage.findUnique({ where: { id: 1 } });
  if (!delivery) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(delivery);
}

export async function PUT(request: Request) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const body = await request.json();
  const parsed = deliverySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const delivery = await prisma.deliveryPage.update({
    where: { id: 1 },
    data: parsed.data,
  });

  return NextResponse.json(delivery);
}
