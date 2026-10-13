import { NextRequest, NextResponse } from "next/server";
import { initPaystack } from "@/lib/paystack";
import { db, dbOne } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, estate_id, plot_id, inspection_date, inspection_time, guests } = body;

    if (!name || !phone || !estate_id || !plot_id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const plot = await dbOne<any>(`select * from plots where id = $1`, [plot_id]);
    if (!plot) return NextResponse.json({ error: "Plot not found" }, { status: 404 });

    const reference = `DEB-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    const booking = await dbOne<any>(
      `insert into bookings
        (estate_id, plot_id, name, phone, email, size_sqm,
         inspection_date, inspection_time, guests,
         payment_ref, payment_status, amount_paid)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'pending',0)
       returning *`,
      [
        estate_id, plot_id, name, phone, email || null, plot.size_sqm,
        inspection_date, inspection_time, guests || 1, reference,
      ]
    );

    const callback_url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/paystack/verify?reference=${reference}&booking_id=${booking.id}`;
    const email_ = email && email.includes("@") ? email : `${phone.replace(/\D/g, "")}@noemail.local`;

    const ps = await initPaystack({
      email: email_,
      amountKobo: 5000 * 100,
      reference,
      callback_url,
      metadata: { booking_id: booking.id, name, phone, size_sqm: plot.size_sqm },
    });

    return NextResponse.json({ authorization_url: ps.authorization_url, reference });
  } catch (e: any) {
    console.error("paystack init error", e);
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 });
  }
}
