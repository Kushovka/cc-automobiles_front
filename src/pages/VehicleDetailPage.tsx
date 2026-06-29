import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router'
import { FaCheckCircle, FaEnvelope, FaPhoneAlt } from 'react-icons/fa'
import { getVehicle } from '../api/vehicles'
import { Button } from '../components/Button'
import { LeadForm } from '../components/LeadForm'
import { Seo } from '../components/Seo'
import { VehicleDetailSkeleton } from '../components/Skeletons'
import { VehicleGallery } from '../components/VehicleGallery'
import { business } from '../data/business'
import { vehicles } from '../data/inventory'
import type { Vehicle } from '../types/vehicle'
import { trackContactCta } from '../utils/ctaTracking'
import { formatNumber, formatPrice } from '../utils/format'
import { trackViewContent } from '../utils/metaPixel'

export const VehicleDetailPage = () => {
  const { slug } = useParams()
  const [vehicle, setVehicle] = useState<Vehicle | null>(() => vehicles.find((item) => item.slug === slug) ?? null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false

    getVehicle(slug ?? '')
      .then((item) => {
        if (!cancelled) {
          setVehicle(item)
          trackViewContent(item.id, `${item.year} ${item.make} ${item.model} ${item.trim}`, item.price)
        }
      })
      .catch(() => {
        if (!cancelled) {
          const fallbackVehicle = vehicles.find((item) => item.slug === slug) ?? null
          setVehicle(fallbackVehicle)
          if (fallbackVehicle) {
            trackViewContent(
              fallbackVehicle.id,
              `${fallbackVehicle.year} ${fallbackVehicle.make} ${fallbackVehicle.model} ${fallbackVehicle.trim}`,
              fallbackVehicle.price,
            )
          }
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoaded(true)
        }
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  if (!vehicle && loaded) return <Navigate to="/inventory" replace />
  if (!vehicle) return <VehicleDetailSkeleton />

  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`

  return (
    <>
      <Seo
        title={title}
        description={`${title} for sale at C&C Automobiles in Stratford, CT. Call or request info today.`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Vehicle',
          name: title,
          brand: vehicle.make,
          model: vehicle.model,
          vehicleModelDate: vehicle.year,
          mileageFromOdometer: `${vehicle.mileage} MI`,
          offers: { '@type': 'Offer', price: vehicle.price, priceCurrency: 'USD' },
        }}
      />
      <section className="section bg-slate-100">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <VehicleGallery images={vehicle.images} title={title} />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-800">Stock #{vehicle.stockNumber}</p>
            <h1 className="mt-2 text-4xl font-semibold text-zinc-950">{title}</h1>
            <p className="mt-3 text-4xl font-semibold text-blue-800">{formatPrice(vehicle.price)}</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                ['VIN', vehicle.vin],
                ['Mileage', `${formatNumber(vehicle.mileage)} mi`],
                ['Body', vehicle.bodyType],
                ['Transmission', vehicle.transmission],
                ['Drivetrain', vehicle.drivetrain],
                ['Engine', vehicle.engine],
                ['Exterior', vehicle.exteriorColor],
                ['Interior', vehicle.interiorColor],
              ].map(([label, value]) => (
                <div key={label} className="min-w-0 rounded-md border border-blue-950/10 bg-white p-4 shadow-sm shadow-blue-950/5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">{label}</p>
                  <p className={`mt-1 font-semibold text-zinc-950 ${label === 'VIN' ? 'break-all text-sm leading-6' : ''}`}>{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={`tel:${business.phoneHref}`}><FaPhoneAlt /> Call Now</Button>
              <Button href="#request-info" variant="secondary" onClick={() => trackContactCta('contact_form_click', 'Vehicle Request Info')}>Request Info</Button>
            </div>
            <p className="mt-6 text-lg leading-8 text-zinc-700">{vehicle.description}</p>
            <div className="mt-6 grid gap-2">
              {vehicle.features.map((feature) => (
                <p key={feature} className="flex items-center gap-2 font-semibold text-zinc-800"><FaCheckCircle className="text-blue-800" /> {feature}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="request-info" className="section">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <LeadForm title="Request Info" vehicleId={vehicle.id} vehicleName={title} vehicleValue={vehicle.price} />
        </div>
      </section>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-blue-950/10 bg-white/95 px-4 py-3 shadow-[0_-18px_36px_rgba(15,23,42,0.16)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-zinc-950">{title}</p>
            <p className="text-base font-semibold text-blue-800">{formatPrice(vehicle.price)}</p>
          </div>
          <a
            href={`tel:${business.phoneHref}`}
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-950 text-white shadow-sm shadow-blue-950/20"
            aria-label="Call about this vehicle"
            onClick={() => trackContactCta('phone_click', 'Vehicle Sticky Phone')}
          >
            <FaPhoneAlt />
          </a>
          <a
            href="#request-info"
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-800 text-white shadow-sm shadow-blue-950/20"
            aria-label="Request info about this vehicle"
            onClick={() => trackContactCta('contact_form_click', 'Vehicle Sticky Request Info')}
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </>
  )
}
