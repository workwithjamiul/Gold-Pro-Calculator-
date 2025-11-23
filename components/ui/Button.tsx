import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = "w-full text-center px-6 py-3.5 rounded-xl font-bold text-[15px] tracking-wide shadow-sm focus:outline-none focus:ring-4 focus:ring-opacity-30 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: 'bg-brand-primary text-black hover:bg-[#FFE033] focus:ring-brand-primary shadow-lg shadow-brand-primary/10',
    secondary: 'bg-brand-input text-white hover:bg-brand-border focus:ring-brand-text-secondary',
    reset: 'bg-transparent border-2 border-brand-danger/30 text-brand-danger hover:bg-brand-danger hover:text-white hover:border-brand-danger focus:ring-brand-danger'
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;