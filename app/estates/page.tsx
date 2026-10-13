import Link from "next/link";
import { db, dbOne } from "@/lib/db";
import Nav from "@/components/Nav";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { MapPin, ArrowRight } from "lucide-react";

export const revalidate = 30;

export default async function EstatesPage() {
  const estates = await db<any>(`select * from estates where active = true order by created_at desc`);
  const settings = await dbOne<any>(`select * from settings where id = 1`);
  const s = settings ?? { brand_name: "Realtor Debbie", whatsapp: "2348012345678", email: "hello@realtordebbie.ng" };

  return (
    <>
      <Nav />
      <PageHero eyebrow="Our Portfolio" title="Estates We Represent"
        subtitle="Every estate on this page has been personally inspected, verified, and vetted." />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {estates.length === 0 ? (
          <p className="text-center text-muted py-20 font-display italic text-xl">New estates coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {estates.map((e) => (
              <Link key={e.id} href={`/estates/${e.slug}`} className="card overflow-hidden group block">
                <div className="aspect-[16/10] bg-mist-2 overflow-hidden">
                  {e.hero_images?.[0] ? (
                    <img src={e.hero_images[0]} alt={e.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-midnight to-midnight-3 flex items-center justify-center">
                      <span className="font-display text-amber2/60 text-2xl sm:text-3xl">Coming Soon</span>
                    </div>
                  )}
                </div>
                <div className="p-6 sm:p-8">
                  <div className="eyebrow mb-3">{e.sold_out ? "Sold Out" : "Available Now"}</div>
                  <h3 className="font-display text-xl sm:text-2xl text-midnight font-bold mb-3">{e.name}</h3>
                  <div className="flex items-start gap-2 text-muted text-sm mb-6">
                    <MapPin size={16} className="mt-0.5 shrink-0" />
                    <span>{e.location}</span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-amber2 text-xs tracking-widest uppercase font-bold group-hover:gap-3 transition-all">
                    View Estate <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer settings={s} />
      <WhatsAppButton number={s.whatsapp || "2348012345678"} />
    </>
  );
}
