'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/lib/toast-context';
import Button from '@/components/Button';
import GlassPanel from '@/components/GlassPanel';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }

    setLoading(true);

    try {
      await signIn(email.trim(), password);
      showToast('Welcome back to StartupRival!');
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] flex flex-col justify-center items-center px-4 py-12 relative selection:bg-white selection:text-black">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* Back to Home Link */}
      <div className="w-full max-w-md mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-[#888888] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to StartupRival</span>
        </Link>
      </div>

      {/* Monochrome Card */}
      <div className="w-full max-w-md bg-[#111111] border border-[#2A2A2A] rounded-xl p-8 sm:p-10 space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-8 h-8 rounded-sm bg-white text-black font-bold text-xs flex items-center justify-center mx-auto">
            SR
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Welcome back
          </h1>
          <p className="text-xs text-[#888888]">
            Access your saved market gaps and search history.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 rounded-lg bg-red-950/40 border border-red-900 text-xs text-red-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#888888] font-medium block" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] text-white border border-[#2A2A2A] hover:border-[#3A3A3A] focus:border-white focus:outline-none text-sm transition placeholder:text-[#555555]"
            />
          </div>

          {/* Password with Show/Hide Control */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-wider text-[#888888] font-medium block" htmlFor="password">
                Password
              </label>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 pr-10 rounded-lg bg-[#0A0A0A] text-white border border-[#2A2A2A] hover:border-[#3A3A3A] focus:border-white focus:outline-none text-sm transition placeholder:text-[#555555]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555555] hover:text-white p-1 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              className="w-full justify-center"
            >
              Sign In
            </Button>
          </div>
        </form>

        {/* Link to Signup */}
        <div className="pt-3 border-t border-[#1F1F1F] text-center text-xs text-[#888888]">
          Don't have an account yet?{' '}
          <Link href="/auth/signup" className="text-white hover:underline font-medium">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
