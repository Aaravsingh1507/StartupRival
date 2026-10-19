'use client';

export default function AbstractOpportunityVisual({ className = '' }) {
  return (
    <div className={`relative w-full aspect-square max-w-[420px] mx-auto flex items-center justify-center ${className}`}>
      {/* Outer ambient glow halo */}
      <div className="absolute inset-0 rounded-full bg-[#0866F5]/10 blur-2xl pointer-events-none" />
      <div className="absolute inset-0 rounded-full border border-[#39BAFF]/20 animate-pulse-subtle" />
      
      {/* Concentric radar rings */}
      <div className="absolute w-[85%] h-[85%] rounded-full border border-dashed border-[#39BAFF]/25" />
      <div className="absolute w-[60%] h-[60%] rounded-full border border-[#0866F5]/40" />
      <div className="absolute w-[35%] h-[35%] rounded-full border border-[#39BAFF]/40 bg-[#08152B]/60 backdrop-blur-sm" />

      {/* Axis crosshairs */}
      <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#39BAFF]/30 to-transparent" />
      <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-[#39BAFF]/30 to-transparent" />

      {/* Rotating geometric nodes representing Market Signal Vectors */}
      <div className="absolute inset-0 animate-float-geometric">
        {/* Node 1: High Demand Opportunity */}
        <div className="absolute top-[22%] left-[28%] flex items-center gap-2 group cursor-pointer">
          <div className="w-4 h-4 rounded-full bg-[#39BAFF] flex items-center justify-center shadow-[0_0_12px_rgba(57,186,255,0.8)]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#030712]" />
          </div>
          <div className="bg-[#08152B]/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-[#F4F8FF] font-mono border border-[#39BAFF]/40 whitespace-nowrap shadow-[0_4px_16px_rgba(8,102,245,0.25)]">
            Gap Detected: Score <span className="text-[#39BAFF] font-bold">88</span>
          </div>
        </div>

        {/* Node 2: Competitor Void */}
        <div className="absolute bottom-[28%] right-[20%] flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-sm rotate-45 border border-[#39BAFF] bg-[#0866F5]/30 flex items-center justify-center shadow-[0_0_8px_rgba(8,102,245,0.6)]" />
          <div className="bg-[#08152B]/90 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] text-[#8EABCF] font-mono border border-[#39BAFF]/30 whitespace-nowrap">
            Low Saturation [Tier-2]
          </div>
        </div>

        {/* Node 3: Untapped Signal */}
        <div className="absolute top-[68%] left-[22%] flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full border border-[#39BAFF] bg-[#0C1E3D] shadow-[0_0_6px_rgba(57,186,255,0.5)]" />
          <div className="bg-[#08152B]/90 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] text-[#8EABCF] font-mono border border-[#39BAFF]/30 whitespace-nowrap">
            Consumer Search Surge +142%
          </div>
        </div>

        {/* Node 4: Emerging Cluster */}
        <div className="absolute top-[34%] right-[22%] flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border-2 border-dashed border-[#39BAFF]/60" />
        </div>

        {/* Connecting vector line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
          <line x1="30%" y1="24%" x2="78%" y2="70%" stroke="#0866F5" strokeWidth="1" strokeDasharray="4 3" />
          <line x1="30%" y1="24%" x2="72%" y2="35%" stroke="#39BAFF" strokeWidth="1" />
          <line x1="24%" y1="70%" x2="78%" y2="70%" stroke="#0C1E3D" strokeWidth="1" />
        </svg>
      </div>

      {/* Center Anchor Point */}
      <div className="relative z-10 w-8 h-8 rounded-xl bg-[#08152B] border border-[#39BAFF]/50 flex items-center justify-center shadow-[0_0_15px_rgba(8,102,245,0.5)]">
        <div className="w-2 h-2 rounded-sm bg-[#39BAFF]" />
      </div>
    </div>
  );
}
