import { dbOne } from "@/lib/db";
import Nav from "@/components/Nav";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Footer from "@/components/Footer";
import FooterCTA from "@/components/FooterCTA";
import WhatsAppButton from "@/components/WhatsAppButton";

export const revalidate = 60;

export default async function AboutPage() {
  const settings = await dbOne<any>(`select * from settings where id = 1`);
  const s = settings ?? { brand_name: "Realtor Debbie", whatsapp: "2348012345678", email: "hello@realtordebbie.ng" };

  return (
    <>
      <Nav />
      <PageHero eyebrow="About" title="Meet Realtor Debbie"
        subtitle="Trusted advisor for discerning land buyers across Abuja and beyond." />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-16 sm:mb-24">
          <div>
            <SectionHeading eyebrow="The Story" title="Land, Done Right" />
            <div className="space-y-5 text-muted leading-relaxed">
              <p>After years of watching buyers lose money to fake titles and unverified estates, Realtor Debbie built a different kind of practice.</p>
              <p>Every estate on this site has been personally inspected, every title verified at AGIS, every road walked. If it's not real, it's not here.</p>
              <p>Today, over 300 families and investors have trusted her to guide their land purchases.</p>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Our Values" title="How We Work" />
            <div className="space-y-5">
              {[
                { t: "Verification First", d: "We verify every title before listing." },
                { t: "No Hidden Fees", d: "Price includes all documentation." },
                { t: "Real Inspection", d: "See the estate before you pay." },
                { t: "Lifetime Support", d: "We answer questions after the sale." },
              ].map((v) => (
                <div key={v.t} className="bg-white/70 backdrop-blur rounded-2xl p-5 border-l-4 border-amber2">
                  <div className="font-display text-midnight font-semibold text-base sm:text-lg mb-1">{v.t}</div>
                  <div className="text-muted text-sm">{v.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur rounded-3xl p-8 sm:p-12 text-center border border-white/80">
          <div className="eyebrow mb-4">Track Record</div>
          <h3 className="font-display text-2xl sm:text-3xl text-midnight font-bold mb-8">By The Numbers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { n: "300+", l: "Plots Sold" },
              { n: "15+", l: "Estates Verified" },
              { n: "5 yrs", l: "In Real Estate" },
              { n: "100%", l: "Title Verified" },
            ].map((st) => (
              <div key={st.l}>
                <div className="font-display text-3xl sm:text-4xl md:text-5xl text-amber2 font-bold">{st.n}</div>
                <div className="text-[10px] tracking-widest uppercase text-muted mt-2">{st.l}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <FooterCTA />
      <Footer settings={s} />
      <WhatsAppButton number={s.whatsapp || "2348012345678"} />
    </>
  );
}
