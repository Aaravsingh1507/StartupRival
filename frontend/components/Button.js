'use client';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center transition select-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  // Size overrides if specifically requested; default is px-5 py-2.5 text-sm
  const sizeStyles = {
    sm: 'px-3 py-1.5 rounded-lg text-xs gap-1.5',
    md: 'px-5 py-2.5 rounded-lg text-sm gap-2',
    lg: 'px-6 py-3 rounded-lg text-base gap-2.5',
    icon: 'p-2 rounded-md'
  };

  const variantStyles = {
    primary: 'bg-[#0866F5] text-white font-semibold hover:bg-[#0756D1] border border-[#39BAFF]/40 shadow-[0_0_20px_rgba(8,102,245,0.45)] hover:shadow-[0_0_28px_rgba(8,102,245,0.7)]',
    secondary: 'bg-[#08152B]/80 backdrop-blur-md border border-[#39BAFF]/25 text-[#F4F8FF] hover:bg-[#0C1E3D] hover:border-[#39BAFF]/50 hover:shadow-[0_0_16px_rgba(8,102,245,0.25)]',
    destructive: 'bg-red-950/20 border border-red-500/40 text-red-300 hover:bg-red-950/40 hover:border-red-500/70',
    icon: 'p-2 rounded-lg text-[#8EABCF] hover:text-[#F4F8FF] hover:bg-[#0866F5]/15 hover:border hover:border-[#39BAFF]/30',
    ghost: 'bg-transparent text-[#8EABCF] hover:text-[#F4F8FF] hover:bg-[#0866F5]/10',
    outline: 'bg-transparent border border-[#39BAFF]/30 text-[#F4F8FF] hover:bg-[#08152B] hover:border-[#39BAFF]/60'
  };

  const appliedSize = variant === 'icon' ? '' : (sizeStyles[size] || sizeStyles.md);

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${appliedSize} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-0.5 mr-1.5 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
