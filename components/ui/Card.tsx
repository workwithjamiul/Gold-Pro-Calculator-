import React from 'react';

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, icon, children }) => {
  return (
    <div className="bg-brand-surface rounded-2xl p-6 sm:p-8 shadow-ios border border-brand-border/30 backdrop-blur-md">
      <div className="flex items-start mb-6">
        <div className="p-2.5 bg-brand-primary rounded-xl text-black mr-4 shadow-lg shadow-brand-primary/20">
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
          <p className="text-sm text-brand-text-secondary mt-1 font-medium">{description}</p>
        </div>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

export default Card;