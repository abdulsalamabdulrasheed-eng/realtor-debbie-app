"use client";
import { useEffect, useState } from "react";

export default function BookingsAdmin() {
  const [list, setList] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");

  async function load() {
    const url = filter === "all" ? "/api/bookings" : `/api/bookings?status=${filter}`;
    setList(await fetch(url).then((r) => r.json()));
  }
  useEffect(() => { load(); }, [filter]);

  async function update(id: string, key: string, value: any) {
    await fetch("/api/bookings", {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, [key]: value }),
    });
    load();
  }

  function exportCSV() {
    const headers = ["Name", "Phone", "Email", "Size", "Date", "Time", "Guests", "Paid (kobo)", "Payment", "Status", "Ref", "Created"];
    const rows = list.map((b) => [b.name, b.phone, b.email, b.size_sqm, b.inspection_date, b.inspection_time, b.guests, b.amount_paid, b.payment_status, b.status, b.payment_ref, b.created_at]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${(c ?? "").toString().replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `bookings-${Date.now()}.csv`; a.click();
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3 justify-between items-center mb-6 sm:mb-8">
        <h1 className="font-display text-2xl sm:text-3xl text-midnight font-bold">Bookings</h1>
        <div className="flex gap-2">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input-premium py-2 text-xs w-36">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="visited">Visited</option>
            <option value="closed">Closed</option>
            <option value="ghosted">Ghosted</option>
          </select>
          <button onClick={exportCSV} className="btn btn-outline py-2 px-4 text-xs">Export CSV</button>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead className="bg-mist text-left">
            <tr>
              {["Name", "Phone", "Size", "Date", "₦ Paid", "Payment", "Status", "Actions"].map((h) => (
                <th key={h} className="p-4 text-xs tracking-widest uppercase text-muted font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map((b) => (
              <tr key={b.id} className="border-t border-midnight/5">
                <td className="p-4 font-semibold text-midnight">{b.name}</td>
                <td className="p-4 text-muted">{b.phone}</td>
                <td className="p-4 text-ink">{b.size_sqm}sqm</td>
                <td className="p-4 text-xs text-muted">{b.inspection_date} {b.inspection_time}</td>
                <td className="p-4 text-ink">{((b.amount_paid || 0) / 100).toLocaleString()}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-bold ${b.payment_status === "paid" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-gray-100 text-gray-500"}`}>
                    {b.payment_status}
                  </span>
                </td>
                <td className="p-4">
                  <select defaultValue={b.status} onChange={(e) => update(b.id, "status", e.target.value)} className="input-premium py-1.5 text-xs">
                    <option value="pending">Pending</option>
                    <option value="visited">Visited</option>
                    <option value="closed">Closed</option>
                    <option value="ghosted">Ghosted</option>
                  </select>
                </td>
                <td className="p-4">
                  <a href={`https://wa.me/${b.phone.replace(/\D/g, "")}`} target="_blank" className="text-emerald-600 font-semibold text-xs hover:text-emerald-700">WhatsApp →</a>
                </td>
              </tr>
            ))}
            {!list.length && <tr><td colSpan={8} className="p-8 text-center text-muted">No bookings yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
