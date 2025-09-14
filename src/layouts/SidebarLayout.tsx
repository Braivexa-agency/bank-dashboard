import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  FileText,
  Search,
  Settings,
  Building2,
  User,
  LogOut,
  Home,
} from 'lucide-react';

// Menu items with icons
const menuItems = [
  {
    title: 'Work Certificate',
    url: '/work-certificate',
    icon: FileText,
    description: 'Generate and manage work certificates',
  },
  {
    title: 'Daira Investigation',
    url: '/daira-investigation',
    icon: Search,
    description: 'Administrative investigations at Daira level',
  },
  {
    title: 'Wilaya Investigation',
    url: '/wilaya-investigation',
    icon: Building2,
    description: 'Administrative investigations at Wilaya level',
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
    description: 'Application settings and preferences',
  },
];

const AppSidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (url: string) => {
    if (url === '/work-certificate' && (location.pathname === '/' || location.pathname === '/work-certificate')) {
      return true;
    }
    return location.pathname === url;
  };

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Building2 className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Admin Dashboard</span>
            <span className="truncate text-xs text-muted-foreground">Document Management</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    tooltip={item.description}
                  >
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="flex items-center gap-2 px-2 py-1">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                  <User className="h-3 w-3" />
                </div>
                <div className="grid flex-1 text-left text-xs leading-tight">
                  <span className="truncate font-medium">Admin User</span>
                  <span className="truncate text-muted-foreground">Administrator</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <Separator />
        <div className="p-2">
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

const SidebarLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          {/* Header */}
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center gap-4 px-4">
              <SidebarTrigger />
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span className="font-medium">Bank Administrative System</span>
              </div>
              <div className="ml-auto flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Welcome back, Admin
                </span>
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
          
          {/* Footer */}
          <footer className="border-t bg-muted/10 p-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>&copy; 2024 Bank Administrative System. All rights reserved.</span>
              <span>v1.0.0</span>
            </div>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default SidebarLayout;