'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import ClayCard from '@/components/ClayCard';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/lib/toast-context';
import { 
  Settings, 
  User, 
  Key, 
  Bell, 
  Trash2, 
  Check, 
  AlertTriangle,
  ArrowLeft 
} from 'lucide-react';

function SettingsContent() {
  const { user, signOut } = useAuth();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || 'Founder');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Notification Preferences
  const [prefs, setPrefs] = useState({
    sectorGaps: true,
    competitorAlerts: true,
    communityReplies: true,
    fundingSchemes: true,
    emailDigest: false
  });

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    showToast('Profile information updated successfully');
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      showToast('New password must be at least 6 characters');
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    showToast('Password updated securely');
  };

  const togglePref = (key) => {
    setPrefs((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      showToast('Notification preference saved');
      return updated;
    });
  };

  const handleDeleteAccount = () => {
    setDeleteModalOpen(false);
    showToast('Account scheduled for deactivation');
    signOut();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080808] text-white selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="space-y-1 pb-4 border-b border-white/10">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] hover:text-white transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <Settings className="w-6 h-6 text-white" />
              <span>Account & Settings</span>
            </h1>
            <p className="text-xs text-[#A3A3A3]">
              Manage your personal credentials, workspace profile, and notification triggers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Profile Information */}
            <ClayCard className="p-6 space-y-4 border-white/10 bg-[#141414]">
              <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
                <User className="w-4 h-4 text-white" />
                <h2 className="text-sm font-semibold text-white">Profile Details</h2>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-[#A3A3A3] font-medium block">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1A1A] border border-white/10 text-white placeholder-[#737373] focus:outline-none focus:border-white/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#A3A3A3] font-medium block">Registered Email</label>
                  <input
                    type="email"
                    disabled
                    value={user?.email || 'founder@startuprival.in'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/5 text-[#737373] cursor-not-allowed"
                  />
                </div>

                <Button type="submit" variant="primary" size="sm" className="w-full justify-center">
                  Save Profile Changes
                </Button>
              </form>
            </ClayCard>

            {/* Change Password */}
            <ClayCard className="p-6 space-y-4 border-white/10 bg-[#141414]">
              <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
                <Key className="w-4 h-4 text-white" />
                <h2 className="text-sm font-semibold text-white">Security & Password</h2>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-[#A3A3A3] font-medium block">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1A1A] border border-white/10 text-white placeholder-[#737373] focus:outline-none focus:border-white/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#A3A3A3] font-medium block">New Password</label>
                  <input
                    type="password"
                    placeholder="Min. 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1A1A] border border-white/10 text-white placeholder-[#737373] focus:outline-none focus:border-white/30"
                  />
                </div>

                <Button type="submit" variant="secondary" size="sm" className="w-full justify-center">
                  Update Password
                </Button>
              </form>
            </ClayCard>

          </div>

          {/* Notification Preferences */}
          <ClayCard className="p-6 sm:p-8 space-y-5 border-white/10 bg-[#141414]">
            <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
              <Bell className="w-4 h-4 text-white" />
              <div>
                <h2 className="text-sm font-semibold text-white">Notification Triggers</h2>
                <p className="text-xs text-[#737373]">Control which real-time signals push to your bell inbox.</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs">
              {[
                { key: 'sectorGaps', label: 'New High-Demand Market Gaps', desc: 'Alert when customer search velocity spikes in your saved sectors' },
                { key: 'competitorAlerts', label: 'Competitor Footprint Radar', desc: 'Alert when a competitor opens operations in your target gap city' },
                { key: 'communityReplies', label: 'Community Thread Replies', desc: 'Notify when another founder responds to your questions or posts' },
                { key: 'fundingSchemes', label: 'New Government Schemes & Grants', desc: 'Notify when Central or State portals open application windows' },
                { key: 'emailDigest', label: 'Weekly Sunday Digest (Resend API)', desc: 'Top 3 validated regional gaps sent cleanly to your email' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="space-y-0.5 max-w-lg">
                    <span className="text-white font-medium block">{item.label}</span>
                    <span className="text-[#737373] text-[11px] block">{item.desc}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => togglePref(item.key)}
                    className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer relative shrink-0 ${
                      prefs[item.key] ? 'bg-white' : 'bg-neutral-800'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full transition-transform ${
                        prefs[item.key] ? 'translate-x-5 bg-black' : 'translate-x-0 bg-neutral-400'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </ClayCard>

          {/* Danger Zone: Account Deletion */}
          <div className="p-6 rounded-2xl border border-red-500/20 bg-red-950/10 space-y-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white">Danger Zone: Delete Account</h3>
                <p className="text-xs text-[#A3A3A3]">
                  Permanently erase your saved market opportunities, generated startup kits, and research history. This action cannot be reversed.
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDeleteModalOpen(true)}
              className="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/30 gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete My Founder Account</span>
            </Button>
          </div>

        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <ClayCard className="max-w-md w-full p-6 space-y-4 border-red-500/30 bg-[#161616]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Confirm Account Deletion</h3>
                <p className="text-xs text-[#737373]">Are you absolutely sure?</p>
              </div>
            </div>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              All saved market gap records, customized startup roadmaps, and community contributions will be permanently removed.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleDeleteAccount}
                className="bg-red-600 hover:bg-red-500 text-white"
              >
                Yes, Delete My Account
              </Button>
            </div>
          </ClayCard>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080808] flex items-center justify-center text-white font-mono text-sm">Loading Settings...</div>}>
      <SettingsContent />
    </Suspense>
  );
}
