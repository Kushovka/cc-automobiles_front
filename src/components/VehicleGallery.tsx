import { useCallback, useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaSearchPlus, FaTimes } from 'react-icons/fa'

type VehicleGalleryProps = {
  images: string[]
  title: string
}

const swipeThreshold = 48

export const VehicleGallery = ({ images, title }: VehicleGalleryProps) => {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [zoomed, setZoomed] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const hasManyImages = images.length > 1
  const currentImage = images[active] ?? images[0]

  const goTo = useCallback((index: number) => {
    if (!images.length) return
    setActive((index + images.length) % images.length)
    setZoomed(false)
  }, [images.length])

  const previous = useCallback(() => goTo(active - 1), [active, goTo])
  const next = useCallback(() => goTo(active + 1), [active, goTo])

  const handlePointerDown = (clientX: number) => {
    setTouchStart(clientX)
  }

  const handlePointerUp = (clientX: number) => {
    if (touchStart === null || !hasManyImages) return

    const delta = clientX - touchStart
    if (Math.abs(delta) > swipeThreshold) {
      if (delta > 0) {
        previous()
      } else {
        next()
      }
    }
    setTouchStart(null)
  }

  useEffect(() => {
    if (!lightbox) return undefined

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightbox(false)
      }
      if (event.key === 'ArrowLeft') {
        previous()
      }
      if (event.key === 'ArrowRight') {
        next()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightbox, next, previous])

  if (!images.length) {
    return <div className="min-h-[320px] rounded-lg bg-slate-100" />
  }

  return (
    <div>
      <div
        className="group relative overflow-hidden rounded-lg bg-slate-100 shadow-sm shadow-blue-950/10"
        onPointerDown={(event) => handlePointerDown(event.clientX)}
        onPointerUp={(event) => handlePointerUp(event.clientX)}
      >
        <button className="block w-full" onClick={() => setLightbox(true)} type="button">
          <img src={currentImage} alt={title} className="h-[320px] w-full object-cover sm:h-[520px]" />
        </button>

        {hasManyImages ? (
          <>
            <button
              aria-label="Previous image"
              className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/35 text-sm text-white opacity-0 backdrop-blur transition hover:bg-black/55 group-hover:opacity-100"
              onClick={previous}
              type="button"
            >
              <FaChevronLeft />
            </button>
            <button
              aria-label="Next image"
              className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/35 text-sm text-white opacity-0 backdrop-blur transition hover:bg-black/55 group-hover:opacity-100"
              onClick={next}
              type="button"
            >
              <FaChevronRight />
            </button>
          </>
        ) : null}

        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <span className="rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
            {active + 1} / {images.length}
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            aria-label={`Show image ${index + 1}`}
            className={`overflow-hidden rounded-md border transition ${active === index ? 'border-blue-900 opacity-100 shadow-sm shadow-blue-950/10' : 'border-transparent opacity-60 hover:opacity-90'}`}
            onClick={() => goTo(index)}
            type="button"
          >
            <img src={image} alt={`${title} thumbnail ${index + 1}`} className="h-20 w-full object-cover sm:h-24" />
          </button>
        ))}
      </div>

      {lightbox ? (
        <div
          className="fixed inset-0 z-[70] bg-black/95 p-4"
          onPointerDown={(event) => handlePointerDown(event.clientX)}
          onPointerUp={(event) => handlePointerUp(event.clientX)}
        >
          <button
            aria-label="Close gallery"
            className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-sm text-white backdrop-blur transition hover:bg-white/20"
            onClick={() => setLightbox(false)}
            type="button"
          >
            <FaTimes />
          </button>

          {hasManyImages ? (
            <>
              <button
                aria-label="Previous image"
                className="absolute left-5 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/10 text-sm text-white backdrop-blur transition hover:bg-white/20"
                onClick={previous}
                type="button"
              >
                <FaChevronLeft />
              </button>
              <button
                aria-label="Next image"
                className="absolute right-5 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/10 text-sm text-white backdrop-blur transition hover:bg-white/20"
                onClick={next}
                type="button"
              >
                <FaChevronRight />
              </button>
            </>
          ) : null}

          <button
            aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
            className="absolute bottom-5 left-1/2 z-10 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border border-white/15 bg-white/10 text-sm text-white backdrop-blur transition hover:bg-white/20"
            onClick={() => setZoomed((value) => !value)}
            type="button"
          >
            <FaSearchPlus className={zoomed ? 'scale-90 opacity-70' : ''} />
          </button>

          <div className="flex h-full items-center justify-center overflow-auto px-8 py-12 sm:px-12">
            <img
              src={currentImage}
              alt={title}
              className={`${zoomed ? 'max-h-none max-w-none cursor-zoom-out scale-150' : 'max-h-[84vh] w-full max-w-6xl cursor-zoom-in'} object-contain transition-transform duration-200`}
              onClick={() => setZoomed((value) => !value)}
            />
          </div>

          <span className="absolute bottom-5 right-5 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
            {active + 1} / {images.length}
          </span>
        </div>
      ) : null}
    </div>
  )
}
