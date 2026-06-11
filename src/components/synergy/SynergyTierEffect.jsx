export function SynergyTierEffect({ tier, title, description, active = false }) {
  const borderClass = active ? 'border-primary-container/20' : 'border-outline-variant opacity-80'
  const badgeClass = active ? 'bg-primary' : 'bg-outline'

  return (
    <div className={`p-sm bg-white rounded border ${borderClass}`}>
      <div className="flex items-center gap-xs mb-xs">
        <span
          className={`w-6 h-6 rounded-full ${badgeClass} text-white text-[10px] flex items-center justify-center font-bold`}
        >
          {tier}
        </span>
        <span
          className={`font-label-md text-label-md ${active ? 'text-primary' : 'text-on-surface'}`}
        >
          {title}
        </span>
      </div>
      <p className="font-caption text-caption text-on-surface">{description}</p>
    </div>
  )
}
