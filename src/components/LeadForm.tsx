import { memo, type FormEvent, useCallback, useState } from 'react'
import { createLead, getApiErrorMessage } from '../api/equipment'
import { trackingConfig } from '../config/tracking'
import { createMetaEventId, getCookieValue, splitName, trackLead } from '../utils/metaPixel'

type LeadFormProps = {
  equipmentId?: string
  equipmentTitle?: string
  equipmentPrice?: number | null
  leadType?: string
  title?: string
  compact?: boolean
  onSuccess?: () => void
}

type FormState = {
  customer_name: string
  phone: string
  email: string
  preferred_contact: string
  zip_code: string
  message: string
  consent_to_contact: boolean
}

const initialState: FormState = {
  customer_name: '',
  phone: '',
  email: '',
  preferred_contact: 'phone',
  zip_code: '',
  message: '',
  consent_to_contact: true,
}

const onlyDigits = (value: string, limit: number) => value.replace(/\D/g, '').slice(0, limit)

const LeadForm = ({
  equipmentId,
  equipmentTitle,
  equipmentPrice,
  leadType = 'quote',
  title = 'Request a Quote',
  compact = false,
  onSuccess,
}: LeadFormProps) => {
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const submit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (form.phone.length !== 10) {
      setStatus('error')
      setErrorMessage('Please enter a valid 10-digit US phone number.')
      return
    }

    if (!compact && form.zip_code && form.zip_code.length !== 6) {
      setStatus('error')
      setErrorMessage('Please enter a valid 6-digit ZIP code.')
      return
    }

    setStatus('sending')
    setErrorMessage('')
    const metaEventId = createMetaEventId('lead')
    const fbp = getCookieValue('_fbp')
    const fbc = getCookieValue('_fbc')
    const { firstName, lastName } = splitName(form.customer_name)
    const contentIds = [equipmentId ?? `${trackingConfig.meta.defaultLeadContentPrefix}-${leadType}`]
    const contentType = equipmentId ? trackingConfig.meta.productContentType : trackingConfig.meta.serviceContentType
    const contentName = equipmentTitle ?? `${leadType} request`
    const currency = trackingConfig.meta.currency
    const eventValue = equipmentPrice ?? trackingConfig.meta.defaultLeadValue
    const externalId = form.email || form.phone || null

    try {
      await createLead({
        equipment_id: equipmentId ?? null,
        lead_type: leadType,
        content_ids: contentIds,
        content_name: contentName,
        content_type: contentType,
        currency,
        value: eventValue,
        customer_name: form.customer_name,
        phone: form.phone,
        email: form.email || null,
        preferred_contact: form.preferred_contact,
        zip_code: form.zip_code || null,
        message: form.message || null,
        source_page: window.location.pathname,
        consent_to_contact: form.consent_to_contact,
        meta_event_id: metaEventId,
        fbp,
        fbc,
        user_agent: navigator.userAgent,
        event_source_url: window.location.href,
      })
      trackLead({
        eventId: metaEventId,
        leadType,
        contentIds,
        contentName,
        contentType,
        currency,
        value: eventValue,
        advancedMatching: {
          email: form.email,
          phone: form.phone,
          firstName,
          lastName,
          externalId,
          fbp,
          fbc,
        },
      })
      setForm(initialState)
      setStatus('success')
      onSuccess?.()
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, 'Could not send the request. Check backend connection and try again.'))
      setStatus('error')
    }
  }, [compact, equipmentId, equipmentPrice, equipmentTitle, form, leadType, onSuccess])

  return (
    <form onSubmit={submit} className="premium-card space-y-4 p-6">
      <div>
        <p className="premium-kicker">Dealer Response</p>
        <h2 className="text-2xl font-extrabold text-stone-950">{title}</h2>
      </div>
      <label className="block text-sm font-semibold text-stone-700">
        Name
        <input
          required
          className="premium-input"
          value={form.customer_name}
          onChange={(event) => setForm({ ...form, customer_name: event.target.value })}
          placeholder="Contact or business name"
        />
      </label>
      <label className="block text-sm font-semibold text-stone-700">
        Phone
        <input
          required
          inputMode="numeric"
          maxLength={10}
          pattern="[0-9]{10}"
          className="premium-input"
          value={form.phone}
          onChange={(event) => setForm({ ...form, phone: onlyDigits(event.target.value, 10) })}
          placeholder="5408868146"
          title="Enter a 10-digit US phone number"
        />
      </label>
      {!compact && (
      <label className="block text-sm font-semibold text-stone-700">
        Email
        <input
          type="email"
          className="premium-input"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          placeholder="name@farm.com"
        />
      </label>
      )}
      {!compact && (
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-stone-700">
          Preferred Contact
          <select
            className="premium-input bg-white"
            value={form.preferred_contact}
            onChange={(event) => setForm({ ...form, preferred_contact: event.target.value })}
          >
            <option value="phone">Phone</option>
            <option value="email">Email</option>
            <option value="text">Text</option>
          </select>
        </label>
        <label className="block text-sm font-semibold text-stone-700">
          ZIP Code
          <input
            inputMode="numeric"
            maxLength={6}
            pattern="[0-9]{6}"
            className="premium-input"
            value={form.zip_code}
            onChange={(event) => setForm({ ...form, zip_code: onlyDigits(event.target.value, 6) })}
            placeholder="244010"
            title="Enter a 6-digit ZIP code"
          />
        </label>
      </div>
      )}
      <label className="block text-sm font-semibold text-stone-700">
        {compact ? 'What are you looking for?' : 'Message'}
        <textarea
          className={`premium-input ${compact ? 'min-h-20' : 'min-h-28'}`}
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
          placeholder={compact ? 'Machine, stock #, or delivery question' : 'Share equipment questions, delivery needs, or trade-in details.'}
        />
      </label>
      <label className="flex items-start gap-3 rounded-md border border-stone-200 bg-stone-50 px-3 py-3 text-sm font-semibold leading-6 text-stone-700">
        <input
          type="checkbox"
          required
          checked={form.consent_to_contact}
          onChange={(event) => setForm({ ...form, consent_to_contact: event.target.checked })}
          className="mt-1 h-4 w-4 accent-emerald-900"
        />
        I agree to be contacted about equipment availability, quotes, financing, or delivery.
      </label>
      <button
        disabled={status === 'sending'}
        className="premium-button w-full disabled:cursor-not-allowed disabled:bg-stone-400"
      >
        {status === 'sending' ? 'Sending...' : 'Submit Request'}
      </button>
      {status === 'success' && <p className="text-sm font-bold text-emerald-700">Request sent. Our team will contact you shortly.</p>}
      {status === 'error' && <p className="text-sm font-bold text-red-700">{errorMessage}</p>}
    </form>
  )
}

export default memo(LeadForm)
