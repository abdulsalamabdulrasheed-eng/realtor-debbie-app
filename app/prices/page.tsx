import { db, dbOne } from "@/lib/db";
import Nav from "@/components/Nav";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import PriceGrid from "@/components/PriceGrid";
import PaymentCalculator from "@/components/PaymentCalculator";
import Footer from "@/components/Footer";
import FooterCTA from "@/components/FooterCTA";
import WhatsAppButton from "@/components/WhatsAppButton";

export const revalidate = 30;

export default async function PricesPage() {
  const estate = await dbOne<any>(`select * from estates where active = true order by created_at asc limit 1`);
  const plots = estate ? await db<any>(`select * from plots where estate_id = $1 order by size_sqm`, [estate.id]) : [];
  const settings = await dbOne<any>(`select * from settings where id = 1`);
  const s = settings ?? { brand_name: "Realtor Debbie", whatsapp: "2348012345678", email: "hello@realtordebbie.ng" };

  return (
    <>
      <Nav />
      <PageHero eyebrow="Investment" title="Transparent Pricing"
        subtitle="One look. Every size. Every payment plan. No back-and-forth." />

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <SectionHeading eyebrow="All Plot Sizes" title="Pick Your Investment"
            subtitle="Pay outright and save. Or spread across 3 / 6 months." />
          <PriceGrid plots={plots} />
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <SectionHeading eyebrow="Calculator" title="Estimate Your Payment"
            subtitle="Select a plot size and plan to see what you'd pay." />
          <PaymentCalculator plots={plots} />
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <SectionHeading eyebrow="Notes" title="What's Included" align="center" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {[
              "C of O title — fully documented",
              "Survey plan included",
              "Deed of Assignment provided",
              "No hidden documentation fees",
              "Buy & Build — start immediately",
              "Flexible 3 / 6 month installment",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 p-5 bg-white/70 backdrop-blur rounded-2xl border border-white/80">
                <span className="w-6 h-6 rounded-full bg-amber2/15 text-amber2 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✦</span>
                <span className="text-ink text-sm sm:text-base">{item}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <FooterCTA />
      <Footer settings={s} />
      <WhatsAppButton number={s.whatsapp || "2348012345678"} />
    </>
  );
}
