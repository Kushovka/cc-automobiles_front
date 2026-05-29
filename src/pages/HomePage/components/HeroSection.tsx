import { Link } from 'react-router'
import { FaArrowRight, FaClock, FaLocationDot, FaPhoneVolume } from 'react-icons/fa6'
import { business } from '../../../data/business'
import InfoLine from './InfoLine'

const HeroSection = () => (
  <section className="relative overflow-hidden bg-stone-950 text-white">
    <img
      src="/images/home-hero-equipment.webp"
      alt={`${business.name} equipment lot in ${business.shortLocation}`}
      className="absolute inset-0 h-full w-full object-cover object-[78%_center] sm:object-center"
      loading="eager"
      decoding="async"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/72 to-stone-950/18" />
    <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-stone-950 to-transparent" />

    <div className="relative z-10 mx-auto flex min-h-[700px] max-w-7xl flex-col justify-end gap-5 px-4 py-10 sm:px-6 lg:px-8">
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
)

export default HeroSection
