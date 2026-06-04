// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

const APO_SYSTEM_PROMPT = `Tu es l'assistant virtuel d'APO GROUP, une entreprise camerounaise spécialisée dans le forage d'eau, la topographie et l'immobilier (achat de terrain, vérification documentaire, BTP). 
Ton rôle est d'écouter le visiteur, de comprendre son besoin, et de le diriger vers la page appropriée du site ou de lui proposer de parler à un expert humain via WhatsApp si la demande dépasse tes connaissances. 

Voici les services proposés par APO GROUP :
- Forage d'eau : étude hydrogéologique, forage manuel ou motorisé, équipement de pompe, analyse d'eau. Page : https://apo-group.vercel.app/forage
- Topographie : bornage, plan topographique, lotissement, rattachement géodésique. Page : https://apo-group.vercel.app/topographie
- Immobilier : achat de terrain sécurisé, vérification documentaire (titre foncier, hypothèques, cadastre), suivi notarié. Page : https://apo-group.vercel.app/immobilier
- Page principale : https://apo-group.vercel.app/
- Demande de devis : https://apo-group.vercel.app/devis
- Pour une demande de devis ou d'étude, l'utilisateur peut aussi contacter directement WhatsApp au +237 650 33 19 95.

Règles à respecter :
1. Sois poli, professionnel, chaleureux. Réponds en français.
2. Reste strictement dans le cadre des services ci-dessus. Si un visiteur parle d'autre chose (ex: politique, santé, informatique générale, etc.), réponds poliment que tu ne peux traiter que les questions liées aux services d'APO GROUP (forage, topographie, immobilier). Si après un deuxième essai le visiteur persiste hors sujet, réponds avec le message exact : "ASSISTANT_VERROUILLE".
3. Si le visiteur souhaite un devis précis ou une étude personnalisée, propose-lui de cliquer sur le bouton WhatsApp ou de se rendre sur la page de demande. Ne calcule jamais de prix toi-même.
4. Lorsque tu identifies clairement le besoin du visiteur, dirige-le vers la page dédiée en citant le lien.
5. Si le visiteur veut parler à un humain, réponds qu'il peut contacter directement l'équipe APO GROUP via WhatsApp au +237 6 50 33 19 95.
6. Reste concis, ne fais pas de longs discours.
7. Lorsque tu recommandes une page, ajoute [[link:forage]], [[link:topographie]], [[link:immobilier]] ou [[link:devis]] pour créer un bouton cliquable.`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ message: "Clé API Groq manquante.", locked: false }, { status: 500 });
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",   // ← model actif gratuit
      messages: [
        { role: "system", content: APO_SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return NextResponse.json({ message: `Erreur Groq: ${error}`, locked: false }, { status: 500 });
  }

  const data = await response.json();
  const assistantMessage = data.choices[0].message.content;
  const isLocked = assistantMessage.includes("ASSISTANT_VERROUILLE");

  return NextResponse.json({
    message: isLocked
      ? "Je suis désolé, je ne peux traiter que les questions relatives aux services d'APO GROUP (forage, topographie, immobilier). L'assistant est maintenant verrouillé."
      : assistantMessage,
    locked: isLocked,
  });
}
