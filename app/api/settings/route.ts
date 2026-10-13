import { NextRequest, NextResponse } from "next/server";
import { dbOne } from "@/lib/db";

export async function GET() {
  return NextResponse.json(await dbOne(`select * from settings where id = 1`));
}

export async function PATCH(req: NextRequest) {
  const b = await req.json();
  const keys = Object.keys(b).filter((k) => k !== "id");
  if (!keys.length) return NextResponse.json({ error: "empty body" }, { status: 400 });
  const set = keys.map((k, i) => `${k} = $${i + 1}`).join(", ");
  const values = [...keys.map((k) => b[k])];
  const row = await dbOne(`update settings set ${set} where id = 1 returning *`, values);
  return NextResponse.json(row);
}
