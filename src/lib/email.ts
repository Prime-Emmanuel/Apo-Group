import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
      <p>Le PDF est joint.</p>
    </div>`;

  await resend.emails.send({
    from: SENDER,
    to: RECEIVER,
    subject: `Nouvelle Demande de Devis - ${service} - ${reference}`,
    html,
    attachments: [
      {
        filename: `${reference}.pdf`,
        content: pdfBuffer.toString("base64"),
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
      <h1 style="color:#facc15">${process.env.COMPANY_NAME}</h1>
      <p style="font-size:18px">Bonjour ${contactName},</p>
      <p>Nous avons bien reçu votre demande de devis portant la référence <strong style="color:#facc15">${reference}</strong>.</p>
      <p>Notre équipe analysera votre projet et reviendra vers vous dans les meilleurs délais.</p>
      <p style="margin-top:40px">Cordialement,</p>
      <p style="font-weight:bold">${process.env.COMPANY_NAME}</p>
      <p style="font-size:12px;color:#888">Forage • Topographie • Immobilier • BTP</p>
    </div>`;

  await resend.emails.send({
    from: SENDER,
    to: clientEmail,
    subject: "Votre demande de devis a bien été reçue",
    html,
  });
}
