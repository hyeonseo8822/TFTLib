import { useState } from 'react'
import { AugmentDetailPanel } from '../components/augments/AugmentDetailPanel'
import { AugmentSection } from '../components/augments/AugmentSection'
import { Footer } from '../components/layout/Footer'
import { PageLayout } from '../components/layout/PageLayout'
import { TopAppBar } from '../components/layout/TopAppBar'
import {
  AUGMENTS,
  CATEGORY_FILTERS,
  DEFAULT_SELECTED_AUGMENT_ID,
  TIER_FILTERS,
} from '../data/augments'
import { useAugmentFilters } from '../hooks/useAugmentFilters'

export default function Augments() {
  const [selectedAugmentId, setSelectedAugmentId] = useState(DEFAULT_SELECTED_AUGMENT_ID)

  const {
    activeTierFilterId,
    activeCategoryFilterId,
    filteredAugments,
    setActiveTierFilterId,
    handleCategoryFilterChange,
  } = useAugmentFilters(AUGMENTS)

  const selectedAugment =
    AUGMENTS.find((augment) => augment.id === selectedAugmentId) ?? AUGMENTS[0]

  return (
    <PageLayout>
      <TopAppBar activeNavId="augments" />

      <main className="pt-20 min-h-screen max-w-[1440px] mx-auto flex flex-col md:flex-row gap-gutter px-margin mb-xl">
        <AugmentSection
          title="학술적 증강 데이터베이스"
          augments={filteredAugments}
          selectedId={selectedAugmentId}
          tierFilters={TIER_FILTERS}
          categoryFilters={CATEGORY_FILTERS}
          activeTierFilterId={activeTierFilterId}
          activeCategoryFilterId={activeCategoryFilterId}
          onTierFilterChange={setActiveTierFilterId}
          onCategoryFilterChange={handleCategoryFilterChange}
          onAugmentSelect={(augment) => setSelectedAugmentId(augment.id)}
        />
        <AugmentDetailPanel augment={selectedAugment} />
      </main>

      <Footer />
    </PageLayout>
  )
}
