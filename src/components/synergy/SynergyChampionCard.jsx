export function SynergyChampionCard({ champion }) {
  const borderClass = champion.highlighted
    ? 'border-primary'
    : 'border-outline-variant'

  return (
    <div className="text-center group cursor-pointer">
      <div
        className={`relative w-full aspect-square bg-surface-container-highest rounded-lg overflow-hidden border-2 ${borderClass} mb-xs`}
      >
        <img className="w-full h-full object-cover" src={champion.image} alt={champion.name} />
      </div>
      <span className="font-caption text-caption text-on-surface-variant group-hover:text-primary">
        {champion.name}
      </span>
    </div>
  )
}
