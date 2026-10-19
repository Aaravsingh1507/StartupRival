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
      className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer ${
        isSaved
          ? 'bg-white text-black border-white font-medium'
          : 'bg-[#1D1D1D] text-[#A3A3A3] hover:text-white border-white/10 hover:border-white/25'
      } ${className}`}
      title={isSaved ? 'Remove from saved ideas' : 'Save this opportunity'}
    >
      {isSaved ? (
        <>
          <BookmarkCheck className="w-3.5 h-3.5" />
          <span>Saved</span>
        </>
      ) : (
        <>
          <Bookmark className="w-3.5 h-3.5" />
          <span>Save Idea</span>
        </>
      )}
    </button>
  );
}
