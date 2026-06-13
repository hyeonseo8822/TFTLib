import { useState } from 'react'
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

const STRATEGY_LS_KEY = 'tft-strategy-notes'

export default function CharacterPosition() {
  const [activeLevel, setActiveLevel] = useState(DEFAULT_LEVEL)
  const [placementTips, setPlacementTips] = useState(() => {
    try {
      const stored = localStorage.getItem(STRATEGY_LS_KEY)
      return stored ? JSON.parse(stored).placementTips : ''
    } catch { return '' }
  })
  const [levelStrategy, setLevelStrategy] = useState(() => {
    try {
      const stored = localStorage.getItem(STRATEGY_LS_KEY)
      return stored ? JSON.parse(stored).levelStrategy : ''
    } catch { return '' }
  })

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
  } = usePositioningState(LEVEL_TABS)

  const rows = getRows(activeLevel)
  const championCount = getChampionCount(activeLevel)

  function handleLevelChange(level) {
    closeItemPanel()
    setActiveLevel(level)
  }

  function handleSaveStrategy() {
    try {
      const data = { placementTips, levelStrategy }
      localStorage.setItem(STRATEGY_LS_KEY, JSON.stringify(data))
      alert('전략 정보가 저장되었습니다.')
    } catch {
      alert('저장 중 오류가 발생했습니다.')
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
          placementTips={placementTips}
          levelStrategy={levelStrategy}
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
