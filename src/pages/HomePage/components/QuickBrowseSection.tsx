import { Link } from 'react-router'
import { FaArrowRight } from 'react-icons/fa6'
import { categories } from '../data'

const QuickBrowseSection = () => (
  <section className="bg-white py-10 sm:py-12">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-md border border-stone-300 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-stone-500">Quick Browse</p>
            <p className="mt-2 font-semibold text-stone-600">Jump directly to the type of equipment you are shopping for.</p>
          </div>
          <Link to="/catalog" className="premium-button hidden gap-2 md:inline-flex">
            See Full Catalog <FaArrowRight />
          </Link>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(([title, text]) => (
            <Link key={title} to="/catalog" className="flex items-center justify-between rounded-md border border-stone-200 px-4 py-3 transition hover:border-emerald-900 hover:bg-emerald-50">
              <span>
                <span className="block font-black text-stone-950">{title}</span>
                <span className="text-sm font-semibold text-stone-500">{text}</span>
              </span>
              <FaArrowRight className="text-emerald-900" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  </section>
)

export default QuickBrowseSection
