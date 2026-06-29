import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { createLead } from '../api/leads'
import { trackingConfig } from '../config/tracking'
import { createMetaEventId, getCookieValue, splitName, trackLead } from '../utils/metaPixel'

type LeadFormProps = {
  title: string
  vehicleId?: string
  vehicleName?: string
  vehicleValue?: number
  fields?: 'contact' | 'finance' | 'trade'
  showSubject?: boolean
}

const getPhoneDigits = (value: string) => value.replace(/\D/g, '').slice(0, 10)

const formatUsPhone = (value: string) => {
  const digits = getPhoneDigits(value)

  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

export const LeadForm = ({ title, vehicleId, vehicleName, vehicleValue, fields = 'contact', showSubject = false }: LeadFormProps) => {
  const formStartedAt = useMemo(() => Date.now(), [])
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [phoneValue, setPhoneValue] = useState('')
  const [submitting, setSubmitting] = useState(false)

  return (
    <motion.form
      className="rounded-lg border border-blue-950/10 bg-white p-5 shadow-sm shadow-blue-950/5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
      onSubmit={async (event) => {
        event.preventDefault()
        const formElement = event.currentTarget
        setError('')
        setSent(false)
        setSubmitting(true)

        const form = new FormData(formElement)
        const firstName = String(form.get('firstName') ?? '').trim()
        const lastName = String(form.get('lastName') ?? '').trim()
        const phone = getPhoneDigits(phoneValue)
        const email = String(form.get('email') ?? '').trim()
        const subject = String(form.get('subject') ?? '').trim()
        const website = String(form.get('website') ?? '').trim()
        const preferredContact = String(form.get('preferredContact') ?? '').trim()
        const message = String(form.get('message') ?? '').trim()
        const customerName = `${firstName} ${lastName}`.trim()
        const leadType = fields === 'finance' ? 'financing' : fields === 'trade' ? 'trade-in' : vehicleId ? 'quote' : 'contact'
        const metaEventId = createMetaEventId('lead')
        const fbp = getCookieValue('_fbp')
        const fbc = getCookieValue('_fbc')
        const { firstName: metaFirstName, lastName: metaLastName } = splitName(customerName)
        const contentIds = [vehicleId ?? `${trackingConfig.meta.defaultLeadContentPrefix}-${leadType}`]
        const contentType = vehicleId ? trackingConfig.meta.productContentType : trackingConfig.meta.serviceContentType
        const contentName = vehicleName ?? `${leadType} request`
        const currency = trackingConfig.meta.currency
        const eventValue = vehicleValue ?? trackingConfig.meta.defaultLeadValue
        const tradeMake = String(form.get('make') ?? '').trim()
        const tradeModel = String(form.get('model') ?? '').trim()
        const tradeYear = String(form.get('year') ?? '').trim()
        const tradeMileage = String(form.get('mileage') ?? '').trim()
        const tradeVin = String(form.get('vin') ?? '').trim()
        const tradeCondition = String(form.get('condition') ?? '').trim()
        const financeDetails = fields === 'finance'
          ? `Desired vehicle: ${form.get('vehicle') ?? 'not provided'}. Monthly budget: ${form.get('budget') ?? 'not provided'}.`
          : ''

        if (phone.length !== 10) {
          setSubmitting(false)
          setError('Please enter a valid 10-digit US phone number.')
          return
        }

        try {
          await createLead({
            vehicleId,
            leadType,
            customerName,
            phone,
            email,
            subject: subject || undefined,
            preferredContact: preferredContact === 'Best time to contact' ? undefined : preferredContact,
            message: [message, financeDetails].filter(Boolean).join('\n\n'),
            tradeMake,
            tradeModel,
            tradeYear,
            tradeMileage,
            tradeVin,
            tradeCondition,
            metaEventId,
            fbp,
            fbc,
            userAgent: navigator.userAgent,
            eventSourceUrl: window.location.href,
            formStartedAt,
            website,
            contentIds,
            contentName,
            contentType,
            currency,
            value: eventValue ?? undefined,
          })
          try {
            trackLead({
              eventId: metaEventId,
              leadType,
              contentIds,
              contentName,
              contentType,
              currency,
              value: eventValue,
              advancedMatching: {
                email,
                phone,
                firstName: metaFirstName,
                lastName: metaLastName,
                externalId: email || phone,
                fbp,
                fbc,
              },
            })
          } catch {
            // Browser tracking can be blocked; the lead itself was already submitted.
          }
          setError('')
          setSent(true)
          setPhoneValue('')
          formElement.reset()
        } catch {
          setSent(false)
          setError('We could not send the request right now. Please call us or try again.')
        } finally {
          setSubmitting(false)
        }
      }}
    >
      <h3 className="text-2xl font-semibold text-zinc-950">{title}</h3>
      {vehicleName ? <p className="mt-1 text-sm font-semibold text-zinc-500">{vehicleName}</p> : null}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="hidden" aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <input required className="input" name="firstName" placeholder="First name" />
        <input required className="input" name="lastName" placeholder="Last name" />
        <input
          required
          className="input"
          name="phone"
          placeholder="(203) 555-0100"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          maxLength={14}
          pattern="\([0-9]{3}\) [0-9]{3}-[0-9]{4}"
          title="Enter a 10-digit US phone number"
          value={phoneValue}
          onChange={(event) => setPhoneValue(formatUsPhone(event.target.value))}
        />
        <input className="input" name="email" placeholder="Email" type="email" />
        {showSubject ? <input required className="input sm:col-span-2" name="subject" placeholder="Subject" /> : null}
        {fields === 'finance' ? (
          <>
            <input className="input" name="vehicle" placeholder="Desired vehicle" />
            <input className="input" name="budget" placeholder="Monthly budget" />
          </>
        ) : null}
        {fields === 'trade' ? (
          <>
            <input required className="input" name="make" placeholder="Trade-in make" />
            <input required className="input" name="model" placeholder="Trade-in model" />
            <input required className="input" name="year" placeholder="Year" />
            <input required className="input" name="mileage" placeholder="Mileage" />
            <input className="input sm:col-span-2" name="vin" placeholder="VIN" />
            <select required className="input sm:col-span-2" name="condition" defaultValue="">
              <option value="" disabled>Condition</option>
              <option>Excellent</option>
              <option>Good</option>
              <option>Fair</option>
              <option>Needs work</option>
              <option>Not sure</option>
            </select>
          </>
        ) : null}
        <select className="input" name="preferredContact">
          <option>Best time to contact</option>
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Evening</option>
        </select>
        <textarea className="input min-h-28 sm:col-span-2" name="message" placeholder="Message" />
      </div>
      <div className="mt-5">
        <button className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-blue-800 px-5 py-3 text-base font-semibold text-white shadow-sm shadow-blue-950/20 transition hover:bg-blue-900 disabled:cursor-wait disabled:bg-zinc-500 sm:w-auto" disabled={submitting} type="submit">
          {submitting ? 'Sending...' : fields === 'trade' ? 'Get My Trade-In Estimate' : fields === 'finance' ? 'Get Pre-Approved' : 'Request Info'}
        </button>
      </div>
      {sent ? <p className="mt-4 rounded-md bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">Thanks. We received your request and will follow up shortly.</p> : null}
      {error ? <p className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">{error}</p> : null}
    </motion.form>
  )
}
