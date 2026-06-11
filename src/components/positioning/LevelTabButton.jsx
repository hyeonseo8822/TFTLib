export function LevelTabButton({ level, isActive = false, onClick }) {
  const activeClasses = 'bg-primary text-on-primary'
  const inactiveClasses = 'hover:bg-surface-container-highest transition-colors'

  return (
    <button
      type="button"
      className={`px-md py-xs font-label-md text-label-md rounded-lg ${isActive ? activeClasses : inactiveClasses}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      {level}Level
    </button>
  )
}
