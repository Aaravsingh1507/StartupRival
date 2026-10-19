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
      <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-[#888888] block">
              Market Saturation Index
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {market_coverage_percent}% Tier-1 City Coverage
            </h3>
            <p className="text-sm text-[#888888]">
              {uncoveredCount} major commercial cities in India have zero active venture-backed competitors.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] text-right shrink-0">
            <span className="text-[10px] uppercase tracking-wider text-[#888888] block">Top Uncrowded Entry City</span>
            <span className="text-base font-bold text-white flex items-center gap-1.5 justify-end mt-0.5">
              <MapPin className="w-4 h-4 text-white" />
              {best_entry_point?.city || 'Regional Hub'}
            </span>
            <span className="text-xs text-[#555555]">({best_entry_point?.population || '3M+'} Population)</span>
          </div>
        </div>

        {/* Coverage Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="w-full h-1.5 rounded-full bg-[#1A1A1A] overflow-hidden relative">
            <div
              className="h-full bg-white rounded-full transition-all duration-700"
              style={{ width: `${market_coverage_percent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-[#555555]">
            <span>Incumbents Present ({market_coverage_percent}%)</span>
            <span>Uncontested White Space ({100 - market_coverage_percent}%)</span>
          </div>
        </div>
      </div>

      {/* Tabs Control */}
      <div className="flex items-center gap-1.5 border-b border-[#1F1F1F] pb-3 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('who')}
          className={`px-4 py-1.5 rounded-lg text-sm transition whitespace-nowrap cursor-pointer ${
            activeTab === 'who'
              ? 'bg-white text-black font-medium'
              : 'text-[#888888] hover:text-white'
          }`}
        >
          Who's Operating ({competitors?.length || 0})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('where')}
          className={`px-4 py-1.5 rounded-lg text-sm transition whitespace-nowrap cursor-pointer ${
            activeTab === 'where'
              ? 'bg-white text-black font-medium'
              : 'text-[#888888] hover:text-white'
          }`}
        >
          Where to Enter ({uncoveredCount} Gap Cities)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('coverage')}
          className={`px-4 py-1.5 rounded-lg text-sm transition whitespace-nowrap cursor-pointer ${
            activeTab === 'coverage'
              ? 'bg-white text-black font-medium'
              : 'text-[#888888] hover:text-white'
          }`}
        >
          Strategic Playbook
        </button>
      </div>

      {/* Tab 1: Who's There (Competitor Cards) */}
      {activeTab === 'who' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {competitors?.map((comp, idx) => (
              <div key={idx} className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-base font-semibold text-white tracking-tight">{comp.name}</h4>
                      <p className="text-xs text-[#888888]">Founded {comp.founded_year} • HQ in {comp.hq_city}</p>
                    </div>

                    <span className="text-xs px-2 py-0.5 rounded bg-[#1A1A1A] text-white border border-[#2A2A2A]">
                      {comp.funding_stage}
                    </span>
                  </div>

                  <div className="pt-2 text-xs space-y-1">
                    <span className="text-xs uppercase tracking-wider text-[#888888] block">Active Operating Cities:</span>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {comp.other_cities?.map((c) => (
                        <span key={c} className="text-xs px-2 py-0.5 rounded bg-[#0A0A0A] text-[#888888] border border-[#1F1F1F]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {comp.source_url && (
                  <div className="pt-2 border-t border-[#1F1F1F]">
                    <a
                      href={comp.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#888888] hover:text-white transition"
                    >
                      <span>Verified Company Profile</span>
                      <ExternalLink className="w-3 h-3 text-[#555555]" />
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
          <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#888888]">
              <Navigation className="w-4 h-4 text-white" />
              <span>Recommended Launch City (Primary Entry Point)</span>
              <span className="text-xs text-white bg-[#1A1A1A] border border-[#2A2A2A] px-2 py-0.5 rounded ml-auto">
                First-Mover Advantage
              </span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {best_entry_point?.city} ({best_entry_point?.tier})
            </h3>
            <p className="text-sm text-[#888888] leading-relaxed">
              Population of {best_entry_point?.population} with zero presence from national VC-backed players. Local wholesalers and consumers are relying on high-friction informal channels.
            </p>
          </div>

          {/* All Gap Cities Grid */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#888888]">
              Uncontested Indian Regional Cities
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {gap_cities?.map((gc) => (
                <div key={gc.city} className="p-3.5 rounded-lg bg-[#0A0A0A] border border-[#1F1F1F] space-y-1 text-xs">
                  <span className="text-white font-medium block">{gc.city}</span>
                  <span className="text-xs text-[#888888] block">{gc.population} pop • {gc.tier}</span>
                  <span className="text-[10px] text-[#555555] block">Zero Incumbents</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Strategic Playbook */}
      {activeTab === 'coverage' && (
        <div className="space-y-4">
          <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#888888]">
              <Sparkles className="w-4 h-4 text-white" />
              <span>Market Penetration & Displacement Strategy</span>
            </div>
            <p className="text-sm text-[#F5F5F5] leading-relaxed italic">
              "{entry_recommendation}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#888888]">
            <div className="p-4 rounded-lg bg-[#0A0A0A] border border-[#1F1F1F] space-y-1">
              <strong className="text-white block">Hyper-Local Customization</strong>
              <p className="text-xs text-[#555555] leading-relaxed">Large incumbents cannot customize unit operations for regional dialects and mandi schedules.</p>
            </div>
            <div className="p-4 rounded-lg bg-[#0A0A0A] border border-[#1F1F1F] space-y-1">
              <strong className="text-white block">Lean Cash Flow Moat</strong>
              <p className="text-xs text-[#555555] leading-relaxed">Operate with low CAC in Tier-2 districts while national players bleed capital on metro delivery wars.</p>
            </div>
            <div className="p-4 rounded-lg bg-[#0A0A0A] border border-[#1F1F1F] space-y-1">
              <strong className="text-white block">Direct Relationship Lock-in</strong>
              <p className="text-xs text-[#555555] leading-relaxed">Establish direct vendor trust on WhatsApp before external syndicates notice the market void.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

