'use client';

import { REGIONS } from '@/lib/data';

export default function RegionSelector({ selectedRegion, onSelectRegion }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-wider text-[#888] font-medium block">
          2. Select Region or City
        </label>
      </div>

      {/* Select Dropdown */}
      <div className="relative">
        <select
          value={selectedRegion}
          onChange={(e) => onSelectRegion(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg bg-[#0A0A0A] text-white border border-[#2A2A2A] hover:border-[#3A3A3A] focus:border-white focus:outline-none transition appearance-none text-sm cursor-pointer"
        >
          <option value="" disabled>Choose an Indian state or city...</option>
          <optgroup label="States & Territories">
            {REGIONS.map((r) => (
              <option key={r.state} value={r.state} className="bg-[#111] text-white">
                {r.state} ({r.tier})
              </option>
            ))}
          </optgroup>
          <optgroup label="Key Commercial Cities">
            {REGIONS.flatMap((r) =>
              r.cities.map((c) => (
                <option key={`${c}-${r.state}`} value={`${c}, ${r.state}`} className="bg-[#111] text-white">
                  {c} ({r.state})
                </option>
              ))
            )}
          </optgroup>
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#888] text-xs">
          ▼
        </div>
      </div>
    </div>
  );
}
