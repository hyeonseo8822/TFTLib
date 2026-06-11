import { Icon } from '../common/Icon'
import { ItemCard } from './ItemCard'
import { ItemFilterGroup } from './ItemFilterGroup'

export function ItemsSection({
  completedItems,
  filters,
  activeCategoryId,
  selectedItemId,
  onFilterChange,
  onItemSelect,
}) {
  const filtered =
    activeCategoryId === 'all'
      ? completedItems
      : completedItems.filter((item) => item.category === activeCategoryId)

  return (
    <section className="bg-surface-container-lowest p-md border border-outline-variant rounded-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-sm mb-md">
        <h2 className="font-headline-md text-headline-md text-primary flex items-center gap-2">
          <Icon name="grid_view" />
          완성 아이템 도감
        </h2>
        <ItemFilterGroup
          filters={filters}
          activeId={activeCategoryId}
          onChange={onFilterChange}
        />
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-11 gap-sm">
        {filtered.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            isSelected={selectedItemId === item.id}
            onSelect={onItemSelect}
          />
        ))}
      </div>
    </section>
  )
}
