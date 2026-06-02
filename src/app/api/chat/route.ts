import { NextRequest, NextResponse } from "next/server";

const APO_SYSTEM_PROMPT = `Tu es l'assistant virtuel d'APO GROUP...`; // (ton prompt habituel)

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Renvoie l'erreur clairement
      return NextResponse.json(
        { message: "Erreur : la variable d'environnement GEMINI_API_KEY est absente.", locked: false },
        { status: 500 }
      );
    }

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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      // Retourne l'erreur brute de Google pour diagnostic
      return NextResponse.json(
        { message: `Erreur Google API (${response.status}): ${errorText}`, locked: false },
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
  } catch (error: any) {
    // Renvoie l'erreur d'exception
    return NextResponse.json(
      { message: `Exception: ${error.message}`, locked: false },
      { status: 500 }
    );
  }
}
