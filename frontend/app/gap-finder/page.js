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
import { Search, Info, SlidersHorizontal, RefreshCw } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col bg-[#030712] text-[#F4F8FF] selection:bg-[#0866F5] selection:text-white relative overflow-hidden">
      {/* Background dotted particle pattern & ambient halos */}
      <div className="absolute inset-0 dotted-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0866F5]/10 rounded-full blur-[140px] pointer-events-none" />

      <Navbar />

      <main className="flex-1 pt-24 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          
          {/* Page Header */}
          <div className="space-y-2.5">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#39BAFF] px-2.5 py-0.5 rounded-full bg-[#0866F5]/15 border border-[#39BAFF]/30 inline-block">
              Discovery Engine
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F8FF]">
              Discover Untapped Market Gaps in India
            </h1>
            <p className="text-sm sm:text-base text-[#8EABCF] leading-relaxed max-w-2xl">
              Select an industry sector and Indian territory. Our engine cross-references real search spikes, local census densities, and supply shortages to reveal genuine business voids.
            </p>
          </div>

          {/* Discovery Form Card */}
          <div className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/25 rounded-2xl p-6 sm:p-8 space-y-6 shadow-[0_12px_45px_rgba(3,7,18,0.7)]">
            <form onSubmit={handleDiscoverGaps} className="space-y-6">
              <div className="space-y-6">
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
              <div className="space-y-2 pt-2 border-t border-[#39BAFF]/15">
                <label className="text-xs uppercase tracking-wider text-[#8EABCF] font-medium block" htmlFor="interest">
                  Optional: Describe your niche or problem in plain language
                </label>
                <input
                  id="interest"
                  type="text"
                  placeholder="e.g. Organic farming logistics, quick-commerce kirana tech, affordable diagnostic clinics..."
                  value={specificInterest}
                  onChange={(e) => setSpecificInterest(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#030712]/80 text-[#F4F8FF] border border-[#39BAFF]/25 hover:border-[#39BAFF]/50 focus:border-[#39BAFF] focus:ring-1 focus:ring-[#39BAFF]/50 focus:outline-none text-sm transition placeholder:text-[#4B6485]"
                />
              </div>

              {/* Info Notice - Placed ABOVE the button */}
              <div className="bg-[#0C1E3D]/80 border border-[#39BAFF]/25 rounded-xl p-3.5 flex items-start gap-3">
                <Info className="w-4 h-4 text-[#39BAFF] shrink-0 mt-0.5" />
                <p className="text-xs text-[#8EABCF] leading-relaxed">
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
                  className="w-full justify-center gap-2 py-3.5"
                >
                  <Search className="w-4 h-4" />
                  <span>Discover Market Gaps</span>
                </Button>

                <p className="text-xs text-[#4B6485] text-center font-medium">
                  Zero startup experience needed • Beginner-friendly plain language research
                </p>
              </div>
            </form>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="py-8">
              <LoadingState message="Analyzing market signals, census indices & Google Trends query velocity..." />
            </div>
          )}

          {/* VALIDATION SCORECARD MODAL */}
          {validatingIdea && (
            <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
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
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#08152B]/85 border border-[#39BAFF]/20 backdrop-blur-md shadow-[0_8px_32px_rgba(3,7,18,0.5)]">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#39BAFF] block">Market Opportunity Report</span>
                  <h2 className="text-lg font-bold text-[#F4F8FF] mt-0.5">
                    {sector} in {region}
                  </h2>
                </div>

                {/* Sort / Filter dropdown */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-[#8EABCF]">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#39BAFF]" />
                    <span>Sort:</span>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#030712]/90 text-[#F4F8FF] border border-[#39BAFF]/25 text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="default" className="bg-[#08152B] text-white">Default Relevance</option>
                    <option value="score-desc" className="bg-[#08152B] text-white">Highest Demand Score</option>
                  </select>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleDiscoverGaps}
                    className="text-xs gap-1.5"
                    title="Re-run analysis"
                  >
                    <RefreshCw className="w-3 h-3 text-[#39BAFF]" />
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
    <Suspense fallback={<div className="min-h-screen bg-[#030712]" />}>
      <GapFinderContent />
    </Suspense>
  );
}
