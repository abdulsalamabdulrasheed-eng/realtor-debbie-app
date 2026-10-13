# Realtor Debbie — Pro ₦300K Website

Full-stack Next.js + Supabase + Paystack + WhatsApp website for Access Gate Estate (and unlimited estates).

## 🚀 Quick Start

```bash
# 1. Install deps
npm install

# 2. Set up Supabase
# - Create project at supabase.com
# - SQL Editor → paste contents of supabase/schema.sql → Run
# - Storage → create bucket "media" (public)
# - Copy Project URL, anon key, service role key into .env.local

# 3. Set up Paystack
# - paystack.com → Settings → API Keys → copy secret + public
# - Set webhook to https://yourdomain.com/api/paystack/webhook

# 4. Set up WhatsApp Cloud API (optional but recommended)
# - developers.facebook.com → WhatsApp → get token + phone id
# - Set DEBBIE_WHATSAPP to Debbie's number (country code, no +)

# 5. Run
npm run dev
