import { FinancingCalculator } from '../components/FinancingCalculator'
import { LeadForm } from '../components/LeadForm'
import { SectionHeading } from '../components/SectionHeading'
import { Seo } from '../components/Seo'

export const FinancingPage = () => (
  <>
    <Seo title="Flexible Financing Options" description="Get pre-approved for a used vehicle at C&C Automobiles in Stratford, CT." />
    <section className="section bg-slate-100">
      <SectionHeading eyebrow="Financing" title="Flexible Financing Options" text="Start with an estimate, then send a short pre-approval request." />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <FinancingCalculator />
        <LeadForm title="Get Pre-Approved Today" fields="finance" />
      </div>
    </section>
  </>
)
