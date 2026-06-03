const services = [
  { id: "immobilier", label: "Immobilier", icon: "🏡" },
  { id: "topographie", label: "Topographie", icon: "🗺️" },
  { id: "forage", label: "Forage", icon: "💧" },
  { id: "btp", label: "BTP", icon: "🏗️" },
];

export default function StepService({ selected, onSelect }: { selected: string; onSelect: (s: string) => void }) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold font-heading text-white mb-6">Choisissez un service</h2>
      <div className="grid grid-cols-2 gap-4">
        {services.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`p-6 rounded-2xl border text-center transition-all ${
              selected === s.id
                ? "bg-brand-yellow/10 border-brand-yellow"
                : "bg-white/5 border-white/10 hover:bg-white/10"
            }`}
          >
            <span className="text-4xl">{s.icon}</span>
            <p className="text-white font-bold mt-2">{s.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
