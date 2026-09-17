import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { LocaleSwitcher } from './locale-switcher'
import { AnimatedThemeToggler } from './ui/animated-theme-toggler'

const Footer = () => {
  const t = useTranslations()
  return (
    <div className="flex flex-col">
      <div className="grow bg-muted" />
      <footer className="border-t">
        <div className="mx-auto max-w-(--breakpoint-xl)">
          <div className="flex flex-col items-start justify-between gap-x-8 gap-y-10 px-6 py-12 sm:flex-row xl:px-0">
            <div>
              <Image
                src="/svgs/nhat-cap-dang-text.svg"
                width="0"
                height="0"
                sizes="(max-width: 768px) 124px, 36px"
                alt="Nhat Cap Dang"
                loading="lazy"
                unoptimized
                className="w-[200px] brightness-0 dark:brightness-100"
              />
              <div className="mt-6 flex items-center gap-3">
                <LocaleSwitcher />
                <AnimatedThemeToggler />
              </div>
            </div>
            {/* Subscribe Newsletter */}
            <div className="w-full max-w-xs">
              <h6 className="font-medium">Stay up to date</h6>
              <form className="my-6 flex items-center gap-2">
                <Input type="email" placeholder="Enter your email" />
                <Button>Subscribe</Button>
              </form>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col-reverse items-center justify-between gap-x-2 gap-y-5 px-6 py-8 sm:flex-row xl:px-0">
            {/* Copyright */}
            <span className="text-muted-foreground">
              &copy; {new Date().getFullYear()} nhatcapdang.com.{' '}
              {t('footer.allRightsReserved')}
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
