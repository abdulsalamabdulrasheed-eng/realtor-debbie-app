import { dbOne } from "@/lib/db";
import Nav from "@/components/Nav";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export const revalidate = 60;

export default async function ContactPage() {
  const settings = await dbOne<any>(`select * from settings where id = 1`);
  const s = settings ?? { brand_name: "Realtor Debbie", whatsapp: "2348012345678", email: "hello@realtordebbie.ng" };
  const wa = s.whatsapp?.replace(/\D/g, "") || "2348012345678";

  const channels = [
    { icon: MessageCircle, label: "WhatsApp", value: s.whatsapp || "+234 801 234 5678", href: `https://wa.me/${wa}`, primary: true },
    { icon: Phone, label: "Phone", value: s.whatsapp || "+234 801 234 5678", href: `tel:${s.whatsapp || ""}` },
    { icon: Mail, label: "Email", value: s.email || "hello@realtordebbie.ng", href: `mailto:${s.email || ""}` },
    { icon: MapPin, label: "Office", value: "APO WASSA, Abuja", href: "https://maps.google.com/?q=APO+WASSA" },
  ];

  return (
    <>
      <Nav />
      <PageHero eyebrow="Get in Touch" title="Contact Realtor Debbie"
        subtitle="Fastest response on WhatsApp. Send a message and we'll reply within the hour." />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-16 sm:mb-20">
          {channels.map(({ icon: Icon, label, value, href, primary }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className={`card p-6 sm:p-8 text-center group ${primary ? "ring-2 ring-amber2/60" : ""}`}>
              <div className={`w-14 h-14 mx-auto mb-5 rounded-2xl flex items-center justify-center transition ${primary ? "bg-gradient-to-br from-amber2 to-amber2-dark text-midnight" : "bg-mist text-midnight"}`}>
                <Icon size={22} strokeWidth={1.75} />
              </div>
              <div className="eyebrow mb-2">{label}</div>
              <div className="font-display text-midnight font-semibold text-sm sm:text-base break-words">{value}</div>
            </a>
          ))}
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <SectionHeading eyebrow="Or Book Directly" title="Reserve an Inspection"
            subtitle="Pay ₦5,000 and pick your preferred time slot. Deducted from your plot payment." align="center" />
          <a href="/book" className="btn btn-primary px-8 sm:px-10">Book Inspection</a>
        </div>
      </main>

      <Footer settings={s} />
      <WhatsAppButton number={wa} />
    </>
  );
}
