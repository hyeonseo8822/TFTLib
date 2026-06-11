export function ItemCard({ item, isSelected = false, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      aria-pressed={isSelected}
      aria-label={item.name}
      title={item.name}
      className={[
        'aspect-square border rounded-lg transition-all flex items-center justify-center group overflow-hidden',
        isSelected
          ? 'border-primary ring-2 ring-primary/30 bg-surface'
          : 'bg-surface border-outline-variant hover:border-primary hover:scale-105 cursor-pointer',
      ].join(' ')}
    >
      <img
        src={item.imgUrl}
        alt={item.name}
        className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
      />
    </button>
  )
}
