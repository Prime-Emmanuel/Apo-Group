const questions: Record<string, { label: string; placeholder: string }[]> = {
  immobilier: [
    { label: "Type de terrain recherché", placeholder: "Résidentiel, commercial…" },
    { label: "Ville souhaitée", placeholder: "Yaoundé, Douala…" },
    { label: "Budget approximatif (FCFA)", placeholder: "ex: 10 000 000" },
    { label: "Superficie souhaitée (m²)", placeholder: "ex: 500" },
  ],
  topographie: [
    { label: "Type de prestation", placeholder: "Bornage, lotissement…" },
    { label: "Localisation du terrain", placeholder: "Ville, quartier" },
    { label: "Superficie du terrain (m²)", placeholder: "ex: 2000" },
  ],
  forage: [
    { label: "Usage de l'eau", placeholder: "Habitation, agricole…" },
    { label: "Localisation du terrain", placeholder: "Ville, quartier" },
    { label: "Profondeur estimée (m)", placeholder: "ex: 30" },
  ],
  btp: [
    { label: "Type de construction", placeholder: "Maison, immeuble…" },
    { label: "Localisation", placeholder: "Ville, quartier" },
    { label: "Budget estimé (FCFA)", placeholder: "ex: 50 000 000" },
  ],
};

export default function StepDetails({
  service,
  details,
  setDetails,
}: {
  service: string;
  details: Record<string, string>;
  setDetails: (d: Record<string, string>) => void;
}) {
  const qs = questions[service] || [];
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold font-heading text-white mb-6">Détails du projet</h2>
      {qs.map((q) => (
        <div key={q.label} className="mb-4">
          <label className="block text-sm text-white/70 mb-1">{q.label}</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500"
            placeholder={q.placeholder}
            value={details[q.label] || ""}
            onChange={(e) => setDetails({ ...details, [q.label]: e.target.value })}
          />
        </div>
      ))}
    </div>
  );
}
