'use client';

export default function ClayCard({
  children,
  className = '',
  elevated = false,
  scorecard = false,
  onClick,
  ...props
}) {
  const bgClass = elevated || scorecard ? 'bg-[#1A1A1A]' : 'bg-[#111111]';
  const cardStyle = `${bgClass} border border-[#2A2A2A] rounded-xl p-5 transition`;

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
