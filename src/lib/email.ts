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

export async function sendInternalEmail(
  reference: string,
  service: string,
  contactName: string,
  pdfBuffer: Buffer
) {
  const html = `
    <div style="font-family:Arial,sans-serif;background:#0f0602;color:#f8fafc;padding:30px">
      <h1 style="color:#facc15">Nouvelle demande de devis</h1>
      <p><strong>Référence :</strong> ${reference}</p>
      <p><strong>Service :</strong> ${service}</p>
      <p><strong>Client :</strong> ${contactName}</p>
      <p>Le PDF est joint à cet email.</p>
      <p style="margin-top:40px;font-size:12px;color:#888">Forage • Topographie • Immobilier • BTP</p>
    </div>`;

  await transporter.sendMail({
    from: SENDER,
    to: RECEIVER,
    subject: `Nouvelle Demande de Devis - ${service} - ${reference}`,
    html,
    attachments: [
      {
        filename: `${reference}.pdf`,
        content: pdfBuffer,
      },
    ],
  });
}

export async function sendClientConfirmation(
  reference: string,
  contactName: string,
  clientEmail: string
) {
  const html = `
    <div style="font-family:Arial,sans-serif;background:#0f0602;color:#f8fafc;padding:30px;text-align:center">
      <h1 style="color:#facc15">${COMPANY}</h1>
      <p style="font-size:18px">Bonjour ${contactName},</p>
      <p>Nous avons bien reçu votre demande de devis portant la référence <strong style="color:#facc15">${reference}</strong>.</p>
      <p>Notre équipe analysera votre projet et reviendra vers vous dans les meilleurs délais.</p>
      <p style="margin-top:40px">Merci pour votre confiance.</p>
      <p style="font-weight:bold">${COMPANY}</p>
      <p style="font-size:12px;color:#888">Forage • Topographie • Immobilier • BTP</p>
    </div>`;

  await transporter.sendMail({
    from: SENDER,
    to: clientEmail,
    subject: "Votre demande de devis a bien été reçue",
    html,
  });
}

export async function sendTestEmail() {
  await transporter.sendMail({
    from: SENDER,
    to: RECEIVER,
    subject: `Test - ${COMPANY} - Système de devis opérationnel`,
    html: `
      <div style="font-family:Arial,sans-serif;background:#0f0602;color:#f8fafc;padding:30px;text-align:center">
        <h1 style="color:#facc15">${COMPANY}</h1>
        <p style="font-size:18px">Le système d'envoi d'email est opérationnel.</p>
        <p style="margin-top:40px;font-size:12px;color:#888">Forage • Topographie • Immobilier • BTP</p>
      </div>`,
  });
  return { success: true };
}
