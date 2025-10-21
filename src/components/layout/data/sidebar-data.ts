import {
  IconBug,
  IconBuildingBank,
  IconBuildingBridge,
  IconBuildingLighthouse,
  IconBuildingStore,
  IconBuildingWarehouse,
  IconBusinessplan,
  IconCalendarStats,
  IconCertificate,
  IconChartInfographic,
  IconChecklist,
  IconCircleCheck,
  IconCircleDashed,
  IconCircleX,
  IconClock,
  IconDeviceLaptop,
  IconError404,
  IconFileDescription,
  IconFileText,
  IconHelp,
  IconHierarchy,
  IconLayoutDashboard,
  IconLetterCase,
  IconLicense,
  IconList,
  IconListDetails,
  IconListNumbers,
  IconLock,
  IconLockAccess,
  IconMail,
  IconMessages,
  IconNotification,
  IconPalette,
  IconPencil,
  IconPhone,
  IconPrinter,
  IconServerOff,
  IconSettings,
  IconShieldLock,
  IconSitemap,
  IconTool,
  IconUser,
  IconUserCheck,
  IconUserCog,
  IconUserOff,
  IconUsers,
  IconBarrierBlock,
  IconBrowserCheck,
} from '@tabler/icons-react'
import { Building2, Command, GalleryVerticalEnd, AudioWaveform } from 'lucide-react'

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
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Tasks',
          url: '/tasks',
          icon: IconChecklist,
        },
        {
          title: 'Users',
          url: '/users',
          icon: IconUsers,
        },
      ],
    },
    {
      title: 'Backoffice',
      items: [
        {
          title: 'Bank',
          icon: IconLockAccess,
          items: [
            {
              title: 'Information Sheet',
              url: '/information-sheet',
              icon: IconFileDescription,
            },
            // Removed Print Reports from sidebar as requested
            // Users will access it through employee table actions instead
          ],
        },
        {
          title: 'Errors',
          icon: IconBug,
          items: [
            {
              title: 'Unauthorized',
              url: '/401',
              icon: IconLock,
            },
            {
              title: 'Forbidden',
              url: '/403',
              icon: IconUserOff,
            },
            {
              title: 'Not Found',
              url: '/404',
              icon: IconError404,
            },
            {
              title: 'Internal Server Error',
              url: '/500',
              icon: IconServerOff,
            },
            {
              title: 'Maintenance Error',
              url: '/503',
              icon: IconBarrierBlock,
            },
          ],
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: IconSettings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: IconUserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: IconTool,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: IconPalette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: IconNotification,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: IconBrowserCheck,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: IconHelp,
        },
      ],
    },
  ],
}