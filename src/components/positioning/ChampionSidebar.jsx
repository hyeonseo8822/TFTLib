import { ChampionGrid } from './ChampionGrid'
import { ChampionSidebarHeader } from './ChampionSidebarHeader'

const COST_LABELS = {
  1: { label: '1코스트', color: 'text-[#808080]' },
  2: { label: '2코스트', color: 'text-[#11b288]' },
  3: { label: '3코스트', color: 'text-[#207ac7]' },
  4: { label: '4코스트', color: 'text-[#c440da]' },
  5: { label: '5코스트', color: 'text-[#ffb93b]' },
}

export function ChampionSidebar({ champions, onChampionSelect }) {
  // 코스트별 그룹화 (1~5)
  const costs = [1, 2, 3, 4, 5]
  const groupedChampions = costs.map((cost) => ({
    cost,
    list: champions
      .filter((c) => c.cost === cost)
      .sort((a, b) => a.name.localeCompare(b.name, 'ko')),
  }))

  return (
    <aside className="w-full md:w-[320px] border-r border-outline-variant bg-surface-container-low p-md flex flex-col gap-md sticky top-20 h-[calc(100vh-80px)]">
      <ChampionSidebarHeader />
      <div className="flex-grow overflow-y-auto custom-scrollbar pr-xs flex flex-col gap-lg">
        {groupedChampions.map(({ cost, list }) => (
          list.length > 0 && (
            <section key={cost} className="flex flex-col gap-sm">
              <div className="flex items-center gap-2 border-b border-outline-variant pb-1">
                <span className={`text-label-md font-bold ${COST_LABELS[cost].color}`}>
                  {COST_LABELS[cost].label}
                </span>
                <span className="text-[10px] text-on-surface-variant opacity-60">
                  ({list.length})
                </span>
              </div>
              <ChampionGrid champions={list} onChampionSelect={onChampionSelect} />
            </section>
          )
        ))}
      </div>
    </aside>
  )
}
