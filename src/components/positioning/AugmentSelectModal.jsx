import { useEffect, useState, useMemo } from 'react'
import { TIER_TYPES } from '../../constants/tierStyles'
import { Icon } from '../common/Icon'

const TIER_BADGE = {
  [TIER_TYPES.SILVER]: 'bg-slate-200 text-slate-700',
  [TIER_TYPES.GOLD]:   'bg-yellow-100 text-yellow-800 border border-yellow-400',
  [TIER_TYPES.PRISM]:  'bg-purple-100 text-purple-800 border border-purple-400',
}

export function AugmentSelectModal({ augments, onSelect, onClose }) {
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const filteredAugments = useMemo(() => {
    const term = searchTerm.toLowerCase().trim()
    if (!term) return augments
    return augments.filter(
      (aug) =>
        aug.name.toLowerCase().includes(term) ||
        aug.description.toLowerCase().includes(term)
    )
  }, [augments, searchTerm])

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

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            autoFocus
            placeholder="증강체 이름이나 효과 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface-container-high border border-outline-variant rounded-xl px-10 py-3 text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
          <Icon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-surface-container-highest transition-all"
            >
              <Icon name="cancel" className="text-on-surface-variant text-[18px]" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-sm max-h-96 overflow-y-auto custom-scrollbar">
          {filteredAugments.length > 0 ? (
            filteredAugments.map((aug) => (
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
            ))
          ) : (
            <div className="col-span-2 py-12 flex flex-col items-center justify-center gap-sm text-on-surface-variant opacity-50">
              <Icon name="search_off" className="text-[48px]" />
              <p className="font-label-md">검색 결과가 없습니다</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
