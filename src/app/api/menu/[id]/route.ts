import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/auth";
import { parseBadges } from "@/lib/menu";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const menuSchema = z.object({
  name: z.string().min(1).optional(),
  nameRu: z.string().optional(),
  price: z.string().min(1).optional(),
  description: z.string().optional(),
  descriptionRu: z.string().optional(),
  image: z.string().optional(),
  badges: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  sortOrder: z.number().optional(),
  categoryId: z.number().optional(),
});

type Params = { params: Promise<{ id: string }> };

function serializeMenuItem(item: {
  id: number;
  name: string;
  nameRu: string;
  price: string;
  description: string;
  descriptionRu: string;
  image: string;
  badges: string;
  featured: boolean;
  categoryId: number;
}) {
  return {
    id: item.id,
    name: item.name,
    nameRu: item.nameRu,
    price: item.price,
    description: item.description,
    descriptionRu: item.descriptionRu,
    image: item.image,
    badges: parseBadges(item.badges),
    featured: item.featured,
    categoryId: item.categoryId,
  };
}

export async function GET(_request: Request, { params }: Params) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const item = await prisma.menuItem.findUnique({
    where: { id: Number(id) },
  });

  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(serializeMenuItem(item));
}

export async function PUT(request: Request, { params }: Params) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const body = await request.json();
  const parsed = menuSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const item = await prisma.menuItem.update({
    where: { id: Number(id) },
    data: {
      ...parsed.data,
      badges:
        parsed.data.badges !== undefined ? JSON.stringify(parsed.data.badges) : undefined,
    },
  });

  return NextResponse.json(item);
}

export async function DELETE(_request: Request, { params }: Params) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  await prisma.menuItem.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
