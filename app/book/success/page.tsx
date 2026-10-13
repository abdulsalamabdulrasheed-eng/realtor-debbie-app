import Link from "next/link";
import Nav from "@/components/Nav";

export default function Success({ searchParams }: { searchParams: { status?: string; ref?: string } }) {
  const ok = searchParams.status === "success";
  return (
    <>
      <Nav />
      <main className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="bg-white/80 backdrop-blur-xl border border-white/80 rounded-3xl p-8 sm:p-12 max-w-lg w-full text-center shadow-xl shadow-midnight/5">
          <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl ${ok ? "bg-gradient-to-br from-amber2 to-amber2-dark text-midnight" : "bg-red-50 border-2 border-red-200 text-red-500"}`}>
            {ok ? "✓" : "✕"}
          </div>
          <div className="eyebrow mb-4">{ok ? "Confirmed" : "Failed"}</div>
          <h1 className="font-display text-2xl sm:text-3xl text-midnight font-bold mb-4">
            {ok ? "Booking Confirmed" : "Payment Failed"}
          </h1>
          <p className="text-muted mb-8 leading-relaxed text-sm sm:text-base">
            {ok
              ? "Realtor Debbie will call you shortly. Check WhatsApp for confirmation."
              : "We couldn't verify the payment. Please try again or contact us on WhatsApp."}
          </p>
          {ok && searchParams.ref && (
            <div className="bg-mist rounded-2xl p-4 mb-8">
              <div className="text-[10px] tracking-widest uppercase text-muted mb-1">Reference</div>
              <div className="font-mono text-sm text-midnight break-all">{searchParams.ref}</div>
            </div>
          )}
          <Link href="/" className="btn btn-primary w-full">Return Home</Link>
        </div>
      </main>
    </>
  );
}
