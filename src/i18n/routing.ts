import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'vi'],
  defaultLocale: 'en',
  // Remove locale prefix from URLs when it matches default locale
  localePrefix: 'as-needed',
  // Optional: detect locale from Accept-Language header
  localeDetection: true,
})
