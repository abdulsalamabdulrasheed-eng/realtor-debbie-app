"use client";
import { useEffect, useState } from "react";

export default function SettingsAdmin() {
  const [s, setS] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then(setS);
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(s),
    });
    setSaving(false);
    alert("Saved ✓");
  }

  if (!s) return <p className="text-muted">Loading...</p>;

  const label = "eyebrow block mb-2.5";
  const field = (l: string, k: string) => (
    <div>
      <label className={label}>{l}</label>
      <input value={s[k] ?? ""} onChange={(e) => setS({ ...s, [k]: e.target.value })} className="input-premium" />
    </div>
  );

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl sm:text-3xl text-midnight font-bold mb-6 sm:mb-8">Settings</h1>
      <div className="card p-6 sm:p-8 space-y-5">
        {field("Brand Name", "brand_name")}
        {field("WhatsApp (e.g. 2348012345678)", "whatsapp")}
        {field("Email", "email")}
        {field("Instagram URL", "instagram")}
        {field("Facebook URL", "facebook")}
        {field("Primary Color (hex)", "primary_color")}
        <button onClick={save} disabled={saving} className="btn btn-primary w-full mt-2">
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
