import { FaCircleCheck, FaFileSignature, FaLocationDot, FaPeopleGroup, FaPhoneVolume, FaTruckFast, FaWrench } from 'react-icons/fa6'
import LeadForm from '../components/LeadForm'
import { PageFade, Reveal } from '../components/motion'
import SectionHeading from '../components/SectionHeading'
import { business } from '../data/business'

type InfoPageProps = {
  variant: 'service' | 'delivery' | 'warranty' | 'contacts'
    | 'team'
}

const content = {
  service: {
    eyebrow: 'Service Department',
    title: 'Service support for seasonal readiness',
    text: 'Preventive maintenance, diagnostics, inspections, and repair coordination for tractors, combines, sprayers, and hay equipment.',
    icon: FaWrench,
    image: '/images/delivery-prep.png',
    points: ['Pre-season inspections', 'Hydraulic and drivetrain diagnostics', 'Wear part checks', 'Field-readiness reports'],
  },
  delivery: {
    eyebrow: 'Delivery',
    title: 'Transport planning for agricultural equipment',
    text: 'We coordinate regional and long-haul delivery with realistic timing, route planning, and equipment prep before loading.',
    icon: FaTruckFast,
    image: '/images/delivery-prep.png',
    points: ['Oversize load coordination', 'Dealer pickup scheduling', 'Delivery status updates', 'Machine handoff checklist'],
  },
  warranty: {
    eyebrow: 'Warranty',
    title: 'Clear coverage information before purchase',
    text: 'Listings are inspected before sale, and our team explains available coverage, service records, and post-sale support options.',
    icon: FaCircleCheck,
    image: '/images/dealer-lot.png',
    points: ['Inspection disclosure', 'Coverage guidance', 'Service history review', 'Support after delivery'],
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

const InfoPage = ({ variant }: InfoPageProps) => {
  const data = content[variant]
  const Icon = data.icon

  return (
    <PageFade>
      <section className="border-b border-stone-200/80 bg-white/75 backdrop-blur">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[.95fr_1.05fr] lg:px-8">
          <div>
            <p className="premium-kicker">{data.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-black uppercase leading-tight text-stone-950 sm:text-5xl">{data.title}</h1>
            <p className="mt-5 text-lg font-semibold leading-8 text-stone-600">{data.text}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {data.points.map((point) => (
                <div key={point} className="flex items-center gap-3 rounded-md border border-emerald-100 bg-emerald-50/80 px-4 py-3 font-semibold text-stone-800 shadow-sm">
                  <FaCircleCheck className="text-emerald-800" /> {point}
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-80 overflow-hidden rounded-lg border border-stone-300 bg-stone-950 text-white shadow-[0_24px_70px_rgba(41,37,36,0.18)]">
            <img src={data.image} alt={`${business.name} ${data.eyebrow}`} className="absolute inset-0 h-full w-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/45 to-transparent" />
            <div className="relative z-10 flex min-h-80 flex-col justify-end p-8">
              <Icon className="text-6xl text-amber-300 drop-shadow-lg" />
              <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-amber-100">{business.name} Process</p>
              <p className="mt-2 text-3xl font-extrabold">Practical support from quote to field.</p>
            </div>
          </div>
        </div>
      </section>

      {variant === 'team' && (
        <Reveal>
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Dealer Staff"
              title="Meet the people who handle the next step"
              text="A clear team section makes the dealership feel reachable and accountable for sales, service, delivery, and paperwork."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {[
                ['Mark Vess', 'General Manager'],
                ['Elaine Brooks', 'Sales Coordinator'],
                ['Darren Price', 'Service Lead'],
                ['Luis Carter', 'Delivery Manager'],
              ].map(([name, role]) => (
                <article key={name} className="premium-card overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
                    <img
                      src="/images/dealer-team.png"
                      alt={`${role} at ${business.name}`}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/65 to-transparent" />
                    <FaPeopleGroup className="absolute bottom-5 left-5 text-5xl text-amber-200" />
                  </div>
                  <div className="p-5">
                    <h2 className="text-xl font-extrabold text-stone-950">{name}</h2>
                    <p className="mt-1 text-sm font-bold uppercase tracking-wide text-emerald-900">{role}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      <Reveal>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Dealer Support"
          title="Built for working farms"
          text="Every request is routed through one lead workflow so sales, service, delivery, and warranty questions can be handled consistently."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_420px]">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
            <ContactBlock icon={<FaPhoneVolume />} title="Phone" text={business.phone} />
            <ContactBlock icon={<FaFileSignature />} title="Request Form" text="Send equipment questions, delivery ZIP, or trade-in notes." />
            <ContactBlock icon={<FaLocationDot />} title="Location" text={`${business.address}, ${business.cityState}`} href={business.mapsUrl} />
          </div>
          <LeadForm leadType={variant === 'contacts' ? 'contact' : variant} title="Send a Request" />
        </div>
      </section>
      </Reveal>
    </PageFade>
  )
}

type ContactBlockProps = {
  icon: React.ReactNode
  title: string
  text: string
  href?: string
}

const ContactBlock = ({ icon, title, text, href }: ContactBlockProps) => (
  <div className="premium-card premium-card-hover p-6">
    <div className="text-2xl text-emerald-800">{icon}</div>
    <h2 className="mt-4 text-xl font-extrabold text-stone-950">{title}</h2>
    {href ? (
      <a href={href} target="_blank" rel="noreferrer" className="mt-2 block leading-7 text-stone-600 hover:text-emerald-900">
        {text}
      </a>
    ) : (
      <p className="mt-2 leading-7 text-stone-600">{text}</p>
    )}
  </div>
)

export default InfoPage
