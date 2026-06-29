import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { FaBars, FaPhoneAlt, FaTimes } from 'react-icons/fa'
import { business } from '../data/business'
import { trackContactCta } from '../utils/ctaTracking'
import { Button } from './Button'

const navItems = [
  { label: 'Inventory', href: '/inventory' },
  { label: 'Financing', href: '/financing' },
  { label: 'Trade-In', href: '/trade-in' },
  { label: 'Delivery', href: '/delivery' },
  { label: 'Warranty', href: '/warranty' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const Header = () => {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      className="sticky top-0 z-40 border-b border-blue-950/10 bg-white/95 backdrop-blur"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 xl:px-8">
        <Link to="/" className="block" onClick={() => setOpen(false)}>
          <img
            src="/images/cc-automobiles-logo-blue-cropped.png"
            alt={`${business.name} Inc.`}
            className="h-14 w-36 object-contain object-left sm:h-16 sm:w-44 xl:w-48"
          />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-blue-50 text-blue-900'
                    : 'text-zinc-700 hover:bg-blue-50 hover:text-blue-900'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <a href={`tel:${business.phoneHref}`} className="text-sm font-semibold text-blue-950" onClick={() => trackContactCta('phone_click', 'Header Phone')}>
            {business.phone}
          </a>
          <Button href={`tel:${business.phoneHref}`} className="px-4">Call Now</Button>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <a
            aria-label="Call C&C Automobiles"
            href={`tel:${business.phoneHref}`}
            className="grid h-11 w-11 place-items-center rounded-md bg-blue-800 text-white shadow-sm shadow-blue-950/20"
            onClick={() => trackContactCta('phone_click', 'Mobile Header Phone')}
          >
            <FaPhoneAlt />
          </a>
          <button
            aria-label="Open menu"
            className="grid h-11 w-11 place-items-center rounded-md border border-blue-950/10 text-blue-950"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-blue-950/10 bg-white px-4 py-4 shadow-lg xl:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-3 py-3 text-base font-semibold transition ${
                    isActive
                      ? 'bg-blue-50 text-blue-900'
                      : 'text-zinc-900 hover:bg-blue-50 hover:text-blue-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      ) : null}
    </motion.header>
  )
}
