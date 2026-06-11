export function FooterBrand({ dark = false, compact = false, className = '' }) {
  const titleClass = dark
    ? 'text-primary dark:text-primary-fixed-dim'
    : 'text-primary'

  return (
    <div className={`flex flex-col items-center md:items-start gap-xs ${className}`.trim()}>
      <span className={`font-label-md text-label-md uppercase tracking-widest ${titleClass}`}>
        TFTLib
      </span>
      <p
        className={`font-caption text-caption text-on-surface-variant text-center md:text-left ${compact ? 'opacity-80' : 'max-w-md'}`}
      >
        © 2024 TFTLib. Master the Convergence through diligent study.
        {!compact && ' 모든 데이터는 최신 패치 노트를 기준으로 학술적 분석을 거칩니다.'}
      </p>
    </div>
  )
}
