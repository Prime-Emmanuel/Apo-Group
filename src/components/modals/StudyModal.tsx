// components/modals/StudyModal.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Loader2, Droplets, Map, LandPlot, Cog } from "lucide-react";
import { useModal } from "@/context/ModalContext";

const services = [
  { id: "forage", label: "Forage", icon: Droplets },
  { id: "topographie", label: "Topographie", icon: Map },
  { id: "vente", label: "Vente de terrain", icon: LandPlot },
  { id: "assistance", label: "Assistance technique", icon: Cog },
];

export default function StudyModal() {
  const { activeModal, closeModal } = useModal();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [form, setForm] = useState({
    location: "",
    terrainType: "",
    usage: "",
    waterNeed: "",
    access: "",
    description: "",
    projectType: "",
    surface: "",
    besoin: "",
    city: "",
    budget: "",
    superficie: "",
    terrainTypeVente: "",
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const isOpen = activeModal === "study";

  const reset = () => {
    setStep(1);
    setSelectedService(null);
    setForm({
      location: "", terrainType: "", usage: "", waterNeed: "", access: "", description: "",
      projectType: "", surface: "", besoin: "",
      city: "", budget: "", superficie: "", terrainTypeVente: "",
      name: "", phone: "", whatsapp: "", email: "",
    });
    setSubmitted(false);
    setLoading(false);
  };

  const handleClose = () => {
    reset();
    closeModal();
  };

  const handleServiceSelect = (id: string) => {
    setSelectedService(id);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000)); // simulate sending
    setLoading(false);
    setSubmitted(true);

    const serviceName = services.find((s) => s.id === selectedService)?.label || "service";
    let details = "";
    if (selectedService === "forage") {
      details = `Forage: localisation ${form.location}, usage ${form.usage}, besoin en eau ${form.waterNeed}.`;
    } else if (selectedService === "topographie") {
      details = `Topographie: projet ${form.projectType}, surface ${form.surface}.`;
    } else if (selectedService === "vente") {
      details = `Vente terrain: ville ${form.city}, budget ${form.budget}.`;
    }
    const message = `Bonjour APO GROUP, je souhaite une étude de projet pour ${serviceName}. ${details} Merci de me recontacter.`;
    const whatsappUrl = `https://wa.me/237000000000?text=${encodeURIComponent(message)}`;
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 1500);
  };

  const renderServiceFields = () => {
    if (!selectedService) return null;
    const update = (field: string, value: string) =>
      setForm({ ...form, [field]: value });

    if (selectedService === "forage") {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm text-white/70 mb-1">Localisation du terrain</label>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow"
              placeholder="Ville, quartier..."
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Type de terrain</label>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500"
              placeholder="Argileux, rocheux..."
              value={form.terrainType}
              onChange={(e) => update("terrainType", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Usage du forage</label>
            <select
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
              value={form.usage}
              onChange={(e) => update("usage", e.target.value)}
            >
              <option value="" disabled className="bg-gray-800">Sélectionnez</option>
              <option value="habitation" className="bg-gray-800">Habitation</option>
              <option value="agricole" className="bg-gray-800">Agricole</option>
              <option value="industriel" className="bg-gray-800">Industriel</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Besoin estimé en eau (m³/jour)</label>
            <input
              type="number"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500"
              placeholder="Ex: 10"
              value={form.waterNeed}
              onChange={(e) => update("waterNeed", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Accessibilité du terrain</label>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500"
              placeholder="Facile, difficile..."
              value={form.access}
              onChange={(e) => update("access", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Description complémentaire</label>
            <textarea
              rows={2}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500"
              placeholder="Toute information utile..."
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>
          <div className="p-4 rounded-2xl bg-water-500/10 border border-water-500/30">
            <p className="text-sm text-gray-300">
              Avant tout forage, APO GROUP réalise une étude préliminaire afin d’évaluer la
              faisabilité du projet et proposer la solution technique la plus adaptée.
            </p>
          </div>
        </motion.div>
      );
    }

    if (selectedService === "topographie") {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm text-white/70 mb-1">Type de projet</label>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
              value={form.projectType}
              onChange={(e) => update("projectType", e.target.value)}
              placeholder="Ex: construction, lotissement..."
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Surface estimée (m²)</label>
            <input
              type="number"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
              value={form.surface}
              onChange={(e) => update("surface", e.target.value)}
              placeholder="Ex: 5000"
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Localisation</label>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="Ville, quartier..."
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Besoin</label>
            <select
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
              value={form.besoin}
              onChange={(e) => update("besoin", e.target.value)}
            >
              <option value="" disabled className="bg-gray-800">Sélectionnez</option>
              <option value="bornage" className="bg-gray-800">Bornage</option>
              <option value="lotissement" className="bg-gray-800">Lotissement</option>
              <option value="plan topographique" className="bg-gray-800">Plan topographique</option>
              <option value="rattachement géodésique" className="bg-gray-800">Rattachement géodésique</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Description du besoin</label>
            <textarea
              rows={2}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Précisez..."
            />
          </div>
        </motion.div>
      );
    }

    if (selectedService === "vente") {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm text-white/70 mb-1">Ville recherchée</label>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              placeholder="Ex: Yaoundé"
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Budget estimatif (FCFA)</label>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
              value={form.budget}
              onChange={(e) => update("budget", e.target.value)}
              placeholder="Ex: 10 000 000"
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Superficie recherchée (m²)</label>
            <input
              type="number"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
              value={form.superficie}
              onChange={(e) => update("superficie", e.target.value)}
              placeholder="Ex: 500"
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Type de terrain</label>
            <select
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
              value={form.terrainTypeVente}
              onChange={(e) => update("terrainTypeVente", e.target.value)}
            >
              <option value="" disabled className="bg-gray-800">Sélectionnez</option>
              <option value="résidentiel" className="bg-gray-800">Résidentiel</option>
              <option value="commercial" className="bg-gray-800">Commercial</option>
              <option value="agricole" className="bg-gray-800">Agricole</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Description</label>
            <textarea
              rows={2}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Précisions..."
            />
          </div>
        </motion.div>
      );
    }

    if (selectedService === "assistance") {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm text-white/70 mb-1">Décrivez votre besoin d'assistance</label>
            <textarea
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>
        </motion.div>
      );
    }

    return null;
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
                      Étude de projet
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base mb-8">
                      Parlez-nous de votre projet afin que notre équipe puisse analyser vos besoins et
                      vous accompagner efficacement.
                    </p>

                    {step === 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
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

                    {step === 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <p className="text-white/80 text-sm font-semibold mb-4 uppercase tracking-wide">
                          Détails du projet
                        </p>
                        {renderServiceFields()}

                        <div className="mt-8 border-t border-white/10 pt-6">
                          <p className="text-white/80 text-sm font-semibold mb-4 uppercase tracking-wide">
                            Vos coordonnées
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm text-white/70 mb-1">Nom complet</label>
                              <input
                                type="text"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-white/70 mb-1">Téléphone</label>
                              <input
                                type="tel"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div>
                              <label className="block text-sm text-white/70 mb-1">WhatsApp</label>
                              <input
                                type="tel"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                                value={form.whatsapp}
                                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-white/70 mb-1">Email</label>
                              <input
                                type="email"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                              />
                            </div>
                          </div>
                          <button
                            onClick={handleSubmit}
                            className="w-full py-4 bg-brand-yellow hover:bg-amber-500 text-black rounded-full font-black uppercase tracking-wider transition-colors"
                          >
                            Envoyer ma demande d'étude
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ) : loading ? (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                    <Loader2 className="w-12 h-12 text-brand-yellow animate-spin mx-auto mb-4" />
                    <p className="text-white text-lg font-medium">Envoi en cours...</p>
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
                    <p className="text-gray-400">
                      Merci pour votre demande. Notre équipe analysera votre projet et vous
                      contactera rapidement.
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