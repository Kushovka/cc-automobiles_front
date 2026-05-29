import { motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'

type RevealProps = PropsWithChildren<{
  immediate?: boolean
  className?: string
}>

export const PageFade = ({ children }: PropsWithChildren) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 12 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
)

export const Reveal = ({ children, immediate = false, className }: RevealProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 18 }}
    animate={immediate ? { opacity: 1, y: 0 } : undefined}
    whileInView={immediate ? undefined : { opacity: 1, y: 0 }}
    viewport={immediate ? undefined : { once: true, amount: 0.18 }}
    transition={{ duration: 0.45, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
)
