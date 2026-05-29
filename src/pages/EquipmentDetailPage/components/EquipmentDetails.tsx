import { useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaCircleCheck, FaGaugeHigh, FaHorseHead, FaLocationDot, FaTruckFast } from 'react-icons/fa6'
import EquipmentVisual from '../../../components/EquipmentVisual'
import { getEquipmentImages, resolveMediaUrl } from '../../../api/equipment'
import type { EquipmentDetail } from '../../../types/equipment'
import { formatNumber, formatPrice } from '../../../utils/format'
import Spec from './Spec'

type EquipmentDetailsProps = {
  item: EquipmentDetail
}

const stopSpecPatterns = [
  /^Dealer inventory reduction/i,
  /^Please review/i,
  /^Group Extension/i,
  /^Items:?$/i,
]

const cleanSpecValue = (value: unknown) => {
  if (!Array.isArray(value)) {
    return String(value)
  }

  const stopIndex = value.findIndex((line) =>
    stopSpecPatterns.some((pattern) => pattern.test(String(line))),
  )
  const cleanLines = stopIndex >= 0 ? value.slice(0, stopIndex) : value

  return cleanLines.map(String).join('\n')
}

const EquipmentDetails = ({ item }: EquipmentDetailsProps) => {
  const [galleryImages, setGalleryImages] = useState(item.images)
  const [galleryTotal, setGalleryTotal] = useState(item.images_total || item.images.length)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [loadingMorePhotos, setLoadingMorePhotos] = useState(false)
  const [photoError, setPhotoError] = useState('')
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const selectedImage = galleryImages[selectedIndex]
  const hasGallery = galleryTotal > 1
  const canShowMorePhotos = galleryImages.length < galleryTotal
  const displaySpecs = Object.entries(item.specs ?? {})
    .map(([key, value]) => [key, cleanSpecValue(value)] as const)
    .filter(([, value]) => value.trim().length > 0)
  useEffect(() => {
    setGalleryImages(item.images)
    setGalleryTotal(item.images_total || item.images.length)
    setSelectedIndex(0)
    setPhotoError('')
  }, [item.images, item.images_total, item.slug])

  const showPrevious = () => setSelectedIndex((current) => (current === 0 ? galleryImages.length - 1 : current - 1))
  const showNext = () => setSelectedIndex((current) => (current === galleryImages.length - 1 ? 0 : current + 1))
  const selectGalleryImage = (index: number) => {
    setSelectedIndex(index)
    carouselRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  const loadMorePhotos = async () => {
    if (loadingMorePhotos || !canShowMorePhotos) {
      return
    }

    setLoadingMorePhotos(true)
    setPhotoError('')

    try {
      const data = await getEquipmentImages(item.slug, galleryImages.length, 12)
      setGalleryImages((current) => [...current, ...data.items])
      setGalleryTotal(data.total)
    } catch {
      setPhotoError('Could not load more photos. Please try again.')
    } finally {
      setLoadingMorePhotos(false)
    }
  }

  return (
    <div className="min-w-0 max-w-full">
      <div className="premium-card max-w-full overflow-hidden">
        <div
          ref={carouselRef}
          className="relative aspect-[4/3] max-h-[500px] min-h-[250px] w-full sm:h-[500px] sm:aspect-auto"
          tabIndex={0}
          role="region"
          aria-label={`${item.title} photo carousel`}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') showPrevious()
            if (event.key === 'ArrowRight') showNext()
          }}
        >
          <EquipmentVisual image={selectedImage} title={item.title} category={item.category} />
          {hasGallery && (
            <>
              <button
                type="button"
                onClick={showPrevious}
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-stone-950 shadow-lg ring-1 ring-stone-200 transition hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-emerald-900/20 sm:h-12 sm:w-12"
                aria-label="Previous photo"
              >
                <FaChevronLeft />
              </button>
              <button
                type="button"
                onClick={showNext}
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-stone-950 shadow-lg ring-1 ring-stone-200 transition hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-emerald-900/20 sm:h-12 sm:w-12"
                aria-label="Next photo"
              >
                <FaChevronRight />
              </button>
              <div className="absolute bottom-3 right-3 rounded-md bg-stone-950/85 px-3 py-2 text-sm font-extrabold text-white backdrop-blur">
                {selectedIndex + 1} / {galleryTotal}
              </div>
            </>
          )}
        </div>
      </div>

      {hasGallery && (
        <div className="mt-4 min-w-0 max-w-full">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-extrabold text-stone-950">Photo Gallery</h2>
            <p className="text-sm font-semibold text-stone-500">{galleryTotal} photos</p>
          </div>
          <div className="mt-3 grid min-w-0 gap-2 [grid-template-columns:repeat(auto-fit,minmax(104px,1fr))] sm:grid-cols-4">
            {galleryImages.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => selectGalleryImage(index)}
                className={`min-w-0 aspect-[4/3] overflow-hidden rounded-md border bg-stone-100 transition ${
                  selectedIndex === index ? 'border-emerald-900 ring-2 ring-emerald-900/20' : 'border-stone-200 hover:border-emerald-700'
                }`}
                aria-label={`View photo ${index + 1}`}
              >
                <img
                  src={resolveMediaUrl(image)}
                  alt={`${item.title} photo ${index + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
          {galleryTotal > galleryImages.length && (
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              {canShowMorePhotos && (
                <button
                  type="button"
                  onClick={loadMorePhotos}
                  disabled={loadingMorePhotos}
                  className="inline-flex min-h-11 w-full max-w-full items-center justify-center rounded-md border border-emerald-900 bg-white px-4 text-center text-sm font-extrabold text-emerald-950 transition hover:bg-emerald-50 sm:w-auto"
                >
                  {loadingMorePhotos
                    ? 'Loading Photos...'
                    : `Load More Photos (${galleryImages.length} / ${galleryTotal})`}
                </button>
              )}
            </div>
          )}
          {photoError && <p className="mt-3 text-sm font-semibold text-red-700">{photoError}</p>}
        </div>
      )}

    <div className="premium-card mt-8 max-w-full p-5 sm:p-7">
      <p className="premium-kicker">
        {item.status} / {item.condition} / {item.category}
      </p>
      <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <h1 className="text-3xl font-black uppercase leading-tight text-stone-950 sm:text-4xl">{item.title}</h1>
        </div>
        <p className="shrink-0 rounded-md bg-stone-950 px-4 py-3 text-2xl font-black text-white sm:text-3xl">{formatPrice(item.price)}</p>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Spec icon={<FaHorseHead />} label="Power" value={item.power_hp ? `${item.power_hp} hp` : 'N/A'} />
        <Spec icon={<FaGaugeHigh />} label="Hours" value={item.engine_hours_label ?? (item.engine_hours ? `${formatNumber(item.engine_hours)} on meter` : 'N/A')} />
        <Spec icon={<FaLocationDot />} label="Location" value={item.location} />
        <Spec icon={<FaCircleCheck />} label="Stock" value={item.stock_number || 'Request'} />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Spec icon={<FaCircleCheck />} label="Year" value={String(item.year)} />
        <Spec icon={<FaCircleCheck />} label="Serial" value={item.serial_number || 'Request'} />
        <Spec icon={<FaTruckFast />} label="Delivery" value={item.delivery_available ? 'Available' : 'Ask sales'} />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-extrabold text-stone-950">Key Features</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {item.features.map((feature) => (
            <div key={feature} className="flex items-center gap-3 rounded-md border border-emerald-100 bg-emerald-50/80 px-4 py-3 font-semibold text-stone-800 shadow-sm">
              <FaCircleCheck className="text-emerald-800" /> {feature}
            </div>
          ))}
        </div>
      </div>

      {displaySpecs.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-extrabold text-stone-950">Additional Specs</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {displaySpecs.map(([key, value]) => (
              <div key={key} className="rounded-md border border-stone-200 bg-stone-50 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-stone-500">{key.replaceAll('_', ' ')}</p>
                <p className="mt-1 whitespace-pre-line font-extrabold text-stone-950">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

export default EquipmentDetails
