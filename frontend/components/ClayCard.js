'use client';

export default function ClayCard({
  children,
  className = '',
  interactive = false,
  scorecard = false,
  onClick,
  ...props
}) {
  const cardStyle = scorecard
    ? 'clay-scorecard p-6'
    : `clay-card p-6 ${interactive ? 'clay-card-interactive cursor-pointer' : ''}`;

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
