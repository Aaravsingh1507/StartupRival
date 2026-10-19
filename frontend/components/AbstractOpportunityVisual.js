'use client';

export default function AbstractOpportunityVisual({ className = '' }) {
  return (
    <div className={`relative w-full aspect-square max-w-[420px] mx-auto flex items-center justify-center ${className}`}>
      {/* Outer ambient glow ring in monochrome */}
      <div className="absolute inset-0 rounded-full border border-[#1F1F1F] animate-pulse-subtle" />
      
      {/* Concentric radar rings */}
      <div className="absolute w-[85%] h-[85%] rounded-full border border-dashed border-[#2A2A2A]" />
      <div className="absolute w-[60%] h-[60%] rounded-full border border-[#2A2A2A]" />
      <div className="absolute w-[35%] h-[35%] rounded-full border border-[#2A2A2A] bg-[#111111]/40" />

      {/* Axis crosshairs */}
      <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent" />
      <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-[#2A2A2A] to-transparent" />

      {/* Rotating geometric nodes representing Market Signal Vectors */}
      <div className="absolute inset-0 animate-float-geometric">
        {/* Node 1: High Demand Opportunity */}
        <div className="absolute top-[22%] left-[28%] flex items-center gap-2 group cursor-pointer">
          <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-black" />
          </div>
          <div className="bg-[#111111] px-2.5 py-1 rounded-md text-[10px] text-white font-mono border border-[#2A2A2A] whitespace-nowrap">
            Gap Detected: Score <span className="text-[#E8FF47] font-bold">88</span>
          </div>
        </div>

        {/* Node 2: Competitor Void */}
        <div className="absolute bottom-[28%] right-[20%] flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-sm rotate-45 border border-white bg-white/20 flex items-center justify-center" />
          <div className="bg-[#111111] px-2 py-0.5 rounded text-[10px] text-[#888888] font-mono border border-[#2A2A2A] whitespace-nowrap">
            Low Saturation [Tier-2]
          </div>
        </div>

        {/* Node 3: Untapped Signal */}
        <div className="absolute top-[68%] left-[22%] flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full border border-[#888888] bg-[#1A1A1A]" />
          <div className="bg-[#111111] px-2 py-0.5 rounded text-[10px] text-[#555555] font-mono border border-[#2A2A2A] whitespace-nowrap">
            Consumer Search Surge +142%
          </div>
        </div>

        {/* Node 4: Emerging Cluster */}
        <div className="absolute top-[34%] right-[22%] flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border-2 border-dashed border-[#888888]" />
        </div>

        {/* Connecting vector line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <line x1="30%" y1="24%" x2="78%" y2="70%" stroke="#2A2A2A" strokeWidth="1" strokeDasharray="4 3" />
          <line x1="30%" y1="24%" x2="72%" y2="35%" stroke="#2A2A2A" strokeWidth="1" />
          <line x1="24%" y1="70%" x2="78%" y2="70%" stroke="#1F1F1F" strokeWidth="1" />
        </svg>
      </div>

      {/* Center Anchor Point */}
      <div className="relative z-10 w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center">
        <div className="w-2 h-2 rounded-sm bg-white" />
      </div>
    </div>
  );
}
