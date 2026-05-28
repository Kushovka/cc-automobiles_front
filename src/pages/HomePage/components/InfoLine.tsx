type InfoLineProps = {
  icon: React.ReactNode
  label: string
  value: string
}

const InfoLine = ({ icon, label, value }: InfoLineProps) => (
  <div className="flex gap-3 rounded-md border border-stone-300 bg-white px-5 py-4 shadow-[0_14px_34px_rgba(0,0,0,0.18)]">
    <div className="mt-1 text-emerald-900">{icon}</div>
    <div>
      <p className="text-xs font-black uppercase tracking-wide text-stone-500">{label}</p>
      <p className="mt-1 font-extrabold text-stone-950">{value}</p>
    </div>
  </div>
)

export default InfoLine
