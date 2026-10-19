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
    <div className="bg-[#181818] border-b border-white/15 px-4 py-2 text-center text-xs text-[#E5E5E5] flex items-center justify-center gap-2 z-50 sticky top-16">
      <WifiOff className="w-3.5 h-3.5 text-white animate-pulse" />
      <span>
        <strong>Offline Mode:</strong> Displaying cached market opportunities and saved startup roadmaps.
      </span>
    </div>
  );
}
