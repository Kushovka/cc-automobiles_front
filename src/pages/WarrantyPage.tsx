import { FaBan, FaCheckCircle, FaShieldAlt } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import { SectionHeading } from '../components/SectionHeading'
import { Seo } from '../components/Seo'

const covered = ['Internal engine components', 'Internal transmission components', 'Drive axles and axle shafts', 'Driveshaft', 'A/C and heating', 'Electrical: windows, locks, sensors, multimedia']
const notCovered = ['Brakes and tires', 'Suspension and steering', 'Battery, belts, hoses, filters', 'Cosmetic damage', 'Scheduled maintenance']
const voids = ['Aftermarket parts or tuning', 'Missed maintenance', 'Accident damage', 'Towing beyond rating, off-road use, or racing', 'Repair outside dealer-authorized service']
const buyerTerms = [
  ['Return window', 'Return requests are available within 14 calendar days of delivery or pickup, according to the final purchase paperwork.'],
  ['Dealer-covered return', 'When return terms are met, return costs are handled by the dealership and the vehicle refund is processed according to the signed documents.'],
  ['Warranty start date', 'Warranty starts from the purchase date or delivery date for out-of-area customers.'],
  ['Time and mileage limit', 'Coverage is measured by both days and mileage at the same time; it ends when either 90 days or 5,000 miles is reached first.'],
  ['Maintenance records', 'Keep all service and maintenance receipts. Missing records may affect warranty eligibility.'],
  ['Written agreements', 'Keep all promises, approvals, and repair instructions in writing before authorizing work.'],
  ['Service provider', 'Confirm whether coverage is handled directly by C&C Automobiles or through a third-party warranty company.'],
  ['Final paperwork controls', 'Actual coverage, exclusions, deductible, term, and return terms are controlled by the documents signed at purchase.'],
]
const warrantyGroups: { title: string; items: string[]; Icon: IconType }[] = [
  { title: 'Covered', items: covered, Icon: FaCheckCircle },
  { title: 'Not covered', items: notCovered, Icon: FaBan },
  { title: 'What voids coverage', items: voids, Icon: FaBan },
]

export const WarrantyPage = () => (
  <>
    <Seo title="Warranty and Returns" description="Review warranty and return policy details for used vehicles at C&C Automobiles." />
    <section className="section bg-slate-100">
      <SectionHeading eyebrow="Warranty" title="Warranty and returns in plain English" text="Clear coverage helps you buy a used vehicle with more confidence." />
      <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="rounded-lg border border-blue-950/10 bg-white p-6 shadow-sm shadow-blue-950/5">
          <FaShieldAlt className="text-3xl text-blue-800" />
          <h2 className="mt-4 text-3xl font-semibold">14-day return</h2>
          <p className="mt-3 text-lg leading-8 text-zinc-700">No-question return window, dealer-covered return costs, and refund terms explained before purchase.</p>
        </div>
        <div className="rounded-lg border border-blue-950/10 bg-white p-6 shadow-sm shadow-blue-950/5">
          <FaShieldAlt className="text-3xl text-blue-800" />
          <h2 className="mt-4 text-3xl font-semibold">90 days / 5,000 miles</h2>
          <p className="mt-3 text-lg leading-8 text-zinc-700">Coverage focuses on major internal components and selected comfort/electrical systems.</p>
        </div>
      </div>
      <div className="mx-auto mt-6 grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        {warrantyGroups.map(({ title, items, Icon }) => (
          <div key={title} className="rounded-lg border border-blue-950/10 bg-white p-6 shadow-sm shadow-blue-950/5">
            <h3 className="text-2xl font-semibold text-zinc-950">{title}</h3>
            <div className="mt-5 grid gap-3">
              {items.map((item) => <p key={item} className="flex gap-2 text-sm font-semibold text-zinc-700"><Icon className="mt-1 text-blue-800" /> {item}</p>)}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-blue-950/10 bg-white p-6 shadow-sm shadow-blue-950/5">
          <h3 className="text-2xl font-semibold text-zinc-950">Important buyer terms</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {buyerTerms.map(([title, text]) => (
              <div key={title} className="border-t border-blue-950/10 pt-4">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-800">{title}</p>
                <p className="mt-2 text-sm font-semibold leading-7 text-zinc-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </>
)
