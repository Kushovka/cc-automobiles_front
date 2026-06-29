import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'
import { Button } from '../components/Button'
import { LeadForm } from '../components/LeadForm'
import { SectionHeading } from '../components/SectionHeading'
import { Seo } from '../components/Seo'
import { business } from '../data/business'
import { trackContactCta } from '../utils/ctaTracking'

export const ContactPage = () => (
  <>
    <Seo title="Contact" description="Call, visit, or send a message to C&C Automobiles in Stratford, CT." />
    <section className="section bg-slate-100">
      <SectionHeading eyebrow="Contact" title="Call, visit, or send a quick message" />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="rounded-lg border border-blue-950/10 bg-white p-6 shadow-sm shadow-blue-950/5">
          <h2 className="text-3xl font-semibold text-zinc-950">{business.name}</h2>
          <div className="mt-6 grid gap-4 text-lg font-semibold text-zinc-800">
            <a href={`tel:${business.phoneHref}`} className="flex gap-3 text-blue-800" onClick={() => trackContactCta('phone_click', 'Contact Page Phone')}><FaPhoneAlt className="mt-1" /> {business.phone}</a>
            <a href={`mailto:${business.email}`} className="flex gap-3"><FaEnvelope className="mt-1 text-blue-700" /> {business.email}</a>
            <a href={business.mapsUrl} target="_blank" rel="noreferrer" className="flex gap-3" onClick={() => trackContactCta('directions_click', 'Contact Page Address')}><FaMapMarkerAlt className="mt-1 text-blue-700" /> {business.address}, {business.cityState}</a>
            <p>{business.hours}</p>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <Button href={`tel:${business.phoneHref}`}>Call Now</Button>
            <Button href={business.mapsUrl} variant="secondary">Get Directions</Button>
          </div>
          <iframe
            title="C&C Automobiles map"
            className="mt-6 min-h-[300px] w-full rounded-lg border-0"
            loading="lazy"
            src="https://www.google.com/maps?q=1201%20Barnum%20Ave%2C%20Stratford%2C%20CT%2006614&output=embed"
          />
        </div>
        <LeadForm title="Send a Message" showSubject />
      </div>
    </section>
  </>
)
