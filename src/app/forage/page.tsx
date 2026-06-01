import type { Metadata } from "next";
import Link from "next/link";
import { Droplets, ArrowRight, FileSearch, CheckCircle, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Forage d'eau au Cameroun – APO GROUP",
  description: "Étude hydrogéologique, forage, équipement et suivi. Une solution clé en main pour vos besoins en eau.",
};

const prestations = [
  { title: "Étude hydrogéologique", desc: "Analyse du sous-sol pour localiser la nappe phréatique et évaluer la faisabilité." },
  { title: "Forage manuel", desc: "Idéal pour les terrains accessibles et les faibles profondeurs." },
  { title: "Forage motorisé", desc: "Pour les grandes profondeurs ou les terrains difficiles, avec matériel puissant." },
  { title: "Équipement & pompe", desc: "Installation de la pompe adaptée et des équipements de surface." },
  { title: "Analyse de l'eau", desc: "Contrôle qualité pour garantir une eau potable conforme." },
  { title: "Suivi & maintenance", desc: "Contrats d’entretien pour la pérennité de votre installation." },
];

const faq = [
  { q: "Quelle profondeur faut-il atteindre ?", r: "Cela dépend de la géologie de votre terrain. Notre étude préalable détermine la profondeur nécessaire." },
  { q: "Combien de temps dure un forage ?", r: "De 2 à 7 jours selon la profondeur et la nature du sol." },
  { q: "Faut-il un permis pour forer ?", r: "Nous vous accompagnons dans les démarches administratives." },
];

export default function ForagePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-5 md:px-10 max-w-6xl mx-auto text-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-water-500/10 rounded-full blur-[120px]" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black font-heading mb-4">
          Forage d'eau <span className="text-water-400">au Cameroun</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          De l'étude à l'installation, nous sécurisons votre accès à l'eau avec une expertise locale éprouvée.
        </p>
        <Link
          href="/demande?service=forage"
          className="inline-flex items-center gap-2 px-8 py-4 bg-water-500 hover:bg-water-600 text-white rounded-full font-bold uppercase tracking-wider transition-colors"
        >
          Démarrez votre projet <ArrowRight size={18} />
        </Link>
      </section>

      {/* Pourquoi c'est important */}
      <section className="py-16 px-5 md:px-10 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
          Pourquoi un forage <span className="text-water-400">fiable</span> est crucial
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          L’accès à l’eau potable est un enjeu quotidien pour les habitations, les exploitations agricoles et les industries. Un forage bien conçu garantit une eau de qualité, en quantité suffisante, et une installation durable.
        </p>
      </section>

      {/* Prestations détaillées */}
      <section className="py-16 px-5 md:px-10 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
          Nos prestations <span className="text-water-400">complètes</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prestations.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-water-500/30 transition-colors"
            >
              <Droplets className="w-8 h-8 text-water-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bloc étude préalable (qualification) */}
      <section className="py-16 px-5 md:px-10 max-w-4xl mx-auto">
        <div className="relative p-8 md:p-12 rounded-3xl bg-water-500/5 border border-water-500/20 backdrop-blur-xl text-center">
          <FileSearch className="w-10 h-10 text-water-400 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4">
            Une étude préalable est <span className="text-water-400">indispensable</span>
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Avant tout devis, notre équipe réalise une étude hydrogéologique pour déterminer la faisabilité technique, la profondeur nécessaire et le type de forage adapté à votre terrain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demande?service=forage&step=etude"
              className="px-6 py-3 bg-white/10 border border-white/20 hover:bg-white/20 text-white rounded-full font-semibold transition-colors"
            >
              Je n’ai pas encore d’étude
            </Link>
            <Link
              href="/demande?service=forage&step=devis"
              className="px-6 py-3 bg-water-500 hover:bg-water-600 text-white rounded-full font-semibold transition-colors"
            >
              J’ai déjà une étude
            </Link>
          </div>
        </div>
      </section>

      {/* Galerie / Réalisations (simplifiée) */}
      <section className="py-16 px-5 md:px-10 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-8">
          Nos réalisations <span className="text-water-400">récentes</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Placeholders : à remplacer par tes vraies photos */}
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="aspect-square rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 text-sm">
              Photo projet {i}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-5 md:px-10 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-8">
          Questions <span className="text-water-400">fréquentes</span>
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

      {/* CTA final */}
      <section className="py-16 px-5 md:px-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4">
          Prêt à concrétiser votre projet ?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/demande?service=forage&step=etude"
            className="px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-wider hover:scale-105 transition-transform"
          >
            Demander une étude
          </Link>
          <Link
            href="/demande?service=forage&step=devis"
            className="px-8 py-4 border border-water-500 text-water-400 rounded-full font-bold uppercase tracking-wider hover:bg-water-500/10 transition-colors"
          >
            Obtenir un devis
          </Link>
        </div>
      </section>
    </main>
  );
}
