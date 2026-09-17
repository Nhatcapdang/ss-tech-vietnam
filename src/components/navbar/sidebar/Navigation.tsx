import { LocaleSwitcher } from '@/components/locale-switcher'
import { motion } from 'framer-motion'
import MenuItem from './MenuItem'

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    height: '100vh',
    y: 0,
    opacity: 1,
    display: 'block',
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
    height: '20vh',
    y: 50,
    opacity: 0,
    display: 'none',
  },
}

export const NAV_ITEMS = [
  { title: 'home', href: '#hero-section' },
  { title: 'explore', href: '#integration-section' },
  { title: 'testimonials', href: '#testimonials-section' },
  { title: 'faq', href: '#faq-section' },
]

export const Navigation = ({ toggle }: { toggle: () => void }) => {
  return (
    <motion.div
      variants={variants}
      className="absolute top-[40px] right-0 -z-10 flex w-[350px] items-center justify-center rounded-md border border-border shadow-lg liquid-glass"
    >
      <motion.ul className="w-full overflow-hidden">
        {NAV_ITEMS.map((item, idx) => (
          <MenuItem {...item} key={idx} toggle={toggle} />
        ))}
        <motion.li className="flex items-center justify-center transition-colors duration-300 [&_button]:mx-4 [&_button]:w-full">
          <LocaleSwitcher />
        </motion.li>
      </motion.ul>
    </motion.div>
  )
}
