import { AugmentDetailCard } from './AugmentDetailCard'
import { EffectDescription } from './EffectDescription'
import { OperationTips } from './OperationTips'
import { StrategistMemoCard } from './StrategistMemoCard'
import { ViewStatsButton } from './ViewStatsButton'

export function AugmentDetailPanel({ augment }) {
  return (
    <aside className="md:w-80 lg:w-96 mt-lg">
      <div className="sticky top-24 space-y-md">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col gap-md">
          <h3 className="font-headline-md text-headline-md text-primary">증강체 상세 정보</h3>
          <AugmentDetailCard augment={augment} />
          <EffectDescription description={augment.description} />
          <OperationTips tips={augment.tips} />
          <ViewStatsButton />
        </div>
        <StrategistMemoCard />
      </div>
    </aside>
  )
}
