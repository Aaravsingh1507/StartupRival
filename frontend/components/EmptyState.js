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
        return <Bookmark className="w-8 h-8 text-[#39BAFF]" />;
      case 'search':
        return <Search className="w-8 h-8 text-[#39BAFF]" />;
      case 'compass':
      default:
        return <Compass className="w-8 h-8 text-[#39BAFF]" />;
    }
  };

  return (
    <div className="bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/20 rounded-2xl p-8 sm:p-10 text-center max-w-md mx-auto space-y-4 shadow-[0_12px_40px_rgba(3,7,18,0.5)]">
      <div className="w-14 h-14 rounded-2xl bg-[#0C1E3D] border border-[#39BAFF]/30 flex items-center justify-center mx-auto text-[#39BAFF] shadow-[0_0_20px_rgba(8,102,245,0.3)]">
        {renderIcon()}
      </div>
      <div className="space-y-1.5">
        <h4 className="text-base font-bold text-[#F4F8FF] tracking-tight">{title}</h4>
        <p className="text-xs text-[#8EABCF] leading-relaxed max-w-xs mx-auto">
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
