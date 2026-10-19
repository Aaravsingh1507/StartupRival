'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import ClayCard from '@/components/ClayCard';
import GTMGuide from '@/components/GTMGuide';
import LoadingState from '@/components/LoadingState';
import { getGTMGuide } from '@/lib/api';
import { 
  ArrowLeft, 
  Megaphone, 
  MapPin, 
  FileText, 
  Radar, 
  ShieldCheck, 
  Users,
  Sparkles 
} from 'lucide-react';

function GTMGuideContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const id = params?.id || 'gap-1';
  const initialSector = searchParams?.get('sector') || 'Agriculture';
  const initialRegion = searchParams?.get('region') || 'Maharashtra';
  const initialName = searchParams?.get('name') || `Decentralized ${initialSector} Processing`;

  const [loading, setLoading] = useState(true);
  const [gtmData, setGtmData] = useState(null);

  useEffect(() => {
    async function loadGTM() {
      setLoading(true);
      try {
        const data = await getGTMGuide({ sector: initialSector, region: initialRegion });
        setGtmData(data);
      } catch (err) {
        console.error('Failed to load GTM guide:', err);
      } finally {
        setLoading(false);
      }
    }
    loadGTM();
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
                Phase 3 Execution Playbook
              </span>
            </div>
          </div>

          {/* Hero Header Card */}
          <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-[#888888] px-2 py-0.5 rounded bg-[#1A1A1A] border border-[#2A2A2A]">
                  Go-To-Market Blueprint
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
                <span className="text-xs uppercase tracking-wider text-[#555555] block">Playbook Scope</span>
                <span className="text-xs font-semibold text-white px-2 py-0.5 rounded bg-[#1A1A1A] border border-[#2A2A2A] inline-block mt-0.5">
                  Indian Market & Tier-2/3
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                Go-To-Market Guide: {initialName}
              </h1>
              <p className="text-sm text-[#888888] max-w-3xl leading-relaxed">
                Strategic channels, Indian pricing psychology, regional language adoption, and a disciplined 5-step tactic list to acquire your first 100 paying customers in {initialRegion}.
              </p>
            </div>

            {/* Quick-Hop Navigation Strip */}
            <div className="pt-4 border-t border-[#1F1F1F] flex flex-wrap items-center gap-3">
              <span className="text-xs uppercase tracking-wider text-[#555555]">Platform Roadmap:</span>
              <Link
                href={`/kickstart-kit/${encodeURIComponent(id)}?sector=${encodeURIComponent(initialSector)}&region=${encodeURIComponent(initialRegion)}&name=${encodeURIComponent(initialName)}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-transparent hover:bg-[#1A1A1A] border border-[#2A2A2A] text-xs text-white transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-[#888888]" />
                <span>Kickstart Kit</span>
              </Link>
              <Link
                href={`/competitor-radar/${encodeURIComponent(id)}?sector=${encodeURIComponent(initialSector)}&region=${encodeURIComponent(initialRegion)}&name=${encodeURIComponent(initialName)}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-transparent hover:bg-[#1A1A1A] border border-[#2A2A2A] text-xs text-white transition-colors"
              >
                <Radar className="w-3.5 h-3.5 text-[#888888]" />
                <span>Competitor Radar</span>
              </Link>
              <Link
                href="/funding"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-transparent hover:bg-[#1A1A1A] border border-[#2A2A2A] text-xs text-white transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#888888]" />
                <span>Funding Finder</span>
              </Link>
              <Link
                href="/community"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-transparent hover:bg-[#1A1A1A] border border-[#2A2A2A] text-xs text-white transition-colors"
              >
                <Users className="w-3.5 h-3.5 text-[#888888]" />
                <span>Founder Community</span>
              </Link>
            </div>
          </div>

          {/* GTM Guide Main Component */}
          {loading ? (
            <LoadingState message="Formulating regional marketing channels, pricing anchors, and First 100 Customer playbook..." />
          ) : (
            <GTMGuide gtmData={gtmData} />
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function GTMGuidePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white text-sm">Loading GTM Strategy...</div>}>
      <GTMGuideContent />
    </Suspense>
  );
}
