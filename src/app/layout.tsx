import { CommandGlobal } from '@/components/ui/command-global'
import { DirectionProvider } from '@/components/ui/direction'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { StoreProvider, ThemeProvider } from '@/providers'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Inter } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html
      dir="ltr"
      lang={locale}
      suppressHydrationWarning
      className={cn('antialiased', 'font-sans', inter.variable)}
      data-scroll-behavior="smooth"
    >
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <StoreProvider>
            <DirectionProvider direction="ltr">
              <NuqsAdapter>
                <ThemeProvider>
                  <TooltipProvider openDelay={300}>
                    <CommandGlobal />
                    {children}
                    <Toaster />
                  </TooltipProvider>
                </ThemeProvider>
              </NuqsAdapter>
            </DirectionProvider>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
