import React from 'react';

interface ResponsivePageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const ResponsivePageWrapper: React.FC<ResponsivePageWrapperProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`responsive-page-wrapper ${className}`}>
      <div className="page-container">
        {children}
      </div>
    </div>
  );
};

export default ResponsivePageWrapper;