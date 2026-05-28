import type { ChangeEvent } from 'react'
import { FaFilter, FaRotateLeft } from 'react-icons/fa6'
import type { EquipmentFilters } from '../../../types/equipment'
import { formatPrice } from '../../../utils/format'
import FilterSelect from './FilterSelect'

export type CatalogForm = {
  category: string
  brand: string
  year: string
  condition: string
  status: string
  q: string
  featured: boolean
  price_min: string
  price_max: string
}

type CatalogFiltersProps = {
  activeCount: number
  filters: EquipmentFilters | null
  query: CatalogForm
  onReset: () => void
  onUpdate: (field: keyof CatalogForm) => (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void
}

const CatalogFilters = ({ activeCount, filters, query, onReset, onUpdate }: CatalogFiltersProps) => (
  <aside className="premium-card h-fit overflow-hidden">
    <div className="bg-stone-950 px-5 py-4 text-white">
      <h2 className="flex items-center gap-2 text-xl font-extrabold">
        <FaFilter className="text-amber-300" /> Refine Inventory
      </h2>
      <p className="mt-1 text-sm font-semibold text-stone-300">Narrow the lot before contacting sales.</p>
    </div>
    <div className="p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-extrabold uppercase tracking-wide text-stone-500">Filters</span>
        {activeCount > 0 && (
          <button
            type="button"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-bold text-emerald-900 hover:bg-emerald-50"
            onClick={onReset}
          >
            <FaRotateLeft /> Reset
          </button>
        )}
      </div>

      <div className="mt-5 grid gap-4">
        <label className="block text-sm font-bold text-stone-700">
          Search
          <input
            value={query.q}
            onChange={onUpdate('q')}
            placeholder="Model, brand, stock #"
            className="premium-input"
          />
        </label>
        <FilterSelect label="Category" value={query.category} onChange={onUpdate('category')} options={filters?.categories ?? []} />
        <FilterSelect label="Brand" value={query.brand} onChange={onUpdate('brand')} options={filters?.brands ?? []} />
        <FilterSelect label="Year" value={query.year} onChange={onUpdate('year')} options={(filters?.years ?? []).map(String)} />
        <FilterSelect label="Condition" value={query.condition} onChange={onUpdate('condition')} options={filters?.conditions ?? []} />
        <FilterSelect label="Status" value={query.status} onChange={onUpdate('status')} options={filters?.statuses ?? []} />
        <label className="flex items-center gap-3 rounded-md border border-stone-200 bg-stone-50 px-3 py-3 text-sm font-bold text-stone-700">
          <input
            type="checkbox"
            checked={query.featured}
            onChange={onUpdate('featured')}
            className="h-4 w-4 accent-emerald-900"
          />
          Featured inventory only
        </label>
        <label className="block text-sm font-bold text-stone-700">
          Min Price
          <input
            type="number"
            min="0"
            value={query.price_min}
            onChange={onUpdate('price_min')}
            placeholder={filters?.price_min ? formatPrice(filters.price_min) : '$0'}
            className="premium-input"
          />
        </label>
        <label className="block text-sm font-bold text-stone-700">
          Max Price
          <input
            type="number"
            min="0"
            value={query.price_max}
            onChange={onUpdate('price_max')}
            placeholder={filters?.price_max ? formatPrice(filters.price_max) : '$500,000'}
            className="premium-input"
          />
        </label>
      </div>
    </div>
  </aside>
)

export default CatalogFilters
