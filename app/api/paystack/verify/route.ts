import { NextRequest, NextResponse } from "next/server";
import { verifyPaystack } from "@/lib/paystack";
import { db, dbOne } from "@/lib/db";
import { sendWhatsApp, debbieNumber } from "@/lib/whatsapp";
import { sendEmail } from "@/lib/email";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const reference = url.searchParams.get("reference");
  const booking_id = url.searchParams.get("booking_id");
  const site = process.env.NEXT_PUBLIC_SITE_URL || "";

  if (!reference || !booking_id) return NextResponse.redirect(`${site}/book/success?status=failed`);

  try {
    const verified = await verifyPaystack(reference);
    if (verified.status !== "success") return NextResponse.redirect(`${site}/book/success?status=failed`);

    const booking = await dbOne<any>(`select * from bookings where id = $1`, [booking_id]);
    if (!booking) return NextResponse.redirect(`${site}/book/success?status=failed`);

    await db(`update bookings set payment_status = 'paid', amount_paid = $1 where id = $2`,
      [verified.amount, booking_id]);

    if (booking.plot_id) {
      const plot = await dbOne<any>(`select * from plots where id = $1`, [booking.plot_id]);
      if (plot && plot.plots_left > 0) {
        await db(`update plots set plots_left = plots_left - 1 where id = $1`, [plot.id]);
      }
    }

    const buyerMsg = `Hi ${booking.name}, ✅ your inspection is booked!\n\nSize: ${booking.size_sqm}sqm\nDate: ${booking.inspection_date} ${booking.inspection_time}\nGuests: ${booking.guests}\nRef: ${reference}\n\nRealtor Debbie will call you shortly.`;
    await sendWhatsApp(booking.phone, buyerMsg);

    const debbieMsg = `🔔 NEW BOOKING — ₦5k PAID\n\nName: ${booking.name}\nPhone: ${booking.phone}\nSize: ${booking.size_sqm}sqm\nDate: ${booking.inspection_date} ${booking.inspection_time}\nRef: ${reference}`;
    await sendWhatsApp(debbieNumber(), debbieMsg);

    if (process.env.DEBBIE_EMAIL) {
      await sendEmail(
        process.env.DEBBIE_EMAIL,
        `New ₦5k Booking — ${booking.name} (${booking.size_sqm}sqm)`,
        `<h2>New Paid Booking</h2><p><b>${booking.name}</b> — ${booking.phone}</p>
         <p>Size: ${booking.size_sqm}sqm</p>
         <p>Date: ${booking.inspection_date} ${booking.inspection_time}</p>
         <p>Guests: ${booking.guests}</p>
         <p>Reference: ${reference}</p>`
      );
    }

    return NextResponse.redirect(`${site}/book/success?status=success&ref=${reference}`);
  } catch (e) {
    console.error("verify error", e);
    return NextResponse.redirect(`${site}/book/success?status=failed`);
  }
}
