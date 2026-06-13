import { useEffect, useRef, useState } from 'react'

/**
 * 저장된 전략 노트 목록을 보여주고, 이름을 클릭해 불러올 수 있는 드롭다운 메뉴.
 * - 외부 클릭/ESC로 닫힘
 * - 각 항목 우측의 삭제 아이콘으로 단일 항목 제거 가능
 */
export function LoadStrategyMenu({ strategyNames, onLoad, onDelete }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const hasStrategies = strategyNames.length > 0

  function handleLoad(name) {
    onLoad(name)
    setOpen(false)
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="text-sm text-on-surface-variant hover:text-primary hover:bg-primary-container/30 hover:border-primary/30 border border-outline-variant rounded-md px-3 py-1.5 flex items-center gap-1.5 transition-all duration-200"
      >
        <span className="material-symbols-outlined text-[18px]">folder_open</span>
        <span>전략 불러오기</span>
        <span className="material-symbols-outlined text-[16px] opacity-70">
          {open ? 'expand_less' : 'expand_more'}
        </span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 top-full mt-2 w-64 max-h-80 overflow-y-auto bg-white rounded-xl shadow-xl border border-outline-variant z-40"
        >
          {!hasStrategies && (
            <div className="px-md py-lg text-center text-on-surface-variant text-label-md font-label-md">
              저장된 전략이 없습니다.
            </div>
          )}

          {hasStrategies && (
            <ul className="py-1">
              {strategyNames.map((name) => (
                <li
                  key={name}
                  className="flex items-stretch hover:bg-surface-container-highest transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => handleLoad(name)}
                    className="flex-1 text-left px-md py-2 text-body-md font-body-md text-on-surface truncate"
                    title={name}
                  >
                    {name}
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(name)}
                    aria-label={`${name} 전략 삭제`}
                    className="px-2 text-on-surface-variant hover:text-red-600 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
