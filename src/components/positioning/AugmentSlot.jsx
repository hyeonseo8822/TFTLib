import { TIER_TYPES } from '../../constants/tierStyles'
import { Icon } from '../common/Icon'

const TIER_BORDER = {
  [TIER_TYPES.SILVER]: 'border-slate-400 bg-slate-100',
  [TIER_TYPES.GOLD]:   'border-yellow-500 bg-yellow-50',
  [TIER_TYPES.PRISM]:  'border-purple-500 bg-purple-50',
}

export function AugmentSlot({ slot, popoverOpen, onEmptyClick, onFilledClick }) {
  const { augment } = slot

  if (!augment) {
    return (
      <button
        type="button"
        onClick={() => onEmptyClick(slot.id)}
        className="w-20 h-20 bg-surface-container-highest border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-primary transition-all group"
        aria-label="증강체 추가"
        title="증강체 추가"
      >
        <Icon name="add" className="text-outline group-hover:text-primary transition-colors" />
        <span className="text-[9px] text-on-surface-variant">추가</span>
      </button>
    )
  }

  const tierClass = TIER_BORDER[augment.tierType] ?? TIER_BORDER[TIER_TYPES.SILVER]

  return (
    <div className="relative flex flex-col items-center gap-xs">
      <button
        type="button"
        onClick={() => onFilledClick(slot.id)}
        className={[
          'w-20 h-20 border-2 rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all hover:brightness-95 active:scale-95',
          tierClass,
          popoverOpen ? 'ring-2 ring-primary ring-offset-1' : '',
        ].join(' ')}
        title={augment.name}
        aria-expanded={popoverOpen}
      >
        <img
          src={augment.image}
          alt={augment.name}
          className="w-10 h-10 object-contain"
        />
        <span className="text-[9px] font-bold leading-tight text-center px-1 truncate w-full">
          {augment.tier}
        </span>
      </button>

      <span className="text-[10px] text-on-surface-variant text-center max-w-[80px] truncate">
        {augment.name}
      </span>

      {popoverOpen && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-30 w-60 bg-surface border border-outline-variant rounded-xl shadow-xl p-sm">
          <div className="flex items-center gap-xs mb-xs">
            <img src={augment.image} alt={augment.name} className="w-6 h-6 object-contain" />
            <span className="font-label-md text-primary text-sm font-bold leading-tight">
              {augment.name}
            </span>
          </div>
          <p className="text-[11px] text-on-surface leading-relaxed mb-xs">
            {augment.description}
          </p>
          {augment.tips && (
            <p className="text-[11px] text-on-surface-variant leading-relaxed border-t border-outline-variant pt-xs">
              💡 {augment.tips}
            </p>
          )}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-surface border-r border-b border-outline-variant rotate-45" />
        </div>
      )}
    </div>
  )
}
