import { DetailSectionTitle } from './DetailSectionTitle'

export function EffectDescription({ description }) {
  // 여러 줄 설명을 줄별로 끊어 표시
  const lines = (description ?? '').split('\n').filter(Boolean)

  return (
    <div className="space-y-sm">
      <DetailSectionTitle>효과 설명</DetailSectionTitle>
      <div className="space-y-xs">
        {lines.map((line, i) => (
          <p
            key={i}
            className="font-body-md text-body-md text-on-surface-variant italic leading-relaxed"
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}
