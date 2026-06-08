export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      {/* Background glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-water-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-earth-400/10 rounded-full blur-[150px]" />
      </div>

      <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-black font-heading tracking-tight mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
          404
        </span>
      </h1>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white mb-4">
        Page introuvable
      </h2>

      <p className="text-gray-400 text-sm md:text-base max-w-md">
        La page que vous recherchez n'existe pas.
      </p>
    </main>
  );
}
