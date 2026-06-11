export const TIER_TYPES = {
  SILVER: 'silver',
  GOLD: 'gold',
  PRISM: 'prism',
}

export const TIER_STYLES = {
  [TIER_TYPES.SILVER]: {
    cardIconBox: 'bg-surface-container border-slate-300',
    cardIcon: 'text-on-surface-variant',
    dot: 'bg-slate-300',
    detailCard: 'border-slate-300',
    detailIconBox: 'bg-surface-container',
    detailIcon: 'text-[64px] text-on-surface-variant',
    detailTierBadge: 'bg-slate-400 text-white',
  },
  [TIER_TYPES.GOLD]: {
    cardIconBox: 'bg-secondary-container/30 border-secondary-fixed-dim',
    cardIcon: 'text-secondary',
    dot: 'bg-secondary-fixed-dim',
    detailCard: 'border-secondary-fixed-dim',
    detailIconBox: 'bg-secondary-container/30',
    detailIcon: 'text-[64px] text-secondary',
    detailTierBadge: 'bg-secondary-fixed-dim text-on-secondary-fixed',
  },
  [TIER_TYPES.PRISM]: {
    cardIconBox: 'bg-secondary-container border-secondary',
    cardIcon: 'text-secondary',
    dot: 'bg-secondary',
    detailCard: 'border-secondary',
    detailIconBox: 'bg-secondary-container',
    detailIcon: 'text-[64px] text-secondary',
    detailTierBadge: 'bg-secondary text-on-secondary',
  },
}

export function getTierStyles(tierType) {
  return TIER_STYLES[tierType] ?? TIER_STYLES[TIER_TYPES.SILVER]
}
