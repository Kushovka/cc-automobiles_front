import { FaCarSide, FaMapMarkedAlt, FaPhoneAlt } from 'react-icons/fa'
import { Link } from 'react-router'
import { business } from '../data/business'
import { trackContactCta } from '../utils/ctaTracking'

export const MobileLeadBar = () => (
  <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-blue-950/10 bg-white shadow-[0_-12px_28px_rgba(15,23,42,0.14)] lg:hidden">
    <a href={`tel:${business.phoneHref}`} className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-semibold text-blue-800" onClick={() => trackContactCta('phone_click', 'Mobile Lead Bar Phone')}>
      <FaPhoneAlt className="text-lg" /> Call Now
    </a>
    <Link to="/inventory" className="flex min-h-16 flex-col items-center justify-center gap-1 border-x border-blue-950/10 text-xs font-semibold text-blue-950">
      <FaCarSide className="text-lg" /> Inventory
    </Link>
    <a href={business.mapsUrl} target="_blank" rel="noreferrer" className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-semibold text-blue-950" onClick={() => trackContactCta('directions_click', 'Mobile Lead Bar Directions')}>
      <FaMapMarkedAlt className="text-lg" /> Directions
    </a>
  </div>
)
