import { NextRequest, NextResponse } from "next/server";

const APO_SYSTEM_PROMPT = `Tu es l'assistant virtuel d'APO GROUP...`; // (ton prompt complet, ne change rien)

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY manquante");
      return NextResponse.json(
        { message: "Configuration manquante : clé API Gemini non définie.", locked: false },
        { status: 500 }
      );
    }

    // Construction du corps pour l'API Gemini REST (generateContent)
    // On utilise le modèle "gemini-1.5-flash" (gratuit et fiable)
    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [{ text: APO_SYSTEM_PROMPT }],
        },
        ...messages.map((msg: any) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        })),
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 300,
      },
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erreur API Gemini:", response.status, errorText);
      return NextResponse.json(
        { message: "Erreur de l'assistant IA. Veuillez réessayer plus tard.", locked: false },
        { status: 500 }
      );
    }

    const data = await response.json();
    const assistantMessage =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "Désolé, je n'ai pas compris.";
    const isLocked = assistantMessage.includes("ASSISTANT_VERROUILLE");

    return NextResponse.json({
      message: isLocked
        ? "Je suis désolé, je ne peux traiter que les questions relatives aux services d'APO GROUP (forage, topographie, immobilier). L'assistant est maintenant verrouillé."
        : assistantMessage,
      locked: isLocked,
    });
  } catch (error) {
    console.error("Erreur API chat:", error);
    return NextResponse.json(
      { message: "Une erreur est survenue. Veuillez réessayer.", locked: false },
      { status: 500 }
    );
  }
}
