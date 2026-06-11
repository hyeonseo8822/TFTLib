import { ChampionIcon } from './ChampionIcon'

export function ChampionGrid({ champions, onChampionSelect }) {
  return (
    <div className="grid grid-cols-4 md:grid-cols-2 gap-xs">
      {champions.map((champion) => (
        <ChampionIcon key={champion.id} champion={champion} onSelect={onChampionSelect} />
      ))}
    </div>
  )
}
