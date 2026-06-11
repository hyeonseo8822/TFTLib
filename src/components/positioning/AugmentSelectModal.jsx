import { useEffect } from 'react'
import { TIER_TYPES } from '../../constants/tierStyles'
import { Icon } from '../common/Icon'

const TIER_BADGE = {
  [TIER_TYPES.SILVER]: 'bg-slate-200 text-slate-700',
  [TIER_TYPES.GOLD]:   'bg-yellow-100 text-yellow-800 border border-yellow-400',
  [TIER_TYPES.PRISM]:  'bg-purple-100 text-purple-800 border border-purple-400',
}

export function AugmentSelectModal({ augments, onSelect, onClose }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-surface rounded-2xl border border-outline-variant shadow-2xl w-full max-w-lg mx-md p-lg flex flex-col gap-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-headline-md text-headline-md text-primary flex items-center gap-2">
            <Icon name="workspace_premium" />
            증강체 선택
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-xs rounded-full hover:bg-surface-container-high transition-all"
            aria-label="닫기"
          >
            <Icon name="close" className="text-on-surface-variant" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-sm max-h-96 overflow-y-auto custom-scrollbar">
          {augments.map((aug) => (
            <button
              key={aug.id}
              type="button"
              onClick={() => onSelect(aug)}
              className="flex items-start gap-sm p-sm rounded-xl border border-outline-variant hover:border-primary bg-surface-container-lowest hover:bg-surface-container-low transition-all text-left"
            >
              <img
                src={aug.image}
                alt={aug.name}
                className="w-10 h-10 object-contain flex-shrink-0 mt-0.5"
              />
              <div className="flex flex-col gap-xs min-w-0">
                <span className="font-label-md text-primary text-sm leading-tight truncate">
                  {aug.name}
                </span>
                <span
                  className={[
                    'self-start px-2 py-px rounded-full text-[10px] font-bold',
                    TIER_BADGE[aug.tierType] ?? TIER_BADGE[TIER_TYPES.SILVER],
                  ].join(' ')}
                >
                  {aug.tier}
                </span>
                <p className="text-[11px] text-on-surface-variant leading-snug line-clamp-2">
                  {aug.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
