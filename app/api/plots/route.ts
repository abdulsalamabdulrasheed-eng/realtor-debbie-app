import { NextRequest, NextResponse } from "next/server";
import { db, dbOne } from "@/lib/db";

export async function GET(req: NextRequest) {
  const estateId = new URL(req.url).searchParams.get("estate_id");
  const rows = estateId
    ? await db(`select * from plots where estate_id = $1 order by size_sqm`, [estateId])
    : await db(`select * from plots order by size_sqm`);
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const b = await req.json();
  const row = await dbOne(
    `insert into plots
      (estate_id, size_sqm, outright_price, plan_3m_monthly, plan_6m_monthly, plots_left, status)
     values ($1,$2,$3,$4,$5,$6,$7) returning *`,
    [b.estate_id, b.size_sqm, b.outright_price, b.plan_3m_monthly, b.plan_6m_monthly, b.plots_left, b.status || "available"]
  );
  return NextResponse.json(row);
}

export async function PATCH(req: NextRequest) {
  const { id, ...rest } = await req.json();
  const keys = Object.keys(rest);
  if (!keys.length) return NextResponse.json({ error: "empty body" }, { status: 400 });
  const set = keys.map((k, i) => `${k} = $${i + 1}`).join(", ");
  const values = [...keys.map((k) => rest[k]), id];
  const row = await dbOne(`update plots set ${set} where id = $${keys.length + 1} returning *`, values);
  return NextResponse.json(row);
}
