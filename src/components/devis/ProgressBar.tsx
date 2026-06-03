export default function ProgressBar({ step, total }: { step: number; total: number }) {
  const percent = ((step - 1) / (total - 1)) * 100;
  return (
    <div className="w-full h-1 bg-white/10 rounded-full mb-8">
      <div
        className="h-full bg-brand-yellow rounded-full transition-all duration-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}  
