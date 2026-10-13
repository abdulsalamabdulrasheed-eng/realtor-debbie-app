"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Stepper from "@/components/Stepper";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const STEPS = ["Basic Info", "Location & Media", "Documents"];

export default function NewEstate() {
  const r = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [f, setF] = useState<any>({
    name: "", location: "", tagline: "", description: "",
    video_url: "", cofo_url: "", survey_url: "", brochure_url: "",
    map_lat: 8.98, map_lng: 7.42, hero_images: [], site_media: [],
  });

  async function upload(file: File): Promise<string | null> {
    const fd = new FormData(); fd.append("file", file); fd.append("bucket", "media");
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const j = await res.json(); return j.url ?? null;
  }

  async function onUpload(e: any, field: string, multi = false) {
    const files = Array.from(e.target.files) as File[];
    if (!files.length) return;
    const urls = (await Promise.all(files.map((f) => upload(f)))).filter(Boolean) as string[];
    setF((s: any) => ({ ...s, [field]: multi ? [...(s[field] || []), ...urls] : urls[0] }));
  }

  async function save() {
    setLoading(true);
    const res = await fetch("/api/estates", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f),
    });
    const j = await res.json();
    setLoading(false);
    if (j.id) r.push("/admin/estates"); else alert(j.error || "Failed");
  }

  const label = "eyebrow block mb-2.5";
  const canNext = () => {
    if (step === 0) return f.name.trim() && f.location.trim();
    return true;
  };

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl sm:text-3xl text-midnight font-bold mb-6">New Estate</h1>

      <div className="bg-white/80 backdrop-blur-xl border border-white/80 rounded-3xl p-6 sm:p-10 shadow-xl shadow-midnight/5">
        <Stepper steps={STEPS} current={step} />

        <div className="min-h-[320px]">
          {step === 0 && (
            <div className="space-y-5 fade-in">
              <div>
                <label className={label}>Estate Name *</label>
                <input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className="input-premium" placeholder="Access Gate Estate" />
              </div>
              <div>
                <label className={label}>Location *</label>
                <input value={f.location} onChange={(e) => setF({ ...f, location: e.target.value })} className="input-premium" placeholder="Along APO-KARSHI Express Way" />
              </div>
              <div>
                <label className={label}>Tagline</label>
                <input value={f.tagline} onChange={(e) => setF({ ...f, tagline: e.target.value })} className="input-premium" placeholder="C of O Verified · Buy & Build" />
              </div>
              <div>
                <label className={label}>Description</label>
                <textarea value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} className="input-premium min-h-[100px]" placeholder="A premium residential estate..." />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5 fade-in">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={label}>Latitude</label>
                  <input type="number" step="any" value={f.map_lat} onChange={(e) => setF({ ...f, map_lat: +e.target.value })} className="input-premium" />
                </div>
                <div>
                  <label className={label}>Longitude</label>
                  <input type="number" step="any" value={f.map_lng} onChange={(e) => setF({ ...f, map_lng: +e.target.value })} className="input-premium" />
                </div>
              </div>
              <div>
                <label className={label}>Hero Video (mp4)</label>
                <input type="file" accept="video/*" onChange={(e) => onUpload(e, "video_url")} className="input-premium" />
                {f.video_url && <p className="text-xs text-emerald-600 mt-2">✓ Uploaded</p>}
              </div>
              <div>
                <label className={label}>Hero Photos</label>
                <input type="file" accept="image/*" multiple onChange={(e) => onUpload(e, "hero_images", true)} className="input-premium" />
                <p className="text-xs text-muted mt-2">{f.hero_images.length} uploaded</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 fade-in">
              <div>
                <label className={label}>C of O</label>
                <input type="file" accept="image/*,application/pdf" onChange={(e) => onUpload(e, "cofo_url")} className="input-premium" />
              </div>
              <div>
                <label className={label}>Survey Plan</label>
                <input type="file" accept="image/*,application/pdf" onChange={(e) => onUpload(e, "survey_url")} className="input-premium" />
              </div>
              <div>
                <label className={label}>Brochure PDF</label>
                <input type="file" accept="application/pdf" onChange={(e) => onUpload(e, "brochure_url")} className="input-premium" />
              </div>

              <div className="bg-mist rounded-2xl p-5 text-sm space-y-2">
                <div className="flex justify-between"><span className="text-muted">Name</span><span className="text-midnight font-medium">{f.name || "—"}</span></div>
                <div className="flex justify-between"><span className="text-muted">Location</span><span className="text-midnight font-medium text-right max-w-[60%] truncate">{f.location || "—"}</span></div>
                <div className="flex justify-between"><span className="text-muted">Photos</span><span className="text-midnight font-medium">{f.hero_images.length}</span></div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-midnight/5">
          <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
            className={`inline-flex items-center gap-2 text-sm font-medium ${step === 0 ? "text-muted/40 cursor-not-allowed" : "text-midnight hover:text-amber2 transition"}`}>
            <ArrowLeft size={16} /> Back
          </button>
          {step < STEPS.length - 1 ? (
            <button onClick={() => canNext() && setStep(step + 1)} disabled={!canNext()}
              className={`btn btn-primary text-sm ${!canNext() ? "opacity-40 cursor-not-allowed" : ""}`}>
              Continue <ArrowRight size={16} className="ml-2" />
            </button>
          ) : (
            <button onClick={save} disabled={loading} className="btn btn-gold text-sm">
              {loading ? "Saving..." : <><Check size={16} className="mr-2" /> Create Estate</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
