"use client";
import { useMemo, useState } from "react";
import { Plot } from "@/lib/types";
const fmt = (n: number) => "₦" + n.toLocaleString("en-NG");

export default function PaymentCalculator({ plots }: { plots: Plot[] }) {
  const [size, setSize] = useState<number>(plots[0]?.size_sqm ?? 0);
  const [plan, setPlan] = useState<"outright" | "3m" | "6m">("outright");
  const selected = useMemo(() => plots.find((p) => p.size_sqm === size), [plots, size]);

  const display = useMemo(() => {
    if (!selected) return "";
    if (plan === "outright") return fmt(selected.outright_price);
    if (plan === "3m" && selected.plan_3m_monthly)
      return `${fmt(selected.plan_3m_monthly)} × 3`;
    if (plan === "6m" && selected.plan_6m_monthly)
      return `${fmt(selected.plan_6m_monthly)} × 6`;
    return "Not available";
  }, [selected, plan]);

  return (
    <div className="card p-6 sm:p-8">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-5 items-end">
        <div>
          <label className="eyebrow block mb-2.5">Plot Size</label>
          <select value={size} onChange={(e) => setSize(Number(e.target.value))} className="input-premium">
            {plots.map((p) => <option key={p.id} value={p.size_sqm}>{p.size_sqm} sqm</option>)}
          </select>
        </div>
        <div>
          <label className="eyebrow block mb-2.5">Payment Plan</label>
          <select value={plan} onChange={(e) => setPlan(e.target.value as any)} className="input-premium">
            <option value="outright">Outright</option>
            <option value="3m">3 Months</option>
            <option value="6m">6 Months</option>
          </select>
        </div>
        <div className="bg-gradient-to-br from-midnight to-midnight-3 rounded-xl px-6 py-4 min-w-full md:min-w-[260px]">
          <div className="text-[10px] tracking-widest2 uppercase text-amber2 font-semibold mb-1">You Pay</div>
          <div className="font-display text-lg sm:text-xl text-white font-bold">{display}</div>
        </div>
      </div>
    </div>
  );
}
