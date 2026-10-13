"use client";
import { useState } from "react";
import { Estate } from "@/lib/types";

export default function MediaGallery({ estate }: { estate: Estate }) {
  const [tab, setTab] = useState<"photos" | "videos">("photos");
  const photos = estate.hero_images ?? [];
  const videos = (estate.site_media ?? []).filter((m) => m.type === "video");

  return (
    <div>
      <div className="inline-flex bg-white/60 backdrop-blur rounded-full p-1 mb-8 border border-white/80">
        {(["photos", "videos"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 sm:px-6 py-2.5 text-xs tracking-widest uppercase font-semibold rounded-full transition-all ${
              tab === t ? "bg-gradient-to-br from-midnight to-midnight-3 text-white shadow-md" : "text-muted hover:text-midnight"
            }`}>
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {tab === "photos" && (photos.length ? photos.map((url, i) => (
          <div key={i} className="aspect-[4/3] overflow-hidden rounded-2xl bg-mist-2 group shadow-sm">
            <img src={url} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        )) : <EmptyState label="Photos coming soon" />)}

        {tab === "videos" && (videos.length ? videos.map((v, i) => (
          <div key={i} className="aspect-[4/3] overflow-hidden rounded-2xl bg-midnight shadow-sm">
            <video src={v.url} controls className="w-full h-full object-cover" />
          </div>
        )) : <EmptyState label="Videos coming soon" />)}
      </div>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="col-span-full text-center py-16 sm:py-20 bg-white/50 backdrop-blur rounded-2xl border border-dashed border-midnight/10">
      <p className="font-display italic text-lg sm:text-xl text-muted">{label}</p>
    </div>
  );
}
