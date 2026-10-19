'use client';

export default function GlassPanel({
  children,
  className = '',
  elevated = false,
  as: Component = 'div',
  ...props
}) {
  const panelStyle = elevated ? 'glass-panel-elevated' : 'glass-panel';

  return (
    <Component
      className={`rounded-2xl ${panelStyle} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
