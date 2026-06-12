import { useEffect, useState } from 'react'
import { COMPLETED_ITEMS, MATERIAL_ITEMS } from '../../data/items'
import { Icon } from '../common/Icon'

function findCombination(slot1, slot2) {
  if (!slot1 || !slot2) return null
  return COMPLETED_ITEMS.find((item) => {
    if (!Array.isArray(item.recipe) || item.recipe.length !== 2) return false
    const [a, b] = item.recipe
    return (
      (a === slot1.id && b === slot2.id) ||
      (a === slot2.id && b === slot1.id)
    )
  })
}

function MaterialSlot({ item, label, onClear }) {
  return (
    <button
      type="button"
      onClick={onClear}
      title={item ? `${item.name} 제거` : label}
      className={[
        'relative w-24 h-28 sm:w-28 sm:h-32 rounded-xl border-2 flex flex-col items-center justify-center transition-all focus:outline-none px-1',
        item
          ? 'border-primary bg-surface shadow-md hover:brightness-95 cursor-pointer'
          : 'border-dashed border-outline bg-white/60 cursor-default',
      ].join(' ')}
    >
      {item ? (
        <>
          <img
            src={item.imgUrl}
            alt={item.name}
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
          />
          <span className="text-[10px] mt-1 text-primary font-bold leading-tight text-center max-w-full truncate w-full px-1">
            {item.name}
          </span>
          <span className="text-[9px] mt-0.5 text-on-surface-variant leading-tight text-center max-w-full truncate w-full px-1">
            {item.description}
          </span>
          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-outline-variant text-on-surface-variant flex items-center justify-center">
            <Icon name="close" className="text-[12px]" />
          </span>
        </>
      ) : (
        <>
          <Icon name="add" className="text-outline text-[32px]" />
          <span className="text-[10px] text-on-surface-variant mt-1">{label}</span>
        </>
      )}
    </button>
  )
}

function ResultCard({ result, noMatch }) {
  if (noMatch) {
    return (
      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-4 border-error bg-error-container flex flex-col items-center justify-center shadow-xl gap-1">
        <Icon name="block" className="text-error text-[36px]" />
        <span className="text-[11px] font-bold text-error text-center leading-tight px-1">조합 불가</span>
      </div>
    )
  }

  if (result) {
    return (
      <div className="relative w-32 sm:w-36 rounded-2xl border-4 border-primary bg-surface flex flex-col items-center shadow-xl p-2 gap-1">
        <img
          src={result.imgUrl}
          alt={result.name}
          className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
        />
        <span className="text-[11px] font-bold text-secondary text-center leading-tight w-full px-1 truncate">
          {result.name}
        </span>
        {result.stats?.length > 0 && (
          <ul className="w-full flex flex-col gap-0.5 mt-1">
            {result.stats.map((stat) => (
              <li
                key={stat.label}
                className="flex items-center justify-between text-[9px] leading-tight px-1"
              >
                <span className="text-on-surface-variant truncate">{stat.label}</span>
                <span className="font-bold text-primary ml-1 shrink-0">{stat.value}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="absolute -top-3 -right-3 bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm">
          완성!
        </div>
      </div>
    )
  }

  return (
    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-4 border-dashed border-outline bg-white/60 flex flex-col items-center justify-center shadow-sm gap-1">
      <Icon name="question_mark" className="text-outline text-[40px]" />
      <span className="text-[10px] text-on-surface-variant">결과물</span>
    </div>
  )
}

export function CombinationLab({ onItemSelect }) {
  const [slot1, setSlot1] = useState(null)
  const [slot2, setSlot2] = useState(null)

  const result = findCombination(slot1, slot2)
  const noMatch = !!slot1 && !!slot2 && !result

  useEffect(() => {
    if (result) {
      onItemSelect?.(result)
    }
  }, [result, onItemSelect])

  function handleMaterialClick(mat) {
    if (!slot1) {
      setSlot1(mat)
      return
    }
    if (!slot2) {
      setSlot2(mat)
      return
    }
    // 두 슬롯이 모두 차 있으면, 새 재료로 다시 시작합니다.
    setSlot1(mat)
    setSlot2(null)
  }

  function handleReset() {
    setSlot1(null)
    setSlot2(null)
  }

  function handleClearSlot1() {
    setSlot1(slot2)
    setSlot2(null)
  }

  function handleClearSlot2() {
    setSlot2(null)
  }

  return (
    <section className="bg-surface-container border border-outline-variant rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-md pt-md pb-sm">
        <h2 className="font-headline-md text-headline-md text-primary flex items-center gap-2">
          <Icon name="biotech" />
          조합 실험대
        </h2>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1 px-3 py-1 rounded-full border border-outline-variant text-label-md text-on-surface-variant hover:bg-surface-container-high transition-colors"
        >
          <Icon name="restart_alt" className="text-[16px]" />
          초기화
        </button>
      </div>

      {/* Material grid */}
      <div className="px-md pb-md">
        <p className="text-label-md text-on-surface-variant mb-sm">
          재료 선택 — 두 개를 고르면 자동으로 조합됩니다
        </p>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-xs sm:gap-sm">
          {MATERIAL_ITEMS.map((mat) => {
            const inSlot1 = slot1?.id === mat.id
            const inSlot2 = slot2?.id === mat.id

            return (
              <button
                key={mat.id}
                type="button"
                onClick={() => handleMaterialClick(mat)}
                title={`${mat.name} (${mat.description})`}
                aria-label={`${mat.name} ${mat.description}`}
                className={[
                  'aspect-square rounded-lg border transition-all flex items-center justify-center group cursor-pointer',
                  inSlot1 || inSlot2
                    ? 'border-primary bg-surface ring-2 ring-primary/30'
                    : 'border-outline-variant bg-surface hover:border-primary hover:scale-105',
                ].join(' ')}
              >
                <img
                  src={mat.imgUrl}
                  alt={mat.name}
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform"
                />
              </button>
            )
          })}
        </div>
      </div>

      {/* Divider */}
      <hr className="border-outline-variant mx-md" />

      {/* Crafting row */}
      <div className="px-md py-md flex flex-col sm:flex-row items-center justify-center gap-md sm:gap-lg">
        <MaterialSlot item={slot1} label="재료 1" onClear={handleClearSlot1} />

        <Icon name="add" className="text-on-surface-variant text-[28px]" />

        <MaterialSlot item={slot2} label="재료 2" onClear={handleClearSlot2} />

        <Icon
          name="arrow_forward"
          className="text-primary text-[28px] rotate-90 sm:rotate-0"
        />

        <ResultCard result={result} noMatch={noMatch} />
      </div>
    </section>
  )
}
