"use client";

import StartButton from "@/components/start-button";
import Link from "next/link";
import { useState } from "react";

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
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      <GridBackground />

      {/* Hero Section */}
      <div className="text-center max-w-5xl transition-all duration-1000 font-sans">
        <h1 
          className="text-6xl md:text-8xl font-display bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent"
          style={{ animation: 'glow 3s ease-in-out infinite' }}
        >
          CodeCoach
        </h1>

        {/* <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
          Master competitive programming with{' '}
          <span className="text-green-400 font-semibold">personalized daily challenges</span>
          {' '}from Codeforces
        </p> */}

        <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
          Tailored problems based on your rating, preferred topics, and learning goals. 
          Progress from beginner to expert with intelligent problem selection.
        </p>

        <StartButton />

        <div className="flex justify-center items-center">
          {[
            { value: '10K+', label: 'Problems' },
            { value: '5K+', label: 'Active Users' },
            { value: '15+', label: 'Topics' }
          ].map((stat, idx) => (
            <div 
              key={idx}
              className="w-40 transition-all duration-700"
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