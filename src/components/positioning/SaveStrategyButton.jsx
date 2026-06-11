import { Icon } from '../common/Icon'

export function SaveStrategyButton({ onClick }) {
  return (
    <button
      type="button"
      className="w-full bg-primary text-on-primary py-md rounded-xl font-label-md text-label-md flex items-center justify-center gap-sm active:scale-95 transition-transform"
      onClick={onClick}
    >
      <Icon name="edit_note" />
      전략 노트 저장
    </button>
  )
}
