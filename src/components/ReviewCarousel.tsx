import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaStar, FaTimes } from 'react-icons/fa'
import type { GoogleReview } from '../api/reviews'
import { business } from '../data/business'

type ReviewCarouselProps = {
  reviews: GoogleReview[]
  loading?: boolean
  error?: boolean
}

const getVisibleCount = () => {
  if (typeof window === 'undefined') return 3
  if (window.innerWidth >= 1024) return 3
  if (window.innerWidth >= 768) return 2
  return 1
}

const sortReviews = (reviews: GoogleReview[]) =>
  [...reviews].sort((first, second) => {
    const firstTime = first.publish_time ? new Date(first.publish_time).getTime() : 0
    const secondTime = second.publish_time ? new Date(second.publish_time).getTime() : 0
    return secondTime - firstTime
  })

export const ReviewCarousel = ({ reviews, loading = false, error = false }: ReviewCarouselProps) => {
  const sortedReviews = useMemo(() => sortReviews(reviews), [reviews])
  const [active, setActive] = useState(0)
  const [visibleCount, setVisibleCount] = useState(getVisibleCount)
  const [selectedReview, setSelectedReview] = useState<GoogleReview | null>(null)

  const displayedReviews = useMemo(() => {
    const count = Math.min(visibleCount, sortedReviews.length)
    return Array.from({ length: count }, (_, index) => sortedReviews[(active + index) % sortedReviews.length])
  }, [active, sortedReviews, visibleCount])

  const goTo = useCallback((direction: number) => {
    setActive((index) => (index + direction + sortedReviews.length) % sortedReviews.length)
  }, [sortedReviews.length])

  useEffect(() => {
    const onResize = () => setVisibleCount(getVisibleCount())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (loading) {
    return (
      <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {Array.from({ length: visibleCount }).map((_, index) => (
          <div key={index} className="h-[340px] animate-pulse rounded-lg border border-blue-950/10 bg-white p-5 shadow-sm">
            <div className="h-4 w-28 rounded bg-slate-200" />
            <div className="mt-8 space-y-3">
              <div className="h-3 rounded bg-slate-200" />
              <div className="h-3 rounded bg-slate-200" />
              <div className="h-3 w-2/3 rounded bg-slate-200" />
            </div>
            <div className="mt-20 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-200" />
              <div className="space-y-2">
                <div className="h-3 w-24 rounded bg-slate-200" />
                <div className="h-3 w-16 rounded bg-slate-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (sortedReviews.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div className="rounded-lg border border-blue-950/10 bg-white p-6 shadow-sm">
          <p className="text-lg font-semibold text-zinc-950">
            {error ? 'Google reviews are temporarily unavailable.' : 'Google reviews are not available right now.'}
          </p>
          <p className="mt-2 text-sm leading-7 text-zinc-600">
            You can still view the full review history directly on Google Maps.
          </p>
          <a
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md bg-blue-800 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-950/20 transition hover:bg-blue-900"
            href={business.reviewsUrl}
            target="_blank"
            rel="noreferrer"
          >
            View Google reviews
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-blue-950/10 bg-white text-blue-950 shadow-sm transition hover:bg-blue-50"
            onClick={() => goTo(-1)}
            aria-label="Previous reviews"
          >
            <FaChevronLeft />
          </button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-blue-950/10 bg-white text-blue-950 shadow-sm transition hover:bg-blue-50"
            onClick={() => goTo(1)}
            aria-label="Next reviews"
          >
            <FaChevronRight />
          </button>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {displayedReviews.map((review) => (
              <motion.article
                key={`${review.author}-${review.publish_time ?? review.date ?? review.text.slice(0, 18)}`}
                className="flex h-[340px] flex-col overflow-hidden rounded-lg border border-blue-950/10 bg-white p-5 shadow-sm"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <div className="flex gap-1 text-amber-500">
                  {Array.from({ length: Math.round(review.rating) }).map((_, index) => <FaStar key={index} />)}
                </div>
                <button
                  type="button"
                  className="mt-4 min-h-0 flex-1 overflow-hidden text-left text-sm leading-7 text-zinc-700 transition hover:text-zinc-950"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 6,
                    WebkitBoxOrient: 'vertical',
                  }}
                  onClick={() => setSelectedReview(review)}
                >
                  {review.text}
                </button>
                <button
                  type="button"
                  className="mt-2 self-start text-xs font-semibold uppercase tracking-[0.12em] text-blue-800 hover:text-blue-950"
                  onClick={() => setSelectedReview(review)}
                >
                  Read full review
                </button>
                <div className="mt-4 flex items-center gap-3">
                  {review.photo_url ? (
                    <img src={review.photo_url} alt={review.author} className="h-10 w-10 rounded-full object-cover" loading="lazy" />
                  ) : (
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-blue-50 text-sm font-semibold text-blue-800">
                      {review.author.slice(0, 1)}
                    </span>
                  )}
                  <div className="min-w-0">
                    {review.author_url ? (
                      <a className="line-clamp-1 font-semibold text-zinc-950 hover:text-blue-800" href={review.author_url} target="_blank" rel="noreferrer">
                        {review.author}
                      </a>
                    ) : (
                      <p className="line-clamp-1 font-semibold text-zinc-950">{review.author}</p>
                    )}
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">{review.date}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
        <p className="mt-5 text-center text-sm leading-7 text-zinc-600">
          Want to see more customer feedback?{' '}
          <a className="font-semibold text-blue-800 hover:text-blue-950" href={business.reviewsUrl} target="_blank" rel="noreferrer">
            View all Google reviews
          </a>
          .
        </p>
      </div>

      <AnimatePresence>
        {selectedReview ? (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-zinc-950/70 px-4 py-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedReview(null)}
          >
            <motion.article
              className="max-h-[min(720px,90vh)] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-2xl"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex gap-1 text-amber-500">
                    {Array.from({ length: Math.round(selectedReview.rating) }).map((_, index) => <FaStar key={index} />)}
                  </div>
                  <p className="mt-3 text-xl font-semibold text-zinc-950">{selectedReview.author}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">{selectedReview.date}</p>
                </div>
                <button
                  type="button"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-blue-950/10 text-blue-950 transition hover:bg-slate-100"
                  onClick={() => setSelectedReview(null)}
                  aria-label="Close review"
                >
                  <FaTimes />
                </button>
              </div>
              <p className="mt-5 text-base leading-8 text-zinc-700">{selectedReview.text}</p>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
