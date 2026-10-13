import Link from "next/link";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/estates", label: "Estates" },
  { href: "/admin/plots", label: "Plots" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/payments", label: "Payments" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside className="md:w-64 bg-gradient-to-b from-midnight to-midnight-3 text-white p-5 md:p-6 shrink-0 md:min-h-screen">
        <Link href="/" className="flex items-center gap-3 mb-6 md:mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber2 to-amber2-dark flex items-center justify-center">
            <span className="font-display text-midnight text-lg font-bold">RD</span>
          </div>
          <div>
            <div className="font-display font-bold leading-none">Admin</div>
            <div className="text-[9px] tracking-widest2 uppercase text-amber2 mt-1">Control Panel</div>
          </div>
        </Link>
        <nav className="flex md:flex-col gap-1.5 overflow-x-auto pb-2 md:pb-0">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className="px-4 py-2.5 rounded-xl text-xs tracking-widest uppercase font-medium text-white/70 hover:text-amber2 hover:bg-white/5 whitespace-nowrap transition">
              {l.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-4 sm:p-6 md:p-10">{children}</main>
    </div>
  );
}
