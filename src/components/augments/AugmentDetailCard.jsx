import { getTierStyles } from '../../constants/tierStyles'

export function AugmentDetailCard({ augment }) {
  const styles = getTierStyles(augment.tierType)

  return (
    <div
      className={`flex flex-col items-center gap-sm p-md border-2 rounded-lg bg-surface-container-low transition-all ${styles.detailCard}`}
    >
      <div
        className={`w-24 h-24 flex items-center justify-center rounded-xl overflow-hidden ${styles.detailIconBox}`}
      >
        <img
          src={augment.image}
          alt={augment.name}
          className="w-20 h-20 object-contain"
        />
      </div>
      <div className="text-center">
        <h4 className="font-headline-lg text-headline-lg text-primary">{augment.name}</h4>
        <span
          className={`px-md py-xs rounded-full font-label-md text-label-md inline-block mt-xs ${styles.detailTierBadge}`}
        >
          {augment.tier} 증강
        </span>
      </div>
    </div>
  )
}
