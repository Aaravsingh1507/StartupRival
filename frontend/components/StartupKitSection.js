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
  MapPin, 
  Sparkles 
} from 'lucide-react';
import Button from './Button';
import { useToast } from '@/lib/toast-context';

export default function StartupKitSection({ kit, onExportPdf }) {
  const { showToast } = useToast();
  const [activeSection, setActiveSection] = useState('overview');
  const [completedSteps, setCompletedSteps] = useState([1]);

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
      <div className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/25 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_8px_32px_rgba(3,7,18,0.5)]">
        <div className="space-y-2 flex-1 w-full">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#F4F8FF] font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#39BAFF]" />
              <span>Launch Execution Progress</span>
            </span>
            <span className="text-[#39BAFF] font-mono font-bold">{progressPercent}% Ready</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#0C1E3D] overflow-hidden p-0.5 border border-[#39BAFF]/20">
            <div
              className="h-full bg-gradient-to-r from-[#0866F5] to-[#39BAFF] transition-all duration-500 rounded-full shadow-[0_0_10px_rgba(57,186,255,0.6)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-[#4B6485]">
            {completedSteps.length} of {totalSteps} milestone tasks verified
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
          <Button
            variant="secondary"
            onClick={onExportPdf}
            className="gap-2 text-xs w-full sm:w-auto justify-center"
          >
            <Printer className="w-3.5 h-3.5 text-[#39BAFF]" />
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
              className={`rounded-2xl border transition-all duration-300 overflow-hidden shadow-[0_8px_32px_rgba(3,7,18,0.4)] ${
                isOpen 
                  ? 'bg-[#08152B]/95 border-[#39BAFF]/40 shadow-[0_0_25px_rgba(8,102,245,0.15)]' 
                  : 'bg-[#08152B]/70 border-[#39BAFF]/20 hover:border-[#39BAFF]/45'
              }`}
            >
              {/* Accordion Header */}
              <button
                type="button"
                onClick={() => setActiveSection(isOpen ? '' : sec.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors shadow-[0_0_12px_rgba(8,102,245,0.3)] ${
                    isOpen ? 'bg-[#0866F5] text-white' : 'bg-[#0C1E3D] text-[#39BAFF]'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#F4F8FF] tracking-tight">{sec.title}</h3>
                    <p className="text-xs text-[#8EABCF]">{sec.desc}</p>
                  </div>
                </div>

                <div className="text-[#39BAFF] p-1">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Accordion Content Body */}
              {isOpen && (
                <div className="px-6 pb-6 pt-2 border-t border-[#39BAFF]/15 space-y-4">
                  
                  {/* A. Business Overview */}
                  {sec.id === 'overview' && (
                    <div className="space-y-3 text-xs">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-4 rounded-xl bg-[#030712]/70 border border-[#39BAFF]/20 space-y-1">
                          <span className="text-xs uppercase tracking-wider text-[#8EABCF] block font-medium">Business Concept</span>
                          <p className="text-sm text-[#F4F8FF] font-medium">{kit.business_overview?.concept}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-[#030712]/70 border border-[#39BAFF]/20 space-y-1">
                          <span className="text-xs uppercase tracking-wider text-[#8EABCF] block font-medium">Target Customers</span>
                          <p className="text-sm text-[#8EABCF]">{kit.business_overview?.target_customers}</p>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-[#030712]/70 border border-[#39BAFF]/20 space-y-1">
                        <span className="text-xs uppercase tracking-wider text-[#8EABCF] block font-medium">Recommended Business Model</span>
                        <p className="text-sm text-[#8EABCF] leading-relaxed">{kit.business_overview?.business_model}</p>
                      </div>
                    </div>
                  )}

                  {/* B. Initial Investment */}
                  {sec.id === 'investment' && (
                    <div className="space-y-4">
                      {/* Range Visualizer Bar */}
                      <div className="p-5 rounded-xl bg-[#030712]/70 border border-[#39BAFF]/20 space-y-3">
                        <div className="flex items-baseline justify-between">
                          <span className="text-xs uppercase tracking-wider text-[#8EABCF] font-medium">Estimated Startup Capital</span>
                          <div className="text-right">
                            <span className="text-xl font-bold font-mono text-[#39BAFF] drop-shadow-[0_0_10px_rgba(57,186,255,0.4)]">
                              ₹{(kit.capital_estimate?.min_inr / 100000).toFixed(1)}L – ₹{(kit.capital_estimate?.max_inr / 100000).toFixed(1)}L
                            </span>
                            <span className="text-xs text-[#8EABCF] ml-1">INR</span>
                          </div>
                        </div>

                        <div className="w-full h-2 rounded-full bg-[#0C1E3D] relative overflow-hidden border border-[#39BAFF]/20">
                          <div className="absolute inset-y-0 left-[20%] right-[30%] bg-gradient-to-r from-[#0866F5] to-[#39BAFF] rounded-full shadow-[0_0_8px_rgba(57,186,255,0.8)]" />
                        </div>
                        <div className="flex justify-between text-xs text-[#4B6485]">
                          <span>Lean Pilot: ₹{(kit.capital_estimate?.min_inr / 100000).toFixed(1)}L</span>
                          <span>Conservative Launch: ₹{(kit.capital_estimate?.max_inr / 100000).toFixed(1)}L</span>
                        </div>
                      </div>

                      {/* Cost Breakdown */}
                      {kit.capital_estimate?.breakdown && (
                        <div className="space-y-2">
                          <h4 className="text-xs uppercase tracking-wider text-[#8EABCF] font-medium">
                            Capital Allocation Breakdown
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {Object.entries(kit.capital_estimate.breakdown).map(([item, cost]) => (
                              <div key={item} className="p-3.5 rounded-xl bg-[#08152B] border border-[#39BAFF]/20 flex items-center justify-between text-xs">
                                <span className="text-[#8EABCF]">{item}</span>
                                <span className="text-[#F4F8FF] font-mono font-bold">₹{cost.toLocaleString('en-IN')}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Assumptions */}
                      {kit.capital_estimate?.assumptions && (
                        <div className="p-4 rounded-xl bg-[#030712]/70 border border-[#39BAFF]/20 space-y-1">
                          <span className="text-xs uppercase tracking-wider text-[#8EABCF] block font-medium">Estimation Assumptions:</span>
                          <ul className="list-disc list-inside text-xs text-[#8EABCF] space-y-0.5">
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
                          <div key={idx} className="p-4 rounded-xl bg-[#030712]/70 border border-[#39BAFF]/20 flex flex-col justify-between space-y-3">
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[#F4F8FF]">{lic.name}</span>
                                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#0C1E3D] border border-[#39BAFF]/30 text-[#39BAFF] font-mono">
                                  {lic.timeframe}
                                </span>
                              </div>
                              <p className="text-xs text-[#8EABCF] leading-relaxed">{lic.description}</p>
                            </div>

                            <a
                              href={lic.portal_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-[#39BAFF] hover:underline pt-2 border-t border-[#39BAFF]/15 transition font-medium"
                            >
                              <span>Official Application Portal</span>
                              <ExternalLink className="w-3 h-3 text-[#39BAFF]" />
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
                        <div key={idx} className="p-5 rounded-xl bg-[#030712]/70 border border-[#39BAFF]/20 space-y-2.5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <h4 className="text-sm font-bold text-[#F4F8FF]">{scm.name}</h4>
                            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#0C1E3D] border border-[#39BAFF]/30 text-[#39BAFF]">
                              {scm.agency || 'Govt of India'}
                            </span>
                          </div>
                          <p className="text-xs text-[#F4F8FF] leading-relaxed"><strong className="text-[#39BAFF]">Subsidy Benefit:</strong> {scm.benefit}</p>
                          <p className="text-xs text-[#8EABCF]"><strong className="text-[#F4F8FF]">Eligibility:</strong> {scm.eligibility}</p>
                          
                          <div className="pt-2">
                            <a
                              href={scm.apply_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-xl bg-[#0C1E3D]/80 border border-[#39BAFF]/30 text-[#F4F8FF] hover:bg-[#0866F5]/25 hover:border-[#39BAFF]/60 transition font-medium"
                            >
                              <span>Scheme Details & Application</span>
                              <ExternalLink className="w-3 h-3 text-[#39BAFF]" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* E. Location & Infrastructure */}
                  {sec.id === 'location' && (
                    <div className="space-y-3 text-xs">
                      <div className="p-4 rounded-xl bg-[#030712]/70 border border-[#39BAFF]/20 space-y-1">
                        <span className="text-xs uppercase tracking-wider text-[#8EABCF] block font-medium">Space & Facility Requirements</span>
                        <p className="text-sm text-[#F4F8FF] font-medium">{kit.location_advice?.space_required}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#030712]/70 border border-[#39BAFF]/20 space-y-1">
                        <span className="text-xs uppercase tracking-wider text-[#8EABCF] block font-medium">Logistics & Connectivity Access</span>
                        <p className="text-sm text-[#8EABCF]">{kit.location_advice?.logistics_access}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#030712]/70 border border-[#39BAFF]/20 space-y-1">
                        <span className="text-xs uppercase tracking-wider text-[#8EABCF] block font-medium">Regional Practical Advice</span>
                        <p className="text-sm text-[#8EABCF] leading-relaxed">{kit.location_advice?.regional_tip}</p>
                      </div>
                    </div>
                  )}

                  {/* F. Step-by-Step Launch Roadmap Checklist */}
                  {sec.id === 'roadmap' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-[#8EABCF] pb-1">
                        <span>Click each task to update your progress:</span>
                        <span className="text-[#39BAFF] font-semibold">Estimated Launch: ~{kit.timeline_months} Months</span>
                      </div>

                      <div className="space-y-2">
                        {kit.first_steps?.map((stepItem) => {
                          const isDone = completedSteps.includes(stepItem.step);

                          return (
                            <div
                              key={stepItem.step}
                              onClick={() => toggleStep(stepItem.step)}
                              className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all duration-200 cursor-pointer ${
                                isDone
                                  ? 'bg-[#08152B]/90 border-[#39BAFF]/40 text-[#F4F8FF] shadow-[0_0_15px_rgba(8,102,245,0.15)]'
                                  : 'bg-[#030712]/60 border-[#39BAFF]/15 text-[#8EABCF] hover:border-[#39BAFF]/30'
                              }`}
                            >
                              <div className="pt-0.5">
                                {isDone ? (
                                  <CheckSquare className="w-4 h-4 text-[#39BAFF] shadow-[0_0_6px_rgba(57,186,255,0.6)]" />
                                ) : (
                                  <Square className="w-4 h-4 text-[#4B6485]" />
                                )}
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className={`text-xs font-bold ${isDone ? 'line-through text-[#4B6485]' : 'text-[#F4F8FF]'}`}>
                                    Step {stepItem.step}
                                  </span>
                                  <span className="text-[10px] text-[#39BAFF] px-2.5 py-0.5 rounded-full bg-[#0C1E3D] border border-[#39BAFF]/30 font-mono">
                                    {stepItem.timeline}
                                  </span>
                                </div>
                                <p className={`text-xs leading-relaxed ${isDone ? 'line-through text-[#4B6485]' : 'text-[#8EABCF]'}`}>
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
