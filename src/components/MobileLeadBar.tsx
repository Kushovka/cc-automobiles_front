import { useState } from 'react'
import { FaPhoneVolume, FaXmark } from 'react-icons/fa6'
import LeadForm from './LeadForm'
import { business } from '../data/business'

const MobileLeadBar = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-300 bg-white px-3 py-2 shadow-[0_-12px_32px_rgba(28,25,23,0.16)] md:hidden">
        <div className="grid grid-cols-2 gap-2">
          <a
            href={`tel:${business.phoneHref}`}
            className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-emerald-950 px-3 text-base font-extrabold text-white"
          >
            <FaPhoneVolume /> Call
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="min-h-12 rounded-md bg-amber-400 px-3 text-base font-extrabold text-stone-950"
          >
            Request Quote
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] bg-stone-950/60 px-3 py-5 backdrop-blur-sm md:hidden">
          <div className="mx-auto max-h-full max-w-md overflow-y-auto rounded-lg bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-200 bg-white px-4 py-3">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wide text-emerald-900">Fast Dealer Request</p>
                <p className="font-extrabold text-stone-950">{business.phone}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-stone-300 text-stone-700"
                aria-label="Close request form"
              >
                <FaXmark />
              </button>
            </div>
            <LeadForm compact leadType="quote" title="Request a Quote" onSuccess={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}

export default MobileLeadBar
