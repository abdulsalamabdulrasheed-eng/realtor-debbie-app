import { NextRequest, NextResponse } from "next/server";
import { sendWhatsApp } from "@/lib/whatsapp";

export async function POST(req: NextRequest) {
  const { to, message } = await req.json();
  if (!to || !message) return NextResponse.json({ error: "to + message required" }, { status: 400 });
  await sendWhatsApp(to, message);
  return NextResponse.json({ ok: true });
}
