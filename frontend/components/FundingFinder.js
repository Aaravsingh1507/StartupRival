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
      return 'bg-green-950 text-green-400 border border-green-900';
    }
    if (t.includes('angel')) {
      return 'bg-blue-950 text-blue-400 border border-blue-900';
    }
    if (t.includes('vc') || t.includes('venture')) {
      return 'bg-purple-950 text-purple-400 border border-purple-900';
    }
    if (t.includes('accelerator') || t.includes('incubator')) {
      return 'bg-orange-950 text-orange-400 border border-orange-900';
    }
    return 'bg-[#1A1A1A] text-white border border-[#2A2A2A]';
  };

  return (
    <div className="space-y-6">
      {/* 3-QUESTION ELIGIBILITY QUIZ PANEL */}
      <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 space-y-5">
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-wider text-[#888888] block">
            Eligibility Quiz
          </span>
          <h2 className="text-xl font-semibold text-white tracking-tight">
            Find Matching Indian Grants & Capital
          </h2>
          <p className="text-sm text-[#888888]">
            Filter official government schemes, angel syndicates, and seed accelerators tailored to your exact operational stage.
          </p>
        </div>

        <form onSubmit={handleRunQuiz} className="space-y-5">
          <div className="space-y-4">
            {/* Q1: Stage */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#888888] mb-2 block">
                1. What stage is your startup at?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                    className={`rounded-lg py-2.5 px-3 text-sm text-center transition ${
                      stage === s.id
                        ? 'bg-white text-black font-medium'
                        : 'bg-transparent border border-[#2A2A2A] text-[#888888] hover:border-white hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Q2: Amount Bracket */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#888888] mb-2 block">
                2. Target Capital Required
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'under_10l', label: 'Under ₹10 Lakhs' },
                  { id: '10l_1cr', label: '₹10 Lakhs – ₹1 Crore' },
                  { id: '1cr_plus', label: '₹1 Crore+' }
                ].map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBracket(b.id)}
                    className={`rounded-lg py-2.5 px-3 text-sm text-center transition ${
                      bracket === b.id
                        ? 'bg-white text-black font-medium'
                        : 'bg-transparent border border-[#2A2A2A] text-[#888888] hover:border-white hover:text-white'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Q3: Company Registration */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#888888] mb-2 block">
                3. Registered Entity (Pvt Ltd / LLP / Udyam)?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsRegistered(true)}
                  className={`rounded-lg py-2.5 px-3 text-sm text-center transition ${
                    isRegistered
                      ? 'bg-white text-black font-medium'
                      : 'bg-transparent border border-[#2A2A2A] text-[#888888] hover:border-white hover:text-white'
                  }`}
                >
                  Yes, Registered
                </button>
                <button
                  type="button"
                  onClick={() => setIsRegistered(false)}
                  className={`rounded-lg py-2.5 px-3 text-sm text-center transition ${
                    !isRegistered
                      ? 'bg-white text-black font-medium'
                      : 'bg-transparent border border-[#2A2A2A] text-[#888888] hover:border-white hover:text-white'
                  }`}
                >
                  Not Yet
                </button>
              </div>
            </div>
          </div>

          <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-[#1F1F1F]">
            <span className="text-xs text-[#555555]">
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F1F1F] pb-3">
        <div className="flex items-center gap-1.5 overflow-x-auto">
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
              className={`rounded-lg px-4 py-1.5 text-sm transition whitespace-nowrap ${
                selectedType === tab.id
                  ? 'bg-white text-black font-medium'
                  : 'text-[#888888] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-[#555555] shrink-0">
          {filteredSources.length} Matched Programs
        </span>
      </div>

      {/* FUNDING CARDS GRID: Desktop grid-cols-2 gap-6, Mobile grid-cols-1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSources.map((item) => (
          <div 
            key={item.id} 
            className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 flex flex-col justify-between"
          >
            <div>
              {/* Header row: fund name + type badge right */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-white leading-snug">{item.name}</h3>
                  <p className="text-xs text-[#888888] mt-0.5">
                    {item.ticket_size}
                  </p>
                </div>

                <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${getTypeBadgeClass(item.type)}`}>
                  {item.type}
                </span>
              </div>

              {/* Why This Fits You */}
              <span className="text-xs uppercase tracking-wider text-[#888888] mt-3 mb-1 block">
                Why This Fits You
              </span>
              <p className="text-sm text-[#F5F5F5] leading-relaxed">
                {item.fit_reason}
              </p>

              {/* Eligibility Section */}
              <div className="bg-[#0A0A0A] rounded-lg p-3 mt-3 text-xs text-[#888888] leading-relaxed border border-[#1F1F1F]">
                <strong className="text-white block mb-0.5">Eligibility:</strong>
                {item.eligibility}
              </div>
            </div>

            {/* Bottom Row */}
            <div className="pt-4 mt-4 border-t border-[#1F1F1F] flex items-center justify-between">
              <span className="text-[#555555] text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#555555]" />
                <span>Verified Official Program</span>
              </span>

              <a
                href={item.apply_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm font-medium hover:text-[#888888] transition inline-flex items-center gap-1"
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

