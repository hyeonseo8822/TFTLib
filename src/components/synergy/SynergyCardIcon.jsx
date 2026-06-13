import { Icon } from '../common/Icon'

export function SynergyCardIcon({ icon, iconBg, iconColor, filled = false, emblem, name }) {
  // 엠블럼 이미지가 있으면 우선 표시하고, 없으면 머티리얼 아이콘으로 폴백합니다.
  if (emblem) {
    return (
      <div
        className={`w-12 h-12 ${iconBg} rounded flex items-center justify-center p-1`}
      >
        <img
          src={emblem}
          alt={name ?? ''}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div
      className={`w-12 h-12 ${iconBg} rounded flex items-center justify-center ${iconColor}`}
    >
      <Icon name={icon} filled={filled} />
    </div>
  )
}
