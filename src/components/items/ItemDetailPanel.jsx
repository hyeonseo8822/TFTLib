import { MATERIAL_ITEMS } from '../../data/items'
import { Icon } from '../common/Icon'

const CATEGORY_COLOR = {
  '공격형': 'bg-secondary-container text-on-secondary-container',
  '방어형': 'bg-surface-container-high text-primary',
  '마법형': 'bg-primary-container text-on-primary-container',
}

function RecipeIngredient({ matId }) {
  const mat = MATERIAL_ITEMS.find((m) => m.id === matId)
  if (!mat) return null
  return (
    <div className="flex flex-col items-center gap-1" title={mat.name}>
      <div className="w-10 h-10 rounded-lg border border-outline-variant bg-surface flex items-center justify-center overflow-hidden">
        <img src={mat.imgUrl} alt={mat.name} className="w-8 h-8 object-contain" />
      </div>
      <span className="text-[10px] text-on-surface-variant leading-tight text-center max-w-[48px] truncate">
        {mat.name}
      </span>
    </div>
  )
}

export function ItemDetailPanel({ item }) {
  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-center text-on-surface-variant gap-md">
        <Icon name="grid_view" className="text-[48px] opacity-30" />
        <p className="font-label-md">아이템을 선택하거나 조합해보세요</p>
      </div>
    )
  }

  const categoryClass = CATEGORY_COLOR[item.category] ?? 'bg-surface-container text-on-surface-variant'

  return (
    <div className="flex flex-col sm:flex-row gap-lg">
      {/* Left: icon + meta */}
      <div className="flex flex-col items-center sm:items-start gap-sm sm:w-40 flex-shrink-0">
        <div className="w-24 h-24 bg-surface-container rounded-xl border border-outline-variant flex items-center justify-center overflow-hidden shadow-sm">
          <img src={item.imgUrl} alt={item.name} className="w-20 h-20 object-contain" />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="font-headline-md text-headline-md text-primary leading-tight">{item.name}</h2>
          <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${categoryClass}`}>
            {item.category}
          </span>
        </div>
        {item.recipe?.length === 2 && (
          <div>
            <p className="text-label-md text-on-surface-variant mb-xs text-center sm:text-left">제조법</p>
            <div className="flex items-center gap-xs">
              <RecipeIngredient matId={item.recipe[0]} />
              <Icon name="add" className="text-on-surface-variant text-[16px] mb-4" />
              <RecipeIngredient matId={item.recipe[1]} />
            </div>
          </div>
        )}
      </div>

      {/* Right: details */}
      <div className="flex-1 flex flex-col gap-md min-w-0">
        {/* Stats */}
        {item.stats?.length > 0 && (
          <div>
            <h3 className="font-label-md text-label-md text-on-surface-variant border-b border-outline-variant pb-1 mb-sm">
              능력치
            </h3>
            <div className="flex flex-wrap gap-sm">
              {item.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-xs bg-surface-container-high px-sm py-xs rounded-lg"
                >
                  <Icon name="bolt" className="text-primary text-[14px]" />
                  <span className="text-body-md font-semibold text-primary">{stat.value}</span>
                  <span className="text-body-md text-on-surface-variant">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Effect */}
        {item.effect && (
          <div>
            <h3 className="font-label-md text-label-md text-on-surface-variant border-b border-outline-variant pb-1 mb-sm">
              고유 효과
            </h3>
            <p className="text-body-md leading-relaxed bg-surface p-sm rounded-lg border border-outline-variant text-on-surface">
              {item.effect}
            </p>
          </div>
        )}

        {/* Recommended units */}
        {item.recommendedUnits?.length > 0 && (
          <div>
            <h3 className="font-label-md text-label-md text-on-surface-variant border-b border-outline-variant pb-1 mb-sm">
              추천 유닛
            </h3>
            <div className="flex flex-wrap gap-sm">
              {item.recommendedUnits.map((unit) => (
                <div
                  key={unit}
                  className="flex flex-col items-center gap-xs"
                  title={unit}
                >
                  <div className="w-10 h-10 rounded-full border-2 border-primary bg-primary-container flex items-center justify-center overflow-hidden">
                    <span className="text-[10px] font-bold text-primary text-center leading-tight px-0.5">
                      {unit.slice(0, 2)}
                    </span>
                  </div>
                  <span className="text-[10px] text-on-surface-variant max-w-[44px] truncate text-center">
                    {unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {item.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-surface-container-high rounded-full text-caption text-primary font-bold"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
