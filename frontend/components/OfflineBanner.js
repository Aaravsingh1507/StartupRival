'use client';

import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    function handleOnline() {
      setIsOffline(false);
    }
    function handleOffline() {
      setIsOffline(true);
    }

    if (typeof window !== 'undefined') {
      setIsOffline(!navigator.onLine);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="bg-[#08152B]/95 border-b border-[#39BAFF]/30 px-4 py-2.5 text-center text-xs text-[#F4F8FF] flex items-center justify-center gap-2 z-50 sticky top-16 backdrop-blur-xl shadow-[0_4px_20px_rgba(3,7,18,0.7)]">
      <WifiOff className="w-3.5 h-3.5 text-[#39BAFF] animate-pulse" />
      <span>
        <strong className="text-[#39BAFF]">Offline Mode:</strong> Displaying cached market opportunities and saved startup roadmaps.
      </span>
    </div>
  );
}
