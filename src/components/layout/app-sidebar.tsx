import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { NavGroup } from '@/components/layout/nav-group'
import { NavUser } from '@/components/layout/nav-user'
import { TeamSwitcher } from '@/components/layout/team-switcher'
import { LanguageSwitcher } from '@/components/language-switcher'
import { sidebarData } from './data/sidebar-data'
import type { NavGroup as NavGroupType } from './types'
import { useAuthStore } from '@/stores/authStore'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore((state) => state.auth)

  // Use authenticated user data or fallback to default
  const userData = user
    ? {
        name: user.name,
        email: user.email,
        avatar: user.avatar || '/avatars/default.jpg',
      }
    : sidebarData.user

  return (
    <Sidebar collapsible='icon' variant='floating' {...props}>
      <SidebarHeader>
        <div className='flex items-center justify-between gap-2'>
          <TeamSwitcher teams={sidebarData.teams} />
          <LanguageSwitcher />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((group) => (
          <NavGroup 
            key={group.title} 
            title={group.title} 
            items={group.items as NavGroupType['items']} 
          />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}