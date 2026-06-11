import { useState } from 'react'
import { NAV_ITEMS } from '../../data/navigation'
import { Logo } from '../top-app-bar/Logo'
import { NavLink } from '../top-app-bar/NavLink'

export function TopAppBar({ activeNavId = 'items' }) {
  const [mobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface border-b border-outline-variant">
      {/* Desktop bar */}
      <div className="max-w-[1440px] mx-auto flex justify-between items-center px-margin h-20">
        <div className="flex items-center gap-md">
          <Logo as="h1" />
          <nav className="hidden md:flex items-center gap-md ml-lg" aria-label="주요 메뉴">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                label={item.label}
                isActive={item.id === activeNavId}
              />
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <nav
          className="md:hidden bg-surface border-t border-outline-variant px-margin py-sm flex flex-col gap-xs"
          aria-label="모바일 메뉴"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              label={item.label}
              isActive={item.id === activeNavId}
            />
          ))}
        </nav>
      )}
    </header>
  )
}
