import { DetailSectionTitle } from './DetailSectionTitle'

export function EffectDescription({ description }) {
  return (
    <div className="space-y-sm">
      <DetailSectionTitle>효과 설명</DetailSectionTitle>
      <p className="font-body-md text-body-md text-on-surface-variant italic leading-relaxed">
        {description}
      </p>
    </div>
  )
}
