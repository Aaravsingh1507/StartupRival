'use client';

import { Check, X, Scale } from 'lucide-react';
import ClayCard from './ClayCard';
import Button from './Button';

export default function IdeaComparisonTable({ comparison, onClose }) {
  if (!comparison) return null;

  const { idea_1, idea_2 } = comparison;

  const comparisonRows = [
    { label: 'Demand Score', val1: `${idea_1.demand_score}/100`, val2: `${idea_2.demand_score}/100`, mono: true },
    { label: 'Market Status', val1: idea_1.status, val2: idea_2.status, badge: true },
    { label: 'Competition Density', val1: idea_1.competition_level, val2: idea_2.competition_level },
    { label: 'Estimated Investment', val1: idea_1.estimated_investment, val2: idea_2.estimated_investment, mono: true },
    { label: 'Target Persona', val1: idea_1.target_market, val2: idea_2.target_market },
    { label: 'Regional Fit', val1: idea_1.regional_fit, val2: idea_2.regional_fit },
    { label: 'Difficulty of Entry', val1: idea_1.difficulty_entry, val2: idea_2.difficulty_entry },
    { label: 'Uncontested Gap City', val1: idea_1.top_gap_city, val2: idea_2.top_gap_city, mono: true },
    { label: 'Primary Moat / Advantage', val1: idea_1.top_advantage, val2: idea_2.top_advantage },
    { label: 'Critical Risk / Uncertainty', val1: idea_1.key_uncertainty, val2: idea_2.key_uncertainty }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-white" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#737373]">
              Side-by-Side Trade-off Analysis
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Compare Startup Opportunities</h2>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#A3A3A3] hover:text-white bg-[#151515] border border-white/10 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/15 bg-[#121212]">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-[#171717]">
              <th className="p-4 text-[#A3A3A3] font-medium w-1/4">Evaluation Vector</th>
              <th className="p-4 text-white font-semibold w-3/8 border-l border-white/10">
                <span className="text-[10px] font-mono uppercase text-[#737373] block">Option A</span>
                <span className="text-sm block">{idea_1.name}</span>
                <span className="text-[11px] text-[#A3A3A3] font-normal">{idea_1.sector} • {idea_1.region}</span>
              </th>
              <th className="p-4 text-white font-semibold w-3/8 border-l border-white/10">
                <span className="text-[10px] font-mono uppercase text-[#737373] block">Option B</span>
                <span className="text-sm block">{idea_2.name}</span>
                <span className="text-[11px] text-[#A3A3A3] font-normal">{idea_2.sector} • {idea_2.region}</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {comparisonRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4 text-[#A3A3A3] font-medium bg-[#141414]/50">{row.label}</td>
                <td className="p-4 text-[#EDEDED] border-l border-white/10 leading-relaxed">
                  {row.badge ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">
                      <span className="w-1.5 h-1.5 rotate-45 bg-white inline-block" />
                      {row.val1}
                    </span>
                  ) : (
                    <span className={row.mono ? 'font-mono text-white font-medium' : ''}>{row.val1}</span>
                  )}
                </td>
                <td className="p-4 text-[#EDEDED] border-l border-white/10 leading-relaxed">
                  {row.badge ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">
                      <span className="w-1.5 h-1.5 rotate-45 bg-white inline-block" />
                      {row.val2}
                    </span>
                  ) : (
                    <span className={row.mono ? 'font-mono text-white font-medium' : ''}>{row.val2}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 rounded-xl bg-[#151515] border border-white/10 text-xs text-[#A3A3A3] flex items-center justify-between">
        <p className="leading-relaxed">
          <strong>Strategic Trade-off Summary:</strong> Option A requires higher capital with stronger government subsidy backing. Option B requires lower upfront setup with higher repeat consumer frequency.
        </p>
      </div>
    </div>
  );
}
