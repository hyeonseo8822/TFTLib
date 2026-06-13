import { ChampionIcon } from './ChampionIcon'

export function ChampionGrid({ champions, onChampionSelect }) {
  return (
    <div className="grid grid-cols-3 gap-xs">
      {champions.map((champion) => (
        <ChampionIcon key={champion.id} champion={champion} onSelect={onChampionSelect} />
      ))}
    </div>
  )
}
