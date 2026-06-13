// ============================================================
// 0. 원본 데이터
//    - augmentation.md       : 한글 증강 이름/설명 (사용자 직접 정리)
//    - src/assets/augmentation/{silver|gold|prism}/<한글이름>.{png|jpg}
//      → 폴더 위치가 곧 티어, 파일명이 곧 한글 이름
// ============================================================
import augmentationMd from '../../augmentation.md?raw'
import { TIER_TYPES } from '../constants/tierStyles'

const silverGlob = import.meta.glob(
  '../assets/augmentation/silver/*.{png,jpg,jpeg}',
  { eager: true, query: '?url', import: 'default' },
)
const goldGlob = import.meta.glob(
  '../assets/augmentation/gold/*.{png,jpg,jpeg}',
  { eager: true, query: '?url', import: 'default' },
)
const prismGlob = import.meta.glob(
  '../assets/augmentation/prism/*.{png,jpg,jpeg}',
  { eager: true, query: '?url', import: 'default' },
)

// ============================================================
// 1. 폴더별 한글 파일명 → URL 인덱스
//    이름 매칭이 어긋나지 않도록 공백 제거/소문자 변형도 함께 등록합니다.
// ============================================================
function nameKeys(name) {
  const trimmed = name.trim()
  const noSpace = trimmed.replace(/\s+/g, '')
  const set = new Set([trimmed, noSpace, trimmed.toLowerCase(), noSpace.toLowerCase()])
  return [...set]
}

function buildImageIndex(glob) {
  /** @type {Record<string, string>} */
  const idx = {}
  for (const [path, url] of Object.entries(glob)) {
    const file = path.split('/').pop().replace(/\.(png|jpe?g)$/i, '')
    for (const key of nameKeys(file)) {
      if (key && !idx[key]) idx[key] = url
    }
  }
  return idx
}

const TIER_BY_FOLDER = [
  { tier: 1, index: buildImageIndex(silverGlob) },
  { tier: 2, index: buildImageIndex(goldGlob) },
  { tier: 3, index: buildImageIndex(prismGlob) },
]

const PLACEHOLDER_IMAGE = null

/** 한글 이름으로 이미지와 티어를 동시에 조회 (폴더 위치 기준) */
function lookupByName(name) {
  for (const key of nameKeys(name)) {
    for (const { tier, index } of TIER_BY_FOLDER) {
      if (index[key]) return { image: index[key], tier }
    }
  }
  return null
}

// ============================================================
// 2. augmentation.md 파싱 — 한글 이름 + 설명 + 섹션 기반 티어
//    파일 구조 (사용자 수동 정렬):
//      - 실버: "가지 뻗기" ~ "골드 획득"
//      - 골드: "U.R.F" ~ "휴대용 대장간"
//      - 프리즘: "간이 대장간" ~ 끝
//    이미지 폴더 매칭이 실패할 때 폴백으로 사용합니다.
// ============================================================
const TIER_SECTION_MARKERS = {
  'U.R.F': 2, // 골드 섹션 시작
  '간이 대장간': 3, // 프리즘 섹션 시작
}

function isDescriptionHeading(text) {
  if (!text) return false
  if (/[.!?]$/.test(text)) return true
  if (/(다|요|까)\.?$/.test(text)) return true
  return false
}

function parseAugmentation(md) {
  const lines = md.split('\n')
  const result = []
  let current = null
  let currentTier = 1

  const finalize = () => {
    if (!current) return
    const desc = current.descLines
      .map((l) => l.trim())
      .filter(Boolean)
      .join('\n')
    result.push({ name: current.name, description: desc, tier: current.tier })
    current = null
  }

  for (const raw of lines) {
    const line = raw.trimEnd()

    if (line.startsWith('# ') && !line.startsWith('## ')) continue

    if (line.startsWith('## ')) {
      const heading = line.slice(3).trim()
      if (!heading) continue

      if (isDescriptionHeading(heading)) {
        if (current) current.descLines.push(heading)
      } else {
        finalize()
        if (TIER_SECTION_MARKERS[heading]) {
          currentTier = TIER_SECTION_MARKERS[heading]
        }
        current = { name: heading, descLines: [], tier: currentTier }
      }
      continue
    }

    if (line.startsWith('>') || line.startsWith('---')) continue

    if (line.trim() && current) {
      current.descLines.push(line.trim())
    }
  }
  finalize()
  return result
}

const koreanAugments = parseAugmentation(augmentationMd)

// ============================================================
// 3. 최종 AUGMENTS 빌드
//    티어 우선순위: 폴더(이미지) > md 섹션 > 기본 실버
// ============================================================
function tierToType(tier) {
  return tier === 3 ? TIER_TYPES.PRISM : tier === 2 ? TIER_TYPES.GOLD : TIER_TYPES.SILVER
}
function tierToLabel(tier) {
  return tier === 3 ? '프리즘' : tier === 2 ? '골드' : '실버'
}

function buildId(name, idx) {
  // "신병+" / "신병++" 처럼 + 접미사는 의미를 가지므로 토큰으로 보존
  // (그냥 [^a-z0-9가-힣] 으로 제거하면 "신병", "신병+", "신병++" 가 같은 ID 가 되어 충돌)
  const safe = name
    .toLowerCase()
    .replace(/\+\+/g, '-plusplus')
    .replace(/\+/g, '-plus')
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return safe || `aug-${idx}`
}

function buildAugment(ko, idx) {
  const isHero = /의 은총$/.test(ko.name)
  const matched = lookupByName(ko.name)
  const tier = matched?.tier ?? ko.tier ?? (isHero ? 3 : 1)
  const image = matched?.image ?? PLACEHOLDER_IMAGE

  const id = buildId(ko.name, idx)
  return {
    id,
    slug: id,
    name: ko.name,
    tier: tierToLabel(tier),
    tierType: tierToType(tier),
    image,
    description: ko.description || '(설명 없음)',
    isHero,
  }
}

// ============================================================
// 4. Exports
// ============================================================
export const TIER_FILTERS = [
  { id: 'all', label: '전체', tierType: null },
  { id: 'silver', label: '실버', tierType: TIER_TYPES.SILVER },
  { id: 'gold', label: '골드', tierType: TIER_TYPES.GOLD },
  { id: 'prism', label: '프리즘', tierType: TIER_TYPES.PRISM },
]

export const CATEGORY_FILTERS = []

// 티어 → 그룹 내 한글 이름 가나다순으로 정렬
// (MD 섹션과 이미지 폴더 위치가 어긋난 항목이 있어도 최종 티어 기준으로 깔끔하게 묶임)
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

export const DEFAULT_SELECTED_AUGMENT_ID = AUGMENTS[0]?.id ?? null
