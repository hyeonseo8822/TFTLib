import { Icon } from '../common/Icon'

export function SaveStrategyButton({ onClick, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={disabled ? '전략 이름을 입력해주세요.' : undefined}
      className={[
        'w-full py-md rounded-xl font-label-md text-label-md flex items-center justify-center gap-sm transition-transform',
        disabled
          ? 'bg-surface-container-highest text-on-surface-variant cursor-not-allowed opacity-60'
          : 'bg-primary text-on-primary active:scale-95',
      ].join(' ')}
    >
      <Icon name="edit_note" />
      전략 노트 저장
    </button>
  )
}
