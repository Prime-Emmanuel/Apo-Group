"use client";
import { motion } from "framer-motion";

export default function Gallery() {
  const projects = [
    { type: "water", title: "Forage Industriel à Douala", span: "md:col-span-2 md:row-span-2" },
    { type: "earth", title: "Levé Topographique, Kribi", span: "md:col-span-1 md:row-span-1" },
    { type: "earth", title: "Sécurisation Foncière", span: "md:col-span-1 md:row-span-1" },
    { type: "water", title: "Installation Pompe Solaire", span: "md:col-span-1 md:row-span-2" },
    { type: "earth", title: "Lotissement Premium", span: "md:col-span-2 md:row-span-1" },
  ];

  return (
    <section id="realisations" className="py-24 md:py-40 bg-[#0a0401] relative border-t border-white/5">
      <div className="container mx-auto px-5 md:px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24 flex flex-col items-center"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-brand-yellow"></div>
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-brand-yellow">Portfolio</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-brand-yellow"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 font-heading tracking-tight">
            Galerie <span className="text-white">Premium</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-lg">
            Découvrez nos dernières réalisations. Des images valent mieux qu'un long discours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 md:gap-6 h-auto md:h-[800px]">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative rounded-3xl overflow-hidden group cursor-pointer ${project.span} h-[250px] md:h-auto bg-white/5 border border-white/10`}
            >
              {/* Premium Placeholder Gradient instead of image for now */}
              <div className={`absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 bg-gradient-to-br ${
                project.type === 'water' ? 'from-water-500 to-transparent' : 'from-earth-500 to-transparent'
              }`} />
              
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-4 group-hover:translate-y-0 opacity-80 group-hover:opacity-100 transition-all duration-500">
                <div className={`w-10 h-1 mt-4 mb-4 rounded-full ${
                  project.type === 'water' ? 'bg-water-500' : 'bg-earth-500'
                }`} />
                <h3 className="text-xl md:text-2xl font-bold text-white font-heading">{project.title}</h3>
                <p className="text-sm font-semibold text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 uppercase tracking-wider">Voir le projet →</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
