import { Icon } from '../common/Icon'
import { DetailSectionTitle } from './DetailSectionTitle'

export function OperationTips({ tips }) {
  return (
    <div className="space-y-sm">
      <DetailSectionTitle>운영 팁</DetailSectionTitle>
      <div className="bg-surface-container rounded-lg p-md">
        <p className="font-body-md text-body-md text-on-surface leading-tight">
          <Icon name="lightbulb" className="text-label-md align-middle mr-xs" />
          {tips}
        </p>
      </div>
    </div>
  )
}
