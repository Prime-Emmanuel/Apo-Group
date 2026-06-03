export default function StepContact({
  contact,
  setContact,
}: {
  contact: Record<string, string>;
  setContact: (c: Record<string, string>) => void;
}) {
  const fields = [
    { key: "name", label: "Nom complet", required: true },
    { key: "phone", label: "Téléphone" },
    { key: "whatsapp", label: "WhatsApp" },
    { key: "email", label: "Email", required: true },
    { key: "city", label: "Ville" },
    { key: "quarter", label: "Quartier" },
  ];
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold font-heading text-white mb-6">Vos coordonnées</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="block text-sm text-white/70 mb-1">
              {f.label} {f.required && <span className="text-red-400">*</span>}
            </label>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500"
              value={contact[f.key] || ""}
              onChange={(e) => setContact({ ...contact, [f.key]: e.target.value })}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
