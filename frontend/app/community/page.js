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
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#F5F5F5] selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1 pt-20 pb-16 px-6 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="space-y-2 pb-4 border-b border-[#1F1F1F]">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-[#888888] px-2 py-0.5 rounded bg-[#1A1A1A] border border-[#2A2A2A]">
                Phase 3 Founder Network
              </span>
              <span className="text-xs text-white px-2 py-0.5 rounded bg-[#111111] border border-[#2A2A2A] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>Indian Entrepreneurs</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Founder Community
            </h1>
            <p className="text-sm text-[#888888] max-w-2xl leading-relaxed">
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
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white font-mono text-sm">Loading Community...</div>}>
      <CommunityContent />
    </Suspense>
  );
}

