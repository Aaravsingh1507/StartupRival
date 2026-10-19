'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { ArrowRight, Search, BarChart3, Layers } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#F5F5F5] selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1 pt-20 pb-16">
        {/* HERO SECTION */}
        <section className="relative max-w-7xl mx-auto px-6 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="space-y-4">
                <h1 className="text-display text-white">
                  Find the Market Gap. <br />
                  <span className="text-[#888888]">Build What Matters.</span>
                </h1>
                <p className="text-body text-[#888888] max-w-xl text-base">
                  Discover real business opportunities in India using AI-powered market research, local consumer signals, and competitor intelligence.
                </p>
              </div>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link href="/gap-finder">
                  <Button variant="primary" size="md" className="w-full sm:w-auto gap-2">
                    <span>Find Market Gaps</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button variant="secondary" size="md" className="w-full sm:w-auto">
                    See How It Works
                  </Button>
                </Link>
              </div>

              {/* Trust Badges Row */}
              <div className="pt-6 border-t border-[#1F1F1F] flex flex-wrap items-center gap-4 text-xs text-[#555555]">
                <span>28 Indian States & Key Metros</span>
                <span>•</span>
                <span>Verified Public Datasets</span>
                <span>•</span>
                <span>Real Demand vs Hype Filter</span>
              </div>
            </div>

            {/* Right Column: Live Signal Feed Mockup */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="w-full max-w-md bg-[#111111] border border-[#2A2A2A] rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#1F1F1F]">
                  <span className="text-xs uppercase tracking-wider text-[#555555] font-medium">
                    LIVE MARKET SIGNALS
                  </span>
                  <span className="text-[10px] text-[#22C55E] font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                    Real-time
                  </span>
                </div>

                <div className="divide-y divide-[#1F1F1F]">
                  {/* Row 1 */}
                  <div className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                      <span className="text-[#F5F5F5] font-medium">Agriculture · Maharashtra</span>
                    </div>
                    <span className="font-mono text-[#E8FF47] font-semibold bg-[#1A1A1A] px-2 py-0.5 rounded border border-[#2A2A2A]">
                      Demand 87
                    </span>
                  </div>

                  {/* Row 2 */}
                  <div className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                      <span className="text-[#F5F5F5] font-medium">Healthcare · Delhi NCR</span>
                    </div>
                    <span className="font-mono text-[#E8FF47] font-semibold bg-[#1A1A1A] px-2 py-0.5 rounded border border-[#2A2A2A]">
                      Demand 74
                    </span>
                  </div>

                  {/* Row 3 */}
                  <div className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                      <span className="text-[#F5F5F5] font-medium">Technology · Bengaluru</span>
                    </div>
                    <span className="font-mono text-[#E8FF47] font-semibold bg-[#1A1A1A] px-2 py-0.5 rounded border border-[#2A2A2A]">
                      Demand 91
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-[#555555] text-center">
                  Synthesized across Google Trends, MCA registries & mandi feeds
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* THREE SIMPLE STEPS SECTION */}
        <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-20 border-t border-[#1F1F1F]">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-14">
            <span className="text-label">Three Simple Steps</span>
            <h2 className="text-h2 text-white">
              From zero idea to validated market opportunity
            </h2>
            <p className="text-body text-[#888888]">
              Startup research simplified for anyone with zero business experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch relative">
            {/* Step 1 */}
            <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 flex flex-col justify-between space-y-4 relative">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-[#2A2A2A]">01</span>
                <span className="hidden md:block text-[#2A2A2A] text-xl font-bold">→</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-white">Choose Sector & Region</h3>
                <p className="text-sm text-[#888888] leading-relaxed">
                  Select your area of interest from 9 Indian business sectors and choose any of India's 28 states or commercial cities.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 flex flex-col justify-between space-y-4 relative">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-[#2A2A2A]">02</span>
                <span className="hidden md:block text-[#2A2A2A] text-xl font-bold">→</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-white">AI Scans Real Market Signals</h3>
                <p className="text-sm text-[#888888] leading-relaxed">
                  Our autonomous agents analyze Google Trends search momentum, data.gov.in statistics, and regional startup news in parallel.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-[#2A2A2A]">03</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-white">Validated Opportunity Scorecard</h3>
                <p className="text-sm text-[#888888] leading-relaxed">
                  Get high-conviction market gaps with plain-language explanations, demand scores (0–100), competitor density, and launch blueprints.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PLATFORM FEATURES */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-20 border-t border-[#1F1F1F]">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-14">
            <span className="text-label">Platform Features</span>
            <h2 className="text-h2 text-white">
              Engineered for genuine entrepreneurial discovery
            </h2>
            <p className="text-body text-[#888888]">
              Built with rigorous methodology to separate actual consumer voids from internet hype.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Feature 1 */}
            <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-white">
                  <Search className="w-5 h-5 stroke-[1.5]" />
                </div>
                <h3 className="text-base font-semibold text-white">Market Gap Finder</h3>
                <p className="text-sm text-[#888888] leading-relaxed">
                  Scan tier-1, tier-2, and tier-3 Indian hubs to discover underserved customer personas, broken supply chains, and unaddressed consumer demands.
                </p>
              </div>
              <Link href="/gap-finder" className="text-xs text-[#555555] hover:text-white transition inline-block pt-2">
                → Learn more
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-white">
                  <BarChart3 className="w-5 h-5 stroke-[1.5]" />
                </div>
                <h3 className="text-base font-semibold text-white">Idea Validator</h3>
                <p className="text-sm text-[#888888] leading-relaxed">
                  Comprehensive scorecard measuring 12-month trend stability, competitor density, population threshold, and a strategic 2-sentence verdict.
                </p>
              </div>
              <Link href="/gap-finder" className="text-xs text-[#555555] hover:text-white transition inline-block pt-2">
                → Learn more
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-white">
                  <Layers className="w-5 h-5 stroke-[1.5]" />
                </div>
                <h3 className="text-base font-semibold text-white">Startup Planning</h3>
                <p className="text-sm text-[#888888] leading-relaxed">
                  Save ideas directly to your private dashboard. Generate Kickstart Kits with FSSAI/Udyam licenses, central subsidies, and 90-day checklists.
                </p>
              </div>
              <Link href="/dashboard" className="text-xs text-[#555555] hover:text-white transition inline-block pt-2">
                → Learn more
              </Link>
            </div>
          </div>
        </section>

        {/* HOW WE SEPARATE SIGNAL FROM NOISE */}
        <section id="about" className="max-w-7xl mx-auto px-6 py-20 border-t border-[#1F1F1F]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-label">Data Methodology</span>
              <h2 className="text-h2 text-white">
                How We Separate Signal from Noise
              </h2>
              <p className="text-body text-[#888888] leading-relaxed">
                Most aspiring founders build ideas based on trending social media threads rather than actual purchasing friction. StartupRival computes a multi-dimensional demand index across verified Indian macroeconomic data, search velocities, and verified commercial registrations.
              </p>

              <div className="space-y-3 pt-2 text-xs text-[#888888]">
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                  <p><strong className="text-white">Real vs Hype Filter:</strong> Distinguishes sustained upward consumer demand from temporary news spikes or artificial speculation.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                  <p><strong className="text-white">Local Population Viability:</strong> Ensures the target geographic district meets the addressable customer density required for unit profitability.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                  <p><strong className="text-white">Competitor Saturation Check:</strong> Identifies uncrowded niches where local incumbents are either absent or failing user expectations.</p>
                </div>
              </div>
            </div>

            {/* Weighted scoring progress visual */}
            <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-[#1F1F1F]">
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                  Verification Matrix
                </h4>
                <span className="text-[10px] text-[#555555] font-mono">Algorithm v2.4</span>
              </div>

              <div className="space-y-4">
                {/* Metric 1 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white font-medium">Google Trends 12mo Velocity</span>
                    <span className="text-[#E8FF47] font-mono font-semibold">40%</span>
                  </div>
                  <div className="w-full h-1 bg-[#1A1A1A] rounded overflow-hidden">
                    <div className="w-[40%] h-full bg-[#E8FF47] rounded" />
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white font-medium">News & Trade Media Frequency</span>
                    <span className="text-[#E8FF47] font-mono font-semibold">30%</span>
                  </div>
                  <div className="w-full h-1 bg-[#1A1A1A] rounded overflow-hidden">
                    <div className="w-[30%] h-full bg-[#E8FF47] rounded" />
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white font-medium">data.gov.in Sectoral Growth</span>
                    <span className="text-[#E8FF47] font-mono font-semibold">30%</span>
                  </div>
                  <div className="w-full h-1 bg-[#1A1A1A] rounded overflow-hidden">
                    <div className="w-[30%] h-full bg-[#E8FF47] rounded" />
                  </div>
                </div>
              </div>

              <p className="text-caption text-[#555555] pt-2 border-t border-[#1F1F1F]">
                Weighted scoring prevents artificial hallucinations.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[#1F1F1F] text-center">
          <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-12 max-w-3xl mx-auto space-y-4">
            <h2 className="text-h1 text-white">
              Your next business idea starts here.
            </h2>
            <p className="text-body text-[#888888] max-w-md mx-auto">
              Start for Free. No credit card needed.
            </p>
            <div className="pt-2">
              <Link href="/gap-finder">
                <Button variant="primary" size="md">
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
