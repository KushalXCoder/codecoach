export default function Home() {
  return (
    <div className="h-screen w-full relative flex flex-col justify-center items-center">
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #010133 100%)",
        }}
      />
      <h1 className="text-green-400 text-6xl z-10 font-display">CodeCoach</h1>
      <p className="rounded-3xl border border-gray-700 font-sans text-lg px-4 py-1 mt-3 text-white/80">Coming Soon !</p>
    </div>
  );
}