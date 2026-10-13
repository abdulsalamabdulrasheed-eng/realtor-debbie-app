import { Resend } from "resend";
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendEmail(to: string, subject: string, html: string) {
  if (!resend) { console.warn("Email skip:", to); return; }
  try {
    await resend.emails.send({
      from: "Realtor Debbie <noreply@yourdomain.com>",
      to, subject, html,
    });
  } catch (e) { console.error("Email fail", e); }
}
