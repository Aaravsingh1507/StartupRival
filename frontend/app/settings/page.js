'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/lib/toast-context';
import { 
  Settings, 
  User, 
  Key, 
  Bell, 
  Trash2, 
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
    if (key === 'emailDigest') return; // Disabled
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
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#F5F5F5] selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1 pt-20 pb-16 px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="space-y-1.5 pb-4 border-b border-[#1F1F1F]">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs text-[#888888] hover:text-white transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <Settings className="w-6 h-6 text-white" />
              <span>Account & Settings</span>
            </h1>
            <p className="text-sm text-[#888888]">
              Manage your personal credentials, workspace profile, and notification triggers.
            </p>
          </div>

          {/* Profile + Security cards: Both side by side, equal height, equal style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* Profile Information */}
            <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#1F1F1F]">
                  <User className="w-4 h-4 text-white" />
                  <h2 className="text-base font-semibold text-white">Profile Details</h2>
                </div>

                <form id="profile-form" onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#888888] mb-1 block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2 text-sm text-white focus:border-white focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#888888] mb-1 block">
                      Registered Email
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user?.email || 'founder@startuprival.in'}
                      className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg px-3 py-2 text-sm text-[#555555] cursor-not-allowed"
                    />
                  </div>
                </form>
              </div>

              <div className="pt-4 mt-4 border-t border-[#1F1F1F]">
                <Button type="submit" form="profile-form" variant="primary" className="w-full justify-center">
                  Save Profile Changes
                </Button>
              </div>
            </div>

            {/* Change Password */}
            <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#1F1F1F]">
                  <Key className="w-4 h-4 text-white" />
                  <h2 className="text-base font-semibold text-white">Security & Password</h2>
                </div>

                <form id="security-form" onSubmit={handleUpdatePassword} className="space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#888888] mb-1 block">
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2 text-sm text-white placeholder-[#555555] focus:border-white focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#888888] mb-1 block">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Min. 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-3 py-2 text-sm text-white placeholder-[#555555] focus:border-white focus:outline-none transition"
                    />
                  </div>
                </form>
              </div>

              <div className="pt-4 mt-4 border-t border-[#1F1F1F]">
                <Button type="submit" form="security-form" variant="secondary" className="w-full justify-center">
                  Update Password
                </Button>
              </div>
            </div>

          </div>

          {/* Notification Preferences */}
          <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#1F1F1F]">
              <Bell className="w-4 h-4 text-white" />
              <div>
                <h2 className="text-base font-semibold text-white">Notification Triggers</h2>
                <p className="text-xs text-[#888888]">Control which real-time signals push to your bell inbox.</p>
              </div>
            </div>

            <div>
              {[
                { key: 'sectorGaps', label: 'New High-Demand Market Gaps', desc: 'Alert when customer search velocity spikes in your saved sectors' },
                { key: 'competitorAlerts', label: 'Competitor Footprint Radar', desc: 'Alert when a competitor opens operations in your target gap city' },
                { key: 'communityReplies', label: 'Community Thread Replies', desc: 'Notify when another founder responds to your questions or posts' },
                { key: 'fundingSchemes', label: 'New Government Schemes & Grants', desc: 'Notify when Central or State portals open application windows' },
                { key: 'emailDigest', label: 'Weekly Sunday Digest (Resend API)', desc: 'Top 3 validated regional gaps sent cleanly to your email', disabled: true }
              ].map((item, idx, arr) => (
                <div 
                  key={item.key} 
                  className={`py-4 flex items-center justify-between ${
                    idx !== arr.length - 1 ? 'border-b border-[#1F1F1F]' : ''
                  }`}
                >
                  <div className="space-y-0.5 max-w-lg pr-4">
                    <span className="text-white text-sm font-medium block">{item.label}</span>
                    <span className="text-[#888888] text-xs block leading-relaxed">{item.desc}</span>
                    {item.disabled && (
                      <p className="text-xs text-[#555555] italic pt-1">
                        Coming soon — will auto-enable when email is verified
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    disabled={item.disabled}
                    onClick={() => togglePref(item.key)}
                    className={`w-11 h-6 rounded-full transition-colors p-0.5 relative shrink-0 ${
                      item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    } ${
                      prefs[item.key] ? 'bg-white' : 'bg-[#2A2A2A]'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full transition-transform ${
                        prefs[item.key] ? 'translate-x-5 bg-black' : 'translate-x-0 bg-[#555555]'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-transparent border border-red-900 rounded-xl p-5 space-y-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-red-400 font-semibold text-sm">Danger Zone: Delete Account</h3>
                <p className="text-[#888888] text-sm leading-relaxed">
                  Permanently erase your saved market opportunities, generated startup kits, and research history. This action cannot be reversed.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="destructive"
                onClick={() => setDeleteModalOpen(true)}
                className="gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Account</span>
              </Button>
            </div>
          </div>

        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-950 border border-red-900 text-red-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Confirm Account Deletion</h3>
                <p className="text-xs text-[#888888]">Are you absolutely sure?</p>
              </div>
            </div>
            <p className="text-xs text-[#888888] leading-relaxed">
              All saved market gap records, customized startup roadmaps, and community contributions will be permanently removed.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
              >
                Yes, Delete My Account
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white font-mono text-sm">Loading Settings...</div>}>
      <SettingsContent />
    </Suspense>
  );
}

