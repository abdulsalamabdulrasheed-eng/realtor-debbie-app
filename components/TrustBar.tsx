import { ShieldCheck, Hammer, Users, MapPin } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "Verified Title", sub: "C of O · AGIS" },
  { icon: Hammer, title: "Buy & Build", sub: "Immediate Construction" },
  { icon: Users, title: "300+ Plots Sold", sub: "Trusted by Investors" },
  { icon: MapPin, title: "2 Mins to Road", sub: "Tarred Access" },
];

export default function TrustBar() {
  return (
    <section className="relative -mt-8 sm:-mt-12 z-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl border border-white/80 shadow-xl shadow-midnight/5 p-5 sm:p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8">
          {items.map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-mist to-mist-2 flex items-center justify-center text-amber2 shrink-0">
                <Icon size={18} strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <div className="font-display text-midnight font-bold text-sm sm:text-base truncate">{title}</div>
                <div className="text-[10px] sm:text-[11px] tracking-wider uppercase text-muted mt-0.5 truncate">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
