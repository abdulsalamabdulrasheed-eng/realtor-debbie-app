import { NextRequest, NextResponse } from "next/server";
import { db, dbOne } from "@/lib/db";

export async function GET() {
  return NextResponse.json(await db(`select * from estates order by created_at desc`));
}

export async function POST(req: NextRequest) {
  const b = await req.json();
  const slug =
    b.slug ||
    (b.name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const row = await dbOne(
    `insert into estates
      (slug, name, location, description, tagline, video_url,
       map_lat, map_lng, cofo_url, survey_url, brochure_url,
       hero_images, site_media, active, sold_out)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12::jsonb,$13::jsonb,true,false)
     returning *`,
    [
      slug, b.name, b.location, b.description, b.tagline, b.video_url,
      b.map_lat, b.map_lng, b.cofo_url, b.survey_url, b.brochure_url,
      JSON.stringify(b.hero_images ?? []), JSON.stringify(b.site_media ?? []),
    ]
  );
  return NextResponse.json(row);
}
