import { Upload } from "lucide-react";
import { useRef } from "react";

export default function StepUpload({ files, setFiles }: { files: File[]; setFiles: (f: File[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const MAX = 6;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected) return;
    setFiles([...files, ...Array.from(selected)].slice(0, MAX));
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold font-heading text-white mb-4">Documents (optionnel)</h2>
      <p className="text-gray-400 text-sm mb-4">Ajoutez des images, PDF ou plans. Max {MAX} fichiers.</p>
      <div className="border border-white/10 rounded-xl p-6 bg-white/5 text-center">
        <Upload className="w-8 h-8 mx-auto text-brand-yellow mb-2" />
        <label className="cursor-pointer text-sm text-white hover:underline">
          Cliquez pour ajouter des fichiers
          <input ref={inputRef} type="file" multiple onChange={handleChange} className="hidden" />
        </label>
      </div>
      {files.length > 0 && (
        <ul className="mt-4 space-y-1 text-sm text-gray-300">
          {files.map((f, i) => (
            <li key={i}>📎 {f.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
