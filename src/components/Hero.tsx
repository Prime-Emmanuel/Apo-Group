"use client";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-28 pb-20 md:pt-40 md:pb-32">
      {/* Image de fond de chantier */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-[url('/construction-bg.webp')] bg-cover bg-center brightness-[0.3] saturate-50"
          aria-hidden="true"
        />
        {/* Overlay pour lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background/90" />
      </div>

      {/* Contenu */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="container relative z-10 px-5 md:px-6 mx-auto text-center flex flex-col items-center"
      >
        {/* Badge subtil */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 backdrop-blur-md mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-yellow" />
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-yellow">
            Leader au Cameroun
          </span>
        </motion.div>

        {/* Titre massif */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight font-heading leading-[1.1] mb-6"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white">
            APO GROUP
          </span>
          <br />
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-300 mt-2 block">
            L’excellence au Cameroun
          </span>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mb-10"
        >
          Forage, Topographie, Immobilier – Du conseil à la réalisation, nous bâtissons vos projets avec précision.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/forage"
            className="group relative px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-wider overflow-hidden transition-all hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              Découvrir nos solutions <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link
            href="/demande"
            className="group relative px-8 py-4 border border-white/20 text-white rounded-full font-bold uppercase tracking-wider backdrop-blur-md hover:bg-white/10 transition-all"
          >
            <span className="relative z-10 flex items-center gap-2">
              Demander un devis <MessageCircle className="w-5 h-5" />
            </span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Diviseur en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
