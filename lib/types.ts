export type Estate = {
  id: string; slug: string; name: string;
  location: string | null; description: string | null; tagline: string | null;
  video_url: string | null; map_lat: number | null; map_lng: number | null;
  cofo_url: string | null; survey_url: string | null; brochure_url: string | null;
  hero_images: string[];
  site_media: { type: "photo" | "video"; url: string; caption?: string }[];
  active: boolean; sold_out: boolean;
};

export type Plot = {
  id: string; estate_id: string; size_sqm: number;
  outright_price: number; plan_3m_monthly: number | null; plan_6m_monthly: number | null;
  plots_left: number; status: "available" | "reserved" | "sold";
};

export type Booking = {
  id: string; estate_id: string; plot_id: string | null;
  name: string; phone: string; email: string | null; size_sqm: number | null;
  inspection_date: string | null; inspection_time: string | null;
  guests: number; amount_paid: number; payment_ref: string | null;
  payment_status: string; status: string; created_at: string;
};

export type FAQ = { id: string; question: string; answer: string; sort_order: number };
