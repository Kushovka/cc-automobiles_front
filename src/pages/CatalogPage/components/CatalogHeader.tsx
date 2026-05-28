type CatalogHeaderProps = {
  total: number
}

const CatalogHeader = ({ total }: CatalogHeaderProps) => (
  <div className="flex flex-col justify-between gap-5 border-b border-stone-200/80 pb-7 md:flex-row md:items-end">
    <div>
      <p className="premium-kicker">Equipment Inventory</p>
      <h1 className="mt-3 text-4xl font-black uppercase leading-tight text-stone-950">Available Equipment</h1>
      <p className="mt-3 max-w-2xl font-semibold leading-7 text-stone-600">
        Search the live lot by machine, brand, stock number, year, status, and price range. Each lead is routed through the same quote workflow.
      </p>
    </div>
    <div className="rounded-md bg-stone-950 px-4 py-3 text-sm font-extrabold text-white shadow-sm">
      {total} machines found
    </div>
  </div>
)

export default CatalogHeader
