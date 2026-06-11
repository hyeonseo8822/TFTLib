export function ChampionIcon({ champion, onSelect }) {
  return (
    <button
      type="button"
      className="aspect-square bg-surface-container-high rounded border border-outline-variant hover:border-primary cursor-pointer transition-all p-1"
      onClick={() => onSelect(champion)}
      aria-label="챔피언 선택"
    >
      <img className="w-full h-full object-cover rounded-sm" src={champion.image} alt="" />
    </button>
  )
}
