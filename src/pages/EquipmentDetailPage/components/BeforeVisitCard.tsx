import { FaCircleCheck } from 'react-icons/fa6'

const BeforeVisitCard = () => (
  <div className="mt-5 rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
    <p className="text-sm font-extrabold uppercase tracking-wide text-stone-500">Before You Visit</p>
    <ul className="mt-4 space-y-3 text-sm font-semibold leading-6 text-stone-700">
      <li className="flex gap-2"><FaCircleCheck className="mt-1 text-emerald-800" /> Confirm availability and current hours.</li>
      <li className="flex gap-2"><FaCircleCheck className="mt-1 text-emerald-800" /> Ask for inspection notes and service history.</li>
      <li className="flex gap-2"><FaCircleCheck className="mt-1 text-emerald-800" /> Share your ZIP code for delivery planning.</li>
    </ul>
  </div>
)

export default BeforeVisitCard
