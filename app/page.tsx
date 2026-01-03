"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

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

// Floating code snippets
const FloatingCode = ({ code, delay, top, left }: any) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`absolute hidden md:block bg-gray-900/80 backdrop-blur border border-green-500/20 rounded-lg px-3 py-2 text-green-400 font-mono text-xs transition-all duration-1000 ${
        isVisible ? 'opacity-60 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
      style={{ top, left, animation: 'float 6s ease-in-out infinite' }}
    >
      {code}
    </div>
  );
};

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      <GridBackground />

      {/* Floating Code Snippets */}
      <FloatingCode code="for(int i=0; i<n; i++)" delay={200} top="15%" left="10%" />
      <FloatingCode code="vector<int> dp(n+1)" delay={400} top="25%" left="85%" />
      <FloatingCode code="while(l <= r)" delay={600} top="70%" left="12%" />
      <FloatingCode code="sort(arr.begin())" delay={800} top="65%" left="82%" />

      {/* Hero Section */}
      <div className={`text-center max-w-5xl transition-all duration-1000 font-sans ${
          heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h1 
          className="text-6xl md:text-8xl font-display bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent"
          style={{ animation: 'glow 3s ease-in-out infinite' }}
        >
          CodeCoach
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
          Master competitive programming with{' '}
          <span className="text-green-400 font-semibold">personalized daily challenges</span>
          {' '}from Codeforces
        </p>

        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          Tailored problems based on your rating, preferred topics, and learning goals. 
          Progress from beginner to expert with intelligent problem selection.
        </p>

        <Link href="/problems">
          <button
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
            className="mb-12 relative px-8 py-4 bg-green-500 cursor-pointer hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:shadow-2xl hover:shadow-green-500/50"
          >
            <span className="relative z-10">Start Coding Today</span>
          </button>
        </Link>

        <div className="flex justify-center items-center">
          {[
            { value: '10K+', label: 'Problems' },
            { value: '5K+', label: 'Active Users' },
            { value: '15+', label: 'Topics' }
          ].map((stat, idx) => (
            <div 
              key={idx}
              className={`w-40 transition-all duration-700 delay-${idx * 100} ${
                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}