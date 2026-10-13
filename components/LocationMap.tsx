import { Estate } from "@/lib/types";

export default function LocationMap({ estate }: { estate: Estate }) {
  const q = `${estate.map_lat ?? 8.98},${estate.map_lng ?? 7.42}`;
  const src = `https://www.google.com/maps?q=${q}&output=embed`;

  const landmarks = [
    { title: "APO Resettlement", time: "5 mins" },
    { title: "Shoprite Mall", time: "10 mins" },
    { title: "Tarred Road Access", time: "2 mins" },
  ];

  return (
    <div>
      <div className="rounded-2xl overflow-hidden shadow-lg shadow-midnight/10 border border-white/80">
        <iframe src={src} className="w-full h-72 sm:h-96" loading="lazy" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
        {landmarks.map((l) => (
          <div key={l.title} className="bg-white/70 backdrop-blur rounded-2xl p-5 border-l-4 border-amber2">
            <div className="text-[10px] tracking-widest2 uppercase text-amber2 font-bold mb-1.5">{l.time}</div>
            <div className="font-display text-midnight text-base sm:text-lg font-semibold">{l.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
