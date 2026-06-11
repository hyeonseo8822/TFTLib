import { AugmentSlot } from './AugmentSlot'

export function AugmentSlotsSection({
  slots,
  popoverSlotId,
  onEmptySlotClick,
  onFilledSlotClick,
}) {
  return (
    <div className="w-full max-w-2xl">
      <h4 className="font-label-md text-label-md text-on-surface-variant mb-md text-center">
        선택된 증강체
      </h4>
      <div className="flex justify-center gap-lg">
        {slots.map((slot) => (
          <AugmentSlot
            key={slot.id}
            slot={slot}
            popoverOpen={popoverSlotId === slot.id}
            onEmptyClick={onEmptySlotClick}
            onFilledClick={onFilledSlotClick}
          />
        ))}
      </div>
    </div>
  )
}
