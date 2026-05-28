import { Link } from 'react-router'
import { FaArrowRight } from 'react-icons/fa6'
import EquipmentCard from '../../../components/EquipmentCard'
import { EquipmentCardSkeleton } from '../../../components/Skeleton'
import type { Equipment } from '../../../types/equipment'

type FeaturedEquipmentSectionProps = {
  items: Equipment[]
  loading: boolean
}

const FeaturedEquipmentSection = ({ items, loading }: FeaturedEquipmentSectionProps) => (
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
        {loading
          ? Array.from({ length: 3 }).map((_, index) => <EquipmentCardSkeleton key={index} />)
          : items.map((item) => <EquipmentCard key={item.id} item={item} />)}
      </div>
      {!loading && items.length === 0 && (
        <div className="premium-card mt-8 p-8 text-center font-bold text-stone-600">
          Featured inventory is not available right now.
        </div>
      )}
    </div>
  </section>
)

export default FeaturedEquipmentSection
