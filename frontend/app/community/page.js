'use client';

import { useState, useEffect, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CommunityFeed from '@/components/CommunityFeed';
import LoadingState from '@/components/LoadingState';
import { getCommunityPosts } from '@/lib/api';
import { Users } from 'lucide-react';

function CommunityContent() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      try {
        const data = await getCommunityPosts({});
        setPosts(data);
      } catch (err) {
        console.error('Failed to load community posts:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-[#F4F8FF] selection:bg-[#0866F5] selection:text-white relative overflow-hidden">
      {/* Background dotted pattern & ambient halos */}
      <div className="absolute inset-0 dotted-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-[#0866F5]/10 rounded-full blur-[140px] pointer-events-none" />

      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-6 py-8 relative z-10">
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="space-y-2 pb-4 border-b border-[#39BAFF]/15">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#39BAFF] px-2.5 py-0.5 rounded-full bg-[#0C1E3D] border border-[#39BAFF]/30">
                Phase 3 Founder Network
              </span>
              <span className="text-xs text-[#F4F8FF] px-2.5 py-0.5 rounded-full bg-[#0866F5]/20 border border-[#39BAFF]/30 flex items-center gap-1.5 font-medium">
                <Users className="w-3.5 h-3.5 text-[#39BAFF]" />
                <span>Indian Entrepreneurs</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F8FF]">
              Founder Community
            </h1>
            <p className="text-sm text-[#8EABCF] max-w-2xl leading-relaxed">
              Connect with fellow Indian entrepreneurs across Tier 1, 2, and 3 cities. Ask on-ground questions about state clearances, share customer acquisition lessons, and discuss weekly verified market gaps.
            </p>
          </div>

          {/* Community Feed Component */}
          {loading ? (
            <LoadingState message="Fetching active founder discussions, questions, and weekly gap resources..." />
          ) : (
            <CommunityFeed initialPosts={posts} />
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CommunityPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#030712] flex items-center justify-center text-[#F4F8FF] font-mono text-sm">Loading Community...</div>}>
      <CommunityContent />
    </Suspense>
  );
}
