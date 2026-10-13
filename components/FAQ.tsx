import { FAQ as FAQType } from "@/lib/types";
export default function FAQ({ faqs }: { faqs: FAQType[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((f) => (
        <details key={f.id} className="group bg-white/70 backdrop-blur rounded-2xl border border-white/80 shadow-sm open:shadow-md transition-shadow overflow-hidden">
          <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer list-none">
            <span className="font-display text-base sm:text-lg text-midnight font-semibold pr-4">{f.question}</span>
            <span className="w-8 h-8 rounded-full bg-mist flex items-center justify-center text-amber2 text-xl transition-transform group-open:rotate-45 shrink-0">+</span>
          </summary>
          <div className="px-5 sm:px-6 pb-5 sm:pb-6">
            <div className="gold-divider mb-4" />
            <p className="text-muted leading-relaxed text-sm sm:text-base">{f.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
