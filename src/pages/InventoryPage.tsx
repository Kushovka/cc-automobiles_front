import { useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaFilter, FaTimes } from 'react-icons/fa'
import { getVehicleFilters, listVehicles } from '../api/vehicles'
import { SectionHeading } from '../components/SectionHeading'
import { Seo } from '../components/Seo'
import { InventoryToolbarSkeleton, VehicleGridSkeleton } from '../components/Skeletons'
import { VehicleCard } from '../components/VehicleCard'
import type { Vehicle } from '../types/vehicle'

type SortKey = 'price-low' | 'price-high' | 'year' | 'mileage'

const PAGE_SIZE = 6
const toNumber = (value: string) => value === '' ? undefined : Number(value)
const numberValue = (value?: number) => value?.toString() ?? ''

export const InventoryPage = () => {
  const resultsRef = useRef<HTMLDivElement | null>(null)
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [yearFrom, setYearFrom] = useState<number | undefined>()
  const [yearTo, setYearTo] = useState<number | undefined>()
  const [priceMin, setPriceMin] = useState<number | undefined>()
  const [priceMax, setPriceMax] = useState<number | undefined>()
  const [mileageMin, setMileageMin] = useState<number | undefined>()
  const [mileageMax, setMileageMax] = useState<number | undefined>()
  const [bodyType, setBodyType] = useState('')
  const [transmission, setTransmission] = useState('')
  const [drivetrain, setDrivetrain] = useState('')
  const [color, setColor] = useState('')
  const [sort, setSort] = useState<SortKey>('year')
  const [page, setPage] = useState(1)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [items, setItems] = useState<Vehicle[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [inventoryError, setInventoryError] = useState(false)
  const [makes, setMakes] = useState<string[]>([])
  const [models, setModels] = useState<string[]>([])
  const [years, setYears] = useState<number[]>([])
  const [bodyTypes, setBodyTypes] = useState<string[]>([])
  const [transmissions, setTransmissions] = useState<string[]>([])
  const [drivetrains, setDrivetrains] = useState<string[]>([])
  const [colors, setColors] = useState<string[]>([])

  useEffect(() => {
    let cancelled = false

    getVehicleFilters()
      .then((filters) => {
        if (!cancelled) {
          setMakes(filters.makes)
          setModels(filters.models)
          setYears(filters.years)
          setBodyTypes(filters.bodyTypes)
          setTransmissions(filters.transmissions)
          setDrivetrains(filters.drivetrains)
          setColors(filters.colors)
        }
      })
      .catch(() => undefined)

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    getVehicleFilters(make)
      .then((filters) => {
        if (!cancelled) {
          setModels(filters.models)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setModels([])
        }
      })

    return () => {
      cancelled = true
    }
  }, [make])

  useEffect(() => {
    let cancelled = false
    Promise.resolve().then(() => {
      if (!cancelled) {
        setLoading(true)
      }
    })

    listVehicles({
      make,
      model,
      yearFrom,
      yearTo,
      bodyType,
      transmission,
      drivetrain,
      color,
      priceMin,
      priceMax,
      mileageMin,
      mileageMax,
      page,
      pageSize: PAGE_SIZE,
      sort: sort === 'price-low' ? 'price_asc' : sort === 'price-high' ? 'price_desc' : sort === 'mileage' ? 'mileage_asc' : 'year_desc',
    })
      .then((response) => {
        if (!cancelled) {
          setItems(response.items)
          setTotal(response.total)
          setInventoryError(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setItems([])
          setTotal(0)
          setInventoryError(true)
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [bodyType, color, drivetrain, make, mileageMax, mileageMin, model, page, priceMax, priceMin, sort, transmission, yearFrom, yearTo])

  const resetFilters = () => {
    setPage(1)
    setMake('')
    setModel('')
    setYearFrom(undefined)
    setYearTo(undefined)
    setPriceMin(undefined)
    setPriceMax(undefined)
    setMileageMin(undefined)
    setMileageMax(undefined)
    setBodyType('')
    setTransmission('')
    setDrivetrain('')
    setColor('')
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)
  const goToPage = (nextPage: number) => {
    const clampedPage = Math.min(totalPages, Math.max(1, nextPage))
    setPage(clampedPage)

    window.setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }

  const filters = (
    <div className="grid gap-4">
      <label className="label">Make<select className="input mt-1" value={make} onChange={(event) => { setPage(1); setMake(event.target.value); setModel('') }}><option value="">All makes</option>{makes.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className="label">Model<select className="input mt-1 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-zinc-400" value={model} disabled={!make} onChange={(event) => { setPage(1); setModel(event.target.value) }}><option value="">{make ? 'All models' : 'Select make first'}</option>{make ? models.map((item) => <option key={item}>{item}</option>) : null}</select></label>
      <div className="grid grid-cols-2 gap-3">
        <label className="label">Year from<select className="input mt-1" value={numberValue(yearFrom)} onChange={(event) => { setPage(1); setYearFrom(toNumber(event.target.value)) }}><option value="">Any</option>{years.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label className="label">Year to<select className="input mt-1" value={numberValue(yearTo)} onChange={(event) => { setPage(1); setYearTo(toNumber(event.target.value)) }}><option value="">Any</option>{years.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <label className="label">Price min<input className="input mt-1" min={0} placeholder="$ min" type="number" value={numberValue(priceMin)} onChange={(event) => { setPage(1); setPriceMin(toNumber(event.target.value)) }} /></label>
        <label className="label">Price max<input className="input mt-1" min={0} placeholder="$ max" type="number" value={numberValue(priceMax)} onChange={(event) => { setPage(1); setPriceMax(toNumber(event.target.value)) }} /></label>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <label className="label">Mileage min<input className="input mt-1" min={0} placeholder="mi min" type="number" value={numberValue(mileageMin)} onChange={(event) => { setPage(1); setMileageMin(toNumber(event.target.value)) }} /></label>
        <label className="label">Mileage max<input className="input mt-1" min={0} placeholder="mi max" type="number" value={numberValue(mileageMax)} onChange={(event) => { setPage(1); setMileageMax(toNumber(event.target.value)) }} /></label>
      </div>
      <label className="label">Body type<select className="input mt-1" value={bodyType} onChange={(event) => { setPage(1); setBodyType(event.target.value) }}><option value="">All body types</option>{bodyTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className="label">Transmission<select className="input mt-1" value={transmission} onChange={(event) => { setPage(1); setTransmission(event.target.value) }}><option value="">All transmissions</option>{transmissions.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className="label">Drivetrain<select className="input mt-1" value={drivetrain} onChange={(event) => { setPage(1); setDrivetrain(event.target.value) }}><option value="">All drivetrains</option>{drivetrains.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className="label">Color<select className="input mt-1" value={color} onChange={(event) => { setPage(1); setColor(event.target.value) }}><option value="">All colors</option>{colors.map((item) => <option key={item}>{item}</option>)}</select></label>
      <button className="min-h-11 rounded-md border border-blue-950/15 px-4 py-2 text-sm font-semibold text-blue-950 hover:bg-blue-50" onClick={resetFilters} type="button">Reset Filters</button>
    </div>
  )

  return (
    <>
      <Seo title="Used Car Inventory" description="Browse used cars, SUVs, trucks, and crossovers available at C&C Automobiles in Stratford, CT." />
      <section className="section bg-slate-100">
        <SectionHeading eyebrow="Inventory" title="Used cars for sale in Stratford, CT" text="Filter by make and body style, then call about the vehicle you like." />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? <InventoryToolbarSkeleton /> : <div className="mb-5 flex flex-col gap-3 rounded-lg border border-blue-950/10 bg-white p-4 shadow-sm shadow-blue-950/5 sm:flex-row sm:items-center sm:justify-between">
            <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-950 px-4 py-2 text-sm font-semibold text-white lg:hidden" onClick={() => setFiltersOpen(true)} type="button">
              <FaFilter /> Filters
            </button>
            <p className="font-semibold text-zinc-700">{total} vehicles found</p>
            <label className="label sm:w-64">Sort<select className="input mt-1" value={sort} onChange={(event) => { setPage(1); setSort(event.target.value as SortKey) }}><option value="year">Newest year</option><option value="price-low">Price low-high</option><option value="price-high">Price high-low</option><option value="mileage">Lowest mileage</option></select></label>
          </div>}
          <div className="grid items-start gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="hidden rounded-lg border border-blue-950/10 bg-white p-5 shadow-sm shadow-blue-950/5 lg:block">{filters}</aside>
            <div ref={resultsRef} className="scroll-mt-28">
              <div className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
                {loading ? <VehicleGridSkeleton count={PAGE_SIZE} /> : inventoryError ? (
                  <div className="rounded-lg border border-blue-950/10 bg-white p-6 text-center text-zinc-700 shadow-sm md:col-span-2 xl:col-span-3">
                    Inventory is temporarily unavailable. Please try again later or call us for current vehicles.
                  </div>
                ) : items.length ? items.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />) : (
                  <div className="rounded-lg border border-blue-950/10 bg-white p-6 text-center text-zinc-700 shadow-sm md:col-span-2 xl:col-span-3">
                    No vehicles match these filters right now.
                  </div>
                )}
              </div>
              {!loading && totalPages > 1 ? (
                <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5">
                  <button
                    aria-label="Previous page"
                    className="grid h-9 w-9 place-items-center rounded-full border border-blue-950/15 bg-white text-sm text-blue-950 transition hover:border-blue-800/30 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-35"
                    disabled={page === 1}
                    onClick={() => goToPage(page - 1)}
                    type="button"
                  >
                    <FaChevronLeft />
                  </button>
                  {pageNumbers.map((pageNumber) => (
                    <button
                      key={pageNumber}
                      aria-label={`Page ${pageNumber}`}
                      className={`grid h-9 min-w-9 place-items-center rounded-full px-3 text-sm font-semibold transition ${
                        pageNumber === page
                          ? 'bg-blue-950 text-white shadow-sm shadow-blue-950/15'
                          : 'text-blue-950 hover:bg-blue-50'
                      }`}
                      onClick={() => goToPage(pageNumber)}
                      type="button"
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <button
                    aria-label="Next page"
                    className="grid h-9 w-9 place-items-center rounded-full border border-blue-950/15 bg-white text-sm text-blue-950 transition hover:border-blue-800/30 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-35"
                    disabled={page === totalPages}
                    onClick={() => goToPage(page + 1)}
                    type="button"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      {filtersOpen ? (
        <div className="fixed inset-0 z-[60] flex items-end bg-black/50 px-3 pb-3 pt-16 lg:hidden" onClick={() => setFiltersOpen(false)}>
          <div className="max-h-[calc(100vh-5rem)] w-full overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-blue-950/10 bg-white px-5 py-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button aria-label="Close filters" className="grid h-11 w-11 place-items-center rounded-md border border-blue-950/10 text-blue-950" onClick={() => setFiltersOpen(false)} type="button"><FaTimes /></button>
            </div>
            <div className="max-h-[calc(100vh-15.5rem)] overflow-y-auto px-5 py-4">
              {filters}
            </div>
            <div className="grid grid-cols-[1fr_1.4fr] gap-3 border-t border-blue-950/10 bg-white px-5 py-4">
              <button className="min-h-12 rounded-md border border-blue-950/15 px-4 py-2 text-sm font-semibold text-blue-950 hover:bg-blue-50" onClick={resetFilters} type="button">Reset</button>
              <button className="min-h-12 rounded-md bg-blue-800 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-950/20 hover:bg-blue-900" onClick={() => setFiltersOpen(false)} type="button">
                View {total} vehicles
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
