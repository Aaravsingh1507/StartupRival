'use client';

import { useState } from 'react';
import { SECTORS, REGIONS } from '@/lib/data';
import Button from './Button';
import { useToast } from '@/lib/toast-context';
import { Sparkles, X } from 'lucide-react';

export default function CreatePostModal({ isOpen, onClose, onSubmit }) {
  const [type, setType] = useState('question');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [sector, setSector] = useState('Agriculture');
  const [region, setRegion] = useState('Maharashtra');
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      showToast('Please provide both title and body for your post', 'warning');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({ type, title, body, sector, region });
      showToast('Post published to StartupRival Founder Community!');
      setTitle('');
      setBody('');
      onClose();
    } catch {
      showToast('Failed to publish post. Try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="clay-card max-w-xl w-full p-6 sm:p-8 space-y-5 border-white/20 bg-[#141414] animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#737373] block">
              Founder Exchange
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">Create Community Post</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#737373] hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Post Type Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#A3A3A3]">Post Category</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'question', label: 'Question' },
                { id: 'idea', label: 'Idea Pitch' },
                { id: 'success', label: 'Success Story' },
                { id: 'resource', label: 'Resource' }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id)}
                  className={`text-xs py-2 rounded-xl border text-center transition-all cursor-pointer ${
                    type === t.id
                      ? 'bg-white text-black font-semibold border-white shadow-sm'
                      : 'bg-[#181818] text-[#A3A3A3] hover:text-white border-white/10'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#A3A3A3]" htmlFor="title">Post Title</label>
            <input
              id="title"
              type="text"
              required
              placeholder="e.g. Has anyone set up a modular pre-cooling unit in Nashik APMC?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#181818] text-white border border-white/10 hover:border-white/25 focus:border-white/50 focus:outline-none text-sm transition-all"
            />
          </div>

          {/* Sector & Region Tags */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#A3A3A3]">Sector Tag</label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#181818] text-white border border-white/10 text-xs focus:outline-none"
              >
                {SECTORS.map((s) => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#A3A3A3]">Region Tag</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#181818] text-white border border-white/10 text-xs focus:outline-none"
              >
                {REGIONS.map((r) => (
                  <option key={r.state} value={r.state}>{r.state}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#A3A3A3]" htmlFor="body">Discussion Details</label>
            <textarea
              id="body"
              rows={4}
              required
              placeholder="Share your context, operational questions, lessons learned, or vendor contacts..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#181818] text-white border border-white/10 hover:border-white/25 focus:border-white/50 focus:outline-none text-xs transition-all leading-relaxed"
            />
          </div>

          {/* AI Moderation Disclaimer */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-[#737373] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-white/50 shrink-0" />
            <span>AI Moderation active: Keeps discussions spam-free, productive, and focused on Indian entrepreneurship.</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" loading={submitting}>
              Publish Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
