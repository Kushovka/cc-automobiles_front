import { FaPeopleGroup } from 'react-icons/fa6'
import { business } from '../../../data/business'
import { Reveal } from '../../../components/motion'
import SectionHeading from '../../../components/SectionHeading'
import { teamMembers } from '../content'

const TeamSection = () => (
  <Reveal>
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Dealer Staff"
        title="Meet the people who handle the next step"
        text="A clear team section makes the dealership feel reachable and accountable for sales, service, delivery, and paperwork."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {teamMembers.map(([name, role]) => (
          <article key={name} className="premium-card overflow-hidden">
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
              <img
                src="/images/dealer-team.png"
                alt={`${role} at ${business.name}`}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
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
)

export default TeamSection
