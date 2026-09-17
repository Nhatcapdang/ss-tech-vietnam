'use client'

import React, { forwardRef, memo, useRef } from 'react'

import { AnimatedBeam } from '@/components/ui/animated-beam'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { NhatCapDang } from '../../public/svgs'

const CircleBase = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      aria-label="Supported platforms"
      className={cn(
        'z-10 flex size-14 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-accent/90 p-1.5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] ring-1 ring-background/40 backdrop-blur-sm',
        'transition-transform will-change-transform',
        className
      )}
    >
      {children}
    </div>
  )
})

CircleBase.displayName = 'CircleBase'

const Circle = memo(CircleBase)
Circle.displayName = 'Circle'

export function AnimatedBeamMultipleOutputDemo({
  className,
}: {
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const div6Ref = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div4Ref = useRef<HTMLDivElement>(null)
  const div5Ref = useRef<HTMLDivElement>(null)
  const div7Ref = useRef<HTMLDivElement>(null)
  const div8Ref = useRef<HTMLDivElement>(null)
  const div9Ref = useRef<HTMLDivElement>(null)
  const div10Ref = useRef<HTMLDivElement>(null)
  const div11Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className={cn(
        'relative flex h-[560px] w-full items-center justify-center overflow-hidden p-6 md:p-10',
        'rounded-2xl',
        className
      )}
      ref={containerRef}
    >
      {/* premium soft glows */}
      {/* <div className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full bg-accent/20 blur-3xl" /> */}

      {/* center hub */}

      <Circle ref={div6Ref} className="size-20 bg-background/80">
        <div className="scale-50 rounded-full border border-border p-7 backdrop-blur-xl">
          <NhatCapDang />
        </div>
      </Circle>

      {/* satellites */}
      <Circle ref={div1Ref} className="absolute top-8 left-8 size-12">
        <Image
          aria-label="Dexscreener"
          src="/images/dexscreener.jpg"
          alt="Dexscreener"
          width={48}
          height={48}
          sizes="48px"
          loading="lazy"
          priority={false}
          className="h-full w-full rounded-full object-contain"
        />
      </Circle>

      <Circle ref={div2Ref} className="absolute top-6 right-14 size-12">
        <Image
          aria-label="Birdeye"
          src="/images/birdeye.png"
          alt="birdeye"
          width={48}
          height={48}
          sizes="48px"
          loading="lazy"
          priority={false}
          className="h-full w-full rounded-full object-contain"
        />
      </Circle>

      <Circle ref={div3Ref} className="absolute bottom-10 left-10 size-12">
        <Image
          aria-label="Dextools"
          src="/images/dextools.png"
          alt="dextools"
          width={48}
          height={48}
          sizes="48px"
          loading="lazy"
          priority={false}
          className="h-full w-full rounded-full object-contain"
        />
      </Circle>

      <Circle ref={div4Ref} className="absolute right-10 bottom-16 size-12">
        <Image
          aria-label="Photon"
          src="/images/photon.png"
          alt="photon"
          width={48}
          height={48}
          sizes="48px"
          loading="lazy"
          priority={false}
          className="h-full w-full rounded-full object-contain"
        />
      </Circle>

      <Circle
        ref={div5Ref}
        className="absolute top-1/2 right-16 size-12 translate-x-1/2"
      >
        <Image
          aria-label="Bubblemaps"
          src="/images/bubblemaps.png"
          alt="bubblemaps"
          width={48}
          height={48}
          sizes="48px"
          loading="lazy"
          priority={false}
          className="h-full w-full rounded-full object-contain"
        />
      </Circle>

      <Circle ref={div7Ref} className="absolute top-1/4 left-1/4 size-12">
        <Image
          aria-label="Rugcheck"
          src="/images/rugcheck.jpg"
          alt="rugcheck"
          width={48}
          height={48}
          sizes="48px"
          loading="lazy"
          priority={false}
          className="h-full w-full rounded-full object-contain"
        />
      </Circle>

      <Circle ref={div8Ref} className="absolute top-1/4 right-1/4 size-12">
        <Image
          aria-label="Okx"
          src="/images/okx.png"
          alt="okx"
          width={48}
          height={48}
          sizes="48px"
          loading="lazy"
          priority={false}
          className="h-full w-full rounded-full object-contain"
        />
      </Circle>

      <Circle ref={div9Ref} className="absolute bottom-1/4 left-1/5 size-12">
        <Image
          aria-label="Raydium"
          src="/images/raydium.png"
          alt="raydium"
          width={48}
          height={48}
          sizes="48px"
          loading="lazy"
          priority={false}
          className="h-full w-full rounded-full object-contain"
        />
      </Circle>

      <Circle ref={div10Ref} className="absolute right-1/5 bottom-6 size-12">
        <Image
          aria-label="Orca"
          src="/images/orca.png"
          alt="orca"
          width={48}
          height={48}
          sizes="48px"
          loading="lazy"
          priority={false}
          className="h-full w-full rounded-full object-contain"
        />
      </Circle>

      <Circle
        ref={div11Ref}
        className="absolute top-1/2 left-6 size-12 -translate-y-1/2"
      >
        <Image
          aria-label="Jupiter"
          src="/images/jupiter.png"
          alt="jupiter"
          width={48}
          height={48}
          sizes="48px"
          loading="lazy"
          priority={false}
          className="h-full w-full rounded-full object-contain"
        />
      </Circle>
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div1Ref}
        duration={3}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
        duration={3}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div6Ref}
        duration={3}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div8Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div9Ref}
        toRef={div6Ref}
        duration={3}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div10Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div11Ref}
        toRef={div6Ref}
        duration={3}
        reverse
      />
    </div>
  )
}
