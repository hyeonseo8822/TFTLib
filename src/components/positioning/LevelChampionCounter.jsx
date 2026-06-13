/**
 * 현재 레벨에서 배치된 챔피언 수 / 최대치를 보여주는 작은 배지.
 * - 최대치는 항상 레벨 번호와 같습니다(5레벨 = 최대 5명).
 * - 가득 차면 색상으로 시각 피드백을 줍니다.
 */
export function LevelChampionCounter({ count, max }) {
  const reached = count >= max
  return (
    <div
      className={[
        'flex items-center gap-2 px-3 py-1.5 rounded-lg',
        'bg-surface-container border border-primary-container/20',
        'text-label-md font-label-md select-none',
        reached ? 'text-red-600' : 'text-on-surface',
      ].join(' ')}
      aria-label={`현재 ${count}명 배치, 최대 ${max}명`}
      title={`배치 ${count}/${max}`}
    >
      <span className="text-on-surface-variant">배치</span>
      <span className="tabular-nums">
        <span className="font-bold">{count}</span>
        <span className="opacity-60"> / {max}</span>
      </span>
    </div>
  )
}
