import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Payments() {
  const paid = await db<any>(`select * from bookings where payment_status = 'paid'`);
  const total = paid.reduce((a, b) => a + (b.amount_paid || 0), 0);
  const count = paid.length;

  return (
    <div>
      <h1 className="font-display text-2xl sm:text-3xl text-midnight font-bold mb-6 sm:mb-8">Payments</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
        <div className="card p-6">
          <p className="text-xs tracking-widest uppercase text-muted font-semibold">Deposits Collected</p>
          <p className="font-display text-3xl text-midnight font-bold mt-3">₦{(total / 100).toLocaleString()}</p>
        </div>
        <div className="card p-6">
          <p className="text-xs tracking-widest uppercase text-muted font-semibold">Paid Bookings</p>
          <p className="font-display text-3xl text-midnight font-bold mt-3">{count}</p>
        </div>
        <div className="card p-6">
          <p className="text-xs tracking-widest uppercase text-muted font-semibold">Average</p>
          <p className="font-display text-3xl text-midnight font-bold mt-3">₦{count ? Math.round(total / count / 100).toLocaleString() : 0}</p>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-mist text-left">
            <tr>
              {["Name", "Phone", "Reference", "Amount", "Date"].map((h) => (
                <th key={h} className="p-4 text-xs tracking-widest uppercase text-muted font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paid.map((b: any) => (
              <tr key={b.id} className="border-t border-midnight/5">
                <td className="p-4 font-semibold text-midnight">{b.name}</td>
                <td className="p-4 text-muted">{b.phone}</td>
                <td className="p-4 font-mono text-xs text-muted break-all">{b.payment_ref}</td>
                <td className="p-4 text-ink">₦{((b.amount_paid || 0) / 100).toLocaleString()}</td>
                <td className="p-4 text-xs text-muted">{new Date(b.created_at).toLocaleString()}</td>
              </tr>
            ))}
            {!count && <tr><td colSpan={5} className="p-8 text-center text-muted">No payments yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
