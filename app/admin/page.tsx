import { db, dbOne } from "@/lib/db";

export const dynamic = "force-dynamic";

async function stats() {
  const [estates, bookings, paid] = await Promise.all([
    dbOne<{ c: string }>(`select count(*)::text as c from estates`),
    dbOne<{ c: string }>(`select count(*)::text as c from bookings`),
    db<{ amount_paid: number }>(`select amount_paid from bookings where payment_status = 'paid'`),
  ]);
  const totalKobo = paid.reduce((a, b) => a + (b.amount_paid || 0), 0);
  return { estates: Number(estates?.c ?? 0), bookings: Number(bookings?.c ?? 0), totalKobo };
}

export default async function AdminHome() {
  const s = await stats();
  const cards = [
    { label: "Active Estates", value: s.estates },
    { label: "Total Bookings", value: s.bookings },
    { label: "₦5k Deposits (₦)", value: (s.totalKobo / 100).toLocaleString() },
  ];
  return (
    <div>
      <h1 className="font-display text-2xl sm:text-3xl text-midnight font-bold mb-6 sm:mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {cards.map((c) => (
          <div key={c.label} className="card p-6 sm:p-7">
            <p className="text-xs tracking-widest uppercase text-muted font-semibold">{c.label}</p>
            <p className="font-display text-3xl sm:text-4xl text-midnight font-bold mt-3">{c.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 sm:mt-8 card p-6 sm:p-7 text-sm text-muted">
        <p className="font-semibold text-midnight mb-3 text-base">Quick tips</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Add estates from <b className="text-midnight">Estates</b> → New Estate.</li>
          <li>Manage plot sizes, prices, and stock in <b className="text-midnight">Plots</b>.</li>
          <li>See every paid booking in <b className="text-midnight">Bookings</b> — click WhatsApp to message the buyer.</li>
        </ul>
      </div>
    </div>
  );
}
