export function TierBadge({ tier, dotClassName }) {
  return (
    <div className="flex items-center gap-xs">
      <span className={`w-2 h-2 rounded-full ${dotClassName}`} aria-hidden="true" />
      <span className="font-caption text-caption text-on-surface-variant">{tier}</span>
    </div>
  )
}
