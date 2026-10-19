'use client';

import { REGIONS } from '@/lib/data';

export default function RegionSelector({ selectedRegion, onSelectRegion }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-wider text-[#8EABCF] font-medium block">
          2. Select Region or City
        </label>
      </div>

      {/* Select Dropdown */}
      <div className="relative">
        <select
          value={selectedRegion}
          onChange={(e) => onSelectRegion(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-[#030712]/90 text-[#F4F8FF] border border-[#39BAFF]/25 hover:border-[#39BAFF]/50 focus:border-[#39BAFF] focus:ring-1 focus:ring-[#39BAFF]/50 focus:outline-none transition appearance-none text-sm cursor-pointer shadow-[0_4px_16px_rgba(3,7,18,0.4)]"
        >
          <option value="" disabled>Choose an Indian state or city...</option>
          <optgroup label="States & Territories" className="bg-[#08152B] text-[#39BAFF] font-semibold">
            {REGIONS.map((r) => (
              <option key={r.state} value={r.state} className="bg-[#08152B] text-[#F4F8FF]">
                {r.state} ({r.tier})
              </option>
            ))}
          </optgroup>
          <optgroup label="Key Commercial Cities" className="bg-[#08152B] text-[#39BAFF] font-semibold">
            {REGIONS.flatMap((r) =>
              r.cities.map((c) => (
                <option key={`${c}-${r.state}`} value={`${c}, ${r.state}`} className="bg-[#08152B] text-[#F4F8FF]">
                  {c} ({r.state})
                </option>
              ))
            )}
          </optgroup>
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#39BAFF] text-xs">
          ▼
        </div>
      </div>
    </div>
  );
}
