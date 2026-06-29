import { Link } from 'react-router'
import type { MouseEventHandler, ReactNode } from 'react'

import { getContactActionFromHref, trackContactCta } from '../utils/ctaTracking'

type ButtonProps = {
  children: ReactNode
  href: string
  variant?: 'primary' | 'secondary' | 'light'
  className?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

const variants = {
  primary: 'bg-blue-800 text-white shadow-blue-950/20 hover:bg-blue-900 focus-visible:outline-blue-800',
  secondary: 'bg-blue-950 text-white shadow-blue-950/20 hover:bg-slate-900 focus-visible:outline-blue-950',
  light: 'bg-white text-blue-950 ring-1 ring-blue-100 hover:bg-blue-50 focus-visible:outline-blue-800',
}

export const Button = ({ children, href, variant = 'primary', className = '', onClick }: ButtonProps) => {
  const classes = `inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 text-base font-semibold shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${className}`
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    const contactAction = getContactActionFromHref(href)
    if (contactAction) {
      trackContactCta(contactAction.actionType, contactAction.contentName)
    }

    onClick?.(event)
  }

  if (href.startsWith('/') && !href.startsWith('//')) {
    return (
      <Link to={href} className={classes} onClick={handleClick}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} className={classes} onClick={handleClick}>
      {children}
    </a>
  )
}
