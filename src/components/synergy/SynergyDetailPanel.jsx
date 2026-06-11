import { SynergyChampionGrid } from './SynergyChampionGrid'
import { SynergyDetailHeader } from './SynergyDetailHeader'
import { SynergyTacticalNote } from './SynergyTacticalNote'
import { SynergyTierEffects } from './SynergyTierEffects'

export function SynergyDetailPanel({ synergy }) {
  return (
    <aside className="w-full md:w-96 p-margin bg-surface-container-low flex flex-col gap-lg overflow-y-auto max-h-screen custom-scrollbar sticky top-20">
      <SynergyDetailHeader synergy={synergy} />
      <SynergyTierEffects effects={synergy.tierEffects} />
      <SynergyChampionGrid champions={synergy.champions} />
      <SynergyTacticalNote note={synergy.tacticalNote} />
    </aside>
  )
}
