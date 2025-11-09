import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = "w-full text-center px-4 py-2.5 rounded-md font-semibold text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-background transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: 'bg-brand-primary text-black hover:bg-yellow-300 focus:ring-brand-primary',
    secondary: 'bg-brand-surface text-brand-text-secondary hover:bg-gray-600 focus:ring-brand-secondary',
    reset: 'bg-transparent border border-brand-danger text-brand-danger hover:bg-brand-danger hover:text-white focus:ring-brand-danger'
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;