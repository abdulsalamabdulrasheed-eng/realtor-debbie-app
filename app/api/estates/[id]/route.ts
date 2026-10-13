import { NextRequest, NextResponse } from "next/server";
import { dbOne, db } from "@/lib/db";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const b = await req.json();
  const keys = Object.keys(b);
  if (!keys.length) return NextResponse.json({ error: "empty body" }, { status: 400 });
  const set = keys.map((k, i) => `${k} = $${i + 1}`).join(", ");
  const values = [...keys.map((k) => b[k]), params.id];
  const row = await dbOne(
    `update estates set ${set} where id = $${keys.length + 1} returning *`,
    values
  );
  return NextResponse.json(row);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await db(`delete from estates where id = $1`, [params.id]);
  return NextResponse.json({ ok: true });
}
