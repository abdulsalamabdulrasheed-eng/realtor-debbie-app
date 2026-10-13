"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/estates", label: "Estates" },
  { href: "/prices", label: "Pricing" },
  { href: "/gallery", label: "Gallery" },
  { href: "/documents", label: "Documents" },
  { href: "/location", label: "Location" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-white/75 backdrop-blur-xl border-b border-white/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-midnight to-midnight-3 flex items-center justify-center shadow-lg shadow-midnight/20">
              <span className="font-display text-amber2 text-lg sm:text-xl font-bold">RD</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-display text-midnight text-base sm:text-lg font-bold leading-none">Realtor Debbie</div>
              <div className="text-[9px] tracking-widest2 text-amber2 uppercase mt-0.5 font-semibold">Premium Land</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
            {links.map((l) => (
              <Link key={l.href} href={l.href}
                className={`nav-link text-xs tracking-widest uppercase font-medium ${path === l.href ? "text-midnight active" : "text-muted hover:text-midnight"}`}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/book" className="btn btn-gold hidden md:inline-flex text-xs py-2.5 px-5">
              Book Inspection
            </Link>
            <button onClick={() => setOpen(!open)} className="lg:hidden w-10 h-10 rounded-xl bg-mist flex items-center justify-center text-midnight" aria-label="Menu">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-white/60 shadow-lg">
          <div className="px-4 sm:px-6 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className={`text-sm tracking-wider uppercase py-3 px-3 rounded-xl transition ${path === l.href ? "bg-mist text-midnight font-semibold" : "text-muted hover:bg-mist hover:text-midnight"}`}>
                {l.label}
              </Link>
            ))}
            <Link href="/book" onClick={() => setOpen(false)} className="btn btn-gold text-xs mt-2">
              Book Inspection
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
