import Orb from '@/components/Orb'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { Coins, Flame, RefreshCw, Waves, XCircle } from 'lucide-react'
import { AppConfig, MessageKeys, useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'

const features = [
  {
    icon: Coins,
    title: 'create_token',
    description: 'create_token_description',
  },
  {
    icon: Flame,
    title: 'burn_token',
    description: 'burn_token_description',
  },
  {
    icon: RefreshCw,
    title: 'update_metadata',
    description: 'update_token_description',
  },
  {
    icon: XCircle,
    title: 'close_token_account',
    description: 'close_account_description',
  },
  {
    icon: Waves,
    title: 'liquidity_pool',
    description: 'liquidity_pool_description',
  },
]
/**
 * Hero section component for Solana meme coin platform
 * Features a split layout with content on the left and animated gradient orb on the right
 * Optimized with React.memo to prevent unnecessary re-renders
 */
const Hero = React.memo(() => {
  const t = useTranslations()
  return (
    <section
      id="hero-section"
      className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-background"
      aria-labelledby="hero-heading"
    >
      {/* Container */}
      <div className="relative z-10 container">
        <div className="grid min-h-[calc(100vh-4rem)] grid-cols-1 items-center gap-8 py-12 md:py-16 lg:grid-cols-2 lg:gap-12 lg:py-24 xl:py-32">
          {/* Left Content */}
          <div className="flex flex-col items-start space-y-6 md:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary backdrop-blur-sm">
              <span className="text-muted-foreground">Powered by</span>
              <Link
                href="https://www.metaplex.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
                aria-label="Visit Metaplex"
              >
                <Image
                  src="/svgs/metaplex-logo.svg"
                  alt="Metaplex"
                  width={24}
                  height={24}
                  className="size-6"
                />
              </Link>
              <span className="text-muted-foreground">&</span>
              <Link
                href="https://solana.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
                aria-label="Visit Solana"
              >
                <Image
                  src="/svgs/solana-logo.svg"
                  alt="Solana"
                  width={24}
                  height={24}
                  className="size-6"
                />
              </Link>
            </div>

            {/* Main Heading */}
            <h1
              id="hero-heading"
              className="font-display text-4xl leading-tight font-bold tracking-tight md:text-5xl lg:text-6xl xl:text-7xl"
            >
              {t.rich('key_highlight', {
                span: (chunks: React.ReactNode) => (
                  <span className="text-linear-gradient">{chunks}</span>
                ),
              })}
            </h1>

            {/* Subheading */}
            <div className="space-y-2">
              <p className="text-xl font-semibold text-foreground md:text-2xl lg:text-3xl">
                {t('subtitle')}
              </p>
              <p className="text-base text-muted-foreground md:text-lg lg:text-xl">
                {t('description')}
              </p>
            </div>

            {/* Feature List */}
            <div
              className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4"
              role="list"
              aria-label="Platform features"
            >
              {features.map(feature => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.title}
                    className="flex items-start gap-3 rounded-lg border border-border/50 bg-card/50 p-3 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80 lg:p-4"
                    role="listitem"
                  >
                    <div
                      className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10"
                      aria-hidden="true"
                    >
                      <Icon className="size-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-sm font-semibold text-foreground lg:text-base">
                        {t(
                          feature.title as MessageKeys<
                            AppConfig['Messages'],
                            never
                          >
                        )}
                      </h2>
                      <p className="text-xs text-muted-foreground lg:text-sm">
                        {t(
                          feature.description as MessageKeys<
                            AppConfig['Messages'],
                            never
                          >
                        )}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA Button */}
            <Button
              size="lg"
              className="mt-2 min-w-[250px] text-base md:text-lg"
            >
              <Link
                href="/dashboard/create-token"
                aria-label="Get started with token creation"
              >
                {t('getStarted')}
              </Link>
            </Button>
          </div>

          {/* Right Visual - Orb Background */}
          <div className="relative flex items-center justify-center lg:min-h-[600px]">
            {/* Orb Container */}
            <div className="relative aspect-square w-full max-w-lg">
              {/* Main Orb */}
              <div className="absolute inset-0 opacity-90">
                <Orb
                  hue={280}
                  hoverIntensity={0.3}
                  rotateOnHover={true}
                  forceHoverState={false}
                />
              </div>

              {/* Floating Feature Badges with Glassmorphism */}
              <div
                className="absolute top-[15%] left-[10%] rounded-xl border border-white/20 bg-background/60 px-4 py-2 shadow-lg backdrop-blur-md transition-transform hover:scale-105 sm:px-5 sm:py-3"
                aria-hidden="true"
              >
                <div className="flex items-center gap-2">
                  <Coins className="size-5 text-primary sm:size-6" />
                  <span className="text-sm font-semibold text-foreground sm:text-base">
                    Create
                  </span>
                </div>
              </div>

              <div
                className="absolute top-[25%] right-[10%] rounded-xl border border-white/20 bg-background/60 px-4 py-2 shadow-lg backdrop-blur-md transition-transform hover:scale-105 sm:px-5 sm:py-3"
                aria-hidden="true"
              >
                <div className="flex items-center gap-2">
                  <Flame className="size-5 text-destructive sm:size-6" />
                  <span className="text-sm font-semibold text-foreground sm:text-base">
                    Burn
                  </span>
                </div>
              </div>

              <div
                className="absolute bottom-[20%] left-[15%] rounded-xl border border-white/20 bg-background/60 px-4 py-2 shadow-lg backdrop-blur-md transition-transform hover:scale-105 sm:px-5 sm:py-3"
                aria-hidden="true"
              >
                <div className="flex items-center gap-2">
                  <Waves className="size-5 text-chart-2 sm:size-6" />
                  <span className="text-sm font-semibold text-foreground sm:text-base">
                    Pool
                  </span>
                </div>
              </div>

              <div
                className="absolute right-[12%] bottom-[15%] rounded-xl border border-white/20 bg-background/60 px-4 py-2 shadow-lg backdrop-blur-md transition-transform hover:scale-105 sm:px-5 sm:py-3"
                aria-hidden="true"
              >
                <div className="flex items-center gap-2">
                  <RefreshCw className="size-5 text-accent-foreground sm:size-6" />
                  <span className="text-sm font-semibold text-foreground sm:text-base">
                    Update
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Gradient Overlay */}
      <div
        className="pointer-events-none absolute inset-0 from-transparent via-background/50 to-background"
        aria-hidden="true"
      />
    </section>
  )
})

Hero.displayName = 'Hero'

export { Hero }
export default Hero
