import React, { Suspense } from 'react';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import HomePage from './components/HomePage';
import ParticleBackground from './components/ParticleBackground';

export default function App() {
  return (
    <div className="min-h-screen relative">
      {/* Base background with gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Particle effect layer */}
      <ParticleBackground />
      
      {/* Main content */}
      <div className="relative">
        <Header />
        <Suspense fallback={<LoadingSpinner />}>
          <HomePage />
        </Suspense>
      </div>
    </div>
  );
}