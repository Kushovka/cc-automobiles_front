import { LeadForm } from '../components/LeadForm'
import { SectionHeading } from '../components/SectionHeading'
import { Seo } from '../components/Seo'

export const TradeInPage = () => (
  <>
    <Seo title="Trade-In Estimate" description="Send your trade-in details to C&C Automobiles and get a quick estimate." />
    <section className="section bg-slate-100">
      <SectionHeading eyebrow="Trade-In" title="Get a simple trade-in estimate" text="Tell us what you drive now and what you are looking for next." />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <LeadForm title="Get My Trade-In Estimate" fields="trade" />
      </div>
    </section>
  </>
)
