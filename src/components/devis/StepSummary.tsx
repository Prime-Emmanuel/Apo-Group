export default function StepSummary({ data }: { data: any }) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold font-heading text-white mb-6">Résumé de votre demande</h2>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2 text-sm text-gray-300">
        <p><span className="text-brand-yellow font-semibold">Service :</span> {data.service}</p>
        {Object.entries(data.details).map(([k, v]) => (
          <p key={k}><span className="text-brand-yellow font-semibold">{k} :</span> {v}</p>
        ))}
        <p><span className="text-brand-yellow font-semibold">Nom :</span> {data.contact.name}</p>
        <p><span className="text-brand-yellow font-semibold">Email :</span> {data.contact.email}</p>
        <p><span className="text-brand-yellow font-semibold">Téléphone :</span> {data.contact.phone}</p>
        <p><span className="text-brand-yellow font-semibold">Ville :</span> {data.contact.city}</p>
        {data.files.length > 0 && (
          <p><span className="text-brand-yellow font-semibold">Fichiers :</span> {data.files.length} document(s)</p>
        )}
      </div>
    </div>
  );
}
