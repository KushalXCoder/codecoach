"use client";

import StartButton from "@/components/start-button";
import { NumberTicker } from "@/components/ui/number-ticker";

// Animated background grid
const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0" style={{
      backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                       linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)`,
      backgroundSize: '50px 50px',
      animation: 'grid-move 20s linear infinite'
    }} />
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      <GridBackground />

      <div className="flex flex-1 flex-col justify-center items-center">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center max-w-5xl transition-all duration-1000 font-sans">
          <a className="mb-3" href="https://www.producthunt.com/products/codecoach-3?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-codecoach-3" target="_blank" rel="noopener noreferrer">
            <img alt="CodeCoach - Practice personal curated codeforces questions | Product Hunt" width="200" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1063902&amp;theme=light&amp;t=1768919030689" />
          </a>
          <h1 
            className="text-6xl md:text-8xl font-display bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent"
            style={{ animation: 'glow 3s ease-in-out infinite' }}
          >
            CodeCoach
          </h1>

          <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
            Tailored problems based on your rating, preferred topics, and learning goals. 
            Progress from beginner to expert with intelligent problem selection.
          </p>

          <StartButton />

          <div className="flex justify-center items-center">
            {[
              { value: '10', label: 'Problems' },
              { value: '15', label: 'Topics' }
            ].map((stat, idx) => (
              <div 
                key={idx}
                className="w-30 transition-all duration-700"
              >
              <div>
                <NumberTicker
                  value={Number(stat.value)}
                  className="text-3xl md:text-4xl font-bold text-green-400 mb-2"
                />
                <span className="text-3xl md:text-4xl font-bold text-green-400 mb-2">{stat.label === 'Topics' ? '+' : 'K+'}</span>
              </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}