"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Jean-Paul M.",
      role: "Investisseur Immobilier",
      text: "Un service de topographie d'une précision incroyable. L'équipe d'APO GROUP a su sécuriser mon terrain en un temps record. Une confiance absolue.",
    },
    {
      name: "Entreprise S.A.",
      role: "Secteur Industriel",
      text: "Leur expertise en forage industriel nous a sauvé lors de l'expansion de notre usine. Des équipements de pointe et un suivi rigoureux.",
    },
    {
      name: "Marie T.",
      role: "Particulier",
      text: "Du conseil initial jusqu'à l'eau au robinet, l'accompagnement a été parfait. Je recommande vivement pour le forage résidentiel.",
    }
  ];

  return (
    <section className="py-24 md:py-40 bg-transparent relative border-t border-white/5">
      <div className="container mx-auto px-5 md:px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24 flex flex-col items-center"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-brand-yellow"></div>
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-brand-yellow">Confiance</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-brand-yellow"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 font-heading tracking-tight">
            Ils nous font <span className="text-white">Confiance</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="p-8 md:p-10 rounded-[2rem] bg-black/40 backdrop-blur-md border border-white/5 hover:border-white/15 transition-colors relative group shadow-2xl"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-white/5 group-hover:text-water-500/10 transition-colors" />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-brand-yellow text-brand-yellow" />
                ))}
              </div>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 italic">"{testi.text}"</p>
              
              <div className="flex items-center gap-4 border-t border-white/5 pt-6 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-water-500 to-earth-500 flex items-center justify-center font-bold text-white shadow-lg">
                  {testi.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white font-heading text-sm">{testi.name}</h4>
                  <p className="text-xs text-water-400">{testi.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
