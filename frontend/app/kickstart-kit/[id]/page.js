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
    <div className="min-h-screen flex flex-col bg-[#080808] text-white selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Breadcrumb & Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-xs text-[#A3A3A3] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-[#737373] px-2 py-0.5 rounded bg-white/5 border border-white/10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
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
          <ClayCard className="p-6 sm:p-8 space-y-4 border-white/15 bg-[#141414]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#737373] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                  Phase 2 Roadmap
                </span>
                <span className="text-[10px] font-mono text-white px-2 py-0.5 rounded bg-white/10 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {initialRegion}
                </span>
                <span className="text-[10px] font-mono text-[#A3A3A3] px-2 py-0.5 rounded bg-white/5">
                  {initialSector}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-[#737373] uppercase block">Stage Progress</span>
                <span className="text-xs font-mono font-semibold text-white px-2 py-0.5 rounded bg-white/10 inline-block mt-0.5">
                  Kit Generated (Step 3/4)
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                {initialName}
              </h1>
              <p className="text-sm text-[#A3A3A3] max-w-3xl leading-relaxed">
                Actionable launch blueprint for {initialRegion}. Review verified state licenses, Central & State subsidy schemes, capital requirement breakdown in INR, and a 90-day execution checklist.
              </p>
            </div>

            {/* Quick-Hop Navigation Strip to other phases */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3 print:hidden">
              <span className="text-xs text-[#737373]">Next Actions:</span>
              <Link
                href={`/competitor-radar/${encodeURIComponent(id)}?sector=${encodeURIComponent(initialSector)}&region=${encodeURIComponent(initialRegion)}&name=${encodeURIComponent(initialName)}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-colors"
              >
                <Radar className="w-3.5 h-3.5" />
                <span>Competitor Radar</span>
              </Link>
              <Link
                href={`/gtm-guide/${encodeURIComponent(id)}?sector=${encodeURIComponent(initialSector)}&region=${encodeURIComponent(initialRegion)}&name=${encodeURIComponent(initialName)}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-colors"
              >
                <Megaphone className="w-3.5 h-3.5" />
                <span>Go-to-Market Strategy</span>
              </Link>
              <Link
                href="/funding"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Find Eligible Funding</span>
              </Link>
            </div>
          </ClayCard>

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
    <Suspense fallback={<div className="min-h-screen bg-[#080808] flex items-center justify-center text-white font-mono text-sm">Loading Startup Kit...</div>}>
      <KickstartKitContent />
    </Suspense>
  );
}
