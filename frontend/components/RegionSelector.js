'use client';

import { useState } from 'react';
import { REGIONS } from '@/lib/data';

const POPULAR_REGIONS = [
  'Maharashtra',
  'Karnataka',
  'Delhi NCR',
  'Tamil Nadu',
  'Gujarat',
  'Telangana',
  'Uttar Pradesh',
  'Rajasthan'
];

export default function RegionSelector({ selectedRegion, onSelectRegion }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Collect all states + cities for granular regional targeting
  const allLocationOptions = [];
  REGIONS.forEach((reg) => {
    allLocationOptions.push({
      label: `${reg.state} (State)`,
      value: reg.state,
      isState: true
    });
    reg.cities.forEach((city) => {
      allLocationOptions.push({
        label: `${city}, ${reg.state}`,
        value: `${city}, ${reg.state}`,
        isState: false
      });
    });
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-white flex items-center gap-2">
          <span>2. Select Region or City</span>
          <span className="text-xs text-[#737373] font-normal">Target local Indian consumer demand</span>
        </label>
      </div>

      {/* Select Dropdown */}
      <div className="relative">
        <select
          value={selectedRegion}
          onChange={(e) => onSelectRegion(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-[#151515] text-white border border-white/10 hover:border-white/25 focus:border-white/50 focus:outline-none transition-all appearance-none text-sm cursor-pointer"
        >
          <option value="" disabled>Choose an Indian state or city...</option>
          <optgroup label="States & Territories">
            {REGIONS.map((r) => (
              <option key={r.state} value={r.state} className="bg-[#151515] text-white">
                {r.state} ({r.tier})
              </option>
            ))}
          </optgroup>
          <optgroup label="Key Commercial Cities">
            {REGIONS.flatMap((r) =>
              r.cities.map((c) => (
                <option key={`${c}-${r.state}`} value={`${c}, ${r.state}`} className="bg-[#151515] text-white">
                  {c} ({r.state})
                </option>
              ))
            )}
          </optgroup>
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#A3A3A3] text-xs">
          ▼
        </div>
      </div>

      {/* Popular Region Quick Chips */}
      <div className="pt-1">
        <div className="flex flex-wrap gap-2">
          {POPULAR_REGIONS.map((regionName) => {
            const isSelected = selectedRegion === regionName;
            return (
              <button
                key={regionName}
                type="button"
                onClick={() => onSelectRegion(regionName)}
                className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                  isSelected ? 'clay-chip-active' : 'clay-chip'
                }`}
              >
                {regionName}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
