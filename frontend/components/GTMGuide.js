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
        <div className="p-4 rounded-xl bg-[#111111] border border-[#2A2A2A] flex items-start gap-3 text-xs">
          <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-white font-medium block">Tier 2 & 3 City Playbook Note:</span>
            <p className="text-[#888888] leading-relaxed">{tier_2_3_note}</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-1.5 border-b border-[#1F1F1F] pb-3 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('channels')}
          className={`px-4 py-1.5 rounded-lg text-sm transition whitespace-nowrap cursor-pointer ${
            activeTab === 'channels'
              ? 'bg-white text-black font-medium'
              : 'text-[#888888] hover:text-white'
          }`}
        >
          Marketing Channels ({top_channels?.length || 0})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('pricing')}
          className={`px-4 py-1.5 rounded-lg text-sm transition whitespace-nowrap cursor-pointer ${
            activeTab === 'pricing'
              ? 'bg-white text-black font-medium'
              : 'text-[#888888] hover:text-white'
          }`}
        >
          Pricing Strategy
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('first100')}
          className={`px-4 py-1.5 rounded-lg text-sm transition whitespace-nowrap cursor-pointer ${
            activeTab === 'first100'
              ? 'bg-white text-black font-medium'
              : 'text-[#888888] hover:text-white'
          }`}
        >
          First 100 Customers
        </button>
      </div>

      {/* TAB A: MARKETING CHANNELS */}
      {activeTab === 'channels' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {top_channels?.map((ch, idx) => (
              <div key={idx} className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-base font-semibold text-white tracking-tight">{ch.channel}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded border ${
                      ch.cost === 'Free'
                        ? 'bg-[#1A1A1A] text-white border-[#2A2A2A]'
                        : 'bg-[#0A0A0A] text-[#888888] border-[#1F1F1F]'
                    }`}>
                      {ch.cost}
                    </span>
                  </div>
                  <p className="text-xs text-[#888888] leading-relaxed"><strong className="text-white">Why it works:</strong> {ch.why_it_works}</p>
                  <p className="text-xs text-[#F5F5F5] leading-relaxed"><strong className="text-white">How to start:</strong> {ch.how_to_start}</p>
                </div>

                <div className="pt-3 border-t border-[#1F1F1F] text-xs text-white space-y-1">
                  <span className="text-xs uppercase tracking-wider text-[#888888] block">Recommended First Action:</span>
                  <p className="text-[#888888] leading-relaxed">{ch.first_action}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Regional Language Tip */}
          {language_tip && (
            <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#1F1F1F] flex items-start gap-3 text-xs">
              <Languages className="w-4 h-4 text-white shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-medium block">Regional Language Customization Tip</span>
                <p className="text-[#888888] mt-0.5 leading-relaxed">{language_tip}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB B: PRICING STRATEGY */}
      {activeTab === 'pricing' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 space-y-3">
              <span className="text-xs uppercase tracking-wider text-[#888888] block">Suggested Price Model</span>
              <h3 className="text-base font-semibold text-white tracking-tight">{pricing_strategy?.approach}</h3>
              <div className="pt-2">
                <span className="text-xs text-[#888888] block">Price Anchor in India:</span>
                <span className="text-xl font-bold font-mono text-white block mt-0.5">{pricing_strategy?.anchor_price}</span>
              </div>
            </div>

            <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 space-y-3">
              <span className="text-xs uppercase tracking-wider text-[#888888] block">Price Range (INR)</span>
              <div className="text-2xl font-bold font-mono text-white tracking-tight">
                {pricing_strategy?.price_range_inr}
              </div>
              <div className="pt-2 text-xs text-[#888888] space-y-1">
                <span>Free Trial / Entry Offer: </span>
                <strong className="text-white">{pricing_strategy?.free_tier_needed ? 'Yes, Recommended for Trust' : 'Not Recommended'}</strong>
              </div>
            </div>
          </div>

          <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#888888] block">Economic Rationale for Indian Buyers</span>
            <p className="text-sm text-[#888888] leading-relaxed">{pricing_strategy?.rationale}</p>
          </div>

          {biggest_mistake && (
            <div className="p-4 rounded-xl bg-transparent border border-red-900 text-xs text-red-400 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-red-400 font-semibold block">Common Go-To-Market Pitfall in India:</strong>
                <p className="text-[#888888] mt-0.5 leading-relaxed">{biggest_mistake}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB C: FIRST 100 CUSTOMERS */}
      {activeTab === 'first100' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#888888] pb-1">
            <span>Actionable Customer Acquisition Checklist:</span>
            <span className="text-white">{completedTactics.length} of {first_100_customers?.length || 5} Complete</span>
          </div>

          <div className="space-y-3">
            {first_100_customers?.map((item) => {
              const isDone = completedTactics.includes(item.step);
              return (
                <div
                  key={item.step}
                  onClick={() => toggleTactic(item.step)}
                  className={`p-4 rounded-xl border flex items-start gap-3.5 transition cursor-pointer ${
                    isDone
                      ? 'bg-[#111111] border-[#2A2A2A]'
                      : 'bg-[#0A0A0A] border-[#1F1F1F] hover:border-[#2A2A2A]'
                  }`}
                >
                  <div className="pt-0.5">
                    {isDone ? (
                      <CheckSquare className="w-4 h-4 text-white" />
                    ) : (
                      <Square className="w-4 h-4 text-[#555555]" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold ${isDone ? 'line-through text-[#555555]' : 'text-white'}`}>
                        {item.tactic}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-[#555555]">
                        <span>Cost: {item.estimated_cost}</span>
                        <span>•</span>
                        <span>{item.timeline}</span>
                      </div>
                    </div>
                    <p className={`leading-relaxed ${isDone ? 'line-through text-[#555555]' : 'text-[#888888]'}`}>
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

