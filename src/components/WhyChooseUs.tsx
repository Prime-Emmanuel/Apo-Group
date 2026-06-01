"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Cog, Users } from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: ShieldCheck,
      title: "Expertise Reconnue",
      desc: "Des années d'expérience et un savoir-faire inégalé au Cameroun.",
    },
    {
      icon: Zap,
      title: "Intervention Rapide",
      desc: "Une équipe toujours prête à déployer des solutions en un temps record.",
    },
    {
      icon: Cog,
      title: "Équipements Modernes",
      desc: "L'utilisation de la dernière technologie pour garantir précision et fiabilité.",
    },
    {
      icon: Users,
      title: "Accompagnement",
      desc: "Un suivi de A à Z, du conseil initial jusqu'à la livraison finale.",
    },
  ];

  return (
    <section id="pourquoi-nous" className="py-24 md:py-40 bg-transparent relative">
      <div className="container mx-auto px-5 md:px-6 relative z-10">
        
        {/* Stylish Unique Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24 flex flex-col items-center"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-brand-yellow"></div>
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-brand-yellow">Nos Atouts</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-brand-yellow"></div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 font-heading tracking-tight leading-tight">
            Pourquoi choisir <br className="md:hidden" />
            <span className="text-water-500">APO</span> <span className="text-brand-yellow">GROUP</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
            La confiance ne s'achète pas, elle se construit à travers des résultats concrets et un professionnalisme sans faille.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="p-8 md:p-10 rounded-[2rem] bg-black/40 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-colors group shadow-lg"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 text-white group-hover:scale-110 transition-transform shadow-inner">
                <reason.icon className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-white font-heading">{reason.title}</h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </section>
  );
}
