"use client";
import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

export default function Location() {
  return (
    <section className="py-20 md:py-32 bg-transparent relative">
      <div className="container mx-auto px-5 md:px-6 relative z-10">
        
        <div className="max-w-6xl mx-auto rounded-[2rem] md:rounded-[3rem] bg-black/60 backdrop-blur-2xl border border-white/10 overflow-hidden flex flex-col md:flex-row relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          <div className="w-full md:w-1/2 p-8 md:p-20 flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-earth-500/10 flex items-center justify-center mb-6 text-earth-400 shadow-inner">
                <MapPin className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-4 text-white font-heading leading-tight">Nous <br/>Trouver</h2>
              <p className="text-gray-400 text-sm md:text-lg mb-10 leading-relaxed">
                Venez discuter de votre projet autour d'un café dans nos bureaux situés à <strong className="text-white">Douala, Logpom</strong>.
              </p>
              
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=Logpom,Douala,Cameroon" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-5 bg-earth-600 hover:bg-earth-500 text-white rounded-full font-black uppercase tracking-widest text-xs md:text-sm transition-all shadow-[0_0_30px_rgba(194,65,12,0.3)] hover:shadow-[0_0_40px_rgba(194,65,12,0.5)] hover:scale-105"
              >
                <Navigation className="w-4 h-4 md:w-5 md:h-5" />
                Itinéraire
              </a>
            </motion.div>
          </div>

          <div className="w-full md:w-1/2 h-[350px] md:h-auto relative bg-[#0a0502]">
            {/* Minimalist Map Illusion */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            
            {/* Animated Pin */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full bg-white/5 backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-2xl relative">
                <span className="absolute inset-0 rounded-full border-2 border-earth-500 animate-ping opacity-60"></span>
                <MapPin className="w-10 h-10 text-earth-500 drop-shadow-[0_0_10px_rgba(194,65,12,1)]" />
              </div>
              <div className="mt-6 px-6 py-3 bg-black/90 backdrop-blur-md rounded-xl border border-white/10 text-white font-black text-sm uppercase tracking-widest shadow-2xl">
                Douala, Logpom
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
