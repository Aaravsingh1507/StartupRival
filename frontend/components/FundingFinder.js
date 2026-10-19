'use client';

import { useState } from 'react';
import { Landmark, ArrowRight, ExternalLink, CheckCircle, Filter, RotateCcw, ShieldCheck } from 'lucide-react';
import ClayCard from './ClayCard';
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
    return f.type.toLowerCase() === selectedType.toLowerCase();
  });

  return (
    <div className="space-y-8">
      {/* 3-QUESTION ELIGIBILITY QUIZ PANEL */}
      <ClayCard className="p-6 sm:p-8 border-white/20 bg-[#141414] space-y-6">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#737373] px-2 py-0.5 rounded bg-white/5 border border-white/10">
            30-Second Eligibility Quiz
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Find Matching Indian Grants & Capital
          </h2>
          <p className="text-xs text-[#A3A3A3]">
            Filter official government schemes, angel syndicates, and seed accelerators tailored to your exact operational stage.
          </p>
        </div>

        <form onSubmit={handleRunQuiz} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Q1: Stage */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white block">
                1. What stage is your startup at?
              </label>
              <div className="grid grid-cols-2 gap-2">
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
                    className={`text-xs p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      stage === s.id
                        ? 'bg-white text-black font-semibold border-white shadow-sm'
                        : 'bg-[#181818] text-[#A3A3A3] hover:text-white border-white/10 hover:border-white/25'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Q2: Amount Bracket */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white block">
                2. Target Capital Required
              </label>
              <div className="space-y-2">
                {[
                  { id: 'under_10l', label: 'Under ₹10 Lakhs (Grants / Pre-Seed)' },
                  { id: '10l_1cr', label: '₹10 Lakhs – ₹1 Crore (Seed / Angels)' },
                  { id: '1cr_plus', label: '₹1 Crore+ (Institutional VC / Debt)' }
                ].map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBracket(b.id)}
                    className={`w-full text-xs p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      bracket === b.id
                        ? 'bg-white text-black font-semibold border-white shadow-sm'
                        : 'bg-[#181818] text-[#A3A3A3] hover:text-white border-white/10 hover:border-white/25'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Q3: Company Registration */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white block">
                3. Registered Entity (Pvt Ltd / LLP / Udyam)?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsRegistered(true)}
                  className={`text-xs p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    isRegistered
                      ? 'bg-white text-black font-semibold border-white shadow-sm'
                      : 'bg-[#181818] text-[#A3A3A3] hover:text-white border-white/10 hover:border-white/25'
                  }`}
                >
                  Yes, Registered
                </button>
                <button
                  type="button"
                  onClick={() => setIsRegistered(false)}
                  className={`text-xs p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    !isRegistered
                      ? 'bg-white text-black font-semibold border-white shadow-sm'
                      : 'bg-[#181818] text-[#A3A3A3] hover:text-white border-white/10 hover:border-white/25'
                  }`}
                >
                  Not Yet
                </button>
              </div>
              <p className="text-[11px] text-[#737373] pt-1">
                {isRegistered
                  ? 'Eligible for Startup India Seed Fund & institutional equity'
                  : 'Eligible for DST PRAYAS & early ideation grants'}
              </p>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-white/5">
            <span className="text-xs text-[#737373]">
              All funding sources point directly to verified Indian government & syndicate portals.
            </span>
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              className="gap-2 px-6"
            >
              <span>Match Funding Opportunities</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </ClayCard>

      {/* FILTER TABS & MATCHED RESULTS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
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
                className={`text-xs px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  selectedType === tab.id
                    ? 'bg-white text-black font-semibold'
                    : 'text-[#A3A3A3] hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-[#737373] shrink-0">
            {filteredSources.length} Matched Programs
          </span>
        </div>

        {/* Funding Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSources.map((item) => (
            <ClayCard key={item.id} className="p-5 flex flex-col justify-between space-y-4 border-white/10">
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold text-white tracking-tight">{item.name}</h3>
                    <span className="text-[10px] font-mono text-[#737373] uppercase tracking-wider block mt-0.5">
                      {item.type.toUpperCase()} • {item.ticket_size}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white shrink-0">
                    {item.stages_supported?.join(', ').toUpperCase()}
                  </span>
                </div>

                <p className="text-xs text-white/90 leading-relaxed">
                  <strong className="text-white">Why This Fits You:</strong> {item.fit_reason}
                </p>

                <div className="p-3 rounded-lg bg-[#141414] border border-white/5 text-xs text-[#A3A3A3]">
                  <strong className="text-white block mb-0.5">Eligibility:</strong>
                  {item.eligibility}
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#737373]">Verified Official Program</span>
                <a
                  href={item.apply_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-lg bg-[#202020] hover:bg-white hover:text-black text-white font-medium transition-all"
                >
                  <span>Apply Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </ClayCard>
          ))}
        </div>
      </div>
    </div>
  );
}
