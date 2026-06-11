import { AugmentSlotsSection } from './AugmentSlotsSection'
import { HexBoard } from './HexBoard'
import { LevelTabGroup } from './LevelTabGroup'

export function BoardArea({
  levels,
  activeLevel,
  onLevelChange,
  rows,
  onCellSelect,
  augmentSlots,
  popoverSlotId,
  onEmptySlotClick,
  onFilledSlotClick,
}) {
  return (
    <div className="flex-grow p-margin flex flex-col items-center gap-lg overflow-y-auto">
      <LevelTabGroup levels={levels} activeLevel={activeLevel} onLevelChange={onLevelChange} />
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
