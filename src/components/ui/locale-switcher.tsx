'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePathname, useRouter } from '@/i18n/navigation'
import { Globe } from 'lucide-react'
import { AppConfig, useLocale, useMessages, useTranslations } from 'next-intl'
import { useTransition } from 'react'

export function LocaleSwitcher() {
  const t = useTranslations()
  const messages = useMessages()
  const [isPending, startTransition] = useTransition()

  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function handleLocaleChange(newLocale: AppConfig['Locale']) {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale })
      router.refresh()
    })
  }
  return (
    <Select
      value={locale}
      onValueChange={(value: AppConfig['Locale']) => {
        handleLocaleChange(value)
      }}
      disabled={isPending}
    >
      {/* **:data-[slot=select-icon]:max-md:hidden */}
      {/* **:data-[slot=select-value]:max-md:hidden md:flex */}
      <SelectTrigger className="w-full max-w-48">
        <Globe className="size-4" />
        <SelectValue placeholder={t('localeSwitcher.placeholder')} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {messages.localeSwitcher.languages.map(lang => (
            <SelectItem key={lang.value} value={lang.value}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
