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
  SidebarRail,
} from '@/components/ui/sidebar'
import { NAV_DATA } from '@/constants/nav'
import { Link } from '@/i18n/navigation'
import { NavMain } from './nav-main'
import { NavProjects } from './nav-projects'
import SiteHeader from './site-header'
import { TeamSwitcher } from './team-switcher'

export const AppSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" variant="sidebar">
        <SidebarMenu>
          <SidebarHeader>
            <TeamSwitcher />
          </SidebarHeader>
        </SidebarMenu>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {NAV_DATA.client.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon className="size-4" />
                        lorem
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <NavMain />
          <NavProjects />
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                {NAV_DATA.navSecondary.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild size="sm">
                      <Link href={item.url}>
                        <item.icon />
                        lorem
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          {/* <Suspense
            fallback={<Skeleton className="muted h-10 w-full animate-pulse" />}
          >
            <NavUser />
          </Suspense> */}
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="h-svh overflow-hidden contain-inline-size">
        <SiteHeader />
        <div className="min-h-0 flex-1 overflow-auto">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
