import { db, dbOne } from "@/lib/db";
import Nav from "@/components/Nav";
import PageHero from "@/components/PageHero";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const revalidate = 30;

export default async function BookPage() {
  const estate = await dbOne<any>(`select * from estates where active = true order by created_at asc limit 1`);
  const plots = estate ? await db<any>(`select * from plots where estate_id = $1 order by size_sqm`, [estate.id]) : [];
  const settings = await dbOne<any>(`select * from settings where id = 1`);
  const s = settings ?? { brand_name: "Realtor Debbie", whatsapp: "2348012345678", email: "hello@realtordebbie.ng" };

  return (
    <>
      <Nav />
      <PageHero eyebrow="Reserve Your Spot" title="Book Your Inspection"
        subtitle="Pay ₦5,000. Pick your day. See the estate yourself. Then decide." />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {estate ? (
          <BookingForm estateId={estate.id} plots={plots} />
        ) : (
          <p className="text-center text-muted py-20">No active estate. Please try again later.</p>
        )}

        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { n: "01", t: "Pay ₦5,000", d: "Confirms your slot" },
            { n: "02", t: "Get a Call", d: "We confirm time & meeting point" },
            { n: "03", t: "See the Land", d: "Inspect and decide" },
          ].map((step) => (
            <div key={step.n} className="bg-white/60 backdrop-blur rounded-2xl p-6 border border-white/80">
              <div className="font-display text-amber2 text-3xl sm:text-4xl font-bold mb-3">{step.n}</div>
              <div className="font-display text-midnight font-semibold mb-1">{step.t}</div>
              <div className="text-[10px] tracking-widest uppercase text-muted">{step.d}</div>
            </div>
          ))}
        </div>
      </main>

      <Footer settings={s} />
      <WhatsAppButton number={s.whatsapp || "2348012345678"} />
    </>
  );
}
