'use client';

import { useState, useEffect } from 'react';

const ANALYSIS_PHASES = [
  'Querying regional search query momentum...',
  'Evaluating industrial and trade data...',
  'Analyzing competitor saturation in local mandis/clusters...',
  'Synthesizing highest-conviction market gaps...'
];

export default function LoadingState({ message = 'Analyzing market signals...' }) {
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhaseIndex((prev) => (prev < ANALYSIS_PHASES.length - 1 ? prev + 1 : prev));
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clay-card p-10 max-w-lg mx-auto text-center space-y-6">
      {/* Monochrome Minimal Spinner & Pulse */}
      <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
        <div className="absolute inset-0 rounded-full border-2 border-t-white border-r-white/30 border-b-transparent border-l-transparent animate-spin" />
        <div className="w-4 h-4 rounded-full bg-white/20 animate-pulse-subtle" />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium text-white tracking-tight">{message}</h3>
        <p className="text-xs text-[#A3A3A3] font-mono h-5 transition-all duration-300">
          {ANALYSIS_PHASES[phaseIndex]}
        </p>
      </div>

      {/* Subtle Step Bar */}
      <div className="w-48 mx-auto h-1 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-700 ease-out"
          style={{ width: `${((phaseIndex + 1) / ANALYSIS_PHASES.length) * 100}%` }}
        />
      </div>

      <p className="text-[11px] text-[#737373] tracking-wide">
        Cross-referencing verified Indian trade, search, and demographic registers
      </p>
    </div>
  );
}
