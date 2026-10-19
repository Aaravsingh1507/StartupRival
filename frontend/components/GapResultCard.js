'use client';

import { ArrowRight, MapPin, Users, HelpCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import ClayCard from './ClayCard';
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
    <ClayCard className="flex flex-col justify-between h-full space-y-5 relative group border-white/10 hover:border-white/25">
      {/* Header: Opportunity Name + Demand Score Badge + Save */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                Opportunity
              </span>
              {opportunity.status && (
                <span className="text-[10px] font-mono text-white/90 px-1.5 py-0.5 rounded bg-white/10 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rotate-45 bg-white inline-block" />
                  {opportunity.status}
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-white tracking-tight leading-snug group-hover:text-neutral-100 transition-colors">
              {opportunity.name}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {demandScore !== undefined && (
              <div className="text-right">
                <div className="text-xs font-mono text-[#A3A3A3]">Demand</div>
                <div className="text-base font-bold font-mono text-white">
                  {demandScore}<span className="text-[10px] text-[#737373]">/100</span>
                </div>
              </div>
            )}
            <SaveIdeaButton idea={opportunity} onSaveChange={onSaveChange} />
          </div>
        </div>

        {/* Short Plain-Language Explanation */}
        <p className="text-sm text-[#A3A3A3] leading-relaxed">
          {opportunity.summary}
        </p>
      </div>

      {/* Structured Scan Details: Who, Why, Regional Context */}
      <div className="space-y-2.5 text-xs border-y border-white/5 py-3.5 my-1">
        {/* Who Experiences This Problem */}
        <div className="flex items-start gap-2 text-[#EDEDED]">
          <Users className="w-3.5 h-3.5 text-[#737373] shrink-0 mt-0.5" />
          <div>
            <span className="text-[#737373] mr-1">Target Persona:</span>
            <span>{opportunity.whoAffected}</span>
          </div>
        </div>

        {/* Why the Opportunity May Exist */}
        <div className="flex items-start gap-2 text-[#EDEDED]">
          <HelpCircle className="w-3.5 h-3.5 text-[#737373] shrink-0 mt-0.5" />
          <div>
            <span className="text-[#737373] mr-1">Why It Exists:</span>
            <span>{opportunity.whyExists}</span>
          </div>
        </div>

        {/* Region / City Relevance */}
        <div className="flex items-start gap-2 text-[#EDEDED]">
          <MapPin className="w-3.5 h-3.5 text-[#737373] shrink-0 mt-0.5" />
          <div>
            <span className="text-[#737373] mr-1">Regional Fit:</span>
            <span>{opportunity.regionRelevance}</span>
          </div>
        </div>
      </div>

      {/* Evidence & Action Buttons */}
      <div className="space-y-3 pt-1">
        {opportunity.sources && opportunity.sources.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[11px] text-[#737373]">
            <span className="shrink-0 text-[10px] uppercase tracking-wide">Evidence:</span>
            {opportunity.sources.slice(0, 2).map((src, i) => (
              <a
                key={i}
                href={src.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white truncate max-w-[140px] underline decoration-white/20 transition-colors"
              >
                {src.title || src}
              </a>
            ))}
          </div>
        )}

        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => onValidate(opportunity)}
              className="flex-1 justify-center gap-1.5 shadow-md"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Validate Idea</span>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-1.5 pt-1 border-t border-white/5">
            <a
              href={`/kickstart-kit/${encodeURIComponent(opportunity.id || 'gap-1')}?sector=${encodeURIComponent(opportunity.sector || 'Agriculture')}&region=${encodeURIComponent(opportunity.region || 'Maharashtra')}&name=${encodeURIComponent(opportunity.name || '')}`}
              className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-[#D4D4D4] hover:text-white text-center transition-colors font-medium"
            >
              Startup Kit
            </a>
            <a
              href={`/competitor-radar/${encodeURIComponent(opportunity.id || 'gap-1')}?sector=${encodeURIComponent(opportunity.sector || 'Agriculture')}&region=${encodeURIComponent(opportunity.region || 'Maharashtra')}&name=${encodeURIComponent(opportunity.name || '')}`}
              className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-[#D4D4D4] hover:text-white text-center transition-colors font-medium"
            >
              Radar
            </a>
            <a
              href={`/gtm-guide/${encodeURIComponent(opportunity.id || 'gap-1')}?sector=${encodeURIComponent(opportunity.sector || 'Agriculture')}&region=${encodeURIComponent(opportunity.region || 'Maharashtra')}&name=${encodeURIComponent(opportunity.name || '')}`}
              className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-[#D4D4D4] hover:text-white text-center transition-colors font-medium"
            >
              GTM Plan
            </a>
          </div>
        </div>
      </div>
    </ClayCard>
  );
}
