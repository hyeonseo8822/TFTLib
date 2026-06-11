export function StrategyTextarea({ id, label, placeholder, value, onChange }) {
  return (
    <div className="flex flex-col gap-xs">
      <label htmlFor={id} className="font-label-md text-label-md text-on-surface-variant">
        {label}
      </label>
      <textarea
        id={id}
        className="w-full bg-white border border-outline-variant rounded-lg p-sm font-body-md text-body-md h-32 resize-none focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
