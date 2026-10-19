'use client';

import { useState, useEffect, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FundingFinder from '@/components/FundingFinder';
import LoadingState from '@/components/LoadingState';
import { getFundingSources } from '@/lib/api';
import { Landmark, Sparkles, Filter, ShieldCheck, CheckCircle } from 'lucide-react';

function FundingContent() {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState({
    stage: 'idea',
    bracket: 'under_10l',
    isRegistered: false,
    sector: 'all'
  });

  useEffect(() => {
    async function loadSources() {
      setLoading(true);
      try {
        const data = await getFundingSources(activeFilters);
        setSources(data);
      } catch (err) {
        console.error('Failed to load funding sources:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSources();
  }, [activeFilters]);

  const handleQuizSubmit = (quizAnswers) => {
    setActiveFilters((prev) => ({
      ...prev,
      ...quizAnswers
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080808] text-white selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#737373] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                Phase 3 Capital Discovery
              </span>
              <span className="text-[10px] font-mono text-white px-2 py-0.5 rounded bg-white/10 flex items-center gap-1">
                <Landmark className="w-3 h-3" />
                India Seed & Grants
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Indian Startup Funding Finder
            </h1>
            <p className="text-sm text-[#A3A3A3] max-w-2xl leading-relaxed">
              Discover verified Central & State government grants (Startup India Seed Fund, NIDHI-PRAYAS), top angel syndicates, and seed accelerators. Zero fabricated ticket sizes or dummy application forms.
            </p>
          </div>

          {/* Funding Finder Component with 3-question eligibility quiz */}
          {loading ? (
            <LoadingState message="Matching Indian grant schemes, angel networks, and early-stage capital..." />
          ) : (
            <FundingFinder
              fundingSources={sources}
              onQuizSubmit={handleQuizSubmit}
              loading={loading}
            />
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function FundingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080808] flex items-center justify-center text-white font-mono text-sm">Loading Funding Opportunities...</div>}>
      <FundingContent />
    </Suspense>
  );
}
