import { LocaleSwitcher } from '@/components/locale-switcher'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { NavMenu } from './nav-menu'
import { Sidebar } from './sidebar/Index'

const Navbar = () => {
  const t = useTranslations()
  return (
    <nav className="fixed top-6 z-40 h-16 w-full">
      <div className="container mx-auto flex h-full items-center justify-between rounded-full border bg-background px-4 dark:border-slate-700/70">
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
        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LocaleSwitcher />
          </div>
          <AnimatedThemeToggler />

          <Button className="rounded-full">
            <Link href="/dashboard/create-token">{t('getStarted')}</Link>
          </Button>

          {/* Mobile Menu */}
          <div className="mt-2 scale-[1.1] md:hidden">
            <Sidebar />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
