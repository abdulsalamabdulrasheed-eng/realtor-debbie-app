import axios from "axios";
const BASE = "https://api.paystack.co";

export async function initPaystack(opts: {
  email: string; amountKobo: number; reference: string;
  callback_url: string; metadata?: Record<string, unknown>;
}) {
  const res = await axios.post(
    `${BASE}/transaction/initialize`,
    { email: opts.email, amount: opts.amountKobo, reference: opts.reference,
      callback_url: opts.callback_url, metadata: opts.metadata },
    { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
  );
  return res.data.data as { authorization_url: string; reference: string };
}

export async function verifyPaystack(reference: string) {
  const res = await axios.get(`${BASE}/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
  });
  return res.data.data;
}
