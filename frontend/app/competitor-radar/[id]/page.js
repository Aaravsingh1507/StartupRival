'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import CompetitorRadar from '@/components/CompetitorRadar';
import LoadingState from '@/components/LoadingState';
import { getCompetitorRadar } from '@/lib/api';
import { 
  ArrowLeft, 
  Radar, 
  MapPin, 
  FileText, 
  Megaphone, 
  ShieldCheck
} from 'lucide-react';

function CompetitorRadarContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const id = params?.id || 'gap-1';
  const initialSector = searchParams?.get('sector') || 'Agriculture';
  const initialRegion = searchParams?.get('region') || 'Maharashtra';
  const initialName = searchParams?.get('name') || `Decentralized ${initialSector} Hub`;

  const [loading, setLoading] = useState(true);
  const [radarData, setRadarData] = useState(null);

  useEffect(() => {
    async function loadRadar() {
      setLoading(true);
      try {
        const data = await getCompetitorRadar({ sector: initialSector, region: initialRegion });
        setRadarData(data);
      } catch (err) {
        console.error('Failed to load competitor radar:', err);
      } finally {
        setLoading(false);
      }
    }
    loadRadar();
  }, [id, initialSector, initialRegion]);

  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-[#F4F8FF] selection:bg-[#0866F5] selection:text-white relative overflow-hidden">
      {/* Background dotted pattern & ambient halos */}
      <div className="absolute inset-0 dotted-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-[#0866F5]/10 rounded-full blur-[140px] pointer-events-none" />

      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-6 py-8 relative z-10">
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* Breadcrumb & Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-xs text-[#8EABCF] hover:text-[#39BAFF] transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8EABCF] px-3 py-1 rounded-full bg-[#0C1E3D] border border-[#39BAFF]/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
                Live Competitor Scan
              </span>
            </div>
          </div>

          {/* Hero Header Card */}
          <div className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/25 rounded-2xl p-6 sm:p-8 space-y-5 shadow-[0_12px_45px_rgba(3,7,18,0.7)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#39BAFF] px-2.5 py-0.5 rounded-full bg-[#0C1E3D] border border-[#39BAFF]/30">
                  Market Saturation Intelligence
                </span>
                <span className="text-xs text-[#F4F8FF] px-2.5 py-0.5 rounded-full bg-[#0C1E3D] border border-[#39BAFF]/20 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#39BAFF]" />
                  {initialRegion}
                </span>
                <span className="text-xs text-[#8EABCF] px-2.5 py-0.5 rounded-full bg-[#0C1E3D] border border-[#39BAFF]/20">
                  {initialSector}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-[#8EABCF] block font-medium">Analysis Type</span>
                <span className="text-xs font-semibold text-[#39BAFF] px-3 py-0.5 rounded-full bg-[#0866F5]/20 border border-[#39BAFF]/40 inline-block mt-0.5 shadow-[0_0_10px_rgba(57,186,255,0.2)]">
                  Gap City Void Detection
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F8FF] leading-tight">
                Competitor Radar: {initialName}
              </h1>
              <p className="text-sm text-[#8EABCF] max-w-3xl leading-relaxed">
                Discover active players in India, identify high-population Tier-2 cities with zero institutional presence, and capitalize on uncontested regional market share.
              </p>
            </div>

            {/* Quick-Hop Navigation Strip */}
            <div className="pt-4 border-t border-[#39BAFF]/15 flex flex-wrap items-center gap-3">
              <span className="text-xs uppercase tracking-wider text-[#8EABCF] font-medium">Related Steps:</span>
              <Link
                href={`/kickstart-kit/${encodeURIComponent(id)}?sector=${encodeURIComponent(initialSector)}&region=${encodeURIComponent(initialRegion)}&name=${encodeURIComponent(initialName)}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0C1E3D]/70 hover:bg-[#0866F5]/25 border border-[#39BAFF]/20 hover:border-[#39BAFF]/50 text-xs text-[#F4F8FF] transition-all font-medium"
              >
                <FileText className="w-3.5 h-3.5 text-[#39BAFF]" />
                <span>Startup Kickstart Kit</span>
              </Link>
              <Link
                href={`/gtm-guide/${encodeURIComponent(id)}?sector=${encodeURIComponent(initialSector)}&region=${encodeURIComponent(initialRegion)}&name=${encodeURIComponent(initialName)}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0C1E3D]/70 hover:bg-[#0866F5]/25 border border-[#39BAFF]/20 hover:border-[#39BAFF]/50 text-xs text-[#F4F8FF] transition-all font-medium"
              >
                <Megaphone className="w-3.5 h-3.5 text-[#39BAFF]" />
                <span>Go-to-Market Strategy</span>
              </Link>
              <Link
                href="/funding"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0C1E3D]/70 hover:bg-[#0866F5]/25 border border-[#39BAFF]/20 hover:border-[#39BAFF]/50 text-xs text-[#F4F8FF] transition-all font-medium"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#39BAFF]" />
                <span>Funding Finder</span>
              </Link>
            </div>
          </div>

          {/* Competitor Radar Main Component */}
          {loading ? (
            <LoadingState message="Scanning active Indian startups, Crunchbase/Tracxn datasets, and city presence..." />
          ) : (
            <CompetitorRadar radarData={radarData} />
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CompetitorRadarPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#030712] flex items-center justify-center text-[#F4F8FF] text-sm font-mono">Loading Competitor Radar...</div>}>
      <CompetitorRadarContent />
    </Suspense>
  );
}
