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
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#08152B]/95 border-t border-[#39BAFF]/25 px-2 py-2 backdrop-blur-2xl shadow-[0_-8px_32px_rgba(3,7,18,0.7)]">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-[#39BAFF] font-semibold bg-[#0866F5]/20 border border-[#39BAFF]/30 shadow-[0_0_12px_rgba(8,102,245,0.4)]'
                  : 'text-[#8EABCF] hover:text-[#F4F8FF]'
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
