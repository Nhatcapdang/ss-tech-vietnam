import { useScrollSpy } from '@/hooks/useScrollSpy'
import { Link } from '@/i18n/navigation'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { AppConfig, MessageKeys, useTranslations } from 'next-intl'
import * as React from 'react'

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

const MenuItem = ({
  title,
  href,
  toggle,
}: {
  title: string
  href: string
  toggle: () => void
}) => {
  const { scrollToSection, isActive } = useScrollSpy([
    'hero-section',
    'integration-section',
    'testimonials-section',
    'faq-section',
  ])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToSection(href)
    toggle()
  }

  const t = useTranslations('nav')

  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={clsx(
        'relative flex cursor-pointer items-center justify-center text-[32px]/[39px] font-bold text-foreground transition-colors duration-300 hover:text-primary',
        {
          'text-primary': isActive(href),
        }
      )}
    >
      <Link
        href={href}
        className="h-full w-full py-6 text-center"
        onClick={handleClick}
      >
        {t(title as MessageKeys<AppConfig['Messages'], never>)}
      </Link>
    </motion.li>
  )
}

export default MenuItem
