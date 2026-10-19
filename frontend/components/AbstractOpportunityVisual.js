'use client';

export default function AbstractOpportunityVisual({ className = '' }) {
  return (
    <div className={`relative w-full aspect-square max-w-[420px] mx-auto flex items-center justify-center ${className}`}>
      {/* Outer ambient glow ring in monochrome */}
      <div className="absolute inset-0 rounded-full border border-white/5 animate-pulse-subtle" />
      
      {/* Concentric radar rings */}
      <div className="absolute w-[85%] h-[85%] rounded-full border border-dashed border-white/10" />
      <div className="absolute w-[60%] h-[60%] rounded-full border border-white/10" />
      <div className="absolute w-[35%] h-[35%] rounded-full border border-white/15 bg-white/[0.015]" />

      {/* Axis crosshairs */}
      <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      {/* Rotating geometric nodes representing Market Signal Vectors */}
      <div className="absolute inset-0 animate-float-geometric">
        {/* Node 1: High Demand Opportunity */}
        <div className="absolute top-[22%] left-[28%] flex items-center gap-2 group cursor-pointer">
          <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.8)]">
            <div className="w-1.5 h-1.5 rounded-full bg-black" />
          </div>
          <div className="glass-panel px-2.5 py-1 rounded-md text-[10px] text-white font-mono border-white/20 whitespace-nowrap">
            Gap Detected: Score 88
          </div>
        </div>

        {/* Node 2: Competitor Void */}
        <div className="absolute bottom-[28%] right-[20%] flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-sm rotate-45 border border-white/80 bg-white/20 flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
          <div className="glass-panel px-2 py-0.5 rounded text-[10px] text-[#A3A3A3] font-mono border-white/10 whitespace-nowrap">
            Low Saturation [Tier-2]
          </div>
        </div>

        {/* Node 3: Untapped Signal */}
        <div className="absolute top-[68%] left-[22%] flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full border border-white/60 bg-[#1D1D1D]" />
          <div className="glass-panel px-2 py-0.5 rounded text-[10px] text-[#737373] font-mono border-white/10 whitespace-nowrap">
            Consumer Search Surge +142%
          </div>
        </div>

        {/* Node 4: Emerging Cluster */}
        <div className="absolute top-[34%] right-[22%] flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border-2 border-dashed border-white/70" />
        </div>

        {/* Connecting vector line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <line x1="30%" y1="24%" x2="78%" y2="70%" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="4 3" />
          <line x1="30%" y1="24%" x2="72%" y2="35%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="24%" y1="70%" x2="78%" y2="70%" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        </svg>
      </div>

      {/* Center Anchor Point */}
      <div className="relative z-10 w-9 h-9 rounded-xl bg-[#171717] border border-white/30 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)]">
        <div className="w-2 h-2 rounded bg-white" />
      </div>
    </div>
  );
}
