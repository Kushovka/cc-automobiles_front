import { motion } from 'framer-motion'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import EquipmentCard from '../../../components/EquipmentCard'
import { EquipmentCardSkeleton } from '../../../components/Skeleton'
import type { Equipment } from '../../../types/equipment'

type CatalogResultsProps = {
  error: string | null
  items: Equipment[]
  loading: boolean
  page: number
  totalPages: number
  onPrevious: () => void
  onNext: () => void
}

const CatalogResults = ({ error, items, loading, page, totalPages, onPrevious, onNext }: CatalogResultsProps) => (
  <div>
    {loading && (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <EquipmentCardSkeleton key={index} />
        ))}
      </div>
    )}
    {!loading && error && (
      <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-5 font-bold text-red-800 shadow-sm">
        {error}
      </div>
    )}
    {!loading && items.length === 0 && (
      <div className="premium-card p-8 text-center">
        <h2 className="text-2xl font-extrabold text-stone-950">No machines found</h2>
        <p className="mt-2 text-stone-600">Try another category, brand, or price range.</p>
      </div>
    )}
    {!loading && (
      <motion.div
        className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {items.map((item) => (
          <EquipmentCard key={item.id} item={item} />
        ))}
      </motion.div>
    )}
    {!loading && totalPages > 1 && (
      <div className="premium-card mt-8 flex flex-col items-center justify-between gap-4 p-4 sm:flex-row">
        <p className="text-sm font-bold text-stone-600">
          Page {page} of {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={page <= 1}
            className="inline-flex items-center gap-2 rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-800 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40"
            onClick={onPrevious}
          >
            <FaChevronLeft /> Previous
          </button>
          <button
            type="button"
            disabled={page >= totalPages}
            className="inline-flex items-center gap-2 rounded-md bg-emerald-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-40"
            onClick={onNext}
          >
            Next <FaChevronRight />
          </button>
        </div>
      </div>
    )}
  </div>
)

export default CatalogResults
