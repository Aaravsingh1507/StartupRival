'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { ArrowRight, Search, BarChart3, Layers, Sparkles, ShieldCheck, Zap, Database, TrendingUp, Compass } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-[#F4F8FF] selection:bg-[#0866F5] selection:text-white relative overflow-hidden">
      <Navbar />

      {/* Decorative Dotted Grid and Ambient Illumination Halos */}
      <div className="absolute inset-0 dotted-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[450px] blue-halo rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] cyan-halo-sm rounded-full blur-3xl pointer-events-none opacity-40" />
      <div className="absolute bottom-1/4 -left-40 w-[600px] h-[600px] blue-halo rounded-full blur-3xl pointer-events-none opacity-30" />

      <main className="flex-1 pt-20 pb-16 relative z-10">
        {/* HERO SECTION */}
        <section className="relative max-w-7xl mx-auto px-6 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Hero Content with Subtle Blue Illuminated Visual */}
            <div className="lg:col-span-7 space-y-6 text-left relative">
              {/* Luminous Arc Element behind headline */}
              <div className="absolute -top-12 -left-8 w-72 h-72 rounded-full border border-[#39BAFF]/20 -z-10 pointer-events-none animate-pulse-subtle" />
              <div className="absolute -top-6 -left-2 w-48 h-48 rounded-full border border-dashed border-[#0866F5]/30 -z-10 pointer-events-none" />

              {/* Tag / Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#08152B]/90 border border-[#39BAFF]/30 text-xs font-mono text-[#39BAFF] shadow-[0_0_14px_rgba(57,186,255,0.25)]">
                <span className="w-2 h-2 rounded-full bg-[#39BAFF] animate-pulse" />
                <span>India-First Market Intelligence Engine</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-display text-[#F4F8FF] tracking-tight">
                  Discover Real Indian <br />
                  <span className="bg-gradient-to-r from-[#FFFFFF] via-[#39BAFF] to-[#0866F5] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(57,186,255,0.4)]">
                    Market Opportunities.
                  </span>
                </h1>
                <p className="text-body text-[#8EABCF] max-w-xl text-base leading-relaxed">
                  Turn local consumer search momentum, state supply voids, and verified economic datasets into profitable, launch-ready startup roadmaps. Zero guesswork.
                </p>
              </div>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link href="/gap-finder">
                  <Button variant="primary" size="md" className="w-full sm:w-auto gap-2 group">
                    <span>Find Your Market Gap</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button variant="secondary" size="md" className="w-full sm:w-auto">
                    How It Works
                  </Button>
                </Link>
              </div>

              {/* Trust Badges Row */}
              <div className="pt-6 border-t border-[#39BAFF]/15 flex flex-wrap items-center gap-4 text-xs text-[#8EABCF]/80">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39BAFF]" />
                  28 Indian States & Key Metros
                </span>
                <span className="text-[#39BAFF]/40">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0866F5]" />
                  Verified Public Datasets
                </span>
                <span className="text-[#39BAFF]/40">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                  Real Demand vs Hype Filter
                </span>
              </div>
            </div>

            {/* Right Column: Live Signal Feed Mockup (Glassmorphism Card) */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              {/* Backing ambient glow ring */}
              <div className="absolute inset-0 bg-[#0866F5]/20 rounded-2xl blur-2xl -z-10" />

              <div className="w-full max-w-md bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/30 rounded-2xl p-5 space-y-4 shadow-[0_12px_45px_rgba(3,7,18,0.7)] relative overflow-hidden">
                {/* Luminous top border accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#39BAFF] to-transparent opacity-80" />

                <div className="flex items-center justify-between pb-3 border-b border-[#39BAFF]/15">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#39BAFF]" />
                    <span className="text-xs uppercase tracking-wider text-[#F4F8FF] font-semibold">
                      LIVE MARKET SIGNALS
                    </span>
                  </div>
                  <span className="text-[10px] text-[#22C55E] font-mono px-2 py-0.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-ping" />
                    Verified Feeds
                  </span>
                </div>

                <div className="divide-y divide-[#39BAFF]/10 space-y-1">
                  {/* Row 1 */}
                  <div className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                      <div>
                        <span className="text-[#F4F8FF] font-medium block">Agriculture · Maharashtra</span>
                        <span className="text-[10px] text-[#8EABCF]">Cold Storage Void in Nashik Mandi</span>
                      </div>
                    </div>
                    <span className="font-mono text-[#39BAFF] font-bold bg-[#0C1E3D] px-2.5 py-1 rounded-lg border border-[#39BAFF]/30 shadow-[0_0_10px_rgba(57,186,255,0.2)]">
                      Demand 87
                    </span>
                  </div>

                  {/* Row 2 */}
                  <div className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                      <div>
                        <span className="text-[#F4F8FF] font-medium block">Healthcare · Delhi NCR</span>
                        <span className="text-[10px] text-[#8EABCF]">Post-Operative Geriatric Care</span>
                      </div>
                    </div>
                    <span className="font-mono text-[#39BAFF] font-bold bg-[#0C1E3D] px-2.5 py-1 rounded-lg border border-[#39BAFF]/30 shadow-[0_0_10px_rgba(57,186,255,0.2)]">
                      Demand 74
                    </span>
                  </div>

                  {/* Row 3 */}
                  <div className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                      <div>
                        <span className="text-[#F4F8FF] font-medium block">Technology · Bengaluru</span>
                        <span className="text-[10px] text-[#8EABCF]">B2B Quick-Commerce Logistics SDK</span>
                      </div>
                    </div>
                    <span className="font-mono text-[#39BAFF] font-bold bg-[#0C1E3D] px-2.5 py-1 rounded-lg border border-[#39BAFF]/30 shadow-[0_0_10px_rgba(57,186,255,0.2)]">
                      Demand 91
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-[#8EABCF]/70 text-center font-mono flex items-center justify-center gap-2">
                  <Database className="w-3 h-3 text-[#39BAFF]" />
                  <span>Cross-checked against Google Trends & MCA data</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* THREE SIMPLE STEPS SECTION */}
        <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-20 border-t border-[#39BAFF]/15 relative">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-14">
            <span className="text-label text-[#39BAFF]">Three Simple Steps</span>
            <h2 className="text-h2 text-[#F4F8FF]">
              From Zero Idea to Validated Opportunity
            </h2>
            <p className="text-body text-[#8EABCF]">
              Sophisticated market gap intelligence made effortless for first-time founders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch relative">
            {/* Step 1 */}
            <div className="bg-[#08152B]/75 backdrop-blur-md border border-[#39BAFF]/20 rounded-xl p-6 flex flex-col justify-between space-y-4 hover:border-[#39BAFF]/50 hover:shadow-[0_8px_30px_rgba(8,102,245,0.2)] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold font-mono text-[#0866F5]/40">01</span>
                <span className="hidden md:block text-[#39BAFF]/40 text-xl font-bold">→</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-[#F4F8FF]">Choose Sector & Region</h3>
                <p className="text-sm text-[#8EABCF] leading-relaxed">
                  Select your industry interest from 9 major Indian sectors and pinpoint any state or commercial city hub.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#08152B]/75 backdrop-blur-md border border-[#39BAFF]/20 rounded-xl p-6 flex flex-col justify-between space-y-4 hover:border-[#39BAFF]/50 hover:shadow-[0_8px_30px_rgba(8,102,245,0.2)] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold font-mono text-[#0866F5]/40">02</span>
                <span className="hidden md:block text-[#39BAFF]/40 text-xl font-bold">→</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-[#F4F8FF]">AI Scans Real Demand Signals</h3>
                <p className="text-sm text-[#8EABCF] leading-relaxed">
                  Autonomous agents query 12-month Google Trends velocity, data.gov.in statistics, and regional media volume in parallel.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#08152B]/75 backdrop-blur-md border border-[#39BAFF]/20 rounded-xl p-6 flex flex-col justify-between space-y-4 hover:border-[#39BAFF]/50 hover:shadow-[0_8px_30px_rgba(8,102,245,0.2)] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold font-mono text-[#39BAFF]/50">03</span>
                <Sparkles className="w-5 h-5 text-[#39BAFF]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-[#F4F8FF]">Validated Opportunity Scorecard</h3>
                <p className="text-sm text-[#8EABCF] leading-relaxed">
                  Receive high-conviction market gaps with demand scores (0–100), competitor void maps, and actionable launch blueprints.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PLATFORM FEATURES */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-20 border-t border-[#39BAFF]/15">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-14">
            <span className="text-label text-[#39BAFF]">Platform Capabilities</span>
            <h2 className="text-h2 text-[#F4F8FF]">
              Engineered for Genuine Entrepreneurial Discovery
            </h2>
            <p className="text-body text-[#8EABCF]">
              Built with rigorous methodology to separate actual consumer voids from internet speculation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Feature 1 */}
            <div className="bg-[#08152B]/70 backdrop-blur-md border border-[#39BAFF]/20 rounded-xl p-6 flex flex-col justify-between space-y-4 hover:border-[#39BAFF]/50 hover:shadow-[0_8px_30px_rgba(8,102,245,0.2)] transition-all group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#0C1E3D] border border-[#39BAFF]/30 flex items-center justify-center text-[#39BAFF] group-hover:shadow-[0_0_15px_rgba(57,186,255,0.4)] transition-all">
                  <Search className="w-5 h-5 stroke-[1.75]" />
                </div>
                <h3 className="text-base font-semibold text-[#F4F8FF]">Market Gap Finder</h3>
                <p className="text-sm text-[#8EABCF] leading-relaxed">
                  Scan tier-1, tier-2, and tier-3 Indian hubs to discover underserved customer personas, broken supply chains, and unaddressed consumer demands.
                </p>
              </div>
              <Link href="/gap-finder" className="text-xs text-[#39BAFF] hover:text-white transition inline-flex items-center gap-1 pt-2">
                <span>Find Market Gaps</span>
                <span>→</span>
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#08152B]/70 backdrop-blur-md border border-[#39BAFF]/20 rounded-xl p-6 flex flex-col justify-between space-y-4 hover:border-[#39BAFF]/50 hover:shadow-[0_8px_30px_rgba(8,102,245,0.2)] transition-all group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#0C1E3D] border border-[#39BAFF]/30 flex items-center justify-center text-[#39BAFF] group-hover:shadow-[0_0_15px_rgba(57,186,255,0.4)] transition-all">
                  <BarChart3 className="w-5 h-5 stroke-[1.75]" />
                </div>
                <h3 className="text-base font-semibold text-[#F4F8FF]">Idea Validator</h3>
                <p className="text-sm text-[#8EABCF] leading-relaxed">
                  Comprehensive scorecard measuring 12-month search momentum, competitor density, addressable population, and an objective validation verdict.
                </p>
              </div>
              <Link href="/gap-finder" className="text-xs text-[#39BAFF] hover:text-white transition inline-flex items-center gap-1 pt-2">
                <span>Validate Your Idea</span>
                <span>→</span>
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#08152B]/70 backdrop-blur-md border border-[#39BAFF]/20 rounded-xl p-6 flex flex-col justify-between space-y-4 hover:border-[#39BAFF]/50 hover:shadow-[0_8px_30px_rgba(8,102,245,0.2)] transition-all group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#0C1E3D] border border-[#39BAFF]/30 flex items-center justify-center text-[#39BAFF] group-hover:shadow-[0_0_15px_rgba(57,186,255,0.4)] transition-all">
                  <Layers className="w-5 h-5 stroke-[1.75]" />
                </div>
                <h3 className="text-base font-semibold text-[#F4F8FF]">Startup Kickstart Kit</h3>
                <p className="text-sm text-[#8EABCF] leading-relaxed">
                  Transform validated market gaps into launch roadmaps with required Indian licenses (FSSAI, Udyam), Central/State subsidy schemes, and 90-day execution checklists.
                </p>
              </div>
              <Link href="/dashboard" className="text-xs text-[#39BAFF] hover:text-white transition inline-flex items-center gap-1 pt-2">
                <span>Explore Workspaces</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* HOW WE SEPARATE SIGNAL FROM NOISE */}
        <section id="about" className="max-w-7xl mx-auto px-6 py-20 border-t border-[#39BAFF]/15">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-label text-[#39BAFF]">Verification Matrix</span>
              <h2 className="text-h2 text-[#F4F8FF]">
                How We Separate Signal from Noise
              </h2>
              <p className="text-body text-[#8EABCF] leading-relaxed">
                Most aspiring founders build ideas based on trending social media chatter rather than actual customer friction. StartupRival computes a multi-dimensional demand index across verified Indian macroeconomic data, search velocities, and verified commercial registrations.
              </p>

              <div className="space-y-3 pt-2 text-xs text-[#8EABCF]">
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#39BAFF] mt-1.5 shrink-0 shadow-[0_0_8px_rgba(57,186,255,0.6)]" />
                  <p><strong className="text-[#F4F8FF]">Real vs Hype Filter:</strong> Distinguishes sustained upward consumer demand from temporary news spikes or artificial hype.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#39BAFF] mt-1.5 shrink-0 shadow-[0_0_8px_rgba(57,186,255,0.6)]" />
                  <p><strong className="text-[#F4F8FF]">Local Population Viability:</strong> Verifies that the chosen geographic district meets addressable customer density for unit economics.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#39BAFF] mt-1.5 shrink-0 shadow-[0_0_8px_rgba(57,186,255,0.6)]" />
                  <p><strong className="text-[#F4F8FF]">Competitor Saturation Void:</strong> Identifies uncrowded market opportunities where incumbents are absent or underperforming.</p>
                </div>
              </div>
            </div>

            {/* Weighted scoring progress visual in Blue Glassmorphism */}
            <div className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/25 rounded-2xl p-6 space-y-5 shadow-[0_12px_40px_rgba(3,7,18,0.5)]">
              <div className="flex items-center justify-between pb-3 border-b border-[#39BAFF]/15">
                <h4 className="text-xs font-semibold text-[#F4F8FF] uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#39BAFF]" />
                  <span>Weighted Scoring Model</span>
                </h4>
                <span className="text-[10px] text-[#39BAFF] font-mono px-2 py-0.5 rounded bg-[#0C1E3D] border border-[#39BAFF]/30">
                  Algorithm v2.4
                </span>
              </div>

              <div className="space-y-4">
                {/* Metric 1 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#F4F8FF] font-medium">Google Trends 12mo Velocity</span>
                    <span className="text-[#39BAFF] font-mono font-bold">40%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#0C1E3D] rounded-full overflow-hidden border border-[#39BAFF]/15">
                    <div className="w-[40%] h-full bg-gradient-to-r from-[#0866F5] to-[#39BAFF] rounded-full shadow-[0_0_10px_rgba(57,186,255,0.5)]" />
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#F4F8FF] font-medium">News & Trade Media Frequency</span>
                    <span className="text-[#39BAFF] font-mono font-bold">30%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#0C1E3D] rounded-full overflow-hidden border border-[#39BAFF]/15">
                    <div className="w-[30%] h-full bg-gradient-to-r from-[#0866F5] to-[#39BAFF] rounded-full shadow-[0_0_10px_rgba(57,186,255,0.5)]" />
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#F4F8FF] font-medium">data.gov.in Sectoral Growth</span>
                    <span className="text-[#39BAFF] font-mono font-bold">30%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#0C1E3D] rounded-full overflow-hidden border border-[#39BAFF]/15">
                    <div className="w-[30%] h-full bg-gradient-to-r from-[#0866F5] to-[#39BAFF] rounded-full shadow-[0_0_10px_rgba(57,186,255,0.5)]" />
                  </div>
                </div>
              </div>

              <p className="text-caption text-[#8EABCF]/70 pt-2 border-t border-[#39BAFF]/10">
                Weighted scoring prevents artificial hallucinations.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION BANNER */}
        <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[#39BAFF]/15 text-center relative">
          <div className="relative bg-[#08152B]/90 backdrop-blur-2xl border border-[#39BAFF]/30 rounded-3xl p-12 max-w-3xl mx-auto space-y-5 shadow-[0_12px_60px_rgba(8,102,245,0.25)] overflow-hidden">
            {/* Luminous Arcs in Banner */}
            <div className="absolute -top-24 -left-24 w-60 h-60 rounded-full border border-[#39BAFF]/20 pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-60 h-60 rounded-full border border-[#0866F5]/25 pointer-events-none" />
            
            <h2 className="text-h1 text-[#F4F8FF]">
              Your next business idea starts here.
            </h2>
            <p className="text-body text-[#8EABCF] max-w-md mx-auto text-base">
              Start for Free. No credit card needed.
            </p>
            <div className="pt-2">
              <Link href="/gap-finder">
                <Button variant="primary" size="lg" className="shadow-[0_0_30px_rgba(8,102,245,0.6)]">
                  Find Your Market Gap
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
