import { NextRequest, NextResponse } from "next/server";
import { generateReference } from "@/lib/reference";
import { generateDevisPDF } from "@/lib/pdf";
import { sendInternalEmail, sendClientConfirmation } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { service, details, contact, files } = body;

    if (!service || !contact || !contact.name || !contact.email) {
      return NextResponse.json({ error: "Informations manquantes." }, { status: 400 });
    }

    const reference = generateReference();
    const pdfBuffer = generateDevisPDF({ reference, service, details, contact, files: files || [] });

    // Send emails (don't block response)
    Promise.allSettled([
      sendInternalEmail(reference, service, contact.name, pdfBuffer),
      sendClientConfirmation(reference, contact.name, contact.email),
    ]);

    return NextResponse.json({ success: true, reference });
  } catch (error) {
    console.error("Erreur /api/devis:", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
