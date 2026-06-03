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

      {/* Services overview */}
      <section id="services" className="py-16 px-5 md:px-10 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold font-heading mb-8">
          Nos <span className="text-brand-yellow">expertises</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-water-500/30 transition-colors">
            <span className="text-4xl mb-3 block">💧</span>
            <h3 className="text-xl font-bold text-white mb-2">Forage</h3>
            <p className="text-gray-400 text-sm mb-4">
              Études hydrogéologiques, forage manuel & motorisé, équipement de pompes.
            </p>
            <Link
              href="/forage"
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
            >
              En savoir plus
            </Link>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-green-500/30 transition-colors">
            <span className="text-4xl mb-3 block">🗺️</span>
            <h3 className="text-xl font-bold text-white mb-2">Topographie</h3>
            <p className="text-gray-400 text-sm mb-4">
              Bornage, plans topographiques, lotissements, rattachement géodésique.
            </p>
            <Link
              href="/topographie"
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
            >
              En savoir plus
            </Link>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-earth-500/30 transition-colors">
            <span className="text-4xl mb-3 block">🏡</span>
            <h3 className="text-xl font-bold text-white mb-2">Immobilier</h3>
            <p className="text-gray-400 text-sm mb-4">
              Achat de terrain sécurisé, vérification documentaire, suivi notarié.
            </p>
            <Link
              href="/immobilier"
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
            >
              En savoir plus
            </Link>
          </div>
        </div>
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
