'use client';

import { useState, useEffect, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import ClayCard from '@/components/ClayCard';
import GlassPanel from '@/components/GlassPanel';
import SectorSelector from '@/components/SectorSelector';
import RegionSelector from '@/components/RegionSelector';
import GapResultCard from '@/components/GapResultCard';
import ValidatorScorecard from '@/components/ValidatorScorecard';
import LoadingState from '@/components/LoadingState';
import EmptyState from '@/components/EmptyState';
import { findMarketGaps, validateIdea } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/lib/toast-context';
import { Search, Sparkles, Filter, SlidersHorizontal, ArrowLeft, RefreshCw, CheckCircle, Info, Compass } from 'lucide-react';

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
  const [sortBy, setSortBy] = useState('default'); // 'default', 'score-desc'

  // Pre-load default initial search or check URL params
  useEffect(() => {
    // Check if coming with query params or previous search
    const urlParams = new URLSearchParams(window.location.search);
    const qSector = urlParams.get('sector');
    const qRegion = urlParams.get('region');
    if (qSector) setSector(qSector);
    if (qRegion) setRegion(qRegion);
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
      showToast(`Discovered ${data.gaps?.length || 0} market opportunities for ${sector} in ${region}!`);
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
      // Fetch comprehensive scorecard from backend endpoint
      const validationData = await validateIdea({
        gapName: opportunity.name,
        sector,
        region
      });
      // Merge with opportunity info
      setValidatingIdea({
        ...opportunity,
        ...validationData
      });
      showToast(`Generated validation scorecard for "${opportunity.name}"`);
    } catch (err) {
      console.error('Error validating idea:', err);
      // Fallback to local opportunity validation
      setValidatingIdea(opportunity);
    } finally {
      setValidationLoading(false);
    }
  };

  // Sort opportunities
  const sortedGaps = results?.gaps ? [...results.gaps].sort((a, b) => {
    if (sortBy === 'score-desc') {
      const scoreA = a.demandScore ?? a.demand_score ?? 0;
      const scoreB = b.demandScore ?? b.demand_score ?? 0;
      return scoreB - scoreA;
    }
    return 0;
  }) : [];

  return (
    <div className="min-h-screen flex flex-col bg-[#080808] text-white selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Page Header */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#A3A3A3]">
              <Compass className="w-3.5 h-3.5 text-white" />
              <span>The Core Discovery Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Discover Untapped Market Gaps in India
            </h1>
            <p className="text-sm text-[#A3A3A3] leading-relaxed">
              Select an industry sector and Indian territory. Our engine cross-references real search spikes, local census densities, and supply shortages to reveal genuine business voids.
            </p>
          </div>

          {/* Discovery Form Card */}
          <GlassPanel elevated className="p-6 sm:p-8 space-y-8 max-w-4xl border-white/15">
            <form onSubmit={handleDiscoverGaps} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Sector Selector */}
                <SectorSelector
                  selectedSector={sector}
                  onSelectSector={(s) => setSector(s)}
                />

                {/* 2. Region Selector */}
                <RegionSelector
                  selectedRegion={region}
                  onSelectRegion={(r) => setRegion(r)}
                />
              </div>

              {/* Optional Text Field */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <label className="text-xs font-medium text-[#A3A3A3] flex items-center justify-between" htmlFor="interest">
                  <span>Optional: What specific kind of business or niche are you interested in?</span>
                  <span className="text-[11px] text-[#737373]">Optional context</span>
                </label>
                <input
                  id="interest"
                  type="text"
                  placeholder="e.g. Organic farming logistics, quick-commerce kirana tech, affordable diagnostic clinics..."
                  value={specificInterest}
                  onChange={(e) => setSpecificInterest(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#151515] text-white border border-white/10 hover:border-white/25 focus:border-white/50 focus:outline-none text-sm transition-all placeholder:text-[#525252]"
                />
              </div>

              {/* Approachable What Happens Next Explanation */}
              <div className="p-4 rounded-xl bg-[#141414] border border-white/10 text-xs text-[#A3A3A3] flex items-start gap-3">
                <Info className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  After clicking, StartupRival executes 3 parallel scans across Google Trends query velocity, industrial cluster directories, and data.gov.in census indices to deliver 3 tailored opportunity dossiers.
                </p>
              </div>

              {/* Primary Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  className="w-full sm:w-auto px-8 gap-2 shadow-2xl"
                >
                  <Search className="w-4 h-4" />
                  <span>Discover Market Gaps</span>
                </Button>

                <div className="text-xs text-[#737373] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <span>Zero startup experience needed</span>
                </div>
              </div>
            </form>
          </GlassPanel>

          {/* LOADING STATE */}
          {loading && (
            <div className="py-8 animate-in fade-in duration-300">
              <LoadingState message="Analyzing market signals for your region..." />
            </div>
          )}

          {/* DEDICATED VALIDATION SCORECARD MODAL / OVERLAY */}
          {validatingIdea && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              <div className="clay-card max-w-4xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto border-white/20 bg-[#121212] animate-in zoom-in-95 duration-200">
                <ValidatorScorecard
                  idea={validatingIdea}
                  onClose={() => setValidatingIdea(null)}
                />
              </div>
            </div>
          )}

          {/* RESULTS SECTION */}
          {!loading && results && (
            <section className="space-y-6 pt-4 animate-in fade-in duration-300">
              {/* Results Control Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#121212] border border-white/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase text-[#A3A3A3]">Market Opportunity Report</span>
                    <span className="text-[10px] font-mono text-[#737373] bg-white/5 px-2 py-0.5 rounded">
                      {results.cached ? '⚡ Cached (<24h)' : 'Live Synthesis'}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-white">
                    {sector} in {region}
                  </h2>
                </div>

                {/* Sort / Filter dropdown */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-xs text-[#A3A3A3]">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Sort:</span>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-[#181818] text-white border border-white/10 text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="default">Default Relevance</option>
                    <option value="score-desc">Highest Demand Score</option>
                  </select>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDiscoverGaps}
                    className="text-xs gap-1.5"
                    title="Re-run analysis"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
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
    <Suspense fallback={<div className="min-h-screen bg-[#080808]" />}>
      <GapFinderContent />
    </Suspense>
  );
}

