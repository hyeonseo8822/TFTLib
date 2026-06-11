export function TierFilterButton({ label, isActive = false, onClick }) {
  const activeClasses = 'bg-primary text-on-primary'
  const inactiveClasses =
    'text-on-surface-variant hover:bg-surface-container-highest'

  return (
    <button
      type="button"
      className={`px-md py-xs font-label-md text-label-md rounded-lg transition-all ${isActive ? activeClasses : inactiveClasses}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      {label}
    </button>
  )
}
