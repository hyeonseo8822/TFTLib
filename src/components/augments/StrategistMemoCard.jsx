import { Icon } from '../common/Icon'

const MEMO_TEXT =
  '증강체는 현재 덱의 시너지만큼이나 중요합니다. 경제 증강을 선택했다면 초반 연패를 통해 골드를 수급하고, 전투 증강을 선택했다면 연승을 유지하며 압박하는 것이 정석입니다.'

export function StrategistMemoCard() {
  return (
    <div className="bg-primary-container text-on-primary-container p-lg rounded-xl border border-primary/20">
      <div className="flex items-center gap-sm mb-sm">
        <Icon name="menu_book" />
        <h4 className="font-label-md text-label-md">전략가의 메모</h4>
      </div>
      <p className="font-body-md text-body-md text-on-primary-container/80">{MEMO_TEXT}</p>
    </div>
  )
}
