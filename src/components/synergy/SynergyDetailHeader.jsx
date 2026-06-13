import { Icon } from '../common/Icon'

export function SynergyDetailHeader({ synergy }) {
  return (
    <section>
      <div className="flex items-center gap-sm mb-sm">
        {synergy.emblem ? (
          <img
            src={synergy.emblem}
            alt={synergy.englishName ?? synergy.name}
            className="w-12 h-12 object-contain"
            loading="lazy"
          />
        ) : (
          <Icon
            name={synergy.icon}
            className="text-primary text-4xl"
            filled={synergy.iconFilled}
          />
        )}
        <div className="flex flex-col">
          <h2 className="font-headline-lg text-headline-lg text-primary leading-none">
            {synergy.name}
          </h2>
          {synergy.englishName && synergy.englishName !== synergy.name && (
            <span className="font-caption text-caption text-on-surface-variant mt-0.5">
              {synergy.englishName}
            </span>
          )}
        </div>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant">
        {synergy.detailDescription}
      </p>
    </section>
  )
}
