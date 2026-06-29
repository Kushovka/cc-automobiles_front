import { SectionHeading } from '../components/SectionHeading'
import { Seo } from '../components/Seo'
import { business } from '../data/business'

const sections = [
  ['Information we collect', 'We may collect contact details, vehicle interests, trade-in details, financing preferences, messages you send, and basic website analytics such as pages visited, browser type, device data, and referral source.'],
  ['How we use information', 'We use this information to respond to inquiries, schedule calls, discuss vehicle availability, support financing or trade-in requests, improve the website, and measure advertising performance.'],
  ['Sharing', 'We may share information with service providers, financing partners, advertising and analytics platforms, or legal and operational partners when needed to respond to your request or operate the business. We do not sell personal information as a standalone customer list.'],
  ['Cookies and tracking', 'The website may use cookies, Meta Pixel, server-side conversion tracking, and similar tools to understand site usage and advertising results. You can decline optional cookies in the site banner or adjust browser settings.'],
  ['Your choices', 'You can ask us to update, correct, or delete contact information where legally possible. You can also opt out of marketing follow-up by contacting the dealership.'],
  ['Data security', 'We use reasonable safeguards, but no website or transmission method is completely secure. Please avoid sending sensitive financial information through open message fields.'],
]

export const PrivacyPage = () => (
  <>
    <Seo title="Privacy Policy" description="Read the C&C Automobiles privacy policy for website leads, cookies, analytics, and dealership communication." />
    <section className="section bg-slate-100">
      <SectionHeading eyebrow="Privacy" title="Privacy Policy" text="How C&C Automobiles handles website inquiries, cookies, and customer communication." />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-blue-950/10 bg-white p-6 shadow-sm shadow-blue-950/5">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-800">Last updated: June 24, 2026</p>
          <div className="mt-6 grid gap-6">
            {sections.map(([title, text]) => (
              <div key={title} className="border-t border-blue-950/10 pt-5 first:border-t-0 first:pt-0">
                <h2 className="text-xl font-semibold text-zinc-950">{title}</h2>
                <p className="mt-2 text-base font-semibold leading-8 text-zinc-700">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-md bg-slate-100 p-4 text-sm font-semibold leading-7 text-zinc-700">
            Questions about this policy can be sent to <a className="font-semibold text-blue-800" href={`mailto:${business.email}`}>{business.email}</a> or by calling{' '}
            <a className="font-semibold text-blue-800" href={`tel:${business.phoneHref}`}>{business.phone}</a>.
          </div>
        </div>
      </div>
    </section>
  </>
)
