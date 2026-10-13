import { NextRequest, NextResponse } from "next/server";
import { db, dbOne } from "@/lib/db";

export async function GET(req: NextRequest) {
  const status = new URL(req.url).searchParams.get("status");
  const rows = status
    ? await db(`select * from bookings where status = $1 order by created_at desc`, [status])
    : await db(`select * from bookings order by created_at desc`);
  return NextResponse.json(rows);
}

export async function PATCH(req: NextRequest) {
  const { id, ...rest } = await req.json();
  const keys = Object.keys(rest);
  if (!keys.length) return NextResponse.json({ error: "empty body" }, { status: 400 });
  const set = keys.map((k, i) => `${k} = $${i + 1}`).join(", ");
  const values = [...keys.map((k) => rest[k]), id];
  const row = await dbOne(`update bookings set ${set} where id = $${keys.length + 1} returning *`, values);
  return NextResponse.json(row);
}

export async function DELETE(req: NextRequest) {
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await db(`delete from bookings where id = $1`, [id]);
  return NextResponse.json({ ok: true });
}
