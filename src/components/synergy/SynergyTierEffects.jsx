import { SynergyTierEffect } from './SynergyTierEffect'

export function SynergyTierEffects({ effects }) {
  if (!effects || effects.length === 0) {
    // 고유 시너지처럼 단계가 없는 경우, 섹션 자체를 숨깁니다.
    return null
  }

  return (
    <section>
      <h4 className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-md border-b border-outline-variant pb-xs">
        시너지 효과
      </h4>
      <div className="space-y-md">
        {effects.map((effect) => (
          <SynergyTierEffect
            key={effect.tier}
            tier={effect.tier}
            title={effect.title}
            description={effect.description}
            active={effect.active}
          />
        ))}
      </div>
    </section>
  )
}
