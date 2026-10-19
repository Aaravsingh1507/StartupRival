'use client';

import { useState } from 'react';
import { Building2, MapPin, Target, BarChart2, ExternalLink, ShieldAlert, Sparkles, Navigation } from 'lucide-react';
import ClayCard from './ClayCard';
import Button from './Button';

export default function CompetitorRadar({ radarData }) {
  const [activeTab, setActiveTab] = useState('who'); // 'who', 'where', 'coverage'

  if (!radarData) return null;

  const { competitors, gap_cities, market_coverage_percent, best_entry_point, entry_recommendation } = radarData;

  const uncoveredCount = gap_cities?.length || 0;

  return (
    <div className="space-y-6">
      {/* Top Coverage Indicator Banner */}
      <ClayCard className="p-6 border-white/15 bg-[#141414] space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#737373]">
              Market Saturation Index
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {market_coverage_percent}% Tier-1 City Coverage
            </h3>
            <p className="text-xs text-[#A3A3A3]">
              {uncoveredCount} major commercial cities in India have zero active venture-backed competitors.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1D1D1D] border border-white/10 text-right shrink-0">
            <span className="text-[10px] font-mono uppercase text-[#737373] block">Top Uncrowded Entry City</span>
            <span className="text-base font-bold font-mono text-white flex items-center gap-1.5 justify-end">
              <MapPin className="w-4 h-4 text-white" />
              {best_entry_point?.city || 'Regional Hub'}
            </span>
            <span className="text-[10px] text-[#A3A3A3]">({best_entry_point?.population || '3M+'} Population)</span>
          </div>
        </div>

        {/* Coverage Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden relative">
            <div
              className="h-full bg-white rounded-full transition-all duration-700"
              style={{ width: `${market_coverage_percent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-[#737373]">
            <span>Incumbents Present ({market_coverage_percent}%)</span>
            <span>Uncontested White Space ({100 - market_coverage_percent}%)</span>
          </div>
        </div>
      </ClayCard>

      {/* Tabs Control */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('who')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            activeTab === 'who'
              ? 'bg-white text-black font-semibold'
              : 'text-[#A3A3A3] hover:text-white hover:bg-white/5'
          }`}
        >
          Tab 1 — Who's Operating ({competitors?.length || 0})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('where')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            activeTab === 'where'
              ? 'bg-white text-black font-semibold'
              : 'text-[#A3A3A3] hover:text-white hover:bg-white/5'
          }`}
        >
          Tab 2 — Where to Enter ({uncoveredCount} Gap Cities)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('coverage')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            activeTab === 'coverage'
              ? 'bg-white text-black font-semibold'
              : 'text-[#A3A3A3] hover:text-white hover:bg-white/5'
          }`}
        >
          Tab 3 — Strategic Playbook
        </button>
      </div>

      {/* Tab 1: Who's There (Competitor Cards) */}
      {activeTab === 'who' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {competitors?.map((comp, idx) => (
              <ClayCard key={idx} className="p-5 flex flex-col justify-between space-y-4 border-white/10">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-base font-semibold text-white tracking-tight">{comp.name}</h4>
                      <p className="text-xs text-[#737373]">Founded {comp.founded_year} • HQ in {comp.hq_city}</p>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white border border-white/15">
                      {comp.funding_stage}
                    </span>
                  </div>

                  <div className="pt-2 text-xs text-[#EDEDED] space-y-1">
                    <span className="text-[10px] font-mono uppercase text-[#737373] block">Active Operating Cities:</span>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {comp.other_cities?.map((c) => (
                        <span key={c} className="text-[11px] px-2 py-0.5 rounded bg-[#1C1C1C] text-[#A3A3A3] border border-white/5">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {comp.source_url && (
                  <div className="pt-2 border-t border-white/5">
                    <a
                      href={comp.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] hover:text-white transition-colors font-mono"
                    >
                      <span>Verified Company Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </ClayCard>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Where to Enter (Gap Cities) */}
      {activeTab === 'where' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Best Entry Point Spotlight Card */}
          <div className="clay-card p-6 border-white/25 bg-[#171717] space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-white">
              <Navigation className="w-4 h-4" />
              <span>Recommended Launch City (Primary Entry Point)</span>
              <span className="text-[10px] font-mono text-white/80 bg-white/10 px-2 py-0.5 rounded ml-auto">
                First-Mover Advantage
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {best_entry_point?.city} ({best_entry_point?.tier})
            </h3>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              Population of {best_entry_point?.population} with zero presence from national VC-backed players. Local wholesalers and consumers are relying on high-friction informal channels.
            </p>
          </div>

          {/* All Gap Cities Grid */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              Uncontested Indian Regional Cities
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {gap_cities?.map((gc) => (
                <div key={gc.city} className="p-3.5 rounded-xl bg-[#141414] border border-white/10 space-y-1 text-xs">
                  <span className="text-white font-medium block">{gc.city}</span>
                  <span className="text-[11px] text-[#737373] block">{gc.population} pop • {gc.tier}</span>
                  <span className="text-[10px] text-white/70 font-mono block">Zero Incumbents</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Strategic Playbook */}
      {activeTab === 'coverage' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="clay-card p-6 border-white/15 bg-[#151515] space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-white">
              <Sparkles className="w-4 h-4" />
              <span>Market Penetration & Displacement Strategy</span>
            </div>
            <p className="text-sm text-[#E5E5E5] leading-relaxed font-sans italic">
              "{entry_recommendation}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-[#A3A3A3]">
            <div className="p-4 rounded-xl bg-[#141414] border border-white/10 space-y-1">
              <strong className="text-white block">Hyper-Local Customization</strong>
              <p className="text-[11px] text-[#737373]">Large incumbents cannot customize unit operations for regional dialects and mandi schedules.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#141414] border border-white/10 space-y-1">
              <strong className="text-white block">Lean Cash Flow Moat</strong>
              <p className="text-[11px] text-[#737373]">Operate with low CAC in Tier-2 districts while national players bleed capital on metro delivery wars.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#141414] border border-white/10 space-y-1">
              <strong className="text-white block">Direct Relationship Lock-in</strong>
              <p className="text-[11px] text-[#737373]">Establish direct vendor trust on WhatsApp before external syndicates notice the market void.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
