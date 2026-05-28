import { NavLink, Outlet } from 'react-router'
import { FaBars, FaPhoneVolume, FaXmark } from 'react-icons/fa6'
import { useState } from 'react'
import { business } from '../data/business'
import MobileLeadBar from './MobileLeadBar'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/catalog', label: 'Equipment' },
  { to: '/service', label: 'Service' },
  { to: '/delivery', label: 'Delivery' },
  { to: '/warranty', label: 'Warranty' },
  { to: '/team', label: 'Team' },
  { to: '/contacts', label: 'Contacts' },
]

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3.5 py-2 text-sm font-extrabold transition ${
    isActive ? 'bg-emerald-950 text-white shadow-sm' : 'text-stone-700 hover:bg-stone-100 hover:text-emerald-950'
  }`

const Layout = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen pb-16 text-stone-900 md:pb-0">
      <header className="sticky top-0 z-40 border-b border-stone-300 bg-white shadow-sm">
        <div className="border-b border-stone-800 bg-stone-950">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs font-semibold sm:px-6 lg:px-8">
            <span className="text-stone-300">Used tractors, skid steers, hay tools, and implements</span>
            <span className="hidden text-stone-300 sm:inline">{business.hours} / {business.shortLocation} / {business.phone}</span>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
            <img
              src="/images/vess-logo.png"
              alt={`${business.name} logo`}
              className="h-12 w-40 object-contain sm:h-14 sm:w-48 lg:h-16 lg:w-56"
              loading="eager"
              decoding="async"
            />
          </NavLink>

          <nav className="hidden flex-1 items-center justify-center gap-2 lg:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <a href={`tel:${business.phoneHref}`} className="premium-button hidden shrink-0 items-center gap-2 text-sm md:flex">
            <FaPhoneVolume /> {business.phone}
          </a>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-md border border-stone-300 bg-white text-stone-800 shadow-sm lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            {open ? <FaXmark /> : <FaBars />}
          </button>
        </div>
        {open && (
          <nav className="border-t border-stone-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-2">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} className={linkClass} onClick={() => setOpen(false)}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-stone-800 bg-[linear-gradient(135deg,#0c1f17_0%,#1c1917_55%,#0f2d20_100%)] pb-20 text-stone-300 md:pb-0">
        <div className="mx-auto grid max-w-7xl gap-7 px-4 py-8 sm:px-6 md:grid-cols-[1.35fr_.8fr_.9fr] md:gap-10 md:py-12 lg:px-8">
          <div className="rounded-md border border-white/10 bg-white/[0.03] p-5 md:border-0 md:bg-transparent md:p-0">
            <div className="flex items-center gap-4">
              <img
                src="/images/vess-logo.png"
                alt={`${business.name} logo`}
                className="h-16 w-52 shrink-0 object-contain sm:h-20 sm:w-64"
                loading="lazy"
                decoding="async"
              />
              <div className="hidden sm:block">
                <h2 className="text-2xl font-extrabold text-white">{business.name}</h2>
                <p className="mt-1 text-sm font-bold uppercase tracking-[0.18em] text-lime-300">Sales / Service / Delivery</p>
              </div>
            </div>
            <h2 className="mt-5 text-2xl font-extrabold text-white sm:hidden">{business.name}</h2>
            <p className="mt-4 max-w-xl leading-7 text-stone-400">
              Inspected pre-owned agricultural and compact equipment, practical service support, and clear delivery coordination for working buyers.
            </p>
            <p className="mt-3 text-sm font-semibold text-stone-500">{business.legalNote}. Location, service, and delivery details are confirmed during the sales follow-up.</p>
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.03] p-5 md:border-0 md:bg-transparent md:p-0">
            <h3 className="font-semibold text-white">Departments</h3>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-1">
              <NavLink to="/catalog" className="hover:text-lime-300">Equipment</NavLink>
              <NavLink to="/service" className="hover:text-lime-300">Service</NavLink>
              <NavLink to="/delivery" className="hover:text-lime-300">Delivery</NavLink>
              <NavLink to="/team" className="hover:text-lime-300">Team</NavLink>
            </div>
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.03] p-5 md:border-0 md:bg-transparent md:p-0">
            <h3 className="font-semibold text-white">Contact</h3>
            <a href={business.mapsUrl} target="_blank" rel="noreferrer" className="mt-3 block text-sm leading-6 hover:text-lime-300">
              {business.address}<br />{business.cityState}
            </a>
            <a href={`tel:${business.phoneHref}`} className="mt-3 inline-flex rounded-md bg-lime-300 px-3 py-2 text-sm font-extrabold text-stone-950">
              {business.phone}
            </a>
          </div>
        </div>
      </footer>
      <MobileLeadBar />
    </div>
  )
}

export default Layout
