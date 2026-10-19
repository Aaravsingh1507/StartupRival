'use client';

import { Compass, Bookmark, Search } from 'lucide-react';
import Button from './Button';
import Link from 'next/link';

export default function EmptyState({
  icon = 'compass',
  title = 'No results found',
  description = 'Try selecting another sector or city to uncover untapped market gaps.',
  actionLabel,
  actionHref,
  onAction
}) {
  const renderIcon = () => {
    switch (icon) {
      case 'bookmark':
        return <Bookmark className="w-8 h-8 text-[#888888]" />;
      case 'search':
        return <Search className="w-8 h-8 text-[#888888]" />;
      case 'compass':
      default:
        return <Compass className="w-8 h-8 text-[#888888]" />;
    }
  };

  return (
    <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-8 text-center max-w-md mx-auto space-y-4">
      <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center mx-auto text-[#888888]">
        {renderIcon()}
      </div>
      <div className="space-y-1.5">
        <h4 className="text-base font-semibold text-white tracking-tight">{title}</h4>
        <p className="text-xs text-[#888888] leading-relaxed max-w-xs mx-auto">
          {description}
        </p>
      </div>

      {(actionLabel && (actionHref || onAction)) && (
        <div className="pt-2">
          {actionHref ? (
            <Link href={actionHref}>
              <Button variant="primary" size="sm">
                {actionLabel}
              </Button>
            </Link>
          ) : (
            <Button variant="primary" size="sm" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
