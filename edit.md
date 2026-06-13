# 증강체(Augments) 섹션 전면 개편 작업 기록

이전 커밋(`5300811 feat: expand champion roster and revamp synergy section with emblem assets`) 이후 작업한 내용을 정리합니다.

## 1. 데이터 소스 전환 — 파일/폴더 기반으로 단순화

### Before
- `Augments_and_Synergies.md` (영문)와 `augmentation.md` (한글)를 모두 파싱
- 한글→영문 슬러그 매핑(`KR_TO_SLUG`)을 약 180줄 수작업으로 관리
- 한글→이미지 키 직접 매핑(`KR_TO_IMAGE_KEY`)도 별도 관리
- 이미지 파일은 `src/assets/augmentation/` 한 폴더에 영문 슬러그 파일명으로 존재
- 이미지 매칭은 영문 슬러그 + `TFT_Augment_<X>` 패턴 + 5가지 fallback 룰로 처리

### After
- `augmentation.md` (한글) **단일 소스**만 파싱
- 이미지는 티어별 하위 폴더로 정리: `src/assets/augmentation/{silver,gold,prism}/`
- 파일명을 **한글 증강 이름과 동일**하게 저장 (예: `gold/U.R.F.jpg`, `silver/가지 뻗기.png`)
- 한글 이름으로 곧장 이미지/티어 매칭 → 매핑 테이블 전부 제거

```js
// src/data/augments.js — 폴더 기반 이미지/티어 룩업
const TIER_BY_FOLDER = [
  { tier: 1, index: buildImageIndex(silverGlob) },
  { tier: 2, index: buildImageIndex(goldGlob) },
  { tier: 3, index: buildImageIndex(prismGlob) },
]

function lookupByName(name) {
  for (const key of nameKeys(name)) {
    for (const { tier, index } of TIER_BY_FOLDER) {
      if (index[key]) return { image: index[key], tier }
    }
  }
  return null
}
```

## 2. `augmentation.md` 정비

- 헤딩이 깨져서 설명 줄이 `##`로 promote 되던 케이스 정리 (한글 어미·종결 부호 휴리스틱으로 fallback도 유지)
- 사용자가 직접 **티어별 섹션 순서로 재정렬**:
  - 실버: `가지 뻗기` ~ `골드 획득`
  - 골드: `U.R.F` ~ `휴대용 대장간`
  - 프리즘: `간이 대장간` ~ `힘을 실은 제련`
- 폴더 매칭 실패 시 fallback 으로 사용할 수 있도록 `TIER_SECTION_MARKERS` 도입

```js
const TIER_SECTION_MARKERS = {
  'U.R.F': 2,          // 골드 섹션 시작
  '간이 대장간': 3,    // 프리즘 섹션 시작
}
```

## 3. 티어 결정 우선순위

1. 이미지 폴더 위치 (`silver/`/`gold/`/`prism/`)
2. `augmentation.md` 섹션 위치 (`TIER_SECTION_MARKERS` 기반)
3. 영웅 증강 휴리스틱 (이름이 `...의 은총` 으로 끝나면 프리즘)
4. 기본값 실버

## 4. ID 충돌 버그 수정 (`신병`/`신병+`/`신병++`)

기존 `buildId` 는 `[^a-z0-9가-힣]+` 를 모두 `-` 로 치환 후 trailing `-` 를 제거해서, `신병+` → `신병-` → `신병` 으로 `+` 정보가 사라졌습니다. 같은 ID 가 여러 augment 에 부여돼 React key 충돌 + 카드 선택 오작동.

```js
function buildId(name, idx) {
  const safe = name
    .toLowerCase()
    .replace(/\+\+/g, '-plusplus')
    .replace(/\+/g, '-plus')
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return safe || `aug-${idx}`
}
```

| 이름 | Before | After |
| --- | --- | --- |
| `신병` | `신병` | `신병` |
| `신병+` | `신병` ⚠ | `신병-plus` |
| `신병++` | `신병` ⚠ | `신병-plusplus` |
| `부스터 팩++` | `부스터-팩` ⚠ | `부스터-팩-plusplus` |

## 5. 티어/가나다 정렬

폴더 위치와 MD 섹션이 어긋난 항목(예: 실버 섹션에 있지만 `gold/` 폴더에 있는 `골드 획득`)으로 인해 목록 정렬이 깨졌습니다. 최종 티어 기준으로 묶고 한글 가나다순 정렬을 적용:

```js
const TIER_ORDER = { 실버: 0, 골드: 1, 프리즘: 2 }
const koCollator = new Intl.Collator('ko', { numeric: true, sensitivity: 'base' })

export const AUGMENTS = koreanAugments
  .map((ko, idx) => buildAugment(ko, idx))
  .filter((a) => a.name && a.name.length > 0)
  .sort((a, b) => {
    const tierDiff = (TIER_ORDER[a.tier] ?? 99) - (TIER_ORDER[b.tier] ?? 99)
    if (tierDiff !== 0) return tierDiff
    return koCollator.compare(a.name, b.name)
  })
```

- `numeric: true` → `삼인방 I`, `삼인방 II` 자연 정렬
- `sensitivity: 'base'` → 대소문자/악센트 무시 (`U.R.F` 등 영문 항목도 자연스럽게 포함)

## 6. UI 정리

- `AugmentDetailPanel.jsx` 에서 **상세 통계 데이터 보기** 버튼 제거
  - `ViewStatsButton.jsx` 파일 자체 삭제 (다른 곳에서 사용 안 함)
- **영웅 증강** 카테고리 필터 버튼 제거 (`CATEGORY_FILTERS = []`)
  - `TierFilterGroup.jsx` 에서 `categoryFilters.length > 0` 조건부 렌더로 구분선(`FilterDivider`)까지 함께 숨김
- `AugmentDetailCard.jsx` 에서 영문 이름 서브타이틀 제거 (영문 데이터 의존성 제거에 맞춤)
- `EffectDescription.jsx` 에서 멀티라인 설명을 `\n` 기준으로 분리 렌더링
- `OperationTips.jsx` 에서 `tips` 가 없을 때 컴포넌트 자체 미렌더링

## 7. 기타

- `vite.config.js` 에 `server.fs.allow: ['.']` 추가 — 프로젝트 루트의 `.md` 파일을 `?raw` import 할 수 있도록 허용

## 8. 영향 받은 파일

```
augmentation.md                                         (신규, 1419 줄)
vite.config.js                                          (+7)
src/data/augments.js                                    (대폭 단순화)
src/hooks/useAugmentFilters.js                          (영웅 카테고리 로직 정리)
src/components/augments/AugmentDetailPanel.jsx          (-2)
src/components/augments/AugmentDetailCard.jsx           (영문 서브타이틀 제거)
src/components/augments/EffectDescription.jsx           (멀티라인 지원)
src/components/augments/OperationTips.jsx               (빈 props 가드)
src/components/augments/TierFilterGroup.jsx             (조건부 구분선)
src/components/augments/ViewStatsButton.jsx             (삭제)
src/assets/augmentation/{silver,gold,prism}/*           (신규 ~256개 이미지)
```
