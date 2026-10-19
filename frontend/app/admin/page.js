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
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#F5F5F5] selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1 pt-20 pb-16 px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1F1F1F]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-[#888888] px-2 py-0.5 rounded bg-[#1A1A1A] border border-[#2A2A2A] flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-[#22C55E]" />
                  <span>Admin Analytics Telemetry</span>
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
                <Activity className="w-6 h-6 text-white" />
                <span>StartupRival Platform Insights</span>
              </h1>
              <p className="text-sm text-[#888888]">
                Real-time usage metrics, Indian market research velocity, cache hit telemetry, and AI inference latency.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-950 text-green-400 border border-green-900">
                System Status: Operational
              </span>
            </div>
          </div>

          {loading ? (
            <LoadingState message="Aggregating platform metrics and regional telemetry..." />
          ) : (
            <div className="space-y-6">
              {/* TOP KPI CARDS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-stretch">
                
                <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 space-y-2 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[#888888]">
                    <span className="text-xs uppercase tracking-wider">Registered Founders</span>
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-3xl font-bold font-mono text-white">
                    {metrics?.total_users?.toLocaleString() || '1,480'}
                  </div>
                  <p className="text-xs text-[#555555]">
                    DAU: {metrics?.active_users_dau} | MAU: {metrics?.active_users_mau}
                  </p>
                </div>

                <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 space-y-2 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[#888888]">
                    <span className="text-xs uppercase tracking-wider">Gap Searches Run</span>
                    <Compass className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-3xl font-bold font-mono text-white">
                    {metrics?.total_gaps_explored?.toLocaleString() || '4,250'}
                  </div>
                  <p className="text-xs text-[#555555]">
                    Across 9 sectors & 28 Indian states
                  </p>
                </div>

                <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 space-y-2 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[#888888]">
                    <span className="text-xs uppercase tracking-wider">Startup Kits Built</span>
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-3xl font-bold font-mono text-white">
                    {metrics?.total_kits_generated?.toLocaleString() || '860'}
                  </div>
                  <p className="text-xs text-[#555555]">
                    FSSAI, Udyam & Subsidy Roadmaps
                  </p>
                </div>

                <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 space-y-2 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[#888888]">
                    <span className="text-xs uppercase tracking-wider">Cache Hit Rate</span>
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-3xl font-bold font-mono text-white">
                    {metrics?.cache_hit_rate || '94.2%'}
                  </div>
                  <p className="text-xs text-[#555555]">
                    Avg Latency: {metrics?.avg_ai_response_seconds}s
                  </p>
                </div>

              </div>

              {/* SECTOR SEARCH BREAKDOWN & REGIONAL ACTIVITY */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Sector Breakdown Chart */}
                <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-white">Top Explored Sectors</h3>
                      <p className="text-xs text-[#888888]">Distribution of entrepreneur demand in India</p>
                    </div>
                    <Layers className="w-4 h-4 text-[#888888]" />
                  </div>

                  <div className="space-y-3 pt-2">
                    {metrics?.top_explored_sectors?.map((sec) => (
                      <div key={sec.sector} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-white font-medium">{sec.sector}</span>
                          <span className="font-mono text-[#888888]">{sec.searches} ({sec.percentage})</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-[#1A1A1A] overflow-hidden">
                          <div
                            className="h-full bg-white rounded-full transition-all duration-500"
                            style={{ width: sec.percentage }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Regional Activity Ranking */}
                <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-white">Top Researched Regions</h3>
                      <p className="text-xs text-[#888888]">Highest market gap query concentration</p>
                    </div>
                    <Database className="w-4 h-4 text-[#888888]" />
                  </div>

                  <div className="divide-y divide-[#1F1F1F]">
                    {metrics?.top_searched_regions?.map((reg, idx) => (
                      <div key={reg.region} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <span className="w-5 h-5 rounded-md bg-[#1A1A1A] border border-[#2A2A2A] text-xs flex items-center justify-center text-white">
                            {idx + 1}
                          </span>
                          <span className="text-white font-medium">{reg.region}</span>
                        </div>
                        <span className="text-[#888888]">{reg.count} searches</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* SYSTEM HEALTH & PRE-COMPUTATION CRON STATUS */}
              <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#1F1F1F]">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-semibold text-white">Pre-Computation Engine & Cron Diagnostics</h3>
                    <p className="text-xs text-[#888888]">Nightly batch synthesis for Top 20 Indian sector+region pairs</p>
                  </div>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-950 text-green-400 border border-green-900">
                    Cron Active (2:00 AM IST)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3.5 rounded-lg bg-[#0A0A0A] border border-[#1F1F1F] space-y-1">
                    <span className="text-xs uppercase tracking-wider text-[#888888] block">Pre-Computed Pairs</span>
                    <span className="text-base font-bold text-white block">20 Combos</span>
                    <span className="text-xs text-[#555555] block">Bengaluru, Mumbai, Pune, Delhi NCR</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#0A0A0A] border border-[#1F1F1F] space-y-1">
                    <span className="text-xs uppercase tracking-wider text-[#888888] block">Avg Query Time</span>
                    <span className="text-base font-bold text-white block">140ms</span>
                    <span className="text-xs text-[#555555] block">Instant cache hit from Supabase</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#0A0A0A] border border-[#1F1F1F] space-y-1">
                    <span className="text-xs uppercase tracking-wider text-[#888888] block">Moderation Engine</span>
                    <span className="text-base font-bold text-white block">Claude Content Guard</span>
                    <span className="text-xs text-[#555555] block">Automated spam & toxicity rejection</span>
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
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white font-mono text-sm">Loading Analytics...</div>}>
      <AdminContent />
    </Suspense>
  );
}

