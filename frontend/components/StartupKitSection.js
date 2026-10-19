'use client';

import { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Coins, 
  Building, 
  Landmark, 
  CheckSquare, 
  Square, 
  ExternalLink, 
  Printer, 
  Clock, 
  MapPin, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';
import ClayCard from './ClayCard';
import Button from './Button';
import { useToast } from '@/lib/toast-context';

export default function StartupKitSection({ kit, onExportPdf }) {
  const { showToast } = useToast();
  const [activeSection, setActiveSection] = useState('overview'); // 'overview', 'investment', 'licenses', 'schemes', 'location', 'roadmap'
  const [completedSteps, setCompletedSteps] = useState([1]); // step 1 checked by default

  if (!kit) return null;

  const toggleStep = (stepNumber) => {
    setCompletedSteps((prev) => {
      const exists = prev.includes(stepNumber);
      const updated = exists ? prev.filter((s) => s !== stepNumber) : [...prev, stepNumber];
      showToast(exists ? `Marked step #${stepNumber} as pending` : `Completed step #${stepNumber}! Keep going!`);
      return updated;
    });
  };

  const totalSteps = kit.first_steps?.length || 5;
  const progressPercent = Math.round((completedSteps.length / totalSteps) * 100);

  const sections = [
    { id: 'overview', title: 'A. Business Overview', icon: Building, desc: 'Concept, target customer & revenue model' },
    { id: 'investment', title: 'B. Initial Investment (INR)', icon: Coins, desc: 'Capital range, machinery & operational runway' },
    { id: 'licenses', title: 'C. Licenses & Registrations', icon: ShieldCheck, desc: 'FSSAI, Udyam, GST & state permits' },
    { id: 'schemes', title: 'D. Government Schemes & Subsidies', icon: Landmark, desc: 'AIF, PM FME & Mudra loan assistance' },
    { id: 'location', title: 'E. Location & Infrastructure', icon: MapPin, desc: 'Shed requirements, power & logistics access' },
    { id: 'roadmap', title: 'F. Step-by-Step Launch Roadmap', icon: CheckSquare, desc: 'Action checklist and 90-day launch schedule' },
  ];

  return (
    <div className="space-y-6">
      {/* Roadmap Progress Bar & Export Toolbar */}
      <div className="clay-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-white/15">
        <div className="space-y-1.5 flex-1 w-full">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white font-medium flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Launch Execution Progress</span>
            </span>
            <span className="text-white font-mono font-bold">{progressPercent}% Ready</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-[#737373]">
            {completedSteps.length} of {totalSteps} milestone tasks verified
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
          <Button
            variant="secondary"
            size="sm"
            onClick={onExportPdf}
            className="gap-1.5 text-xs w-full sm:w-auto justify-center"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export Roadmap (PDF)</span>
          </Button>
        </div>
      </div>

      {/* Accordion Panels */}
      <div className="space-y-3">
        {sections.map((sec) => {
          const isOpen = activeSection === sec.id;
          const Icon = sec.icon;

          return (
            <div
              key={sec.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen ? 'bg-[#151515] border-white/25 shadow-lg' : 'bg-[#111111] border-white/10 hover:border-white/20'
              }`}
            >
              {/* Accordion Header */}
              <button
                type="button"
                onClick={() => setActiveSection(isOpen ? '' : sec.id)}
                className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                    isOpen ? 'bg-white text-black' : 'bg-[#1D1D1D] text-[#A3A3A3]'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white tracking-tight">{sec.title}</h3>
                    <p className="text-[11px] text-[#737373]">{sec.desc}</p>
                  </div>
                </div>

                <div className="text-[#A3A3A3] p-1">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Accordion Content Body */}
              {isOpen && (
                <div className="px-5 pb-6 pt-2 border-t border-white/5 space-y-4 animate-in fade-in duration-200">
                  
                  {/* A. Business Overview */}
                  {sec.id === 'overview' && (
                    <div className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-[#181818] border border-white/10 space-y-1.5">
                          <span className="text-[10px] uppercase font-mono text-[#737373]">Business Concept</span>
                          <p className="text-sm text-white font-medium">{kit.business_overview?.concept}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-[#181818] border border-white/10 space-y-1.5">
                          <span className="text-[10px] uppercase font-mono text-[#737373]">Target Customers</span>
                          <p className="text-sm text-[#EDEDED]">{kit.business_overview?.target_customers}</p>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-[#181818] border border-white/10 space-y-1.5">
                        <span className="text-[10px] uppercase font-mono text-[#737373]">Recommended Business Model</span>
                        <p className="text-sm text-[#EDEDED] leading-relaxed">{kit.business_overview?.business_model}</p>
                      </div>
                    </div>
                  )}

                  {/* B. Initial Investment */}
                  {sec.id === 'investment' && (
                    <div className="space-y-4">
                      {/* Range Visualizer Bar */}
                      <div className="p-5 rounded-xl bg-[#181818] border border-white/10 space-y-3">
                        <div className="flex items-baseline justify-between">
                          <span className="text-xs text-[#A3A3A3]">Estimated Startup Capital</span>
                          <div className="text-right">
                            <span className="text-xl font-bold font-mono text-white">
                              ₹{(kit.capital_estimate?.min_inr / 100000).toFixed(1)}L – ₹{(kit.capital_estimate?.max_inr / 100000).toFixed(1)}L
                            </span>
                            <span className="text-[11px] text-[#737373] ml-1">INR</span>
                          </div>
                        </div>

                        <div className="w-full h-3 rounded-full bg-white/10 relative overflow-hidden">
                          <div className="absolute inset-y-0 left-[20%] right-[30%] bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
                        </div>
                        <div className="flex justify-between text-[10px] font-mono text-[#737373]">
                          <span>Lean Pilot: ₹{(kit.capital_estimate?.min_inr / 100000).toFixed(1)}L</span>
                          <span>Conservative Launch: ₹{(kit.capital_estimate?.max_inr / 100000).toFixed(1)}L</span>
                        </div>
                      </div>

                      {/* Cost Breakdown */}
                      {kit.capital_estimate?.breakdown && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                            Capital Allocation Breakdown
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {Object.entries(kit.capital_estimate.breakdown).map(([item, cost]) => (
                              <div key={item} className="p-3 rounded-lg bg-[#141414] border border-white/5 flex items-center justify-between text-xs">
                                <span className="text-[#A3A3A3]">{item}</span>
                                <span className="text-white font-mono font-medium">₹{cost.toLocaleString('en-IN')}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Assumptions */}
                      {kit.capital_estimate?.assumptions && (
                        <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
                          <span className="text-[10px] uppercase font-mono text-[#737373]">Estimation Assumptions:</span>
                          <ul className="list-disc list-inside text-xs text-[#A3A3A3] space-y-0.5">
                            {kit.capital_estimate.assumptions.map((ass, i) => (
                              <li key={i}>{ass}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* C. Licenses & Registrations */}
                  {sec.id === 'licenses' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {kit.licenses?.map((lic, idx) => (
                          <div key={idx} className="p-4 rounded-xl bg-[#181818] border border-white/10 flex flex-col justify-between space-y-3">
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-white">{lic.name}</span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white">
                                  {lic.timeframe}
                                </span>
                              </div>
                              <p className="text-xs text-[#A3A3A3] leading-relaxed">{lic.description}</p>
                            </div>

                            <a
                              href={lic.portal_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-white hover:underline font-mono pt-2 border-t border-white/5"
                            >
                              <span>Official Application Portal</span>
                              <ExternalLink className="w-3 h-3 text-[#A3A3A3]" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* D. Government Schemes & Subsidies */}
                  {sec.id === 'schemes' && (
                    <div className="space-y-3">
                      {kit.schemes?.map((scm, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-[#181818] border border-white/10 space-y-2.5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <h4 className="text-sm font-semibold text-white">{scm.name}</h4>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-[#EDEDED] self-start sm:self-auto">
                              {scm.agency || 'Govt of India'}
                            </span>
                          </div>
                          <p className="text-xs text-white/90 leading-relaxed"><strong className="text-white">Subsidy Benefit:</strong> {scm.benefit}</p>
                          <p className="text-xs text-[#A3A3A3]"><strong className="text-white">Eligibility:</strong> {scm.eligibility}</p>
                          
                          <div className="pt-2">
                            <a
                              href={scm.apply_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#202020] text-white hover:bg-white hover:text-black transition-all font-mono"
                            >
                              <span>Scheme Details & Application</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* E. Location & Infrastructure */}
                  {sec.id === 'location' && (
                    <div className="space-y-3 text-xs">
                      <div className="p-4 rounded-xl bg-[#181818] border border-white/10 space-y-1.5">
                        <span className="text-[10px] uppercase font-mono text-[#737373]">Space & Facility Requirements</span>
                        <p className="text-sm text-white font-medium">{kit.location_advice?.space_required}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#181818] border border-white/10 space-y-1.5">
                        <span className="text-[10px] uppercase font-mono text-[#737373]">Logistics & Connectivity Access</span>
                        <p className="text-sm text-[#EDEDED]">{kit.location_advice?.logistics_access}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#181818] border border-white/10 space-y-1.5">
                        <span className="text-[10px] uppercase font-mono text-[#737373]">Regional Practical Advice</span>
                        <p className="text-sm text-[#EDEDED] leading-relaxed">{kit.location_advice?.regional_tip}</p>
                      </div>
                    </div>
                  )}

                  {/* F. Step-by-Step Launch Roadmap Checklist */}
                  {sec.id === 'roadmap' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-[#A3A3A3] pb-1">
                        <span>Click each task to update your progress:</span>
                        <span className="font-mono text-white">Estimated Launch: ~{kit.timeline_months} Months</span>
                      </div>

                      <div className="space-y-2">
                        {kit.first_steps?.map((stepItem) => {
                          const isDone = completedSteps.includes(stepItem.step);

                          return (
                            <div
                              key={stepItem.step}
                              onClick={() => toggleStep(stepItem.step)}
                              className={`p-3.5 rounded-xl border flex items-start gap-3.5 transition-all cursor-pointer ${
                                isDone
                                  ? 'bg-[#181818] border-white/30 text-white'
                                  : 'bg-[#121212] border-white/10 text-[#A3A3A3] hover:border-white/20'
                              }`}
                            >
                              <div className="pt-0.5">
                                {isDone ? (
                                  <CheckSquare className="w-4 h-4 text-white" />
                                ) : (
                                  <Square className="w-4 h-4 text-[#737373]" />
                                )}
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className={`text-xs font-semibold ${isDone ? 'line-through text-[#737373]' : 'text-white'}`}>
                                    Step {stepItem.step}
                                  </span>
                                  <span className="text-[10px] font-mono text-[#737373] px-2 py-0.5 rounded bg-white/5">
                                    {stepItem.timeline}
                                  </span>
                                </div>
                                <p className={`text-xs leading-relaxed ${isDone ? 'line-through text-[#737373]' : 'text-[#EDEDED]'}`}>
                                  {stepItem.action}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
