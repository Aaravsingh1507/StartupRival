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
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-xl w-full p-6 sm:p-8 space-y-5 border border-[#39BAFF]/30 bg-[#08152B]/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_60px_rgba(3,7,18,0.9)] text-[#F4F8FF]">
        <div className="flex items-center justify-between pb-3 border-b border-[#39BAFF]/15">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#39BAFF] block">
              Founder Exchange
            </span>
            <h3 className="text-lg font-bold text-[#F4F8FF] tracking-tight">Create Community Post</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#8EABCF] hover:text-white hover:bg-[#0C1E3D] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Post Type Selector */}
          <div>
            <label className="text-xs uppercase tracking-wider text-[#8EABCF] mb-1.5 block font-medium">Post Category</label>
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
                  className={`text-xs py-2 rounded-xl text-center transition-all duration-200 cursor-pointer ${
                    type === t.id
                      ? 'bg-[#0866F5] text-white font-semibold shadow-[0_0_12px_rgba(8,102,245,0.6)] border border-[#39BAFF]/50'
                      : 'bg-[#030712]/70 border border-[#39BAFF]/20 text-[#8EABCF] hover:border-[#39BAFF]/50 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs uppercase tracking-wider text-[#8EABCF] mb-1 block font-medium" htmlFor="title">Post Title</label>
            <input
              id="title"
              type="text"
              required
              placeholder="e.g. Has anyone set up a modular pre-cooling unit in Nashik APMC?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712]/80 text-[#F4F8FF] border border-[#39BAFF]/25 focus:border-[#39BAFF] focus:outline-none text-sm transition placeholder:text-[#4B6485]"
            />
          </div>

          {/* Sector & Region Tags */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs uppercase tracking-wider text-[#8EABCF] mb-1 block font-medium">Sector Tag</label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712]/80 text-[#F4F8FF] border border-[#39BAFF]/25 text-xs focus:border-[#39BAFF] focus:outline-none cursor-pointer"
              >
                {SECTORS.map((s) => (
                  <option key={s.id} value={s.name} className="bg-[#08152B] text-white">{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-[#8EABCF] mb-1 block font-medium">Region Tag</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712]/80 text-[#F4F8FF] border border-[#39BAFF]/25 text-xs focus:border-[#39BAFF] focus:outline-none cursor-pointer"
              >
                {REGIONS.map((r) => (
                  <option key={r.state} value={r.state} className="bg-[#08152B] text-white">{r.state}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Body */}
          <div>
            <label className="text-xs uppercase tracking-wider text-[#8EABCF] mb-1 block font-medium" htmlFor="body">Discussion Details</label>
            <textarea
              id="body"
              rows={4}
              required
              placeholder="Share your context, operational questions, lessons learned, or vendor contacts..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712]/80 text-[#F4F8FF] border border-[#39BAFF]/25 focus:border-[#39BAFF] focus:outline-none text-xs transition leading-relaxed placeholder:text-[#4B6485]"
            />
          </div>

          {/* AI Moderation Disclaimer */}
          <div className="p-3.5 rounded-xl bg-[#030712]/70 border border-[#39BAFF]/20 text-xs text-[#8EABCF] flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#39BAFF] shrink-0" />
            <span>AI Moderation active: Keeps discussions spam-free, productive, and focused on Indian entrepreneurship.</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
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
