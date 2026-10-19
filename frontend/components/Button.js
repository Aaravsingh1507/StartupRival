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
    primary: 'bg-white text-black font-semibold hover:bg-neutral-200',
    secondary: 'bg-transparent border border-[#2A2A2A] text-white hover:bg-[#1A1A1A]',
    destructive: 'bg-transparent border border-red-800 text-red-400 hover:bg-red-950',
    icon: 'p-2 rounded-md hover:bg-[#1A1A1A] text-[#888] hover:text-white',
    ghost: 'bg-transparent border border-[#2A2A2A] text-white hover:bg-[#1A1A1A]', // alias to secondary
    outline: 'bg-transparent border border-[#2A2A2A] text-white hover:bg-[#1A1A1A]'
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
