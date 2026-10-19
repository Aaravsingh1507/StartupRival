'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import ClayCard from '@/components/ClayCard';
import StartupKitSection from '@/components/StartupKitSection';
import LoadingState from '@/components/LoadingState';
import { getKickstartKit } from '@/lib/api';
import { localDataService } from '@/lib/supabase';
import { 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Radar, 
  Megaphone, 
  FileText, 
  MapPin, 
  Calendar,
  CheckCircle2,
  Clock,
  Printer
} from 'lucide-react';

function KickstartKitContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const id = params?.id || 'gap-1';
  const initialSector = searchParams?.get('sector') || 'Agriculture';
  const initialRegion = searchParams?.get('region') || 'Maharashtra';
  const initialName = searchParams?.get('name') || `Decentralized ${initialSector} Processing Micro-Hub`;

  const [loading, setLoading] = useState(true);
  const [kitData, setKitData] = useState(null);
  const [cachedStatus, setCachedStatus] = useState('Cached 2h ago');

  useEffect(() => {
    async function loadKit() {
      setLoading(true);
      try {
        const data = await getKickstartKit({ sector: initialSector, region: initialRegion });
        setKitData(data);
        // Track kit generation in user progress
        localDataService.updateUserProgress(id, 'kit_generated');
      } catch (err) {
        console.error('Failed to load kickstart kit:', err);
      } finally {
        setLoading(false);
      }
    }
    loadKit();
  }, [id, initialSector, initialRegion]);

  const handleExportPdf = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

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
                {cachedStatus}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleExportPdf}
                className="gap-1.5 text-xs print:hidden"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </Button>
            </div>
          </div>

          {/* Hero Header Card */}
          <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-[#888888] px-2 py-0.5 rounded bg-[#1A1A1A] border border-[#2A2A2A]">
                  Phase 2 Roadmap
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
                <span className="text-xs uppercase tracking-wider text-[#555555] block">Stage Progress</span>
                <span className="text-xs font-semibold text-white px-2 py-0.5 rounded bg-[#1A1A1A] border border-[#2A2A2A] inline-block mt-0.5">
                  Kit Generated (Step 3/4)
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                {initialName}
              </h1>
              <p className="text-sm text-[#888888] max-w-3xl leading-relaxed">
                Actionable launch blueprint for {initialRegion}. Review verified state licenses, Central & State subsidy schemes, capital requirement breakdown in INR, and a 90-day execution checklist.
              </p>
            </div>

            {/* Quick-Hop Navigation Strip to other phases */}
            <div className="pt-4 border-t border-[#1F1F1F] flex flex-wrap items-center gap-3 print:hidden">
              <span className="text-xs uppercase tracking-wider text-[#555555]">Next Actions:</span>
              <Link
                href={`/competitor-radar/${encodeURIComponent(id)}?sector=${encodeURIComponent(initialSector)}&region=${encodeURIComponent(initialRegion)}&name=${encodeURIComponent(initialName)}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-transparent hover:bg-[#1A1A1A] border border-[#2A2A2A] text-xs text-white transition-colors"
              >
                <Radar className="w-3.5 h-3.5 text-[#888888]" />
                <span>Competitor Radar</span>
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
                <span>Find Eligible Funding</span>
              </Link>
            </div>
          </div>

          {/* Kit Details Accordion Section */}
          {loading ? (
            <LoadingState message="Synthesizing Indian regulatory requirements, subsidy schemes, and capital ranges..." />
          ) : (
            <StartupKitSection kit={kitData} onExportPdf={handleExportPdf} />
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function KickstartKitPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white text-sm">Loading Startup Kit...</div>}>
      <KickstartKitContent />
    </Suspense>
  );
}
