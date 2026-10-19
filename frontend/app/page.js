'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import ClayCard from '@/components/ClayCard';
import AbstractOpportunityVisual from '@/components/AbstractOpportunityVisual';
import { ArrowRight, Search, BarChart3, ShieldCheck, MapPin, Sparkles, TrendingUp, Compass, Layers } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#080808] text-white selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        {/* HERO SECTION */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden">
          {/* Subtle geometric background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#151515] border border-white/10 text-xs text-[#A3A3A3] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-white font-medium">Phase 1 Live:</span>
                <span>The Core Market Gap Engine</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.08]">
                  Find the Market Gap. <br />
                  <span className="text-[#A3A3A3]">Build What Matters.</span>
                </h1>
                <p className="text-base sm:text-lg text-[#A3A3A3] max-w-xl font-normal leading-relaxed">
                  Discover real business opportunities in India using AI-powered market research, local insights, and competitor intelligence.
                </p>
              </div>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link href="/gap-finder">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto justify-center gap-2 shadow-xl">
                    <span>Find Market Gaps</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto justify-center">
                    See How It Works
                  </Button>
                </Link>
              </div>

              {/* Verified Trust Tokens */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#737373]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <span>28 Indian States & Key Metros</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <span>Verified Public Datasets</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <span>Real Demand vs Hype Filter</span>
                </div>
              </div>
            </div>

            {/* Right Abstract Monochrome Visualization */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="w-full max-w-[440px] p-4 sm:p-6 rounded-3xl bg-[#121212]/50 border border-white/10 backdrop-blur-sm relative">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#737373] mb-2 flex items-center justify-between">
                  <span>Market Vector Radar</span>
                  <span>Live Signals</span>
                </div>
                <AbstractOpportunityVisual />
              </div>
            </div>
          </div>
        </section>

        {/* THREE-STEP HOW IT WORKS SECTION */}
        <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#737373] px-2.5 py-1 rounded bg-white/5 border border-white/10">
              Three Simple Steps
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              From zero idea to validated market opportunity
            </h2>
            <p className="text-sm text-[#A3A3A3]">
              Startup research simplified for anyone with zero business experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <ClayCard className="space-y-4 relative">
              <div className="w-10 h-10 rounded-xl bg-white text-black font-bold flex items-center justify-center text-sm shadow-md">
                01
              </div>
              <h3 className="text-lg font-semibold text-white tracking-tight">
                Choose Sector & Region
              </h3>
              <p className="text-xs text-[#A3A3A3] leading-relaxed">
                Select your area of interest from 9 Indian business sectors and choose any of India's 28 states or commercial cities.
              </p>
            </ClayCard>

            {/* Step 2 */}
            <ClayCard className="space-y-4 relative">
              <div className="w-10 h-10 rounded-xl bg-white text-black font-bold flex items-center justify-center text-sm shadow-md">
                02
              </div>
              <h3 className="text-lg font-semibold text-white tracking-tight">
                AI Scans Real Market Signals
              </h3>
              <p className="text-xs text-[#A3A3A3] leading-relaxed">
                Our autonomous agents analyze Google Trends search momentum, data.gov.in statistics, and regional startup news in parallel.
              </p>
            </ClayCard>

            {/* Step 3 */}
            <ClayCard className="space-y-4 relative">
              <div className="w-10 h-10 rounded-xl bg-white text-black font-bold flex items-center justify-center text-sm shadow-md">
                03
              </div>
              <h3 className="text-lg font-semibold text-white tracking-tight">
                Validated Opportunity Scorecard
              </h3>
              <p className="text-xs text-[#A3A3A3] leading-relaxed">
                Get up to 3 high-conviction market gaps with plain-language explanations, demand scores (0–100), competitor density, and launch locations.
              </p>
            </ClayCard>
          </div>
        </section>

        {/* CORE FEATURES SECTION */}
        <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#737373] px-2.5 py-1 rounded bg-white/5 border border-white/10">
              Platform Features
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Engineered for genuine entrepreneurial discovery
            </h2>
            <p className="text-sm text-[#A3A3A3]">
              Built with rigorous methodology to separate actual consumer voids from internet hype.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <ClayCard className="p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1D1D1D] border border-white/10 flex items-center justify-center text-white">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Market Gap Finder</h3>
              <p className="text-xs text-[#A3A3A3] leading-relaxed">
                Scan tier-1, tier-2, and tier-3 Indian hubs to discover underserved customer personas, broken supply chains, and unaddressed consumer demands.
              </p>
              <div className="pt-2 text-xs text-white font-mono flex items-center gap-1.5">
                <span>Multi-agent synthesis</span>
                <span>→</span>
              </div>
            </ClayCard>

            {/* Feature 2 */}
            <ClayCard className="p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1D1D1D] border border-white/10 flex items-center justify-center text-white">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Idea Validator</h3>
              <p className="text-xs text-[#A3A3A3] leading-relaxed">
                Comprehensive scorecard measuring 12-month trend stability, competitor density, population threshold, and a strategic 2-sentence verdict.
              </p>
              <div className="pt-2 text-xs text-white font-mono flex items-center gap-1.5">
                <span>Real vs Hype classification</span>
                <span>→</span>
              </div>
            </ClayCard>

            {/* Feature 3 */}
            <ClayCard className="p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1D1D1D] border border-white/10 flex items-center justify-center text-white">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Startup Planning</h3>
              <p className="text-xs text-[#A3A3A3] leading-relaxed">
                Save ideas directly to your private dashboard. Re-run searches with updated data feeds and track the evolution of regional market voids.
              </p>
              <div className="pt-2 text-xs text-white font-mono flex items-center gap-1.5">
                <span>Profile persistence</span>
                <span>→</span>
              </div>
            </ClayCard>
          </div>
        </section>

        {/* DATA-BACKED INSIGHTS EXPLANATION */}
        <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#737373] px-2.5 py-1 rounded bg-white/5 border border-white/10">
                Data-Backed Intelligence
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-snug">
                Why guesswork fails, and how factual signals lead to viable startups.
              </h2>
              <p className="text-sm text-[#A3A3A3] leading-relaxed">
                Most aspiring founders build ideas based on trending social media threads rather than actual purchasing friction. StartupRival computes a multi-dimensional demand index across verified Indian macroeconomic data, search velocities, and verified commercial registrations.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-xs text-[#EDEDED]">
                  <span className="w-5 h-5 rounded-md bg-[#1D1D1D] border border-white/10 flex items-center justify-center shrink-0 text-white font-mono">1</span>
                  <p><strong className="text-white">Real vs Hype Filter:</strong> Distinguishes sustained upward consumer demand from temporary news spikes or artificial speculation.</p>
                </div>
                <div className="flex items-start gap-3 text-xs text-[#EDEDED]">
                  <span className="w-5 h-5 rounded-md bg-[#1D1D1D] border border-white/10 flex items-center justify-center shrink-0 text-white font-mono">2</span>
                  <p><strong className="text-white">Local Population Viability:</strong> Ensures the target geographic district meets the minimum addressable customer density required for unit profitability.</p>
                </div>
                <div className="flex items-start gap-3 text-xs text-[#EDEDED]">
                  <span className="w-5 h-5 rounded-md bg-[#1D1D1D] border border-white/10 flex items-center justify-center shrink-0 text-white font-mono">3</span>
                  <p><strong className="text-white">Competitor Saturation Check:</strong> Identifies uncrowded niches where local incumbents are either absent or failing user expectations.</p>
                </div>
              </div>
            </div>

            {/* Monochrome Comparison Panel */}
            <div className="p-8 rounded-3xl bg-[#121212] border border-white/10 space-y-6">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                Verification Matrix
              </h4>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#181818] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white font-medium">Google Trends 12mo Velocity</span>
                    <span className="text-[#A3A3A3] font-mono">40% Weight</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="w-[40%] h-full bg-white" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#181818] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white font-medium">News & Trade Media Frequency</span>
                    <span className="text-[#A3A3A3] font-mono">30% Weight</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="w-[30%] h-full bg-white" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#181818] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white font-medium">data.gov.in Sectoral Growth Statistics</span>
                    <span className="text-[#A3A3A3] font-mono">30% Weight</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="w-[30%] h-full bg-white" />
                  </div>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-[#737373] font-mono">
                Weighted algorithmic scoring prevents artificial hallucinations.
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5 text-center">
          <div className="clay-card p-12 sm:p-16 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Your next business idea starts here.
            </h2>
            <p className="text-sm text-[#A3A3A3] max-w-md mx-auto">
              Start for Free. No credit card needed. Generate your first verified Indian market gap in 30 seconds.
            </p>
            <div className="pt-2">
              <Link href="/gap-finder">
                <Button variant="primary" size="lg" className="px-8 shadow-2xl">
                  Discover Market Gaps Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
