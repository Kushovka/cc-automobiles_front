import { FaCircleCheck } from 'react-icons/fa6'
import { business } from '../../../data/business'
import type { content } from '../content'

type InfoHeroProps = {
  data: (typeof content)[keyof typeof content]
}

const InfoHero = ({ data }: InfoHeroProps) => {
  const Icon = data.icon

  return (
    <section className="border-b border-stone-200/80 bg-white/75 backdrop-blur">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[.95fr_1.05fr] lg:px-8">
        <div>
          <p className="premium-kicker">{data.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-black uppercase leading-tight text-stone-950 sm:text-5xl">{data.title}</h1>
          <p className="mt-5 text-lg font-semibold leading-8 text-stone-600">{data.text}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {data.points.map((point) => (
              <div key={point} className="flex items-center gap-3 rounded-md border border-emerald-100 bg-emerald-50/80 px-4 py-3 font-semibold text-stone-800 shadow-sm">
                <FaCircleCheck className="text-emerald-800" /> {point}
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-80 overflow-hidden rounded-lg border border-stone-300 bg-stone-950 text-white shadow-[0_24px_70px_rgba(41,37,36,0.18)]">
          <img
            src={data.image}
            alt={`${business.name} ${data.eyebrow}`}
            className="absolute inset-0 h-full w-full object-cover opacity-70"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/45 to-transparent" />
          <div className="relative z-10 flex min-h-80 flex-col justify-end p-8">
            <Icon className="text-6xl text-amber-300 drop-shadow-lg" />
            <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-amber-100">{business.name} Process</p>
            <p className="mt-2 text-3xl font-extrabold">Practical support from quote to field.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InfoHero
