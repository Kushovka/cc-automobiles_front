import { SectionHeading } from '../components/SectionHeading'
import { Seo } from '../components/Seo'
import { business } from '../data/business'

const terms = [
  ['Website information', 'Inventory, pricing, mileage, equipment, photos, availability, financing examples, and vehicle details are provided for convenience and may change without notice. Confirm all details directly with C&C Automobiles before relying on them.'],
  ['Vehicle availability', 'A vehicle is not held, reserved, or sold until the required dealership paperwork, payment, and approval steps are completed. Online inquiries do not create a purchase agreement.'],
  ['Pricing and fees', 'Listed prices may not include tax, title, registration, dealer documentation, lender fees, optional products, shipping, or other government and third-party charges unless specifically stated.'],
  ['Financing', 'Financing is subject to credit approval, lender requirements, vehicle eligibility, income verification, down payment, and final contract terms. Examples are estimates, not guarantees.'],
  ['Trade-ins', 'Trade-in values are estimates until the vehicle is physically inspected and title, condition, mileage, history, and payoff information are verified.'],
  ['Warranty and returns', 'Warranty, return, deductible, coverage, and exclusion details are controlled by the signed buyer documents and any warranty contract provided at purchase.'],
  ['Website use', 'Do not misuse the website, submit false information, interfere with service operation, or attempt unauthorized access to any systems.'],
]

export const TermsPage = () => (
  <>
    <Seo title="Terms" description="Review C&C Automobiles website terms for inventory, pricing, financing, trade-ins, warranty, and website use." />
    <section className="section bg-slate-100">
      <SectionHeading eyebrow="Terms" title="Website Terms" text="Important conditions for using the site and reviewing dealership information." />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-blue-950/10 bg-white p-6 shadow-sm shadow-blue-950/5">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-800">Last updated: June 24, 2026</p>
          <div className="mt-6 grid gap-6">
            {terms.map(([title, text]) => (
              <div key={title} className="border-t border-blue-950/10 pt-5 first:border-t-0 first:pt-0">
                <h2 className="text-xl font-semibold text-zinc-950">{title}</h2>
                <p className="mt-2 text-base font-semibold leading-8 text-zinc-700">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-md bg-slate-100 p-4 text-sm font-semibold leading-7 text-zinc-700">
            For current vehicle details or terms, contact {business.name} at{' '}
            <a className="font-semibold text-blue-800" href={`tel:${business.phoneHref}`}>{business.phone}</a>.
          </div>
        </div>
      </div>
    </section>
  </>
)
