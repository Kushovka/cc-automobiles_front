import { useEffect, useState } from 'react'
import { FaCheckCircle, FaClock, FaMapMarkerAlt, FaPhoneAlt, FaShieldAlt, FaTruck } from 'react-icons/fa'
import { listGoogleReviews } from '../api/reviews'
import { listVehicles } from '../api/vehicles'
import { Button } from '../components/Button'
import { SectionHeading } from '../components/SectionHeading'
import { Seo } from '../components/Seo'
import { VehicleGridSkeleton } from '../components/Skeletons'
import { VehicleCard } from '../components/VehicleCard'
import { ReviewCarousel } from '../components/ReviewCarousel'
import { business } from '../data/business'
import type { GoogleReview } from '../api/reviews'
import type { Vehicle } from '../types/vehicle'
import { trackContactCta } from '../utils/ctaTracking'
import { autoDealerSchema } from '../utils/schema'

const trustItems = ['Local Stratford dealership', 'Financing options', 'Warranty available', 'Delivery available', 'Google reviews']

export const HomePage = () => {
  const [featured, setFeatured] = useState<Vehicle[]>([])
  const [featuredLoading, setFeaturedLoading] = useState(true)
  const [featuredError, setFeaturedError] = useState(false)
  const [customerReviews, setCustomerReviews] = useState<GoogleReview[]>([])
  const [reviewsLoading, setReviewsLoading] = useState(true)
  const [reviewsError, setReviewsError] = useState(false)

  useEffect(() => {
    let cancelled = false

    listVehicles({ featured: true, pageSize: 3 })
      .then((response) => {
        if (!cancelled) {
          setFeatured(response.items)
          setFeaturedError(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setFeatured([])
          setFeaturedError(true)
        }
      })
      .finally(() => {
        if (!cancelled) {
          setFeaturedLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    listGoogleReviews()
      .then((items) => {
        if (!cancelled) {
          setCustomerReviews(items)
          setReviewsError(items.length === 0)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCustomerReviews([])
          setReviewsError(true)
        }
      })
      .finally(() => {
        if (!cancelled) {
          setReviewsLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
    <Seo
      title="Quality Used Cars in Stratford, CT"
      description="C&C Automobiles is a local used car dealership and auto service business in Stratford, CT. View inventory, call now, or get directions."
      schema={autoDealerSchema}
    />
    <section className="relative overflow-hidden bg-zinc-950 text-white">
      <div className="absolute inset-0">
        <img
          src="/images/cc-automobiles-storefront.webp"
          alt="C&C Automobiles storefront on Barnum Ave in Stratford, CT"
          className="h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-zinc-950/85 to-black/25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_36%,rgba(0,0,0,0.32),transparent_34%)]" />
      </div>
      <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-200">Used cars and auto service in Stratford</p>
          <h1 className="mt-4 text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">Quality Used Cars in Stratford, CT</h1>
          <p className="mt-5 max-w-2xl text-xl leading-9 text-zinc-100">
            C&C Automobiles helps local drivers find reliable used vehicles with simple answers, fair pricing, and a fast path from interest to keys.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/inventory">View Inventory</Button>
            <Button href={`tel:${business.phoneHref}`} variant="light"><FaPhoneAlt /> Call Now</Button>
            <Button href={business.mapsUrl} variant="secondary"><FaMapMarkerAlt /> Get Directions</Button>
          </div>
          <div className="mt-7 flex max-w-2xl flex-col gap-3 border-t border-white/15 pt-5 text-sm font-semibold text-white sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-2">
            <a
              href={`tel:${business.phoneHref}`}
              className="group inline-flex items-center gap-2 transition hover:text-blue-100"
              onClick={() => trackContactCta('phone_click', 'Home Hero Phone')}
            >
              <FaPhoneAlt className="text-sm text-blue-300" />
              <span className="leading-tight">{business.phone}</span>
            </a>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 transition hover:text-blue-100"
              onClick={() => trackContactCta('directions_click', 'Home Hero Address')}
            >
              <FaMapMarkerAlt className="text-sm text-blue-300" />
              <span className="leading-tight">{business.address}</span>
            </a>
            <div className="inline-flex items-center gap-2">
              <FaClock className="text-sm text-blue-300" />
              <span className="leading-tight">{business.hours}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="border-y border-blue-950/10 bg-white">
      <div className="mx-auto grid max-w-7xl gap-px px-4 py-3 sm:px-6 md:grid-cols-5 lg:px-8">
        {trustItems.map((item) => (
          <div key={item} className="flex min-h-11 items-center justify-center gap-2 px-3 text-center text-sm font-semibold text-zinc-800 md:border-l md:border-blue-950/10 md:first:border-l-0">
            <FaCheckCircle className="shrink-0 text-blue-700" /> {item}
          </div>
        ))}
      </div>
    </section>

    <section className="section">
      <SectionHeading
        eyebrow="Featured Inventory"
        title="Ready-to-drive vehicles"
        text="Browse popular cars, SUVs, trucks, and crossovers available from a local Connecticut dealership."
      />
      <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {featuredLoading ? <VehicleGridSkeleton count={3} /> : featuredError ? (
          <div className="rounded-lg border border-blue-950/10 bg-white p-6 text-center text-zinc-700 shadow-sm md:col-span-2 lg:col-span-3">
            Inventory is temporarily unavailable. Please try again later or call us for current vehicles.
          </div>
        ) : featured.length ? featured.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />) : (
          <div className="rounded-lg border border-blue-950/10 bg-white p-6 text-center text-zinc-700 shadow-sm md:col-span-2 lg:col-span-3">
            No featured vehicles are available right now. Please check the full inventory or call us.
          </div>
        )}
      </div>
      <div className="mt-8 text-center">
        <Button href="/inventory" variant="secondary">See All Inventory</Button>
      </div>
    </section>

    <section className="section bg-slate-100">
      <SectionHeading eyebrow="Why Choose Us" title="Simple, local, and straightforward" />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <img
          src="/images/cc-automobiles-service-bay-square.webp"
          alt="C&C Automobiles service bay with technicians working on a vehicle"
          className="aspect-square w-full rounded-lg object-cover shadow-sm"
          loading="lazy"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            ['Transparent pricing', 'Clear vehicle information and practical answers before you visit.'],
            ['Financing support', 'Options for different credit situations with a quick response.'],
            ['Warranty available', 'Coverage choices explained in plain English before purchase.'],
            ['Service support', 'A real local service bay behind the dealership experience.'],
          ].map(([title, text]) => (
            <div key={title} className="rounded-lg border border-blue-950/10 bg-white p-5 shadow-sm">
              <FaShieldAlt className="text-2xl text-blue-700" />
              <h3 className="mt-4 text-xl font-semibold text-zinc-950">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-zinc-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section">
      <SectionHeading eyebrow="Google Reviews" title="What local drivers say" text="Recent Google reviews from customers." />
      <ReviewCarousel reviews={customerReviews} loading={reviewsLoading} error={reviewsError} />
    </section>

    <section className="bg-gradient-to-r from-black via-zinc-950 to-zinc-900 py-12 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <h2 className="text-3xl font-semibold">Get pre-approved today</h2>
          <p className="mt-2 text-lg text-blue-50">A short form, quick follow-up, and no pressure.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/financing" variant="light">Get Financing</Button>
          <Button href="/delivery" variant="secondary"><FaTruck /> Delivery Options</Button>
        </div>
      </div>
    </section>

    <section className="section bg-slate-100">
      <div className="mx-auto grid max-w-7xl items-stretch gap-6 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="h-full rounded-lg border border-blue-950/10 bg-white p-6 shadow-sm">
          <h2 className="text-3xl font-semibold text-zinc-950">Visit C&C Automobiles</h2>
          <div className="mt-5 grid gap-3 text-base font-semibold text-zinc-700">
            <p>{business.address}, {business.cityState}</p>
            <a className="text-blue-800" href={`tel:${business.phoneHref}`} onClick={() => trackContactCta('phone_click', 'Visit Section Phone')}>{business.phone}</a>
            <p>{business.hours}</p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href={`tel:${business.phoneHref}`}>Call Now</Button>
            <Button href={business.mapsUrl} variant="secondary">Get Directions</Button>
          </div>
          <iframe
            title="C&C Automobiles map"
            className="mt-6 h-52 w-full rounded-md border-0 shadow-sm"
            loading="lazy"
            src="https://www.google.com/maps?q=1201%20Barnum%20Ave%2C%20Stratford%2C%20CT%2006614&output=embed"
          />
        </div>
        <img
          src="/images/cc-automobiles-storefront.webp"
          alt="C&C Automobiles storefront on Barnum Ave"
          className="h-full min-h-[360px] w-full rounded-lg object-cover shadow-sm"
          loading="lazy"
        />
      </div>
    </section>
    </>
  )
}
