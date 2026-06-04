"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Send, User, Bot, Phone, Clock, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Page-specific config
const pageConfig: Record<string, { greeting: string; hints: string[] }> = {
  "/": {
    greeting: "Bienvenue sur APO GROUP. Je suis votre consultant virtuel. Comment puis-je vous orienter ?",
    hints: [
      "Besoin d'aide pour choisir un service ?",
      "Découvrez nos solutions en forage, topographie et immobilier.",
      "Un projet ? Je vous guide étape par étape.",
    ],
  },
  "/forage": {
    greeting: "Vous êtes sur la page Forage. Je peux vous expliquer chaque étape, de l'étude à l'installation.",
    hints: [
      "Découvrez comment nous réalisons un forage.",
      "L'étude hydrogéologique est indispensable.",
      "Forage manuel ou motorisé ? Je vous explique.",
    ],
  },
  "/topographie": {
    greeting: "Bienvenue sur la page Topographie. Avez-vous des questions sur le bornage ou les plans ?",
    hints: [
      "Avant tout projet, pensez au plan topographique.",
      "Le bornage protège votre terrain.",
      "Nos plans sont reconnus par le cadastre.",
    ],
  },
  "/immobilier": {
    greeting: "Vous êtes sur la page Immobilier. Je peux vous guider pour un achat de terrain sécurisé.",
    hints: [
      "Vérifiez toujours les documents avant d'acheter.",
      "Un terrain sans titre foncier est un risque.",
      "Je vous explique la procédure complète.",
    ],
  },
  "/devis": {
    greeting: "Je peux vous aider à remplir votre demande de devis. Quelle information vous manque ?",
    hints: [
      "Choisissez le bon service pour votre projet.",
      "Plus vous donnez de détails, plus le devis sera précis.",
      "Besoin d'aide pour les documents à fournir ?",
    ],
  },
};

const defaultConfig = {
  greeting: "Bonjour ! Je suis l'assistant APO GROUP. Comment puis-je vous aider ?",
  hints: ["Posez-moi vos questions !", "Je suis là pour vous orienter.", "Contactez un expert à tout moment."],
};

// Service links for button rendering
const serviceLinks: Record<string, { label: string; url: string }> = {
  forage: { label: "Page Forage", url: "/forage" },
  topographie: { label: "Page Topographie", url: "/topographie" },
  immobilier: { label: "Page Immobilier", url: "/immobilier" },
  devis: { label: "Demander un devis", url: "/devis" },
};

function parseLinks(text: string): (string | { label: string; url: string })[] {
  const parts: (string | { label: string; url: string })[] = [];
  const regex = /\[\[link:(\w+)\]\]/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const key = match[1];
    if (serviceLinks[key]) {
      parts.push(serviceLinks[key]);
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

export default function AssistantAPO() {
  const pathname = usePathname();
  const config = pageConfig[pathname] || defaultConfig;

  const getGreeting = () => {
    const hour = new Date().getHours();
    const timePrefix = hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir";
    return `${timePrefix} ! ${config.greeting}`;
  };

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: getGreeting() },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [locked, setLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  const [hintIndex, setHintIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Rotate hints
  useEffect(() => {
    const interval = setInterval(() => {
      setHintIndex((prev) => (prev + 1) % config.hints.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [config.hints]);

  // Dismiss hint on mobile after 5s
  useEffect(() => {
    if (!showHint) return;
    const timeout = setTimeout(() => setShowHint(false), 10000);
    return () => clearTimeout(timeout);
  }, [showHint, hintIndex]);

  // Countdown timer
  useEffect(() => {
    if (!locked || lockTimer <= 0) return;
    const interval = setInterval(() => {
      setLockTimer((prev) => {
        if (prev <= 1) {
          setLocked(false);
          setMessages([{ role: "assistant", content: getGreeting() }]);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [locked, lockTimer]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading || locked) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
      if (data.locked) {
        setLocked(true);
        setLockTimer(120); // 2 minutes
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Une erreur est survenue." }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {/* Floating button with hint */}
      <div className="fixed bottom-6 right-5 md:right-10 z-50 flex items-center gap-3">
        {/* Proactive hint */}
        {showHint && !locked && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="hidden md:block bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-2 text-xs text-gray-300 max-w-[200px] shadow-lg"
          >
            {config.hints[hintIndex]}
          </motion.div>
        )}

        <button
          id="assistant-floating-btn"
          onClick={() => {
            if (locked) {
              setShowHint(true);
              return;
            }
            setIsOpen(!isOpen);
          }}
          className={`flex items-center gap-2 rounded-full p-3 md:p-4 shadow-lg transition-transform hover:scale-105 ${
            locked
              ? "bg-red-500/20 text-red-400 cursor-not-allowed"
              : "bg-brand-yellow text-black shadow-[0_0_30px_rgba(250,204,21,0.3)]"
          }`}
          aria-label={locked ? "Assistant verrouillé" : "Assistant APO"}
        >
          {locked ? (
            <>
              <Clock className="w-5 h-5 md:w-6 md:h-6" />
              <span className="hidden md:inline text-sm font-bold">{formatTime(lockTimer)}</span>
            </>
          ) : (
            <>
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
              <span className="hidden md:inline text-sm font-bold uppercase tracking-wider">Assistant</span>
            </>
          )}
        </button>
      </div>

      {/* Locked toast for mobile */}
      <AnimatePresence>
        {locked && showHint && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-5 right-5 z-50 md:hidden bg-red-500/10 border border-red-500/30 backdrop-blur-xl rounded-2xl p-4 text-center"
          >
            <p className="text-red-400 text-sm font-semibold">Assistant momentanément indisponible</p>
            <p className="text-gray-400 text-xs mt-1">Réessayez dans {formatTime(lockTimer)}</p>
            <button
              onClick={() => setShowHint(false)}
              className="mt-2 text-xs text-gray-500 underline"
            >
              Fermer
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && !locked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-sm md:max-w-md bg-[#0f0602]/95 backdrop-blur-2xl border-l border-white/10 h-full flex flex-col"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-[#0f0602]/90 backdrop-blur-md border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-brand-yellow" />
                  <span className="text-white font-bold font-heading text-sm">Assistant APO</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-white">
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex items-start gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
                    {msg.role === "assistant" && (
                      <div className="w-6 h-6 rounded-full bg-brand-yellow/20 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-brand-yellow" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                        msg.role === "user"
                          ? "bg-brand-yellow text-black rounded-br-sm"
                          : "bg-white/10 text-white rounded-bl-sm"
                      }`}
                    >
                      {msg.role === "assistant"
                        ? parseLinks(msg.content).map((part, j) =>
                            typeof part === "string" ? (
                              <span key={j}>{part}</span>
                            ) : (
                              <a
                                key={j}
                                href={part.url}
                                className="inline-flex items-center gap-1 mt-2 px-3 py-1.5 bg-brand-yellow/10 border border-brand-yellow/30 rounded-full text-brand-yellow text-xs font-semibold hover:bg-brand-yellow/20 transition-colors"
                              >
                                {part.label} <ArrowRight size={12} />
                              </a>
                            )
                          )
                        : msg.content}
                    </div>
                    {msg.role === "user" && (
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-gray-300" />
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-brand-yellow/20 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-brand-yellow" />
                    </div>
                    <div className="bg-white/10 text-white rounded-2xl rounded-bl-sm px-4 py-2 text-sm">...</div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <div className="p-3 border-t border-white/10 bg-black/40">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Écrivez votre message..."
                    disabled={loading}
                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow disabled:opacity-50 text-sm"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || loading}
                    className="p-2 rounded-full bg-brand-yellow text-black disabled:opacity-50"
                  >
                    <Send size={16} />
                  </button>
                </div>
                <div className="mt-2 text-center">
                  <a
                    href="https://wa.me/237650331995?text=Bonjour%20APO%20GROUP,%20je%20souhaite%20parler%20à%20un%20expert."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-green-400 hover:text-green-300 inline-flex items-center gap-1"
                  >
                    <Phone size={12} /> Parler à un expert WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
