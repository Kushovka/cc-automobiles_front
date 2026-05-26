type LogoMarkProps = {
  className?: string
}

const LogoMark = ({ className = 'h-12 w-12' }: LogoMarkProps) => (
  <svg
    viewBox="0 0 64 64"
    aria-hidden="true"
    className={className}
    role="img"
  >
    <defs>
      <linearGradient id="logo-bg" x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
        <stop stopColor="#173c2b" />
        <stop offset="1" stopColor="#0c1f17" />
      </linearGradient>
      <linearGradient id="logo-gold" x1="18" y1="14" x2="48" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fcd34d" />
        <stop offset="1" stopColor="#d97706" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="58" height="58" rx="14" fill="url(#logo-bg)" />
    <rect x="6.5" y="6.5" width="51" height="51" rx="11" fill="none" stroke="#f8fafc" strokeOpacity=".2" strokeWidth="2" />
    <path d="M14 43c6.5-4.4 12.3-6.6 17.8-6.6 5.8 0 11.7 2.2 18.2 6.6" fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
    <path d="M17 49h30" stroke="#d6d3d1" strokeOpacity=".85" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M18 18l11 29h6l11-29h-8l-6 18-6-18h-8Z" fill="url(#logo-gold)" />
    <path d="M21 18h8l3 9 3-9h8" fill="none" stroke="#fff7ed" strokeOpacity=".38" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 39h10l3-7h9l3 7h5" fill="none" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="24" cy="42" r="5.8" fill="#f8fafc" />
    <circle cx="43" cy="42" r="4.8" fill="#f8fafc" />
    <circle cx="24" cy="42" r="2.2" fill="#0c1f17" />
    <circle cx="43" cy="42" r="1.8" fill="#0c1f17" />
    <path d="M17 14h30" stroke="#fbbf24" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M48 14h2.5" stroke="#f8fafc" strokeOpacity=".72" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
)

export default LogoMark
