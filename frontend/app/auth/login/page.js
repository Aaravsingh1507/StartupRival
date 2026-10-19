'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/lib/toast-context';
import Button from '@/components/Button';
import { Eye, EyeOff, ArrowLeft, Shield } from 'lucide-react';

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
    <div className="min-h-screen bg-[#030712] text-[#F4F8FF] flex flex-col justify-center items-center px-4 py-12 relative selection:bg-[#0866F5] selection:text-white overflow-hidden">
      {/* Background dotted pattern & ambient blue halos */}
      <div className="absolute inset-0 dotted-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#0866F5]/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-[350px] h-[350px] bg-[#39BAFF]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Back to Home Link */}
      <div className="w-full max-w-md mb-6 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-[#8EABCF] hover:text-[#39BAFF] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to StartupRival</span>
        </Link>
      </div>

      {/* Translucent Navy Glass Card */}
      <div className="w-full max-w-md bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/25 rounded-2xl p-8 sm:p-10 space-y-6 shadow-[0_12px_45px_rgba(3,7,18,0.7)] relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0866F5] to-[#39BAFF] text-white font-bold text-xs flex items-center justify-center shadow-[0_0_20px_rgba(8,102,245,0.7)] mx-auto">
            SR
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#F4F8FF]">
            Welcome back
          </h1>
          <p className="text-xs text-[#8EABCF]">
            Access your saved market gaps and founder intelligence.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#8EABCF] font-medium block" htmlFor="email">
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
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712]/80 text-[#F4F8FF] border border-[#39BAFF]/25 hover:border-[#39BAFF]/50 focus:border-[#39BAFF] focus:ring-1 focus:ring-[#39BAFF]/50 focus:outline-none text-sm transition placeholder:text-[#4B6485]"
            />
          </div>

          {/* Password with Show/Hide Control */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-wider text-[#8EABCF] font-medium block" htmlFor="password">
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
                className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-[#030712]/80 text-[#F4F8FF] border border-[#39BAFF]/25 hover:border-[#39BAFF]/50 focus:border-[#39BAFF] focus:ring-1 focus:ring-[#39BAFF]/50 focus:outline-none text-sm transition placeholder:text-[#4B6485]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8EABCF] hover:text-[#39BAFF] p-1 transition-colors"
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
        <div className="pt-3 border-t border-[#39BAFF]/15 text-center text-xs text-[#8EABCF]">
          Don't have an account yet?{' '}
          <Link href="/auth/signup" className="text-[#39BAFF] hover:underline font-semibold ml-1">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
