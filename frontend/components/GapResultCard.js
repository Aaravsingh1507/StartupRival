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
    <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 flex flex-col justify-between h-full space-y-4">
      {/* Header: Opportunity Name + Demand Score Badge + Save */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-[#888888] px-2 py-0.5 rounded bg-[#1A1A1A] border border-[#2A2A2A]">
                Opportunity
              </span>
              {opportunity.status && (
                <span className="text-xs text-[#888888] px-2 py-0.5 rounded bg-[#1A1A1A] border border-[#2A2A2A] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                  <span>{opportunity.status}</span>
                </span>
              )}
            </div>
            <h3 className="text-base font-semibold text-white tracking-tight leading-snug">
              {opportunity.name}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {demandScore !== undefined && (
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider text-[#888888]">Demand</div>
                <div className="text-sm font-bold font-mono px-2 py-0.5 rounded bg-[#1A1A1A] border border-[#2A2A2A] text-[#E8FF47]">
                  {demandScore}/100
                </div>
              </div>
            )}
            <SaveIdeaButton idea={opportunity} onSaveChange={onSaveChange} />
          </div>
        </div>

        {/* Short Plain-Language Explanation */}
        <p className="text-sm text-[#888888] leading-relaxed">
          {opportunity.summary}
        </p>
      </div>

      {/* Structured Scan Details: Who, Why, Regional Context */}
      <div className="space-y-2 text-xs border-y border-[#1F1F1F] py-3">
        {/* Who Experiences This Problem */}
        <div className="flex items-start gap-2 text-[#F5F5F5]">
          <Users className="w-3.5 h-3.5 text-[#888888] shrink-0 mt-0.5" />
          <div>
            <span className="text-[#888888] mr-1">Target Persona:</span>
            <span>{opportunity.whoAffected}</span>
          </div>
        </div>

        {/* Why the Opportunity May Exist */}
        <div className="flex items-start gap-2 text-[#F5F5F5]">
          <HelpCircle className="w-3.5 h-3.5 text-[#888888] shrink-0 mt-0.5" />
          <div>
            <span className="text-[#888888] mr-1">Why It Exists:</span>
            <span>{opportunity.whyExists}</span>
          </div>
        </div>

        {/* Region / City Relevance */}
        <div className="flex items-start gap-2 text-[#F5F5F5]">
          <MapPin className="w-3.5 h-3.5 text-[#888888] shrink-0 mt-0.5" />
          <div>
            <span className="text-[#888888] mr-1">Regional Fit:</span>
            <span>{opportunity.regionRelevance}</span>
          </div>
        </div>
      </div>

      {/* Evidence & Action Buttons */}
      <div className="space-y-3 pt-1">
        {opportunity.sources && opportunity.sources.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-[#555555]">
            <span className="shrink-0 uppercase text-[10px] tracking-wide text-[#888888]">Evidence:</span>
            {opportunity.sources.slice(0, 2).map((src, i) => (
              <a
                key={i}
                href={src.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white truncate max-w-[140px] underline decoration-[#2A2A2A] transition"
              >
                {src.title || src}
              </a>
            ))}
          </div>
        )}

        <div className="space-y-2 pt-1">
          <Button
            variant="primary"
            onClick={() => onValidate(opportunity)}
            className="w-full justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Validate Idea</span>
          </Button>

          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[#1F1F1F]">
            <a
              href={`/kickstart-kit/${encodeURIComponent(opportunity.id || 'gap-1')}?sector=${encodeURIComponent(opportunity.sector || 'Agriculture')}&region=${encodeURIComponent(opportunity.region || 'Maharashtra')}&name=${encodeURIComponent(opportunity.name || '')}`}
              className="px-2 py-1.5 rounded-lg bg-transparent border border-[#2A2A2A] hover:bg-[#1A1A1A] text-xs text-white text-center transition font-medium"
            >
              Startup Kit
            </a>
            <a
              href={`/competitor-radar/${encodeURIComponent(opportunity.id || 'gap-1')}?sector=${encodeURIComponent(opportunity.sector || 'Agriculture')}&region=${encodeURIComponent(opportunity.region || 'Maharashtra')}&name=${encodeURIComponent(opportunity.name || '')}`}
              className="px-2 py-1.5 rounded-lg bg-transparent border border-[#2A2A2A] hover:bg-[#1A1A1A] text-xs text-white text-center transition font-medium"
            >
              Radar
            </a>
            <a
              href={`/gtm-guide/${encodeURIComponent(opportunity.id || 'gap-1')}?sector=${encodeURIComponent(opportunity.sector || 'Agriculture')}&region=${encodeURIComponent(opportunity.region || 'Maharashtra')}&name=${encodeURIComponent(opportunity.name || '')}`}
              className="px-2 py-1.5 rounded-lg bg-transparent border border-[#2A2A2A] hover:bg-[#1A1A1A] text-xs text-white text-center transition font-medium"
            >
              GTM Plan
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

