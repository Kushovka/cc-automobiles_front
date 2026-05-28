import { Reveal } from '../../../components/motion'

type PolicySection = {
  title: string
  text: string
}

type PolicyDetailsSectionProps = {
  sections?: PolicySection[]
}

const PolicyDetailsSection = ({ sections }: PolicyDetailsSectionProps) => {
  if (!sections?.length) {
    return null
  }

  return (
    <Reveal>
      <section className="border-y border-stone-200 bg-[#f7f5ef] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="premium-kicker">Policy Overview</p>
            <h2 className="mt-3 text-3xl font-black uppercase leading-tight text-stone-950">
              General terms for equipment buyers
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {sections.map((section) => (
              <article key={section.title} className="rounded-md border border-stone-300 bg-white p-5 shadow-sm">
                <h3 className="text-xl font-extrabold text-stone-950">{section.title}</h3>
                <p className="mt-3 font-semibold leading-7 text-stone-600">{section.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  )
}

export default PolicyDetailsSection
