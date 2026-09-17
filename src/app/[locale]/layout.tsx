import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { routing } from '@/i18n/routing'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<LocaleLayoutProps>) {
  const { locale } = await params

  const resolvedLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale
  setRequestLocale(resolvedLocale)

  if (!hasLocale(routing.locales, locale)) notFound()

  return children
}
