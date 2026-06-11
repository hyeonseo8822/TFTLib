import { useMemo, useState } from 'react'
import { TIER_FILTERS } from '../data/augments'

export function useAugmentFilters(augments) {
  const [activeTierFilterId, setActiveTierFilterId] = useState('all')
  const [activeCategoryFilterId, setActiveCategoryFilterId] = useState(null)

  const filteredAugments = useMemo(() => {
    const activeTierFilter = TIER_FILTERS.find((filter) => filter.id === activeTierFilterId)

    if (!activeTierFilter?.tierType) {
      return augments
    }

    return augments.filter((augment) => augment.tierType === activeTierFilter.tierType)
  }, [augments, activeTierFilterId])

  const handleCategoryFilterChange = (filterId) => {
    setActiveCategoryFilterId((current) => (current === filterId ? null : filterId))
  }

  return {
    activeTierFilterId,
    activeCategoryFilterId,
    filteredAugments,
    setActiveTierFilterId,
    handleCategoryFilterChange,
  }
}
