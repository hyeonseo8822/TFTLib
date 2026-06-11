import { Icon } from '../common/Icon'

export function AugmentIconBox({ icon, iconBoxClassName, iconClassName }) {
  return (
    <div
      className={`w-16 h-16 mb-sm flex items-center justify-center rounded-lg border-2 ${iconBoxClassName}`}
    >
      <Icon name={icon} className={`text-display-lg ${iconClassName}`} filled />
    </div>
  )
}
