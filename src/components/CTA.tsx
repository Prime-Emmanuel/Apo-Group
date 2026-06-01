"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 md:py-40 bg-water-600 relative overflow-hidden mt-10">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-5 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-8 text-white font-heading tracking-tight leading-tight drop-shadow-lg">
            Prêt à démarrer <br className="md:hidden" /> votre projet ?
          </h2>
          <p className="text-water-50 text-base md:text-xl mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
            Contactez APO GROUP dès aujourd'hui et bénéficiez d'une expertise premium pour vos besoins en forage, topographie et immobilier.
          </p>
          
          <a 
            href="https://wa.me/237000000000" // Remplacez par le vrai numéro
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-10 py-5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full font-black uppercase tracking-widest text-sm md:text-lg transition-all shadow-[0_0_40px_rgba(37,211,102,0.5)] hover:shadow-[0_0_60px_rgba(37,211,102,0.8)] hover:scale-110"
          >
            <MessageCircle className="w-6 h-6 md:w-8 md:h-8" />
            Contact WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
