import { Icon } from '../common/Icon'

export function SynergyCardIcon({ icon, iconBg, iconColor, filled = false }) {
  return (
    <div
      className={`w-12 h-12 ${iconBg} rounded flex items-center justify-center ${iconColor}`}
    >
      <Icon name={icon} filled={filled} />
    </div>
  )
}
