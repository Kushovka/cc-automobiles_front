import { FaShieldHalved, FaTruckFast, FaWrench } from 'react-icons/fa6'
import { trustItems } from '../data'

const icons = [<FaShieldHalved />, <FaWrench />, <FaTruckFast />]

const TrustProcessSection = () => (
  <section className="border-y border-stone-200 bg-[#f4f0e6] py-14 sm:py-16">
    <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
      <div>
        <p className="premium-kicker">Why Buyers Call First</p>
        <h2 className="mt-3 text-4xl font-black uppercase leading-tight text-stone-950">
          A practical dealer process built for fast decisions.
        </h2>
        <p className="mt-5 font-semibold leading-8 text-stone-700">
          The homepage is built for mobile traffic from ads: quick phone access, short quote forms, visible inventory, and clear location signals.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
        {trustItems.map(([title, text], index) => (
          <article key={title} className="rounded-md border border-stone-300 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-emerald-950 text-white">
              {icons[index]}
            </div>
            <h3 className="mt-4 text-xl font-black text-stone-950">{title}</h3>
            <p className="mt-2 font-semibold leading-7 text-stone-600">{text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default TrustProcessSection
