import Link from "next/link";
import { Estate } from "@/lib/types";

export default function Hero({ estate }: { estate: Estate }) {
  return (
    <section className="relative h-[85vh] min-h-[560px] sm:min-h-[640px] w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-midnight via-midnight-2 to-midnight-3" />
      {estate.video_url ? (
        <video className="absolute inset-0 w-full h-full object-cover opacity-90"
          src={estate.video_url} autoPlay muted loop playsInline />
      ) : estate.hero_images?.[0] ? (
        <img src={estate.hero_images[0]} alt="" className="absolute inset-0 w-full h-full object-cover opacity-90" />
      ) : null}
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center text-white py-16">
        <div className="fade-up max-w-4xl">
          <div className="inline-flex items-center gap-3 mb-5 sm:mb-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber2 animate-pulse" />
            <span className="text-amber2 text-[10px] sm:text-xs tracking-widest2 uppercase font-semibold">
              C of O Verified · Buy & Build
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] font-bold">
            {estate.name?.split(",")[0] || "Access Gate Estate"}
          </h1>
          <p className="font-display italic text-xl sm:text-2xl md:text-3xl text-amber2 mt-3 sm:mt-4">
            {estate.location?.split(",").slice(1).join(",").trim() || "APO WASSA, Abuja"}
          </p>

          <p className="mt-6 sm:mt-8 max-w-2xl text-white/80 text-base sm:text-lg leading-relaxed">
            {estate.tagline ?? "Premium residential plots along APO-KARSHI Express Way. Verified title. Ready to build."}
          </p>

          <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
            <Link href="/prices" className="btn btn-gold text-sm">View Pricing</Link>
            <Link href="/book" className="btn btn-white-outline text-sm">Book Inspection — ₦5,000</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
