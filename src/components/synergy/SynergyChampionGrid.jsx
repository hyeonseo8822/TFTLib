import { SynergyChampionCard } from './SynergyChampionCard'

export function SynergyChampionGrid({ champions }) {
  if (champions.length === 0) {
    return (
      <p className="font-caption text-caption text-on-surface-variant">
        해당 챔피언 데이터가 없습니다.
      </p>
    )
  }

  return (
    <section>
      <h4 className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-md border-b border-outline-variant pb-xs">
        해당 챔피언
      </h4>
      <div className="grid grid-cols-4 gap-sm">
        {champions.map((champion) => (
          <SynergyChampionCard key={champion.id} champion={champion} />
        ))}
      </div>
    </section>
  )
}
