'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import ClayCard from '@/components/ClayCard';
import CompetitorRadar from '@/components/CompetitorRadar';
import LoadingState from '@/components/LoadingState';
import { getCompetitorRadar } from '@/lib/api';
import { 
  ArrowLeft, 
  Radar, 
  MapPin, 
  Building2, 
  FileText, 
  Megaphone, 
  ShieldCheck, 
  Sparkles,
  ExternalLink 
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
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#F5F5F5] selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1 pt-20 pb-16 px-6 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* Breadcrumb & Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-xs text-[#888888] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#888888] px-2.5 py-1 rounded bg-[#1A1A1A] border border-[#2A2A2A] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] inline-block" />
                Live Competitor Scan
              </span>
            </div>
          </div>

          {/* Hero Header Card */}
          <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-[#888888] px-2 py-0.5 rounded bg-[#1A1A1A] border border-[#2A2A2A]">
                  Market Saturation Intelligence
                </span>
                <span className="text-xs text-white px-2 py-0.5 rounded bg-[#1A1A1A] border border-[#2A2A2A] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#888888]" />
                  {initialRegion}
                </span>
                <span className="text-xs text-[#888888] px-2 py-0.5 rounded bg-[#1A1A1A] border border-[#2A2A2A]">
                  {initialSector}
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs uppercase tracking-wider text-[#555555] block">Analysis Type</span>
                <span className="text-xs font-semibold text-white px-2 py-0.5 rounded bg-[#1A1A1A] border border-[#2A2A2A] inline-block mt-0.5">
                  Gap City Void Detection
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                Competitor Radar: {initialName}
              </h1>
              <p className="text-sm text-[#888888] max-w-3xl leading-relaxed">
                Discover active players in India, identify high-population Tier-2 cities with zero institutional presence, and capitalize on uncontested regional market share.
              </p>
            </div>

            {/* Quick-Hop Navigation Strip */}
            <div className="pt-4 border-t border-[#1F1F1F] flex flex-wrap items-center gap-3">
              <span className="text-xs uppercase tracking-wider text-[#555555]">Related Steps:</span>
              <Link
                href={`/kickstart-kit/${encodeURIComponent(id)}?sector=${encodeURIComponent(initialSector)}&region=${encodeURIComponent(initialRegion)}&name=${encodeURIComponent(initialName)}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-transparent hover:bg-[#1A1A1A] border border-[#2A2A2A] text-xs text-white transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-[#888888]" />
                <span>Startup Kickstart Kit</span>
              </Link>
              <Link
                href={`/gtm-guide/${encodeURIComponent(id)}?sector=${encodeURIComponent(initialSector)}&region=${encodeURIComponent(initialRegion)}&name=${encodeURIComponent(initialName)}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-transparent hover:bg-[#1A1A1A] border border-[#2A2A2A] text-xs text-white transition-colors"
              >
                <Megaphone className="w-3.5 h-3.5 text-[#888888]" />
                <span>Go-to-Market Strategy</span>
              </Link>
              <Link
                href="/funding"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-transparent hover:bg-[#1A1A1A] border border-[#2A2A2A] text-xs text-white transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#888888]" />
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
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white text-sm">Loading Competitor Radar...</div>}>
      <CompetitorRadarContent />
    </Suspense>
  );
}
