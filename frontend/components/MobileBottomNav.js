'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, LayoutDashboard, Users, Landmark } from 'lucide-react';

export default function MobileBottomNav() {
  const [currentPath, setCurrentPath] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      setCurrentPath(pathname);
    }
  }, [pathname]);

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Find Gap', href: '/gap-finder', icon: Compass },
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Funding', href: '/funding', icon: Landmark },
    { label: 'Community', href: '/community', icon: Users }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0A0A0A]/95 border-t border-[#1F1F1F] px-2 py-1.5 backdrop-blur-xl">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-all ${
                isActive
                  ? 'text-white font-medium bg-[#1A1A1A]'
                  : 'text-[#888888] hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
