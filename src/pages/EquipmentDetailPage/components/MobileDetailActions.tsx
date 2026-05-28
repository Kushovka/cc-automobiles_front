import { FaPhoneVolume } from 'react-icons/fa6'
import { business } from '../../../data/business'

const MobileDetailActions = () => (
  <div className="mt-4 grid gap-2 sm:hidden">
    <a href={`tel:${business.phoneHref}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-emerald-950 px-4 text-base font-extrabold text-white">
      <FaPhoneVolume /> Call About This Machine
    </a>
    <a href="#quote-form" className="inline-flex min-h-12 items-center justify-center rounded-md bg-amber-400 px-4 text-base font-extrabold text-stone-950">
      Request Quote
    </a>
  </div>
)

export default MobileDetailActions
