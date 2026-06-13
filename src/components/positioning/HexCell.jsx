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
    <div className="hex-cell-wrapper">
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
          <img
            src={cell.image}
            alt={cell.name}
            className={[
              'w-full h-full object-cover rounded-[inherit]',
              'ring-2',
              COST_RING[cell.cost] ?? 'ring-gray-400',
            ].join(' ')}
          />
        )}
      </button>

      {/* 아이템은 헥스 바깥(아래)에 배치하여 챔피언 이미지를 가리지 않습니다.
          같은 아이템이 중복 장착될 수 있으므로 key는 슬롯 인덱스 기반으로 사용합니다. */}
      {hasChampion && items.length > 0 && (
        <div className="hex-cell-items">
          {items.slice(0, 3).map((item, idx) => (
            <img
              key={`${item.id}-${idx}`}
              src={item.imgUrl}
              alt={item.name}
              title={item.name}
              className="hex-cell-item"
            />
          ))}
        </div>
      )}
    </div>
  )
}
