'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Bell, CheckCheck } from 'lucide-react';
import { useNotifications } from '@/lib/notification-context';

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative p-2.5 rounded-xl text-[#8EABCF] hover:text-[#39BAFF] hover:bg-[#0C1E3D] border border-transparent hover:border-[#39BAFF]/30 transition cursor-pointer"
        aria-label="View notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#39BAFF] shadow-[0_0_8px_rgba(57,186,255,0.9)] animate-pulse" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#08152B]/95 border border-[#39BAFF]/30 p-5 space-y-3 z-50 backdrop-blur-2xl shadow-[0_20px_60px_rgba(3,7,18,0.9)] animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-[#39BAFF]/15">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#F4F8FF]">Notifications</span>
              {unreadCount > 0 && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#0866F5] text-white font-bold shadow-[0_0_8px_rgba(8,102,245,0.7)]">
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-xs text-[#39BAFF] hover:underline flex items-center gap-1 transition cursor-pointer font-medium"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto">
            {notifications.slice(0, 5).map((n) => (
              <Link
                key={n.id}
                href={n.link || '/notifications'}
                onClick={() => setOpen(false)}
                className={`block p-3.5 rounded-xl transition-all border ${
                  n.read
                    ? 'bg-[#030712]/50 border-[#39BAFF]/10 opacity-70 hover:opacity-100 hover:border-[#39BAFF]/30'
                    : 'bg-[#0C1E3D]/80 border-[#39BAFF]/30 hover:border-[#39BAFF]/60 shadow-[0_0_15px_rgba(8,102,245,0.15)]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-bold text-[#F4F8FF] tracking-tight">{n.title}</h4>
                  <span className="text-[10px] text-[#4B6485] shrink-0 font-mono">
                    {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-xs text-[#8EABCF] mt-1 line-clamp-2 leading-relaxed">
                  {n.message}
                </p>
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-[#39BAFF]/15 text-center">
            <Link
              href="/notifications"
              onClick={() => setOpen(false)}
              className="text-xs text-[#39BAFF] hover:underline font-semibold transition"
            >
              View all notifications →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
