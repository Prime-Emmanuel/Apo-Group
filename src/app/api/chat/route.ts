import { NextRequest, NextResponse } from "next/server";

const APO_SYSTEM_PROMPT = `Tu es l'assistant virtuel d'APO GROUP...`; // (ton prompt)

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("OPENAI_API_KEY is not defined");
      return NextResponse.json(
        { message: "Configuration manquante : la clé API OpenAI n'est pas définie sur le serveur.", locked: false },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: APO_SYSTEM_PROMPT },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", response.status, errorText);
      return NextResponse.json(
        { message: "Erreur de l'assistant IA. Veuillez réessayer plus tard.", locked: false },
        { status: 500 }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content || "Désolé, je n'ai pas compris.";
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
