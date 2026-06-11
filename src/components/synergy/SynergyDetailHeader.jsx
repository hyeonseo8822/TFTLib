import { Icon } from '../common/Icon'

export function SynergyDetailHeader({ synergy }) {
  return (
    <section>
      <div className="flex items-center gap-sm mb-sm">
        <Icon name={synergy.icon} className="text-primary text-4xl" filled={synergy.iconFilled} />
        <h2 className="font-headline-lg text-headline-lg text-primary">{synergy.name}</h2>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant">
        {synergy.detailDescription}
      </p>
    </section>
  )
}
