'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Button from './Button';
import NotificationBell from './NotificationBell';
import { Menu, X, ArrowUpRight, LogOut, Compass, LayoutDashboard, Landmark, Users, Settings } from 'lucide-react';

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
    <header className="fixed top-0 left-0 right-0 z-40 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* StartupRival Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black font-black text-sm tracking-tighter shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
            SR
          </div>
          <span className="font-semibold text-lg tracking-tight text-white group-hover:text-neutral-200 transition-colors">
            Startup<span className="text-neutral-400 font-normal">Rival</span>
          </span>
          <span className="text-[10px] tracking-wider uppercase px-1.5 py-0.5 rounded bg-white/10 text-neutral-300 font-mono ml-1">
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
                className={`text-sm tracking-wide transition-colors duration-150 ${
                  isActive
                    ? 'text-white font-medium'
                    : 'text-[#A3A3A3] hover:text-white'
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
            <div className="flex items-center gap-2.5">
              <Link href="/dashboard">
                <Button
                  variant={pathname === '/dashboard' ? 'primary' : 'secondary'}
                  size="sm"
                  className="gap-1.5"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/settings" title="Settings">
                <button className="p-2 rounded-xl text-[#A3A3A3] hover:text-white hover:bg-white/5 transition-colors cursor-pointer" aria-label="Settings">
                  <Settings className="w-4 h-4" />
                </button>
              </Link>
              <button
                onClick={signOut}
                title="Sign Out"
                className="p-2 rounded-xl text-[#A3A3A3] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
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
        <div className="flex md:hidden items-center gap-1.5">
          <NotificationBell />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#A3A3A3] hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-modal border-t border-white/10 px-5 pt-3 pb-6 flex flex-col gap-4">
          <nav className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm py-2 text-[#A3A3A3] hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm py-2 text-white font-medium flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              Founder Dashboard
            </Link>
            <Link
              href="/settings"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm py-2 text-[#A3A3A3] hover:text-white flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Account Settings
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm py-2 text-[#737373] hover:text-white"
            >
              Admin Analytics
            </Link>
          </nav>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            {user ? (
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-center"
              >
                Sign Out ({user.email})
              </Button>
            ) : (
              <>
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" size="md" className="w-full justify-center">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full justify-center">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
