import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getGalleryImages } from "@/lib/menu";

const gallerySchema = z.object({
  image: z.string().min(1),
  alt: z.string().optional(),
  sortOrder: z.number().optional(),
});

export async function GET() {
  const images = await getGalleryImages();
  return NextResponse.json(images);
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const body = await request.json();
  const parsed = gallerySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const image = await prisma.galleryImage.create({
    data: {
      image: parsed.data.image,
      alt: parsed.data.alt || "",
      sortOrder: parsed.data.sortOrder || 0,
    },
  });

  return NextResponse.json(image, { status: 201 });
}
