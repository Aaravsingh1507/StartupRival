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
    <div className="min-h-screen flex flex-col bg-[#030712] text-[#F4F8FF] selection:bg-[#0866F5] selection:text-white relative overflow-hidden">
      {/* Background dotted pattern & ambient halos */}
      <div className="absolute inset-0 dotted-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-[#0866F5]/10 rounded-full blur-[140px] pointer-events-none" />

      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-6 py-8 relative z-10">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="space-y-2 pb-4 border-b border-[#39BAFF]/15">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#39BAFF] px-2.5 py-0.5 rounded-full bg-[#0C1E3D] border border-[#39BAFF]/30">
                Phase 3 Capital Discovery
              </span>
              <span className="text-xs text-[#F4F8FF] px-2.5 py-0.5 rounded-full bg-[#0866F5]/20 border border-[#39BAFF]/30 flex items-center gap-1.5 font-medium">
                <Landmark className="w-3.5 h-3.5 text-[#39BAFF]" />
                <span>India Seed & Grants</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F8FF]">
              Indian Startup Funding Finder
            </h1>
            <p className="text-sm text-[#8EABCF] max-w-2xl leading-relaxed">
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
    <Suspense fallback={<div className="min-h-screen bg-[#030712] flex items-center justify-center text-[#F4F8FF] font-mono text-sm">Loading Funding Opportunities...</div>}>
      <FundingContent />
    </Suspense>
  );
}
