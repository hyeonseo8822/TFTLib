import { SaveStrategyButton } from './SaveStrategyButton'
import { StrategyTextarea } from './StrategyTextarea'

export function StrategyPanel({ placementTips, levelStrategy, onPlacementTipsChange, onLevelStrategyChange }) {
  return (
    <aside className="w-full md:w-80 border-l border-outline-variant bg-surface-container-low p-md flex flex-col gap-lg sticky top-20 h-[calc(100vh-80px)]">
      <div className="flex flex-col">
        <h3 className="font-headline-md text-headline-md text-primary mb-xs">전략 정보</h3>
        <p className="font-caption text-caption text-on-surface-variant">
          배치와 운영에 대한 상세 노트를 작성하세요
        </p>
      </div>
      <div className="flex flex-col gap-md flex-grow">
        <StrategyTextarea
          id="placement-tips"
          label="배치 팁"
          placeholder="배치 시 유의사항을 적어주세요..."
          value={placementTips}
          onChange={onPlacementTipsChange}
        />
        <StrategyTextarea
          id="level-strategy"
          label="레벨업 운영법"
          placeholder="단계별 레벨업 타이밍과 리롤 전략..."
          value={levelStrategy}
          onChange={onLevelStrategyChange}
        />
      </div>
      <SaveStrategyButton />
    </aside>
  )
}
