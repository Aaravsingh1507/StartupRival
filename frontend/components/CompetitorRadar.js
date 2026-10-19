'use client';

import { useState } from 'react';
import { MapPin, ExternalLink, Sparkles, Navigation } from 'lucide-react';

export default function CompetitorRadar({ radarData }) {
  const [activeTab, setActiveTab] = useState('who');

  if (!radarData) return null;

  const { competitors, gap_cities, market_coverage_percent, best_entry_point, entry_recommendation } = radarData;
  const uncoveredCount = gap_cities?.length || 0;

  return (
    <div className="space-y-6">
      {/* Top Coverage Indicator Banner */}
      <div className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/25 rounded-2xl p-6 space-y-4 shadow-[0_8px_32px_rgba(3,7,18,0.5)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#39BAFF] block">
              Market Saturation Index
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#F4F8FF] tracking-tight">
              {market_coverage_percent}% Tier-1 City Coverage
            </h3>
            <p className="text-sm text-[#8EABCF]">
              {uncoveredCount} major commercial cities in India have zero active venture-backed competitors.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0C1E3D] border border-[#39BAFF]/30 text-right shrink-0 shadow-[0_0_15px_rgba(8,102,245,0.25)]">
            <span className="text-[10px] uppercase tracking-wider text-[#8EABCF] block font-medium">Top Uncrowded Entry City</span>
            <span className="text-base font-bold text-[#39BAFF] flex items-center gap-1.5 justify-end mt-0.5">
              <MapPin className="w-4 h-4 text-[#39BAFF]" />
              {best_entry_point?.city || 'Regional Hub'}
            </span>
            <span className="text-xs text-[#8EABCF]">({best_entry_point?.population || '3M+'} Population)</span>
          </div>
        </div>

        {/* Coverage Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="w-full h-2 rounded-full bg-[#0C1E3D] overflow-hidden relative border border-[#39BAFF]/20 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#0866F5] to-[#39BAFF] rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(57,186,255,0.6)]"
              style={{ width: `${market_coverage_percent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-[#4B6485]">
            <span>Incumbents Present ({market_coverage_percent}%)</span>
            <span>Uncontested White Space ({100 - market_coverage_percent}%)</span>
          </div>
        </div>
      </div>

      {/* Tabs Control */}
      <div className="flex items-center gap-2 border-b border-[#39BAFF]/15 pb-3 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('who')}
          className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 whitespace-nowrap cursor-pointer ${
            activeTab === 'who'
              ? 'bg-[#0866F5] text-white font-semibold shadow-[0_0_15px_rgba(8,102,245,0.6)] border border-[#39BAFF]/40'
              : 'text-[#8EABCF] hover:text-[#F4F8FF] hover:bg-[#0C1E3D]/50 border border-transparent'
          }`}
        >
          Who's Operating ({competitors?.length || 0})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('where')}
          className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 whitespace-nowrap cursor-pointer ${
            activeTab === 'where'
              ? 'bg-[#0866F5] text-white font-semibold shadow-[0_0_15px_rgba(8,102,245,0.6)] border border-[#39BAFF]/40'
              : 'text-[#8EABCF] hover:text-[#F4F8FF] hover:bg-[#0C1E3D]/50 border border-transparent'
          }`}
        >
          Where to Enter ({uncoveredCount} Gap Cities)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('coverage')}
          className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 whitespace-nowrap cursor-pointer ${
            activeTab === 'coverage'
              ? 'bg-[#0866F5] text-white font-semibold shadow-[0_0_15px_rgba(8,102,245,0.6)] border border-[#39BAFF]/40'
              : 'text-[#8EABCF] hover:text-[#F4F8FF] hover:bg-[#0C1E3D]/50 border border-transparent'
          }`}
        >
          Strategic Playbook
        </button>
      </div>

      {/* Tab 1: Who's There (Competitor Cards) */}
      {activeTab === 'who' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {competitors?.map((comp, idx) => (
              <div key={idx} className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/20 hover:border-[#39BAFF]/45 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-[0_8px_32px_rgba(3,7,18,0.45)] transition">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-base font-bold text-[#F4F8FF] tracking-tight">{comp.name}</h4>
                      <p className="text-xs text-[#8EABCF]">Founded {comp.founded_year} • HQ in {comp.hq_city}</p>
                    </div>

                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#0C1E3D] text-[#39BAFF] border border-[#39BAFF]/30 font-mono">
                      {comp.funding_stage}
                    </span>
                  </div>

                  <div className="pt-2 text-xs space-y-1.5">
                    <span className="text-xs uppercase tracking-wider text-[#8EABCF] block font-medium">Active Operating Cities:</span>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {comp.other_cities?.map((c) => (
                        <span key={c} className="text-xs px-2.5 py-0.5 rounded-lg bg-[#030712]/70 text-[#8EABCF] border border-[#39BAFF]/15">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {comp.source_url && (
                  <div className="pt-2 border-t border-[#39BAFF]/15">
                    <a
                      href={comp.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#39BAFF] hover:underline transition font-medium"
                    >
                      <span>Verified Company Profile</span>
                      <ExternalLink className="w-3 h-3 text-[#39BAFF]" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Where to Enter (Gap Cities) */}
      {activeTab === 'where' && (
        <div className="space-y-6">
          {/* Best Entry Point Spotlight Card */}
          <div className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/30 rounded-2xl p-6 space-y-3 shadow-[0_12px_40px_rgba(8,102,245,0.2)]">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#39BAFF] font-semibold">
              <Navigation className="w-4 h-4 text-[#39BAFF]" />
              <span>Recommended Launch City (Primary Entry Point)</span>
              <span className="text-xs text-[#39BAFF] bg-[#0C1E3D] border border-[#39BAFF]/30 px-2.5 py-0.5 rounded-full ml-auto font-mono">
                First-Mover Advantage
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#F4F8FF] tracking-tight">
              {best_entry_point?.city} ({best_entry_point?.tier})
            </h3>
            <p className="text-sm text-[#8EABCF] leading-relaxed">
              Population of {best_entry_point?.population} with zero presence from national VC-backed players. Local wholesalers and consumers are relying on high-friction informal channels.
            </p>
          </div>

          {/* All Gap Cities Grid */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#8EABCF] font-medium">
              Uncontested Indian Regional Cities
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {gap_cities?.map((gc) => (
                <div key={gc.city} className="p-4 rounded-xl bg-[#08152B]/70 border border-[#39BAFF]/20 space-y-1 text-xs hover:border-[#39BAFF]/40 transition">
                  <span className="text-[#F4F8FF] font-bold block">{gc.city}</span>
                  <span className="text-xs text-[#8EABCF] block">{gc.population} pop • {gc.tier}</span>
                  <span className="text-[10px] text-[#39BAFF] block font-mono">Zero Incumbents</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Strategic Playbook */}
      {activeTab === 'coverage' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-[#0C1E3D] to-[#08152B] border border-[#39BAFF]/30 rounded-2xl p-6 space-y-3 shadow-[0_8px_32px_rgba(8,102,245,0.2)]">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#39BAFF] font-semibold">
              <Sparkles className="w-4 h-4 text-[#39BAFF]" />
              <span>Market Penetration & Displacement Strategy</span>
            </div>
            <p className="text-sm text-[#F4F8FF] leading-relaxed italic">
              "{entry_recommendation}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#8EABCF]">
            <div className="p-4 rounded-xl bg-[#08152B]/70 border border-[#39BAFF]/20 space-y-1">
              <strong className="text-[#F4F8FF] block font-semibold">Hyper-Local Customization</strong>
              <p className="text-xs text-[#4B6485] leading-relaxed">Large incumbents cannot customize unit operations for regional dialects and mandi schedules.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#08152B]/70 border border-[#39BAFF]/20 space-y-1">
              <strong className="text-[#F4F8FF] block font-semibold">Lean Cash Flow Moat</strong>
              <p className="text-xs text-[#4B6485] leading-relaxed">Operate with low CAC in Tier-2 districts while national players bleed capital on metro delivery wars.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#08152B]/70 border border-[#39BAFF]/20 space-y-1">
              <strong className="text-[#F4F8FF] block font-semibold">Direct Relationship Lock-in</strong>
              <p className="text-xs text-[#4B6485] leading-relaxed">Establish direct vendor trust on WhatsApp before external syndicates notice the market void.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
