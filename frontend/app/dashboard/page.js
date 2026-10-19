'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import ClayCard from '@/components/ClayCard';
import GlassPanel from '@/components/GlassPanel';
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
  TrendingUp, 
  Trash2, 
  ArrowRight, 
  RotateCw, 
  LayoutDashboard, 
  Sliders, 
  Users, 
  AlertTriangle,
  Scale,
  FileText,
  Radar,
  Megaphone,
  CheckCircle2,
  Printer,
  ChevronRight,
  Settings
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
    // Load saved ideas and search history
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

  // Stages calculation for progress tracker
  const totalExplored = Math.max(recentSearches.length, 1);
  const totalSaved = savedIdeas.length;
  const totalKits = Math.min(totalSaved, 3);
  const highestStage = totalKits > 0 ? 'Ready to Start' : totalSaved > 0 ? 'Kit Generated' : 'Gap Found';

  const paginatedIdeas = savedIdeas.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(savedIdeas.length / pageSize) || 1;

  return (
    <div className="min-h-screen flex flex-col bg-[#080808] text-white selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* SLIM SIDEBAR */}
            <aside className="lg:col-span-3 space-y-4">
              <div className="clay-card p-5 space-y-6 border-white/10 bg-[#121212]">
                {/* User Info */}
                <div className="flex items-center gap-3 pb-5 border-b border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-white text-black font-bold flex items-center justify-center text-sm shadow">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="text-sm font-semibold text-white truncate">{userName}</h3>
                    <p className="text-xs text-[#737373] truncate">{user?.email || 'Guest Explorer'}</p>
                  </div>
                </div>

                {/* Sidebar Navigation */}
                <nav className="space-y-1">
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
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          isActive
                            ? 'bg-white text-black font-semibold'
                            : 'text-[#A3A3A3] hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        {item.count !== undefined && (
                          <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${isActive ? 'bg-black/10' : 'bg-white/10'}`}>
                            {item.count}
                          </span>
                        )}
                      </button>
                    );
                  })}

                  <Link
                    href="/settings"
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs text-[#A3A3A3] hover:text-white hover:bg-white/5 transition-all"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>

                  <Link
                    href="/gap-finder"
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs text-white bg-white/10 hover:bg-white/15 transition-all mt-3 font-medium"
                  >
                    <Compass className="w-4 h-4" />
                    <span>Find New Gap</span>
                  </Link>
                </nav>

                {/* Quick stats box */}
                <div className="p-3.5 rounded-xl bg-[#171717] border border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between text-[#737373]">
                    <span>Current Stage</span>
                    <span className="text-white font-mono font-medium">{highestStage}</span>
                  </div>
                  <div className="flex justify-between text-[#737373]">
                    <span>Active Roadmaps</span>
                    <span className="text-white font-mono font-medium">{totalKits}</span>
                  </div>
                  <div className="flex justify-between text-[#737373]">
                    <span>Engine</span>
                    <span className="text-white font-mono">Phase 2 + 3</span>
                  </div>
                </div>

                {user && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={signOut}
                    className="w-full text-xs justify-center text-[#737373] hover:text-white"
                  >
                    Sign Out
                  </Button>
                )}
              </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* Welcome Message Card & Quick Actions */}
              <div className="clay-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-white/10 bg-[#121212]">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#737373] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    Founder Workspace
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    Welcome back, {userName}
                  </h1>
                  <p className="text-xs text-[#A3A3A3] max-w-xl leading-relaxed">
                    Convert validated market gaps into launch roadmaps, track regulatory clearance milestones, and compare regional startup ideas side-by-side.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <Link href="/gap-finder">
                    <Button variant="primary" size="md" className="gap-2 shadow-xl">
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
                      <Scale className="w-4 h-4" />
                      <span>Compare Ideas</span>
                    </Button>
                  )}
                </div>
              </div>

              {/* SECTION A: STATS ROW (4 CARDS) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <ClayCard className="p-4 bg-[#141414] border-white/10 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#737373]">Ideas Explored</span>
                  <div className="text-2xl font-bold font-mono text-white">{totalExplored}</div>
                  <span className="text-[10px] text-[#737373]">Regional queries run</span>
                </ClayCard>

                <ClayCard className="p-4 bg-[#141414] border-white/10 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#737373]">Gaps Saved</span>
                  <div className="text-2xl font-bold font-mono text-white">{totalSaved}</div>
                  <span className="text-[10px] text-[#737373]">High demand conviction</span>
                </ClayCard>

                <ClayCard className="p-4 bg-[#141414] border-white/10 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#737373]">Kits Generated</span>
                  <div className="text-2xl font-bold font-mono text-white">{totalKits}</div>
                  <span className="text-[10px] text-[#737373]">Licenses & schemes</span>
                </ClayCard>

                <ClayCard className="p-4 bg-[#141414] border-white/10 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#737373]">Startup Stage</span>
                  <div className="text-base font-bold font-mono text-white truncate">{highestStage}</div>
                  <span className="text-[10px] text-emerald-400">Step 3 of 4 active</span>
                </ClayCard>
              </div>

              {/* SECTION B: 4-STEP PROGRESS TRACKER */}
              <ClayCard className="p-5 sm:p-6 bg-[#141414] border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                    Startup Progression Pipeline
                  </h3>
                  <span className="text-[11px] text-[#737373]">
                    {savedIdeas.length > 0 ? `${savedIdeas[0].name.slice(0, 30)}...` : 'Your Primary Opportunity'}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  {[
                    { label: '1. Gap Found', done: true },
                    { label: '2. Validated', done: savedIdeas.length > 0 },
                    { label: '3. Kit Generated', done: totalKits > 0 },
                    { label: '4. Ready to Start', done: totalKits > 0 }
                  ].map((step, idx) => (
                    <div
                      key={step.label}
                      className={`p-3 rounded-xl border transition-all ${
                        step.done
                          ? 'bg-white/10 border-white/30 text-white font-semibold'
                          : 'bg-white/5 border-white/5 text-[#737373]'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        {step.done ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full border border-[#737373] text-[9px] flex items-center justify-center font-mono">
                            {idx + 1}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] leading-tight block">{step.label}</span>
                    </div>
                  ))}
                </div>
              </ClayCard>

              {/* OVERVIEW / SAVED IDEAS SECTION */}
              {(activeTab === 'overview' || activeTab === 'saved') && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <h2 className="text-base font-semibold text-white flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-[#A3A3A3]" />
                      <span>Saved Market Opportunities ({savedIdeas.length})</span>
                    </h2>
                    {savedIdeas.length >= 2 && (
                      <span className="text-xs text-[#A3A3A3]">
                        Select checkboxes to compare 2 ideas
                      </span>
                    )}
                  </div>

                  {savedIdeas.length > 0 ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {paginatedIdeas.map((idea) => {
                          const score = idea.demandScore ?? idea.demand_score ?? 84;
                          const id = idea.id || idea.name;
                          const isSelectedForCompare = selectedForCompare.includes(id);

                          return (
                            <ClayCard
                              key={id}
                              className={`p-5 flex flex-col justify-between space-y-4 transition-all ${
                                isSelectedForCompare ? 'border-white bg-[#1A1A1A]' : 'hover:border-white/30 bg-[#141414]'
                              }`}
                            >
                              <div className="space-y-2.5">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      checked={isSelectedForCompare}
                                      onChange={() => handleToggleSelectForCompare(idea)}
                                      className="rounded bg-black/40 border-white/20 text-white focus:ring-0 cursor-pointer"
                                      title="Select to compare"
                                    />
                                    <span className="text-[10px] font-mono text-white/90 px-1.5 py-0.5 rounded bg-white/10">
                                      {idea.sector || 'Sector'}
                                    </span>
                                    <span className="text-[10px] font-mono text-[#737373]">
                                      {idea.region || 'India'}
                                    </span>
                                  </div>

                                  <div className="text-right shrink-0">
                                    <span className="text-xs font-mono font-bold text-white px-2 py-0.5 rounded bg-white/10">
                                      {score}/100
                                    </span>
                                  </div>
                                </div>

                                <h3 className="text-base font-semibold text-white tracking-tight leading-snug">
                                  {idea.name}
                                </h3>

                                <p className="text-xs text-[#A3A3A3] line-clamp-2 leading-relaxed">
                                  {idea.summary}
                                </p>
                              </div>

                              <div className="pt-3 border-t border-white/5 space-y-2">
                                <div className="grid grid-cols-3 gap-1.5 text-center">
                                  <Link
                                    href={`/kickstart-kit/${encodeURIComponent(id)}?sector=${encodeURIComponent(idea.sector || 'Agriculture')}&region=${encodeURIComponent(idea.region || 'Maharashtra')}&name=${encodeURIComponent(idea.name)}`}
                                    className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-[#EDEDED] font-medium transition-colors"
                                  >
                                    Startup Kit
                                  </Link>
                                  <Link
                                    href={`/competitor-radar/${encodeURIComponent(id)}?sector=${encodeURIComponent(idea.sector || 'Agriculture')}&region=${encodeURIComponent(idea.region || 'Maharashtra')}&name=${encodeURIComponent(idea.name)}`}
                                    className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-[#EDEDED] font-medium transition-colors"
                                  >
                                    Radar
                                  </Link>
                                  <Link
                                    href={`/gtm-guide/${encodeURIComponent(id)}?sector=${encodeURIComponent(idea.sector || 'Agriculture')}&region=${encodeURIComponent(idea.region || 'Maharashtra')}&name=${encodeURIComponent(idea.name)}`}
                                    className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-[#EDEDED] font-medium transition-colors"
                                  >
                                    GTM
                                  </Link>
                                </div>

                                <div className="flex items-center justify-between pt-1">
                                  <button
                                    onClick={() => setSelectedIdeaForValidation(idea)}
                                    className="text-[11px] text-[#A3A3A3] hover:text-white underline decoration-white/20 transition-colors"
                                  >
                                    Validation Scorecard
                                  </button>

                                  <button
                                    onClick={() => setIdeaToRemove(idea)}
                                    className="p-1.5 text-[#737373] hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                                    title="Remove idea"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </ClayCard>
                          );
                        })}
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex items-center justify-between text-xs text-[#737373] pt-2">
                          <span>Page {currentPage} of {totalPages}</span>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={currentPage === 1}
                              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            >
                              Previous
                            </Button>
                            <Button
                              variant="ghost"
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
                    <EmptyState
                      title="No Saved Opportunities Yet"
                      description="Start exploring real Indian market gaps. Save high-potential ideas to generate full Kickstart Kits and competitor maps."
                      actionLabel="Explore Market Gaps"
                      onAction={() => router.push('/gap-finder')}
                    />
                  )}
                </div>
              )}

              {/* TAB CONTENT: STARTUP KITS */}
              {activeTab === 'kits' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <h2 className="text-base font-semibold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#A3A3A3]" />
                      <span>Generated Startup Kits ({totalKits})</span>
                    </h2>
                  </div>

                  {savedIdeas.length > 0 ? (
                    <div className="space-y-3">
                      {savedIdeas.slice(0, 3).map((idea) => (
                        <ClayCard key={idea.id || idea.name} className="p-5 flex items-center justify-between gap-4 bg-[#141414] border-white/10">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-[#737373] uppercase block">{idea.sector} • {idea.region}</span>
                            <h3 className="text-sm font-semibold text-white">{idea.name}</h3>
                            <p className="text-xs text-[#A3A3A3]">FSSAI / Udyam Licenses • AIF & PM FME Subsidies • 90-day checklist</p>
                          </div>

                          <Link
                            href={`/kickstart-kit/${encodeURIComponent(idea.id || 'gap-1')}?sector=${encodeURIComponent(idea.sector || 'Agriculture')}&region=${encodeURIComponent(idea.region || 'Maharashtra')}&name=${encodeURIComponent(idea.name)}`}
                          >
                            <Button variant="primary" size="sm" className="gap-1.5 shrink-0">
                              <span>Open Kit</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Button>
                          </Link>
                        </ClayCard>
                      ))}
                    </div>
                  ) : (
                    <EmptyState
                      title="No Startup Kits Generated"
                      description="Discover an opportunity and click 'Get Startup Kit' to view licenses, govt schemes, and execution timelines."
                      actionLabel="Discover Opportunities"
                      onAction={() => router.push('/gap-finder')}
                    />
                  )}
                </div>
              )}

              {/* TAB CONTENT: COMPETITOR RADAR */}
              {activeTab === 'radar' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <h2 className="text-base font-semibold text-white flex items-center gap-2">
                      <Radar className="w-4 h-4 text-[#A3A3A3]" />
                      <span>Competitor Radar: Gap City Infiltration</span>
                    </h2>
                  </div>

                  {savedIdeas.length > 0 ? (
                    <div className="space-y-3">
                      {savedIdeas.slice(0, 3).map((idea) => (
                        <ClayCard key={idea.id || idea.name} className="p-5 flex items-center justify-between gap-4 bg-[#141414] border-white/10">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-[#737373] uppercase block">Radar Scan: {idea.sector}</span>
                            <h3 className="text-sm font-semibold text-white">{idea.name}</h3>
                            <p className="text-xs text-[#A3A3A3]">Identified Tier-2 gap cities with zero venture-backed incumbents</p>
                          </div>

                          <Link
                            href={`/competitor-radar/${encodeURIComponent(idea.id || 'gap-1')}?sector=${encodeURIComponent(idea.sector || 'Agriculture')}&region=${encodeURIComponent(idea.region || 'Maharashtra')}&name=${encodeURIComponent(idea.name)}`}
                          >
                            <Button variant="secondary" size="sm" className="gap-1.5 shrink-0">
                              <span>View Radar</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Button>
                          </Link>
                        </ClayCard>
                      ))}
                    </div>
                  ) : (
                    <EmptyState
                      title="No Radar Scans Run"
                      description="Search any sector and inspect the Competitor Radar to reveal uncontested Indian cities."
                      actionLabel="Start Discovery"
                      onAction={() => router.push('/gap-finder')}
                    />
                  )}
                </div>
              )}

              {/* TAB CONTENT: SEARCH HISTORY */}
              {activeTab === 'history' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <h2 className="text-base font-semibold text-white flex items-center gap-2">
                      <History className="w-4 h-4 text-[#A3A3A3]" />
                      <span>Search History Timeline ({recentSearches.length})</span>
                    </h2>
                  </div>

                  {recentSearches.length > 0 ? (
                    <div className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-[#121212] overflow-hidden">
                      {recentSearches.map((item, idx) => (
                        <div key={idx} className="p-4 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-white">{item.sector}</span>
                              <span className="text-[10px] text-[#737373]">•</span>
                              <span className="text-xs text-[#A3A3A3]">{item.region}</span>
                            </div>
                            <span className="text-[10px] text-[#737373] font-mono block">
                              {new Date(item.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRerunSearch(item.sector, item.region)}
                            className="gap-1.5 text-xs text-[#A3A3A3] hover:text-white"
                          >
                            <RotateCw className="w-3 h-3" />
                            <span>Re-run Search</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyState
                      title="No Search History"
                      description="Your regional market searches will be recorded here for instant replay."
                      actionLabel="Explore First Sector"
                      onAction={() => router.push('/gap-finder')}
                    />
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      {/* VALIDATION SCORECARD MODAL */}
      {selectedIdeaForValidation && (
        <ValidatorScorecard
          idea={selectedIdeaForValidation}
          onClose={() => setSelectedIdeaForValidation(null)}
        />
      )}

      {/* IDEA COMPARISON MODAL */}
      {comparisonModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-4xl w-full my-8">
            <ClayCard className="p-6 sm:p-8 bg-[#141414] border-white/20 shadow-2xl">
              {comparingLoading ? (
                <div className="py-16 text-center space-y-3 font-mono text-xs text-[#A3A3A3]">
                  <RotateCw className="w-6 h-6 animate-spin mx-auto text-white" />
                  <p>Comparing unit economics, competition densities, and capital requirements...</p>
                </div>
              ) : (
                <IdeaComparisonTable
                  comparison={comparisonData}
                  onClose={() => setComparisonModalOpen(false)}
                />
              )}
            </ClayCard>
          </div>
        </div>
      )}

      {/* REMOVAL CONFIRMATION MODAL */}
      {ideaToRemove && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <ClayCard className="max-w-md w-full p-6 space-y-4 border-white/20 bg-[#161616]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Remove Opportunity</h3>
                <p className="text-xs text-[#737373]">From your founder workspace</p>
              </div>
            </div>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              Are you sure you want to remove <strong className="text-white">"{ideaToRemove.name}"</strong>? You can always discover and save it again from the Gap Finder.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setIdeaToRemove(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleConfirmRemove} className="bg-red-600 hover:bg-red-500 text-white">
                Remove Idea
              </Button>
            </div>
          </ClayCard>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080808] flex items-center justify-center text-white font-mono text-sm">Loading Workspace...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
