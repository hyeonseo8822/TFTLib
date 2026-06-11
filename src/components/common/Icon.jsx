export function Icon({ name, className = '', filled = false, ...props }) {
  return (
    <span
      className={`material-symbols-outlined ${filled ? 'material-symbols-outlined--filled' : ''} ${className}`.trim()}
      aria-hidden="true"
      {...props}
    >
      {name}
    </span>
  )
}
