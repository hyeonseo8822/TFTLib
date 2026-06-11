import { NavLink } from './NavLink'

export function Nav({ items, activeId, className = 'hidden md:flex items-center gap-md ml-lg' }) {
  return (
    <nav className={className} aria-label="주요 메뉴">
      {items.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          label={item.label}
          isActive={item.id === activeId}
        />
      ))}
    </nav>
  )
}
