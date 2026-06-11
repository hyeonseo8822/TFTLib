import { FooterLink } from './FooterLink'

export function FooterNav({ links }) {
  return (
    <div className="flex gap-md">
      {links.map((link) => (
        <FooterLink
          key={link.id}
          href={link.href}
          label={link.label}
          underline={link.underline}
        />
      ))}
    </div>
  )
}
