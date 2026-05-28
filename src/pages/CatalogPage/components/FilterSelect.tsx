import type { ChangeEvent } from 'react'

type FilterSelectProps = {
  label: string
  value?: string
  options: string[]
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const FilterSelect = ({ label, value, options, onChange }: FilterSelectProps) => (
  <label className="block text-sm font-bold text-stone-700">
    {label}
    <select
      value={value}
      onChange={onChange}
      className="premium-input bg-white"
    >
      <option value="">All</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </label>
)

export default FilterSelect
