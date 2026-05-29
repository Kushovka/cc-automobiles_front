import { type ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getApiErrorMessage, getEquipment, getEquipmentFilters } from '../api/equipment'
import { PageFade, Reveal } from '../components/motion'
import type { Equipment, EquipmentFilters, EquipmentQuery } from '../types/equipment'
import CatalogFilters, { type CatalogForm } from './CatalogPage/components/CatalogFilters'
import CatalogHeader from './CatalogPage/components/CatalogHeader'
import CatalogResults from './CatalogPage/components/CatalogResults'

const emptyQuery: CatalogForm = {
  category: '',
  brand: '',
  year: '',
  condition: '',
  status: '',
  q: '',
  featured: false,
  price_min: '',
  price_max: '',
}

const pageSize = 12

const CatalogPage = () => {
  const [items, setItems] = useState<Equipment[]>([])
  const [filters, setFilters] = useState<EquipmentFilters | null>(null)
  const [query, setQuery] = useState<CatalogForm>(emptyQuery)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const catalogTopRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    getEquipmentFilters().then(setFilters).catch(() => setFilters(null))
  }, [])

  useEffect(() => {
    const params = toApiQuery(query, page)

    getEquipment(params)
      .then((data) => {
        setItems(data.items)
        setTotal(data.total)
        setError(null)
      })
      .catch((requestError: unknown) => {
        setItems([])
        setTotal(0)
        setError(getApiErrorMessage(requestError, 'Could not load equipment from backend.'))
      })
      .finally(() => setLoading(false))
  }, [page, query])

  const activeCount = useMemo(
    () => Object.values(query).filter((value) => value !== undefined && value !== '' && value !== false).length,
    [query],
  )

  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  const update = useCallback((field: keyof CatalogForm) => (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setLoading(true)
    setPage(1)
    setQuery((current) => ({
      ...current,
      [field]: event.target instanceof HTMLInputElement && event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value,
    }))
  }, [])

  const resetFilters = useCallback(() => {
    setLoading(true)
    setPage(1)
    setQuery(emptyQuery)
  }, [])

  const scrollToCatalogTop = useCallback(() => {
    catalogTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const goToPrevious = useCallback(() => {
    setLoading(true)
    scrollToCatalogTop()
    setPage((current) => Math.max(1, current - 1))
  }, [scrollToCatalogTop])

  const goToNext = useCallback(() => {
    setLoading(true)
    scrollToCatalogTop()
    setPage((current) => Math.min(totalPages, current + 1))
  }, [scrollToCatalogTop, totalPages])

  return (
    <PageFade>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="premium-shell rounded-md p-5 sm:p-7">
          <CatalogHeader total={total} />

          <div ref={catalogTopRef} className="mt-8 grid scroll-mt-28 gap-7 lg:grid-cols-[320px_1fr]">
            <Reveal immediate>
              <CatalogFilters
                activeCount={activeCount}
                filters={filters}
                query={query}
                onReset={resetFilters}
                onUpdate={update}
              />
            </Reveal>

            <CatalogResults
              error={error}
              items={items}
              loading={loading}
              page={page}
              totalPages={totalPages}
              onPrevious={goToPrevious}
              onNext={goToNext}
            />
          </div>
        </div>
      </section>
    </PageFade>
  )
}

const toApiQuery = (query: CatalogForm, page: number): EquipmentQuery => ({
  page,
  page_size: pageSize,
  category: query.category || undefined,
  brand: query.brand || undefined,
  year: query.year ? Number(query.year) : undefined,
  condition: query.condition || undefined,
  status: query.status || undefined,
  featured: query.featured || undefined,
  q: query.q.length >= 2 ? query.q : undefined,
  price_min: query.price_min ? Number(query.price_min) : undefined,
  price_max: query.price_max ? Number(query.price_max) : undefined,
})

export default CatalogPage
