'use client'

import { useState } from 'react'

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import { useHotkey } from '@tanstack/react-hotkeys'
import {
  BookOpenIcon,
  CornerDownLeftIcon,
  HouseIcon,
  InboxIcon,
  LifeBuoyIcon,
  LogOutIcon,
  MessageSquareIcon,
  MoonIcon,
} from 'lucide-react'
import { Kbd } from './kbd'

export function CommandGlobal() {
  const [open, setOpen] = useState(false)

  useHotkey('Mod+K', () => {
    setOpen(open => !open)
  })

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen} className="sm:max-w-lg">
        <Command className="**:data-[selected=true]:bg-muted **:data-selected:bg-transparent">
          <CommandInput placeholder="What do you need?" />
          <CommandList>
            <CommandEmpty>No actions found.</CommandEmpty>
            <CommandGroup heading="Navigate">
              <CommandItem>
                <HouseIcon />
                <span>Go to Dashboard</span>
                <CommandShortcut>⌘D</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <InboxIcon />
                <span>Go to Inbox</span>
                <CommandShortcut>⌘⇧I</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Quick Links">
              <CommandItem>
                <BookOpenIcon />
                <span>Documentation</span>
              </CommandItem>
              <CommandItem>
                <LifeBuoyIcon />
                <span>Help & Support</span>
              </CommandItem>
              <CommandItem>
                <MessageSquareIcon />
                <span>Contact Us</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="System">
              <CommandItem>
                <MoonIcon />
                <span>Toggle Dark Mode</span>
                <CommandShortcut>
                  <Kbd>D</Kbd>
                </CommandShortcut>
              </CommandItem>
              <CommandItem>
                <LogOutIcon />
                <span>Sign Out</span>
                <CommandShortcut>⌘Q</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
          <div className="flex h-10 items-center gap-2 rounded-b-xl border-t border-t-neutral-100 bg-neutral-50 px-4 text-xs font-medium text-muted-foreground dark:border-t-neutral-700 dark:bg-neutral-800">
            <Kbd>
              <CornerDownLeftIcon />
            </Kbd>
            Go to Page
          </div>
        </Command>
      </CommandDialog>
    </>
  )
}
