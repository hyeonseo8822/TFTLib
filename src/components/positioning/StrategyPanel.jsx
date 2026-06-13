import { SaveStrategyButton } from './SaveStrategyButton'
import { StrategyTextarea } from './StrategyTextarea'

export function StrategyPanel({
  strategyName,
  placementTips,
  levelStrategy,
  onStrategyNameChange,
  onPlacementTipsChange,
  onLevelStrategyChange,
  onSave,
}) {
  const isNameEmpty = !strategyName.trim()

  return (
    <aside className="w-full md:w-80 border-l border-outline-variant bg-surface-container-low p-md flex flex-col gap-lg sticky top-20 h-[calc(100vh-80px)]">
      <div className="flex flex-col">
        <h3 className="font-headline-md text-headline-md text-primary mb-xs">전략 정보</h3>
        <p className="font-caption text-caption text-on-surface-variant">
          배치와 운영에 대한 상세 노트를 작성하세요
        </p>
      </div>
      <div className="flex flex-col gap-md flex-grow">
        <div className="flex flex-col gap-xs">
          <label
            htmlFor="strategy-name"
            className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1"
          >
            전략 이름
            <span className="text-red-500" aria-hidden="true">*</span>
            <span className="sr-only">(필수)</span>
          </label>
          <input
            id="strategy-name"
            type="text"
            required
            aria-required="true"
            placeholder="예: 사이오닉 + 전송체 8레벨"
            value={strategyName}
            onChange={onStrategyNameChange}
            className={[
              'w-full bg-white border rounded-lg px-sm py-2 font-body-md text-body-md',
              'focus:ring-2 focus:ring-primary focus:border-transparent outline-none',
              isNameEmpty ? 'border-outline-variant' : 'border-primary/40',
            ].join(' ')}
          />
        </div>
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
      <SaveStrategyButton onClick={onSave} disabled={isNameEmpty} />
    </aside>
  )
}
