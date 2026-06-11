import { Link } from 'react-router-dom'

export function NavLink({ to, label, isActive = false }) {
  return (
    <Link
      to={to}
      className={[
        'font-label-md text-label-md transition-colors',
        isActive
          ? 'text-primary border-b-2 border-primary pb-1 font-bold'
          : 'text-on-surface-variant hover:text-primary',
      ].join(' ')}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </Link>
  )
}
