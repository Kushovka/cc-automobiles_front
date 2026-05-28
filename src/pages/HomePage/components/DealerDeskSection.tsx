import LeadForm from '../../../components/LeadForm'
import { business } from '../../../data/business'

const DealerDeskSection = () => (
  <section className="bg-white py-14 sm:py-16">
    <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
      <div className="overflow-hidden rounded-md border border-stone-300 bg-stone-950 text-white">
        <img
          src="/images/dealer-team.png"
          alt={`${business.name} team`}
          className="h-72 w-full object-cover opacity-90"
          loading="lazy"
          decoding="async"
        />
        <div className="p-6">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-300">Local Dealer Desk</p>
          <h2 className="mt-3 text-3xl font-black uppercase leading-tight">
            Talk to a team that knows the lot.
          </h2>
          <p className="mt-4 leading-7 text-stone-300">
            Send a request with your equipment question, delivery ZIP, or trade-in notes. The dealer desk can follow up by phone, text, or email.
          </p>
        </div>
      </div>
      <LeadForm compact leadType="contact" title="Send a Quick Request" />
    </div>
  </section>
)

export default DealerDeskSection
