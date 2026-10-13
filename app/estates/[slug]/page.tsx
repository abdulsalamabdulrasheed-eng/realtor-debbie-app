import { notFound } from "next/navigation";
import { db, dbOne } from "@/lib/db";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import SectionHeading from "@/components/SectionHeading";
import PriceGrid from "@/components/PriceGrid";
import PaymentCalculator from "@/components/PaymentCalculator";
import MediaGallery from "@/components/MediaGallery";
import Documents from "@/components/Documents";
import LocationMap from "@/components/LocationMap";
import BookingForm from "@/components/BookingForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FooterCTA from "@/components/FooterCTA";
import WhatsAppButton from "@/components/WhatsAppButton";

export const revalidate = 30;

export default async function EstatePage({ params }: { params: { slug: string } }) {
  const estate = await dbOne<any>(`select * from estates where slug = $1`, [params.slug]);
  if (!estate) return notFound();

  const [plots, faqs, settings] = await Promise.all([
    db<any>(`select * from plots where estate_id = $1 order by size_sqm`, [estate.id]),
    db<any>(`select * from faqs order by sort_order`),
    dbOne<any>(`select * from settings where id = 1`),
  ]);

  const s = settings ?? { brand_name: "Realtor Debbie", whatsapp: "2348012345678", email: "hello@realtordebbie.ng" };

  return (
    <>
      <Nav />
      <Hero estate={estate} />
      <TrustBar />

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <SectionHeading eyebrow="Available Plots" title="Pricing & Availability"
            subtitle="Transparent pricing. No hidden fees." />
          <PriceGrid plots={plots} />
          <div className="mt-8 sm:mt-10"><PaymentCalculator plots={plots} /></div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <SectionHeading eyebrow="The Estate" title="Site Media"
            subtitle="Real footage of the estate — verify everything yourself." />
          <MediaGallery estate={estate} />
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <SectionHeading eyebrow="Legal" title="Documents & Title"
            subtitle="We don't hide paperwork. Verify everything at AGIS." />
          <Documents estate={estate} />
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <SectionHeading eyebrow="Find Us" title="Location & Access"
            subtitle="Along APO-KARSHI Express Way, by tarred road." />
          <LocationMap estate={estate} />
        </section>

        <section id="book" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 scroll-mt-24">
          <SectionHeading eyebrow="Reserve Your Spot" title="Book an Inspection"
            subtitle="₦5,000 commitment fee — filters serious buyers. Deducted from your plot payment." />
          <BookingForm estateId={estate.id} plots={plots} />
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <SectionHeading eyebrow="Common Questions" title="Frequently Asked" align="center" />
          <FAQ faqs={faqs} />
        </section>
      </main>

      <FooterCTA />
      <Footer settings={s} />
      <WhatsAppButton number={s.whatsapp || "2348012345678"} />
    </>
  );
}
