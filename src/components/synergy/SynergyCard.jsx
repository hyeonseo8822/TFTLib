import { SynergyCardIcon } from './SynergyCardIcon'
import { SynergyTierLabel } from './SynergyTierLabel'

export function SynergyCard({ synergy, isActive = false, onSelect }) {
  const cardClasses = [
    'synergy-card p-md border border-outline-variant rounded-lg cursor-pointer hover:shadow-md transition-all group',
    isActive ? 'active' : 'bg-white hover:border-primary',
  ].join(' ')

  return (
    <button
      type="button"
      className={`${cardClasses} text-left w-full`}
      onClick={() => onSelect(synergy)}
      aria-pressed={isActive}
    >
      <div className="flex justify-between items-start mb-sm">
        <SynergyCardIcon
          icon={synergy.icon}
          iconBg={synergy.iconBg}
          iconColor={synergy.iconColor}
          filled={synergy.iconFilled}
          emblem={synergy.emblem}
          name={synergy.englishName ?? synergy.name}
        />
        <SynergyTierLabel
          label={synergy.tierLabel}
          highlighted={synergy.tierLabelHighlight}
        />
      </div>
      <h3
        className={`font-headline-md text-headline-md mb-xs ${isActive ? 'text-primary' : 'text-on-surface'}`}
      >
        {synergy.name} ({synergy.englishName})
      </h3>
      <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
        {synergy.description}
      </p>
    </button>
  )
}
