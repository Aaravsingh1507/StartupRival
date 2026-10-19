'use client';

import { useState, useEffect, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CommunityFeed from '@/components/CommunityFeed';
import LoadingState from '@/components/LoadingState';
import { getCommunityPosts } from '@/lib/api';
import { Users, Sparkles, MessageSquare, TrendingUp, ShieldCheck } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col bg-[#080808] text-white selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#737373] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                Phase 3 Founder Network
              </span>
              <span className="text-[10px] font-mono text-white px-2 py-0.5 rounded bg-white/10 flex items-center gap-1">
                <Users className="w-3 h-3" />
                Indian Entrepreneurs
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Founder Community
            </h1>
            <p className="text-sm text-[#A3A3A3] max-w-2xl leading-relaxed">
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
    <Suspense fallback={<div className="min-h-screen bg-[#080808] flex items-center justify-center text-white font-mono text-sm">Loading Community...</div>}>
      <CommunityContent />
    </Suspense>
  );
}
