"use client";
import { motion } from "framer-motion";
import { PhoneCall, FileSearch, Hammer, CheckCircle2 } from "lucide-react";

export default function Process() {
  const steps = [
    {
      icon: PhoneCall,
      title: "Contact & Devis",
      desc: "Une prise en charge immédiate pour comprendre vos attentes et établir un devis clair.",
      color: "water"
    },
    {
      icon: FileSearch,
      title: "Étude du Besoin",
      desc: "Nos experts analysent le terrain et conçoivent une solution sur-mesure.",
      color: "earth"
    },
    {
      icon: Hammer,
      title: "Intervention",
      desc: "Déploiement de nos équipes avec du matériel de pointe pour réaliser les travaux.",
      color: "water"
    },
    {
      icon: CheckCircle2,
      title: "Livraison & Suivi",
      desc: "Validation conjointe et garantie d'un résultat qui dépasse vos attentes.",
      color: "earth"
    }
  ];

  return (
    <section id="processus" className="py-24 md:py-40 bg-transparent relative">
      <div className="container mx-auto px-5 md:px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-32 flex flex-col items-center"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/50"></div>
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-gray-400">Méthodologie</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/50"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 font-heading tracking-tight">
            Comment ça <span className="text-white">Marche ?</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-lg">
            Un processus simple et transparent pour garantir votre tranquillité d'esprit à chaque étape.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[38px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2"></div>

          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`relative flex items-start md:items-center justify-between mb-16 md:mb-24 ${
                i % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
              } flex-col md:flex-row pl-24 md:pl-0`}
            >
              {/* Center Dot */}
              <div className="absolute left-[39px] md:left-1/2 top-0 md:top-1/2 w-12 h-12 md:w-16 md:h-16 -translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center z-10">
                <div className={`w-full h-full rounded-full border-[4px] md:border-[6px] border-[#0f0602] flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-transform duration-500 hover:scale-110 ${
                  step.color === 'water' ? 'bg-water-500 text-[#0f0602]' : 'bg-earth-500 text-white'
                }`}>
                  <step.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>

              {/* Content Box */}
              <div className={`w-full md:w-[45%] ${
                i % 2 === 0 ? 'md:text-left' : 'md:text-right'
              }`}>
                <div className="p-8 md:p-10 rounded-[2rem] bg-black/60 backdrop-blur-xl border border-white/5 hover:border-white/15 transition-all duration-300 shadow-2xl group overflow-hidden relative">
                  
                  {/* Subtle Background Number */}
                  <span className={`text-[6rem] md:text-[8rem] font-black opacity-[0.03] absolute ${
                    i % 2 === 0 ? 'right-4' : 'left-4 md:-right-4 md:left-auto' // Align number properly depending on side
                  } -top-6 font-heading select-none group-hover:scale-110 transition-transform duration-700`}>
                    0{i + 1}
                  </span>

                  <h3 className="relative z-10 text-2xl md:text-3xl font-black mb-4 text-white font-heading">{step.title}</h3>
                  <p className="relative z-10 text-gray-400 text-sm md:text-base leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
