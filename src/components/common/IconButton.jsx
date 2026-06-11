export function IconButton({ icon, label, onClick, className = '' }) {
  return (
    <button
      type="button"
      className={`material-symbols-outlined p-xs text-primary hover:bg-surface-container-high rounded-full transition-all ${className}`.trim()}
      aria-label={label}
      onClick={onClick}
    >
      {icon}
    </button>
  )
}
