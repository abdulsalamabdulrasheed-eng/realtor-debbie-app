export default function SectionHeading({
  eyebrow, title, subtitle, align = "left", light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  const cls = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-3xl ${cls} mb-10 sm:mb-14`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 mb-4 bg-white/70 backdrop-blur rounded-full px-4 py-1.5 border border-white/80 ${align === "center" ? "" : ""}`}>
          <div className="w-1.5 h-1.5 rounded-full bg-amber2" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      )}
      <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight ${light ? "text-white" : "text-midnight"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 sm:mt-5 text-base sm:text-lg leading-relaxed ${light ? "text-white/70" : "text-muted"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
