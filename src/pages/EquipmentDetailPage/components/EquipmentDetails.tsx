import { FaCircleCheck, FaGaugeHigh, FaHorseHead, FaLocationDot, FaTruckFast } from 'react-icons/fa6'
import EquipmentVisual from '../../../components/EquipmentVisual'
import type { EquipmentDetail } from '../../../types/equipment'
import { formatNumber, formatPrice } from '../../../utils/format'
import Spec from './Spec'

type EquipmentDetailsProps = {
  item: EquipmentDetail
}

const EquipmentDetails = ({ item }: EquipmentDetailsProps) => (
  <div>
    <div className="premium-card overflow-hidden">
      <div className="h-[360px] sm:h-[500px]">
        <EquipmentVisual image={item.images[0]} title={item.title} category={item.category} />
      </div>
    </div>

    <div className="premium-card mt-8 p-7">
      <p className="premium-kicker">
        {item.status} / {item.condition} / {item.category}
      </p>
      <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <h1 className="text-4xl font-black uppercase leading-tight text-stone-950">{item.title}</h1>
          <p className="mt-3 text-lg leading-8 text-stone-600">{item.description}</p>
        </div>
        <p className="shrink-0 rounded-md bg-stone-950 px-4 py-3 text-3xl font-black text-white">{formatPrice(item.price)}</p>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Spec icon={<FaHorseHead />} label="Power" value={item.power_hp ? `${item.power_hp} hp` : 'N/A'} />
        <Spec icon={<FaGaugeHigh />} label="Hours" value={item.engine_hours ? `${formatNumber(item.engine_hours)} h` : 'N/A'} />
        <Spec icon={<FaLocationDot />} label="Location" value={item.location} />
        <Spec icon={<FaCircleCheck />} label="Stock" value={item.stock_number} />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Spec icon={<FaCircleCheck />} label="Year" value={String(item.year)} />
        <Spec icon={<FaCircleCheck />} label="Serial" value={item.serial_number || 'Request'} />
        <Spec icon={<FaTruckFast />} label="Delivery" value={item.delivery_available ? 'Available' : 'Ask sales'} />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-extrabold text-stone-950">Key Features</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {item.features.map((feature) => (
            <div key={feature} className="flex items-center gap-3 rounded-md border border-emerald-100 bg-emerald-50/80 px-4 py-3 font-semibold text-stone-800 shadow-sm">
              <FaCircleCheck className="text-emerald-800" /> {feature}
            </div>
          ))}
        </div>
      </div>

      {Object.keys(item.specs ?? {}).length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-extrabold text-stone-950">Additional Specs</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {Object.entries(item.specs).map(([key, value]) => (
              <div key={key} className="rounded-md border border-stone-200 bg-stone-50 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-stone-500">{key.replaceAll('_', ' ')}</p>
                <p className="mt-1 font-extrabold text-stone-950">{String(value)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
)

export default EquipmentDetails
