'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from './Button';

export default function FundingFinder({ fundingSources = [], onQuizSubmit, loading = false }) {
  const [stage, setStage] = useState('idea'); // 'idea', 'mvp', 'revenue', 'scaling'
  const [bracket, setBracket] = useState('under_10l'); // 'under_10l', '10l_1cr', '1cr_plus'
  const [isRegistered, setIsRegistered] = useState(false);
  const [selectedType, setSelectedType] = useState('all'); // 'all', 'grant', 'angel', 'accelerator', 'vc'

  const handleRunQuiz = (e) => {
    if (e) e.preventDefault();
    if (onQuizSubmit) {
      onQuizSubmit({ stage, bracket, isRegistered });
    }
  };

  const filteredSources = fundingSources.filter((f) => {
    if (selectedType === 'all') return true;
    return f.type.toLowerCase().includes(selectedType.toLowerCase());
  });

  const getTypeBadgeClass = (type = '') => {
    const t = type.toLowerCase();
    if (t.includes('grant')) {
      return 'bg-green-950/70 text-green-400 border border-green-500/40';
    }
    if (t.includes('angel')) {
      return 'bg-[#0866F5]/20 text-[#39BAFF] border border-[#39BAFF]/40';
    }
    if (t.includes('vc') || t.includes('venture')) {
      return 'bg-purple-950/70 text-purple-300 border border-purple-500/40';
    }
    if (t.includes('accelerator') || t.includes('incubator')) {
      return 'bg-cyan-950/70 text-cyan-300 border border-cyan-500/40';
    }
    return 'bg-[#0C1E3D] text-[#F4F8FF] border border-[#39BAFF]/30';
  };

  return (
    <div className="space-y-6">
      {/* 3-QUESTION ELIGIBILITY QUIZ PANEL */}
      <div className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/25 rounded-2xl p-6 sm:p-8 space-y-6 shadow-[0_12px_45px_rgba(3,7,18,0.7)]">
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#39BAFF] block">
            Eligibility Quiz
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F4F8FF] tracking-tight">
            Find Matching Indian Grants & Capital
          </h2>
          <p className="text-sm text-[#8EABCF]">
            Filter official government schemes, angel syndicates, and seed accelerators tailored to your exact operational stage.
          </p>
        </div>

        <form onSubmit={handleRunQuiz} className="space-y-6">
          <div className="space-y-5">
            {/* Q1: Stage */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#8EABCF] mb-2 block font-medium">
                1. What stage is your startup at?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'idea', label: 'Idea Stage' },
                  { id: 'mvp', label: 'Working MVP' },
                  { id: 'revenue', label: 'Early Revenue' },
                  { id: 'scaling', label: 'Growth Stage' }
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStage(s.id)}
                    className={`rounded-xl py-2.5 px-3 text-sm text-center transition-all duration-200 cursor-pointer ${
                      stage === s.id
                        ? 'bg-[#0866F5] text-white font-semibold shadow-[0_0_15px_rgba(8,102,245,0.6)] border border-[#39BAFF]/50 scale-[1.02]'
                        : 'bg-[#030712]/70 border border-[#39BAFF]/20 text-[#8EABCF] hover:border-[#39BAFF]/50 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Q2: Amount Bracket */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#8EABCF] mb-2 block font-medium">
                2. Target Capital Required
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'under_10l', label: 'Under ₹10 Lakhs' },
                  { id: '10l_1cr', label: '₹10 Lakhs – ₹1 Crore' },
                  { id: '1cr_plus', label: '₹1 Crore+' }
                ].map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBracket(b.id)}
                    className={`rounded-xl py-2.5 px-3 text-sm text-center transition-all duration-200 cursor-pointer ${
                      bracket === b.id
                        ? 'bg-[#0866F5] text-white font-semibold shadow-[0_0_15px_rgba(8,102,245,0.6)] border border-[#39BAFF]/50 scale-[1.02]'
                        : 'bg-[#030712]/70 border border-[#39BAFF]/20 text-[#8EABCF] hover:border-[#39BAFF]/50 hover:text-white'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Q3: Company Registration */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#8EABCF] mb-2 block font-medium">
                3. Registered Entity (Pvt Ltd / LLP / Udyam)?
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsRegistered(true)}
                  className={`rounded-xl py-2.5 px-3 text-sm text-center transition-all duration-200 cursor-pointer ${
                    isRegistered
                      ? 'bg-[#0866F5] text-white font-semibold shadow-[0_0_15px_rgba(8,102,245,0.6)] border border-[#39BAFF]/50 scale-[1.02]'
                      : 'bg-[#030712]/70 border border-[#39BAFF]/20 text-[#8EABCF] hover:border-[#39BAFF]/50 hover:text-white'
                  }`}
                >
                  Yes, Registered
                </button>
                <button
                  type="button"
                  onClick={() => setIsRegistered(false)}
                  className={`rounded-xl py-2.5 px-3 text-sm text-center transition-all duration-200 cursor-pointer ${
                    !isRegistered
                      ? 'bg-[#0866F5] text-white font-semibold shadow-[0_0_15px_rgba(8,102,245,0.6)] border border-[#39BAFF]/50 scale-[1.02]'
                      : 'bg-[#030712]/70 border border-[#39BAFF]/20 text-[#8EABCF] hover:border-[#39BAFF]/50 hover:text-white'
                  }`}
                >
                  Not Yet
                </button>
              </div>
            </div>
          </div>

          <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-[#39BAFF]/15">
            <span className="text-xs text-[#8EABCF]">
              {isRegistered
                ? 'Eligible for Startup India Seed Fund & institutional equity.'
                : 'Eligible for DST NIDHI-PRAYAS & early ideation grants.'}
            </span>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              className="gap-2"
            >
              <span>Match Funding Opportunities</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>

      {/* FILTER TABS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#39BAFF]/15 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'all', label: 'All Opportunities' },
            { id: 'grant', label: 'Government Grants' },
            { id: 'angel', label: 'Angel Networks' },
            { id: 'accelerator', label: 'Accelerators' },
            { id: 'vc', label: 'Venture Capital' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedType(tab.id)}
              className={`rounded-xl px-4 py-2 text-sm transition-all duration-200 whitespace-nowrap cursor-pointer ${
                selectedType === tab.id
                  ? 'bg-[#0866F5] text-white font-semibold shadow-[0_0_15px_rgba(8,102,245,0.6)] border border-[#39BAFF]/40'
                  : 'text-[#8EABCF] hover:text-[#F4F8FF] hover:bg-[#0C1E3D]/50 border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-[#8EABCF] font-mono shrink-0">
          {filteredSources.length} Matched Programs
        </span>
      </div>

      {/* FUNDING CARDS GRID: Desktop grid-cols-2 gap-6, Mobile grid-cols-1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSources.map((item) => (
          <div 
            key={item.id} 
            className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/20 hover:border-[#39BAFF]/45 rounded-2xl p-6 flex flex-col justify-between shadow-[0_8px_32px_rgba(3,7,18,0.45)] hover:shadow-[0_12px_40px_rgba(8,102,245,0.18)] transition"
          >
            <div>
              {/* Header row: fund name + type badge right */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-[#F4F8FF] leading-snug">{item.name}</h3>
                  <p className="text-xs font-mono font-bold text-[#39BAFF] mt-1">
                    {item.ticket_size}
                  </p>
                </div>

                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full shrink-0 font-mono ${getTypeBadgeClass(item.type)}`}>
                  {item.type}
                </span>
              </div>

              {/* Why This Fits You */}
              <span className="text-xs uppercase tracking-wider text-[#8EABCF] mt-3.5 mb-1 block font-medium">
                Why This Fits You
              </span>
              <p className="text-sm text-[#F4F8FF] leading-relaxed">
                {item.fit_reason}
              </p>

              {/* Eligibility Section */}
              <div className="bg-[#030712]/70 rounded-xl p-3.5 mt-3 text-xs text-[#8EABCF] leading-relaxed border border-[#39BAFF]/15">
                <strong className="text-[#39BAFF] block mb-0.5 font-semibold">Eligibility:</strong>
                {item.eligibility}
              </div>
            </div>

            {/* Bottom Row */}
            <div className="pt-4 mt-4 border-t border-[#39BAFF]/15 flex items-center justify-between">
              <span className="text-[#8EABCF] text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#39BAFF]" />
                <span>Verified Official Program</span>
              </span>

              <a
                href={item.apply_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#39BAFF] text-sm font-semibold hover:underline transition inline-flex items-center gap-1"
              >
                <span>Apply Now →</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
