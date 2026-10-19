'use client';

import { SECTORS } from '@/lib/data';

export default function SectorSelector({ selectedSector, onSelectSector }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-wider text-[#888] font-medium block">
          1. Select Business Sector
        </label>
      </div>

      {/* Select Dropdown */}
      <div className="relative">
        <select
          value={selectedSector}
          onChange={(e) => onSelectSector(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg bg-[#0A0A0A] text-white border border-[#2A2A2A] hover:border-[#3A3A3A] focus:border-white focus:outline-none transition appearance-none text-sm cursor-pointer"
        >
          <option value="" disabled>Choose an industry sector...</option>
          {SECTORS.map((sector) => (
            <option key={sector.id} value={sector.name} className="bg-[#111] text-white">
              {sector.name} — {sector.shortDesc}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#888] text-xs">
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
                className={`text-xs px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black font-semibold'
                    : 'bg-transparent border border-[#2A2A2A] text-[#888] hover:border-white hover:text-white'
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
