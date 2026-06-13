import { AugmentSlotsSection } from './AugmentSlotsSection'
import { HexBoard } from './HexBoard'
import { LevelChampionCounter } from './LevelChampionCounter'
import { LevelTabGroup } from './LevelTabGroup'
import { LoadStrategyMenu } from './LoadStrategyMenu'

export function BoardArea({
  levels,
  activeLevel,
  onLevelChange,
  championCount,
  rows,
  onCellSelect,
  onClearBoard,
  augmentSlots,
  popoverSlotId,
  onEmptySlotClick,
  onFilledSlotClick,
  strategyNames,
  onLoadStrategy,
  onDeleteStrategy,
}) {
  return (
    <div className="flex-grow p-margin flex flex-col items-center gap-lg overflow-y-auto">
      {/* 레벨 탭은 중앙 정렬, 좌측엔 전략 불러오기, 우측엔 카운터/초기화 */}
      <div className="relative w-full flex items-center justify-center">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30">
          <LoadStrategyMenu
            strategyNames={strategyNames}
            onLoad={onLoadStrategy}
            onDelete={onDeleteStrategy}
          />
        </div>
        <LevelTabGroup levels={levels} activeLevel={activeLevel} onLevelChange={onLevelChange} />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-end gap-1">
          <LevelChampionCounter count={championCount} max={activeLevel} />
          <button
            type="button"
            onClick={onClearBoard}
            className="text-sm text-on-surface-variant hover:text-red-600 hover:bg-red-50 hover:border-red-200 border border-outline-variant rounded-md px-3 py-1.5 flex items-center gap-1.5 transition-all duration-200"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
            <span>전체 삭제</span>
          </button>
        </div>
      </div>
      <HexBoard rows={rows} onCellSelect={onCellSelect} />
      <AugmentSlotsSection
        slots={augmentSlots}
        popoverSlotId={popoverSlotId}
        onEmptySlotClick={onEmptySlotClick}
        onFilledSlotClick={onFilledSlotClick}
      />
    </div>
  )
}
