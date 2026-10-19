'use client';

import { useState } from 'react';
import { 
  Megaphone, 
  Tag, 
  Users, 
  CheckSquare, 
  Square, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Languages 
} from 'lucide-react';
import ClayCard from './ClayCard';
import Button from './Button';
import { useToast } from '@/lib/toast-context';

export default function GTMGuide({ gtmData }) {
  const [activeTab, setActiveTab] = useState('channels'); // 'channels', 'pricing', 'first100'
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
        <div className="p-4 rounded-2xl bg-[#141414] border border-white/20 flex items-start gap-3 text-xs">
          <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-white font-semibold">Tier 2 & 3 City Playbook Note:</span>
            <p className="text-[#A3A3A3] leading-relaxed">{tier_2_3_note}</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('channels')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            activeTab === 'channels'
              ? 'bg-white text-black font-semibold'
              : 'text-[#A3A3A3] hover:text-white hover:bg-white/5'
          }`}
        >
          Tab A — Marketing Channels ({top_channels?.length || 0})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('pricing')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            activeTab === 'pricing'
              ? 'bg-white text-black font-semibold'
              : 'text-[#A3A3A3] hover:text-white hover:bg-white/5'
          }`}
        >
          Tab B — Pricing Strategy
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('first100')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            activeTab === 'first100'
              ? 'bg-white text-black font-semibold'
              : 'text-[#A3A3A3] hover:text-white hover:bg-white/5'
          }`}
        >
          Tab C — First 100 Customers
        </button>
      </div>

      {/* TAB A: MARKETING CHANNELS */}
      {activeTab === 'channels' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {top_channels?.map((ch, idx) => (
              <ClayCard key={idx} className="p-5 flex flex-col justify-between space-y-4 border-white/10">
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-semibold text-white tracking-tight">{ch.channel}</h4>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      ch.cost === 'Free'
                        ? 'bg-white/10 text-white border-white/20'
                        : 'bg-[#202020] text-[#A3A3A3] border-white/10'
                    }`}>
                      {ch.cost}
                    </span>
                  </div>
                  <p className="text-xs text-[#A3A3A3] leading-relaxed"><strong className="text-white">Why it works:</strong> {ch.why_it_works}</p>
                  <p className="text-xs text-[#EDEDED] leading-relaxed"><strong className="text-white">How to start:</strong> {ch.how_to_start}</p>
                </div>

                <div className="pt-3 border-t border-white/5 text-xs text-white space-y-1">
                  <span className="text-[10px] uppercase font-mono text-[#737373] block">Recommended First Action:</span>
                  <p className="text-[#EDEDED] font-medium leading-relaxed">{ch.first_action}</p>
                </div>
              </ClayCard>
            ))}
          </div>

          {/* Regional Language Tip */}
          {language_tip && (
            <div className="p-4 rounded-xl bg-[#121212] border border-white/10 flex items-start gap-3 text-xs">
              <Languages className="w-4 h-4 text-white shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-medium block">Regional Language Customization Tip</span>
                <p className="text-[#A3A3A3] mt-0.5 leading-relaxed">{language_tip}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB B: PRICING STRATEGY */}
      {activeTab === 'pricing' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ClayCard className="p-6 border-white/15 space-y-3">
              <span className="text-[10px] font-mono uppercase text-[#737373] block">Suggested Price Model</span>
              <h3 className="text-lg font-bold text-white tracking-tight">{pricing_strategy?.approach}</h3>
              <div className="pt-2">
                <span className="text-xs text-[#A3A3A3] block">Price Anchor in India:</span>
                <span className="text-xl font-bold font-mono text-white block mt-0.5">{pricing_strategy?.anchor_price}</span>
              </div>
            </ClayCard>

            <ClayCard className="p-6 border-white/15 space-y-3">
              <span className="text-[10px] font-mono uppercase text-[#737373] block">Price Range (INR)</span>
              <div className="text-2xl font-bold font-mono text-white tracking-tight">
                {pricing_strategy?.price_range_inr}
              </div>
              <div className="pt-2 text-xs text-[#A3A3A3] space-y-1">
                <span>Free Trial / Entry Offer: </span>
                <strong className="text-white">{pricing_strategy?.free_tier_needed ? 'Yes, Recommended for Trust' : 'Not Recommended'}</strong>
              </div>
            </ClayCard>
          </div>

          <div className="clay-card p-5 border-white/10 space-y-2 bg-[#141414]">
            <span className="text-[10px] uppercase font-mono text-[#737373]">Economic Rationale for Indian Buyers</span>
            <p className="text-xs text-[#EDEDED] leading-relaxed">{pricing_strategy?.rationale}</p>
          </div>

          {biggest_mistake && (
            <div className="p-4 rounded-xl bg-[#2A1515] border border-red-500/20 text-xs text-red-200 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Common Go-To-Market Pitfall in India:</strong>
                <p className="text-red-300/90 mt-0.5 leading-relaxed">{biggest_mistake}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB C: FIRST 100 CUSTOMERS */}
      {activeTab === 'first100' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs text-[#A3A3A3] pb-1">
            <span>Actionable Customer Acquisition Checklist:</span>
            <span className="font-mono text-white">{completedTactics.length} of {first_100_customers?.length || 5} Complete</span>
          </div>

          <div className="space-y-3">
            {first_100_customers?.map((item) => {
              const isDone = completedTactics.includes(item.step);
              return (
                <div
                  key={item.step}
                  onClick={() => toggleTactic(item.step)}
                  className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all cursor-pointer ${
                    isDone
                      ? 'bg-[#181818] border-white/30'
                      : 'bg-[#121212] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="pt-0.5">
                    {isDone ? (
                      <CheckSquare className="w-4 h-4 text-white" />
                    ) : (
                      <Square className="w-4 h-4 text-[#737373]" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold ${isDone ? 'line-through text-[#737373]' : 'text-white'}`}>
                        {item.tactic}
                      </span>
                      <div className="flex items-center gap-2 font-mono text-[10px] text-[#737373]">
                        <span>Cost: {item.estimated_cost}</span>
                        <span>•</span>
                        <span>{item.timeline}</span>
                      </div>
                    </div>
                    <p className={`leading-relaxed ${isDone ? 'line-through text-[#737373]' : 'text-[#EDEDED]'}`}>
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
