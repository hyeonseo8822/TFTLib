import { Icon } from '../common/Icon'

export function SearchInput({
  placeholder = '검색...',
  value,
  onChange,
  variant = 'default',
  showIcon = true,
}) {
  const inputClasses =
    variant === 'rounded'
      ? 'bg-surface-container-high border-none rounded-full px-md py-xs text-body-md w-64 focus:ring-1 focus:ring-primary'
      : 'bg-surface-container border-none rounded-lg px-md py-xs text-body-md focus:ring-2 focus:ring-primary w-64'

  return (
    <div className="relative hidden sm:block">
      <input
        type="search"
        className={inputClasses}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label={placeholder}
      />
      {showIcon && variant === 'default' && (
        <Icon
          name="search"
          className="absolute right-2 top-1.5 text-on-surface-variant pointer-events-none"
        />
      )}
    </div>
  )
}
