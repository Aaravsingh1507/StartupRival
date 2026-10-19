'use client';

import { Check, X, Scale } from 'lucide-react';
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
    <div className="space-y-6 text-[#F4F8FF]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#39BAFF]/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#39BAFF]" />
            <span className="text-xs uppercase tracking-wider text-[#39BAFF] font-semibold">
              Side-by-Side Trade-off Analysis
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F4F8FF] tracking-tight">Compare Startup Opportunities</h2>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#8EABCF] hover:text-white bg-[#0C1E3D] border border-[#39BAFF]/30 hover:border-[#39BAFF]/60 transition cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-2xl border border-[#39BAFF]/25 bg-[#08152B]/90 backdrop-blur-md shadow-[0_8px_32px_rgba(3,7,18,0.5)]">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#39BAFF]/20 bg-[#0C1E3D]/80">
              <th className="p-4 text-[#8EABCF] font-semibold w-1/4">Evaluation Vector</th>
              <th className="p-4 text-[#F4F8FF] font-bold w-3/8 border-l border-[#39BAFF]/20">
                <span className="text-[10px] uppercase tracking-wider text-[#39BAFF] block font-mono">Option A</span>
                <span className="text-sm block text-[#F4F8FF]">{idea_1.name}</span>
                <span className="text-xs text-[#8EABCF] font-normal">{idea_1.sector} • {idea_1.region}</span>
              </th>
              <th className="p-4 text-[#F4F8FF] font-bold w-3/8 border-l border-[#39BAFF]/20">
                <span className="text-[10px] uppercase tracking-wider text-[#39BAFF] block font-mono">Option B</span>
                <span className="text-sm block text-[#F4F8FF]">{idea_2.name}</span>
                <span className="text-xs text-[#8EABCF] font-normal">{idea_2.sector} • {idea_2.region}</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#39BAFF]/15">
            {comparisonRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#0866F5]/10 transition-colors">
                <td className="p-4 text-[#8EABCF] font-medium bg-[#08152B]/60">{row.label}</td>
                <td className="p-4 text-[#F4F8FF] border-l border-[#39BAFF]/15 leading-relaxed">
                  {row.badge ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0866F5]/20 border border-[#39BAFF]/40 text-[#39BAFF] text-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                      {row.val1}
                    </span>
                  ) : (
                    <span className={row.mono ? 'font-mono text-[#39BAFF] font-bold' : ''}>{row.val1}</span>
                  )}
                </td>
                <td className="p-4 text-[#F4F8FF] border-l border-[#39BAFF]/15 leading-relaxed">
                  {row.badge ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0866F5]/20 border border-[#39BAFF]/40 text-[#39BAFF] text-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                      {row.val2}
                    </span>
                  ) : (
                    <span className={row.mono ? 'font-mono text-[#39BAFF] font-bold' : ''}>{row.val2}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-5 rounded-2xl bg-[#0C1E3D]/80 border border-[#39BAFF]/25 text-xs text-[#8EABCF] flex items-center justify-between">
        <p className="leading-relaxed">
          <strong className="text-[#39BAFF]">Strategic Trade-off Summary:</strong> Option A requires higher capital with stronger government subsidy backing. Option B requires lower upfront setup with higher repeat consumer frequency.
        </p>
      </div>
    </div>
  );
}
