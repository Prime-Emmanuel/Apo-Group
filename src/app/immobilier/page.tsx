// src/app/immobilier/page.tsx
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, FileCheck, Search, AlertTriangle, HelpCircle, Phone, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [ /* données inchangées */ ];
const mistakes = [ /* données inchangées */ ];
const faq = [ /* données inchangées */ ];

export default function ImmobilierPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  const shadow = useTransform(scrollYProgress, [0, 0.5], ["0 0 0 rgba(0,0,0,0)", "0 20px 50px rgba(0,0,0,0.3)"]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero – zoom avant solide */}
      <section ref={heroRef} className="relative pt-32 pb-24 px-5 md:px-10 max-w-6xl mx-auto text-center overflow-hidden">
        <motion.div style={{ scale, boxShadow: shadow }} className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-earth-400/10 rounded-full blur-[150px]" />
        </motion.div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-earth-500/10 border border-earth-500/20 backdrop-blur-md mb-6"
        >
          <ShieldCheck className="w-4 h-4 text-earth-400" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-earth-400">Investissement sécurisé</span>
        </motion.div>

        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="text-4xl sm:text-5xl md:text-7xl font-black font-heading mb-4"
        >
          Achat de terrain{" "}
          <span className="text-earth-400">sécurisé</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8"
        >
          Nous vous guidons à chaque étape pour que votre investissement foncier soit une réussite totale.
        </motion.p>

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#cta-final"
          className="inline-flex items-center gap-2 px-8 py-4 bg-earth-500 hover:bg-earth-600 text-white rounded-full font-bold uppercase tracking-wider transition-colors"
        >
          Démarrez votre projet <ArrowRight size={18} />
        </motion.a>
      </section>

      {/* Sections avec animation d’élévation */}
      <motion.section
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 px-5 md:px-10 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">À qui s’adresse ce service ?</h2>
        <p className="text-gray-300 text-lg leading-relaxed">Particuliers, investisseurs, expatriés...</p>
      </motion.section>

      <motion.section
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="py-16 px-5 md:px-10 max-w-4xl mx-auto"
      >
        <div className="p-8 md:p-12 rounded-3xl bg-earth-500/5 border border-earth-500/20 backdrop-blur-sm">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Pourquoi l’achat d’un terrain est une décision <span className="text-earth-400">capitale</span></h2>
          <p className="text-gray-300">Un terrain est un patrimoine durable...</p>
        </div>
      </motion.section>

      {/* Étapes – cartes avec ombre dynamique */}
      <section className="py-16 px-5 md:px-10 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold font-heading text-center mb-12">Notre méthode <span className="text-earth-400">en 6 étapes</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 80 }}
              whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(249,115,22,0.15)" }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm transition-shadow"
            >
              <ShieldCheck className="w-8 h-8 text-earth-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Encarts sécurisés avec effet de verrouillage */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="py-16 px-5 md:px-10 max-w-4xl mx-auto"
      >
        <div className="relative p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
          <ShieldCheck className="w-10 h-10 text-earth-400 mx-auto mb-4" />
          <h2 className="text-2xl md:text-4xl font-bold font-heading text-center mb-4">Comment acheter un terrain en toute sécurité</h2>
          <ul className="space-y-3 text-gray-300 text-sm md:text-base list-disc pl-5">
            <li>Vérifiez toujours le titre foncier (TF) auprès du cadastre.</li>
            <li>Exigez un bornage contradictoire avec les voisins.</li>
            <li>Ne versez jamais la totalité avant la signature notariée.</li>
            <li>Faites-vous accompagner par un professionnel indépendant.</li>
            <li>Consultez le Plan d’Occupation des Sols pour connaître les contraintes.</li>
          </ul>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="py-16 px-5 md:px-10 max-w-4xl mx-auto"
      >
        <div className="p-8 md:p-12 rounded-3xl bg-earth-500/5 border border-earth-500/20 backdrop-blur-sm">
          <FileCheck className="w-10 h-10 text-earth-400 mx-auto mb-4" />
          <h2 className="text-2xl md:text-4xl font-bold font-heading text-center mb-4">La vérification documentaire : votre bouclier</h2>
          <p className="text-gray-300 text-center mb-6">Un titre foncier peut être authentique mais grevé d’hypothèques...</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400">
            <div className="flex items-start gap-2"><Search className="w-5 h-5 mt-0.5 text-earth-400 shrink-0" /> Vérification du titre foncier</div>
            <div className="flex items-start gap-2"><Search className="w-5 h-5 mt-0.5 text-earth-400 shrink-0" /> Recherche d’hypothèques</div>
            <div className="flex items-start gap-2"><Search className="w-5 h-5 mt-0.5 text-earth-400 shrink-0" /> Analyse du plan cadastral</div>
            <div className="flex items-start gap-2"><Search className="w-5 h-5 mt-0.5 text-earth-400 shrink-0" /> Vérification de l’identité du vendeur</div>
          </div>
        </div>
      </motion.section>

      {/* Erreurs */}
      <section className="py-16 px-5 md:px-10 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold font-heading text-center mb-8">Les erreurs à <span className="text-red-400">ne pas commettre</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mistakes.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ rotate: -5, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/10"
            >
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <span className="text-gray-300 text-sm">{item}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-5 md:px-10 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold font-heading text-center mb-8">Questions <span className="text-earth-400">fréquentes</span></h2>
        <div className="space-y-4">
          {faq.map((item, idx) => (
            <motion.details
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white/[0.03] border border-white/10 rounded-2xl p-5"
            >
              <summary className="flex justify-between items-center cursor-pointer font-semibold text-white">
                {item.q}
                <HelpCircle className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-3 text-gray-400 text-sm leading-relaxed">{item.r}</p>
            </motion.details>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <motion.section
        id="cta-final"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-16 px-5 md:px-10 text-center"
      >
        <h2 className="text-2xl md:text-4xl font-bold font-heading mb-4">Prêt à investir en toute sécurité ?</h2>
        <p className="text-gray-400 mb-8">Discutez directement avec notre expert foncier via WhatsApp.</p>
        <a href="https://wa.me/237000000000?text=Bonjour%20APO%20GROUP,%20je%20souhaite%20être%20accompagné%20pour%20l'achat%20d'un%20terrain." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold uppercase tracking-wider transition-colors">
          <Phone size={18} /> Ouvrir WhatsApp
        </a>
      </motion.section>

      <Footer />
    </main>
  );
}
