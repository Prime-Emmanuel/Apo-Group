"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type ModalType = "quote" | "study" | null;

interface ModalContextProps {
  activeModal: ModalType;
  openQuoteModal: () => void;
  openStudyModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openQuoteModal = () => setActiveModal("quote");
  const openStudyModal = () => setActiveModal("study");
  const closeModal = () => setActiveModal(null);

  return (
    <ModalContext.Provider value={{ activeModal, openQuoteModal, openStudyModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}