import Link from "next/link";

export default function FooterCTA() {
  return (
    <section className="px-4 sm:px-6 my-16 sm:my-20">
      <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-midnight via-midnight-2 to-midnight-3 relative">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(212,162,76,0.4) 0%, transparent 40%), radial-gradient(circle at 70% 70%, rgba(30,58,112,0.6) 0%, transparent 50%)'}} />
        <div className="relative px-6 sm:px-10 py-14 sm:py-20 text-center text-white">
          <div className="inline-flex items-center gap-2 mb-5 bg-white/10 backdrop-blur rounded-full px-4 py-1.5 border border-white/20">
            <div className="w-1.5 h-1.5 rounded-full bg-amber2" />
            <span className="eyebrow">Ready to Invest</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-5">
            Own Verified Land Today
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8 sm:mb-10 text-base sm:text-lg">
            Book an inspection. Pay ₦5,000. See the estate. Then decide.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            <Link href="/book" className="btn btn-gold px-8 sm:px-10">Book Inspection</Link>
            <Link href="/prices" className="btn btn-white-outline px-8 sm:px-10">See Pricing</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
