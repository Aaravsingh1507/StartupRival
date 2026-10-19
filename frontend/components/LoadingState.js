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
    <div className="bg-[#08152B]/90 backdrop-blur-xl border border-[#39BAFF]/30 rounded-2xl p-8 max-w-lg mx-auto text-center space-y-6 shadow-[0_12px_45px_rgba(3,7,18,0.7)]">
      {/* Electric Blue & Cyan Futuristic Spinner */}
      <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-[#39BAFF]/20" />
        <div className="absolute inset-0 rounded-full border-2 border-t-[#39BAFF] border-r-[#0866F5] border-b-transparent border-l-transparent animate-spin shadow-[0_0_15px_rgba(57,186,255,0.5)]" />
        <div className="w-4 h-4 rounded-full bg-[#0866F5] shadow-[0_0_10px_rgba(8,102,245,0.8)] animate-pulse" />
      </div>

      <div className="space-y-2">
        <h3 className="text-base font-bold text-[#F4F8FF] tracking-tight">{message}</h3>
        <p className="text-xs text-[#39BAFF] font-mono h-5 transition-all duration-300">
          {ANALYSIS_PHASES[phaseIndex]}
        </p>
      </div>

      {/* Electric Blue Gradient Step Bar */}
      <div className="w-56 mx-auto h-1.5 rounded-full bg-[#0C1E3D] overflow-hidden border border-[#39BAFF]/20 p-0.5">
        <div
          className="h-full bg-gradient-to-r from-[#0866F5] to-[#39BAFF] rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(57,186,255,0.8)]"
          style={{ width: `${((phaseIndex + 1) / ANALYSIS_PHASES.length) * 100}%` }}
        />
      </div>

      <p className="text-xs text-[#8EABCF] tracking-wide">
        Cross-referencing verified Indian trade, search, and demographic registers
      </p>
    </div>
  );
}
