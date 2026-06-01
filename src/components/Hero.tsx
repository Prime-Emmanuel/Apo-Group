"use client";
import { motion } from "framer-motion";
import { ArrowRight, UserCircle, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useModal } from "@/context/ModalContext";

export default function Hero() {
  const { openStudyModal } = useModal();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
  };

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-transparent pt-24 pb-32 md:pt-40 md:pb-48">
      {/* Background Glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-0 md:left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-water-500/10 rounded-full blur-[100px] md:blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-0 md:right-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-earth-400/10 rounded-full blur-[100px] md:blur-[150px] mix-blend-screen" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container relative z-10 px-5 md:px-6 mx-auto text-center flex flex-col items-center justify-center"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-8 shadow-[0_0_20px_rgba(255,255,255,0.02)]">
          <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-brand-yellow"></span>
          </span>
          <span className="text-[10px] md:text-xs text-gray-300 font-bold tracking-[0.2em] uppercase">L'Excellence au Cameroun</span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-[6rem] lg:text-[7.5rem] font-black tracking-tight mb-6 max-w-6xl font-heading leading-[1.05] md:leading-[1.1]"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">Construisons</span> <br />
          <span className="text-white">l'Avenir</span> <br className="md:hidden" />
          <span className="text-4xl sm:text-5xl md:text-[5rem] lg:text-[6.5rem] font-light text-gray-400 block mt-2 md:mt-0">avec précision.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-2xl text-gray-400 mb-10 md:mb-14 max-w-2xl font-light leading-relaxed px-2"
        >
          L'alliance parfaite entre l'ingénierie moderne et l'expertise locale en 
          <span className="text-water-400 font-medium"> Forage</span>, 
          <span className="text-earth-400 font-medium"> Topographie</span> et 
          <span className="text-earth-500 font-medium"> Immobilier</span>.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center z-20"
        >
          <button
            onClick={openStudyModal}
            className="w-full sm:w-auto px-8 py-4 md:py-5 bg-white text-black rounded-full font-black uppercase tracking-wider transition-all flex items-center justify-center gap-3 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.15)] text-[11px] sm:text-sm md:text-base"
          >
            Demander une étude de projet
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          
          <Link href="#services" className="w-full sm:w-auto px-8 py-4 md:py-5 bg-black/50 hover:bg-black/80 border border-white/10 text-white rounded-full font-bold transition-all flex items-center justify-center gap-3 backdrop-blur-xl hover:border-white/30 uppercase tracking-wider text-[11px] sm:text-sm md:text-base">
            Nos services
          </Link>
        </motion.div>
      </motion.div>

      {/* Floating Avatar */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
        className="fixed bottom-6 right-5 md:right-10 z-40 flex items-center gap-3 bg-black/90 backdrop-blur-2xl p-2 pr-4 md:p-2.5 md:pr-6 rounded-full border border-white/10 shadow-2xl hover:scale-105 transition-transform cursor-pointer hover:border-water-500/50 group"
      >
        <div className="relative flex items-center justify-center bg-gray-800 rounded-full w-10 h-10 md:w-12 md:h-12 border-2 border-water-500">
          <UserCircle className="w-6 h-6 md:w-7 md:h-7 text-gray-300" />
          <span className="absolute bottom-0 right-0 w-3 h-3 md:w-3.5 md:h-3.5 bg-green-500 border-2 border-black rounded-full"></span>
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-xs md:text-sm font-bold text-white leading-tight">M. Patrick</p>
          <p className="text-[10px] md:text-xs text-water-400 flex items-center gap-1 font-medium group-hover:text-water-300 transition-colors">
            <MessageSquare className="w-3 h-3"/> Parlez à un expert
          </p>
        </div>
        <div className="text-left sm:hidden">
          <p className="text-[11px] font-bold text-white leading-tight">M. Patrick</p>
          <p className="text-[9px] text-water-400">En ligne</p>
        </div>
      </motion.div>

      {/* Creative Stylish Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[50px] md:h-[100px]">
          <path d="M1200 120L0 120 0 0 1200 120z" className="fill-[#0f0602]/50 backdrop-blur-sm"></path>
        </svg>
      </div>
    </section>
  );
}