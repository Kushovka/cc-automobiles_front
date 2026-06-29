import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { FaFacebookF, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'
import { business } from '../data/business'
import { trackContactCta } from '../utils/ctaTracking'

const links = [
  ['Inventory', '/inventory'],
  ['Financing', '/financing'],
  ['Trade-In', '/trade-in'],
  ['Delivery', '/delivery'],
  ['Warranty', '/warranty'],
  ['Contact', '/contact'],
]

const legalLinks = [
  ['Privacy Policy', '/privacy-policy'],
  ['Terms', '/terms'],
]

export const Footer = () => (
  <motion.footer
    className="bg-gradient-to-br from-black via-zinc-950 to-slate-950 pb-24 pt-12 text-white lg:pb-12"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
  >
    <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
      <div>
        <img
          src="/images/cc-automobiles-logo-blue-cropped.png"
          alt={`${business.name} Inc.`}
          className="h-28 w-64 object-contain object-left sm:w-80"
        />
        <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-300">
          A local Stratford used car dealership focused on clear answers, simple financing options, and vehicles that are ready for real daily driving.
        </p>
      </div>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-200">Quick Links</h3>
        <div className="mt-4 grid gap-2">
          {links.map(([label, href]) => (
            <Link key={href} to={href} className="text-sm font-semibold text-zinc-200 hover:text-white">
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-200">Contact</h3>
        <div className="mt-4 grid gap-3 text-sm font-semibold text-zinc-200">
          <a className="flex gap-3 hover:text-white" href={`tel:${business.phoneHref}`} onClick={() => trackContactCta('phone_click', 'Footer Phone')}>
            <FaPhoneAlt className="mt-1 text-blue-300" /> {business.phone}
          </a>
          <a className="flex gap-3 hover:text-white" href={business.mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackContactCta('directions_click', 'Footer Address')}>
            <FaMapMarkerAlt className="mt-1 text-blue-300" /> {business.address}, {business.cityState}
          </a>
          <a aria-label="Facebook" className="flex gap-3 hover:text-white" href="https://www.facebook.com/p/C-and-C-Automobiles-100064100162874/" target="_blank" rel="noreferrer">
            <FaFacebookF className="mt-1 text-blue-300" /> Facebook
          </a>
        </div>
      </div>
    </div>
    <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-white/10 px-4 pt-6 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:pr-28 lg:pl-8">
      <p>Copyright {new Date().getFullYear()} {business.name}. All rights reserved.</p>
      <div className="flex flex-wrap gap-4">
        {legalLinks.map(([label, href]) => (
          <Link key={href} to={href} className="font-semibold hover:text-white">
            {label}
          </Link>
        ))}
      </div>
    </div>
  </motion.footer>
)
