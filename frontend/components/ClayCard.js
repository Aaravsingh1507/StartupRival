'use client';

export default function ClayCard({
  children,
  className = '',
  elevated = false,
  scorecard = false,
  onClick,
  ...props
}) {
  const bgClass = elevated || scorecard 
    ? 'bg-[#0C1E3D]/90 backdrop-blur-xl border border-[#39BAFF]/30 shadow-[0_12px_40px_rgba(3,7,18,0.6)]' 
    : 'bg-[#08152B]/80 backdrop-blur-md border border-[#39BAFF]/20 shadow-[0_8px_32px_rgba(3,7,18,0.45)] hover:border-[#39BAFF]/45';
  const cardStyle = `${bgClass} rounded-xl p-5 transition-all duration-200`;

  return (
    <div
      onClick={onClick}
      className={`${cardStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
