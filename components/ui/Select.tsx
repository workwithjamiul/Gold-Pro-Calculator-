
import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: SelectOption[];
}

const Select: React.FC<SelectProps> = ({ label, id, options, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-brand-text-secondary mb-1">
        {label}
      </label>
      <select
        id={id}
        {...props}
        className="w-full bg-brand-background border border-brand-surface rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
