import { NextResponse } from "next/server";
import { sendTestEmail } from "@/lib/email";

export async function GET() {
  const result = await sendTestEmail();
  if (!result.success) {
    return NextResponse.json({ error: "Échec de l'envoi" }, { status: 500 });
  }
  return NextResponse.json({ message: "Email envoyé avec succès à apogroupsarl@gmail.com" });
}
