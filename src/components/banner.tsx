'use client'
import { Link } from '@/i18n/navigation'
import Spline from '@splinetool/react-spline'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Suspense } from 'react'
import { Button } from './ui/button'
import { Spinner } from './ui/spinner'
// const Spline = dynamic(
//   () => import('@splinetool/react-spline').then(mod => mod.default),
//   {
//     ssr: false,
//     loading: () => <Spinner className="size-10 animate-spin mx-auto" />,
//   },
// );

const Banner = () => {
  return (
    <section className="container">
      <div className="relative h-[400px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-primary/50 to-secondary/50 lg:flex lg:flex-row lg:items-center lg:justify-center">
        {/* Spline Section - Background on mobile, side-by-side on desktop */}
        <div className="absolute inset-0 h-[130%] lg:relative lg:w-1/2">
          <Suspense
            fallback={<Spinner className="mx-auto size-10 animate-spin" />}
          >
            <Spline scene="https://prod.spline.design/gPdcU3Ax7vIrg-yM/scene.splinecode" />
          </Suspense>
        </div>

        {/* Content Section - Overlay on mobile, side-by-side on desktop */}
        <div className="absolute z-10 flex w-full justify-start lg:relative lg:z-auto lg:w-1/2 lg:items-center">
          <div className="mx-6 w-full rounded-2xl p-6 liquid-glass sm:mx-8 sm:p-8 lg:mx-0 lg:p-8">
            <div className="flex flex-col items-start justify-center space-y-4 sm:space-y-6 md:space-y-8">
              <Button
                variant="outline"
                className="rounded-full liquid-glass"
                size="sm"
              >
                <Sparkles
                  className="size-3 animate-pulse sm:size-4"
                  aria-hidden="true"
                />
                <span>Are you ready?</span>
              </Button>
              {/* Main Heading */}
              <h1
                id="banner-heading"
                className="font-display text-2xl leading-tight font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
              >
                Your life&apos;s journey begins here
              </h1>

              {/* CTA Button */}
              <Link href="/dashboard/create-token">
                <Button
                  size="default"
                  className="group w-full text-sm sm:w-auto sm:text-base md:text-lg"
                >
                  Get Started
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1 sm:size-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Banner
