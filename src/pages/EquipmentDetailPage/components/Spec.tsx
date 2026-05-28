type SpecProps = {
  icon: React.ReactNode
  label: string
  value: string
}

const Spec = ({ icon, label, value }: SpecProps) => (
  <div className="rounded-md border border-stone-200 bg-white/80 p-4 shadow-sm">
    <div className="text-xl text-emerald-800">{icon}</div>
    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-stone-500">{label}</p>
    <p className="mt-1 font-extrabold text-stone-950">{value}</p>
  </div>
)

export default Spec
