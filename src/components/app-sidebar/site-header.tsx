'use client'

import { SidebarTrigger } from '@/components/ui/sidebar'
import { useOs } from '@/hooks/use-os'
import { formatForDisplay } from '@tanstack/react-hotkeys'
import { SearchIcon } from 'lucide-react'
import NotificationDot from '../notification-dot'
import BreadcrumbWithIcons from '../ui/breadcrumb-withIcons'
import { Button } from '../ui/button'
import { Kbd } from '../ui/kbd'
import { LocaleSwitcher } from '../ui/locale-switcher'

function SiteHeader() {
  const os = useOs()
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 liquid-glass transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center gap-1 px-4">
        <div className="flex items-center">
          <SidebarTrigger size="icon-lg" />

          <BreadcrumbWithIcons />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            aria-label="Search (Command K)"
            onClick={() => {
              document.dispatchEvent(
                new KeyboardEvent('keydown', {
                  key: 'k',
                  metaKey: os === 'macos',
                  ctrlKey: os !== 'macos',
                  bubbles: true,
                })
              )
            }}
          >
            <SearchIcon aria-hidden="true" />
            <span className="hidden md:flex">Search</span>
            <Kbd className="hidden md:flex">{formatForDisplay('Mod+K')}</Kbd>
          </Button>

          <NotificationDot />
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  )
}
export default SiteHeader
