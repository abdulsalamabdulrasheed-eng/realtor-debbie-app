import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "no file" }, { status: 400 });

    const buf = Buffer.from(await file.arrayBuffer());
    const b64 = `data:${file.type};base64,${buf.toString("base64")}`;

    const res = await cloudinary.uploader.upload(b64, {
      folder: "realtor-debbie",
      resource_type: "auto",
    });

    return NextResponse.json({ url: res.secure_url });
  } catch (e: any) {
    console.error("upload error", e);
    return NextResponse.json({ error: e.message || "Upload failed" }, { status: 500 });
  }
}
