import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const RECEIVER = process.env.QUOTE_RECEIVER_EMAIL!;
const SENDER = process.env.SENDER_EMAIL!;
const COMPANY = process.env.COMPANY_NAME!;

export async function sendTestEmail() {
  try {
    const info = await transporter.sendMail({
      from: SENDER,
      to: RECEIVER,
      subject: `✅ Test - ${COMPANY} - Système de devis opérationnel`,
      html: `
        <div style="font-family:Arial,sans-serif;background:#0f0602;color:#f8fafc;padding:30px;text-align:center">
          <h1 style="color:#facc15">${COMPANY}</h1>
          <p style="font-size:18px">Le système d'envoi d'email est opérationnel.</p>
          <p>Ceci est un email de test envoyé depuis votre site.</p>
          <p style="margin-top:40px;font-size:12px;color:#888">Forage • Topographie • Immobilier • BTP</p>
        </div>`,
    });
    return { success: true, data: info };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error };
  }
}
