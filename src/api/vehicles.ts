import { apiClient } from './client'
import { vehicles as fallbackVehicles } from '../data/inventory'
import type { Vehicle } from '../types/vehicle'

type ApiVehicle = {
  id: string
  slug: string
  title: string
  make: string
  model: string
  trim: string | null
  year: number
  status: string
  stock_number: string | null
  vin: string | null
  price: number
  mileage: number
  body_type: string
  transmission: string | null
  drivetrain: string | null
  engine: string | null
  exterior_color: string | null
  interior_color: string | null
  short_description: string
  description?: string
  images: string[]
  features: string[]
  featured: boolean
}

export type VehicleListParams = {
  page?: number
  pageSize?: number
  make?: string
  model?: string
  yearFrom?: number
  yearTo?: number
  bodyType?: string
  transmission?: string
  drivetrain?: string
  color?: string
  featured?: boolean
  priceMin?: number
  priceMax?: number
  mileageMin?: number
  mileageMax?: number
  sort?: 'year_desc' | 'price_asc' | 'price_desc' | 'mileage_asc'
}

export type VehicleFilters = {
  makes: string[]
  models: string[]
  years: number[]
  bodyTypes: string[]
  transmissions: string[]
  drivetrains: string[]
  colors: string[]
  statuses: string[]
  priceMin: number | null
  priceMax: number | null
  mileageMin: number | null
  mileageMax: number | null
}

type ApiVehicleListResponse = {
  items: ApiVehicle[]
  total: number
  page: number
  page_size: number
}

type ApiVehicleFilters = {
  makes: string[]
  models: string[]
  years: number[]
  body_types: string[]
  transmissions: string[]
  drivetrains: string[]
  colors: string[]
  statuses: string[]
  price_min: number | null
  price_max: number | null
  mileage_min: number | null
  mileage_max: number | null
}

const fallbackImagesBySlug = new Map(fallbackVehicles.map((vehicle) => [vehicle.slug, vehicle.images]))

const toVehicle = (vehicle: ApiVehicle): Vehicle => {
  const images = vehicle.images.length > 0 ? vehicle.images : fallbackImagesBySlug.get(vehicle.slug) ?? fallbackVehicles[0]?.images ?? []

  return {
    id: vehicle.id,
    slug: vehicle.slug,
    year: vehicle.year,
    make: vehicle.make,
    model: vehicle.model,
    trim: vehicle.trim ?? '',
    price: vehicle.price,
    mileage: vehicle.mileage,
    bodyType: vehicle.body_type,
    transmission: vehicle.transmission ?? 'Automatic',
    drivetrain: vehicle.drivetrain ?? 'FWD',
    engine: vehicle.engine ?? 'Gasoline',
    exteriorColor: vehicle.exterior_color ?? 'Not listed',
    interiorColor: vehicle.interior_color ?? 'Not listed',
    vin: vehicle.vin ?? 'Not listed',
    stockNumber: vehicle.stock_number ?? vehicle.id,
    status: vehicle.status,
    shortDescription: vehicle.short_description,
    description: vehicle.description ?? vehicle.short_description,
    features: vehicle.features,
    images,
    featured: vehicle.featured,
  }
}

const toListParams = (params: VehicleListParams) => ({
  page: params.page,
  page_size: params.pageSize,
  make: params.make || undefined,
  model: params.model || undefined,
  year_from: params.yearFrom,
  year_to: params.yearTo,
  body_type: params.bodyType || undefined,
  transmission: params.transmission || undefined,
  drivetrain: params.drivetrain || undefined,
  color: params.color || undefined,
  featured: params.featured,
  price_min: params.priceMin,
  price_max: params.priceMax,
  mileage_min: params.mileageMin,
  mileage_max: params.mileageMax,
  sort: params.sort,
})

export const listVehicles = async (params: VehicleListParams = {}) => {
  const response = await apiClient.get<ApiVehicleListResponse>('/vehicles', {
    params: toListParams(params),
  })

  return {
    items: response.data.items.map(toVehicle),
    total: response.data.total,
    page: response.data.page,
    pageSize: response.data.page_size,
  }
}

export const getVehicle = async (slug: string) => {
  const response = await apiClient.get<ApiVehicle>(`/vehicles/${slug}`)
  return toVehicle(response.data)
}

export const getVehicleFilters = async (make?: string): Promise<VehicleFilters> => {
  const response = await apiClient.get<ApiVehicleFilters>('/vehicles/filters', {
    params: { make: make || undefined },
  })

  return {
    makes: response.data.makes,
    models: response.data.models,
    years: response.data.years,
    bodyTypes: response.data.body_types,
    transmissions: response.data.transmissions.filter(Boolean),
    drivetrains: response.data.drivetrains.filter(Boolean),
    colors: response.data.colors.filter(Boolean),
    statuses: response.data.statuses,
    priceMin: response.data.price_min,
    priceMax: response.data.price_max,
    mileageMin: response.data.mileage_min,
    mileageMax: response.data.mileage_max,
  }
}
