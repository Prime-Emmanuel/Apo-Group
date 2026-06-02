// src/app/topographie/page.tsx
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Map, FileSearch, ShieldCheck, AlertTriangle, HelpCircle, Phone, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [ /* données inchangées */ ];
const mistakes = [ /* données inchangées */ ];
const faq = [ /* données inchangées */ ];

export default function TopographiePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const clipPath = useTransform(scrollYProgress, [0, 1], ["inset(0% 0% 0% 0%)", "inset(0% 50% 0% 50%)"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero avec effet de découpage */}
      <section ref={heroRef} className="relative pt-32 pb-24 px-5 md:px-10 max-w-6xl mx-auto text-center overflow-hidden">
        <motion.div className="absolute inset-0 -z-10" style={{ clipPath, opacity }}>
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-[120px]" />
        </motion.div>

        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-md mb-6"
        >
          <Map className="w-4 h-4 text-green-400" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-green-400">Précision & rigueur</span>
        </motion.div>

        <motion.h1
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl font-black font-heading mb-4"
        >
          Topographie{" "}
          <span className="text-green-400">au Cameroun</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8"
        >
          Bornage, plans topographiques, lotissements. Nous posons les bases solides de votre projet.
        </motion.p>

        <motion.a
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7 }}
          style={{ transformOrigin: "left" }}
          href="#cta-final"
          className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold uppercase tracking-wider transition-colors"
        >
          Démarrez votre projet <ArrowRight size={18} />
        </motion.a>
      </section>

      {/* Sections avec apparition latérale */}
      <motion.section
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-16 px-5 md:px-10 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">À qui s’adresse ce service ?</h2>
        <p className="text-gray-300 text-lg leading-relaxed">Propriétaires fonciers, promoteurs immobiliers, architectes...</p>
      </motion.section>

      {/* Pourquoi – animation de grille */}
      <motion.section
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="py-16 px-5 md:px-10 max-w-4xl mx-auto"
      >
        <div className="p-8 md:p-12 rounded-3xl bg-green-500/5 border border-green-500/20 backdrop-blur-sm">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Pourquoi la topographie est la <span className="text-green-400">première pierre</span></h2>
          <p className="text-gray-300">Un relevé topographique précis évite les litiges...</p>
        </div>
      </motion.section>

      {/* Étapes – animation de ligne qui se déroule */}
      <section className="py-16 px-5 md:px-10 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold font-heading text-center mb-12">Notre méthode <span className="text-green-400">en 6 étapes</span></h2>
        <div className="relative">
          {/* Ligne verticale décorative sur desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-green-500/50 to-transparent" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                whileInView={{ clipPath: "inset(0 0 0% 0)" }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-green-500/30 transition-colors"
              >
                <Map className="w-8 h-8 text-green-400 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents – apparition en éventail */}
      <section className="py-16 px-5 md:px-10 max-w-4xl mx-auto">
        <div className="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
          <FileSearch className="w-10 h-10 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl md:text-4xl font-bold font-heading text-center mb-6">Documents & vérifications essentiels</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400">
            {[
              "Titre foncier ou titre de propriété",
              "Plan cadastral existant",
              "Pièce d’identité du demandeur",
              "Procuration si mandataire"
            ].map((doc, idx) => (
              <motion.div
                key={idx}
                initial={{ rotateY: 90 }}
                whileInView={{ rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="flex items-start gap-2"
              >
                <ShieldCheck className="w-5 h-5 mt-0.5 text-green-400 shrink-0" />
                {doc}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Erreurs – scale alterné */}
      <section className="py-16 px-5 md:px-10 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold font-heading text-center mb-8">Les erreurs à <span className="text-red-400">ne pas commettre</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mistakes.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: "spring" }}
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
        <h2 className="text-3xl md:text-5xl font-bold font-heading text-center mb-8">Questions <span className="text-green-400">fréquentes</span></h2>
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
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 px-5 md:px-10 text-center"
      >
        <h2 className="text-2xl md:text-4xl font-bold font-heading mb-4">Prêt à sécuriser votre terrain ?</h2>
        <p className="text-gray-400 mb-8">Discutez directement avec notre géomètre expert via WhatsApp.</p>
        <a href="https://wa.me/237000000000?text=Bonjour%20APO%20GROUP,%20je%20souhaite%20un%20renseignement%20pour%20un%20projet%20de%20topographie." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold uppercase tracking-wider transition-colors">
          <Phone size={18} /> Ouvrir WhatsApp
        </a>
      </motion.section>

      <Footer />
    </main>
  );
}
