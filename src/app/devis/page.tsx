"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/devis/ProgressBar";
import StepService from "@/components/devis/StepService";
import StepDetails from "@/components/devis/StepDetails";
import StepContact from "@/components/devis/StepContact";
import StepUpload from "@/components/devis/StepUpload";

const TOTAL_STEPS = 5;

export default function DevisPage() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [details, setDetails] = useState<Record<string, string>>({});
  const [contact, setContact] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);

  const canNext = () => {
    if (step === 1) return !!service;
    if (step === 2) return true;
    if (step === 3) return contact.name && contact.email;
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/devis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service,
        details,
        contact,
        files: files.map((f) => f.name),
      }),
    });
    const data = await res.json();
    if (data.success) {
      setReference(data.reference);
      setSubmitted(true);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="pt-32 pb-20 px-5 md:px-10 max-w-3xl mx-auto">
        <ProgressBar step={step} total={TOTAL_STEPS} />

        {!submitted ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && <StepService selected={service} onSelect={(s) => setService(s)} />}
              {step === 2 && <StepDetails service={service} details={details} setDetails={setDetails} />}
              {step === 3 && <StepContact contact={contact} setContact={setContact} />}
              {step === 4 && <StepUpload files={files} setFiles={setFiles} />}
              {step === 5 && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold font-heading text-white mb-6">Résumé de votre demande</h2>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2 text-sm text-gray-300">
                    <p><span className="text-brand-yellow font-semibold">Service :</span> {service}</p>
                    {Object.entries(details).map(([k, v]) => (
                      <p key={k}><span className="text-brand-yellow font-semibold">{k} :</span> {v}</p>
                    ))}
                    <p><span className="text-brand-yellow font-semibold">Nom :</span> {contact.name}</p>
                    <p><span className="text-brand-yellow font-semibold">Email :</span> {contact.email}</p>
                    <p><span className="text-brand-yellow font-semibold">Téléphone :</span> {contact.phone}</p>
                    <p><span className="text-brand-yellow font-semibold">Ville :</span> {contact.city}</p>
                    {files.length > 0 && (
                      <p><span className="text-brand-yellow font-semibold">Fichiers :</span> {files.length} document(s)</p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-12"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold font-heading text-white mb-2">Demande envoyée !</h2>
            <p className="text-gray-400 mb-2">Référence : <span className="text-brand-yellow">{reference}</span></p>
            <p className="text-gray-400 text-sm">Un email de confirmation vous a été envoyé.</p>
          </motion.div>
        )}

        {!submitted && (
          <div className="flex justify-between mt-10">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 border border-white/20 text-white rounded-full font-bold"
              >
                Retour
              </button>
            )}
            <div className="flex-1" />
            {step < TOTAL_STEPS ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canNext()}
                className="px-8 py-3 bg-brand-yellow text-black rounded-full font-bold uppercase disabled:opacity-50"
              >
                Suivant
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-3 bg-green-600 text-white rounded-full font-bold uppercase flex items-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Envoyer ma demande"}
              </button>
            )}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
