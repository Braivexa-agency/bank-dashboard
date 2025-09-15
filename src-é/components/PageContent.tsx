import React from 'react';

interface PageContentProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md', 
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
};

const paddingClasses = {
  none: 'p-0',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
};

export const PageContent: React.FC<PageContentProps> = ({
  children,
  className = "",
  maxWidth = '6xl',
  padding = 'lg'
}) => {
  return (
    <div className={`flex flex-1 flex-col gap-4 pt-0 ${paddingClasses[padding]}`}>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8">
        <div className={`mx-auto grid w-full gap-2 ${maxWidthClasses[maxWidth]} ${className}`}>
          {children}
        </div>
      </div>
    </div>
  );
};