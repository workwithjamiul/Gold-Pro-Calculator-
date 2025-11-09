import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  tooltip?: string;
}

const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1 text-brand-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const Input: React.FC<InputProps> = ({ label, id, tooltip, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-brand-text-secondary mb-1">
        {label}
        {tooltip && (
            <span title={tooltip} className="cursor-help">
                <InfoIcon />
            </span>
        )}
      </label>
      <input
        id={id}
        {...props}
        min={props.type === 'number' ? '0' : undefined}
        step={props.type === 'number' ? '0.01' : undefined}
        className="w-full bg-brand-background border border-brand-surface rounded-md px-3 py-2 text-white placeholder-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200"
      />
    </div>
  );
};

export default Input;