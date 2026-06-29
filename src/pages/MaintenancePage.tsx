import { useEffect } from 'react'
import { business } from '../data/business'

export const MaintenancePage = () => {
  useEffect(() => {
    document.title = `${business.name} | Website Update`

    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.name = 'robots'
      document.head.appendChild(robots)
    }
    robots.content = 'noindex, nofollow'

    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.name = 'description'
      document.head.appendChild(description)
    }
    description.content = `${business.name} is improving the website. Please check back soon.`
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#102d72_0%,#05070b_44%,#000_100%)] px-4 py-12 text-white">
      <section className="w-full max-w-2xl text-center">
        <img
          src="/images/cc-automobiles-logo-blue-cropped.png"
          alt={`${business.name} Inc.`}
          className="mx-auto h-28 w-72 object-contain sm:h-36 sm:w-96"
        />
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">Website Update</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">We are improving the website.</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg font-semibold leading-8 text-zinc-300">
          C&C Automobiles is making updates to provide a better online experience. Please check back soon.
        </p>
        <div className="mx-auto mt-8 h-px max-w-sm bg-white/15" />
        <p className="mt-6 text-sm font-semibold text-zinc-400">
          {business.address}, {business.cityState}
        </p>
      </section>
    </main>
  )
}
