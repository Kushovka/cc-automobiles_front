import { FaFileSignature, FaLocationDot, FaPhoneVolume } from 'react-icons/fa6'
import LeadForm from '../../../components/LeadForm'
import { Reveal } from '../../../components/motion'
import SectionHeading from '../../../components/SectionHeading'
import { business } from '../../../data/business'
import type { InfoVariant } from '../content'
import ContactBlock from './ContactBlock'

type DealerSupportSectionProps = {
  variant: InfoVariant
}

const DealerSupportSection = ({ variant }: DealerSupportSectionProps) => (
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
)

export default DealerSupportSection
