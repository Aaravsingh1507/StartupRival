'use client';

export default function GlassPanel({
  children,
  className = '',
  elevated = false,
  as: Component = 'div',
  ...props
}) {
  const panelStyle = elevated 
    ? 'bg-[#0C1E3D]/90 backdrop-blur-2xl border border-[#39BAFF]/30 shadow-[0_12px_45px_rgba(3,7,18,0.7)]' 
    : 'bg-[#08152B]/85 backdrop-blur-xl border border-[#39BAFF]/20 shadow-[0_8px_32px_rgba(3,7,18,0.45)]';

  return (
    <Component
      className={`rounded-2xl ${panelStyle} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
