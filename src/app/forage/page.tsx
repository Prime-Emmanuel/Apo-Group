// src/app/forage/page.tsx
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Droplets, FileSearch, ShieldCheck, AlertTriangle, HelpCircle, Phone, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [ /* données inchangées */ ];
const mistakes = [ /* données inchangées */ ];
const faq = [ /* données inchangées */ ];

// Composant réutilisable pour les révélations avec effet "eau"
function WaterReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function ForagePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero avec parallaxe fluide */}
      <section ref={heroRef} className="relative pt-32 pb-24 px-5 md:px-10 max-w-6xl mx-auto text-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-water-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-water-400/10 rounded-full blur-[120px]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-water-500/10 border border-water-500/20 backdrop-blur-md mb-6"
        >
          <Droplets className="w-4 h-4 text-water-400" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-water-400">Accès à l’eau</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-black font-heading mb-4"
        >
          Forage d’eau{" "}
          <span className="text-water-400">au Cameroun</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8"
        >
          De l’étude à l’installation, nous sécurisons votre accès à l’eau avec une expertise locale éprouvée.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          href="#cta-final"
          className="inline-flex items-center gap-2 px-8 py-4 bg-water-500 hover:bg-water-600 text-white rounded-full font-bold uppercase tracking-wider transition-colors"
        >
          Démarrez votre projet <ArrowRight size={18} />
        </motion.a>
      </section>

      {/* À qui s’adresse le service */}
      <WaterReveal>
        <section className="py-16 px-5 md:px-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">À qui s’adresse ce service ?</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Ménages, exploitations agricoles, industries, hôtels, communautés. Toute structure ayant besoin d’un accès fiable et durable à l’eau.
          </p>
        </section>
      </WaterReveal>

      {/* Pourquoi */}
      <WaterReveal delay={0.1}>
        <section className="py-16 px-5 md:px-10 max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-3xl bg-water-500/5 border border-water-500/20 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Pourquoi un forage <span className="text-water-400">réussi</span> change tout
            </h2>
            <p className="text-gray-300">L’eau est une ressource vitale. Un forage bien conçu garantit une eau de qualité...</p>
          </div>
        </section>
      </WaterReveal>

      {/* Étapes – cascade avec décalage */}
      <section className="py-16 px-5 md:px-10 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold font-heading text-center mb-12">Notre méthode <span className="text-water-400">en 6 étapes</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -5, borderColor: "rgba(14,165,233,0.4)", boxShadow: "0 0 25px rgba(14,165,233,0.15)" }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm transition-colors"
            >
              <Droplets className="w-8 h-8 text-water-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bloc étude préalable avec vague animée */}
      <WaterReveal delay={0.2}>
        <section className="py-16 px-5 md:px-10 max-w-4xl mx-auto">
          <div className="relative p-8 md:p-12 rounded-3xl bg-water-500/5 border border-water-500/20 backdrop-blur-sm text-center overflow-hidden">
            <motion.div
              animate={{ x: [0, -10, 0], opacity: [0.2, 0.4, 0.2] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-20 -left-20 w-40 h-40 bg-water-400 rounded-full blur-3xl opacity-20"
            />
            <FileSearch className="w-10 h-10 text-water-400 mx-auto mb-4 relative z-10" />
            <h2 className="text-2xl md:text-4xl font-bold font-heading mb-4 relative z-10">
              L’étude préalable : votre <span className="text-water-400">garantie</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-6 relative z-10">Avant tout forage, nous réalisons une étude hydrogéologique...</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <a href="#cta-final" className="px-6 py-3 bg-water-500 hover:bg-water-600 text-white rounded-full font-semibold transition-colors">Demander une étude</a>
              <a href="#cta-final" className="px-6 py-3 border border-water-500 text-water-400 rounded-full font-semibold hover:bg-water-500/10 transition-colors">J’ai déjà une étude</a>
            </div>
          </div>
        </section>
      </WaterReveal>

      {/* Documents */}
      <WaterReveal delay={0.3}>
        <section className="py-16 px-5 md:px-10 max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
            <FileSearch className="w-10 h-10 text-water-400 mx-auto mb-4" />
            <h2 className="text-2xl md:text-4xl font-bold font-heading text-center mb-6">Documents & vérifications essentiels</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400">
              <div className="flex items-start gap-2"><ShieldCheck className="w-5 h-5 mt-0.5 text-water-400 shrink-0" /> Rapport d’étude hydrogéologique</div>
              <div className="flex items-start gap-2"><ShieldCheck className="w-5 h-5 mt-0.5 text-water-400 shrink-0" /> Permis de forage (si requis)</div>
              <div className="flex items-start gap-2"><ShieldCheck className="w-5 h-5 mt-0.5 text-water-400 shrink-0" /> Devis détaillé signé</div>
              <div className="flex items-start gap-2"><ShieldCheck className="w-5 h-5 mt-0.5 text-water-400 shrink-0" /> Rapport d’analyse d’eau</div>
            </div>
          </div>
        </section>
      </WaterReveal>

      {/* Erreurs – apparition alternée */}
      <section className="py-16 px-5 md:px-10 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold font-heading text-center mb-8">Les erreurs à <span className="text-red-400">ne pas commettre</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mistakes.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
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

      {/* FAQ avec ouverture animée */}
      <section className="py-16 px-5 md:px-10 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold font-heading text-center mb-8">Questions <span className="text-water-400">fréquentes</span></h2>
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

      {/* CTA final avec animation scale */}
      <motion.section
        id="cta-final"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="py-16 px-5 md:px-10 text-center"
      >
        <h2 className="text-2xl md:text-4xl font-bold font-heading mb-4">Prêt à sécuriser votre accès à l’eau ?</h2>
        <p className="text-gray-400 mb-8">Discutez directement avec notre expert forage via WhatsApp.</p>
        <a href="https://wa.me/237000000000?text=Bonjour%20APO%20GROUP,%20je%20souhaite%20un%20renseignement%20pour%20un%20projet%20de%20forage." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold uppercase tracking-wider transition-colors">
          <Phone size={18} /> Ouvrir WhatsApp
        </a>
      </motion.section>

      <Footer />
    </main>
  );
}
