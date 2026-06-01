// components/modals/QuoteModal.tsx
"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, CheckCircle, Loader2, Droplets, Map, LandPlot, Cog, ImagePlus } from "lucide-react";
import { useModal } from "@/context/ModalContext";

const services = [
  { id: "forage", label: "Forage", icon: Droplets },
  { id: "topographie", label: "Topographie", icon: Map },
  { id: "vente", label: "Vente de terrain", icon: LandPlot },
  { id: "assistance", label: "Assistance technique", icon: Cog },
];

export default function QuoteModal() {
  const { activeModal, closeModal, openStudyModal } = useModal();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [hasStudy, setHasStudy] = useState<boolean | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [form, setForm] = useState({
    description: "",
    location: "",
    name: "",
    phone: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isOpen = activeModal === "quote";
  const MAX_FILES = 6;

  const reset = () => {
    setStep(1);
    setSelectedService(null);
    setHasStudy(null);
    setFiles([]);
    setForm({ description: "", location: "", name: "", phone: "", email: "" });
    setSubmitted(false);
    setLoading(false);
    setUploadError("");
  };

  const handleClose = () => {
    reset();
    closeModal();
  };

  const handleServiceSelect = (id: string) => {
    setSelectedService(id);
    setStep(2);
  };

  const handleStudyChoice = (value: boolean) => {
    setHasStudy(value);
    if (value) {
      setStep(3);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected) return;
    const newFiles = Array.from(selected);
    const combined = [...files, ...newFiles].slice(0, MAX_FILES);
    setFiles(combined);
    setUploadError("");
    // Reset input value so the same file can be re-selected if needed
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate mandatory upload
    if (files.length === 0) {
      setUploadError("Veuillez joindre au moins un document d’étude.");
      return;
    }
    setUploadError("");
    setLoading(true);

    // Simulate sending to email (2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000));

    setLoading(false);
    setSubmitted(true);

    // Build WhatsApp message
    const serviceName = services.find(s => s.id === selectedService)?.label || "service";
    const message = `Bonjour APO GROUP, je souhaite obtenir un devis pour un projet de ${serviceName.toLowerCase()}. Une étude a déjà été réalisée.`;
    const whatsappUrl = `https://wa.me/237000000000?text=${encodeURIComponent(message)}`;
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 1500);
  };

  const handleRequestStudy = () => {
    closeModal();
    setTimeout(() => {
      openStudyModal();
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={handleClose}
          />
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] bg-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-y-auto"
            initial={{ scale: 0.95, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 30, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <button
              onClick={handleClose}
              className="sticky top-4 float-right mr-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
            >
              <X size={18} className="text-white" />
            </button>

            <div className="p-8 md:p-10">
              <AnimatePresence mode="wait">
                {!submitted && !loading ? (
                  <motion.div key="form">
                    <h2 className="text-2xl md:text-3xl font-black text-white font-heading mb-2">
                      Obtenir un devis personnalisé
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base mb-8">
                      Décrivez votre besoin afin que notre équipe puisse vous proposer une solution adaptée.
                    </p>

                    {/* Step 1: Service selection */}
                    {step === 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-white/80 text-sm font-semibold mb-4 uppercase tracking-wide">
                          Quel service vous intéresse ?
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          {services.map((service) => (
                            <motion.button
                              key={service.id}
                              onClick={() => handleServiceSelect(service.id)}
                              whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.3)" }}
                              whileTap={{ scale: 0.98 }}
                              className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                                selectedService === service.id
                                  ? "bg-brand-yellow/10 border-brand-yellow shadow-[0_0_20px_rgba(255,215,0,0.1)]"
                                  : "bg-white/5 border-white/10 hover:bg-white/10"
                              }`}
                            >
                              <service.icon className="w-5 h-5 text-white mt-0.5 shrink-0" />
                              <span className="text-white font-medium text-sm md:text-base">
                                {service.label}
                              </span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Study already done? */}
                    {step === 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-white/80 text-sm font-semibold mb-4 uppercase tracking-wide">
                          Une étude du projet a-t-elle déjà été réalisée ?
                        </p>
                        <div className="flex flex-col gap-4">
                          <button
                            onClick={() => handleStudyChoice(true)}
                            className={`p-4 rounded-2xl border text-left transition-all ${
                              hasStudy === true
                                ? "bg-brand-yellow/10 border-brand-yellow"
                                : "bg-white/5 border-white/10 hover:bg-white/10"
                            }`}
                          >
                            <span className="text-white font-medium">
                              Oui, une étude a déjà été faite
                            </span>
                          </button>
                          <button
                            onClick={() => handleStudyChoice(false)}
                            className={`p-4 rounded-2xl border text-left transition-all ${
                              hasStudy === false
                                ? "bg-brand-yellow/10 border-brand-yellow"
                                : "bg-white/5 border-white/10 hover:bg-white/10"
                            }`}
                          >
                            <span className="text-white font-medium">
                              Non, j’ai besoin d’une étude préalable
                            </span>
                          </button>
                        </div>

                        {hasStudy === false && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-6 p-6 rounded-2xl bg-earth-500/10 border border-earth-500/30"
                          >
                            <h3 className="text-white text-lg font-bold mb-2">
                              Une étude préalable est recommandée
                            </h3>
                            <p className="text-gray-300 text-sm mb-4">
                              Afin de garantir la faisabilité et la réussite de votre projet, APO GROUP
                              recommande la réalisation d’une étude préalable avant toute estimation
                              technique.
                            </p>
                            <button
                              onClick={handleRequestStudy}
                              className="w-full py-3 bg-earth-500 hover:bg-earth-600 text-white rounded-full font-bold uppercase tracking-wider transition-colors"
                            >
                              Demander une étude de projet
                            </button>
                          </motion.div>
                        )}
                      </motion.div>
                    )}

                    {/* Step 3: Detailed form when "Oui" selected */}
                    {step === 3 && hasStudy === true && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <form onSubmit={handleSubmit} className="space-y-6">
                          {/* Obligatory file upload */}
                          <div>
                            <label className="block text-sm text-white/70 mb-1">
                              Document d’étude <span className="text-red-400">*</span>
                            </label>
                            <p className="text-xs text-gray-500 mb-2">
                              Joignez jusqu’à 6 images de votre étude (obligatoire).
                            </p>
                            <div className="border border-white/10 rounded-xl p-4 bg-white/5">
                              <div className="flex flex-wrap gap-2 mb-3">
                                {files.map((file, index) => (
                                  <div key={index} className="flex items-center gap-1 bg-white/10 rounded-lg px-3 py-1 text-xs text-gray-200">
                                    <ImagePlus size={14} />
                                    <span className="truncate max-w-[100px]">{file.name}</span>
                                    <button
                                      type="button"
                                      onClick={() => removeFile(index)}
                                      className="text-red-400 hover:text-red-300"
                                    >
                                      &times;
                                    </button>
                                  </div>
                                ))}
                              </div>
                              <div className="flex items-center gap-2">
                                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-400 hover:text-white transition-colors">
                                  <Upload size={18} />
                                  Ajouter des images
                                  <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                    className="hidden"
                                  />
                                </label>
                                <span className="text-xs text-gray-500">
                                  {files.length}/{MAX_FILES}
                                </span>
                              </div>
                              {uploadError && (
                                <p className="text-red-400 text-xs mt-2">{uploadError}</p>
                              )}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm text-white/70 mb-1">
                              Description du projet
                            </label>
                            <textarea
                              rows={3}
                              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow"
                              placeholder="Décrivez brièvement votre projet..."
                              value={form.description}
                              onChange={(e) => setForm({ ...form, description: e.target.value })}
                            />
                          </div>

                          <div>
                            <label className="block text-sm text-white/70 mb-1">Localisation</label>
                            <input
                              type="text"
                              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow"
                              placeholder="Ville, quartier..."
                              value={form.location}
                              onChange={(e) => setForm({ ...form, location: e.target.value })}
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm text-white/70 mb-1">Nom complet</label>
                              <input
                                type="text"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow"
                                placeholder="Votre nom"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-white/70 mb-1">Téléphone</label>
                              <input
                                type="tel"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow"
                                placeholder="+237 ..."
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm text-white/70 mb-1">Email</label>
                            <input
                              type="email"
                              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow"
                              placeholder="vous@exemple.com"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full py-4 bg-brand-yellow hover:bg-amber-500 text-black rounded-full font-black uppercase tracking-wider transition-colors"
                          >
                            Recevoir mon devis
                          </button>
                        </form>
                      </motion.div>
                    )}
                  </motion.div>
                ) : loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <Loader2 className="w-12 h-12 text-brand-yellow animate-spin mx-auto mb-4" />
                    <p className="text-white text-lg font-medium">Envoi en cours...</p>
                    <p className="text-gray-400 text-sm mt-2">
                      Votre devis est en cours de transmission à notre équipe.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">Demande envoyée !</h3>
                    <p className="text-gray-400 mb-6">
                      Nous vous contacterons très bientôt. Vous allez être redirigé vers WhatsApp.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}