'use client';

import { Users, HelpCircle, MapPin, ShieldCheck } from 'lucide-react';
import SaveIdeaButton from './SaveIdeaButton';
import Button from './Button';

export default function GapResultCard({
  opportunity,
  onValidate,
  onSaveChange
}) {
  if (!opportunity) return null;

  const demandScore = opportunity.demandScore ?? opportunity.demand_score;

  return (
    <div className="bg-[#08152B]/85 backdrop-blur-md border border-[#39BAFF]/20 hover:border-[#39BAFF]/50 rounded-2xl p-6 flex flex-col justify-between h-full space-y-4 shadow-[0_8px_32px_rgba(3,7,18,0.45)] hover:shadow-[0_12px_40px_rgba(8,102,245,0.2)] transition-all duration-300 hover:-translate-y-0.5">
      {/* Header: Opportunity Name + Demand Score Badge + Save */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#39BAFF] px-2.5 py-0.5 rounded-full bg-[#0C1E3D] border border-[#39BAFF]/30">
                Opportunity
              </span>
              {opportunity.status && (
                <span className="text-[10px] text-[#8EABCF] px-2.5 py-0.5 rounded-full bg-[#0C1E3D] border border-[#39BAFF]/20 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
                  <span>{opportunity.status}</span>
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-[#F4F8FF] tracking-tight leading-snug">
              {opportunity.name}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {demandScore !== undefined && (
              <div className="text-right">
                <div className="text-[9px] uppercase tracking-wider text-[#8EABCF] font-medium">Demand</div>
                <div className="text-sm font-bold font-mono px-2.5 py-0.5 rounded-lg bg-[#0866F5]/20 border border-[#39BAFF]/40 text-[#39BAFF] shadow-[0_0_12px_rgba(57,186,255,0.25)]">
                  {demandScore}/100
                </div>
              </div>
            )}
            <SaveIdeaButton idea={opportunity} onSaveChange={onSaveChange} />
          </div>
        </div>

        {/* Short Plain-Language Explanation */}
        <p className="text-sm text-[#8EABCF] leading-relaxed">
          {opportunity.summary}
        </p>
      </div>

      {/* Structured Scan Details: Who, Why, Regional Context */}
      <div className="space-y-2.5 text-xs border-y border-[#39BAFF]/15 py-3.5">
        {/* Who Experiences This Problem */}
        <div className="flex items-start gap-2.5 text-[#F4F8FF]">
          <Users className="w-3.5 h-3.5 text-[#39BAFF] shrink-0 mt-0.5" />
          <div>
            <span className="text-[#8EABCF] mr-1">Target Persona:</span>
            <span>{opportunity.whoAffected}</span>
          </div>
        </div>

        {/* Why the Opportunity May Exist */}
        <div className="flex items-start gap-2.5 text-[#F4F8FF]">
          <HelpCircle className="w-3.5 h-3.5 text-[#39BAFF] shrink-0 mt-0.5" />
          <div>
            <span className="text-[#8EABCF] mr-1">Why It Exists:</span>
            <span>{opportunity.whyExists}</span>
          </div>
        </div>

        {/* Region / City Relevance */}
        <div className="flex items-start gap-2.5 text-[#F4F8FF]">
          <MapPin className="w-3.5 h-3.5 text-[#39BAFF] shrink-0 mt-0.5" />
          <div>
            <span className="text-[#8EABCF] mr-1">Regional Fit:</span>
            <span>{opportunity.regionRelevance}</span>
          </div>
        </div>
      </div>

      {/* Evidence & Action Buttons */}
      <div className="space-y-3 pt-1">
        {opportunity.sources && opportunity.sources.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-[#4B6485]">
            <span className="shrink-0 uppercase text-[10px] tracking-wide text-[#8EABCF] font-medium">Evidence:</span>
            {opportunity.sources.slice(0, 2).map((src, i) => (
              <a
                key={i}
                href={src.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8EABCF] hover:text-[#39BAFF] truncate max-w-[140px] underline decoration-[#39BAFF]/30 transition"
              >
                {src.title || src}
              </a>
            ))}
          </div>
        )}

        <div className="space-y-2.5 pt-1">
          <Button
            variant="primary"
            onClick={() => onValidate(opportunity)}
            className="w-full justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Validate Idea</span>
          </Button>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#39BAFF]/15">
            <a
              href={`/kickstart-kit/${encodeURIComponent(opportunity.id || 'gap-1')}?sector=${encodeURIComponent(opportunity.sector || 'Agriculture')}&region=${encodeURIComponent(opportunity.region || 'Maharashtra')}&name=${encodeURIComponent(opportunity.name || '')}`}
              className="px-2 py-1.5 rounded-lg bg-[#0C1E3D]/70 border border-[#39BAFF]/20 hover:border-[#39BAFF]/50 hover:bg-[#0866F5]/20 text-xs text-[#F4F8FF] text-center transition font-medium"
            >
              Startup Kit
            </a>
            <a
              href={`/competitor-radar/${encodeURIComponent(opportunity.id || 'gap-1')}?sector=${encodeURIComponent(opportunity.sector || 'Agriculture')}&region=${encodeURIComponent(opportunity.region || 'Maharashtra')}&name=${encodeURIComponent(opportunity.name || '')}`}
              className="px-2 py-1.5 rounded-lg bg-[#0C1E3D]/70 border border-[#39BAFF]/20 hover:border-[#39BAFF]/50 hover:bg-[#0866F5]/20 text-xs text-[#F4F8FF] text-center transition font-medium"
            >
              Radar
            </a>
            <a
              href={`/gtm-guide/${encodeURIComponent(opportunity.id || 'gap-1')}?sector=${encodeURIComponent(opportunity.sector || 'Agriculture')}&region=${encodeURIComponent(opportunity.region || 'Maharashtra')}&name=${encodeURIComponent(opportunity.name || '')}`}
              className="px-2 py-1.5 rounded-lg bg-[#0C1E3D]/70 border border-[#39BAFF]/20 hover:border-[#39BAFF]/50 hover:bg-[#0866F5]/20 text-xs text-[#F4F8FF] text-center transition font-medium"
            >
              GTM Plan
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
