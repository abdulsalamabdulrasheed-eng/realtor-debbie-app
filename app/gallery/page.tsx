import { dbOne } from "@/lib/db";
import Nav from "@/components/Nav";
import PageHero from "@/components/PageHero";
import MediaGallery from "@/components/MediaGallery";
import Footer from "@/components/Footer";
import FooterCTA from "@/components/FooterCTA";
import WhatsAppButton from "@/components/WhatsAppButton";

export const revalidate = 30;

export default async function GalleryPage() {
  const estate = await dbOne<any>(`select * from estates where active = true order by created_at asc limit 1`);
  const settings = await dbOne<any>(`select * from settings where id = 1`);
  const s = settings ?? { brand_name: "Realtor Debbie", whatsapp: "2348012345678", email: "hello@realtordebbie.ng" };

  return (
    <>
      <Nav />
      <PageHero eyebrow="Media" title="See The Estate"
        subtitle="Drone footage, road access, plot clearing, neighbourhood — unfiltered." />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {estate ? <MediaGallery estate={estate} /> : <p className="text-center text-muted py-20">No media yet.</p>}
      </main>
      <FooterCTA />
      <Footer settings={s} />
      <WhatsAppButton number={s.whatsapp || "2348012345678"} />
    </>
  );
}
