import axios from "axios";

export async function sendWhatsApp(to: string, message: string) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  if (!token || !phoneId) { console.warn("WhatsApp skip:", to); return; }
  try {
    await axios.post(
      `https://graph.facebook.com/v20.0/${phoneId}/messages`,
      { messaging_product: "whatsapp", to: to.replace(/\D/g, ""),
        type: "text", text: { body: message } },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (e) { console.error("WA fail", e); }
}

export function debbieNumber() { return process.env.DEBIE_WHATSAPP || process.env.DEBBIE_WHATSAPP || ""; }
