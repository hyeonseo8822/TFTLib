import { AugmentCard } from './AugmentCard'

export function AugmentGrid({ augments, selectedId, onSelect }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-md pb-lg">
      {augments.map((augment) => (
        <AugmentCard
          key={augment.id}
          augment={augment}
          isActive={augment.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
