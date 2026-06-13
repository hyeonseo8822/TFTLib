import { FilterDivider } from './FilterDivider'
import { TierFilterButton } from './TierFilterButton'

export function TierFilterGroup({
  tierFilters,
  categoryFilters,
  activeTierFilterId,
  activeCategoryFilterId,
  onTierFilterChange,
  onCategoryFilterChange,
}) {
  return (
    <div className="flex items-center gap-xs bg-surface-container-low p-xs rounded-lg border border-outline-variant">
      {tierFilters.map((filter) => (
        <TierFilterButton
          key={filter.id}
          label={filter.label}
          isActive={activeTierFilterId === filter.id}
          onClick={() => onTierFilterChange(filter.id)}
        />
      ))}
      {categoryFilters.length > 0 && (
        <>
          <FilterDivider />
          {categoryFilters.map((filter) => (
            <TierFilterButton
              key={filter.id}
              label={filter.label}
              isActive={activeCategoryFilterId === filter.id}
              onClick={() => onCategoryFilterChange(filter.id)}
            />
          ))}
        </>
      )}
    </div>
  )
}
