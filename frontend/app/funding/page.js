'use client';

import { useState, useEffect, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FundingFinder from '@/components/FundingFinder';
import LoadingState from '@/components/LoadingState';
import { getFundingSources } from '@/lib/api';
import { Landmark } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#F5F5F5] selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1 pt-20 pb-16 px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="space-y-2 pb-4 border-b border-[#1F1F1F]">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-[#888888] px-2 py-0.5 rounded bg-[#1A1A1A] border border-[#2A2A2A]">
                Phase 3 Capital Discovery
              </span>
              <span className="text-xs text-white px-2 py-0.5 rounded bg-[#111111] border border-[#2A2A2A] flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5" />
                <span>India Seed & Grants</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Indian Startup Funding Finder
            </h1>
            <p className="text-sm text-[#888888] max-w-2xl leading-relaxed">
              Discover verified Central & State government grants (Startup India Seed Fund, NIDHI-PRAYAS), top angel syndicates, and seed accelerators. Zero fabricated ticket sizes or dummy application forms.
            </p>
          </div>

          {/* Funding Finder Component */}
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
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white font-mono text-sm">Loading Funding Opportunities...</div>}>
      <FundingContent />
    </Suspense>
  );
}

