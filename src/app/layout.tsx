import type { Metadata } from "next";
import AssistantAPO from "@/components/AssistantAPO";
import "./globals.css";

export const metadata: Metadata = {
  title: "APO GROUP - Solutions en Forage, Topographie et Immobilier",
  description: "APO GROUP accompagne particuliers, entreprises et investisseurs avec des solutions fiables, rapides et professionnelles au Cameroun.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark antialiased scroll-smooth">
      <body className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans selection:bg-water-500/30 selection:text-white">
        {children}
        <AssistantAPO />
      </body>
    </html>
  );
}
