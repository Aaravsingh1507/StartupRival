'use client';

import { useState, useEffect, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import SectorSelector from '@/components/SectorSelector';
import RegionSelector from '@/components/RegionSelector';
import GapResultCard from '@/components/GapResultCard';
import ValidatorScorecard from '@/components/ValidatorScorecard';
import LoadingState from '@/components/LoadingState';
import EmptyState from '@/components/EmptyState';
import { findMarketGaps, validateIdea } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/lib/toast-context';
import { Search, Info, SlidersHorizontal, RefreshCw, Radar } from 'lucide-react';

function GapFinderContent() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [sector, setSector] = useState('Agriculture');
  const [region, setRegion] = useState('Maharashtra');
  const [specificInterest, setSpecificInterest] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [validatingIdea, setValidatingIdea] = useState(null);
  const [validationLoading, setValidationLoading] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const qSector = urlParams.get('sector');
      const qRegion = urlParams.get('region');
      if (qSector) setSector(qSector);
      if (qRegion) setRegion(qRegion);
    }
  }, []);

  const handleDiscoverGaps = async (e) => {
    if (e) e.preventDefault();
    if (!sector) {
      showToast('Please select a business sector', 'warning');
      return;
    }
    if (!region) {
      showToast('Please select an Indian region or city', 'warning');
      return;
    }

    setLoading(true);
    setValidatingIdea(null);
    setResults(null);

    try {
      const data = await findMarketGaps({
        sector,
        region,
        specificInterest,
        userId: user?.id
      });
      setResults(data);
      showToast(`Discovered ${data.gaps?.length || 0} market opportunities!`);
    } catch (err) {
      console.error('Error finding market gaps:', err);
      showToast('Failed to analyze market gaps. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleValidateClick = async (opportunity) => {
    setValidationLoading(true);
    try {
      const validationData = await validateIdea({
        gapName: opportunity.name,
        sector,
        region
      });
      setValidatingIdea({
        ...opportunity,
        ...validationData
      });
    } catch (err) {
      console.error('Error validating idea:', err);
      setValidatingIdea(opportunity);
    } finally {
      setValidationLoading(false);
    }
  };

  const sortedGaps = results?.gaps ? [...results.gaps].sort((a, b) => {
    if (sortBy === 'score-desc') {
      const scoreA = a.demandScore ?? a.demand_score ?? 0;
      const scoreB = b.demandScore ?? b.demand_score ?? 0;
      return scoreB - scoreA;
    }
    return 0;
  }) : [];

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#F5F5F5] selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          
          {/* Page Header */}
          <div className="space-y-2">
            <span className="text-label">Discovery Engine</span>
            <h1 className="text-h1 text-white">
              Discover Untapped Market Gaps in India
            </h1>
            <p className="text-body text-[#888888]">
              Select an industry sector and Indian territory. Our engine cross-references real search spikes, local census densities, and supply shortages to reveal genuine business voids.
            </p>
          </div>

          {/* Discovery Form Card */}
          <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 sm:p-6 space-y-6">
            <form onSubmit={handleDiscoverGaps} className="space-y-5">
              <div className="space-y-5">
                {/* 1. Sector Selector */}
                <SectorSelector
                  selectedSector={sector}
                  onSelectSector={(s) => setSector(s)}
                />

                {/* 2. Region Selector (Dropdown only) */}
                <RegionSelector
                  selectedRegion={region}
                  onSelectRegion={(r) => setRegion(r)}
                />
              </div>

              {/* Optional Text Field */}
              <div className="space-y-1.5 pt-2 border-t border-[#1F1F1F]">
                <label className="text-label block" htmlFor="interest">
                  Optional: Describe your niche
                </label>
                <input
                  id="interest"
                  type="text"
                  placeholder="e.g. Organic farming logistics, quick-commerce kirana tech, affordable diagnostic clinics..."
                  value={specificInterest}
                  onChange={(e) => setSpecificInterest(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] text-white border border-[#2A2A2A] hover:border-[#3A3A3A] focus:border-white focus:outline-none text-sm transition placeholder:text-[#555555]"
                />
              </div>

              {/* Info Notice - Placed ABOVE the button */}
              <div className="bg-[#111111] border border-[#2A2A2A] rounded-lg p-3 flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-[#888888] shrink-0 mt-0.5" />
                <p className="text-xs text-[#888888] leading-relaxed">
                  StartupRival executes parallel scans across Google Trends query velocity, industrial cluster directories, and data.gov.in census indices to deliver 3 tailored opportunity dossiers.
                </p>
              </div>

              {/* Primary Action Button - Full Width */}
              <div className="space-y-2 pt-1">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={loading}
                  className="w-full justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Discover Market Gaps</span>
                </Button>

                <p className="text-xs text-[#555555] text-center">
                  Zero startup experience needed
                </p>
              </div>
            </form>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="py-8">
              <LoadingState message="Analyzing market signals for your region..." />
            </div>
          )}

          {/* VALIDATION SCORECARD MODAL */}
          {validatingIdea && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
              <div className="max-w-3xl w-full my-8">
                <ValidatorScorecard
                  idea={validatingIdea}
                  onClose={() => setValidatingIdea(null)}
                />
              </div>
            </div>
          )}

          {/* RESULTS SECTION */}
          {!loading && results && (
            <section className="space-y-6 pt-2">
              {/* Results Control Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#111111] border border-[#2A2A2A]">
                <div>
                  <span className="text-label block">Market Opportunity Report</span>
                  <h2 className="text-base font-semibold text-white mt-0.5">
                    {sector} in {region}
                  </h2>
                </div>

                {/* Sort / Filter dropdown */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-[#888888]">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Sort:</span>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-[#0A0A0A] text-white border border-[#2A2A2A] text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="default">Default Relevance</option>
                    <option value="score-desc">Highest Demand Score</option>
                  </select>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleDiscoverGaps}
                    className="text-xs gap-1.5"
                    title="Re-run analysis"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Re-run</span>
                  </Button>
                </div>
              </div>

              {/* 3 Opportunity Cards Grid */}
              {sortedGaps.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {sortedGaps.map((opp) => (
                    <GapResultCard
                      key={opp.id || opp.name}
                      opportunity={opp}
                      onValidate={handleValidateClick}
                      onSaveChange={() => {}}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No opportunities found for this query"
                  description="We couldn't detect clear demand signals for this combination. Try broadening your region or choosing another sector."
                  actionLabel="Reset to Agriculture in Maharashtra"
                  onAction={() => {
                    setSector('Agriculture');
                    setRegion('Maharashtra');
                  }}
                />
              )}
            </section>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function GapFinderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
      <GapFinderContent />
    </Suspense>
  );
}
