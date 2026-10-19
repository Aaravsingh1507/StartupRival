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
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="max-w-xl w-full p-5 space-y-4 border border-[#2A2A2A] bg-[#111111] rounded-xl">
        <div className="flex items-center justify-between pb-3 border-b border-[#1F1F1F]">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#888888] block">
              Founder Exchange
            </span>
            <h3 className="text-base font-semibold text-white tracking-tight">Create Community Post</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-[#888888] hover:text-white hover:bg-[#1A1A1A] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Post Type Selector */}
          <div>
            <label className="text-xs uppercase tracking-wider text-[#888888] mb-1.5 block">Post Category</label>
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
                  className={`text-xs py-2 rounded-lg text-center transition cursor-pointer ${
                    type === t.id
                      ? 'bg-white text-black font-medium'
                      : 'bg-transparent border border-[#2A2A2A] text-[#888888] hover:border-white hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs uppercase tracking-wider text-[#888888] mb-1 block" htmlFor="title">Post Title</label>
            <input
              id="title"
              type="text"
              required
              placeholder="e.g. Has anyone set up a modular pre-cooling unit in Nashik APMC?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0A0A0A] text-white border border-[#2A2A2A] focus:border-white focus:outline-none text-sm transition"
            />
          </div>

          {/* Sector & Region Tags */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs uppercase tracking-wider text-[#888888] mb-1 block">Sector Tag</label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0A0A0A] text-white border border-[#2A2A2A] text-xs focus:border-white focus:outline-none cursor-pointer"
              >
                {SECTORS.map((s) => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-[#888888] mb-1 block">Region Tag</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0A0A0A] text-white border border-[#2A2A2A] text-xs focus:border-white focus:outline-none cursor-pointer"
              >
                {REGIONS.map((r) => (
                  <option key={r.state} value={r.state}>{r.state}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Body */}
          <div>
            <label className="text-xs uppercase tracking-wider text-[#888888] mb-1 block" htmlFor="body">Discussion Details</label>
            <textarea
              id="body"
              rows={4}
              required
              placeholder="Share your context, operational questions, lessons learned, or vendor contacts..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0A0A0A] text-white border border-[#2A2A2A] focus:border-white focus:outline-none text-xs transition leading-relaxed"
            />
          </div>

          {/* AI Moderation Disclaimer */}
          <div className="p-3 rounded-lg bg-[#0A0A0A] border border-[#1F1F1F] text-xs text-[#555555] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#888888] shrink-0" />
            <span>AI Moderation active: Keeps discussions spam-free, productive, and focused on Indian entrepreneurship.</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" loading={submitting}>
              Publish Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

