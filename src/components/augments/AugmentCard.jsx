import { getTierStyles } from '../../constants/tierStyles'
import { TierBadge } from './TierBadge'

export function AugmentCard({ augment, isActive = false, onSelect }) {
  const styles = getTierStyles(augment.tierType)

  const cardClasses = [
    'group flex flex-col items-center p-md border rounded-xl transition-all text-left',
    isActive
      ? 'augment-card-active border-primary'
      : 'bg-surface-container-lowest border-outline-variant hover:border-primary',
  ].join(' ')

  return (
    <button
      type="button"
      className={cardClasses}
      onClick={() => onSelect(augment)}
      aria-pressed={isActive}
      aria-label={`${augment.name} (${augment.tier})`}
    >
      <div
        className={`w-16 h-16 mb-sm flex items-center justify-center rounded-lg border-2 overflow-hidden ${styles.cardIconBox}`}
      >
        <img
          src={augment.image}
          alt={augment.name}
          className="w-12 h-12 object-contain group-hover:scale-105 transition-transform"
        />
      </div>
      <span className="font-label-md text-label-md text-primary mb-xs text-center leading-tight">
        {augment.name}
      </span>
      <TierBadge tier={augment.tier} dotClassName={styles.dot} />
    </button>
  )
}
