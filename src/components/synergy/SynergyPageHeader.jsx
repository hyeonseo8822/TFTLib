import { SynergyTabGroup } from './SynergyTabGroup'

export function SynergyPageHeader({ title, filters, activeFilterId, onFilterChange }) {
  return (
    <div className="mb-lg">
      <h1 className="font-headline-lg text-headline-lg mb-md text-primary">{title}</h1>
      <SynergyTabGroup
        filters={filters}
        activeFilterId={activeFilterId}
        onFilterChange={onFilterChange}
      />
    </div>
  )
}
