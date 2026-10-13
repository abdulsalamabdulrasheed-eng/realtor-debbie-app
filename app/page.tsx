import Link from "next/link";
import { db, dbOne } from "@/lib/db";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import SectionHeading from "@/components/SectionHeading";
import PriceGrid from "@/components/PriceGrid";
import PaymentCalculator from "@/components/PaymentCalculator";
import MediaGallery from "@/components/MediaGallery";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FooterCTA from "@/components/FooterCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Estate, Plot, FAQ as FAQType } from "@/lib/types";

export const revalidate = 30;

async function getData() {
  const estate = await dbOne<Estate>(`select * from estates where active = true order by created_at asc limit 1`);
  if (!estate) return { estate: null, plots: [], faqs: [], settings: null };
  const [plots, faqs, settings] = await Promise.all([
    db<Plot>(`select * from plots where estate_id = $1 order by size_sqm`, [estate.id]),
    db<FAQType>(`select * from faqs order by sort_order`),
    dbOne<any>(`select * from settings where id = 1`),
  ]);
  return { estate, plots, faqs, settings };
}

export default async function Home() {
  const { estate, plots, faqs, settings } = await getData();

  if (!estate) {
    return (
      <>
        <Nav />
        <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-display text-4xl text-midnight mb-4">Realtor Debbie</h1>
          <p className="text-muted mb-6">No active estate yet.</p>
          <Link href="/contact" className="btn btn-primary">Contact Us</Link>
        </main>
        <Footer settings={{ brand_name: "Realtor Debbie", whatsapp: "+234 801 234 5678", email: "hello@realtordebbie.ng" }} />
      </>
    );
  }

  const s = settings ?? { brand_name: "Realtor Debbie", whatsapp: "+234 801 234 5678", email: "hello@realtordebbie.ng" };

  return (
    <>
      <Nav />
      <Hero estate={estate} />
      <TrustBar />

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <SectionHeading eyebrow="Available Plots" title="Pricing & Availability"
            subtitle="Choose your plot size. Pay outright or spread across 3 or 6 months." />
          <PriceGrid plots={plots} />
          <div className="mt-8 sm:mt-10"><PaymentCalculator plots={plots} /></div>
          <div className="mt-8 text-center">
            <Link href="/prices" className="btn btn-outline">See Full Pricing Page</Link>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <SectionHeading eyebrow="The Estate" title="See It For Yourself"
            subtitle="Real footage, unfiltered. Drone shots, road access, and plot conditions." />
          <MediaGallery estate={estate} />
          <div className="mt-8 text-center">
            <Link href="/gallery" className="btn btn-outline">View Full Gallery</Link>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <SectionHeading eyebrow="Common Questions" title="Frequently Asked"
            subtitle="Everything buyers usually ask before committing." />
          <FAQ faqs={faqs} />
        </section>
      </main>

      <FooterCTA />
      <Footer settings={s} />
      <WhatsAppButton number={s.whatsapp || "2348012345678"} />
    </>
  );
}
