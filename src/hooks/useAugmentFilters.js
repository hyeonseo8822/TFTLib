import { useMemo, useState } from 'react'
import { TIER_FILTERS } from '../data/augments'

export function useAugmentFilters(augments) {
  const [activeTierFilterId, setActiveTierFilterId] = useState('all')
  const [activeCategoryFilterId, setActiveCategoryFilterId] = useState(null)

  const filteredAugments = useMemo(() => {
    const activeTierFilter = TIER_FILTERS.find((filter) => filter.id === activeTierFilterId)

    let list = augments
    if (activeTierFilter?.tierType) {
      list = list.filter((augment) => augment.tierType === activeTierFilter.tierType)
    }
    // 카테고리: 'hero' 토글 시 영웅 증강(X의 은총)만 표시
    if (activeCategoryFilterId === 'hero') {
      list = list.filter((augment) => augment.isHero)
    }
    return list
  }, [augments, activeTierFilterId, activeCategoryFilterId])

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
