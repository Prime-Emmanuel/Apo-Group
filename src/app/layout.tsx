import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "APO GROUP - Solutions en Forage, Topographie et Immobilier",
  description: "APO GROUP accompagne particuliers, entreprises et investisseurs avec des solutions fiables, rapides et professionnelles au Cameroun.",
icons: {
    icon: "/logo.png",  // path relative to public/ folder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${outfit.variable} dark antialiased scroll-smooth`}>
      <body className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans selection:bg-water-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
