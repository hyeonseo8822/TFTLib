import { useMemo, useState } from 'react'
import { AugmentSelectModal } from '../components/positioning/AugmentSelectModal'
import { BoardArea } from '../components/positioning/BoardArea'
import { ChampionSidebar } from '../components/positioning/ChampionSidebar'
import { ItemSelectPanel } from '../components/positioning/ItemSelectPanel'
import { StrategyPanel } from '../components/positioning/StrategyPanel'
import { Footer } from '../components/layout/Footer'
import { PageLayout } from '../components/layout/PageLayout'
import { TopAppBar } from '../components/layout/TopAppBar'
import { AUGMENTS } from '../data/augments'
import { COMPLETED_ITEMS, MATERIAL_ITEMS } from '../data/items'
import {
  CHAMPIONS,
  DEFAULT_LEVEL,
  LEVEL_TABS,
} from '../data/positioning'
import { usePositioningState } from '../hooks/usePositioningState'

// All equippable items — completed + material
const ALL_ITEMS = [...COMPLETED_ITEMS, ...MATERIAL_ITEMS]

// 이름을 키로 갖는 전략 노트 컬렉션 저장소.
// 값: { placementTips, levelStrategy, boardMap, augmentSlots, savedAt }
const STRATEGIES_LS_KEY = 'tft-strategy-notes-v2'

function loadStrategies() {
  try {
    const raw = localStorage.getItem(STRATEGIES_LS_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {}
  } catch {
    return {}
  }
}

function persistStrategies(strategies) {
  try {
    localStorage.setItem(STRATEGIES_LS_KEY, JSON.stringify(strategies))
  } catch {
    // quota exceeded — 호출 측에서 사용자에게 알림
    throw new Error('persist-failed')
  }
}

export default function CharacterPosition() {
  const [activeLevel, setActiveLevel] = useState(DEFAULT_LEVEL)
  const [strategies, setStrategies] = useState(() => loadStrategies())
  const [strategyName, setStrategyName] = useState('')
  const [placementTips, setPlacementTips] = useState('')
  const [levelStrategy, setLevelStrategy] = useState('')

  const {
    getRows,
    getChampionCount,
    handleCellClick,
    placeChampion,
    removeChampion,
    clearBoard,
    itemPanel,
    closeItemPanel,
    addItemToChampion,
    removeItemFromChampion,
    augmentSlots,
    augmentModal,
    augmentPopover,
    openAugmentModal,
    selectAugment,
    toggleAugmentPopover,
    closeAugmentModal,
    getSnapshot,
    applySnapshot,
    resetAll,
  } = usePositioningState(LEVEL_TABS)

  const rows = getRows(activeLevel)
  const championCount = getChampionCount(activeLevel)

  const strategyNames = useMemo(
    () => Object.keys(strategies).sort((a, b) => a.localeCompare(b, 'ko')),
    [strategies],
  )

  function handleLevelChange(level) {
    closeItemPanel()
    setActiveLevel(level)
  }

  function handleSaveStrategy() {
    const trimmedName = strategyName.trim()
    if (!trimmedName) {
      alert('전략 이름을 입력해주세요.')
      return
    }

    const isOverwrite = Object.prototype.hasOwnProperty.call(strategies, trimmedName)
    if (isOverwrite && !confirm(`'${trimmedName}' 전략이 이미 존재합니다. 덮어쓸까요?`)) {
      return
    }

    const snapshot = getSnapshot()
    const next = {
      ...strategies,
      [trimmedName]: {
        placementTips,
        levelStrategy,
        boardMap: snapshot.boardMap,
        augmentSlots: snapshot.augmentSlots,
        savedAt: new Date().toISOString(),
      },
    }

    try {
      persistStrategies(next)
      setStrategies(next)
      alert(isOverwrite ? '전략이 갱신되었습니다.' : '전략이 저장되었습니다.')

      // 저장 후 작성 영역을 초기화하고 5레벨 화면으로 복귀.
      setStrategyName('')
      setPlacementTips('')
      setLevelStrategy('')
      resetAll()
      setActiveLevel(DEFAULT_LEVEL)
    } catch {
      alert('저장 중 오류가 발생했습니다. 저장 공간이 부족할 수 있습니다.')
    }
  }

  function handleLoadStrategy(name) {
    const target = strategies[name]
    if (!target) {
      alert('해당 전략을 찾을 수 없습니다.')
      return
    }
    setStrategyName(name)
    setPlacementTips(target.placementTips ?? '')
    setLevelStrategy(target.levelStrategy ?? '')
    applySnapshot({
      boardMap: target.boardMap,
      augmentSlots: target.augmentSlots,
    })
    closeItemPanel()
  }

  function handleDeleteStrategy(name) {
    if (!confirm(`'${name}' 전략을 삭제할까요?`)) return
    const next = { ...strategies }
    delete next[name]
    try {
      persistStrategies(next)
      setStrategies(next)
      if (strategyName === name) setStrategyName('')
    } catch {
      alert('삭제 중 오류가 발생했습니다.')
    }
  }

  return (
    <PageLayout>
      <TopAppBar activeNavId="positioning" />

      <main className="pt-20 min-h-screen w-full flex flex-col md:flex-row bg-background">
        <ChampionSidebar
          champions={CHAMPIONS}
          onChampionSelect={(champion) => placeChampion(activeLevel, champion)}
        />

        {/* Center: board + augments, with item panel overlaid */}
        <div className="relative flex-grow flex flex-col">
          <BoardArea
            levels={LEVEL_TABS}
            activeLevel={activeLevel}
            onLevelChange={handleLevelChange}
            championCount={championCount}
            rows={rows}
            onCellSelect={(rowIndex, cellIndex) =>
              handleCellClick(activeLevel, rowIndex, cellIndex)
            }
            onClearBoard={() => clearBoard(activeLevel)}
            augmentSlots={augmentSlots}
            popoverSlotId={augmentPopover?.slotId ?? null}
            onEmptySlotClick={openAugmentModal}
            onFilledSlotClick={toggleAugmentPopover}
            strategyNames={strategyNames}
            onLoadStrategy={handleLoadStrategy}
            onDeleteStrategy={handleDeleteStrategy}
          />

          {/* Item selection panel — floats above the board when a champion is selected */}
          {itemPanel && (
            <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20">
              <ItemSelectPanel
                champion={itemPanel.champion}
                allItems={ALL_ITEMS}
                onAddItem={(item) => addItemToChampion(activeLevel, item)}
                onRemoveItem={(slotIndex) => removeItemFromChampion(activeLevel, slotIndex)}
                onRemoveChampion={() =>
                  removeChampion(activeLevel, itemPanel.rowIndex, itemPanel.cellIndex)
                }
                onClose={closeItemPanel}
              />
            </div>
          )}
        </div>

        <StrategyPanel
          strategyName={strategyName}
          placementTips={placementTips}
          levelStrategy={levelStrategy}
          onStrategyNameChange={(e) => setStrategyName(e.target.value)}
          onPlacementTipsChange={(e) => setPlacementTips(e.target.value)}
          onLevelStrategyChange={(e) => setLevelStrategy(e.target.value)}
          onSave={handleSaveStrategy}
        />
      </main>

      <Footer dark className="mt-xl" />

      {/* Augment selection modal — rendered at root level to avoid clipping */}
      {augmentModal && (
        <AugmentSelectModal
          augments={AUGMENTS}
          onSelect={selectAugment}
          onClose={closeAugmentModal}
        />
      )}
    </PageLayout>
  )
}
