import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { FaGasPump, FaPhoneAlt, FaRoad } from 'react-icons/fa'
import type { Vehicle } from '../types/vehicle'
import { formatNumber, formatPrice } from '../utils/format'
import { business } from '../data/business'
import { trackContactCta } from '../utils/ctaTracking'

type VehicleCardProps = {
  vehicle: Vehicle
}

export const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const isSold = vehicle.status?.toLowerCase() === 'sold'

  return (
    <motion.article
      className={`relative flex h-full min-h-[474px] flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition ${
        isSold
          ? 'border-blue-950/10 shadow-blue-950/5'
          : 'border-blue-950/10 shadow-blue-950/5 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10'
      }`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Link to={`/inventory/${vehicle.slug}`} className="block">
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="h-56 w-full object-cover"
          loading="lazy"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="grid min-h-[82px] grid-cols-[1fr_auto] items-start gap-3">
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-xl font-semibold text-zinc-950">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h3>
            <p className="mt-1 truncate text-sm font-semibold text-zinc-500">{vehicle.trim}</p>
          </div>
          <p className="shrink-0 text-xl font-semibold text-blue-800">{formatPrice(vehicle.price, vehicle.status)}</p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm font-semibold text-zinc-700">
          <span className="flex min-h-9 items-center gap-2 rounded-md bg-slate-100 px-3 py-2">
            <FaRoad className="text-blue-700" /> {formatNumber(vehicle.mileage)} mi
          </span>
          <span className="flex min-h-9 items-center gap-2 rounded-md bg-slate-100 px-3 py-2">
            <FaGasPump className="shrink-0 text-blue-700" /> <span className="line-clamp-2 leading-5">{vehicle.engine}</span>
          </span>
        </div>
        <div className="mt-auto grid gap-2 pt-5 sm:grid-cols-2">
          <Link
            to={`/inventory/${vehicle.slug}`}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-blue-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900"
          >
            View Details
          </Link>
          <a
            href={`tel:${business.phoneHref}`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-800 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-950/20 hover:bg-blue-900"
            onClick={() => trackContactCta('phone_click', 'Vehicle Card Phone')}
          >
            <FaPhoneAlt /> Call
          </a>
        </div>
      </div>
      {isSold ? <div className="pointer-events-none absolute inset-0 bg-zinc-950/20" /> : null}
    </motion.article>
  )
}
