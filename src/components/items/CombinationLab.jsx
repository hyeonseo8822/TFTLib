import { useState } from 'react'
import { COMPLETED_ITEMS, MATERIAL_ITEMS } from '../../data/items'
import { Icon } from '../common/Icon'

function SlotBox({ item, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={item ? `${item.name} 제거` : label}
      className={[
        'relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl border-2 flex flex-col items-center justify-center transition-all focus:outline-none',
        item
          ? 'border-primary bg-surface shadow-md hover:brightness-95 cursor-pointer'
          : 'border-dashed border-outline bg-white/60 cursor-default',
      ].join(' ')}
    >
      {item ? (
        <>
          <img src={item.imgUrl} alt={item.name} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
          <span className="text-[9px] mt-1 text-primary font-bold leading-tight max-w-[72px] truncate px-1">
            {item.name}
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

function ResultSlot({ result, noMatch }) {
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
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-4 border-primary bg-primary-container flex flex-col items-center justify-center shadow-xl gap-1">
        <img src={result.imgUrl} alt={result.name} className="w-12 h-12 sm:w-14 sm:h-14 object-contain" />
        <span className="text-[10px] font-bold text-primary text-center leading-tight max-w-[96px] px-1 truncate">
          {result.name}
        </span>
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
  const [result, setResult] = useState(null)
  const [noMatch, setNoMatch] = useState(false)

  function handleMaterialClick(mat) {
    if (!slot1) {
      setSlot1(mat)
      setResult(null)
      setNoMatch(false)
    } else if (!slot2) {
      if (slot1.id === mat.id) {
        setSlot2(mat)
      } else {
        setSlot2(mat)
      }
      setResult(null)
      setNoMatch(false)
    }
    // both slots filled — do nothing; user must clear a slot first
  }

  function handleCombine() {
    if (!slot1 || !slot2) return

    const matched = COMPLETED_ITEMS.find((item) => {
      const [a, b] = item.recipe
      return (
        (a === slot1.id && b === slot2.id) ||
        (a === slot2.id && b === slot1.id)
      )
    })

    if (matched) {
      setResult(matched)
      setNoMatch(false)
      onItemSelect(matched)
    } else {
      setResult(null)
      setNoMatch(true)
    }
  }

  function handleReset() {
    setSlot1(null)
    setSlot2(null)
    setResult(null)
    setNoMatch(false)
  }

  const canCombine = !!slot1 && !!slot2

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
        <p className="text-label-md text-on-surface-variant mb-sm">재료 선택 (슬롯에 차례로 배치)</p>
        <div className="grid grid-cols-5 sm:grid-cols-9 gap-xs sm:gap-sm">
          {MATERIAL_ITEMS.map((mat) => {
            const inSlot1 = slot1?.id === mat.id
            const inSlot2 = slot2?.id === mat.id && slot1?.id !== slot2?.id
            const bothFilled = !!slot1 && !!slot2
            const isDisabled = bothFilled && !inSlot1 && !inSlot2

            return (
              <button
                key={mat.id}
                type="button"
                onClick={() => handleMaterialClick(mat)}
                disabled={isDisabled}
                title={mat.name}
                aria-label={mat.name}
                className={[
                  'aspect-square rounded-lg border transition-all flex items-center justify-center group',
                  isDisabled
                    ? 'opacity-30 cursor-not-allowed border-outline-variant bg-surface'
                    : inSlot1 || inSlot2
                    ? 'border-primary bg-surface ring-2 ring-primary/30 cursor-pointer'
                    : 'border-outline-variant bg-surface hover:border-primary cursor-pointer hover:scale-105',
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
        <SlotBox
          item={slot1}
          label="재료 1"
          onClick={() => { setSlot1(null); setResult(null); setNoMatch(false) }}
        />

        <div className="flex flex-col items-center gap-xs">
          <Icon name="add" className="text-on-surface-variant text-[28px]" />
        </div>

        <SlotBox
          item={slot2}
          label="재료 2"
          onClick={() => { setSlot2(null); setResult(null); setNoMatch(false) }}
        />

        <Icon
          name="arrow_forward"
          className="text-primary text-[28px] rotate-90 sm:rotate-0"
        />

        <ResultSlot result={result} noMatch={noMatch} />
      </div>

      {/* Combine button */}
      <div className="px-md pb-md flex justify-center">
        <button
          type="button"
          onClick={handleCombine}
          disabled={!canCombine}
          className={[
            'flex items-center gap-2 px-xl py-3 rounded-full font-label-md transition-all',
            canCombine
              ? 'bg-primary text-white hover:bg-primary/90 active:scale-95 cursor-pointer'
              : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed opacity-60',
          ].join(' ')}
        >
          <Icon name="auto_fix_high" />
          조합하기
        </button>
      </div>
    </section>
  )
}
