import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const APO_SYSTEM_PROMPT = `Tu es l'assistant virtuel d'APO GROUP, une entreprise camerounaise spécialisée dans le forage d'eau, la topographie et l'immobilier (achat de terrain, vérification documentaire, BTP). 
Ton rôle est d'écouter le visiteur, de comprendre son besoin, et de le diriger vers la page appropriée du site ou de lui proposer de parler à un expert humain via WhatsApp si la demande dépasse tes connaissances. 

Voici les services proposés par APO GROUP :
- Forage d'eau : étude hydrogéologique, forage manuel ou motorisé, équipement de pompe, analyse d'eau. Page : https://apo-group.vercel.app/forage
- Topographie : bornage, plan topographique, lotissement, rattachement géodésique. Page : https://apo-group.vercel.app/topographie
- Immobilier : achat de terrain sécurisé, vérification documentaire (titre foncier, hypothèques, cadastre), suivi notarié. Page : https://apo-group.vercel.app/immobilier
- Page principale : https://apo-group.vercel.app/
- Pour une demande de devis ou d'étude, l'utilisateur peut aussi contacter directement WhatsApp au +237 650 33 19 95.

Règles à respecter :
1. Sois poli, professionnel, chaleureux. Réponds en français.
2. Reste strictement dans le cadre des services ci-dessus. Si un visiteur parle d'autre chose (ex: politique, santé, informatique générale, etc.), réponds poliment que tu ne peux traiter que les questions liées aux services d'APO GROUP (forage, topographie, immobilier). Si après un deuxième essai le visiteur persiste hors sujet, réponds avec le message exact : "ASSISTANT_VERROUILLE".
3. Si le visiteur souhaite un devis précis ou une étude personnalisée, propose-lui de cliquer sur le bouton WhatsApp ou de se rendre sur la page de demande. Ne calcule jamais de prix toi-même.
4. Lorsque tu identifies clairement le besoin du visiteur, dirige-le vers la page dédiée en citant le lien.
5. Si le visiteur veut parler à un humain, réponds qu'il peut contacter directement l'équipe APO GROUP via WhatsApp au +237 6 50 33 19 95.
6. Reste concis, ne fais pas de longs discours.`;

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

    // Initialiser le modèle Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Construire l'historique pour le chat (Gemini attend un tableau de contenus)
    const history = messages.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // Ajouter le prompt système comme premier message "user" ou via systemInstruction
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: APO_SYSTEM_PROMPT }],
        },
        {
          role: "model",
          parts: [{ text: "Compris. Je suis prêt à aider." }],
        },
        ...history,
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 300,
      },
    });

    const result = await chat.sendMessage(history[history.length - 1]?.parts[0].text);
    const responseText = result.response.text();
    const isLocked = responseText.includes("ASSISTANT_VERROUILLE");

    return NextResponse.json({
      message: isLocked
        ? "Je suis désolé, je ne peux traiter que les questions relatives aux services d'APO GROUP (forage, topographie, immobilier). L'assistant est maintenant verrouillé."
        : responseText,
      locked: isLocked,
    });
  } catch (error) {
    console.error("Erreur API chat Gemini:", error);
    return NextResponse.json(
      { message: "Une erreur est survenue. Veuillez réessayer.", locked: false },
      { status: 500 }
    );
  }
}
