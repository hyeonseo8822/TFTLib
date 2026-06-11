export function ItemFilterGroup({ filters, activeId, onChange }) {
  return (
    <div className="flex gap-sm flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          onClick={() => onChange(filter.id)}
          className={[
            'px-4 py-1 rounded-full text-label-md transition-colors',
            activeId === filter.id
              ? 'bg-primary text-white'
              : 'border border-outline-variant text-on-surface-variant hover:bg-surface-container-high',
          ].join(' ')}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
