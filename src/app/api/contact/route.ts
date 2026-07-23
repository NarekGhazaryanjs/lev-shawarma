import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const contactSchema = z.object({
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
  const contact = await prisma.contactPage.findUnique({ where: { id: 1 } });
  if (!contact) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(contact);
}

export async function PUT(request: Request) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const body = await request.json();
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const contact = await prisma.contactPage.update({
    where: { id: 1 },
    data: parsed.data,
  });

  return NextResponse.json(contact);
}
