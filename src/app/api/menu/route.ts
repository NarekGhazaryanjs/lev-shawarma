import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/auth";
import { parseBadges } from "@/lib/menu";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const menuSchema = z.object({
  name: z.string().min(1),
  nameRu: z.string().optional(),
  price: z.string().min(1),
  description: z.string().optional(),
  descriptionRu: z.string().optional(),
  image: z.string().optional(),
  badges: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  sortOrder: z.number().optional(),
  categoryId: z.number(),
});

export async function GET() {
  const items = await prisma.menuItem.findMany({
    include: { category: true },
    orderBy: [{ category: { sortOrder: "asc" } }, { sortOrder: "asc" }, { id: "asc" }],
  });

  return NextResponse.json(
    items.map((item) => ({
      id: item.id,
      name: item.name,
      nameRu: item.nameRu,
      price: item.price,
      description: item.description,
      descriptionRu: item.descriptionRu,
      image: item.image,
      badges: parseBadges(item.badges),
      featured: item.featured,
      category: item.category.name,
      categoryId: item.categoryId,
    }))
  );
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const body = await request.json();
  const parsed = menuSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const item = await prisma.menuItem.create({
    data: {
      name: parsed.data.name,
      nameRu: parsed.data.nameRu || "",
      price: parsed.data.price,
      description: parsed.data.description || "",
      descriptionRu: parsed.data.descriptionRu || "",
      image: parsed.data.image || "",
      badges: JSON.stringify(parsed.data.badges || []),
      featured: parsed.data.featured || false,
      sortOrder: parsed.data.sortOrder || 0,
      categoryId: parsed.data.categoryId,
    },
  });

  return NextResponse.json(item, { status: 201 });
}
