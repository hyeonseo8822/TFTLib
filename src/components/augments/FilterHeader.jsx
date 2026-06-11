import { TierFilterGroup } from './TierFilterGroup'

export function FilterHeader({
  title,
  tierFilters,
  categoryFilters,
  activeTierFilterId,
  activeCategoryFilterId,
  onTierFilterChange,
  onCategoryFilterChange,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-md mb-md">
      <h2 className="font-headline-md text-headline-md text-primary">{title}</h2>
      <TierFilterGroup
        tierFilters={tierFilters}
        categoryFilters={categoryFilters}
        activeTierFilterId={activeTierFilterId}
        activeCategoryFilterId={activeCategoryFilterId}
        onTierFilterChange={onTierFilterChange}
        onCategoryFilterChange={onCategoryFilterChange}
      />
    </div>
  )
}
