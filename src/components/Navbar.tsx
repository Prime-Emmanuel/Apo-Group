"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const { scrollY } = useScroll();
  const width = useTransform(scrollY, [0, 100], ["100%", "90%"]);
  const y = useTransform(scrollY, [0, 100], [0, 15]);
  const borderRadius = useTransform(scrollY, [0, 100], ["0px", "100px"]);
  const border = useTransform(scrollY, [0, 100], ["rgba(255,255,255,0)", "rgba(255,255,255,0.05)"]);
  const background = useTransform(scrollY, [0, 100], ["rgba(15,6,2,0.5)", "rgba(15,6,2,0.9)"]);

  if (!mounted) return null;

  return (
    <>
      <motion.nav
        style={{ width, y, borderRadius, borderColor: border, backgroundColor: background }}
        className="fixed z-50 left-0 right-0 mx-auto backdrop-blur-xl border-b transition-colors"
      >
        <div className="px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-3 group z-50">
            <Image src="/logo.png" alt="APO GROUP Logo" width={32} height={32} className="object-contain md:w-10 md:h-10" />
            <span className="text-lg md:text-xl font-black tracking-widest font-heading">
              <span className="text-water-500">APO</span>{" "}
              <span className="text-brand-yellow">GROUP</span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#pourquoi-nous" className="text-xs font-semibold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">
              Pourquoi nous
            </Link>
            <Link href="#services" className="text-xs font-semibold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">
              Services
            </Link>
            <Link href="#process" className="text-xs font-semibold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">
              Comment ça marche
            </Link>
            <Link
              href="#devis"
              aria-label="Aller à la section demande de devis"
              className="px-6 py-2 bg-white hover:bg-gray-200 text-black rounded-full text-xs font-bold transition-all uppercase tracking-widest"
            >
              Obtenir un devis
            </Link>
          </div>

          {/* Burger */}
          <button className="md:hidden text-white z-50 p-2 -mr-2" onClick={() => setIsOpen(!isOpen)}>
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* Menu mobile premium */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#0f0602]/95 backdrop-blur-3xl flex flex-col justify-center items-center px-6"
          >
            <div className="flex flex-col items-center gap-10 text-center w-full">
              <Link href="#pourquoi-nous" className="text-2xl sm:text-3xl font-heading font-black text-white uppercase tracking-widest" onClick={() => setIsOpen(false)}>
                Pourquoi nous
              </Link>
              <Link href="#services" className="text-2xl sm:text-3xl font-heading font-black text-white uppercase tracking-widest" onClick={() => setIsOpen(false)}>
                Services
              </Link>
              <Link href="#process" className="text-2xl sm:text-3xl font-heading font-black text-white uppercase tracking-widest" onClick={() => setIsOpen(false)}>
                Comment ça marche
              </Link>
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="mt-4 w-full max-w-xs">
                <Link
                  href="#devis"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-4 bg-white text-black rounded-full text-sm font-black uppercase tracking-widest shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                >
                  Obtenir un devis
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
