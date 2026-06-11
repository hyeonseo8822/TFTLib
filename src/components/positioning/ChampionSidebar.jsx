import { ChampionGrid } from './ChampionGrid'
import { ChampionSidebarHeader } from './ChampionSidebarHeader'

export function ChampionSidebar({ champions, onChampionSelect }) {
  return (
    <aside className="w-full md:w-64 border-r border-outline-variant bg-surface-container-low p-md flex flex-col gap-md sticky top-20 h-[calc(100vh-80px)]">
      <ChampionSidebarHeader />
      <div className="flex-grow overflow-y-auto custom-scrollbar pr-xs">
        <ChampionGrid champions={champions} onChampionSelect={onChampionSelect} />
      </div>
    </aside>
  )
}
