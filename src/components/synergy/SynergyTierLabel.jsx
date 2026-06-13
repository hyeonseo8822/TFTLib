export function SynergyTierLabel({ label, highlighted = false }) {
  if (!label) return null

  const classes = highlighted
    ? 'bg-secondary-container text-on-secondary-container'
    : 'bg-surface-container-high text-on-surface-variant'

  return (
    <span className={`font-caption text-caption px-xs py-[2px] ${classes} rounded`}>
      {label}
    </span>
  )
}
