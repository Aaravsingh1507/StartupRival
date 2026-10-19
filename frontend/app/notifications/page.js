'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import EmptyState from '@/components/EmptyState';
import LoadingState from '@/components/LoadingState';
import { getNotifications, markNotificationsRead } from '@/lib/api';
import { useNotifications } from '@/lib/notification-context';
import { useToast } from '@/lib/toast-context';
import { 
  Bell, 
  CheckCheck, 
  ArrowRight, 
  Compass, 
  Landmark, 
  MessageSquare, 
  Radar, 
  Settings, 
  Clock 
} from 'lucide-react';

function NotificationsContent() {
  const { refreshCount } = useNotifications();
  const { showToast } = useToast();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotifs() {
      setLoading(true);
      try {
        const data = await getNotifications();
        setNotifications(data);
      } catch (err) {
        console.error('Failed to load notifications:', err);
      } finally {
        setLoading(false);
      }
    }
    loadNotifs();
  }, []);

  const handleMarkAllRead = async () => {
    await markNotificationsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    refreshCount();
    showToast('All notifications marked as read');
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'opportunity':
        return <Compass className="w-4 h-4 text-[#39BAFF]" />;
      case 'funding':
        return <Landmark className="w-4 h-4 text-[#39BAFF]" />;
      case 'community':
        return <MessageSquare className="w-4 h-4 text-[#39BAFF]" />;
      case 'competitor':
        return <Radar className="w-4 h-4 text-[#39BAFF]" />;
      default:
        return <Bell className="w-4 h-4 text-[#39BAFF]" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-[#F4F8FF] selection:bg-[#0866F5] selection:text-white relative overflow-hidden">
      {/* Background dotted pattern & ambient halos */}
      <div className="absolute inset-0 dotted-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-[#0866F5]/10 rounded-full blur-[140px] pointer-events-none" />

      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-6 py-8 relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#39BAFF]/15">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#39BAFF] px-2.5 py-0.5 rounded-full bg-[#0C1E3D] border border-[#39BAFF]/30">
                  Inbox & Alerts
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F8FF] flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0866F5]/20 border border-[#39BAFF]/30 flex items-center justify-center text-[#39BAFF] shadow-[0_0_15px_rgba(8,102,245,0.4)]">
                  <Bell className="w-5 h-5" />
                </div>
                <span>Notifications</span>
              </h1>
              <p className="text-sm text-[#8EABCF]">
                Sector demand shifts, new competitors detected, and community discussions.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/settings">
                <Button variant="secondary" className="gap-1.5 text-xs">
                  <Settings className="w-3.5 h-3.5 text-[#39BAFF]" />
                  <span>Preferences</span>
                </Button>
              </Link>
              <Button
                variant="secondary"
                onClick={handleMarkAllRead}
                className="gap-1.5 text-xs"
              >
                <CheckCheck className="w-3.5 h-3.5 text-[#39BAFF]" />
                <span>Mark All Read</span>
              </Button>
            </div>
          </div>

          {/* List of Notifications */}
          {loading ? (
            <LoadingState message="Loading your startup alerts..." />
          ) : notifications.length > 0 ? (
            <div className="space-y-3">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl border flex items-start justify-between gap-4 transition-all duration-200 backdrop-blur-md shadow-[0_8px_32px_rgba(3,7,18,0.45)] ${
                    !item.read
                      ? 'bg-[#08152B]/90 border-[#39BAFF]/35 shadow-[0_0_20px_rgba(8,102,245,0.15)]'
                      : 'bg-[#08152B]/50 border-[#39BAFF]/15 opacity-75'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0C1E3D] border border-[#39BAFF]/25 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_10px_rgba(8,102,245,0.2)]">
                      {getIconForType(item.type)}
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-[#F4F8FF]">
                          {item.title}
                        </h3>
                        {!item.read && (
                          <span className="w-2 h-2 rounded-full bg-[#39BAFF] shadow-[0_0_6px_rgba(57,186,255,0.8)] shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-[#8EABCF] leading-relaxed">
                        {item.message}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-[#4B6485] pt-1">
                        <Clock className="w-3 h-3 text-[#39BAFF]" />
                        <span>{new Date(item.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </div>

                  {item.link && (
                    <Link
                      href={item.link}
                      className="px-3.5 py-1.5 rounded-xl bg-[#0C1E3D]/80 border border-[#39BAFF]/25 hover:border-[#39BAFF]/50 hover:bg-[#0866F5]/25 text-xs text-[#F4F8FF] shrink-0 inline-flex items-center gap-1.5 transition font-medium"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3 text-[#39BAFF]" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Notifications Yet"
              description="You will receive alerts when new market voids or competitor movements are detected in your saved sectors."
              actionLabel="Explore Market Gaps"
              onAction={() => window.location.href = '/gap-finder'}
            />
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function NotificationsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#030712] flex items-center justify-center text-[#F4F8FF] font-mono text-sm">Loading Notifications...</div>}>
      <NotificationsContent />
    </Suspense>
  );
}
