"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, ArrowRight, ArrowLeft, Check, Phone, Sparkles } from "lucide-react";

// ----------------------------------------------------------------------
// Types & données
// ----------------------------------------------------------------------
type Step = "welcome" | "projectType" | "details" | "location" | "budget" | "summary";

interface ProjectType {
  id: string;
  label: string;
  icon: string;
}

const projectTypes: ProjectType[] = [
  { id: "terrain", label: "Achat / Vente de terrain", icon: "🏡" },
  { id: "verification", label: "Vérification documentaire", icon: "🔍" },
  { id: "forage", label: "Forage d’eau", icon: "💧" },
  { id: "topographie", label: "Topographie / Bornage", icon: "🗺️" },
  { id: "btp", label: "Devis BTP / Construction", icon: "🏗️" },
];

// Sous-options selon le type de projet (pour l'étape "details")
const detailOptions: Record<string, string[]> = {
  terrain: ["Je cherche un terrain à acheter", "Je souhaite vendre un terrain", "Besoin de sécurisation foncière"],
  verification: ["Vérification d’un titre foncier", "Contrôle d’hypothèques", "Audit complet d’un dossier"],
  forage: ["Forage pour habitation", "Forage agricole / industriel", "Étude hydrogéologique seule"],
  topographie: ["Bornage de parcelle", "Plan topographique", "Lotissement"],
  btp: ["Construction de maison", "Gros œuvre", "Devis estimatif"],
};

// Génération du message WhatsApp final
const generateWhatsAppMessage = (
  projectType: string,
  detail: string,
  location: string,
  budget: string
): string => {
  const base = "Bonjour APO GROUP, j’ai été orienté par votre assistant.\n";
  const typeLabel = projectTypes.find((p) => p.id === projectType)?.label || projectType;
  return encodeURIComponent(
    `${base}• Type de projet : ${typeLabel}\n• Détail : ${detail}\n• Localisation : ${location || "Non précisée"}\n• Budget : ${budget || "Non précisé"}\n\nMerci de me recontacter.`
  );
};

// ----------------------------------------------------------------------
// Composant principal
// ----------------------------------------------------------------------
export default function AssistantAPO() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("welcome");
  const [projectType, setProjectType] = useState("");
  const [detail, setDetail] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");

  // Réinitialiser l'assistant
  const reset = useCallback(() => {
    setStep("welcome");
    setProjectType("");
    setDetail("");
    setLocation("");
    setBudget("");
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(reset, 300); // reset après l'animation
  };

  // Composant bouton de choix
  const ChoiceButton = ({
    children,
    selected,
    onClick,
  }: {
    children: React.ReactNode;
    selected?: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm ${
        selected
          ? "bg-brand-yellow/10 border-brand-yellow text-white"
          : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20 hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );

  // Rendu de l'étape en cours
  const renderStep = () => {
    switch (step) {
      case "welcome":
        return (
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="w-16 h-16 rounded-2xl bg-brand-yellow/10 border border-brand-yellow/30 flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 text-brand-yellow" />
            </motion.div>
            <h2 className="text-xl font-bold font-heading text-white text-center">
              Assistant APO GROUP
            </h2>
            <p className="text-gray-400 text-sm text-center">
              Répondez à quelques questions pour être orienté vers le bon service et obtenir un contact WhatsApp adapté.
            </p>
            <button
              onClick={() => setStep("projectType")}
              className="w-full py-3 bg-brand-yellow hover:bg-amber-400 text-black rounded-full font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              Commencer <ArrowRight size={16} />
            </button>
          </div>
        );

      case "projectType":
        return (
          <>
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => setStep("welcome")} className="p-2 text-gray-400 hover:text-white">
                <ArrowLeft size={18} />
              </button>
              <span className="text-xs text-gray-500">Étape 1/4</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-4">Quel est votre projet ?</h3>
            <div className="space-y-3">
              {projectTypes.map((type) => (
                <ChoiceButton
                  key={type.id}
                  selected={projectType === type.id}
                  onClick={() => {
                    setProjectType(type.id);
                    setStep("details");
                  }}
                >
                  {type.icon} {type.label}
                </ChoiceButton>
              ))}
            </div>
          </>
        );

      case "details":
        return (
          <>
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => setStep("projectType")} className="p-2 text-gray-400 hover:text-white">
                <ArrowLeft size={18} />
              </button>
              <span className="text-xs text-gray-500">Étape 2/4</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-4">Précisez votre besoin</h3>
            <div className="space-y-3">
              {(detailOptions[projectType] || []).map((option) => (
                <ChoiceButton
                  key={option}
                  selected={detail === option}
                  onClick={() => {
                    setDetail(option);
                    setStep("location");
                  }}
                >
                  {option}
                </ChoiceButton>
              ))}
            </div>
          </>
        );

      case "location":
        return (
          <>
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => setStep("details")} className="p-2 text-gray-400 hover:text-white">
                <ArrowLeft size={18} />
              </button>
              <span className="text-xs text-gray-500">Étape 3/4</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-4">Où se situe le projet ?</h3>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ville, quartier..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow mb-6"
            />
            <button
              onClick={() => setStep("budget")}
              className="w-full py-3 bg-brand-yellow hover:bg-amber-400 text-black rounded-full font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              Suivant <ArrowRight size={16} />
            </button>
          </>
        );

      case "budget":
        return (
          <>
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => setStep("location")} className="p-2 text-gray-400 hover:text-white">
                <ArrowLeft size={18} />
              </button>
              <span className="text-xs text-gray-500">Étape 4/4</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-4">Budget approximatif (FCFA)</h3>
            <div className="space-y-3">
              {["Moins de 1 000 000", "1 000 000 – 5 000 000", "Plus de 5 000 000", "Je ne sais pas encore"].map((b) => (
                <ChoiceButton
                  key={b}
                  selected={budget === b}
                  onClick={() => {
                    setBudget(b);
                    setStep("summary");
                  }}
                >
                  {b}
                </ChoiceButton>
              ))}
            </div>
          </>
        );

      case "summary":
        const typeLabel = projectTypes.find((p) => p.id === projectType)?.label || projectType;
        const whatsappLink = `https://wa.me/237650331995?text=${generateWhatsAppMessage(
          projectType,
          detail,
          location,
          budget
        )}`;
        return (
          <>
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => setStep("budget")} className="p-2 text-gray-400 hover:text-white">
                <ArrowLeft size={18} />
              </button>
              <span className="text-xs text-gray-500">Résumé</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center"
              >
                <Check className="w-6 h-6 text-green-400" />
              </motion.div>
              <h3 className="text-lg font-bold text-white text-center">Votre besoin est identifié !</h3>
              <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2 text-sm text-gray-300">
                <div><span className="text-brand-yellow font-semibold">Service :</span> {typeLabel}</div>
                <div><span className="text-brand-yellow font-semibold">Précision :</span> {detail}</div>
                {location && <div><span className="text-brand-yellow font-semibold">Lieu :</span> {location}</div>}
                {budget && <div><span className="text-brand-yellow font-semibold">Budget :</span> {budget}</div>}
              </div>
              <p className="text-gray-400 text-sm text-center">
                Nous vous recommandons de contacter directement notre expert via WhatsApp.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <Phone size={16} />WhatsApp
              </a>
              <button
                onClick={reset}
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Recommencer
              </button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  // ----------------------------------------------------------------------
  // Rendu global : bouton flottant + panneau
  // ----------------------------------------------------------------------
  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-5 md:right-10 z-50 flex items-center gap-2 bg-brand-yellow text-black rounded-full p-3 md:p-4 shadow-[0_0_30px_rgba(250,204,21,0.3)] hover:scale-105 transition-transform"
        aria-label="Assistant APO"
      >
        <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
        <span className="hidden md:inline text-sm font-bold uppercase tracking-wider">Assistant</span>
      </button>

      {/* Panneau latéral */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end"
          >
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-sm md:max-w-md bg-[#0f0602]/95 backdrop-blur-2xl border-l border-white/10 h-full overflow-y-auto flex flex-col"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-[#0f0602]/90 backdrop-blur-md border-b border-white/10">
                <span className="text-white font-bold font-heading text-sm">Assistant APO</span>
                <button onClick={handleClose} className="p-2 text-gray-400 hover:text-white">
                  <X size={18} />
                </button>
              </div>

              {/* Contenu avec progression */}
              <div className="flex-1 p-5">
                {/* Barre de progression */}
                {step !== "welcome" && step !== "summary" && (
                  <div className="w-full h-1 bg-white/10 rounded-full mb-6">
                    <motion.div
                      className="h-full bg-brand-yellow rounded-full"
                      initial={{ width: "0%" }}
                      animate={{
                        width:
                          step === "projectType"
                            ? "25%"
                            : step === "details"
                            ? "50%"
                            : step === "location"
                            ? "75%"
                            : "100%",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
                {renderStep()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
