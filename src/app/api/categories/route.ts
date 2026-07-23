import { NextResponse } from "next/server";
import { getCategories } from "@/lib/menu";

export async function GET() {
  const categories = await getCategories();
  return NextResponse.json(categories);
}

export async function POST() {
  return NextResponse.json({ error: "Categories are fixed" }, { status: 403 });
}
