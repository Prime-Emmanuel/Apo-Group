// src/app/page.tsx
"use client"; // nécessaire pour les animations et l'état du chatbot

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Star, Users, MessageCircle, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

// ----------------------------------------------------------------------
// Petits composants inline pour alléger (TrustBar, Services, Assistant, Contact)
// ----------------------------------------------------------------------

const trustData = [
  { icon: Star, label: "+10 projets", sub: "réalisés au Cameroun" },
  { icon: Users, label: "+10 ans", sub: "d’expertise locale" },
  { icon: ShieldCheck, label: "95%", sub: "clients satisfaits" },
];

const services = [
  {
    title: "Forage",
    desc: "Études hydrogéologiques, forage manuel et motorisé, équipement de pompes.",
    icon: "💧", // on peut utiliser lucide Droplets mais un emoji marche aussi
    href: "/forage",
    color: "text-water-400 border-water-500/30 hover:border-water-400",
  },
  {
    title: "Topographie",
    desc: "Bornage, lotissement, plans topographiques, rattachement géodésique.",
    icon: "🗺️",
    href: "/topographie",
    color: "text-green-400 border-green-500/30 hover:border-green-400",
  },
  {
    title: "Immobilier",
    desc: "Vente de terrains résidentiels, commerciaux et agricoles.",
    icon: "🏡",
    href: "/immobilier",
    color: "text-earth-400 border-earth-500/30 hover:border-earth-400",
  },
];

// ----------------------------------------------------------------------
// Page principale
// ----------------------------------------------------------------------
export default function Home() {
  const [assistantOpen, setAssistantOpen] = useState(false); // pour simuler l’ouverture du chatbot

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* ───── Hero ───── */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-6 pt-28 pb-20 text-center">
        {/* Glows */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-water-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-earth-400/10 rounded-full blur-[150px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-heading tracking-tight mb-4">
            APO <span className="text-brand-yellow">GROUP</span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-6">
            L’excellence au Cameroun en{" "}
            <span className="text-water-400 font-semibold">Forage</span>,{" "}
            <span className="text-green-400 font-semibold">Topographie</span> et{" "}
            <span className="text-earth-400 font-semibold">Immobilier</span>.
          </p>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto mb-8">
            De l’étude de votre terrain à la réalisation de votre projet, nous vous accompagnons avec précision et confiance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#services"
              className="px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-wider hover:scale-105 transition-transform"
            >
              Découvrir nos solutions <ArrowRight className="inline w-4 h-4 ml-2" />
            </Link>
            <button
              onClick={() => {
                setAssistantOpen(true);
                document.getElementById("assistant")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 border border-white/20 text-white rounded-full font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
            >
              Parler à l’assistant IA
            </button>
          </div>
        </motion.div>
      </section>

      {/* ───── Barre de confiance ───── */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {trustData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm"
            >
              <item.icon className="w-8 h-8 mx-auto mb-3 text-brand-yellow" />
              <p className="text-2xl font-bold text-white">{item.label}</p>
              <p className="text-gray-400 text-sm">{item.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───── Pourquoi nous ? (WhyChooseUs) ───── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <WhyChooseUs />
        </div>
      </section>

      {/* ───── Aperçu des services ───── */}
      <section id="services" className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-heading mb-8"
          >
            Nos <span className="text-brand-yellow">expertises</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 rounded-2xl border bg-white/[0.02] backdrop-blur-sm transition-all ${service.color} flex flex-col items-center text-center`}
              >
                <span className="text-4xl mb-3">{service.icon}</span>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{service.desc}</p>
                <Link
                  href={service.href}
                  className="mt-auto inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
                >
                  En savoir plus <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Comment ça marche ? (Process) ───── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Process />
        </div>
      </section>

      {/* ───── Nos réalisations (Gallery) ───── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Gallery />
        </div>
      </section>

      {/* ───── Témoignages (Testimonials) ───── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Testimonials />
        </div>
      </section>

      {/* ───── Assistant IA ───── */}
      <section id="assistant" className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-8 md:p-12 rounded-3xl border transition-all ${
              assistantOpen
                ? "border-brand-yellow/50 bg-brand-yellow/5 shadow-[0_0_30px_rgba(250,204,21,0.1)]"
                : "border-white/10 bg-white/[0.02]"
            }`}
          >
            <MessageCircle className="w-10 h-10 mx-auto mb-4 text-brand-yellow" />
            <h2 className="text-2xl md:text-4xl font-bold font-heading mb-4">
              Un assistant <span className="text-brand-yellow">intelligent</span> à votre service
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mb-6">
              Décrivez votre projet en langage naturel, notre assistant vous oriente vers la solution adaptée en quelques secondes.
            </p>
            {!assistantOpen ? (
              <button
                onClick={() => setAssistantOpen(true)}
                className="px-8 py-4 bg-brand-yellow hover:bg-amber-400 text-black rounded-full font-bold uppercase tracking-wider transition-colors"
              >
                Essayer l’assistant
              </button>
            ) : (
              <div className="text-left bg-black/40 border border-white/10 rounded-2xl p-6 max-w-md mx-auto">
                <p className="text-white font-semibold mb-2">💬 Assistant APO</p>
                <p className="text-gray-400 text-sm">
                  (Le chatbot sera intégré ici prochainement. Vous pouvez déjà nous décrire votre besoin via le bouton WhatsApp ci‑dessous.)
                </p>
                <a
                  href="https://wa.me/237000000000?text=Bonjour%20APO%20GROUP,%20je%20souhaite%20être%20conseillé%20sur%20votre%20service."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-green-400 font-medium text-sm"
                >
                  <Phone size={16} /> Discuter sur WhatsApp
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ───── Contact ───── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-heading mb-8"
          >
            Contactez <span className="text-brand-yellow">APO GROUP</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
            <div className="space-y-4">
              <p className="text-white font-semibold text-lg">📍 Adresse</p>
              <p className="text-gray-400">Yaoundé, Cameroun</p>
              <p className="text-white font-semibold text-lg">📞 Téléphone</p>
              <a href="tel:+237000000000" className="text-gray-400 hover:text-white">+237 6 00 00 00 00</a>
              <p className="text-white font-semibold text-lg">✉️ Email</p>
              <a href="mailto:contact@apogroup.cm" className="text-gray-400 hover:text-white">contact@apogroup.cm</a>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4">
              <p className="text-white font-semibold text-lg">💬 WhatsApp</p>
              <p className="text-gray-400 text-sm">
                Pour une réponse rapide, échangez directement avec notre équipe après avoir décrit votre projet.
              </p>
              <a
                href="https://wa.me/237000000000?text=Bonjour%20APO%20GROUP"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold transition-colors"
              >
                <Phone size={18} /> Ouvrir WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
