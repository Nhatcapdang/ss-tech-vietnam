import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import { NavMenu } from './nav-menu'

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-6 py-3">
        <Image
          src="/svgs/nhat-cap-dang-text.svg"
          width="0"
          height="0"
          sizes="(max-width: 768px) 124px, 36px"
          alt="Nhat Cap Dang"
          loading="lazy"
          unoptimized
          className="w-[124px] brightness-0 md:w-[200px] dark:brightness-100"
        />
        <NavMenu orientation="vertical" className="mt-6 [&>div]:h-full" />
      </SheetContent>
    </Sheet>
  )
}
