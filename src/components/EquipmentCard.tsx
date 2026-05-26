import { Link } from 'react-router'
import { FaCircleCheck, FaGaugeHigh, FaLocationDot, FaPhoneVolume, FaRegCalendar, FaTruckFast } from 'react-icons/fa6'
import type { Equipment } from '../types/equipment'
import { formatNumber, formatPrice } from '../utils/format'
import EquipmentVisual from './EquipmentVisual'
import { motion } from 'framer-motion'
import { business } from '../data/business'

type EquipmentCardProps = {
  item: Equipment
}

const EquipmentCard = ({ item }: EquipmentCardProps) => (
  <motion.article
    whileHover={{ y: -3 }}
    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    className="premium-card premium-card-hover group flex h-full flex-col overflow-hidden"
  >
    <Link to={`/equipment/${item.slug}`} className="block aspect-[4/3] overflow-hidden">
      <EquipmentVisual
        image={item.images[0]}
        title={item.title}
        category={item.category}
        className="transition duration-500"
      />
    </Link>
    <div className="flex flex-1 flex-col p-5">
      <div className="flex min-h-24 flex-col gap-3 2xl:flex-row 2xl:items-start 2xl:justify-between 2xl:gap-5">
        <div className="min-w-0">
          <p className="text-xs font-extrabold uppercase tracking-wide text-emerald-800">
            {item.status} / {item.condition} / {item.category}
          </p>
          <Link to={`/equipment/${item.slug}`} className="mt-2 line-clamp-2 text-2xl font-bold leading-snug text-stone-950 hover:text-emerald-900 xl:text-xl 2xl:text-2xl">
            {item.title}
          </Link>
        </div>
        <p className="shrink-0 rounded-md bg-stone-950 px-3 py-2 text-left text-xl font-black text-white 2xl:mt-5 2xl:text-right">{formatPrice(item.price)}</p>
      </div>
      <p className="mt-5 min-h-12 line-clamp-2 text-sm leading-6 text-stone-600">{item.short_description}</p>
      <div className="mt-5 grid grid-cols-2 gap-3 text-xs font-semibold text-stone-600 2xl:grid-cols-3">
        <span className="flex items-center gap-1.5">
          <FaRegCalendar className="text-emerald-800" /> {item.year}
        </span>
        <span className="flex items-center gap-1.5">
          <FaGaugeHigh className="text-emerald-800" />
          {item.engine_hours ? `${formatNumber(item.engine_hours)} h` : 'N/A'}
        </span>
        <span className="flex items-center gap-1.5">
          <FaLocationDot className="text-emerald-800" /> {item.location.split(',')[0]}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
        <span className="rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1 text-stone-700">Stock #{item.stock_number}</span>
        {item.delivery_available && (
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 text-emerald-900">
            <FaTruckFast /> Delivery
          </span>
        )}
        {item.financing_available && (
          <span className="inline-flex items-center gap-1 rounded-md bg-lime-100 px-2.5 py-1 text-stone-900">
            <FaCircleCheck /> Financing
          </span>
        )}
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <a href={`tel:${business.phoneHref}`} className="inline-flex items-center justify-center gap-2 rounded-md border border-stone-300 bg-white px-4 py-3 text-sm font-extrabold text-stone-950 transition hover:border-emerald-900 hover:text-emerald-900">
          <FaPhoneVolume /> Call
        </a>
        <Link to={`/equipment/${item.slug}`} className="premium-button px-4 py-3 text-sm">
          Request Quote
        </Link>
      </div>
    </div>
  </motion.article>
)

export default EquipmentCard
