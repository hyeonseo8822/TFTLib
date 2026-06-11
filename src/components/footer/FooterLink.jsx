export function FooterLink({ href, label, underline = false }) {
  return (
    <a
      href={href}
      className={`font-caption text-caption text-on-surface-variant hover:text-primary transition-colors ${underline ? 'underline' : ''}`}
    >
      {label}
    </a>
  )
}
