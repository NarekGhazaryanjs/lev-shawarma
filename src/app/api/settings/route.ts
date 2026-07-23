import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/menu";

const settingsSchema = z.object({
  brandName: z.string().min(1).optional(),
  brandNameHy: z.string().min(1).optional(),
  brandNameRu: z.string().optional(),
  phone: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
  addressRu: z.string().optional(),
  instagram: z.string().url().optional(),
  facebook: z.string().url().optional(),
});

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const body = await request.json();
  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const settings = await prisma.siteSetting.update({
    where: { id: 1 },
    data: parsed.data,
  });

  return NextResponse.json(settings);
}
