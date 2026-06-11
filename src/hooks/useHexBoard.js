import { useCallback, useState } from 'react'

function cloneRows(rows) {
  return rows.map((row) => ({
    ...row,
    cells: row.cells.map((cell) => ({ ...cell })),
  }))
}

function findActiveCellCoords(rows) {
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
    const cellIndex = rows[rowIndex].cells.findIndex((cell) => cell?.active)
    if (cellIndex !== -1) {
      return { rowIndex, cellIndex }
    }
  }
  return null
}

export function useHexBoard(initialRows) {
  const [rows, setRows] = useState(() => cloneRows(initialRows))

  const selectCell = useCallback((rowIndex, cellIndex) => {
    setRows((currentRows) =>
      currentRows.map((row, rIdx) => ({
        ...row,
        cells: row.cells.map((cell, cIdx) => ({
          ...cell,
          active: rIdx === rowIndex && cIdx === cellIndex,
        })),
      })),
    )
  }, [])

  const placeChampion = useCallback((image) => {
    setRows((currentRows) => {
      const activeCoords = findActiveCellCoords(currentRows)
      if (!activeCoords) {
        return currentRows
      }

      const { rowIndex, cellIndex } = activeCoords

      return currentRows.map((row, rIdx) => ({
        ...row,
        cells: row.cells.map((cell, cIdx) => {
          if (rIdx === rowIndex && cIdx === cellIndex) {
            return { image, active: false }
          }
          return { ...cell, active: false }
        }),
      }))
    })
  }, [])

  return {
    rows,
    selectCell,
    placeChampion,
  }
}
