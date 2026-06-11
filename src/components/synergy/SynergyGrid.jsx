import { SynergyCard } from './SynergyCard'

export function SynergyGrid({ synergies, selectedId, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
      {synergies.map((synergy) => (
        <SynergyCard
          key={synergy.id}
          synergy={synergy}
          isActive={synergy.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
