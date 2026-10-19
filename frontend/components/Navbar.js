'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Button from './Button';
import NotificationBell from './NotificationBell';
import { Menu, X, LogOut, LayoutDashboard, Settings } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Gap Finder', href: '/gap-finder' },
    { label: 'Funding', href: '/funding' },
    { label: 'Community', href: '/community' },
    { label: 'How It Works', href: '/#how-it-works' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#030712]/85 backdrop-blur-xl border-b border-[#39BAFF]/15 shadow-[0_4px_30px_rgba(3,7,18,0.8)] transition-all">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* StartupRival Wordmark with Cinematic Blue Glow */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-6 h-6 rounded bg-[#0866F5] text-white text-xs font-bold flex items-center justify-center shadow-[0_0_15px_rgba(8,102,245,0.7)] group-hover:shadow-[0_0_22px_rgba(57,186,255,0.9)] transition-all">
            SR
          </div>
          <span className="font-semibold text-[#F4F8FF] text-sm tracking-tight group-hover:text-white transition-colors">
            StartupRival
          </span>
          <span className="bg-[#08152B] border border-[#39BAFF]/30 text-[#39BAFF] text-[10px] font-mono px-1.5 py-0.5 rounded shadow-[0_0_8px_rgba(57,186,255,0.2)]">
            IND
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm transition-all duration-200 ${
                  isActive
                    ? 'text-[#39BAFF] font-medium drop-shadow-[0_0_10px_rgba(57,186,255,0.5)]'
                    : 'text-[#8EABCF] hover:text-[#F4F8FF]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Notification Bell */}
          <NotificationBell />

          {user ? (
            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <Button
                  variant="secondary"
                  size="sm"
                  className="gap-1.5"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-[#39BAFF]" />
                  <span>Dashboard</span>
                </Button>
              </Link>
              <Link href="/settings" title="Settings">
                <button
                  className="p-2 rounded-lg hover:bg-[#0866F5]/15 text-[#8EABCF] hover:text-[#F4F8FF] hover:border hover:border-[#39BAFF]/30 transition cursor-pointer"
                  aria-label="Settings"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </Link>
              <button
                onClick={signOut}
                title="Sign Out"
                className="p-2 rounded-lg hover:bg-red-950/30 text-[#8EABCF] hover:text-red-300 transition cursor-pointer"
                aria-label="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/login">
                <Button variant="secondary" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <NotificationBell />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#8EABCF] hover:text-white hover:bg-[#0866F5]/15 border border-transparent hover:border-[#39BAFF]/30 transition"
            aria-label="Toggle mobile navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#08152B]/95 border-b border-[#39BAFF]/20 px-6 py-4 space-y-3 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 text-sm transition ${
                  pathname === link.href ? 'text-[#39BAFF] font-medium' : 'text-[#8EABCF] hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-[#39BAFF]/15 flex flex-col gap-2">
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" size="sm" className="w-full justify-center gap-2">
                    <LayoutDashboard className="w-4 h-4 text-[#39BAFF]" />
                    <span>Dashboard</span>
                  </Button>
                </Link>
                <div className="flex items-center justify-between pt-1">
                  <Link href="/settings" onClick={() => setMobileMenuOpen(false)} className="text-xs text-[#8EABCF] hover:text-white">
                    Settings & Account
                  </Link>
                  <button onClick={signOut} className="text-xs text-red-400 hover:text-red-300">
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" size="sm" className="w-full justify-center">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="sm" className="w-full justify-center">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
