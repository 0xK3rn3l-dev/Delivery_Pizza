// src/shared/ui/button/Button.tsx
'use client';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'outlineDark';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = ({ 
  variant = 'primary', 
  size = 'md',
  children, 
  className = '', 
  ...props 
}: ButtonProps) => {
  const variants = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 hover:text-white',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    outline: 'border border-orange-500 text-orange-500 hover:bg-orange-50',
    outlineDark: 'border border-gray-700 bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button
      className={`
        rounded-3xl transition 
        inline-flex items-center justify-center 
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};