import { Icon } from '../common/Icon'

export function SynergyTacticalNote({ note }) {
  if (!note) return null

  return (
    <section className="bg-[#fdfbf7] p-md border border-secondary-fixed-dim/30 rounded-lg">
      <div className="flex items-center gap-xs mb-sm">
        <Icon name="edit_note" className="text-secondary text-sm" />
        <h5 className="font-label-md text-label-md text-secondary">전술 노트</h5>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant italic font-serif leading-relaxed">
        &ldquo;{note}&rdquo;
      </p>
    </section>
  )
}
