"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function EstatesAdmin() {
  const [list, setList] = useState<any[]>([]);
  useEffect(() => { fetch("/api/estates").then((r) => r.json()).then(setList); }, []);

  async function toggleActive(e: any) {
    await fetch(`/api/estates/${e.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !e.active }),
    });
    setList((l) => l.map((x) => (x.id === e.id ? { ...x, active: !x.active } : x)));
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3 justify-between items-center mb-6 sm:mb-8">
        <h1 className="font-display text-2xl sm:text-3xl text-midnight font-bold">Estates</h1>
        <Link href="/admin/estates/new" className="btn btn-primary text-xs">+ Add New Estate</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {list.map((e) => (
          <div key={e.id} className="card p-5 sm:p-6">
            <div className="flex justify-between gap-3 mb-3">
              <h3 className="font-display text-midnight font-bold text-base sm:text-lg">{e.name}</h3>
              <span className={`text-[10px] tracking-widest uppercase font-bold px-3 py-1 rounded-full shrink-0 ${e.active ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-gray-100 text-gray-500"}`}>
                {e.active ? "Active" : "Hidden"}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted mb-4">{e.location}</p>
            <button onClick={() => toggleActive(e)} className="btn btn-outline py-2 px-4 text-xs">
              {e.active ? "Hide" : "Activate"}
            </button>
          </div>
        ))}
        {!list.length && <p className="text-muted col-span-full text-center py-10">No estates yet.</p>}
      </div>
    </div>
  );
}
