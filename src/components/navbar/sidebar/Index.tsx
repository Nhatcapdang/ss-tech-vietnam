'use client'

import { useDimensions } from '@/hooks/use-dimensions'
import { motion, useCycle, Variants } from 'framer-motion'
import * as React from 'react'
import { useRef } from 'react'
import { MenuToggle } from './MenuToggle'
import { Navigation } from './Navigation'

const sidebar: Variants = {
  open: {
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  },
  closed: {
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
}

export const Sidebar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true)
  const containerRef = useRef(null)
  useDimensions(containerRef)
  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      ref={containerRef}
      className="relative z-50 min-[850px]:hidden"
    >
      <motion.div className="background" variants={sidebar} />
      <Navigation toggle={() => toggleOpen()} />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  )
}
