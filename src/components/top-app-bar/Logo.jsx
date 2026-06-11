export function Logo({ as: Tag = 'h1', className = '' }) {
  return (
    <Tag className={`font-display-lg text-display-lg text-primary ${className}`.trim()}>
      TFTLib
    </Tag>
  )
}
