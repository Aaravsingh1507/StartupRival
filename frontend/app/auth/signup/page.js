'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/lib/toast-context';
import Button from '@/components/Button';
import GlassPanel from '@/components/GlassPanel';
import { Eye, EyeOff, ArrowLeft, Shield } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await signUp(fullName.trim(), email.trim(), password);
      showToast('Account created successfully! Welcome to StartupRival.');
      router.push('/gap-finder');
    } catch (err) {
      setError(err.message || 'Failed to create account. Please check your credentials.');
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
            Create your account
          </h1>
          <p className="text-xs text-[#888888]">
            Start finding real Indian market gaps in minutes.
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
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#888888] font-medium block" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              required
              placeholder="e.g. Aarav Sharma"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] text-white border border-[#2A2A2A] hover:border-[#3A3A3A] focus:border-white focus:outline-none text-sm transition placeholder:text-[#555555]"
            />
          </div>

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
            <label className="text-xs uppercase tracking-wider text-[#888888] font-medium block" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                placeholder="At least 6 characters"
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
              Create Account
            </Button>
          </div>
        </form>

        {/* Link to Login */}
        <div className="pt-3 border-t border-[#1F1F1F] text-center text-xs text-[#888888]">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-white hover:underline font-medium">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
