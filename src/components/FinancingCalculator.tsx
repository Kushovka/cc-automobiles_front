import { useMemo, useState } from 'react'
import { formatPrice } from '../utils/format'

export const FinancingCalculator = () => {
  const [price, setPrice] = useState(22000)
  const [down, setDown] = useState(2500)
  const [term, setTerm] = useState(60)
  const [rate, setRate] = useState(7.9)

  const monthly = useMemo(() => {
    const principal = Math.max(price - down, 0)
    const monthlyRate = rate / 100 / 12
    if (monthlyRate === 0) {
      return principal / term
    }
    return (principal * monthlyRate) / (1 - (1 + monthlyRate) ** -term)
  }, [down, price, rate, term])

  return (
    <div className="rounded-lg border border-blue-950/10 bg-white p-5 shadow-sm shadow-blue-950/5">
      <h3 className="text-2xl font-semibold text-zinc-950">Payment Estimate</h3>
      <div className="mt-5 grid gap-4">
        <label className="label">Vehicle price<input className="input mt-1" type="number" value={price} onChange={(event) => setPrice(Number(event.target.value))} /></label>
        <label className="label">Down payment<input className="input mt-1" type="number" value={down} onChange={(event) => setDown(Number(event.target.value))} /></label>
        <label className="label">Term<select className="input mt-1" value={term} onChange={(event) => setTerm(Number(event.target.value))}><option value={48}>48 months</option><option value={60}>60 months</option><option value={72}>72 months</option></select></label>
        <label className="label">Interest rate<input className="input mt-1" type="number" step="0.1" value={rate} onChange={(event) => setRate(Number(event.target.value))} /></label>
      </div>
      <div className="mt-6 rounded-md bg-gradient-to-br from-black to-zinc-900 p-5 text-white shadow-sm shadow-black/20">
        <p className="text-sm font-semibold text-blue-100">Estimated monthly payment</p>
        <p className="mt-1 text-4xl font-semibold">{formatPrice(monthly)}</p>
      </div>
    </div>
  )
}
