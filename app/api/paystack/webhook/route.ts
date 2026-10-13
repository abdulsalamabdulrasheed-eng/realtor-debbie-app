import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const secret = process.env.PAYSTACK_SECRET_KEY || "";
  const raw = await req.text();
  const hash = crypto.createHmac("sha512", secret).update(raw).digest("hex");
  if (hash !== req.headers.get("x-paystack-signature")) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }
  const event = JSON.parse(raw);
  if (event.event === "charge.success") {
    await db(
      `update bookings set payment_status = 'paid', amount_paid = $1 where payment_ref = $2`,
      [event.data.amount, event.data.reference]
    );
  }
  return NextResponse.json({ ok: true });
}
