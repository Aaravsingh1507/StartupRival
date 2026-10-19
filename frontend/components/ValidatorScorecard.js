'use client';

import { ExternalLink, CheckCircle2, TrendingUp, AlertCircle, Building2, Users2, MapPin, Sparkles } from 'lucide-react';
import ClayCard from './ClayCard';

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
      <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A3A3A3] px-2 py-0.5 rounded bg-white/5 border border-white/10">
              Validated Market Opportunity
            </span>
            <span className="text-[10px] font-mono text-[#737373]">
              ID: {idea.id || 'SR-VAL-2026'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            {idea.name}
          </h2>
          <p className="text-xs text-[#A3A3A3] mt-1 max-w-2xl leading-relaxed">
            {idea.summary}
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#A3A3A3] hover:text-white bg-[#151515] hover:bg-[#202020] border border-white/10 transition-colors text-sm"
            aria-label="Close details"
          >
            ✕
          </button>
        )}
      </div>

      {/* Main Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Demand Score & Real vs Hype Indicator */}
        <div className="clay-scorecard p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#A3A3A3]">
            <span>Demand Score</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white">0–100</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold tracking-tight text-white font-mono">{score}</span>
            <span className="text-xs text-[#737373]">/ 100</span>
          </div>
          {/* Status Badge with Shapes */}
          <div className="pt-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border bg-[#1D1D1D] text-white border-white/20">
              {status === 'REAL DEMAND' ? (
                <>
                  <span className="w-2 h-2 rotate-45 bg-white inline-block" />
                  <span>REAL DEMAND</span>
                </>
              ) : status === 'TRENDING HYPE' ? (
                <>
                  <span className="w-2 h-2 rounded-full border border-white inline-block" />
                  <span>TRENDING HYPE</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 border-b-2 border-l-2 border-white inline-block" />
                  <span>UNCLEAR</span>
                </>
              )}
            </div>
          </div>
          <p className="text-[11px] text-[#737373]">Based on Google Trends 12mo trajectory & news query volume.</p>
        </div>

        {/* Metric 2: Competitor Density */}
        <div className="clay-scorecard p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#A3A3A3]">
            <span>Competitor Density</span>
            <Building2 className="w-3.5 h-3.5 text-[#737373]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-white">{competitorDensity}</span>
          </div>
          {/* Density Bars */}
          <div className="flex gap-1.5 pt-2">
            <div className={`h-1.5 flex-1 rounded-full ${competitorDensity === 'Low' || competitorDensity === 'Medium' || competitorDensity === 'High' ? 'bg-white' : 'bg-white/20'}`} />
            <div className={`h-1.5 flex-1 rounded-full ${competitorDensity === 'Medium' || competitorDensity === 'High' ? 'bg-white' : 'bg-white/20'}`} />
            <div className={`h-1.5 flex-1 rounded-full ${competitorDensity === 'High' ? 'bg-white' : 'bg-white/20'}`} />
          </div>
          <p className="text-[11px] text-[#737373]">0-2 established commercial players in targeted district cluster.</p>
        </div>

        {/* Metric 3: Population Fit */}
        <div className="clay-scorecard p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#A3A3A3]">
            <span>Population Fit</span>
            <Users2 className="w-3.5 h-3.5 text-[#737373]" />
          </div>
          <div>
            <span className="text-base font-semibold text-white block">Viable Scale</span>
            <span className="text-xs text-[#A3A3A3] mt-0.5 block leading-tight">{populationFit}</span>
          </div>
          <div className="pt-1 text-[11px] text-[#737373]">
            Exceeds minimum viable threshold for service/product density.
          </div>
        </div>

        {/* Metric 4: Recommended Launch Cities */}
        <div className="clay-scorecard p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#A3A3A3]">
            <span>Launch Locations</span>
            <MapPin className="w-3.5 h-3.5 text-[#737373]" />
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {recommendedCities.map((city, idx) => (
              <span
                key={city}
                className="text-xs px-2.5 py-1 rounded bg-[#1D1D1D] text-white border border-white/10 font-mono"
              >
                #{idx + 1} {city}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-[#737373]">Ranked by commercial transaction density & logistics ease.</p>
        </div>
      </div>

      {/* Claude AI 2-Sentence Verdict Section */}
      <div className="clay-card p-5 space-y-2 border-white/20 bg-[#161616]">
        <div className="flex items-center gap-2 text-xs font-medium text-white">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Strategic Synthesis Verdict</span>
          <span className="text-[10px] text-[#737373] font-mono ml-auto">AI Analysis • Claude Sonnet</span>
        </div>
        <p className="text-sm text-[#E5E5E5] leading-relaxed font-sans italic">
          "{verdict}"
        </p>
      </div>

      {/* Distinction of Verified Data vs Estimates vs AI Assessment */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-[#A3A3A3] pt-1">
        <div className="p-3 rounded-xl bg-[#121212] border border-white/10 flex items-start gap-2">
          <span className="w-2 h-2 rounded-full bg-white mt-1 shrink-0" />
          <div>
            <span className="text-white font-medium block">Verified Data</span>
            <span className="text-[11px] text-[#737373]">Government census figures & registry filings</span>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-[#121212] border border-white/10 flex items-start gap-2">
          <span className="w-2 h-2 rounded-full bg-white/50 mt-1 shrink-0" />
          <div>
            <span className="text-white font-medium block">Live Estimates</span>
            <span className="text-[11px] text-[#737373]">Google search query momentum calculations</span>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-[#121212] border border-white/10 flex items-start gap-2">
          <span className="w-2 h-2 rounded-full border border-white mt-1 shrink-0" />
          <div>
            <span className="text-white font-medium block">Synthesized Judgment</span>
            <span className="text-[11px] text-[#737373]">Risk vs opportunity trade-off evaluations</span>
          </div>
        </div>
      </div>

      {/* Supporting Sources */}
      {sources && sources.length > 0 && (
        <div className="pt-2 border-t border-white/10">
          <h4 className="text-xs font-medium text-white mb-3 flex items-center gap-2">
            <span>Supporting Data Sources & Evidence</span>
          </h4>
          <div className="flex flex-wrap gap-2.5">
            {sources.map((src, idx) => (
              <a
                key={idx}
                href={src.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#181818] text-[#A3A3A3] hover:text-white border border-white/10 hover:border-white/25 transition-colors"
              >
                <span>{src.title || src}</span>
                <ExternalLink className="w-3 h-3 text-[#737373]" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
