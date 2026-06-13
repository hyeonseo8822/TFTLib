import { Icon } from '../common/Icon'

const MAX_ITEMS = 3

export function ItemSelectPanel({
  champion,
  allItems,
  onAddItem,
  onRemoveItem,
  onRemoveChampion,
  onClose,
}) {
  const equipped = champion.items ?? []
  const isFull = equipped.length >= MAX_ITEMS

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
              아이템 {equipped.length}/{MAX_ITEMS}
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

      {/* Equipped items row — 클릭 시 해당 슬롯 제거 */}
      <div className="flex gap-xs">
        {Array.from({ length: MAX_ITEMS }).map((_, i) => {
          const item = equipped[i]
          if (!item) {
            return (
              <div
                key={i}
                className="w-10 h-10 rounded-lg border border-dashed border-outline-variant bg-surface-container"
              />
            )
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => onRemoveItem(i)}
              title={`${item.name} (클릭하여 해제)`}
              className="relative w-10 h-10 rounded-lg border border-primary bg-surface flex items-center justify-center group hover:border-error transition-all"
            >
              <img src={item.imgUrl} alt={item.name} className="w-8 h-8 object-contain" />
              <span className="absolute inset-0 rounded-lg bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all">
                <Icon
                  name="close"
                  className="text-white text-[16px] opacity-0 group-hover:opacity-100"
                />
              </span>
            </button>
          )
        })}
      </div>

      {/* Item grid — 항상 추가, 같은 아이템 중복 가능 */}
      <div>
        <p className="text-label-md text-on-surface-variant mb-xs">
          아이템 선택 (클릭하여 장착, 같은 아이템 중복 가능)
        </p>
        <div className="grid grid-cols-5 gap-xs max-h-48 overflow-y-auto custom-scrollbar">
          {allItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onAddItem(item)}
              disabled={isFull}
              title={isFull ? '슬롯이 가득 찼습니다' : item.name}
              className={[
                'aspect-square rounded-lg border transition-all flex items-center justify-center group',
                isFull
                  ? 'border-outline-variant/40 bg-surface opacity-40 cursor-not-allowed'
                  : 'border-outline-variant bg-surface hover:border-primary',
              ].join(' ')}
            >
              <img
                src={item.imgUrl}
                alt={item.name}
                className="w-7 h-7 object-contain group-hover:scale-110 transition-transform"
              />
            </button>
          ))}
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
