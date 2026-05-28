import { Link } from 'react-router'
import { FaArrowRight } from 'react-icons/fa6'
import { brands } from '../data'

const BrandsStrip = () => (
  <section className="border-y border-stone-200 bg-[#f7f5ef]">
    <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-8 sm:px-6 lg:px-8">
      <span className="mr-2 text-xs font-black uppercase tracking-[0.2em] text-stone-500">Equipment Brands</span>
      {brands.map((brand) => (
        <span key={brand} className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-extrabold text-stone-800 shadow-sm">
          {brand}
        </span>
      ))}
      <Link to="/catalog" className="ml-auto hidden items-center gap-2 rounded-md bg-stone-950 px-4 py-2 text-sm font-extrabold text-white sm:inline-flex">
        See Inventory <FaArrowRight />
      </Link>
    </div>
  </section>
)

export default BrandsStrip
