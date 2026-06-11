import { HexRow } from './HexRow'

export function HexBoard({ rows, onCellSelect }) {
  return (
    <div className="hex-grid py-lg px-xl bg-white border border-primary-container/10 rounded-xl shadow-sm relative">
      {rows.map((row, rowIndex) => (
        <HexRow
          key={rowIndex}
          row={row}
          rowIndex={rowIndex}
          offset={row.offset}
          onCellSelect={onCellSelect}
        />
      ))}
    </div>
  )
}
