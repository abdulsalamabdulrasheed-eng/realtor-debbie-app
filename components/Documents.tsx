import { Estate } from "@/lib/types";
import { FileText, Download, ArrowUpRight } from "lucide-react";

export default function Documents({ estate }: { estate: Estate }) {
  const docs = [
    { label: "Certificate of Occupancy", sub: "C of O · AGIS Verifiable", url: estate.cofo_url },
    { label: "Survey Plan", sub: "Certified Licensed Surveyor", url: estate.survey_url },
    { label: "Deed of Assignment", sub: "Sample Document", url: null },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
      {docs.map((d) => (
        <div key={d.label} className="card p-6 sm:p-7 group">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mist to-mist-2 flex items-center justify-center mb-5">
            <FileText className="text-amber2" size={22} strokeWidth={1.75} />
          </div>
          <div className="font-display text-lg sm:text-xl text-midnight font-bold mb-1.5">{d.label}</div>
          <div className="text-[10px] tracking-widest uppercase text-muted mb-6">{d.sub}</div>
          {d.url ? (
            <a href={d.url} target="_blank" className="inline-flex items-center gap-2 text-amber2 text-xs font-bold tracking-widest uppercase hover:text-amber2-dark transition">
              View <ArrowUpRight size={14} />
            </a>
          ) : (
            <span className="text-xs tracking-wider uppercase text-muted/60">Available on request</span>
          )}
        </div>
      ))}
      {estate.brochure_url && (
        <a href={estate.brochure_url} className="sm:col-span-2 md:col-span-3 bg-gradient-to-br from-midnight to-midnight-3 hover:from-midnight-2 hover:to-midnight rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all shadow-lg shadow-midnight/20">
          <div>
            <div className="font-display text-xl sm:text-2xl text-white font-bold">Download Full Brochure</div>
            <div className="text-xs tracking-widest uppercase text-amber2 mt-2 font-semibold">PDF · Estate Details · Payment Plans</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber2 flex items-center justify-center shrink-0">
            <Download className="text-midnight" size={20} />
          </div>
        </a>
      )}
    </div>
  );
}
