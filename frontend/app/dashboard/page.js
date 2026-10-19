'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import EmptyState from '@/components/EmptyState';
import ValidatorScorecard from '@/components/ValidatorScorecard';
import IdeaComparisonTable from '@/components/IdeaComparisonTable';
import { localDataService } from '@/lib/supabase';
import { compareIdeas } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/lib/toast-context';
import { 
  Bookmark, 
  History, 
  Compass, 
  Trash2, 
  ArrowRight, 
  RotateCw, 
  LayoutDashboard, 
  AlertTriangle,
  Scale,
  FileText,
  Radar,
  Settings,
  Sparkles
} from 'lucide-react';

function DashboardContent() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { showToast } = useToast();

  const [savedIdeas, setSavedIdeas] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'saved', 'kits', 'radar', 'history'
  const [ideaToRemove, setIdeaToRemove] = useState(null);
  const [selectedIdeaForValidation, setSelectedIdeaForValidation] = useState(null);

  // Comparison State
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [comparisonData, setComparisonData] = useState(null);
  const [comparingLoading, setComparingLoading] = useState(false);

  // Pagination for saved ideas
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    const ideas = localDataService.getSavedIdeas();
    const searches = localDataService.getRecentSearches();
    setSavedIdeas(ideas);
    setRecentSearches(searches);
  }, []);

  const handleConfirmRemove = () => {
    if (!ideaToRemove) return;
    const updated = localDataService.removeSavedIdea(ideaToRemove.id || ideaToRemove.name);
    setSavedIdeas(updated);
    showToast(`Removed "${ideaToRemove.name}" from saved ideas`);
    setIdeaToRemove(null);
  };

  const handleRerunSearch = (sector, region) => {
    router.push(`/gap-finder?sector=${encodeURIComponent(sector)}&region=${encodeURIComponent(region)}`);
  };

  const handleToggleSelectForCompare = (idea) => {
    const id = idea.id || idea.name;
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter((item) => item !== id));
    } else {
      if (selectedForCompare.length >= 2) {
        showToast('You can select up to 2 ideas to compare.');
        return;
      }
      setSelectedForCompare([...selectedForCompare, id]);
    }
  };

  const handleLaunchComparison = async () => {
    if (selectedForCompare.length !== 2) {
      showToast('Please select exactly 2 ideas to compare.');
      return;
    }
    setComparingLoading(true);
    setComparisonModalOpen(true);
    try {
      const data = await compareIdeas({ id1: selectedForCompare[0], id2: selectedForCompare[1] });
      setComparisonData(data);
    } catch (err) {
      console.error('Failed to compare ideas:', err);
    } finally {
      setComparingLoading(false);
    }
  };

  const userName = user?.user_metadata?.full_name || (user?.email ? user.email.split('@')[0] : 'Founder');

  const totalExplored = Math.max(recentSearches.length, 1);
  const totalSaved = savedIdeas.length;
  const totalKits = Math.min(totalSaved, 3);

  const paginatedIdeas = savedIdeas.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(savedIdeas.length / pageSize) || 1;

  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-[#F4F8FF] selection:bg-[#0866F5] selection:text-white relative overflow-hidden">
      {/* Background dotted pattern & ambient halos */}
      <div className="absolute inset-0 dotted-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-[#0866F5]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#39BAFF]/10 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="flex-1 pt-24 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* COMPACT SIDEBAR */}
            <aside className="lg:col-span-3 space-y-4">
              <div className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/25 rounded-2xl p-5 space-y-5 shadow-[0_12px_40px_rgba(3,7,18,0.7)]">
                {/* User Info */}
                <div className="flex items-center gap-3 pb-4 border-b border-[#39BAFF]/15">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0866F5] to-[#39BAFF] text-white font-bold flex items-center justify-center text-xs shadow-[0_0_15px_rgba(8,102,245,0.6)]">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="text-sm font-semibold text-[#F4F8FF] truncate">{userName}</h3>
                    <p className="text-xs text-[#8EABCF] truncate">{user?.email || 'Guest Explorer'}</p>
                  </div>
                </div>

                {/* Sidebar Navigation */}
                <nav className="space-y-1.5">
                  {[
                    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                    { id: 'saved', label: 'Saved Gaps', icon: Bookmark, count: savedIdeas.length },
                    { id: 'kits', label: 'Startup Kits', icon: FileText, count: totalKits },
                    { id: 'radar', label: 'Competitor Radar', icon: Radar },
                    { id: 'history', label: 'Search History', icon: History, count: recentSearches.length }
                  ].map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'bg-[#0866F5]/20 text-[#39BAFF] border border-[#39BAFF]/40 font-semibold shadow-[0_0_15px_rgba(8,102,245,0.25)]'
                            : 'text-[#8EABCF] hover:text-[#F4F8FF] hover:bg-[#0C1E3D]/60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-[#39BAFF]' : 'text-[#8EABCF]'}`} />
                          <span>{item.label}</span>
                        </div>
                        {item.count !== undefined && (
                          <span className={`font-mono text-xs px-2 py-0.5 rounded-md ${isActive ? 'bg-[#0866F5] text-white shadow-[0_0_8px_rgba(8,102,245,0.5)]' : 'bg-[#0C1E3D] text-[#8EABCF]'}`}>
                            {item.count}
                          </span>
                        )}
                      </button>
                    );
                  })}

                  <Link
                    href="/settings"
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm text-[#8EABCF] hover:text-[#F4F8FF] hover:bg-[#0C1E3D]/60 transition"
                  >
                    <Settings className="w-4 h-4 text-[#8EABCF]" />
                    <span>Settings</span>
                  </Link>
                </nav>

                {/* Quick stats box */}
                <div className="p-3.5 rounded-xl bg-[#030712]/70 border border-[#39BAFF]/20 space-y-2.5">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase tracking-wider text-[#8EABCF] font-medium block">Current Stage</span>
                    <span className="text-sm text-[#39BAFF] font-semibold block flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#39BAFF] shadow-[0_0_6px_rgba(57,186,255,0.8)]" />
                      Gap Found
                    </span>
                  </div>
                  <div className="space-y-0.5 border-t border-[#39BAFF]/15 pt-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#8EABCF] font-medium block">Active Roadmaps</span>
                    <span className="text-sm text-[#F4F8FF] font-medium block">{totalKits}</span>
                  </div>
                </div>

                {user && (
                  <button
                    onClick={signOut}
                    className="w-full text-xs text-[#8EABCF] hover:text-red-400 py-2 text-center transition cursor-pointer"
                  >
                    Sign Out
                  </button>
                )}
              </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* Welcome Message Card & Quick Actions */}
              <div className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/25 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-[0_12px_40px_rgba(3,7,18,0.7)]">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#39BAFF] px-2.5 py-0.5 rounded-full bg-[#0C1E3D] border border-[#39BAFF]/30 inline-block">
                    Founder Workspace
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F8FF]">
                    Welcome back, {userName}
                  </h1>
                  <p className="text-sm text-[#8EABCF] max-w-xl">
                    Convert validated market gaps into launch roadmaps and compare regional startup ideas side-by-side.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <Link href="/gap-finder">
                    <Button variant="primary" size="md" className="gap-2">
                      <Compass className="w-4 h-4" />
                      <span>Find a Gap</span>
                    </Button>
                  </Link>

                  {savedIdeas.length >= 2 && (
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={() => {
                        if (selectedForCompare.length === 2) {
                          handleLaunchComparison();
                        } else {
                          setSelectedForCompare([savedIdeas[0].id || savedIdeas[0].name, savedIdeas[1].id || savedIdeas[1].name]);
                          setComparingLoading(true);
                          setComparisonModalOpen(true);
                          compareIdeas({ id1: savedIdeas[0].id, id2: savedIdeas[1].id })
                            .then(data => setComparisonData(data))
                            .finally(() => setComparingLoading(false));
                        }
                      }}
                      className="gap-2"
                    >
                      <Scale className="w-4 h-4 text-[#39BAFF]" />
                      <span>Compare Ideas</span>
                    </Button>
                  )}
                </div>
              </div>

              {/* SECTION A: STATS ROW (4 EQUAL HEIGHT CARDS) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-stretch">
                {/* Stat 1 */}
                <div className="bg-[#08152B]/80 backdrop-blur-md border border-[#39BAFF]/20 hover:border-[#39BAFF]/40 rounded-2xl p-5 flex flex-col justify-between space-y-1 shadow-[0_8px_30px_rgba(3,7,18,0.4)] transition">
                  <span className="text-xs uppercase tracking-wider text-[#8EABCF] mb-2 block font-medium">Ideas Explored</span>
                  <div>
                    <div className="text-3xl font-bold text-[#F4F8FF] font-mono">{totalExplored}</div>
                    <span className="text-xs text-[#4B6485]">Regional queries run</span>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="bg-[#08152B]/80 backdrop-blur-md border border-[#39BAFF]/20 hover:border-[#39BAFF]/40 rounded-2xl p-5 flex flex-col justify-between space-y-1 shadow-[0_8px_30px_rgba(3,7,18,0.4)] transition">
                  <span className="text-xs uppercase tracking-wider text-[#8EABCF] mb-2 block font-medium">Gaps Saved</span>
                  <div>
                    <div className="text-3xl font-bold text-[#39BAFF] font-mono drop-shadow-[0_0_10px_rgba(57,186,255,0.3)]">{totalSaved}</div>
                    <span className="text-xs text-[#4B6485]">High demand conviction</span>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="bg-[#08152B]/80 backdrop-blur-md border border-[#39BAFF]/20 hover:border-[#39BAFF]/40 rounded-2xl p-5 flex flex-col justify-between space-y-1 shadow-[0_8px_30px_rgba(3,7,18,0.4)] transition">
                  <span className="text-xs uppercase tracking-wider text-[#8EABCF] mb-2 block font-medium">Kits Generated</span>
                  <div>
                    <div className="text-3xl font-bold text-[#F4F8FF] font-mono">{totalKits}</div>
                    <span className="text-xs text-[#4B6485]">Licenses & schemes</span>
                  </div>
                </div>

                {/* Stat 4 - Updated Startup Stage */}
                <div className="bg-[#08152B]/80 backdrop-blur-md border border-[#39BAFF]/20 hover:border-[#39BAFF]/40 rounded-2xl p-5 flex flex-col justify-between space-y-1 shadow-[0_8px_30px_rgba(3,7,18,0.4)] transition">
                  <span className="text-xs uppercase tracking-wider text-[#8EABCF] mb-2 block font-medium">Startup Stage</span>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-[#F4F8FF]">Gap Found</div>
                    <span className="text-xs text-[#4B6485] block">Step 1 of 4 active</span>
                    <div className="flex items-center gap-1.5 pt-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#39BAFF] shadow-[0_0_8px_rgba(57,186,255,0.8)]" />
                      <span className="w-2 h-2 rounded-full bg-[#0C1E3D]" />
                      <span className="w-2 h-2 rounded-full bg-[#0C1E3D]" />
                      <span className="w-2 h-2 rounded-full bg-[#0C1E3D]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION B: STARTUP PROGRESSION PIPELINE */}
              <div className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/25 rounded-2xl p-6 space-y-4 shadow-[0_12px_40px_rgba(3,7,18,0.5)]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#39BAFF]">
                    STARTUP PROGRESSION PIPELINE
                  </span>
                  <span className="text-xs text-[#8EABCF]">Your Primary Opportunity</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                  <div className="bg-[#0866F5] text-white rounded-xl py-3 px-4 text-sm font-semibold flex-1 text-center shadow-[0_0_20px_rgba(8,102,245,0.6)] border border-[#39BAFF]/50 w-full">
                    1. Gap Found
                  </div>
                  <span className="text-[#39BAFF] font-bold hidden sm:inline">→</span>
                  <div className="text-[#8EABCF] bg-[#0C1E3D]/50 border border-[#39BAFF]/20 rounded-xl py-3 px-4 text-sm flex-1 text-center w-full">
                    2. Validated
                  </div>
                  <span className="text-[#39BAFF] font-bold hidden sm:inline">→</span>
                  <div className="text-[#8EABCF] bg-[#0C1E3D]/50 border border-[#39BAFF]/20 rounded-xl py-3 px-4 text-sm flex-1 text-center w-full">
                    3. Kit Generated
                  </div>
                  <span className="text-[#39BAFF] font-bold hidden sm:inline">→</span>
                  <div className="text-[#8EABCF] bg-[#0C1E3D]/50 border border-[#39BAFF]/20 rounded-xl py-3 px-4 text-sm flex-1 text-center w-full">
                    4. Ready to Start
                  </div>
                </div>
              </div>

              {/* OVERVIEW / SAVED IDEAS SECTION */}
              {(activeTab === 'overview' || activeTab === 'saved') && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#39BAFF]/15">
                    <h2 className="text-base font-bold text-[#F4F8FF] flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-[#39BAFF]" />
                      <span>Saved Market Opportunities ({savedIdeas.length})</span>
                    </h2>
                    {savedIdeas.length >= 2 && (
                      <span className="text-xs text-[#8EABCF]">
                        Select checkboxes to compare 2 ideas
                      </span>
                    )}
                  </div>

                  {savedIdeas.length > 0 ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
                        {paginatedIdeas.map((idea) => {
                          const score = idea.demandScore ?? idea.demand_score ?? 84;
                          const id = idea.id || idea.name;
                          const isSelectedForCompare = selectedForCompare.includes(id);

                          return (
                            <div
                              key={id}
                              className={`bg-[#08152B]/85 backdrop-blur-md border rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all duration-300 shadow-[0_8px_32px_rgba(3,7,18,0.4)] ${
                                isSelectedForCompare 
                                  ? 'border-[#39BAFF] bg-[#0C1E3D]/95 shadow-[0_0_25px_rgba(8,102,245,0.3)]' 
                                  : 'border-[#39BAFF]/20 hover:border-[#39BAFF]/45 hover:shadow-[0_12px_40px_rgba(8,102,245,0.15)]'
                              }`}
                            >
                              <div className="space-y-3">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      checked={isSelectedForCompare}
                                      onChange={() => handleToggleSelectForCompare(idea)}
                                      className="rounded bg-[#030712] border-[#39BAFF]/40 text-[#0866F5] focus:ring-0 cursor-pointer w-4 h-4"
                                      title="Select to compare"
                                    />
                                    <span className="text-[10px] font-mono font-semibold text-[#39BAFF] px-2 py-0.5 rounded-full bg-[#0C1E3D] border border-[#39BAFF]/30">
                                      {idea.sector || 'Sector'}
                                    </span>
                                    <span className="text-[10px] font-mono text-[#8EABCF]">
                                      {idea.region || 'India'}
                                    </span>
                                  </div>

                                  <div className="text-right shrink-0">
                                    <span className="text-xs font-mono font-bold text-[#39BAFF] px-2.5 py-0.5 rounded-lg bg-[#0866F5]/20 border border-[#39BAFF]/40 shadow-[0_0_10px_rgba(57,186,255,0.2)]">
                                      {score}/100
                                    </span>
                                  </div>
                                </div>

                                <h3 className="text-base font-bold text-[#F4F8FF] tracking-tight leading-snug">
                                  {idea.name}
                                </h3>

                                <p className="text-xs text-[#8EABCF] line-clamp-2 leading-relaxed">
                                  {idea.summary}
                                </p>
                              </div>

                              <div className="pt-3 border-t border-[#39BAFF]/15 space-y-3">
                                <div className="grid grid-cols-3 gap-2 text-center">
                                  <Link
                                    href={`/kickstart-kit/${encodeURIComponent(id)}?sector=${encodeURIComponent(idea.sector || 'Agriculture')}&region=${encodeURIComponent(idea.region || 'Maharashtra')}&name=${encodeURIComponent(idea.name)}`}
                                    className="px-2 py-2 rounded-xl bg-[#0C1E3D]/80 border border-[#39BAFF]/20 hover:border-[#39BAFF]/50 hover:bg-[#0866F5]/25 text-xs text-[#F4F8FF] transition font-medium"
                                  >
                                    Startup Kit
                                  </Link>
                                  <Link
                                    href={`/competitor-radar/${encodeURIComponent(id)}?sector=${encodeURIComponent(idea.sector || 'Agriculture')}&region=${encodeURIComponent(idea.region || 'Maharashtra')}&name=${encodeURIComponent(idea.name)}`}
                                    className="px-2 py-2 rounded-xl bg-[#0C1E3D]/80 border border-[#39BAFF]/20 hover:border-[#39BAFF]/50 hover:bg-[#0866F5]/25 text-xs text-[#F4F8FF] transition font-medium"
                                  >
                                    Radar
                                  </Link>
                                  <Link
                                    href={`/gtm-guide/${encodeURIComponent(id)}?sector=${encodeURIComponent(idea.sector || 'Agriculture')}&region=${encodeURIComponent(idea.region || 'Maharashtra')}&name=${encodeURIComponent(idea.name)}`}
                                    className="px-2 py-2 rounded-xl bg-[#0C1E3D]/80 border border-[#39BAFF]/20 hover:border-[#39BAFF]/50 hover:bg-[#0866F5]/25 text-xs text-[#F4F8FF] transition font-medium"
                                  >
                                    GTM
                                  </Link>
                                </div>

                                <div className="flex items-center justify-between pt-1">
                                  <button
                                    onClick={() => setSelectedIdeaForValidation(idea)}
                                    className="text-xs text-[#8EABCF] hover:text-[#39BAFF] transition cursor-pointer flex items-center gap-1 font-medium"
                                  >
                                    <span>Validation Scorecard</span>
                                    <span>→</span>
                                  </button>

                                  <button
                                    onClick={() => setIdeaToRemove(idea)}
                                    className="p-1.5 text-[#4B6485] hover:text-red-400 rounded-lg hover:bg-red-950/30 transition cursor-pointer"
                                    title="Remove idea"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex items-center justify-between text-xs text-[#8EABCF] pt-2">
                          <span>Page {currentPage} of {totalPages}</span>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              disabled={currentPage === 1}
                              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            >
                              Previous
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              disabled={currentPage === totalPages}
                              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            >
                              Next
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-[#08152B]/80 backdrop-blur-md border border-[#39BAFF]/20 rounded-2xl p-10 text-center space-y-4 shadow-[0_12px_40px_rgba(3,7,18,0.5)]">
                      <div className="space-y-1.5">
                        <h3 className="text-lg font-bold text-[#F4F8FF]">No Saved Opportunities Yet</h3>
                        <p className="text-sm text-[#8EABCF] max-w-sm mx-auto">
                          Start exploring real Indian market gaps. Save high-potential ideas to generate full Kickstart Kits and competitor maps.
                        </p>
                      </div>
                      <Link href="/gap-finder" className="inline-block">
                        <Button variant="primary" size="md">
                          Explore Market Gaps
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* TAB CONTENT: STARTUP KITS */}
              {activeTab === 'kits' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#39BAFF]/15">
                    <h2 className="text-base font-bold text-[#F4F8FF] flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#39BAFF]" />
                      <span>Generated Startup Kits ({totalKits})</span>
                    </h2>
                  </div>

                  {savedIdeas.length > 0 ? (
                    <div className="space-y-3">
                      {savedIdeas.slice(0, 3).map((idea) => (
                        <div key={idea.id || idea.name} className="bg-[#08152B]/85 border border-[#39BAFF]/20 backdrop-blur-md rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-[#39BAFF] uppercase block font-semibold">{idea.sector} • {idea.region}</span>
                            <h3 className="text-base font-bold text-[#F4F8FF]">{idea.name}</h3>
                            <p className="text-xs text-[#8EABCF]">FSSAI / Udyam Licenses • AIF & PM FME Subsidies • 90-day execution checklist</p>
                          </div>

                          <Link
                            href={`/kickstart-kit/${encodeURIComponent(idea.id || 'gap-1')}?sector=${encodeURIComponent(idea.sector || 'Agriculture')}&region=${encodeURIComponent(idea.region || 'Maharashtra')}&name=${encodeURIComponent(idea.name)}`}
                          >
                            <Button variant="primary" size="sm" className="gap-1.5 shrink-0">
                              <span>Open Kit</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-[#08152B]/80 backdrop-blur-md border border-[#39BAFF]/20 rounded-2xl p-10 text-center space-y-4">
                      <div className="space-y-1.5">
                        <h3 className="text-lg font-bold text-[#F4F8FF]">No Startup Kits Generated</h3>
                        <p className="text-sm text-[#8EABCF] max-w-sm mx-auto">
                          Discover an opportunity and click 'Startup Kit' to view licenses, govt schemes, and execution timelines.
                        </p>
                      </div>
                      <Link href="/gap-finder" className="inline-block">
                        <Button variant="primary" size="md">
                          Discover Opportunities
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* TAB CONTENT: COMPETITOR RADAR */}
              {activeTab === 'radar' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#39BAFF]/15">
                    <h2 className="text-base font-bold text-[#F4F8FF] flex items-center gap-2">
                      <Radar className="w-4 h-4 text-[#39BAFF]" />
                      <span>Competitor Radar: Gap City Infiltration</span>
                    </h2>
                  </div>

                  {savedIdeas.length > 0 ? (
                    <div className="space-y-3">
                      {savedIdeas.slice(0, 3).map((idea) => (
                        <div key={idea.id || idea.name} className="bg-[#08152B]/85 border border-[#39BAFF]/20 backdrop-blur-md rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-[#39BAFF] uppercase block font-semibold">Radar Scan: {idea.sector}</span>
                            <h3 className="text-base font-bold text-[#F4F8FF]">{idea.name}</h3>
                            <p className="text-xs text-[#8EABCF]">Identified Tier-2 gap cities with zero venture-backed incumbents</p>
                          </div>

                          <Link
                            href={`/competitor-radar/${encodeURIComponent(idea.id || 'gap-1')}?sector=${encodeURIComponent(idea.sector || 'Agriculture')}&region=${encodeURIComponent(idea.region || 'Maharashtra')}&name=${encodeURIComponent(idea.name)}`}
                          >
                            <Button variant="secondary" size="sm" className="gap-1.5 shrink-0">
                              <span>View Radar</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-[#08152B]/80 backdrop-blur-md border border-[#39BAFF]/20 rounded-2xl p-10 text-center space-y-4">
                      <div className="space-y-1.5">
                        <h3 className="text-lg font-bold text-[#F4F8FF]">No Radar Scans Run</h3>
                        <p className="text-sm text-[#8EABCF] max-w-sm mx-auto">
                          Search any sector and inspect the Competitor Radar to reveal uncontested Indian cities.
                        </p>
                      </div>
                      <Link href="/gap-finder" className="inline-block">
                        <Button variant="primary" size="md">
                          Start Discovery
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* TAB CONTENT: SEARCH HISTORY */}
              {activeTab === 'history' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#39BAFF]/15">
                    <h2 className="text-base font-bold text-[#F4F8FF] flex items-center gap-2">
                      <History className="w-4 h-4 text-[#39BAFF]" />
                      <span>Search History Timeline ({recentSearches.length})</span>
                    </h2>
                  </div>

                  {recentSearches.length > 0 ? (
                    <div className="divide-y divide-[#39BAFF]/15 rounded-2xl border border-[#39BAFF]/20 bg-[#08152B]/85 backdrop-blur-md overflow-hidden">
                      {recentSearches.map((item, idx) => (
                        <div key={idx} className="p-4 flex items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-[#F4F8FF]">{item.sector}</span>
                              <span className="text-[10px] text-[#39BAFF]">•</span>
                              <span className="text-xs text-[#8EABCF]">{item.region}</span>
                            </div>
                            <span className="text-[10px] text-[#4B6485] font-mono block">
                              {new Date(item.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleRerunSearch(item.sector, item.region)}
                            className="gap-1.5 text-xs"
                          >
                            <RotateCw className="w-3 h-3 text-[#39BAFF]" />
                            <span>Re-run</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-[#08152B]/80 backdrop-blur-md border border-[#39BAFF]/20 rounded-2xl p-10 text-center space-y-4">
                      <div className="space-y-1.5">
                        <h3 className="text-lg font-bold text-[#F4F8FF]">No Search History</h3>
                        <p className="text-sm text-[#8EABCF] max-w-sm mx-auto">
                          Your regional market searches will be recorded here for instant replay.
                        </p>
                      </div>
                      <Link href="/gap-finder" className="inline-block">
                        <Button variant="primary" size="md">
                          Explore First Sector
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      {/* VALIDATION SCORECARD MODAL */}
      {selectedIdeaForValidation && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-3xl w-full my-8">
            <ValidatorScorecard
              idea={selectedIdeaForValidation}
              onClose={() => setSelectedIdeaForValidation(null)}
            />
          </div>
        </div>
      )}

      {/* IDEA COMPARISON MODAL */}
      {comparisonModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-4xl w-full my-8">
            <div className="p-6 bg-[#08152B]/95 border border-[#39BAFF]/30 backdrop-blur-2xl rounded-2xl shadow-[0_20px_60px_rgba(3,7,18,0.85)]">
              {comparingLoading ? (
                <div className="py-16 text-center space-y-3 font-mono text-xs text-[#8EABCF]">
                  <RotateCw className="w-6 h-6 animate-spin mx-auto text-[#39BAFF]" />
                  <p>Comparing unit economics, competition densities, and capital requirements...</p>
                </div>
              ) : (
                <IdeaComparisonTable
                  comparison={comparisonData}
                  onClose={() => setComparisonModalOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* REMOVAL CONFIRMATION MODAL */}
      {ideaToRemove && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 space-y-4 border border-[#39BAFF]/30 bg-[#08152B] rounded-2xl shadow-[0_20px_50px_rgba(3,7,18,0.9)]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-950/60 border border-red-500/40 text-red-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F4F8FF]">Remove Opportunity</h3>
                <p className="text-xs text-[#8EABCF]">From your founder workspace</p>
              </div>
            </div>
            <p className="text-xs text-[#8EABCF] leading-relaxed">
              Are you sure you want to remove <strong className="text-[#F4F8FF]">"{ideaToRemove.name}"</strong>?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setIdeaToRemove(null)}>
                Cancel
              </Button>
              <Button variant="destructive" size="sm" onClick={handleConfirmRemove}>
                Remove Idea
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#030712]" />}>
      <DashboardContent />
    </Suspense>
  );
}
