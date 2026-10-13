import Link from "next/link";
import { Plot } from "@/lib/types";

const fmt = (n: number | null) => (n ? "₦" + n.toLocaleString("en-NG") : "—");

function StatusBadge({ left }: { left: number }) {
  if (left === 0)
    return <span className="text-[10px] tracking-widest uppercase font-bold bg-red-50 text-red-600 px-3 py-1 rounded-full border border-red-100">Sold Out</span>;
  if (left <= 4)
    return <span className="text-[10px] tracking-widest uppercase font-bold bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-100">{left} Left</span>;
  return <span className="text-[10px] tracking-widest uppercase font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100">{left} Available</span>;
}

export default function PriceGrid({ plots }: { plots: Plot[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
      {plots.map((p) => (
        <div key={p.id} className="card overflow-hidden group flex flex-col">
          <div className="p-6 sm:p-7 flex-1">
            <div className="flex justify-between items-start mb-5 gap-3">
              <div>
                <div className="font-display text-3xl sm:text-4xl text-midnight font-bold leading-none">{p.size_sqm}</div>
                <div className="text-[10px] tracking-widest2 uppercase text-amber2 mt-1.5 font-semibold">Square Metres</div>
              </div>
              <StatusBadge left={p.plots_left} />
            </div>

            <div className="gold-divider my-5" />

            <div className="space-y-4">
              <div>
                <div className="text-[10px] tracking-widest uppercase text-muted mb-1 font-semibold">Outright</div>
                <div className="font-display text-2xl text-midnight font-bold">{fmt(p.outright_price)}</div>
              </div>
              {p.plan_3m_monthly && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted">3 months</span>
                  <span className="text-ink font-medium">{fmt(p.plan_3m_monthly)} <span className="text-muted text-xs">× 3</span></span>
                </div>
              )}
              {p.plan_6m_monthly && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted">6 months</span>
                  <span className="text-ink font-medium">{fmt(p.plan_6m_monthly)} <span className="text-muted text-xs">× 6</span></span>
                </div>
              )}
            </div>
          </div>

          <Link href="/book" className="block text-center py-4 text-xs tracking-widest2 uppercase font-bold text-midnight border-t border-midnight/5 bg-white/50 hover:bg-gradient-to-r hover:from-amber2 hover:to-amber2-dark hover:text-white transition-all duration-300">
            Select This Plot
          </Link>
        </div>
      ))}
    </div>
  );
}
