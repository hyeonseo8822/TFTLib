import { useCallback, useEffect, useRef, useState } from 'react'
import { INITIAL_AUGMENT_SLOTS, INITIAL_HEX_ROWS } from '../data/positioning'

// v2: 기본 배치를 빈 보드로 초기화하면서 이전 키('tft-positioning-boards')의
//     데이터(외부 CDN 챔피언 등 구버전 잔재)와 격리합니다.
const LS_KEY = 'tft-positioning-boards-v2'
const MAX_ITEMS = 3

// Deep clone via JSON round-trip (safe for plain objects/arrays).
function deepClone(value) {
  return JSON.parse(JSON.stringify(value))
}

// Build the initial per-level board map from localStorage, falling back to
// a fresh clone of INITIAL_HEX_ROWS for every level.
function loadBoards() {
  try {
    const stored = localStorage.getItem(LS_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // Validate that it is an object with numeric keys before trusting it.
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed
      }
    }
  } catch {
    // ignore corrupt storage
  }
  return {}
}

function buildInitialBoardMap(levels) {
  const stored = loadBoards()
  const map = {}
  for (const level of levels) {
    map[level] = stored[level] ? deepClone(stored[level]) : deepClone(INITIAL_HEX_ROWS)
  }
  return map
}

export function usePositioningState(levels) {
  // ------------------------------------------------------------------
  // 1. Per-level board map
  // ------------------------------------------------------------------
  const [boardMap, setBoardMap] = useState(() => buildInitialBoardMap(levels))

  // Persist to localStorage whenever boardMap changes.
  // Use a ref to skip the very first render (already loaded from storage).
  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(boardMap))
    } catch {
      // quota exceeded or private browsing — silent fail
    }
  }, [boardMap])

  // ------------------------------------------------------------------
  // 2. Item-selection panel state
  //    itemPanel: null | { rowIndex, cellIndex, champion }
  // ------------------------------------------------------------------
  const [itemPanel, setItemPanel] = useState(null)

  // ------------------------------------------------------------------
  // 3. Augment slots
  // ------------------------------------------------------------------
  const [augmentSlots, setAugmentSlots] = useState(() => deepClone(INITIAL_AUGMENT_SLOTS))
  // augmentModal: null | { slotId }  — which slot is showing the "choose augment" modal
  const [augmentModal, setAugmentModal] = useState(null)
  // augmentPopover: null | { slotId }  — which filled slot is showing its description
  const [augmentPopover, setAugmentPopover] = useState(null)

  // ------------------------------------------------------------------
  // Board helpers
  // ------------------------------------------------------------------
  const getRows = useCallback(
    (level) => boardMap[level] ?? deepClone(INITIAL_HEX_ROWS),
    [boardMap],
  )

  /** Click on a cell:
   *  - If cell has a champion → open item panel for that champion.
   *  - If cell is empty       → mark it active (ready to receive a champion).
   */
  const handleCellClick = useCallback(
    (level, rowIndex, cellIndex) => {
      const rows = boardMap[level] ?? deepClone(INITIAL_HEX_ROWS)
      const cell = rows[rowIndex]?.cells[cellIndex]

      if (cell?.id) {
        // Occupied — open item panel. Close any augment UI.
        setAugmentModal(null)
        setAugmentPopover(null)
        setItemPanel((prev) =>
          prev?.rowIndex === rowIndex && prev?.cellIndex === cellIndex
            ? null // toggle closed
            : { rowIndex, cellIndex, champion: deepClone(cell) },
        )
        return
      }

      // Empty — mark active, close item panel.
      setItemPanel(null)
      setBoardMap((prev) => {
        const next = deepClone(prev)
        const levelRows = next[level] ?? deepClone(INITIAL_HEX_ROWS)
        next[level] = levelRows.map((row, rIdx) => ({
          ...row,
          cells: row.cells.map((c, cIdx) => ({
            ...c,
            active: rIdx === rowIndex && cIdx === cellIndex ? !c.active : false,
          })),
        }))
        return next
      })
    },
    [boardMap],
  )

  /** Find the currently active (selected empty) cell for a level. */
  function findActiveCell(rows) {
    for (let r = 0; r < rows.length; r += 1) {
      for (let c = 0; c < rows[r].cells.length; c += 1) {
        if (rows[r].cells[c]?.active) return { rowIndex: r, cellIndex: c }
      }
    }
    return null
  }

  /** 보드 위에 배치된 챔피언 수(빈 셀과 active-only 셀 제외) */
  function countChampions(rows) {
    let n = 0
    for (const row of rows) {
      for (const cell of row.cells) {
        if (cell?.id) n += 1
      }
    }
    return n
  }

  /** 외부에서 현재 레벨의 배치된 챔피언 수를 조회할 때 사용. */
  const getChampionCount = useCallback(
    (level) => countChampions(boardMap[level] ?? INITIAL_HEX_ROWS),
    [boardMap],
  )

  /** Place a champion from the sidebar into the active cell of the current level. */
  const placeChampion = useCallback((level, champion) => {
    setBoardMap((prev) => {
      const next = deepClone(prev)
      const rows = next[level] ?? deepClone(INITIAL_HEX_ROWS)
      const coords = findActiveCell(rows)
      if (!coords) return prev

      // 레벨 번호 = 해당 레벨에서 배치 가능한 최대 챔피언 수.
      // 새 배치는 빈 셀에만 들어가므로(차있던 셀은 itemPanel을 열기 때문) count + 1 이 제한 초과면 차단.
      if (countChampions(rows) >= level) {
        alert(`${level}레벨에서는 챔피언을 최대 ${level}명까지 배치할 수 있습니다.`)
        // active 상태를 모두 해제해 시각적 피드백.
        next[level] = rows.map((row) => ({
          ...row,
          cells: row.cells.map((c) => ({ ...c, active: false })),
        }))
        return next
      }

      const { rowIndex, cellIndex } = coords
      next[level] = rows.map((row, rIdx) => ({
        ...row,
        cells: row.cells.map((cell, cIdx) => {
          if (rIdx === rowIndex && cIdx === cellIndex) {
            return { ...deepClone(champion), active: false, items: [] }
          }
          return { ...cell, active: false }
        }),
      }))
      return next
    })
  }, [])

  /** Remove a champion from a cell (right-click / dedicated remove action). */
  const removeChampion = useCallback((level, rowIndex, cellIndex) => {
    setItemPanel(null)
    setBoardMap((prev) => {
      const next = deepClone(prev)
      const rows = next[level] ?? deepClone(INITIAL_HEX_ROWS)
      next[level] = rows.map((row, rIdx) => ({
        ...row,
        cells: row.cells.map((cell, cIdx) =>
          rIdx === rowIndex && cIdx === cellIndex ? {} : cell,
        ),
      }))
      return next
    })
  }, [])

  // ------------------------------------------------------------------
  // Item panel helpers
  // ------------------------------------------------------------------
  const closeItemPanel = useCallback(() => setItemPanel(null), [])

  /**
   * 챔피언에 아이템을 추가합니다. 같은 아이템도 중복 장착 가능하며,
   * 최대 MAX_ITEMS(3)개까지 누적됩니다.
   */
  const addItemToChampion = useCallback(
    (level, item) => {
      if (!itemPanel) return
      const { rowIndex, cellIndex } = itemPanel

      setBoardMap((prev) => {
        const next = deepClone(prev)
        const rows = next[level] ?? deepClone(INITIAL_HEX_ROWS)
        const cell = rows[rowIndex]?.cells[cellIndex]
        if (!cell?.id) return prev

        const items = cell.items ?? []
        if (items.length >= MAX_ITEMS) {
          alert(`아이템은 챔피언 한 명당 최대 ${MAX_ITEMS}개까지 장착할 수 있습니다.`)
          return prev
        }
        items.push(deepClone(item))

        cell.items = items
        next[level] = rows
        // Sync the live panel state so the UI reflects instantly.
        setItemPanel((p) => (p ? { ...p, champion: deepClone(cell) } : null))
        return next
      })
    },
    [itemPanel],
  )

  /**
   * 슬롯 인덱스 기준으로 장착된 아이템 한 칸을 제거합니다.
   * 중복 장착이 가능하므로 id 매칭이 아닌 인덱스로 제거해야 모호함이 없습니다.
   */
  const removeItemFromChampion = useCallback(
    (level, slotIndex) => {
      if (!itemPanel) return
      const { rowIndex, cellIndex } = itemPanel

      setBoardMap((prev) => {
        const next = deepClone(prev)
        const rows = next[level] ?? deepClone(INITIAL_HEX_ROWS)
        const cell = rows[rowIndex]?.cells[cellIndex]
        if (!cell?.id) return prev

        const items = cell.items ?? []
        if (slotIndex < 0 || slotIndex >= items.length) return prev
        items.splice(slotIndex, 1)

        cell.items = items
        next[level] = rows
        setItemPanel((p) => (p ? { ...p, champion: deepClone(cell) } : null))
        return next
      })
    },
    [itemPanel],
  )

  // ------------------------------------------------------------------
  // Augment slot helpers
  // ------------------------------------------------------------------

  /** Open the augment-chooser modal for a slot. */
  const openAugmentModal = useCallback((slotId) => {
    setAugmentPopover(null)
    setAugmentModal({ slotId })
  }, [])

  /** Select an augment from the modal and fill the slot. */
  const selectAugment = useCallback((augment) => {
    if (!augmentModal) return
    const { slotId } = augmentModal
    setAugmentSlots((prev) =>
      prev.map((s) => (s.id === slotId ? { ...s, augment: deepClone(augment) } : s)),
    )
    setAugmentModal(null)
  }, [augmentModal])

  /** Toggle the description popover on a filled augment slot. */
  const toggleAugmentPopover = useCallback((slotId) => {
    setAugmentModal(null)
    setAugmentPopover((prev) => (prev?.slotId === slotId ? null : { slotId }))
  }, [])

  const closeAugmentModal = useCallback(() => setAugmentModal(null), [])
  const closeAugmentPopover = useCallback(() => setAugmentPopover(null), [])

  return {
    // board
    getRows,
    getChampionCount,
    handleCellClick,
    placeChampion,
    removeChampion,
    // item panel
    itemPanel,
    closeItemPanel,
    addItemToChampion,
    removeItemFromChampion,
    // augments
    augmentSlots,
    augmentModal,
    augmentPopover,
    openAugmentModal,
    selectAugment,
    toggleAugmentPopover,
    closeAugmentModal,
    closeAugmentPopover,
  }
}
