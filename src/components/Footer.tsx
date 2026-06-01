import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050201] pt-24 pb-12">
      <div className="container mx-auto px-5 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image src="/logo.png" alt="APO GROUP Logo" width={40} height={40} className="object-contain" />
              <span className="text-2xl font-black tracking-widest font-heading">
                <span className="text-water-500">APO</span> <span className="text-brand-yellow">GROUP</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Des solutions modernes en forage, topographie et immobilier au Cameroun. L'excellence à votre service.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold font-heading mb-6 uppercase tracking-wider text-sm border-b border-white/10 pb-4 inline-block">Services</h4>
            <ul className="space-y-4">
              <li><Link href="#services" className="text-gray-400 hover:text-water-400 text-sm font-medium transition-colors">Forage & Eau</Link></li>
              <li><Link href="#services" className="text-gray-400 hover:text-earth-400 text-sm font-medium transition-colors">Topographie</Link></li>
              <li><Link href="#services" className="text-gray-400 hover:text-earth-400 text-sm font-medium transition-colors">Immobilier & Foncier</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold font-heading mb-6 uppercase tracking-wider text-sm border-b border-white/10 pb-4 inline-block">Liens Rapides</h4>
            <ul className="space-y-4">
              <li><Link href="#pourquoi-nous" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Pourquoi nous</Link></li>
              <li><Link href="#realisations" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Nos Réalisations</Link></li>
              <li><Link href="#processus" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Comment ça marche</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold font-heading mb-6 uppercase tracking-wider text-sm border-b border-white/10 pb-4 inline-block">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                <MapPin className="w-5 h-5 text-earth-500" />
                Douala, Logpom
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                <Phone className="w-5 h-5 text-water-500" />
                +237 000 000 000
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                <Mail className="w-5 h-5 text-brand-yellow" />
                contact@apogroup.com
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-medium text-gray-600">
          <p>© {new Date().getFullYear()} APO GROUP. Tous droits réservés.</p>
          <p className="mt-4 md:mt-0 uppercase tracking-widest text-[10px]">Développé avec excellence</p>
        </div>
      </div>
    </footer>
  );
}
