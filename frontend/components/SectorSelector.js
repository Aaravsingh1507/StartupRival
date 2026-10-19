'use client';

import { SECTORS } from '@/lib/data';

export default function SectorSelector({ selectedSector, onSelectSector }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-wider text-[#8EABCF] font-medium block">
          1. Select Business Sector
        </label>
      </div>

      {/* Select Dropdown */}
      <div className="relative">
        <select
          value={selectedSector}
          onChange={(e) => onSelectSector(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-[#030712]/90 text-[#F4F8FF] border border-[#39BAFF]/25 hover:border-[#39BAFF]/50 focus:border-[#39BAFF] focus:ring-1 focus:ring-[#39BAFF]/50 focus:outline-none transition appearance-none text-sm cursor-pointer shadow-[0_4px_16px_rgba(3,7,18,0.4)]"
        >
          <option value="" disabled>Choose an industry sector...</option>
          {SECTORS.map((sector) => (
            <option key={sector.id} value={sector.name} className="bg-[#08152B] text-[#F4F8FF]">
              {sector.name} — {sector.shortDesc}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#39BAFF] text-xs">
          ▼
        </div>
      </div>

      {/* Quick Selectable Pills */}
      <div className="pt-1">
        <div className="flex flex-wrap gap-2">
          {SECTORS.map((sector) => {
            const isSelected = selectedSector === sector.name;
            return (
              <button
                key={sector.id}
                type="button"
                onClick={() => onSelectSector(sector.name)}
                className={`text-xs px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0866F5] text-white font-semibold shadow-[0_0_15px_rgba(8,102,245,0.6)] border border-[#39BAFF]/50 scale-[1.02]'
                    : 'bg-[#08152B]/60 border border-[#39BAFF]/20 text-[#8EABCF] hover:border-[#39BAFF]/50 hover:text-[#F4F8FF] hover:bg-[#0C1E3D]'
                }`}
              >
                {sector.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
