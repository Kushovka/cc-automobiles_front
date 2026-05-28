import { FaCircleCheck, FaPeopleGroup, FaPhoneVolume, FaTruckFast, FaWrench } from 'react-icons/fa6'

export type InfoVariant = 'service' | 'delivery' | 'warranty' | 'contacts' | 'team'

export const content = {
  service: {
    eyebrow: 'Service Department',
    title: 'Inspection notes and support before the sale',
    text: 'Every machine is reviewed before listing, with photos, videos, operating hours, and condition notes used to help buyers understand the equipment before pickup or delivery.',
    icon: FaWrench,
    image: '/images/delivery-prep.png',
    points: ['Pre-sale equipment review', 'Documented hours and condition', 'Photo and video representation', 'Appointment-based inspection'],
    policySections: [
      {
        title: 'Documented condition',
        text: 'Equipment is inspected before sale and represented through listing photos, videos, hour readings, and condition notes available at the time of listing.',
      },
      {
        title: 'Buyer inspection opportunity',
        text: 'Buyers may schedule an in-person inspection before purchase. If that inspection is declined, the buyer accepts the documented condition supplied by the seller.',
      },
    ],
  },
  delivery: {
    eyebrow: 'Delivery',
    title: 'Delivery, acceptance, and return coordination',
    text: 'Delivery is coordinated with clear handoff documentation. The return window begins after delivery and written acceptance, with eligible return transport arranged by the seller.',
    icon: FaTruckFast,
    image: '/images/delivery-prep.png',
    points: ['Delivery handoff records', 'Written buyer acceptance', '14-day return window', 'Seller-arranged eligible returns'],
    policySections: [
      {
        title: 'Return window',
        text: 'The return period runs for fourteen calendar days from delivery and written acceptance, provided the machine remains within the stated return conditions.',
      },
      {
        title: 'Return requirements',
        text: 'Equipment must not exceed fifty additional operating hours, must be returned in the same mechanical and cosmetic condition, and must have all paperwork properly reassigned.',
      },
      {
        title: 'Return transport',
        text: 'For equipment that qualifies under the return conditions, seller arranges and pays for return transport and issues a refund of the purchase price.',
      },
    ],
  },
  warranty: {
    eyebrow: 'Warranty',
    title: 'As-is sale with limited protection',
    text: 'Equipment is sold AS IS, WHERE IS, except for the stated return policy and limited warranty. Coverage is focused on qualifying major mechanical issues that were not disclosed before sale.',
    icon: FaCircleCheck,
    image: '/images/dealer-lot.png',
    points: ['AS IS, WHERE IS terms', '14 days / 50 hours return policy', '2 months / 100 hours limited warranty', 'Major drivetrain and engine coverage'],
    policySections: [
      {
        title: 'As-is sale',
        text: 'Equipment is sold AS IS, WHERE IS, with all faults, except for the stated return policy and limited warranty. No other express or implied warranties are provided.',
      },
      {
        title: 'Limited warranty',
        text: 'Major drivetrain or engine failures not disclosed before sale may be covered for two calendar months from delivery or one hundred operating hours after delivery, whichever comes first.',
      },
      {
        title: 'Items not covered',
        text: 'Normal wear, maintenance items, cosmetics, electrical accessories, hoses, seals, filters, belts, fluids, batteries, consumables, misuse, neglect, improper operation, lack of maintenance, and unauthorized modifications are excluded.',
      },
      {
        title: 'Seller remedy',
        text: 'At seller discretion, qualifying issues may be handled through repair, replacement of defective components, or reimbursement of reasonable repair costs. Coverage is non-transferable.',
      },
    ],
  },
  contacts: {
    eyebrow: 'Contact',
    title: 'Speak with the equipment team',
    text: 'Reach sales, service, or delivery coordination. Send a request and we will route it to the right department.',
    icon: FaPhoneVolume,
    image: '/images/dealer-lot.png',
    points: ['Sales quotes', 'Trade-in questions', 'Service scheduling', 'Delivery estimates'],
  },
  team: {
    eyebrow: 'Our Team',
    title: 'People behind the equipment desk',
    text: 'Sales, service, delivery, and office coordination are presented clearly so buyers know who is handling the next step.',
    icon: FaPeopleGroup,
    image: '/images/dealer-team.png',
    points: ['Sales desk', 'Service technicians', 'Delivery coordination', 'Office and title support'],
  },
}

export const teamMembers = [
  ['Mark Vess', 'General Manager'],
  ['Elaine Brooks', 'Sales Coordinator'],
  ['Darren Price', 'Service Lead'],
  ['Luis Carter', 'Delivery Manager'],
]
