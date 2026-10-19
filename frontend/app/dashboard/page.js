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
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#F5F5F5] selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* COMPACT SIDEBAR */}
            <aside className="lg:col-span-3 space-y-4">
              <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 space-y-5">
                {/* User Info */}
                <div className="flex items-center gap-3 pb-4 border-b border-[#1F1F1F]">
                  <div className="w-8 h-8 rounded-sm bg-white text-black font-bold flex items-center justify-center text-xs">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="text-sm font-semibold text-white truncate">{userName}</h3>
                    <p className="text-xs text-[#555] truncate">{user?.email || 'Guest Explorer'}</p>
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
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition cursor-pointer ${
                          isActive
                            ? 'bg-[#1A1A1A] text-white font-medium'
                            : 'text-[#888] hover:text-white hover:bg-[#111]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        {item.count !== undefined && (
                          <span className={`font-mono text-xs px-1.5 py-0.2 rounded ${isActive ? 'bg-[#2A2A2A] text-white' : 'text-[#555]'}`}>
                            {item.count}
                          </span>
                        )}
                      </button>
                    );
                  })}

                  <Link
                    href="/settings"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#888] hover:text-white hover:bg-[#111] transition"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                </nav>

                {/* Quick stats box without engine label */}
                <div className="p-3 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] space-y-2.5">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase tracking-wider text-[#555] font-medium block">Current Stage</span>
                    <span className="text-sm text-white font-medium block">Gap Found</span>
                  </div>
                  <div className="space-y-0.5 border-t border-[#1F1F1F] pt-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#555] font-medium block">Active Roadmaps</span>
                    <span className="text-sm text-white font-medium block">{totalKits}</span>
                  </div>
                </div>

                {user && (
                  <button
                    onClick={signOut}
                    className="w-full text-xs text-[#555] hover:text-white py-2 text-center transition cursor-pointer"
                  >
                    Sign Out
                  </button>
                )}
              </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* Welcome Message Card & Quick Actions */}
              <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-label">Founder Workspace</span>
                  <h1 className="text-h2 text-white">
                    Welcome back, {userName}
                  </h1>
                  <p className="text-body text-[#888]">
                    Convert validated market gaps into launch roadmaps and compare regional startup ideas side-by-side.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
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
                      <Scale className="w-4 h-4" />
                      <span>Compare Ideas</span>
                    </Button>
                  )}
                </div>
              </div>

              {/* SECTION A: STATS ROW (4 EQUAL HEIGHT CARDS) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-stretch">
                {/* Stat 1 */}
                <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 flex flex-col justify-between space-y-1">
                  <span className="text-xs uppercase tracking-wider text-[#888] mb-2 block">Ideas Explored</span>
                  <div>
                    <div className="text-3xl font-bold text-white">{totalExplored}</div>
                    <span className="text-xs text-[#555]">Regional queries run</span>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 flex flex-col justify-between space-y-1">
                  <span className="text-xs uppercase tracking-wider text-[#888] mb-2 block">Gaps Saved</span>
                  <div>
                    <div className="text-3xl font-bold text-white">{totalSaved}</div>
                    <span className="text-xs text-[#555]">High demand conviction</span>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 flex flex-col justify-between space-y-1">
                  <span className="text-xs uppercase tracking-wider text-[#888] mb-2 block">Kits Generated</span>
                  <div>
                    <div className="text-3xl font-bold text-white">{totalKits}</div>
                    <span className="text-xs text-[#555]">Licenses & schemes</span>
                  </div>
                </div>

                {/* Stat 4 - Updated Startup Stage */}
                <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 flex flex-col justify-between space-y-1">
                  <span className="text-xs uppercase tracking-wider text-[#888] mb-2 block">Startup Stage</span>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-white">Gap Found</div>
                    <span className="text-xs text-[#555] block">Step 1 of 4 complete</span>
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2A2A2A]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2A2A2A]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2A2A2A]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION B: STARTUP PROGRESSION PIPELINE */}
              <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-label">STARTUP PROGRESSION PIPELINE</span>
                  <span className="text-caption">Your Primary Opportunity</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-white text-black rounded-lg py-2.5 text-sm font-medium flex-1 text-center">
                    1. Gap Found
                  </div>
                  <span className="text-[#2A2A2A] font-bold">→</span>
                  <div className="text-[#555] border border-[#2A2A2A] rounded-lg py-2.5 text-sm flex-1 text-center">
                    2. Validated
                  </div>
                  <span className="text-[#2A2A2A] font-bold">→</span>
                  <div className="text-[#555] border border-[#2A2A2A] rounded-lg py-2.5 text-sm flex-1 text-center">
                    3. Kit Generated
                  </div>
                  <span className="text-[#2A2A2A] font-bold">→</span>
                  <div className="text-[#555] border border-[#2A2A2A] rounded-lg py-2.5 text-sm flex-1 text-center">
                    4. Ready to Start
                  </div>
                </div>
              </div>

              {/* OVERVIEW / SAVED IDEAS SECTION */}
              {(activeTab === 'overview' || activeTab === 'saved') && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#1F1F1F]">
                    <h2 className="text-base font-semibold text-white flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-[#888]" />
                      <span>Saved Market Opportunities ({savedIdeas.length})</span>
                    </h2>
                    {savedIdeas.length >= 2 && (
                      <span className="text-xs text-[#888]">
                        Select checkboxes to compare 2 ideas
                      </span>
                    )}
                  </div>

                  {savedIdeas.length > 0 ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                        {paginatedIdeas.map((idea) => {
                          const score = idea.demandScore ?? idea.demand_score ?? 84;
                          const id = idea.id || idea.name;
                          const isSelectedForCompare = selectedForCompare.includes(id);

                          return (
                            <div
                              key={id}
                              className={`bg-[#111111] border rounded-xl p-5 flex flex-col justify-between space-y-4 transition ${
                                isSelectedForCompare ? 'border-white bg-[#1A1A1A]' : 'border-[#2A2A2A] hover:border-[#3A3A3A]'
                              }`}
                            >
                              <div className="space-y-2.5">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      checked={isSelectedForCompare}
                                      onChange={() => handleToggleSelectForCompare(idea)}
                                      className="rounded bg-[#0A0A0A] border-[#2A2A2A] text-white focus:ring-0 cursor-pointer"
                                      title="Select to compare"
                                    />
                                    <span className="text-[10px] font-mono text-white px-1.5 py-0.5 rounded bg-[#1A1A1A] border border-[#2A2A2A]">
                                      {idea.sector || 'Sector'}
                                    </span>
                                    <span className="text-[10px] font-mono text-[#555]">
                                      {idea.region || 'India'}
                                    </span>
                                  </div>

                                  <div className="text-right shrink-0">
                                    <span className="text-xs font-mono font-bold text-[#E8FF47] px-2 py-0.5 rounded bg-[#1A1A1A] border border-[#2A2A2A]">
                                      {score}/100
                                    </span>
                                  </div>
                                </div>

                                <h3 className="text-base font-semibold text-white tracking-tight leading-snug">
                                  {idea.name}
                                </h3>

                                <p className="text-xs text-[#888] line-clamp-2 leading-relaxed">
                                  {idea.summary}
                                </p>
                              </div>

                              <div className="pt-3 border-t border-[#1F1F1F] space-y-2">
                                <div className="grid grid-cols-3 gap-1.5 text-center">
                                  <Link
                                    href={`/kickstart-kit/${encodeURIComponent(id)}?sector=${encodeURIComponent(idea.sector || 'Agriculture')}&region=${encodeURIComponent(idea.region || 'Maharashtra')}&name=${encodeURIComponent(idea.name)}`}
                                    className="px-2 py-1.5 rounded-lg bg-transparent border border-[#2A2A2A] hover:bg-[#1A1A1A] text-xs text-white transition font-medium"
                                  >
                                    Startup Kit
                                  </Link>
                                  <Link
                                    href={`/competitor-radar/${encodeURIComponent(id)}?sector=${encodeURIComponent(idea.sector || 'Agriculture')}&region=${encodeURIComponent(idea.region || 'Maharashtra')}&name=${encodeURIComponent(idea.name)}`}
                                    className="px-2 py-1.5 rounded-lg bg-transparent border border-[#2A2A2A] hover:bg-[#1A1A1A] text-xs text-white transition font-medium"
                                  >
                                    Radar
                                  </Link>
                                  <Link
                                    href={`/gtm-guide/${encodeURIComponent(id)}?sector=${encodeURIComponent(idea.sector || 'Agriculture')}&region=${encodeURIComponent(idea.region || 'Maharashtra')}&name=${encodeURIComponent(idea.name)}`}
                                    className="px-2 py-1.5 rounded-lg bg-transparent border border-[#2A2A2A] hover:bg-[#1A1A1A] text-xs text-white transition font-medium"
                                  >
                                    GTM
                                  </Link>
                                </div>

                                <div className="flex items-center justify-between pt-1">
                                  <button
                                    onClick={() => setSelectedIdeaForValidation(idea)}
                                    className="text-xs text-[#888] hover:text-white transition cursor-pointer"
                                  >
                                    Validation Scorecard →
                                  </button>

                                  <button
                                    onClick={() => setIdeaToRemove(idea)}
                                    className="p-1 text-[#555] hover:text-red-400 rounded transition cursor-pointer"
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
                        <div className="flex items-center justify-between text-xs text-[#888] pt-2">
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
                    <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-8 text-center space-y-4">
                      <div className="space-y-1">
                        <h3 className="text-base font-semibold text-white">No Saved Opportunities Yet</h3>
                        <p className="text-sm text-[#888] max-w-sm mx-auto">
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
                  <div className="flex items-center justify-between pb-2 border-b border-[#1F1F1F]">
                    <h2 className="text-base font-semibold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#888]" />
                      <span>Generated Startup Kits ({totalKits})</span>
                    </h2>
                  </div>

                  {savedIdeas.length > 0 ? (
                    <div className="space-y-3">
                      {savedIdeas.slice(0, 3).map((idea) => (
                        <div key={idea.id || idea.name} className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 flex items-center justify-between gap-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-[#555] uppercase block">{idea.sector} • {idea.region}</span>
                            <h3 className="text-sm font-semibold text-white">{idea.name}</h3>
                            <p className="text-xs text-[#888]">FSSAI / Udyam Licenses • AIF & PM FME Subsidies • 90-day checklist</p>
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
                    <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-8 text-center space-y-4">
                      <div className="space-y-1">
                        <h3 className="text-base font-semibold text-white">No Startup Kits Generated</h3>
                        <p className="text-sm text-[#888] max-w-sm mx-auto">
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
                  <div className="flex items-center justify-between pb-2 border-b border-[#1F1F1F]">
                    <h2 className="text-base font-semibold text-white flex items-center gap-2">
                      <Radar className="w-4 h-4 text-[#888]" />
                      <span>Competitor Radar: Gap City Infiltration</span>
                    </h2>
                  </div>

                  {savedIdeas.length > 0 ? (
                    <div className="space-y-3">
                      {savedIdeas.slice(0, 3).map((idea) => (
                        <div key={idea.id || idea.name} className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 flex items-center justify-between gap-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-[#555] uppercase block">Radar Scan: {idea.sector}</span>
                            <h3 className="text-sm font-semibold text-white">{idea.name}</h3>
                            <p className="text-xs text-[#888]">Identified Tier-2 gap cities with zero venture-backed incumbents</p>
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
                    <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-8 text-center space-y-4">
                      <div className="space-y-1">
                        <h3 className="text-base font-semibold text-white">No Radar Scans Run</h3>
                        <p className="text-sm text-[#888] max-w-sm mx-auto">
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
                  <div className="flex items-center justify-between pb-2 border-b border-[#1F1F1F]">
                    <h2 className="text-base font-semibold text-white flex items-center gap-2">
                      <History className="w-4 h-4 text-[#888]" />
                      <span>Search History Timeline ({recentSearches.length})</span>
                    </h2>
                  </div>

                  {recentSearches.length > 0 ? (
                    <div className="divide-y divide-[#1F1F1F] rounded-xl border border-[#2A2A2A] bg-[#111111] overflow-hidden">
                      {recentSearches.map((item, idx) => (
                        <div key={idx} className="p-4 flex items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-white">{item.sector}</span>
                              <span className="text-[10px] text-[#555]">•</span>
                              <span className="text-xs text-[#888]">{item.region}</span>
                            </div>
                            <span className="text-[10px] text-[#555] font-mono block">
                              {new Date(item.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleRerunSearch(item.sector, item.region)}
                            className="gap-1.5 text-xs"
                          >
                            <RotateCw className="w-3 h-3" />
                            <span>Re-run</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-8 text-center space-y-4">
                      <div className="space-y-1">
                        <h3 className="text-base font-semibold text-white">No Search History</h3>
                        <p className="text-sm text-[#888] max-w-sm mx-auto">
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
        <ValidatorScorecard
          idea={selectedIdeaForValidation}
          onClose={() => setSelectedIdeaForValidation(null)}
        />
      )}

      {/* IDEA COMPARISON MODAL */}
      {comparisonModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-4xl w-full my-8">
            <div className="p-6 bg-[#111111] border border-[#2A2A2A] rounded-xl">
              {comparingLoading ? (
                <div className="py-16 text-center space-y-3 font-mono text-xs text-[#888]">
                  <RotateCw className="w-6 h-6 animate-spin mx-auto text-white" />
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full p-5 space-y-4 border border-[#2A2A2A] bg-[#111111] rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-950 border border-red-900 text-red-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Remove Opportunity</h3>
                <p className="text-xs text-[#555]">From your founder workspace</p>
              </div>
            </div>
            <p className="text-xs text-[#888] leading-relaxed">
              Are you sure you want to remove <strong className="text-white">"{ideaToRemove.name}"</strong>?
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
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
      <DashboardContent />
    </Suspense>
  );
}
