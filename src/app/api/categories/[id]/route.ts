import { NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

export async function PUT(_request: Request, _context: Params) {
  return NextResponse.json({ error: "Categories are fixed" }, { status: 403 });
}

export async function DELETE(_request: Request, _context: Params) {
  return NextResponse.json({ error: "Categories are fixed" }, { status: 403 });
}
