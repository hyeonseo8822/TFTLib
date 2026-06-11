export function ViewStatsButton({ onClick }) {
  return (
    <button
      type="button"
      className="w-full py-md bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:brightness-110 transition-all active:scale-95"
      onClick={onClick}
    >
      상세 통계 데이터 보기
    </button>
  )
}
