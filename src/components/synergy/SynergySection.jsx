import { SynergyGrid } from './SynergyGrid'
import { SynergyPageHeader } from './SynergyPageHeader'

export function SynergySection({
  title,
  filters,
  activeFilterId,
  onFilterChange,
  synergies,
  selectedId,
  onSelect,
}) {
  return (
    <div className="flex-grow p-margin md:border-r border-outline-variant bg-surface">
      <SynergyPageHeader
        title={title}
        filters={filters}
        activeFilterId={activeFilterId}
        onFilterChange={onFilterChange}
      />
      <SynergyGrid synergies={synergies} selectedId={selectedId} onSelect={onSelect} />
    </div>
  )
}
