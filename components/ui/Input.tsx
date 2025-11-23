import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  tooltip?: string;
}

const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1.5 text-brand-text-secondary hover:text-brand-primary transition-colors cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const Input: React.FC<InputProps> = ({ label, id, tooltip, className = '', ...props }) => {
  return (
    <div className="group">
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-brand-text-secondary mb-2 ml-1">
        {label}
        {tooltip && (
            <span title={tooltip}>
                <InfoIcon />
            </span>
        )}
      </label>
      <input
        id={id}
        {...props}
        min={props.type === 'number' ? '0' : undefined}
        step={props.type === 'number' ? '0.01' : undefined}
        className={`w-full bg-brand-input text-white rounded-xl px-4 py-3.5 text-base placeholder-brand-text-secondary/50 border-2 border-transparent focus:outline-none focus:border-brand-primary/50 focus:bg-[#323234] transition-all duration-200 ${className}`}
      />
    </div>
  );
};

export default Input;