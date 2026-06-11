import { Icon } from '../common/Icon'

const MAX_ITEMS = 3

export function ItemSelectPanel({ champion, allItems, onToggleItem, onRemoveChampion, onClose }) {
  const equippedIds = new Set((champion.items ?? []).map((i) => i.id))

  return (
    <div className="bg-surface border border-outline-variant rounded-2xl shadow-xl p-md flex flex-col gap-md w-72">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-sm">
          <img
            src={champion.image}
            alt={champion.name}
            className="w-10 h-10 rounded-lg object-cover border border-outline-variant"
          />
          <div>
            <p className="font-label-md text-primary font-bold leading-tight">{champion.name}</p>
            <p className="text-[11px] text-on-surface-variant">
              아이템 {(champion.items ?? []).length}/{MAX_ITEMS}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-xs rounded-full hover:bg-surface-container-high transition-all"
          aria-label="닫기"
        >
          <Icon name="close" className="text-on-surface-variant text-[18px]" />
        </button>
      </div>

      {/* Equipped items row */}
      <div className="flex gap-xs">
        {Array.from({ length: MAX_ITEMS }).map((_, i) => {
          const item = (champion.items ?? [])[i]
          return (
            <div
              key={i}
              className={[
                'w-10 h-10 rounded-lg border flex items-center justify-center',
                item
                  ? 'border-primary bg-surface'
                  : 'border-dashed border-outline-variant bg-surface-container',
              ].join(' ')}
            >
              {item && (
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  title={item.name}
                  className="w-8 h-8 object-contain"
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Item grid */}
      <div>
        <p className="text-label-md text-on-surface-variant mb-xs">아이템 선택 (클릭으로 장착/해제)</p>
        <div className="grid grid-cols-5 gap-xs max-h-48 overflow-y-auto custom-scrollbar">
          {allItems.map((item) => {
            const equipped = equippedIds.has(item.id)
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onToggleItem(item)}
                title={item.name}
                aria-pressed={equipped}
                className={[
                  'aspect-square rounded-lg border transition-all flex items-center justify-center group',
                  equipped
                    ? 'border-primary ring-2 ring-primary/30 bg-surface'
                    : 'border-outline-variant bg-surface hover:border-primary',
                ].join(' ')}
              >
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  className="w-7 h-7 object-contain group-hover:scale-110 transition-transform"
                />
              </button>
            )
          })}
        </div>
      </div>

      {/* Remove champion button */}
      <button
        type="button"
        onClick={onRemoveChampion}
        className="w-full flex items-center justify-center gap-1 py-2 rounded-xl border border-error/40 text-error text-label-md hover:bg-error-container transition-all"
      >
        <Icon name="remove_circle_outline" className="text-[16px]" />
        기물 제거
      </button>
    </div>
  )
}
