export type Vehicle = {
  id: string
  slug: string
  year: number
  make: string
  model: string
  trim: string
  price: number
  mileage: number
  bodyType: string
  transmission: string
  drivetrain: string
  engine: string
  exteriorColor: string
  interiorColor: string
  vin: string
  stockNumber: string
  status?: string
  shortDescription?: string
  description: string
  features: string[]
  images: string[]
  featured?: boolean
}
