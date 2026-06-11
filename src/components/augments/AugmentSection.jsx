import { AugmentGrid } from './AugmentGrid'
import { FilterHeader } from './FilterHeader'

export function AugmentSection({
  title,
  augments,
  selectedId,
  tierFilters,
  categoryFilters,
  activeTierFilterId,
  activeCategoryFilterId,
  onTierFilterChange,
  onCategoryFilterChange,
  onAugmentSelect,
}) {
  return (
    <section className="flex-1 mt-lg">
      <FilterHeader
        title={title}
        tierFilters={tierFilters}
        categoryFilters={categoryFilters}
        activeTierFilterId={activeTierFilterId}
        activeCategoryFilterId={activeCategoryFilterId}
        onTierFilterChange={onTierFilterChange}
        onCategoryFilterChange={onCategoryFilterChange}
      />
      <AugmentGrid augments={augments} selectedId={selectedId} onSelect={onAugmentSelect} />
    </section>
  )
}
