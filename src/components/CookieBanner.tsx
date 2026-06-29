import { useState } from 'react'
import { Link } from 'react-router'

const storageKey = 'cc-automobiles-cookie-consent'

export const CookieBanner = () => {
  const [visible, setVisible] = useState(() => !window.localStorage.getItem(storageKey))

  const choose = (value: 'accepted' | 'declined') => {
    window.localStorage.setItem(storageKey, value)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-4 bottom-24 z-[60] mx-auto max-w-3xl rounded-lg border border-blue-950/10 bg-white p-4 shadow-2xl shadow-blue-950/20 lg:bottom-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold leading-6 text-zinc-700">
          We use cookies and similar tools to improve the site, understand traffic, and support lead tracking. Read our{' '}
          <Link to="/privacy-policy" className="font-semibold text-blue-800 hover:text-blue-950">Privacy Policy</Link>.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            className="rounded-md border border-blue-950/15 px-4 py-2 text-sm font-semibold text-blue-950 transition hover:bg-slate-100"
            onClick={() => choose('declined')}
          >
            Decline
          </button>
          <button
            type="button"
            className="rounded-md bg-blue-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-900"
            onClick={() => choose('accepted')}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
