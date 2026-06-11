import { useState } from 'react'
import { CombinationLab } from '../components/items/CombinationLab'
import { ItemDetailPanel } from '../components/items/ItemDetailPanel'
import { ItemsSection } from '../components/items/ItemsSection'
import { Footer } from '../components/layout/Footer'
import { PageLayout } from '../components/layout/PageLayout'
import { TopAppBar } from '../components/layout/TopAppBar'
import { CATEGORY_FILTERS, COMPLETED_ITEMS } from '../data/items'

export default function Items() {
  const [activeCategoryId, setActiveCategoryId] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <PageLayout>
      <TopAppBar activeNavId="items" />

      <main className="pt-20 pb-xl px-margin w-full flex flex-col gap-lg mt-md">
        {/* Top: item grid + combination lab side by side on large screens */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-lg">
          <ItemsSection
            completedItems={COMPLETED_ITEMS}
            filters={CATEGORY_FILTERS}
            activeCategoryId={activeCategoryId}
            selectedItemId={selectedItem?.id}
            onFilterChange={setActiveCategoryId}
            onItemSelect={setSelectedItem}
          />
          <CombinationLab onItemSelect={setSelectedItem} />
        </div>

        {/* Bottom: detail panel — full width, expands horizontally */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md sm:p-lg">
          <h2 className="font-headline-md text-headline-md text-primary flex items-center gap-2 mb-md border-b border-outline-variant pb-sm">
            <span className="material-symbols-outlined">info</span>
            아이템 상세 정보
          </h2>
          <ItemDetailPanel item={selectedItem} />
        </section>
      </main>

      <Footer />
    </PageLayout>
  )
}
