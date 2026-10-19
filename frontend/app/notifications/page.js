'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import ClayCard from '@/components/ClayCard';
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
        return <Compass className="w-4 h-4 text-white" />;
      case 'funding':
        return <Landmark className="w-4 h-4 text-white" />;
      case 'community':
        return <MessageSquare className="w-4 h-4 text-white" />;
      case 'competitor':
        return <Radar className="w-4 h-4 text-white" />;
      default:
        return <Bell className="w-4 h-4 text-white" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080808] text-white selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#737373] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                  Inbox & Alerts
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
                <Bell className="w-6 h-6 text-white" />
                <span>Notifications</span>
              </h1>
              <p className="text-xs text-[#A3A3A3]">
                Sector demand shifts, new competitors detected, and community discussions.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/settings">
                <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
                  <Settings className="w-3.5 h-3.5" />
                  <span>Preferences</span>
                </Button>
              </Link>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleMarkAllRead}
                className="gap-1.5 text-xs"
              >
                <CheckCheck className="w-3.5 h-3.5" />
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
                <ClayCard
                  key={item.id}
                  className={`p-4 sm:p-5 flex items-start justify-between gap-4 transition-all ${
                    !item.read
                      ? 'bg-[#181818] border-white/20'
                      : 'bg-[#121212] border-white/5 opacity-80'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      {getIconForType(item.type)}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-white">
                          {item.title}
                        </h3>
                        {!item.read && (
                          <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-[#A3A3A3] leading-relaxed">
                        {item.message}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-[#737373] pt-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(item.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </div>

                  {item.link && (
                    <Link
                      href={item.link}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white shrink-0 inline-flex items-center gap-1 transition-colors"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </ClayCard>
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
    <Suspense fallback={<div className="min-h-screen bg-[#080808] flex items-center justify-center text-white font-mono text-sm">Loading Notifications...</div>}>
      <NotificationsContent />
    </Suspense>
  );
}
