import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: SelectOption[];
  tooltip?: string;
}

const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1.5 text-brand-text-secondary hover:text-brand-primary transition-colors cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const Select: React.FC<SelectProps> = ({ label, id, options, tooltip, ...props }) => {
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
      <div className="relative">
        <select
            id={id}
            {...props}
            className="w-full appearance-none bg-brand-input text-white rounded-xl px-4 py-3.5 text-base border-2 border-transparent focus:outline-none focus:border-brand-primary/50 focus:bg-[#323234] transition-all duration-200 pr-10"
        >
            {options.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
            ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-text-secondary">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
    </div>
  );
};

export default Select;