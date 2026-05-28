type ContactBlockProps = {
  icon: React.ReactNode
  title: string
  text: string
  href?: string
}

const ContactBlock = ({ icon, title, text, href }: ContactBlockProps) => (
  <div className="premium-card premium-card-hover p-6">
    <div className="text-2xl text-emerald-800">{icon}</div>
    <h2 className="mt-4 text-xl font-extrabold text-stone-950">{title}</h2>
    {href ? (
      <a href={href} target="_blank" rel="noreferrer" className="mt-2 block leading-7 text-stone-600 hover:text-emerald-900">
        {text}
      </a>
    ) : (
      <p className="mt-2 leading-7 text-stone-600">{text}</p>
    )}
  </div>
)

export default ContactBlock
