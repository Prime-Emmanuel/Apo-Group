import { jsPDF } from "jspdf";

interface DevisData {
  reference: string;
  service: string;
  details: Record<string, string>;
  contact: {
    name: string;
    phone: string;
    whatsapp: string;
    email: string;
    city: string;
    quarter: string;
  };
  files: string[]; // file names only (URLs are stored separately)
}

export function generateDevisPDF(data: DevisData): Buffer {
  const doc = new jsPDF();
  const margin = 20;
  let y = margin;

  // Title
  doc.setFontSize(18);
  doc.setTextColor(15, 6, 2);
  doc.text(`Dossier : ${data.reference}`, margin, y);
  y += 10;
  doc.setFontSize(12);
  doc.text(`Date : ${new Date().toLocaleDateString("fr-FR")}`, margin, y);
  y += 15;

  // Service
  doc.setFontSize(14);
  doc.setTextColor(250, 204, 21); // brand-yellow
  doc.text("Service demandé", margin, y);
  y += 8;
  doc.setFontSize(12);
  doc.setTextColor(15, 6, 2);
  doc.text(data.service, margin, y);
  y += 15;

  // Client info
  doc.setFontSize(14);
  doc.setTextColor(250, 204, 21);
  doc.text("Coordonnées", margin, y);
  y += 8;
  doc.setFontSize(12);
  doc.setTextColor(15, 6, 2);
  doc.text(`Nom : ${data.contact.name}`, margin, y);
  y += 6;
  doc.text(`Téléphone : ${data.contact.phone}`, margin, y);
  y += 6;
  doc.text(`WhatsApp : ${data.contact.whatsapp}`, margin, y);
  y += 6;
  doc.text(`Email : ${data.contact.email}`, margin, y);
  y += 6;
  doc.text(`Ville : ${data.contact.city}`, margin, y);
  y += 6;
  doc.text(`Quartier : ${data.contact.quarter}`, margin, y);
  y += 15;

  // Details
  doc.setFontSize(14);
  doc.setTextColor(250, 204, 21);
  doc.text("Détails du besoin", margin, y);
  y += 8;
  doc.setFontSize(12);
  doc.setTextColor(15, 6, 2);
  Object.entries(data.details).forEach(([key, value]) => {
    doc.text(`${key} : ${value}`, margin, y);
    y += 6;
  });
  y += 15;

  // Files
  if (data.files.length > 0) {
    doc.setFontSize(14);
    doc.setTextColor(250, 204, 21);
    doc.text("Documents fournis", margin, y);
    y += 8;
    doc.setFontSize(12);
    doc.setTextColor(15, 6, 2);
    data.files.forEach((file) => {
      doc.text(`- ${file}`, margin, y);
      y += 6;
    });
  }

  const buffer = Buffer.from(doc.output("arraybuffer"));
  return buffer;
}
