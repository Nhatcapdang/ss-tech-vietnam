import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { BadgeCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'
import { XLogo } from '../../public/svgs'
import { GlowingEffect } from './ui/glowing-effect'
import { Marquee } from './ui/marquee'

interface TestimonialType {
  id: number
  name: string
  handle: string
  role: string
  testimonial: string
  verified: boolean
  date: string
  avatar: string
}

const testimonials: TestimonialType[] = [
  {
    id: 1,
    name: 'Alex Chen',
    handle: '@cryptoalex',
    role: 'Meme Coin Creator',
    testimonial:
      'Launched my $DOGE2.0 in literally 3 minutes. This is insane! 🚀 Already at 1000 holders. To the moon!',
    verified: true,
    date: '2h ago',
    avatar: 'AC',
  },
  {
    id: 2,
    name: 'Sarah Dev',
    handle: '@sarahbuilds',
    role: 'Blockchain Developer',
    testimonial:
      "As a developer, I'm impressed by the clean interface and robust token management. Burned 50% supply with one click.",
    verified: true,
    date: '5h ago',
    avatar: 'SD',
  },
  {
    id: 3,
    name: 'Mike Solana',
    handle: '@mikeonsolana',
    role: 'DeFi Enthusiast',
    testimonial:
      'Best Solana token platform hands down. Created, pooled, and listed in under 5 mins. GM to the moon missions! ☀️',
    verified: false,
    date: '1d ago',
    avatar: 'MS',
  },
  {
    id: 4,
    name: 'Emma Token',
    handle: '@emmaonchain',
    role: 'Crypto Trader',
    testimonial:
      'The liquidity pool integration is seamless. Saved hours compared to manual setup. Professional grade tool.',
    verified: true,
    date: '2d ago',
    avatar: 'ET',
  },
  {
    id: 5,
    name: 'Jake Meme',
    handle: '@jakethememe',
    role: 'Content Creator',
    testimonial:
      'Just minted my first meme coin! The process was so smooth even my grandma could do it 😂',
    verified: false,
    date: '3d ago',
    avatar: 'JM',
  },
  {
    id: 6,
    name: 'Olivia Web3',
    handle: '@oliviaweb3',
    role: 'Token Manager',
    testimonial:
      'Updated my token metadata instantly. No more waiting for validators. This is the future of token launches.',
    verified: true,
    date: '4d ago',
    avatar: 'OW',
  },
  {
    id: 7,
    name: 'Ryan Crypto',
    handle: '@ryancrypto',
    role: 'NFT Artist',
    testimonial:
      'Launched $PEPE2024 for my art collection. Gas fees are practically zero on Solana! 10x better than ETH.',
    verified: true,
    date: '5d ago',
    avatar: 'RC',
  },
  {
    id: 8,
    name: 'Luna DeFi',
    handle: '@lunadefi',
    role: 'Yield Farmer',
    testimonial:
      'The automated liquidity provision is genius. Set it and forget it. Already earning 200% APY! 🌙',
    verified: false,
    date: '6d ago',
    avatar: 'LD',
  },
  {
    id: 9,
    name: 'Max Validator',
    handle: '@maxvalidator',
    role: 'Solana Validator',
    testimonial:
      'As a validator, I can confirm this platform follows best practices. Clean code, secure transactions. Impressed!',
    verified: true,
    date: '1w ago',
    avatar: 'MV',
  },
  {
    id: 10,
    name: 'Zoe Moonshot',
    handle: '@zoemoonshot',
    role: 'Meme Coin Hunter',
    testimonial:
      'Found 3 gems here already! $DOGE, $SHIB, $BONK vibes. This is where the next 1000x coin will launch 🎯',
    verified: false,
    date: '1w ago',
    avatar: 'ZM',
  },
  {
    id: 11,
    name: 'Carlos Builder',
    handle: '@carlosbuilds',
    role: 'dApp Developer',
    testimonial:
      'Integrated their API into my dApp. Documentation is top-notch, support team responds in minutes. A+',
    verified: true,
    date: '2w ago',
    avatar: 'CB',
  },
  {
    id: 12,
    name: 'Ava Hodler',
    handle: '@avahodler',
    role: 'Diamond Hands',
    testimonial:
      'Been holding since day 1. Platform keeps getting better. New features every week. WAGMI! 💎🙌',
    verified: true,
    date: '2w ago',
    avatar: 'AH',
  },
]

const Testimonial = React.memo(() => {
  const t = useTranslations('testimonials')
  return (
    <section
      id="testimonials-section"
      className="relative overflow-hidden bg-background py-16 md:py-24 lg:py-32"
      aria-labelledby="testimonials-heading"
    >
      {/* Container */}
      <div className="relative">
        {/* Section Header */}
        <div className="mx-auto max-w-max px-4 text-center sm:px-6">
          <h2
            id="testimonials-heading"
            className="font-display text-2xl leading-tight font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
          >
            {t('title')}{' '}
            <span className="text-linear-gradient">{t('title_highlight')}</span>{' '}
            {t('title_suffix')}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base md:text-lg lg:text-xl">
            {t('description')}
          </p>
        </div>

        {/* Testimonials Marquee */}
        <div
          className="relative mt-8 overflow-hidden rounded-lg sm:mt-12 lg:mt-16"
          role="list"
          aria-label="User testimonials"
        >
          {/* Fade edges */}
          {/* <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[10%] bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[10%] bg-gradient-to-l from-background to-transparent" /> */}

          {/* First row - scrolling left to right */}
          <Marquee
            pauseOnHover
            className="[--duration:40s] [--gap:1rem] sm:[--gap:1.5rem]"
          >
            {testimonials.slice(0, 6).map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </Marquee>

          {/* Second row - scrolling right to left */}
          <Marquee
            pauseOnHover
            reverse
            className="mt-4 [--duration:40s] [--gap:1rem] sm:mt-6 sm:[--gap:1.5rem]"
          >
            {testimonials.slice(6, 12).map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </Marquee>
        </div>
      </div>

      {/* Background Gradient */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"
        aria-hidden="true"
      />
    </section>
  )
})

const TestimonialCard = React.memo(
  ({ testimonial }: { testimonial: TestimonialType }) => {
    return (
      <div
        className={cn(
          'group relative flex w-full max-w-[380px] min-w-[280px] flex-col rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm sm:p-6',
          'transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/10'
        )}
        role="listitem"
      >
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        {/* Card Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-1 items-start gap-2 sm:gap-3">
            <Avatar className="size-10 shrink-0 border-2 border-primary/20 sm:size-12">
              <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary sm:text-base">
                {testimonial.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <h3 className="truncate text-sm font-semibold text-foreground sm:text-base">
                  {testimonial.name}
                </h3>
                {testimonial.verified && (
                  <BadgeCheck
                    className="size-3 shrink-0 text-primary sm:size-4"
                    aria-label="Verified user"
                  />
                )}
              </div>
              <p className="truncate text-xs text-muted-foreground sm:text-sm">
                {testimonial.handle}
              </p>
            </div>
          </div>

          {/* X Logo - Disabled Link */}
          <button
            className="shrink-0 cursor-not-allowed opacity-50"
            disabled
            aria-label={`Visit ${testimonial.name}'s profile (temporarily disabled)`}
            title="Profile links temporarily disabled"
          >
            <XLogo className="size-4 text-foreground sm:size-5" />
          </button>
        </div>

        {/* Testimonial Text */}
        <p className="mt-3 flex-1 text-xs leading-relaxed text-foreground sm:mt-4 sm:text-sm lg:text-base">
          {testimonial.testimonial}
        </p>

        {/* Card Footer */}
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-border/50 pt-3 sm:mt-4 sm:pt-4">
          <Badge
            variant="secondary"
            className="shrink-0 text-[10px] sm:text-xs"
          >
            {testimonial.role}
          </Badge>
          <span className="shrink-0 text-[10px] text-muted-foreground sm:text-xs">
            {testimonial.date}
          </span>
        </div>

        {/* Hover Glow Effect */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(circle at 50% 0%, rgba(var(--primary) / 0.1), transparent 70%)',
          }}
          aria-hidden="true"
        />
      </div>
    )
  }
)

Testimonial.displayName = 'Testimonial'
TestimonialCard.displayName = 'TestimonialCard'

export default Testimonial
