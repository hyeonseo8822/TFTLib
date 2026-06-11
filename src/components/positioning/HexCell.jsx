const COST_RING = {
  1: 'ring-gray-400',
  2: 'ring-green-500',
  3: 'ring-blue-500',
  4: 'ring-purple-500',
  5: 'ring-yellow-400',
}

export function HexCell({ cell, rowIndex, cellIndex, onSelect }) {
  const isActive = cell?.active ?? false
  const hasChampion = !!cell?.id
  const items = cell?.items ?? []

  return (
    <button
      type="button"
      className={[
        'hex-cell',
        isActive ? 'active' : '',
        hasChampion ? 'has-champion' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={() => onSelect(rowIndex, cellIndex)}
      aria-pressed={isActive}
      aria-label={hasChampion ? `${cell.name} — 아이템 관리` : '빈 칸 선택'}
      title={hasChampion ? cell.name : ''}
    >
      {hasChampion && (
        <>
          <img
            src={cell.image}
            alt={cell.name}
            className={[
              'w-full h-full object-cover rounded-[inherit]',
              'ring-2',
              COST_RING[cell.cost] ?? 'ring-gray-400',
            ].join(' ')}
          />
          {/* Item mini-icons — up to 3, anchored to bottom */}
          {items.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-px pb-px pointer-events-none">
              {items.slice(0, 3).map((item) => (
                <img
                  key={item.id}
                  src={item.imgUrl}
                  alt={item.name}
                  title={item.name}
                  className="w-4 h-4 rounded-sm border border-white/60 object-contain bg-black/40"
                />
              ))}
            </div>
          )}
        </>
      )}
    </button>
  )
}
