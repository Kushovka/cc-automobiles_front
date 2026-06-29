import { SectionHeading } from '../components/SectionHeading'
import { Seo } from '../components/Seo'

const trustNumbers = [
  ['Stratford, CT', 'Local dealership location'],
  ['Sales + service', 'Used cars with service support'],
  ['Clear process', 'Straight answers before you visit'],
  ['Nearby drivers', 'Serving Bridgeport, Milford, Fairfield, and the surrounding area'],
]

export const AboutPage = () => (
  <>
    <Seo title="About C&C Automobiles" description="Learn about C&C Automobiles, a local used car dealership and auto service business in Stratford, CT." />
    <section className="section bg-slate-100">
      <SectionHeading eyebrow="About" title="A local dealership built around clear answers" text="C&C Automobiles serves Stratford-area drivers with used vehicle sales, auto service support, and practical guidance." />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <img src="/images/cc-automobiles-lot-sign.webp" alt="C&C Automobiles dealership lot in Stratford, CT" className="h-full min-h-[420px] rounded-lg object-cover shadow-sm" />
        <div className="grid gap-5">
          {[
            ['Mission', 'Help drivers find reliable vehicles without confusion, pressure, or wasted time.'],
            ['Values', 'Honesty, transparent pricing, customer support, and vehicles selected for real daily use.'],
            ['Local focus', 'Serving Stratford, Bridgeport, Milford, Fairfield, and nearby Connecticut communities.'],
          ].map(([title, text]) => (
            <div key={title} className="rounded-lg border border-blue-950/10 bg-white p-6 shadow-sm shadow-blue-950/5">
              <h2 className="text-2xl font-semibold text-zinc-950">{title}</h2>
              <p className="mt-3 text-lg leading-8 text-zinc-700">{text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-6 grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {trustNumbers.map(([value, label]) => (
          <div key={value} className="rounded-lg border border-blue-950/10 bg-white p-5 shadow-sm shadow-blue-950/5">
            <p className="text-2xl font-semibold text-blue-800">{value}</p>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{label}</p>
          </div>
        ))}
      </div>
    </section>
  </>
)
