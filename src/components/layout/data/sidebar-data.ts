import {
  IconBug,
  IconChecklist,
  IconError404,
  IconFileDescription,
  IconHelp,
  IconLayoutDashboard,
  IconLock,
  IconLockAccess,
  IconNotification,
  IconPalette,
  IconServerOff,
  IconSettings,
  IconTool,
  IconUserCog,
  IconUserOff,
  IconUsers,
  IconBarrierBlock,
} from '@tabler/icons-react'
import { Command, GalleryVerticalEnd, AudioWaveform } from 'lucide-react'

export const sidebarData = {
  user: {
    name: 'Ahmed Benali',
    email: 'ahmed.benali@bank-dz.com',
    avatar: '/avatars/ahmed-benali.jpg',
  },
  teams: [
    {
      name: 'Bank Dashboard',
      logo: Command,
      plan: 'HR Management System',
    },
    {
      name: 'Regional Directorate',
      logo: GalleryVerticalEnd,
      plan: 'Algiers Branch',
    },
    {
      name: 'Credit Department',
      logo: AudioWaveform,
      plan: 'Risk Management',
    },
  ],
  navGroups: [
    {
      title: 'sidebar.groups.general',
      items: [
        {
          title: 'sidebar.dashboard',
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: 'sidebar.tasks',
          url: '/tasks',
          icon: IconChecklist,
        },
        {
          title: 'sidebar.users',
          url: '/users',
          icon: IconUsers,
        },
      ],
    },
    {
      title: 'sidebar.groups.backoffice',
      items: [
        {
          title: 'sidebar.bank',
          icon: IconLockAccess,
          items: [
            {
              title: 'sidebar.informationSheet',
              url: '/information-sheet',
              icon: IconFileDescription,
            },
          ],
        },
        {
          title: 'sidebar.errors',
          icon: IconBug,
          items: [
            {
              title: 'sidebar.unauthorized',
              url: '/401',
              icon: IconLock,
            },
            {
              title: 'sidebar.forbidden',
              url: '/403',
              icon: IconUserOff,
            },
            {
              title: 'sidebar.notFound',
              url: '/404',
              icon: IconError404,
            },
            {
              title: 'sidebar.internalServerError',
              url: '/500',
              icon: IconServerOff,
            },
            {
              title: 'sidebar.maintenanceError',
              url: '/503',
              icon: IconBarrierBlock,
            },
          ],
        },
      ],
    },
    {
      title: 'sidebar.groups.other',
      items: [
        {
          title: 'sidebar.settings',
          icon: IconSettings,
          items: [
            {
              title: 'sidebar.profile',
              url: '/settings',
              icon: IconUserCog,
            },
            {
              title: 'sidebar.account',
              url: '/settings/account',
              icon: IconTool,
            },
            {
              title: 'sidebar.appearance',
              url: '/settings/appearance',
              icon: IconPalette,
            },
            {
              title: 'sidebar.notifications',
              url: '/settings/notifications',
              icon: IconNotification,
            },
          ],
        },
        {
          title: 'sidebar.helpCenter',
          url: '/help-center',
          icon: IconHelp,
        },
      ],
    },
  ],
}