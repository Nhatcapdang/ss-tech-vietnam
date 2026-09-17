'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePathname, useRouter } from '@/i18n/navigation'
import { Globe } from 'lucide-react'
import { AppConfig, useLocale, useTranslations } from 'next-intl'
import { useTransition } from 'react'

export function LocaleSwitcher() {
  const t = useTranslations('localeSwitcher')
  const [isPending, startTransition] = useTransition()

  const languages = [
    {
      value: 'en',
      label: 'English',
    },
    {
      value: 'vi',
      label: 'Vietnamese',
    },
  ]

  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function handleLocaleChange(newLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale as AppConfig['Locale'] })
      router.refresh()
    })
  }
  return (
    <Select
      value={locale}
      onValueChange={handleLocaleChange}
      disabled={isPending}
    >
      <SelectTrigger aria-label="language switcher">
        <Globe className="h-4 w-4" aria-hidden="true" />
        <SelectValue placeholder={t('placeholder')} />
      </SelectTrigger>
      <SelectContent>
        {languages.map(lang => (
          <SelectItem key={lang.value} value={lang.value}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
