import { FOOTER_LINKS } from '../../data/navigation'
import { FooterBrand } from '../footer/FooterBrand'
import { FooterNav } from '../footer/FooterNav'

export function Footer({ dark = false, compact = false, className = '' }) {
  const borderClass = dark
    ? 'border-outline-variant dark:border-outline bg-surface-container dark:bg-surface-dim'
    : 'border-outline-variant bg-surface-container'

  return (
    <footer
      className={`w-full py-lg px-margin flex flex-col md:flex-row justify-between items-center gap-md border-t ${borderClass} ${className}`.trim()}
    >
      <div className="w-full max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-md">
        <FooterBrand dark={dark} compact={compact} />
        <FooterNav links={FOOTER_LINKS} />
      </div>
    </footer>
  )
}
