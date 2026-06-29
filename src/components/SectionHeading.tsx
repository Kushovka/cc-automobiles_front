import { motion } from 'framer-motion'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  text?: string
}

export const SectionHeading = ({ eyebrow, title, text }: SectionHeadingProps) => (
  <motion.div
    className="mx-auto mb-8 max-w-3xl text-center"
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.32, ease: 'easeOut' }}
  >
    {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-800">{eyebrow}</p> : null}
    <h2 className="mt-2 text-3xl font-semibold text-zinc-950 sm:text-4xl">{title}</h2>
    {text ? <p className="mt-3 text-lg leading-8 text-zinc-600">{text}</p> : null}
  </motion.div>
)
