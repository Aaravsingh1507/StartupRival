'use client';

import { SECTORS } from '@/lib/data';

export default function SectorSelector({ selectedSector, onSelectSector }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-white flex items-center gap-2">
          <span>1. Select Business Sector</span>
          <span className="text-xs text-[#737373] font-normal">Choose an industry you are curious about</span>
        </label>
      </div>

      {/* Select Dropdown (accessible for keyboard and fast mobile) */}
      <div className="relative">
        <select
          value={selectedSector}
          onChange={(e) => onSelectSector(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-[#151515] text-white border border-white/10 hover:border-white/25 focus:border-white/50 focus:outline-none transition-all appearance-none text-sm cursor-pointer"
        >
          <option value="" disabled>Choose an industry sector...</option>
          {SECTORS.map((sector) => (
            <option key={sector.id} value={sector.name} className="bg-[#151515] text-white">
              {sector.name} — {sector.shortDesc}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#A3A3A3] text-xs">
          ▼
        </div>
      </div>

      {/* Quick Selectable Chips */}
      <div className="pt-1">
        <div className="flex flex-wrap gap-2">
          {SECTORS.map((sector) => {
            const isSelected = selectedSector === sector.name;
            return (
              <button
                key={sector.id}
                type="button"
                onClick={() => onSelectSector(sector.name)}
                className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                  isSelected ? 'clay-chip-active' : 'clay-chip'
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
