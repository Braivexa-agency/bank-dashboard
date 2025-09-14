import React from 'react';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Home } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { appConfig } from '@/config/navigation';

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  showHomeIcon?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title = appConfig.company,
  subtitle,
  showHomeIcon = true,
  className = "",
  children
}) => {
  return (
    <header className={`sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className}`}>
      <div className="flex h-14 items-center gap-4 px-4">
        {/* Sidebar Trigger */}
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        
        {/* Title Section */}
        <div className="flex items-center gap-2">
          {showHomeIcon && <Home className="h-4 w-4" />}
          <div className="flex flex-col">
            <span className="font-medium">{title}</span>
            {subtitle && (
              <span className="text-xs text-muted-foreground">{subtitle}</span>
            )}
          </div>
        </div>
        
        {/* Right Section */}
        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />
          <span className="text-sm text-muted-foreground">
            Welcome back, Admin
          </span>
          {children}
        </div>
      </div>
    </header>
  );
};