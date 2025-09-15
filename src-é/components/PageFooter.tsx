import React from 'react';
import { appConfig } from '@/config/navigation';

interface PageFooterProps {
  className?: string;
  showVersion?: boolean;
  version?: string;
  companyName?: string;
  year?: number;
  children?: React.ReactNode;
}

export const PageFooter: React.FC<PageFooterProps> = ({
  className = "",
  showVersion = true,
  version = appConfig.version,
  companyName = appConfig.company,
  year = new Date().getFullYear(),
  children
}) => {
  return (
    <footer className={`border-t bg-muted/10 p-4 ${className}`}>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>&copy; {year} {companyName}. All rights reserved.</span>
        <div className="flex items-center gap-4">
          {children}
          {showVersion && <span>{version}</span>}
        </div>
      </div>
    </footer>
  );
};