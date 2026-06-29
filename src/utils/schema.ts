import { business } from '../data/business'

export const autoDealerSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: business.name,
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.address,
    addressLocality: 'Stratford',
    addressRegion: 'CT',
    postalCode: '06614',
    addressCountry: 'US',
  },
  telephone: business.phone,
  url: business.website,
  openingHours: 'Mo-Fr 07:00-18:00',
}
