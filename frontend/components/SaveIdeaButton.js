'use client';

import { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { localDataService } from '@/lib/supabase';
import { useToast } from '@/lib/toast-context';

export default function SaveIdeaButton({ idea, onSaveChange, className = '' }) {
  const [isSaved, setIsSaved] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (idea) {
      setIsSaved(localDataService.isIdeaSaved(idea.id || idea.name));
    }
  }, [idea]);

  const handleToggle = (e) => {
    e.stopPropagation();
    if (!idea) return;

    if (isSaved) {
      localDataService.removeSavedIdea(idea.id || idea.name);
      setIsSaved(false);
      showToast(`Removed "${idea.name}" from your saved ideas`);
      if (onSaveChange) onSaveChange(false);
    } else {
      localDataService.saveIdea(idea);
      setIsSaved(true);
      showToast(`Saved "${idea.name}" to your founder dashboard`);
      if (onSaveChange) onSaveChange(true);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer ${
        isSaved
          ? 'bg-[#0866F5] text-white border-[#39BAFF]/50 font-semibold shadow-[0_0_12px_rgba(8,102,245,0.6)]'
          : 'bg-[#0C1E3D]/80 text-[#8EABCF] hover:text-[#F4F8FF] border-[#39BAFF]/25 hover:border-[#39BAFF]/50 hover:bg-[#0866F5]/20'
      } ${className}`}
      title={isSaved ? 'Remove from saved ideas' : 'Save this opportunity'}
    >
      {isSaved ? (
        <>
          <BookmarkCheck className="w-3.5 h-3.5 text-white" />
          <span>Saved</span>
        </>
      ) : (
        <>
          <Bookmark className="w-3.5 h-3.5 text-[#39BAFF]" />
          <span>Save Idea</span>
        </>
      )}
    </button>
  );
}
