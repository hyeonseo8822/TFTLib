import { SynergyTabButton } from './SynergyTabButton'

export function SynergyTabGroup({ filters, activeFilterId, onFilterChange }) {
  return (
    <div className="flex gap-md border-b border-outline-variant">
      {filters.map((filter) => (
        <SynergyTabButton
          key={filter.id}
          label={filter.label}
          isActive={activeFilterId === filter.id}
          onClick={() => onFilterChange(filter.id)}
        />
      ))}
    </div>
  )
}
