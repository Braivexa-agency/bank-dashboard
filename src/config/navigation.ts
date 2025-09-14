import {
  FileText,
  Search,
  Settings,
  Building2,
  type LucideIcon,
} from 'lucide-react';

export interface NavigationItem {
  title: string;
  url: string;
  icon: LucideIcon;
  description: string;
  badge?: string;
  disabled?: boolean;
}

export const navigationItems: NavigationItem[] = [
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

export const appConfig = {
  name: 'Admin Dashboard',
  subtitle: 'Document Management',
  company: 'Bank Administrative System',
  version: 'v1.0.0',
};