"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Send, User, Bot, Phone } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AssistantAPO() {
  const [isOpen, setIsOpen] = useState(false);
 const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Bonjour";
  if (hour < 18) return "Bon après‑midi";
  return "Bonsoir";
};

const [messages, setMessages] = useState<Message[]>([
  { role: "assistant", content: `${getGreeting()} ! Je suis l'assistant APO GROUP. Comment puis-je vous aider ?` },
]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [locked, setLocked] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  useEffect(() => { if (isOpen) inputRef.current?.focus(); }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading || locked) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
      if (data.locked) setLocked(true);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Une erreur est survenue." }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => e.key === "Enter" && handleSend();

  const resetChat = () => {
    setMessages([{ role: "assistant", content: "Bonjour ! Je suis l'assistant APO GROUP. Comment puis-je vous aider ?" }]);
    setLocked(false);
  };

  return (
    <>
      <button
  id="assistant-floating-btn"
  onClick={() => setIsOpen(!isOpen)}
  className="fixed bottom-6 right-5 md:right-10 z-50 flex items-center gap-2 bg-brand-yellow text-black rounded-full p-3 md:p-4 shadow-[0_0_30px_rgba(250,204,21,0.3)] hover:scale-105 transition-transform"
  aria-label="Assistant APO"
>
  <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
  <span className="hidden md:inline text-sm font-bold uppercase tracking-wider">Assistant</span>
</button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="relative w-full max-w-sm md:max-w-md bg-[#0f0602]/95 backdrop-blur-2xl border-l border-white/10 h-full flex flex-col">
              <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-[#0f0602]/90 backdrop-blur-md border-b border-white/10">
                <div className="flex items-center gap-2"><Bot className="w-5 h-5 text-brand-yellow" /><span className="text-white font-bold font-heading text-sm">Assistant APO</span></div>
                <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-white"><X size={18} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex items-start gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
                    {msg.role === "assistant" && <div className="w-6 h-6 rounded-full bg-brand-yellow/20 flex items-center justify-center shrink-0"><Bot className="w-4 h-4 text-brand-yellow" /></div>}
                    <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${msg.role === "user" ? "bg-brand-yellow text-black rounded-br-sm" : "bg-white/10 text-white rounded-bl-sm"}`}>{msg.content}</div>
                    {msg.role === "user" && <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0"><User className="w-4 h-4 text-gray-300" /></div>}
                  </div>
                ))}
                {loading && (
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-brand-yellow/20 flex items-center justify-center"><Bot className="w-4 h-4 text-brand-yellow" /></div>
                    <div className="bg-white/10 text-white rounded-2xl rounded-bl-sm px-4 py-2 text-sm">...</div>
                  </div>
                )}
                {locked && (
                  <div className="text-center text-red-400 text-xs mt-2">
                    <button onClick={resetChat} className="underline hover:text-red-300">Recommencer</button>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
              <div className="p-3 border-t border-white/10 bg-black/40">
                <div className="flex items-center gap-2">
                  <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder={locked ? "Conversation verrouillée" : "Écrivez votre message..."} disabled={locked || loading} className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow disabled:opacity-50 text-sm" />
                  <button onClick={handleSend} disabled={!input.trim() || loading || locked} className="p-2 rounded-full bg-brand-yellow text-black disabled:opacity-50"><Send size={16} /></button>
                </div>
                <div className="mt-2 text-center">
                  <a href="https://wa.me/237650331995?text=Bonjour%20APO%20GROUP,%20je%20souhaite%20parler%20à%20un%20expert." target="_blank" rel="noopener noreferrer" className="text-xs text-green-400 hover:text-green-300 inline-flex items-center gap-1"><Phone size={12} /> Parler à un expert WhatsApp</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
