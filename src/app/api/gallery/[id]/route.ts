import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const gallerySchema = z.object({
  image: z.string().min(1).optional(),
  alt: z.string().optional(),
  sortOrder: z.number().optional(),
});

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const body = await request.json();
  const parsed = gallerySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const image = await prisma.galleryImage.update({
    where: { id: Number(id) },
    data: parsed.data,
  });

  return NextResponse.json(image);
}

export async function DELETE(_request: Request, { params }: Params) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  await prisma.galleryImage.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
