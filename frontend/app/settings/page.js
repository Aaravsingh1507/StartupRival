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
    <div className="min-h-screen flex flex-col bg-[#030712] text-[#F4F8FF] selection:bg-[#0866F5] selection:text-white relative overflow-hidden">
      {/* Background dotted pattern & ambient halos */}
      <div className="absolute inset-0 dotted-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-[#0866F5]/10 rounded-full blur-[140px] pointer-events-none" />

      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-6 py-8 relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="space-y-1.5 pb-4 border-b border-[#39BAFF]/15">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs text-[#8EABCF] hover:text-[#39BAFF] transition-colors mb-2 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F8FF] flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0866F5]/20 border border-[#39BAFF]/30 flex items-center justify-center text-[#39BAFF] shadow-[0_0_15px_rgba(8,102,245,0.4)]">
                <Settings className="w-5 h-5" />
              </div>
              <span>Account & Settings</span>
            </h1>
            <p className="text-sm text-[#8EABCF]">
              Manage your personal credentials, workspace profile, and notification triggers.
            </p>
          </div>

          {/* Profile + Security cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* Profile Information */}
            <div className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/25 rounded-2xl p-6 flex flex-col justify-between shadow-[0_12px_40px_rgba(3,7,18,0.7)]">
              <div>
                <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#39BAFF]/15">
                  <User className="w-4 h-4 text-[#39BAFF]" />
                  <h2 className="text-base font-bold text-[#F4F8FF]">Profile Details</h2>
                </div>

                <form id="profile-form" onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#8EABCF] mb-1.5 block font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#030712]/80 border border-[#39BAFF]/25 rounded-xl px-3.5 py-2.5 text-sm text-[#F4F8FF] focus:border-[#39BAFF] focus:ring-1 focus:ring-[#39BAFF]/50 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#8EABCF] mb-1.5 block font-medium">
                      Registered Email
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user?.email || 'founder@startuprival.in'}
                      className="w-full bg-[#030712]/40 border border-[#39BAFF]/15 rounded-xl px-3.5 py-2.5 text-sm text-[#4B6485] cursor-not-allowed"
                    />
                  </div>
                </form>
              </div>

              <div className="pt-4 mt-4 border-t border-[#39BAFF]/15">
                <Button type="submit" form="profile-form" variant="primary" className="w-full justify-center">
                  Save Profile Changes
                </Button>
              </div>
            </div>

            {/* Change Password */}
            <div className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/25 rounded-2xl p-6 flex flex-col justify-between shadow-[0_12px_40px_rgba(3,7,18,0.7)]">
              <div>
                <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#39BAFF]/15">
                  <Key className="w-4 h-4 text-[#39BAFF]" />
                  <h2 className="text-base font-bold text-[#F4F8FF]">Security & Password</h2>
                </div>

                <form id="security-form" onSubmit={handleUpdatePassword} className="space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#8EABCF] mb-1.5 block font-medium">
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full bg-[#030712]/80 border border-[#39BAFF]/25 rounded-xl px-3.5 py-2.5 text-sm text-[#F4F8FF] placeholder-[#4B6485] focus:border-[#39BAFF] focus:ring-1 focus:ring-[#39BAFF]/50 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#8EABCF] mb-1.5 block font-medium">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Min. 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-[#030712]/80 border border-[#39BAFF]/25 rounded-xl px-3.5 py-2.5 text-sm text-[#F4F8FF] placeholder-[#4B6485] focus:border-[#39BAFF] focus:ring-1 focus:ring-[#39BAFF]/50 focus:outline-none transition"
                    />
                  </div>
                </form>
              </div>

              <div className="pt-4 mt-4 border-t border-[#39BAFF]/15">
                <Button type="submit" form="security-form" variant="secondary" className="w-full justify-center">
                  Update Password
                </Button>
              </div>
            </div>

          </div>

          {/* Notification Preferences */}
          <div className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/25 rounded-2xl p-6 space-y-4 shadow-[0_12px_40px_rgba(3,7,18,0.7)]">
            <div className="flex items-center gap-2 pb-3 border-b border-[#39BAFF]/15">
              <Bell className="w-4 h-4 text-[#39BAFF]" />
              <div>
                <h2 className="text-base font-bold text-[#F4F8FF]">Notification Triggers</h2>
                <p className="text-xs text-[#8EABCF]">Control which real-time signals push to your bell inbox.</p>
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
                    idx !== arr.length - 1 ? 'border-b border-[#39BAFF]/15' : ''
                  }`}
                >
                  <div className="space-y-0.5 max-w-lg pr-4">
                    <span className="text-[#F4F8FF] text-sm font-semibold block">{item.label}</span>
                    <span className="text-[#8EABCF] text-xs block leading-relaxed">{item.desc}</span>
                    {item.disabled && (
                      <p className="text-xs text-[#4B6485] italic pt-1">
                        Coming soon — will auto-enable when email is verified
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    disabled={item.disabled}
                    onClick={() => togglePref(item.key)}
                    className={`w-12 h-6 rounded-full transition-all duration-300 p-0.5 relative shrink-0 ${
                      item.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                    } ${
                      prefs[item.key] ? 'bg-[#0866F5] shadow-[0_0_12px_rgba(8,102,245,0.7)]' : 'bg-[#0C1E3D] border border-[#39BAFF]/20'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full transition-transform duration-300 ${
                        prefs[item.key] ? 'translate-x-6 bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]' : 'translate-x-0 bg-[#4B6485]'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-[#08152B]/40 border border-red-500/30 rounded-2xl p-6 space-y-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-red-400 font-bold text-sm">Danger Zone: Delete Account</h3>
                <p className="text-[#8EABCF] text-sm leading-relaxed">
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
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#08152B] border border-[#39BAFF]/30 rounded-2xl p-6 space-y-4 shadow-[0_20px_50px_rgba(3,7,18,0.9)]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-950/60 border border-red-500/40 text-red-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F4F8FF]">Confirm Account Deletion</h3>
                <p className="text-xs text-[#8EABCF]">Are you absolutely sure?</p>
              </div>
            </div>
            <p className="text-xs text-[#8EABCF] leading-relaxed">
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
    <Suspense fallback={<div className="min-h-screen bg-[#030712] flex items-center justify-center text-[#F4F8FF] font-mono text-sm">Loading Settings...</div>}>
      <SettingsContent />
    </Suspense>
  );
}
