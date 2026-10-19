'use client';

import { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  AlertTriangle, 
  MapPin, 
  Languages 
} from 'lucide-react';
import { useToast } from '@/lib/toast-context';

export default function GTMGuide({ gtmData }) {
  const [activeTab, setActiveTab] = useState('channels');
  const [completedTactics, setCompletedTactics] = useState([1]);
  const { showToast } = useToast();

  if (!gtmData) return null;

  const { top_channels, pricing_strategy, first_100_customers, tier_2_3_note, language_tip, biggest_mistake } = gtmData;

  const toggleTactic = (step) => {
    setCompletedTactics((prev) => {
      const exists = prev.includes(step);
      const updated = exists ? prev.filter((s) => s !== step) : [...prev, step];
      showToast(exists ? `Marked tactic #${step} as pending` : `Completed customer acquisition tactic #${step}!`);
      return updated;
    });
  };

  return (
    <div className="space-y-6">
      {/* Tier 2/3 Strategic Playbook Banner */}
      {tier_2_3_note && (
        <div className="p-4 rounded-xl bg-[#08152B]/85 border border-[#39BAFF]/25 backdrop-blur-md flex items-start gap-3.5 text-xs shadow-[0_8px_32px_rgba(3,7,18,0.4)]">
          <MapPin className="w-4 h-4 text-[#39BAFF] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-[#F4F8FF] font-bold block">Tier 2 & 3 City Playbook Note:</span>
            <p className="text-[#8EABCF] leading-relaxed">{tier_2_3_note}</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#39BAFF]/15 pb-3 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('channels')}
          className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 whitespace-nowrap cursor-pointer ${
            activeTab === 'channels'
              ? 'bg-[#0866F5] text-white font-semibold shadow-[0_0_15px_rgba(8,102,245,0.6)] border border-[#39BAFF]/40'
              : 'text-[#8EABCF] hover:text-[#F4F8FF] hover:bg-[#0C1E3D]/50 border border-transparent'
          }`}
        >
          Marketing Channels ({top_channels?.length || 0})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('pricing')}
          className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 whitespace-nowrap cursor-pointer ${
            activeTab === 'pricing'
              ? 'bg-[#0866F5] text-white font-semibold shadow-[0_0_15px_rgba(8,102,245,0.6)] border border-[#39BAFF]/40'
              : 'text-[#8EABCF] hover:text-[#F4F8FF] hover:bg-[#0C1E3D]/50 border border-transparent'
          }`}
        >
          Pricing Strategy
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('first100')}
          className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 whitespace-nowrap cursor-pointer ${
            activeTab === 'first100'
              ? 'bg-[#0866F5] text-white font-semibold shadow-[0_0_15px_rgba(8,102,245,0.6)] border border-[#39BAFF]/40'
              : 'text-[#8EABCF] hover:text-[#F4F8FF] hover:bg-[#0C1E3D]/50 border border-transparent'
          }`}
        >
          First 100 Customers
        </button>
      </div>

      {/* TAB A: MARKETING CHANNELS */}
      {activeTab === 'channels' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {top_channels?.map((ch, idx) => (
              <div key={idx} className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/20 hover:border-[#39BAFF]/45 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-[0_8px_32px_rgba(3,7,18,0.45)] transition">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-base font-bold text-[#F4F8FF] tracking-tight">{ch.channel}</h4>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono border ${
                      ch.cost === 'Free'
                        ? 'bg-[#0866F5]/20 text-[#39BAFF] border-[#39BAFF]/30'
                        : 'bg-[#0C1E3D] text-[#8EABCF] border-[#39BAFF]/20'
                    }`}>
                      {ch.cost}
                    </span>
                  </div>
                  <p className="text-xs text-[#8EABCF] leading-relaxed"><strong className="text-[#F4F8FF]">Why it works:</strong> {ch.why_it_works}</p>
                  <p className="text-xs text-[#F4F8FF] leading-relaxed"><strong className="text-[#39BAFF]">How to start:</strong> {ch.how_to_start}</p>
                </div>

                <div className="pt-3 border-t border-[#39BAFF]/15 text-xs text-[#F4F8FF] space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#39BAFF] block font-semibold">Recommended First Action:</span>
                  <p className="text-[#8EABCF] leading-relaxed">{ch.first_action}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Regional Language Tip */}
          {language_tip && (
            <div className="p-4 rounded-xl bg-[#08152B]/70 border border-[#39BAFF]/20 flex items-start gap-3.5 text-xs">
              <Languages className="w-4 h-4 text-[#39BAFF] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#F4F8FF] font-bold block">Regional Language Customization Tip</span>
                <p className="text-[#8EABCF] mt-0.5 leading-relaxed">{language_tip}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB B: PRICING STRATEGY */}
      {activeTab === 'pricing' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/20 rounded-2xl p-6 space-y-3 shadow-[0_8px_32px_rgba(3,7,18,0.45)]">
              <span className="text-xs uppercase tracking-wider text-[#8EABCF] block font-medium">Suggested Price Model</span>
              <h3 className="text-base font-bold text-[#F4F8FF] tracking-tight">{pricing_strategy?.approach}</h3>
              <div className="pt-2">
                <span className="text-xs text-[#8EABCF] block">Price Anchor in India:</span>
                <span className="text-xl font-bold font-mono text-[#39BAFF] block mt-0.5 drop-shadow-[0_0_10px_rgba(57,186,255,0.4)]">{pricing_strategy?.anchor_price}</span>
              </div>
            </div>

            <div className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/20 rounded-2xl p-6 space-y-3 shadow-[0_8px_32px_rgba(3,7,18,0.45)]">
              <span className="text-xs uppercase tracking-wider text-[#8EABCF] block font-medium">Price Range (INR)</span>
              <div className="text-2xl font-bold font-mono text-[#F4F8FF] tracking-tight">
                {pricing_strategy?.price_range_inr}
              </div>
              <div className="pt-2 text-xs text-[#8EABCF] space-y-1">
                <span>Free Trial / Entry Offer: </span>
                <strong className="text-[#39BAFF]">{pricing_strategy?.free_tier_needed ? 'Yes, Recommended for Trust' : 'Not Recommended'}</strong>
              </div>
            </div>
          </div>

          <div className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/20 rounded-2xl p-6 space-y-2 shadow-[0_8px_32px_rgba(3,7,18,0.45)]">
            <span className="text-xs uppercase tracking-wider text-[#8EABCF] block font-medium">Economic Rationale for Indian Buyers</span>
            <p className="text-sm text-[#8EABCF] leading-relaxed">{pricing_strategy?.rationale}</p>
          </div>

          {biggest_mistake && (
            <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 text-xs text-red-300 flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-red-300 font-bold block">Common Go-To-Market Pitfall in India:</strong>
                <p className="text-[#8EABCF] mt-0.5 leading-relaxed">{biggest_mistake}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB C: FIRST 100 CUSTOMERS */}
      {activeTab === 'first100' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#8EABCF] pb-1">
            <span>Actionable Customer Acquisition Checklist:</span>
            <span className="text-[#39BAFF] font-semibold">{completedTactics.length} of {first_100_customers?.length || 5} Complete</span>
          </div>

          <div className="space-y-3">
            {first_100_customers?.map((item) => {
              const isDone = completedTactics.includes(item.step);
              return (
                <div
                  key={item.step}
                  onClick={() => toggleTactic(item.step)}
                  className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all duration-200 cursor-pointer ${
                    isDone
                      ? 'bg-[#08152B]/90 border-[#39BAFF]/40 text-[#F4F8FF] shadow-[0_0_15px_rgba(8,102,245,0.15)]'
                      : 'bg-[#08152B]/50 border-[#39BAFF]/15 text-[#8EABCF] hover:border-[#39BAFF]/30'
                  }`}
                >
                  <div className="pt-0.5">
                    {isDone ? (
                      <CheckSquare className="w-4 h-4 text-[#39BAFF] shadow-[0_0_6px_rgba(57,186,255,0.6)]" />
                    ) : (
                      <Square className="w-4 h-4 text-[#4B6485]" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className={`font-bold ${isDone ? 'line-through text-[#4B6485]' : 'text-[#F4F8FF]'}`}>
                        {item.tactic}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-[#8EABCF] font-mono">
                        <span>Cost: {item.estimated_cost}</span>
                        <span>•</span>
                        <span>{item.timeline}</span>
                      </div>
                    </div>
                    <p className={`leading-relaxed ${isDone ? 'line-through text-[#4B6485]' : 'text-[#8EABCF]'}`}>
                      {item.action_item}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
