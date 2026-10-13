export default function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-midnight via-midnight-2 to-midnight-3 text-white">
      <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212,162,76,0.15) 0%, transparent 40%), radial-gradient(circle at 80% 20%, rgba(30,58,112,0.4) 0%, transparent 50%)'}} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-28">
        <div className="inline-flex items-center gap-2 mb-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-amber2" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold max-w-4xl leading-tight">{title}</h1>
        {subtitle && <p className="mt-5 sm:mt-6 text-white/70 text-base sm:text-lg max-w-2xl leading-relaxed">{subtitle}</p>}
      </div>
    </section>
  );
}
