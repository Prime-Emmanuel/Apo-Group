import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, FileCheck, Search, AlertTriangle, HelpCircle, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Achat de terrain sécurisé au Cameroun – APO GROUP",
  description: "APO GROUP vous accompagne dans l’achat de votre terrain en toute sécurité : vérification documentaire, bornage, transaction sécurisée.",
};

const steps = [
  { title: "1. Étude de votre besoin", desc: "Nous définissons ensemble le type de terrain, la localisation et le budget." },
  { title: "2. Recherche & sélection", desc: "Nous identifions les terrains disponibles correspondant à vos critères." },
  { title: "3. Vérification documentaire", desc: "Nous contrôlons l’authenticité des titres, l’absence d’hypothèques et la situation cadastrale." },
  { title: "4. Bornage & rapport", desc: "Un géomètre intervient pour borner le terrain et établir un rapport topographique." },
  { title: "5. Transaction sécurisée", desc: "Nous sécurisons le paiement et la signature chez le notaire." },
  { title: "6. Suivi post-achat", desc: "Nous restons à vos côtés pour l’obtention du titre foncier définitif." },
];

const mistakes = [
  "Acheter sans vérifier le titre foncier.",
  "Se fier à un simple papier sans bornage.",
  "Ignorer l’étude du Plan d’Occupation des Sols.",
  "Payer la totalité avant la signature notariée.",
  "Négliger l’accompagnement d’un professionnel.",
];

const faq = [
  { q: "Quels documents sont obligatoires pour acheter un terrain ?", r: "Titre foncier, plan cadastral, certificat de situation, note de renseignements, et un rapport de bornage." },
  { q: "Combien de temps prend une procédure complète ?", r: "De 2 à 8 semaines selon la complexité du dossier et la réactivité des administrations." },
  { q: "APO GROUP peut-il m’aider à obtenir un titre foncier ?", r: "Oui, nous vous assistons jusqu’à la délivrance du titre définitif." },
  { q: "Comment savoir si un terrain n’est pas litigieux ?", r: "Nous effectuons une vérification croisée au cadastre, au tribunal et sur le terrain." },
];

export default function ImmobilierPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-24 px-5 md:px-10 max-w-6xl mx-auto text-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-earth-400/10 rounded-full blur-[150px]" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-heading mb-4">
          Achat de terrain{" "}
          <span className="text-earth-400">sécurisé</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Nous vous guidons à chaque étape pour que votre investissement foncier soit une réussite totale, sans mauvaises surprises.
        </p>
        <a
          href="#cta-final"
          className="inline-flex items-center gap-2 px-8 py-4 bg-earth-500 hover:bg-earth-600 text-white rounded-full font-bold uppercase tracking-wider transition-colors"
        >
          Démarrez votre projet
        </a>
      </section>

      {/* ─── À qui s’adresse le service ─── */}
      <section className="py-16 px-5 md:px-10 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
          À qui s’adresse ce service ?
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          Particuliers souhaitant bâtir leur maison, investisseurs immobiliers, expatriés en quête d’un placement sûr au Cameroun.
        </p>
      </section>

      {/* ─── Pourquoi c’est important ─── */}
      <section className="py-16 px-5 md:px-10 max-w-4xl mx-auto">
        <div className="p-8 md:p-12 rounded-3xl bg-earth-500/5 border border-earth-500/20 backdrop-blur-sm">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Pourquoi l’achat d’un terrain est une décision{" "}
            <span className="text-earth-400">capitale</span>
          </h2>
          <p className="text-gray-300">
            Un terrain est un patrimoine durable. Une erreur dans le processus peut entraîner des litiges, des pertes financières et des années de procédure. Notre rôle : vous éviter ces pièges.
          </p>
        </div>
      </section>

      {/* ─── Comment APO GROUP travaille ─── */}
      <section className="py-16 px-5 md:px-10 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold font-heading text-center mb-12">
          Notre méthode{" "}
          <span className="text-earth-400">en 6 étapes</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-earth-500/30 transition-colors"
            >
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Encart : Comment acheter en toute sécurité ─── */}
      <section className="py-16 px-5 md:px-10 max-w-4xl mx-auto">
        <div className="relative p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
          <ShieldCheck className="w-10 h-10 text-earth-400 mx-auto mb-4" />
          <h2 className="text-2xl md:text-4xl font-bold font-heading text-center mb-4">
            Comment acheter un terrain en toute sécurité
          </h2>
          <ul className="space-y-3 text-gray-300 text-sm md:text-base list-disc pl-5">
            <li>Vérifiez toujours le titre foncier (TF) auprès du cadastre.</li>
            <li>Exigez un bornage contradictoire avec les voisins.</li>
            <li>Ne versez jamais la totalité avant la signature notariée.</li>
            <li>Faites-vous accompagner par un professionnel indépendant.</li>
            <li>Consultez le Plan d’Occupation des Sols pour connaître les contraintes.</li>
          </ul>
        </div>
      </section>

      {/* ─── Encart : Pourquoi la vérification documentaire est essentielle ─── */}
      <section className="py-16 px-5 md:px-10 max-w-4xl mx-auto">
        <div className="p-8 md:p-12 rounded-3xl bg-earth-500/5 border border-earth-500/20 backdrop-blur-sm">
          <FileCheck className="w-10 h-10 text-earth-400 mx-auto mb-4" />
          <h2 className="text-2xl md:text-4xl font-bold font-heading text-center mb-4">
            La vérification documentaire : votre bouclier
          </h2>
          <p className="text-gray-300 text-center mb-6">
            Un titre foncier peut être authentique mais grevé d’hypothèques ou de conflits non visibles. Nous contrôlons chaque document pour que vous achetiez en toute sérénité.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400">
            <div className="flex items-start gap-2">
              <Search className="w-5 h-5 mt-0.5 text-earth-400 shrink-0" />
              Vérification du titre foncier au cadastre
            </div>
            <div className="flex items-start gap-2">
              <Search className="w-5 h-5 mt-0.5 text-earth-400 shrink-0" />
              Recherche d’hypothèques et de servitudes
            </div>
            <div className="flex items-start gap-2">
              <Search className="w-5 h-5 mt-0.5 text-earth-400 shrink-0" />
              Analyse du plan cadastral
            </div>
            <div className="flex items-start gap-2">
              <Search className="w-5 h-5 mt-0.5 text-earth-400 shrink-0" />
              Vérification de l’identité du vendeur
            </div>
          </div>
        </div>
      </section>

      {/* ─── Les erreurs à éviter ─── */}
      <section className="py-16 px-5 md:px-10 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold font-heading text-center mb-8">
          Les erreurs à <span className="text-red-400">ne pas commettre</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mistakes.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <span className="text-gray-300 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-16 px-5 md:px-10 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold font-heading text-center mb-8">
          Questions <span className="text-earth-400">fréquentes</span>
        </h2>
        <div className="space-y-4">
          {faq.map((item, idx) => (
            <details key={idx} className="group bg-white/[0.03] border border-white/10 rounded-2xl p-5">
              <summary className="flex justify-between items-center cursor-pointer font-semibold text-white">
                {item.q}
                <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-3 text-gray-400 text-sm leading-relaxed">{item.r}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ─── CTA final WhatsApp ─── */}
      <section id="cta-final" className="py-16 px-5 md:px-10 text-center">
        <h2 className="text-2xl md:text-4xl font-bold font-heading mb-4">
          Prêt à investir en toute sécurité ?
        </h2>
        <p className="text-gray-400 mb-8">
          Discutez directement avec notre expert foncier via WhatsApp.
        </p>
        <a
          href="https://wa.me/237000000000?text=Bonjour%20APO%20GROUP,%20je%20souhaite%20être%20accompagné%20pour%20l'achat%20d'un%20terrain."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold uppercase tracking-wider transition-colors"
        >
          <Phone size={18} /> Ouvrir WhatsApp
        </a>
      </section>

      <Footer />
    </main>
  );
}
