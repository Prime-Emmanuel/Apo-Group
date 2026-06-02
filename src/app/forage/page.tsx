import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Droplets, FileSearch, ShieldCheck, AlertTriangle, HelpCircle, Phone, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Forage d'eau au Cameroun – APO GROUP",
  description: "Étude hydrogéologique, forage, équipement et suivi. Une solution clé en main pour votre accès à l'eau.",
};

const steps = [
  {
    title: "1. Étude hydrogéologique",
    desc: "Analyse du sous-sol, identification de la nappe phréatique et faisabilité technique.",
  },
  {
    title: "2. Choix de la technique",
    desc: "Forage manuel ou motorisé selon la profondeur et la nature du terrain.",
  },
  {
    title: "3. Foration & tubage",
    desc: "Réalisation du forage, mise en place des tubes et massif filtrant.",
  },
  {
    title: "4. Équipement de surface",
    desc: "Installation de la pompe, du réservoir et des raccordements nécessaires.",
  },
  {
    title: "5. Analyse de l’eau",
    desc: "Contrôle qualité complet pour garantir une eau potable.",
  },
  {
    title: "6. Suivi & maintenance",
    desc: "Contrats d’entretien pour la pérennité de votre installation.",
  },
];

const mistakes = [
  "Forer sans étude géophysique préalable.",
  "Choisir un prestataire non certifié.",
  "Négliger l’analyse de l’eau après forage.",
  "Sous-dimensionner la pompe par rapport au besoin.",
  "Ignorer les démarches administratives (permis).",
];

const faq = [
  {
    q: "Quelle profondeur faut-il atteindre ?",
    r: "Cela dépend de la géologie locale. Notre étude préalable détermine la profondeur exacte à forer.",
  },
  {
    q: "Quel est le délai pour un forage complet ?",
    r: "De 3 à 10 jours selon la profondeur, le type de sol et la logistique.",
  },
  {
    q: "Faut-il un permis pour forer ?",
    r: "Oui, dans la plupart des cas. Nous vous accompagnons dans l’obtention du permis de forage.",
  },
  {
    q: "L’eau est-elle garantie ?",
    r: "Notre étude préalable minimise les risques. En cas de débit insuffisant, nous proposons des solutions alternatives.",
  },
];

export default function ForagePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-24 px-5 md:px-10 max-w-6xl mx-auto text-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-water-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-water-400/10 rounded-full blur-[120px]" />
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-water-500/10 border border-water-500/20 backdrop-blur-md mb-6">
          <Droplets className="w-4 h-4 text-water-400" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-water-400">
            Accès à l’eau
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-heading mb-4">
          Forage d’eau{" "}
          <span className="text-water-400">au Cameroun</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          De l’étude à l’installation, nous sécurisons votre accès à l’eau avec une expertise locale éprouvée.
        </p>
        <a
          href="#cta-final"
          className="inline-flex items-center gap-2 px-8 py-4 bg-water-500 hover:bg-water-600 text-white rounded-full font-bold uppercase tracking-wider transition-colors"
        >
          Démarrez votre projet <ArrowRight size={18} />
        </a>
      </section>

      {/* ─── À qui s’adresse le service ─── */}
      <section className="py-16 px-5 md:px-10 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
          À qui s’adresse ce service ?
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          Ménages, exploitations agricoles, industries, hôtels, communautés. Toute structure ayant besoin d’un accès fiable et durable à l’eau.
        </p>
      </section>

      {/* ─── Pourquoi c’est important ─── */}
      <section className="py-16 px-5 md:px-10 max-w-4xl mx-auto">
        <div className="p-8 md:p-12 rounded-3xl bg-water-500/5 border border-water-500/20 backdrop-blur-sm">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Pourquoi un forage <span className="text-water-400">réussi</span> change tout
          </h2>
          <p className="text-gray-300">
            L’eau est une ressource vitale. Un forage bien conçu garantit une eau de qualité, en quantité suffisante, et une installation durable qui valorise votre patrimoine.
          </p>
        </div>
      </section>

      {/* ─── Notre méthode en 6 étapes ─── */}
      <section className="py-16 px-5 md:px-10 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold font-heading text-center mb-12">
          Notre méthode{" "}
          <span className="text-water-400">en 6 étapes</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-water-500/30 transition-colors"
            >
              <Droplets className="w-8 h-8 text-water-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Encart : L’étude préalable ─── */}
      <section className="py-16 px-5 md:px-10 max-w-4xl mx-auto">
        <div className="relative p-8 md:p-12 rounded-3xl bg-water-500/5 border border-water-500/20 backdrop-blur-sm text-center">
          <FileSearch className="w-10 h-10 text-water-400 mx-auto mb-4" />
          <h2 className="text-2xl md:text-4xl font-bold font-heading mb-4">
            L’étude préalable : votre <span className="text-water-400">garantie</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Avant tout forage, nous réalisons une étude hydrogéologique pour déterminer la profondeur de la nappe, le débit estimé et la technique la mieux adaptée. Sans cette étape, vous risquez un forage sec ou inexploitable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#cta-final"
              className="px-6 py-3 bg-water-500 hover:bg-water-600 text-white rounded-full font-semibold transition-colors"
            >
              Demander une étude
            </a>
            <a
              href="#cta-final"
              className="px-6 py-3 border border-water-500 text-water-400 rounded-full font-semibold hover:bg-water-500/10 transition-colors"
            >
              J’ai déjà une étude
            </a>
          </div>
        </div>
      </section>

      {/* ─── Encart : Documents à vérifier ─── */}
      <section className="py-16 px-5 md:px-10 max-w-4xl mx-auto">
        <div className="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
          <FileSearch className="w-10 h-10 text-water-400 mx-auto mb-4" />
          <h2 className="text-2xl md:text-4xl font-bold font-heading text-center mb-6">
            Documents & vérifications essentiels
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400">
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 mt-0.5 text-water-400 shrink-0" />
              Rapport d’étude hydrogéologique
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 mt-0.5 text-water-400 shrink-0" />
              Permis de forage (si requis)
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 mt-0.5 text-water-400 shrink-0" />
              Devis détaillé signé
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 mt-0.5 text-water-400 shrink-0" />
              Rapport d’analyse d’eau
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
            <div
              key={idx}
              className="flex items-start gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/10"
            >
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <span className="text-gray-300 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-16 px-5 md:px-10 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold font-heading text-center mb-8">
          Questions <span className="text-water-400">fréquentes</span>
        </h2>
        <div className="space-y-4">
          {faq.map((item, idx) => (
            <details
              key={idx}
              className="group bg-white/[0.03] border border-white/10 rounded-2xl p-5"
            >
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
          Prêt à sécuriser votre accès à l’eau ?
        </h2>
        <p className="text-gray-400 mb-8">
          Discutez directement avec notre expert forage via WhatsApp.
        </p>
        <a
          href="https://wa.me/237000000000?text=Bonjour%20APO%20GROUP,%20je%20souhaite%20un%20renseignement%20pour%20un%20projet%20de%20forage."
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
