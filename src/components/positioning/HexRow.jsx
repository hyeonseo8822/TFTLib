import { HexCell } from './HexCell'

export function HexRow({ row, rowIndex, offset = false, onCellSelect }) {
  return (
    <div className={`hex-row ${offset ? 'hex-row-offset' : ''}`}>
      {row.cells.map((cell, cellIndex) => (
        <HexCell
          key={`${rowIndex}-${cellIndex}`}
          cell={cell}
          rowIndex={rowIndex}
          cellIndex={cellIndex}
          onSelect={onCellSelect}
        />
      ))}
    </div>
  )
}
