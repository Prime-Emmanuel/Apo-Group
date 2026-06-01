"use client";
import { motion } from "framer-motion";
import { Droplet, Map, Home, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Services() {
  const services = [
    {
      icon: Droplet,
      title: "Forage & Eau",
      color: "water",
      features: ["Forage résidentiel", "Forage industriel", "Installation de pompes", "Étude hydrogéologique"],
      desc: "Accédez à une eau pure et abondante grâce à nos techniques de forage de pointe.",
    },
    {
      icon: Map,
      title: "Topographie",
      color: "earth",
      features: ["Bornage", "Lotissement", "Levés topographiques", "GPS haute précision"],
      desc: "Des mesures exactes pour sécuriser et préparer parfaitement vos terrains.",
    },
    {
      icon: Home,
      title: "Immobilier",
      color: "earth",
      features: ["Vente de terrains", "Accompagnement", "Sécurisation", "Conseils investissement"],
      desc: "Investissez en toute sécurité avec nos experts en foncier et immobilier.",
    }
  ];

  return (
    <section id="services" className="py-24 md:py-40 bg-transparent relative overflow-hidden">
      {/* Subtle Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-brand-yellow/5 blur-[150px] rounded-full pointer-events-none" />
      
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
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-water-500"></div>
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-water-500">Expertise</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-water-500"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 font-heading tracking-tight">
            Nos <span className="text-white">Services Premium</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-lg">
            Des solutions intégrées pour répondre à tous vos besoins d'aménagement et d'infrastructure au Cameroun.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`p-[1px] rounded-[2rem] transition-all duration-300 ${
                service.color === 'water' ? 'glow-card-water bg-gradient-to-b from-water-500/40 to-transparent' : 'glow-card-earth bg-gradient-to-b from-earth-400/40 to-transparent'
              }`}
            >
              <div className="h-full bg-black/80 backdrop-blur-md rounded-[31px] p-8 md:p-10 flex flex-col relative overflow-hidden group">
                {/* Internal Glow Effect */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[50px] opacity-20 transition-opacity duration-300 group-hover:opacity-40 ${
                  service.color === 'water' ? 'bg-water-500' : 'bg-earth-500'
                }`}></div>

                <div className={`relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-8 shadow-inner ${
                  service.color === 'water' ? 'bg-water-500/10 text-water-400' : 'bg-earth-500/10 text-earth-400'
                }`}>
                  <service.icon className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                
                <h3 className="relative z-10 text-2xl md:text-3xl font-black mb-4 text-white font-heading">{service.title}</h3>
                <p className="relative z-10 text-gray-400 text-sm md:text-base mb-8 flex-grow leading-relaxed">{service.desc}</p>
                
                <ul className="relative z-10 space-y-4 mb-10">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm md:text-base text-gray-300 font-medium">
                      <div className={`w-2 h-2 rounded-full ${
                        service.color === 'water' ? 'bg-water-500' : 'bg-earth-500'
                      }`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href={`#${service.title.toLowerCase().replace(/\s+/g, '-')}`} className={`relative z-10 mt-auto w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-2 transition-all border ${
                  service.color === 'water' 
                    ? 'bg-water-500/10 border-water-500/30 text-water-400 hover:bg-water-500 hover:text-white' 
                    : 'bg-earth-500/10 border-earth-500/30 text-earth-400 hover:bg-earth-500 hover:text-white'
                }`}>
                  Explorer
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
