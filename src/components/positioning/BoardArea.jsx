import { AugmentSlotsSection } from './AugmentSlotsSection'
import { HexBoard } from './HexBoard'
import { LevelChampionCounter } from './LevelChampionCounter'
import { LevelTabGroup } from './LevelTabGroup'

export function BoardArea({
  levels,
  activeLevel,
  onLevelChange,
  championCount,
  rows,
  onCellSelect,
  augmentSlots,
  popoverSlotId,
  onEmptySlotClick,
  onFilledSlotClick,
}) {
  return (
    <div className="flex-grow p-margin flex flex-col items-center gap-lg overflow-y-auto">
      {/* 레벨 탭은 중앙 정렬, 카운터는 우측 빈 공간에 절대 배치 */}
      <div className="relative w-full flex items-center justify-center">
        <LevelTabGroup levels={levels} activeLevel={activeLevel} onLevelChange={onLevelChange} />
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <LevelChampionCounter count={championCount} max={activeLevel} />
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
