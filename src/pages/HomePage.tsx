import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import {
  FaArrowRight,
  FaClock,
  FaLocationDot,
  FaPhoneVolume,
  FaShieldHalved,
  FaTruckFast,
  FaWrench,
} from 'react-icons/fa6'
import { getEquipment } from '../api/equipment'
import EquipmentCard from '../components/EquipmentCard'
import LeadForm from '../components/LeadForm'
import { PageFade, Reveal } from '../components/motion'
import { EquipmentCardSkeleton } from '../components/Skeleton'
import type { Equipment } from '../types/equipment'
import { business } from '../data/business'

const brands = ['John Deere', 'Case IH', 'New Holland', 'Kubota', 'Bobcat', 'Caterpillar', 'Claas']

const categories = [
  ['Tractors', 'Utility, MFWD, row crop'],
  ['Skid Steers', 'Compact loaders and attachments'],
  ['Hay Equipment', 'Balers, mowers, rakes'],
  ['Implements', 'Blades, loaders, farm tools'],
]

const trustItems = [
  ['Inspected Equipment', 'Ask for condition notes, current hours, service history, and availability before visiting.'],
  ['Straightforward Follow-Up', 'Sales requests include source page, phone, ZIP code, and message context for faster response.'],
  ['Delivery Planning', 'Coordinate pickup, regional delivery, and machine handoff details with the dealer desk.'],
]

const HomePage = () => {
  const [featured, setFeatured] = useState<Equipment[]>([])
  const [loadingFeatured, setLoadingFeatured] = useState(true)

  useEffect(() => {
    getEquipment({ page: 1, page_size: 6, featured: true })
      .then((data) => setFeatured(data.items))
      .catch(() => setFeatured([]))
      .finally(() => setLoadingFeatured(false))
  }, [])

  return (
    <PageFade>
      <section className="relative overflow-hidden bg-stone-950 text-white">
        <img
          src="/images/dealer-lot.png"
          alt={`${business.name} equipment lot in ${business.shortLocation}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/72 to-stone-950/18" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-stone-950 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[700px] max-w-7xl flex-col justify-end px-4 py-10 sm:px-6 lg:px-8 gap-5">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-md bg-white px-3 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-stone-950">
              <FaLocationDot /> {business.shortLocation}
            </div>
            <h1 className="text-4xl font-black uppercase leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Your next machine starts here.
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-stone-100 sm:text-xl">
              Browse pre-owned equipment, call the dealer desk, or send a quick quote request to confirm availability before you visit.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/catalog" className="premium-button-gold gap-2 px-7 py-4 text-base">
                Browse Inventory <FaArrowRight />
              </Link>
              <a href={`tel:${business.phoneHref}`} className="inline-flex items-center justify-center gap-2 rounded-md border border-white/40 bg-white px-7 py-4 text-base font-extrabold text-stone-950 transition hover:bg-amber-100">
                <FaPhoneVolume /> {business.phone}
              </a>
            </div>
          </div>

          <div className="mt-14 pb-8 sm:mt-16 sm:pb-10 lg:mt-20 lg:pb-12">
            <div className="mx-auto grid max-w-7xl gap-4 text-stone-950 md:grid-cols-3">
              <InfoLine icon={<FaClock />} label="Hours" value={business.hours} />
              <InfoLine icon={<FaLocationDot />} label="Location" value={`${business.address}, ${business.cityState}`} />
              <InfoLine icon={<FaPhoneVolume />} label="Sales Phone" value={business.phone} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-md border border-stone-300 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-stone-500">Quick Browse</p>
                <p className="mt-2 font-semibold text-stone-600">Jump directly to the type of equipment you are shopping for.</p>
              </div>
              <Link to="/catalog" className="premium-button hidden gap-2 md:inline-flex">
                See Full Catalog <FaArrowRight />
              </Link>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map(([title, text]) => (
                <Link key={title} to="/catalog" className="flex items-center justify-between rounded-md border border-stone-200 px-4 py-3 transition hover:border-emerald-900 hover:bg-emerald-50">
                  <span>
                    <span className="block font-black text-stone-950">{title}</span>
                    <span className="text-sm font-semibold text-stone-500">{text}</span>
                  </span>
                  <FaArrowRight className="text-emerald-900" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-[#f7f5ef]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-8 sm:px-6 lg:px-8">
          <span className="mr-2 text-xs font-black uppercase tracking-[0.2em] text-stone-500">Equipment Brands</span>
          {brands.map((brand) => (
            <span key={brand} className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-extrabold text-stone-800 shadow-sm">
              {brand}
            </span>
          ))}
          <Link to="/catalog" className="ml-auto hidden items-center gap-2 rounded-md bg-stone-950 px-4 py-2 text-sm font-extrabold text-white sm:inline-flex">
            See Inventory <FaArrowRight />
          </Link>
        </div>
      </section>

      <Reveal>
        <section className="bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 border-b border-stone-200 pb-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-end">
              <div className="min-w-0">
                <p className="premium-kicker">Featured Equipment</p>
                <h2 className="mt-4 max-w-3xl text-4xl font-black uppercase leading-tight text-stone-950">
                  Machines ready for review
                </h2>
                <p className="mt-4 max-w-2xl font-semibold leading-7 text-stone-600">
                  Featured inventory is pulled from the live catalog and routed to the same quote workflow.
                </p>
              </div>
              <div className="lg:flex lg:justify-end">
                <Link to="/catalog" className="premium-button w-full gap-2 sm:w-auto lg:w-full">
                  View All Equipment <FaArrowRight />
                </Link>
              </div>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {loadingFeatured
                ? Array.from({ length: 3 }).map((_, index) => <EquipmentCardSkeleton key={index} />)
                : featured.map((item) => <EquipmentCard key={item.id} item={item} />)}
            </div>
            {!loadingFeatured && featured.length === 0 && (
              <div className="premium-card mt-8 p-8 text-center font-bold text-stone-600">
                Featured inventory is not available right now.
              </div>
            )}
          </div>
        </section>
      </Reveal>

      <Reveal>
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
                    {index === 0 && <FaShieldHalved />}
                    {index === 1 && <FaWrench />}
                    {index === 2 && <FaTruckFast />}
                  </div>
                  <h3 className="mt-4 text-xl font-black text-stone-950">{title}</h3>
                  <p className="mt-2 font-semibold leading-7 text-stone-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="bg-white py-14 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
            <div className="overflow-hidden rounded-md border border-stone-300 bg-stone-950 text-white">
              <img src="/images/dealer-team.png" alt={`${business.name} team`} className="h-72 w-full object-cover opacity-90" />
              <div className="p-6">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-300">Local Dealer Desk</p>
                <h2 className="mt-3 text-3xl font-black uppercase leading-tight">
                  Talk to a team that knows the lot.
                </h2>
                <p className="mt-4 leading-7 text-stone-300">
                  Send a request with your equipment question, delivery ZIP, or trade-in notes. The dealer desk can follow up by phone, text, or email.
                </p>
              </div>
            </div>
            <LeadForm compact leadType="contact" title="Send a Quick Request" />
          </div>
        </section>
      </Reveal>
    </PageFade>
  )
}

const InfoLine = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex gap-3 rounded-md border border-stone-300 bg-white px-5 py-4 shadow-[0_14px_34px_rgba(0,0,0,0.18)]">
    <div className="mt-1 text-emerald-900">{icon}</div>
    <div>
      <p className="text-xs font-black uppercase tracking-wide text-stone-500">{label}</p>
      <p className="mt-1 font-extrabold text-stone-950">{value}</p>
    </div>
  </div>
)

export default HomePage
