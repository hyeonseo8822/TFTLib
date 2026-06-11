import { LevelTabButton } from './LevelTabButton'

export function LevelTabGroup({ levels, activeLevel, onLevelChange }) {
  return (
    <div className="flex gap-sm bg-surface-container p-1 rounded-xl">
      {levels.map((level) => (
        <LevelTabButton
          key={level}
          level={level}
          isActive={activeLevel === level}
          onClick={() => onLevelChange(level)}
        />
      ))}
    </div>
  )
}
