"use client";   // <-- indispensable pour les event handlers
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Phone, MapPin, Mail } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden scroll-smooth">
      <Navbar />
      <Hero />

      {/* Pourquoi nous */}
      <WhyChooseUs />

      {/* Services overview – Premium */}
<section id="services" className="py-24 md:py-40 bg-transparent relative">
  <div className="container mx-auto px-5 md:px-6 relative z-10">
    
    {/* Section Title – matching WhyChooseUs style */}
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16 md:mb-24 flex flex-col items-center"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-brand-yellow"></div>
        <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-brand-yellow">Nos Expertises</span>
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-brand-yellow"></div>
      </div>
      
      <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 font-heading tracking-tight leading-tight">
        Des solutions <span className="text-brand-yellow">complètes</span>
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
        Une expertise locale éprouvée dans trois domaines clés pour concrétiser vos projets en toute confiance.
      </p>
    </motion.div>

    {/* Service Cards – premium glass style */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {[
        {
          icon: "💧",
          title: "Forage",
          desc: "Études hydrogéologiques, forage manuel et motorisé, équipement de pompes et analyses d'eau.",
          href: "/forage",
          color: "border-water-500/30 hover:border-water-400 hover:shadow-[0_0_25px_rgba(14,165,233,0.15)]",
          bgGlow: "bg-water-500/5",
        },
        {
          icon: "🗺️",
          title: "Topographie",
          desc: "Bornage, plans topographiques, lotissements et rattachement géodésique de précision.",
          href: "/topographie",
          color: "border-green-500/30 hover:border-green-400 hover:shadow-[0_0_25px_rgba(34,197,94,0.15)]",
          bgGlow: "bg-green-500/5",
        },
        {
          icon: "🏡",
          title: "Immobilier",
          desc: "Achat de terrain sécurisé, vérification documentaire rigoureuse et suivi notarié complet.",
          href: "/immobilier",
          color: "border-earth-500/30 hover:border-earth-400 hover:shadow-[0_0_25px_rgba(249,115,22,0.15)]",
          bgGlow: "bg-earth-500/5",
        },
      ].map((service, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.15, duration: 0.6 }}
          className={`p-8 md:p-10 rounded-[2rem] bg-black/40 backdrop-blur-sm border ${service.color} group shadow-lg flex flex-col items-center text-center`}
        >
          <div className={`w-16 h-16 md:w-18 md:h-18 rounded-2xl ${service.bgGlow} flex items-center justify-center mb-8 text-4xl group-hover:scale-110 transition-transform`}>
            {service.icon}
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-white font-heading">{service.title}</h3>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">{service.desc}</p>
          <Link
            href={service.href}
            className="mt-auto inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/10 transition-colors"
          >
            En savoir plus
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
  
  {/* Divider */}
  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
</section>

      {/* Comment ça marche */}
      <div id="process">
        <Process />
      </div>

      {/* Demande de devis */}
      <section id="devis" className="py-16 px-5 md:px-10 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
          Demander un <span className="text-brand-yellow">devis</span> ou une étude
        </h2>
        <p className="text-gray-400 text-lg mb-8">
          Notre assistant IA est disponible 24/7 pour comprendre votre besoin et vous orienter vers la meilleure solution.
        </p>
        <button
          onClick={() => document.getElementById("assistant-floating-btn")?.click()}
          aria-label="Ouvrir l'assistant IA pour un devis"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-wider hover:scale-105 transition-transform"
        >
          Discuter avec l’assistant
        </button>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-5 md:px-10 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold font-heading mb-8">
          Contactez <span className="text-brand-yellow">APO GROUP</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
          <div className="space-y-4">
            <p className="text-white font-semibold text-lg flex items-center gap-2"><MapPin size={18} /> Adresse</p>
            <p className="text-gray-400">Yaoundé, Cameroun</p>
            <p className="text-white font-semibold text-lg flex items-center gap-2"><Phone size={18} /> Téléphone</p>
            <a href="tel:+237650331995" className="text-gray-400 hover:text-white">+237 6 50 33 19 95</a>
            <p className="text-white font-semibold text-lg flex items-center gap-2"><Mail size={18} /> Email</p>
            <a href="mailto:contact@apogroup.cm" className="text-gray-400 hover:text-white">contact@apogroup.cm</a>
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4">
            <p className="text-white font-semibold text-lg">💬 WhatsApp</p>
            <p className="text-gray-400 text-sm">
              Pour une réponse rapide, échangez directement avec notre équipe.
            </p>
            <a
              href="https://wa.me/237650331995?text=Bonjour%20APO%20GROUP"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold transition-colors"
            >
              <Phone size={18} /> Ouvrir WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
