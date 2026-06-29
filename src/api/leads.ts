import { apiClient } from './client'

export type LeadPayload = {
  vehicleId?: string
  leadType: 'contact' | 'quote' | 'financing' | 'trade-in'
  customerName: string
  phone: string
  email?: string
  subject?: string
  preferredContact?: string
  zipCode?: string
  message?: string
  tradeMake?: string
  tradeModel?: string
  tradeYear?: string
  tradeMileage?: string
  tradeVin?: string
  tradeCondition?: string
  sourcePage?: string
  metaEventId?: string
  fbp?: string | null
  fbc?: string | null
  userAgent?: string
  eventSourceUrl?: string
  formStartedAt?: number
  website?: string
  contentIds?: string[]
  contentName?: string
  contentType?: string
  currency?: string
  value?: number
}

export const createLead = async (payload: LeadPayload) => {
  const response = await apiClient.post('/leads', {
    vehicle_id: payload.vehicleId,
    lead_type: payload.leadType,
    customer_name: payload.customerName,
    phone: payload.phone,
    email: payload.email || undefined,
    subject: payload.subject || undefined,
    preferred_contact: payload.preferredContact || undefined,
    zip_code: payload.zipCode || undefined,
    message: payload.message || undefined,
    trade_make: payload.tradeMake || undefined,
    trade_model: payload.tradeModel || undefined,
    trade_year: payload.tradeYear || undefined,
    trade_mileage: payload.tradeMileage || undefined,
    trade_vin: payload.tradeVin || undefined,
    trade_condition: payload.tradeCondition || undefined,
    source_page: payload.sourcePage || window.location.pathname,
    meta_event_id: payload.metaEventId,
    fbp: payload.fbp || undefined,
    fbc: payload.fbc || undefined,
    user_agent: payload.userAgent || navigator.userAgent,
    event_source_url: payload.eventSourceUrl || window.location.href,
    form_started_at: payload.formStartedAt,
    website: payload.website || undefined,
    content_ids: payload.contentIds,
    content_name: payload.contentName,
    content_type: payload.contentType || 'vehicle',
    currency: payload.currency || 'USD',
    value: payload.value,
    consent_to_contact: true,
  })

  return response.data
}
