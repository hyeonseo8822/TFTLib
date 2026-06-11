import { useState } from 'react'
import { Footer } from '../components/layout/Footer'
import { PageLayout } from '../components/layout/PageLayout'
import { TopAppBar } from '../components/layout/TopAppBar'
import { SynergyDetailPanel } from '../components/synergy/SynergyDetailPanel'
import { SynergySection } from '../components/synergy/SynergySection'
import {
  DEFAULT_SELECTED_SYNERGY_ID,
  SYNERGIES,
  SYNERGY_FILTERS,
} from '../data/synergies'
import { useSynergyFilters } from '../hooks/useSynergyFilters'

export default function Synergy() {
  const [selectedSynergyId, setSelectedSynergyId] = useState(DEFAULT_SELECTED_SYNERGY_ID)
  const { activeFilterId, filteredSynergies, setActiveFilterId } = useSynergyFilters(SYNERGIES)

  const selectedSynergy =
    SYNERGIES.find((synergy) => synergy.id === selectedSynergyId) ?? SYNERGIES[0]

  return (
    <PageLayout>
      <TopAppBar activeNavId="synergies" />

      <main className="pt-20 min-h-screen w-full flex flex-col md:flex-row">
        <SynergySection
          title="학술적 시너지 도서관"
          filters={SYNERGY_FILTERS}
          activeFilterId={activeFilterId}
          onFilterChange={setActiveFilterId}
          synergies={filteredSynergies}
          selectedId={selectedSynergyId}
          onSelect={(synergy) => setSelectedSynergyId(synergy.id)}
        />
        <SynergyDetailPanel synergy={selectedSynergy} />
      </main>

      <Footer compact className="mt-xl" />
    </PageLayout>
  )
}
