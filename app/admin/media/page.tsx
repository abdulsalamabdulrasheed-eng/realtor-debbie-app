"use client";
import { useState } from "react";

export default function MediaAdmin() {
  const [items, setItems] = useState<{ url: string; type: string }[]>([]);
  const [busy, setBusy] = useState(false);

  async function upload(files: FileList) {
    setBusy(true);
    const out: { url: string; type: string }[] = [];
    for (const file of Array.from(files)) {
      const fd = new FormData(); fd.append("file", file); fd.append("bucket", "media");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const j = await res.json();
      if (j.url) out.push({ url: j.url, type: file.type.startsWith("video") ? "video" : "photo" });
    }
    setItems((s) => [...out, ...s]);
    setBusy(false);
  }

  return (
    <div>
      <h1 className="font-display text-2xl sm:text-3xl text-midnight font-bold mb-6 sm:mb-8">Media Library</h1>
      <div className="card p-6 mb-6">
        <label className="eyebrow block mb-2.5">Upload Photos / Videos</label>
        <input type="file" multiple accept="image/*,video/*" onChange={(e) => e.target.files && upload(e.target.files)} className="input-premium" />
        {busy && <p className="text-xs text-amber2 mt-3">Uploading...</p>}
        <p className="text-xs text-muted mt-3">Uploads go to Cloudinary. Copy URLs into Estates.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {items.map((m, i) => (
          <div key={i} className="card p-2">
            {m.type === "video"
              ? <video src={m.url} className="w-full h-28 sm:h-32 object-cover rounded-xl" controls />
              : <img src={m.url} className="w-full h-28 sm:h-32 object-cover rounded-xl" />}
            <button onClick={() => navigator.clipboard.writeText(m.url)}
              className="text-xs text-amber2 mt-2 w-full text-left truncate px-1 hover:text-amber2-dark">Copy URL</button>
          </div>
        ))}
      </div>
    </div>
  );
}
