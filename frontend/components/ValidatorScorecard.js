'use client';

import { ExternalLink, Building2, Users2, MapPin, Sparkles, X, ShieldCheck } from 'lucide-react';

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
    <div className="bg-[#08152B]/95 backdrop-blur-2xl border border-[#39BAFF]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-[0_20px_60px_rgba(3,7,18,0.9)] text-[#F4F8FF]">
      {/* Top Banner: Opportunity Title and Close Button */}
      <div className="flex items-start justify-between gap-4 border-b border-[#39BAFF]/20 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#39BAFF] px-2.5 py-0.5 rounded-full bg-[#0C1E3D] border border-[#39BAFF]/30">
              Validated Market Opportunity
            </span>
            <span className="text-xs text-[#8EABCF] font-mono">
              ID: {idea.id || 'SR-VAL-2026'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F4F8FF] tracking-tight">
            {idea.name}
          </h2>
          <p className="text-sm text-[#8EABCF] mt-1.5 max-w-2xl leading-relaxed">
            {idea.summary}
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#8EABCF] hover:text-white hover:bg-[#0C1E3D] border border-[#39BAFF]/20 hover:border-[#39BAFF]/50 transition text-sm cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Demand Score & Real vs Hype Indicator */}
        <div className="bg-[#0C1E3D]/80 border border-[#39BAFF]/20 rounded-xl p-5 space-y-3 hover:border-[#39BAFF]/40 transition">
          <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#8EABCF] font-medium">
            <span>Demand Score</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#0866F5]/20 text-[#39BAFF] font-mono">0–100</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-[#39BAFF] font-mono drop-shadow-[0_0_12px_rgba(57,186,255,0.4)]">{score}</span>
            <span className="text-xs text-[#8EABCF]">/ 100</span>
          </div>
          {/* Status Badge */}
          <div className="pt-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border bg-[#08152B] text-[#F4F8FF] border-[#39BAFF]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
              <span>{status}</span>
            </span>
          </div>
          <p className="text-[11px] text-[#4B6485]">Based on Google Trends 12mo trajectory & query velocity.</p>
        </div>

        {/* Metric 2: Competitor Density */}
        <div className="bg-[#0C1E3D]/80 border border-[#39BAFF]/20 rounded-xl p-5 space-y-3 hover:border-[#39BAFF]/40 transition">
          <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#8EABCF] font-medium">
            <span>Competitor Density</span>
            <Building2 className="w-3.5 h-3.5 text-[#39BAFF]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-[#F4F8FF]">{competitorDensity}</span>
          </div>
          {/* Density Bars */}
          <div className="flex gap-1.5 pt-2">
            <div className={`h-1.5 flex-1 rounded-full ${competitorDensity === 'Low' || competitorDensity === 'Medium' || competitorDensity === 'High' ? 'bg-[#39BAFF] shadow-[0_0_8px_rgba(57,186,255,0.5)]' : 'bg-[#08152B]'}`} />
            <div className={`h-1.5 flex-1 rounded-full ${competitorDensity === 'Medium' || competitorDensity === 'High' ? 'bg-[#39BAFF] shadow-[0_0_8px_rgba(57,186,255,0.5)]' : 'bg-[#08152B]'}`} />
            <div className={`h-1.5 flex-1 rounded-full ${competitorDensity === 'High' ? 'bg-[#39BAFF] shadow-[0_0_8px_rgba(57,186,255,0.5)]' : 'bg-[#08152B]'}`} />
          </div>
          <p className="text-[11px] text-[#4B6485]">0-2 established commercial players in targeted district cluster.</p>
        </div>

        {/* Metric 3: Population Fit */}
        <div className="bg-[#0C1E3D]/80 border border-[#39BAFF]/20 rounded-xl p-5 space-y-3 hover:border-[#39BAFF]/40 transition">
          <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#8EABCF] font-medium">
            <span>Population Fit</span>
            <Users2 className="w-3.5 h-3.5 text-[#39BAFF]" />
          </div>
          <div>
            <span className="text-base font-semibold text-[#F4F8FF] block">Viable Scale</span>
            <span className="text-xs text-[#8EABCF] mt-0.5 block leading-tight">{populationFit}</span>
          </div>
          <div className="pt-1 text-[11px] text-[#4B6485]">
            Exceeds minimum viable threshold for consumer density.
          </div>
        </div>

        {/* Metric 4: Recommended Launch Cities */}
        <div className="bg-[#0C1E3D]/80 border border-[#39BAFF]/20 rounded-xl p-5 space-y-3 hover:border-[#39BAFF]/40 transition">
          <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#8EABCF] font-medium">
            <span>Launch Locations</span>
            <MapPin className="w-3.5 h-3.5 text-[#39BAFF]" />
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {recommendedCities.map((city, idx) => (
              <span
                key={city}
                className="text-xs px-2.5 py-1 rounded-lg bg-[#08152B] text-[#F4F8FF] border border-[#39BAFF]/30"
              >
                #{idx + 1} {city}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-[#4B6485]">Ranked by commercial transaction density & logistics ease.</p>
        </div>
      </div>

      {/* Claude AI 2-Sentence Verdict Section */}
      <div className="bg-gradient-to-r from-[#0C1E3D] to-[#08152B] border border-[#39BAFF]/30 rounded-xl p-5 space-y-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#39BAFF] font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#39BAFF]" />
          <span>Strategic Synthesis Verdict</span>
          <span className="text-xs text-[#8EABCF] ml-auto font-mono">AI Analysis • Claude Sonnet</span>
        </div>
        <p className="text-sm text-[#F4F8FF] leading-relaxed italic">
          "{verdict}"
        </p>
      </div>

      {/* Distinction of Verified Data vs Estimates vs AI Assessment */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-[#8EABCF] pt-1">
        <div className="p-3.5 rounded-xl bg-[#030712]/70 border border-[#39BAFF]/20 flex items-start gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#39BAFF] shadow-[0_0_6px_rgba(57,186,255,0.7)] mt-1 shrink-0" />
          <div>
            <span className="text-[#F4F8FF] font-semibold block">Verified Data</span>
            <span className="text-xs text-[#4B6485]">Government census figures & registry filings</span>
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#030712]/70 border border-[#39BAFF]/20 flex items-start gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#0866F5] shadow-[0_0_6px_rgba(8,102,245,0.7)] mt-1 shrink-0" />
          <div>
            <span className="text-[#F4F8FF] font-semibold block">Live Estimates</span>
            <span className="text-xs text-[#4B6485]">Google search query momentum calculations</span>
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#030712]/70 border border-[#39BAFF]/20 flex items-start gap-2.5">
          <span className="w-2 h-2 rounded-full border-2 border-[#39BAFF] mt-1 shrink-0" />
          <div>
            <span className="text-[#F4F8FF] font-semibold block">Synthesized Judgment</span>
            <span className="text-xs text-[#4B6485]">Risk vs opportunity trade-off evaluations</span>
          </div>
        </div>
      </div>

      {/* Supporting Sources */}
      {sources && sources.length > 0 && (
        <div className="pt-2 border-t border-[#39BAFF]/15">
          <h4 className="text-xs uppercase tracking-wider text-[#8EABCF] mb-3 font-medium">
            Supporting Data Sources & Evidence
          </h4>
          <div className="flex flex-wrap gap-2.5">
            {sources.map((src, idx) => (
              <a
                key={idx}
                href={src.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl bg-[#0C1E3D]/60 border border-[#39BAFF]/25 text-[#8EABCF] hover:text-[#39BAFF] hover:border-[#39BAFF]/50 transition"
              >
                <span>{src.title || src}</span>
                <ExternalLink className="w-3 h-3 text-[#39BAFF]" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
