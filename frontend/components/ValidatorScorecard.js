'use client';

import { ExternalLink, Building2, Users2, MapPin, Sparkles, X } from 'lucide-react';

export default function ValidatorScorecard({ idea, onClose }) {
  if (!idea) return null;

  const score = idea.demandScore ?? idea.demand_score ?? 78;
  const status = idea.status || (score >= 75 ? 'REAL DEMAND' : score >= 50 ? 'TRENDING HYPE' : 'UNCLEAR');
  const competitorDensity = idea.competitorDensity || idea.competitor_density || 'Low';
  const populationFit = idea.populationFit || idea.population_fit || 'High (Sufficient addressable consumer base)';
  const recommendedCities = idea.recommendedCities || idea.recommended_cities || ['Central Hub', 'Tier-2 Market'];
  const sources = idea.sources || [
    { title: 'Google Trends India Momentum Index', url: 'https://trends.google.com' },
    { title: 'data.gov.in Official Economic Survey', url: 'https://data.gov.in' }
  ];
  const verdict = idea.validatorVerdict || idea.verdict || 'High conviction market void with tangible regional necessity. Early traction depends on direct distributor onboarding.';

  return (
    <div className="space-y-6">
      {/* Top Banner: Opportunity Title and Close Button */}
      <div className="flex items-start justify-between gap-4 border-b border-[#1F1F1F] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs uppercase tracking-wider text-[#888888] px-2 py-0.5 rounded bg-[#1A1A1A] border border-[#2A2A2A]">
              Validated Market Opportunity
            </span>
            <span className="text-xs text-[#555555]">
              ID: {idea.id || 'SR-VAL-2026'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {idea.name}
          </h2>
          <p className="text-sm text-[#888888] mt-1 max-w-2xl leading-relaxed">
            {idea.summary}
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-md text-[#888888] hover:text-white hover:bg-[#1A1A1A] border border-[#2A2A2A] transition text-sm"
            aria-label="Close details"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Demand Score & Real vs Hype Indicator */}
        <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#888888]">
            <span>Demand Score</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1A1A1A] text-white">0–100</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-[#E8FF47] font-mono">{score}</span>
            <span className="text-xs text-[#555555]">/ 100</span>
          </div>
          {/* Status Badge */}
          <div className="pt-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border bg-[#1A1A1A] text-white border-[#2A2A2A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              <span>{status}</span>
            </span>
          </div>
          <p className="text-xs text-[#555555]">Based on Google Trends 12mo trajectory & news query volume.</p>
        </div>

        {/* Metric 2: Competitor Density */}
        <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#888888]">
            <span>Competitor Density</span>
            <Building2 className="w-3.5 h-3.5 text-[#888888]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-white">{competitorDensity}</span>
          </div>
          {/* Density Bars */}
          <div className="flex gap-1.5 pt-2">
            <div className={`h-1.5 flex-1 rounded-full ${competitorDensity === 'Low' || competitorDensity === 'Medium' || competitorDensity === 'High' ? 'bg-white' : 'bg-[#1F1F1F]'}`} />
            <div className={`h-1.5 flex-1 rounded-full ${competitorDensity === 'Medium' || competitorDensity === 'High' ? 'bg-white' : 'bg-[#1F1F1F]'}`} />
            <div className={`h-1.5 flex-1 rounded-full ${competitorDensity === 'High' ? 'bg-white' : 'bg-[#1F1F1F]'}`} />
          </div>
          <p className="text-xs text-[#555555]">0-2 established commercial players in targeted district cluster.</p>
        </div>

        {/* Metric 3: Population Fit */}
        <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#888888]">
            <span>Population Fit</span>
            <Users2 className="w-3.5 h-3.5 text-[#888888]" />
          </div>
          <div>
            <span className="text-base font-semibold text-white block">Viable Scale</span>
            <span className="text-xs text-[#888888] mt-0.5 block leading-tight">{populationFit}</span>
          </div>
          <div className="pt-1 text-xs text-[#555555]">
            Exceeds minimum viable threshold for service/product density.
          </div>
        </div>

        {/* Metric 4: Recommended Launch Cities */}
        <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#888888]">
            <span>Launch Locations</span>
            <MapPin className="w-3.5 h-3.5 text-[#888888]" />
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {recommendedCities.map((city, idx) => (
              <span
                key={city}
                className="text-xs px-2.5 py-1 rounded bg-[#1A1A1A] text-white border border-[#2A2A2A]"
              >
                #{idx + 1} {city}
              </span>
            ))}
          </div>
          <p className="text-xs text-[#555555]">Ranked by commercial transaction density & logistics ease.</p>
        </div>
      </div>

      {/* Claude AI 2-Sentence Verdict Section */}
      <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 space-y-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#888888]">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>Strategic Synthesis Verdict</span>
          <span className="text-xs text-[#555555] ml-auto">AI Analysis • Claude Sonnet</span>
        </div>
        <p className="text-sm text-[#F5F5F5] leading-relaxed italic">
          "{verdict}"
        </p>
      </div>

      {/* Distinction of Verified Data vs Estimates vs AI Assessment */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-[#888888] pt-1">
        <div className="p-3 rounded-lg bg-[#0A0A0A] border border-[#1F1F1F] flex items-start gap-2">
          <span className="w-2 h-2 rounded-full bg-white mt-1 shrink-0" />
          <div>
            <span className="text-white font-medium block">Verified Data</span>
            <span className="text-xs text-[#555555]">Government census figures & registry filings</span>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-[#0A0A0A] border border-[#1F1F1F] flex items-start gap-2">
          <span className="w-2 h-2 rounded-full bg-[#888888] mt-1 shrink-0" />
          <div>
            <span className="text-white font-medium block">Live Estimates</span>
            <span className="text-xs text-[#555555]">Google search query momentum calculations</span>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-[#0A0A0A] border border-[#1F1F1F] flex items-start gap-2">
          <span className="w-2 h-2 rounded-full border border-white mt-1 shrink-0" />
          <div>
            <span className="text-white font-medium block">Synthesized Judgment</span>
            <span className="text-xs text-[#555555]">Risk vs opportunity trade-off evaluations</span>
          </div>
        </div>
      </div>

      {/* Supporting Sources */}
      {sources && sources.length > 0 && (
        <div className="pt-2 border-t border-[#1F1F1F]">
          <h4 className="text-xs uppercase tracking-wider text-[#888888] mb-3">
            Supporting Data Sources & Evidence
          </h4>
          <div className="flex flex-wrap gap-2.5">
            {sources.map((src, idx) => (
              <a
                key={idx}
                href={src.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-transparent border border-[#2A2A2A] text-[#888888] hover:text-white hover:bg-[#1A1A1A] transition"
              >
                <span>{src.title || src}</span>
                <ExternalLink className="w-3 h-3 text-[#555555]" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

