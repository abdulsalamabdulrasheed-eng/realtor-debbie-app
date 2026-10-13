"use client";
import { useState } from "react";
import { Plot } from "@/lib/types";
import Stepper from "./Stepper";
import { User, Calendar, Check, ArrowLeft, ArrowRight } from "lucide-react";

const STEPS = ["Your Details", "Inspection", "Confirm"];

export default function BookingForm({ estateId, plots }: { estateId: string; plots: Plot[] }) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    plot_id: plots[0]?.id ?? "",
    inspection_date: "Saturday", inspection_time: "10:00 AM", guests: 1,
  });

  // Paystack is "ready" only when the public key is set in env
  const paystackReady = !!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  const canNext = () => {
    if (step === 0) return form.name.trim() && form.phone.trim();
    if (step === 1) return form.plot_id && form.inspection_date && form.inspection_time;
    return true;
  };

  const selected = plots.find((p) => p.id === form.plot_id);

  async function submit() {
    if (!paystackReady) {
      alert(
        "Online payment is not set up yet. Please contact Realtor Debbie on WhatsApp to book your inspection."
      );
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/paystack/init", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, estate_id: estateId }),
      });
      const data = await res.json();
      if (data.authorization_url) window.location.href = data.authorization_url;
      else alert(data.error || "Payment init failed");
    } catch (e: any) { alert(e.message); }
    finally { setLoading(false); }
  }

  const label = "eyebrow block mb-2.5";

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white/80 rounded-3xl p-6 sm:p-10 shadow-xl shadow-midnight/5">
      <Stepper steps={STEPS} current={step} />

      <div className="min-h-[280px]">
        {step === 0 && (
          <div className="space-y-5 fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-mist flex items-center justify-center text-amber2"><User size={18} /></div>
              <div className="font-display text-xl text-midnight font-bold">Your Details</div>
            </div>
            <div>
              <label className={label}>Full Name *</label>
              <input required placeholder="e.g. John Doe" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-premium" />
            </div>
            <div>
              <label className={label}>Phone / WhatsApp *</label>
              <input required placeholder="+234 801 234 5678" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-premium" />
            </div>
            <div>
              <label className={label}>Email (optional)</label>
              <input type="email" placeholder="you@example.com" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-premium" />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5 fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-mist flex items-center justify-center text-amber2"><Calendar size={18} /></div>
              <div className="font-display text-xl text-midnight font-bold">Inspection Details</div>
            </div>
            <div>
              <label className={label}>Plot Size</label>
              <select value={form.plot_id} onChange={(e) => setForm({ ...form, plot_id: e.target.value })} className="input-premium">
                {plots.map((p) => <option key={p.id} value={p.id}>{p.size_sqm} sqm — ₦{(p.outright_price / 1000).toLocaleString()}k</option>)}
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={label}>Preferred Day</label>
                <select value={form.inspection_date} onChange={(e) => setForm({ ...form, inspection_date: e.target.value })} className="input-premium">
                  <option>Saturday</option><option>Sunday</option><option>Weekday</option>
                </select>
              </div>
              <div>
                <label className={label}>Preferred Time</label>
                <select value={form.inspection_time} onChange={(e) => setForm({ ...form, inspection_time: e.target.value })} className="input-premium">
                  <option>10:00 AM</option><option>2:00 PM</option>
                </select>
              </div>
            </div>
            <div>
              <label className={label}>Number of People</label>
              <input type="number" min={1} value={form.guests}
                onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })} className="input-premium" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5 fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-mist flex items-center justify-center text-amber2"><Check size={18} /></div>
              <div className="font-display text-xl text-midnight font-bold">Review & Confirm</div>
            </div>

            <div className="bg-mist rounded-2xl p-5 space-y-3 text-sm">
              <Row label="Name" value={form.name} />
              <Row label="Phone" value={form.phone} />
              {form.email && <Row label="Email" value={form.email} />}
              <Row label="Plot Size" value={`${selected?.size_sqm ?? "-"} sqm`} />
              <Row label="Inspection" value={`${form.inspection_date} · ${form.inspection_time}`} />
              <Row label="Guests" value={String(form.guests)} />
            </div>

            <div className="bg-gradient-to-br from-midnight to-midnight-3 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-white">
              <div>
                <div className="text-[10px] tracking-widest2 uppercase text-amber2 font-semibold mb-1">Inspection Fee</div>
                <div className="font-display text-3xl font-bold">₦5,000</div>
                <p className="text-white/60 text-xs mt-2 max-w-xs">Deducted from your plot payment.</p>
              </div>
              <button
                onClick={submit}
                disabled={loading || !paystackReady}
                className="btn btn-gold w-full sm:w-auto px-8 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Redirecting..."
                  : paystackReady
                  ? "Pay & Confirm"
                  : "Coming Soon"}
              </button>
            </div>

            {!paystackReady && (
              <p className="text-xs text-muted text-center">
                Online payment will be enabled soon. For now, contact Realtor Debbie on WhatsApp to book.
              </p>
            )}
          </div>
        )}
      </div>

      {step < 2 && (
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-midnight/5">
          <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
            className={`inline-flex items-center gap-2 text-sm font-medium ${step === 0 ? "text-muted/40 cursor-not-allowed" : "text-midnight hover:text-amber2 transition"}`}>
            <ArrowLeft size={16} /> Back
          </button>
          <button onClick={() => canNext() && setStep(step + 1)} disabled={!canNext()}
            className={`btn btn-primary text-sm ${!canNext() ? "opacity-40 cursor-not-allowed" : ""}`}>
            Continue <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex justify-start mt-8 pt-6 border-t border-midnight/5">
          <button onClick={() => setStep(1)} className="inline-flex items-center gap-2 text-sm font-medium text-midnight hover:text-amber2 transition">
            <ArrowLeft size={16} /> Back
          </button>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted">{label}</span>
      <span className="text-midnight font-medium text-right">{value}</span>
    </div>
  );
}
