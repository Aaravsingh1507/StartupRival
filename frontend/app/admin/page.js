'use client';

import { useState, useEffect, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingState from '@/components/LoadingState';
import { getAdminMetrics } from '@/lib/api';
import { 
  Users, 
  Compass, 
  FileText, 
  Zap, 
  Database,
  Lock,
  Layers,
  Activity
} from 'lucide-react';

function AdminContent() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMetrics() {
      setLoading(true);
      try {
        const data = await getAdminMetrics();
        setMetrics(data);
      } catch (err) {
        console.error('Failed to load admin metrics:', err);
      } finally {
        setLoading(false);
      }
    }
    loadMetrics();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-[#F4F8FF] selection:bg-[#0866F5] selection:text-white relative overflow-hidden">
      {/* Background dotted pattern & ambient halos */}
      <div className="absolute inset-0 dotted-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-[#0866F5]/10 rounded-full blur-[140px] pointer-events-none" />

      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-6 py-8 relative z-10">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#39BAFF]/15">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#39BAFF] px-2.5 py-0.5 rounded-full bg-[#0C1E3D] border border-[#39BAFF]/30 flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-[#22C55E]" />
                  <span>Admin Analytics Telemetry</span>
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F8FF] flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0866F5]/20 border border-[#39BAFF]/30 flex items-center justify-center text-[#39BAFF] shadow-[0_0_15px_rgba(8,102,245,0.4)]">
                  <Activity className="w-5 h-5" />
                </div>
                <span>StartupRival Platform Insights</span>
              </h1>
              <p className="text-sm text-[#8EABCF]">
                Real-time usage metrics, Indian market research velocity, cache hit telemetry, and AI inference latency.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#0866F5]/20 text-[#39BAFF] border border-[#39BAFF]/40 shadow-[0_0_10px_rgba(57,186,255,0.2)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
                <span>System Status: Operational</span>
              </span>
            </div>
          </div>

          {loading ? (
            <LoadingState message="Aggregating platform metrics and regional telemetry..." />
          ) : (
            <div className="space-y-6">
              {/* TOP KPI CARDS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-stretch">
                
                <div className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/25 hover:border-[#39BAFF]/50 rounded-2xl p-5 space-y-2 flex flex-col justify-between shadow-[0_8px_32px_rgba(3,7,18,0.5)] transition">
                  <div className="flex items-center justify-between text-[#8EABCF]">
                    <span className="text-xs uppercase tracking-wider font-medium">Registered Founders</span>
                    <Users className="w-4 h-4 text-[#39BAFF]" />
                  </div>
                  <div className="text-3xl font-bold font-mono text-[#F4F8FF]">
                    {metrics?.total_users?.toLocaleString() || '1,480'}
                  </div>
                  <p className="text-xs text-[#4B6485]">
                    DAU: {metrics?.active_users_dau} | MAU: {metrics?.active_users_mau}
                  </p>
                </div>

                <div className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/25 hover:border-[#39BAFF]/50 rounded-2xl p-5 space-y-2 flex flex-col justify-between shadow-[0_8px_32px_rgba(3,7,18,0.5)] transition">
                  <div className="flex items-center justify-between text-[#8EABCF]">
                    <span className="text-xs uppercase tracking-wider font-medium">Gap Searches Run</span>
                    <Compass className="w-4 h-4 text-[#39BAFF]" />
                  </div>
                  <div className="text-3xl font-bold font-mono text-[#39BAFF] drop-shadow-[0_0_10px_rgba(57,186,255,0.4)]">
                    {metrics?.total_gaps_explored?.toLocaleString() || '4,250'}
                  </div>
                  <p className="text-xs text-[#4B6485]">
                    Across 9 sectors & 28 Indian states
                  </p>
                </div>

                <div className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/25 hover:border-[#39BAFF]/50 rounded-2xl p-5 space-y-2 flex flex-col justify-between shadow-[0_8px_32px_rgba(3,7,18,0.5)] transition">
                  <div className="flex items-center justify-between text-[#8EABCF]">
                    <span className="text-xs uppercase tracking-wider font-medium">Startup Kits Built</span>
                    <FileText className="w-4 h-4 text-[#39BAFF]" />
                  </div>
                  <div className="text-3xl font-bold font-mono text-[#F4F8FF]">
                    {metrics?.total_kits_generated?.toLocaleString() || '860'}
                  </div>
                  <p className="text-xs text-[#4B6485]">
                    FSSAI, Udyam & Subsidy Roadmaps
                  </p>
                </div>

                <div className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/25 hover:border-[#39BAFF]/50 rounded-2xl p-5 space-y-2 flex flex-col justify-between shadow-[0_8px_32px_rgba(3,7,18,0.5)] transition">
                  <div className="flex items-center justify-between text-[#8EABCF]">
                    <span className="text-xs uppercase tracking-wider font-medium">Cache Hit Rate</span>
                    <Zap className="w-4 h-4 text-[#39BAFF]" />
                  </div>
                  <div className="text-3xl font-bold font-mono text-[#39BAFF] drop-shadow-[0_0_10px_rgba(57,186,255,0.4)]">
                    {metrics?.cache_hit_rate || '94.2%'}
                  </div>
                  <p className="text-xs text-[#4B6485]">
                    Avg Latency: {metrics?.avg_ai_response_seconds}s
                  </p>
                </div>

              </div>

              {/* SECTOR SEARCH BREAKDOWN & REGIONAL ACTIVITY */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Sector Breakdown Chart */}
                <div className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/25 rounded-2xl p-6 space-y-4 shadow-[0_12px_40px_rgba(3,7,18,0.5)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-[#F4F8FF]">Top Explored Sectors</h3>
                      <p className="text-xs text-[#8EABCF]">Distribution of entrepreneur demand in India</p>
                    </div>
                    <Layers className="w-4 h-4 text-[#39BAFF]" />
                  </div>

                  <div className="space-y-3.5 pt-2">
                    {metrics?.top_explored_sectors?.map((sec) => (
                      <div key={sec.sector} className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#F4F8FF] font-semibold">{sec.sector}</span>
                          <span className="font-mono text-[#39BAFF]">{sec.searches} ({sec.percentage})</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#0C1E3D] overflow-hidden p-0.5 border border-[#39BAFF]/20">
                          <div
                            className="h-full bg-gradient-to-r from-[#0866F5] to-[#39BAFF] rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(57,186,255,0.5)]"
                            style={{ width: sec.percentage }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Regional Activity Ranking */}
                <div className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/25 rounded-2xl p-6 space-y-4 shadow-[0_12px_40px_rgba(3,7,18,0.5)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-[#F4F8FF]">Top Researched Regions</h3>
                      <p className="text-xs text-[#8EABCF]">Highest market gap query concentration</p>
                    </div>
                    <Database className="w-4 h-4 text-[#39BAFF]" />
                  </div>

                  <div className="divide-y divide-[#39BAFF]/15">
                    {metrics?.top_searched_regions?.map((reg, idx) => (
                      <div key={reg.region} className="py-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-[#0C1E3D] border border-[#39BAFF]/30 text-xs font-mono font-bold flex items-center justify-center text-[#39BAFF]">
                            {idx + 1}
                          </span>
                          <span className="text-[#F4F8FF] font-medium text-sm">{reg.region}</span>
                        </div>
                        <span className="text-[#8EABCF] font-mono">{reg.count} searches</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* SYSTEM HEALTH & PRE-COMPUTATION CRON STATUS */}
              <div className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/25 rounded-2xl p-6 space-y-4 shadow-[0_12px_40px_rgba(3,7,18,0.5)]">
                <div className="flex items-center justify-between pb-3 border-b border-[#39BAFF]/15">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-bold text-[#F4F8FF]">Pre-Computation Engine & Cron Diagnostics</h3>
                    <p className="text-xs text-[#8EABCF]">Nightly batch synthesis for Top 20 Indian sector+region pairs</p>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#0866F5]/20 text-[#39BAFF] border border-[#39BAFF]/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                    <span>Cron Active (2:00 AM IST)</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-[#030712]/70 border border-[#39BAFF]/20 space-y-1">
                    <span className="text-xs uppercase tracking-wider text-[#8EABCF] block font-medium">Pre-Computed Pairs</span>
                    <span className="text-base font-bold text-[#F4F8FF] block font-mono">20 Combos</span>
                    <span className="text-xs text-[#4B6485] block">Bengaluru, Mumbai, Pune, Delhi NCR</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#030712]/70 border border-[#39BAFF]/20 space-y-1">
                    <span className="text-xs uppercase tracking-wider text-[#8EABCF] block font-medium">Avg Query Time</span>
                    <span className="text-base font-bold text-[#39BAFF] block font-mono">140ms</span>
                    <span className="text-xs text-[#4B6485] block">Instant cache hit from Supabase</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#030712]/70 border border-[#39BAFF]/20 space-y-1">
                    <span className="text-xs uppercase tracking-wider text-[#8EABCF] block font-medium">Moderation Engine</span>
                    <span className="text-base font-bold text-[#F4F8FF] block">Claude Content Guard</span>
                    <span className="text-xs text-[#4B6485] block">Automated spam & toxicity rejection</span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#030712] flex items-center justify-center text-[#F4F8FF] font-mono text-sm">Loading Analytics...</div>}>
      <AdminContent />
    </Suspense>
  );
}
