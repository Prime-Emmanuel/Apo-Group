import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Location from "@/components/Location";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { ModalProvider } from "@/context/ModalContext";
import QuoteModal from "@/components/modals/QuoteModal";
import StudyModal from "@/components/modals/StudyModal";

export default function Home() {
  return (
    <ModalProvider>
      <main className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <Hero />
        <WhyChooseUs />
        <Services />
        <Process />
        <Gallery />
        <Testimonials />
        <Location />
        <CTA />
        <Footer />
        <QuoteModal />
        <StudyModal />
      </main>
    </ModalProvider>
  );
}