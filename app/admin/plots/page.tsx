"use client";
import { useEffect, useState } from "react";

export default function PlotsAdmin() {
  const [estates, setEstates] = useState<any[]>([]);
  const [estateId, setEstateId] = useState("");
  const [plots, setPlots] = useState<any[]>([]);
  const [form, setForm] = useState<any>({
    size_sqm: 300, outright_price: 1500000, plan_3m_monthly: 550000,
    plan_6m_monthly: 280000, plots_left: 10, status: "available",
  });

  useEffect(() => {
    fetch("/api/estates").then((r) => r.json()).then((d) => {
      setEstates(d);
      if (d[0]) setEstateId(d[0].id);
    });
  }, []);

  useEffect(() => { if (estateId) loadPlots(); }, [estateId]);
  async function loadPlots() {
    const d = await fetch(`/api/plots?estate_id=${estateId}`).then((r) => r.json());
    setPlots(d);
  }

  async function add() {
    if (!estateId) return alert("No estate");
    await fetch("/api/plots", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, estate_id: estateId }),
    });
    loadPlots();
  }

  async function update(id: string, key: string, value: any) {
    await fetch("/api/plots", {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, [key]: value }),
    });
    setPlots((p) => p.map((x) => (x.id === id ? { ...x, [key]: value } : x)));
  }

  const label = "eyebrow block mb-2.5";

  return (
    <div>
      <h1 className="font-display text-2xl sm:text-3xl text-midnight font-bold mb-6 sm:mb-8">Plots</h1>

      <div className="card p-5 sm:p-7 mb-6">
        <div className="mb-5">
          <label className={label}>Estate</label>
          <select value={estateId} onChange={(e) => setEstateId(e.target.value)} className="input-premium">
            {estates.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div><label className={label}>Size sqm</label><input type="number" value={form.size_sqm} onChange={(e) => setForm({ ...form, size_sqm: +e.target.value })} className="input-premium" /></div>
          <div><label className={label}>Outright ₦</label><input type="number" value={form.outright_price} onChange={(e) => setForm({ ...form, outright_price: +e.target.value })} className="input-premium" /></div>
          <div><label className={label}>3m monthly ₦</label><input type="number" value={form.plan_3m_monthly} onChange={(e) => setForm({ ...form, plan_3m_monthly: +e.target.value })} className="input-premium" /></div>
          <div><label className={label}>6m monthly ₦</label><input type="number" value={form.plan_6m_monthly} onChange={(e) => setForm({ ...form, plan_6m_monthly: +e.target.value })} className="input-premium" /></div>
          <div><label className={label}>Plots left</label><input type="number" value={form.plots_left} onChange={(e) => setForm({ ...form, plots_left: +e.target.value })} className="input-premium" /></div>
          <div>
            <label className={label}>Status</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input-premium">
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="sold">Sold</option>
            </select>
          </div>
        </div>
        <button onClick={add} className="btn btn-primary mt-5 text-xs">+ Add Plot Size</button>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-mist text-left">
            <tr>
              <th className="p-4 text-xs tracking-widest uppercase text-muted font-semibold">Size</th>
              <th className="p-4 text-xs tracking-widest uppercase text-muted font-semibold">Outright</th>
              <th className="p-4 text-xs tracking-widest uppercase text-muted font-semibold">3m</th>
              <th className="p-4 text-xs tracking-widest uppercase text-muted font-semibold">6m</th>
              <th className="p-4 text-xs tracking-widest uppercase text-muted font-semibold">Left</th>
              <th className="p-4 text-xs tracking-widest uppercase text-muted font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {plots.map((p) => (
              <tr key={p.id} className="border-t border-midnight/5">
                <td className="p-4 font-semibold text-midnight">{p.size_sqm}sqm</td>
                <td className="p-4"><input type="number" defaultValue={p.outright_price} onBlur={(e) => update(p.id, "outright_price", +e.target.value)} className="input-premium py-2 text-xs w-32" /></td>
                <td className="p-4"><input type="number" defaultValue={p.plan_3m_monthly || 0} onBlur={(e) => update(p.id, "plan_3m_monthly", +e.target.value)} className="input-premium py-2 text-xs w-28" /></td>
                <td className="p-4"><input type="number" defaultValue={p.plan_6m_monthly || 0} onBlur={(e) => update(p.id, "plan_6m_monthly", +e.target.value)} className="input-premium py-2 text-xs w-28" /></td>
                <td className="p-4"><input type="number" defaultValue={p.plots_left} onBlur={(e) => update(p.id, "plots_left", +e.target.value)} className="input-premium py-2 text-xs w-20" /></td>
                <td className="p-4">
                  <select defaultValue={p.status} onChange={(e) => update(p.id, "status", e.target.value)} className="input-premium py-2 text-xs">
                    <option value="available">Available</option>
                    <option value="reserved">Reserved</option>
                    <option value="sold">Sold</option>
                  </select>
                </td>
              </tr>
            ))}
            {!plots.length && <tr><td colSpan={6} className="p-6 text-center text-muted">No plots yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
