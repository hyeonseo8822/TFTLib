import { useMemo, useState } from 'react'
import { SYNERGY_FILTERS } from '../data/synergies'

export function useSynergyFilters(synergies) {
  const [activeFilterId, setActiveFilterId] = useState('all')

  const filteredSynergies = useMemo(() => {
    const activeFilter = SYNERGY_FILTERS.find((filter) => filter.id === activeFilterId)

    if (!activeFilter?.category) {
      return synergies
    }

    return synergies.filter((synergy) => synergy.category === activeFilter.category)
  }, [synergies, activeFilterId])

  return {
    activeFilterId,
    filteredSynergies,
    setActiveFilterId,
  }
}
