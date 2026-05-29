export type Equipment = {
  slug: string
  title: string
  category: string
  brand: string
  model: string
  year: number
  condition: string
  status: string
  stock_number: string
  serial_number: string
  price: number
  engine_hours: number | null
  engine_hours_label: string | null
  power_hp: number | null
  location: string
  short_description: string
  images: string[]
  images_total: number
  features: string[]
  specs: Record<string, unknown>
  featured: boolean
  financing_available: boolean
  delivery_available: boolean
  id: string
}

export type EquipmentDetail = Equipment & {
  description: string
  created_at: string
}

export type EquipmentListResponse = {
  items: Equipment[]
  total: number
  page: number
  page_size: number
}

export type EquipmentImagesResponse = {
  items: string[]
  total: number
  offset: number
  limit: number
  has_more: boolean
}

export type EquipmentFilters = {
  categories: string[]
  brands: string[]
  years: number[]
  conditions: string[]
  statuses: string[]
  price_min: number | null
  price_max: number | null
}

export type EquipmentQuery = {
  page?: number
  page_size?: number
  category?: string
  brand?: string
  year?: number
  condition?: string
  status?: string
  featured?: boolean
  q?: string
  price_min?: number
  price_max?: number
}

export type LeadPayload = {
  equipment_id?: string | null
  lead_type?: string
  content_ids?: string[] | null
  content_name?: string | null
  content_type?: string | null
  currency?: string | null
  value?: number | null
  customer_name: string
  phone: string
  email?: string | null
  preferred_contact?: string | null
  zip_code?: string | null
  message?: string | null
  source_page?: string | null
  consent_to_contact?: boolean
  meta_event_id?: string | null
  fbp?: string | null
  fbc?: string | null
  user_agent?: string | null
  event_source_url?: string | null
}

export type LeadResponse = Required<LeadPayload> & {
  id: string
  created_at: string
}

export type ApiValidationError = {
  detail?: Array<{
    loc: Array<string | number>
    msg: string
    type: string
  }>
}
