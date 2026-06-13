export function ChampionIcon({ champion, onSelect }) {
  return (
    <button
      type="button"
      className="aspect-square bg-surface-container-high rounded border border-outline-variant hover:border-primary cursor-pointer transition-all p-1 group"
      onClick={() => onSelect(champion)}
      aria-label={`${champion.name} 선택 (코스트: ${champion.cost})`}
    >
      <img className="w-full h-full object-cover rounded-sm" src={champion.image} alt={champion.name} />
    </button>
  )
}
