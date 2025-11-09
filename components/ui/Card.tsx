
import React from 'react';

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, icon, children }) => {
  return (
    <div className="bg-brand-surface rounded-xl shadow-lg p-4 sm:p-6 h-full flex flex-col">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-brand-primary/20 rounded-full text-brand-primary mr-4">
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <p className="text-sm text-brand-text-secondary">{description}</p>
        </div>
      </div>
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};

export default Card;