import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { PageHeader } from '@/components/PageHeader';
import { PageContent } from '@/components/PageContent';
import { PageFooter } from '@/components/PageFooter';

const SidebarLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader />
        <PageContent>
          <Outlet />
        </PageContent>
        <PageFooter />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SidebarLayout;