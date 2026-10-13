import Link from "next/link";

export default function Footer({ settings }: { settings: any }) {
  return (
    <footer className="mt-20 sm:mt-24 bg-gradient-to-br from-midnight via-midnight-2 to-midnight-3 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber2 to-amber2-dark flex items-center justify-center">
              <span className="font-display text-midnight text-lg font-bold">RD</span>
            </div>
            <div>
              <div className="font-display text-lg font-bold">{settings.brand_name || "Realtor Debbie"}</div>
              <div className="text-[9px] tracking-widest2 uppercase text-amber2 mt-0.5 font-semibold">Premium Land</div>
            </div>
          </div>
          <p className="text-white/60 max-w-md leading-relaxed text-sm">
            Verified land. Transparent titles. Real investment value. Serving discerning buyers across Abuja and beyond.
          </p>
        </div>

        <div>
          <div className="eyebrow mb-5">Explore</div>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/estates" className="text-white/70 hover:text-amber2 transition">Estates</Link></li>
            <li><Link href="/prices" className="text-white/70 hover:text-amber2 transition">Pricing</Link></li>
            <li><Link href="/gallery" className="text-white/70 hover:text-amber2 transition">Gallery</Link></li>
            <li><Link href="/documents" className="text-white/70 hover:text-amber2 transition">Documents</Link></li>
            <li><Link href="/about" className="text-white/70 hover:text-amber2 transition">About</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-5">Contact</div>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-center gap-2">📞 {settings.whatsapp || "+234 801 234 5678"}</li>
            <li className="flex items-center gap-2">✉️ {settings.email || "hello@realtordebbie.ng"}</li>
            <li className="pt-3 flex gap-4">
              {settings.instagram && <a href={settings.instagram} className="hover:text-amber2 transition">Instagram</a>}
              {settings.facebook && <a href={settings.facebook} className="hover:text-amber2 transition">Facebook</a>}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6 flex flex-col sm:flex-row justify-between gap-2 sm:gap-3 text-[10px] sm:text-xs text-white/40 tracking-wider uppercase">
          <span>© {new Date().getFullYear()} {settings.brand_name || "Realtor Debbie"}</span>
          <span>Verified Land · Buy & Build</span>
        </div>
      </div>
    </footer>
  );
}
