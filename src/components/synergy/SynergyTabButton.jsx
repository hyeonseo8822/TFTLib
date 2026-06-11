export function SynergyTabButton({ label, isActive = false, onClick }) {
  const activeClasses = 'border-b-2 border-primary text-primary'
  const inactiveClasses = 'text-on-surface-variant hover:text-primary transition-colors'

  return (
    <button
      type="button"
      className={`font-label-md text-label-md py-sm ${isActive ? activeClasses : inactiveClasses}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      {label}
    </button>
  )
}
