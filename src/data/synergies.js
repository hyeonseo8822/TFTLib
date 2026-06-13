import { CHAMPIONS } from './positioning'

// ============================================================
// 0. 엠블럼 이미지 자동 매핑 (src/assets/emblems/*.png)
// ============================================================
const emblemImages = import.meta.glob('../assets/emblems/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
})

function getEmblem(fileBaseName) {
  if (!fileBaseName) return null
  return emblemImages[`../assets/emblems/${fileBaseName}.png`] ?? null
}

// 시너지 slug → emblem 파일명(확장자 제외) 매핑.
// 35개 시너지를 35개 엠블럼 파일과 1:1로 연결합니다. (이름이 다른 경우 의미 기준 매칭)
const SLUG_TO_EMBLEM = {
  // ── 직업 (Class) ──
  bastion: 'bastion',
  brawler: 'brawler',
  challenger: 'challenger',
  channeler: 'magician', // 전송체(Conduit) = 마나를 다루는 마법사
  eradicator: 'judge', // 박멸자 = 처형/심판자
  fateweaver: 'weaver', // 운명을 짜는 자 = 직조공
  marauder: 'berserker', // 약탈자 = 광폭 전사
  replicator: 'star_destroyer', // 복제자
  rogue: 'phantom_squad', // 무법자 = 유령 부대
  shepherd: 'shepherd',
  sniper: 'sniper',
  vanguard: 'juggernaut', // 선봉대 = 거대 탱커
  voyager: 'traveler', // 항해자 = 여행자
  arbiter: 'fate_priest', // 중재자 = 운명 사제 (법을 새기는 자)
  psionic: 'psionic_agent',
  // ── 원천 (Origin) ──
  nova: 'nova_agent',
  anima: 'armed_valkyrie', // 영혼 사도(Anima Squad) = 무장 발키리
  'dark-star': 'dark_star',
  mecha: 'mecha_dragon',
  meeple: 'ranger', // 미플
  primordian: 'trenchfolk', // 원시 생물 = 원시 종족
  stargazer: 'stargazer',
  'space-groove': 'space_rhythm',
  timebreaker: 'futurist', // 시간 파괴자 = 미래주의자
  // ── 고유 (Unique) ──
  'divine-duelist': 'dryad', // 신성한 결투가 = 자연의 정령(피오라)
  bulwark: 'twilight_bulwark', // 방벽
  commander: 'supreme_commander', // 사령관
  'dark-lady': 'dark_enchantress', // 어둠의 여인 = 어둠의 마법사
  doomer: 'doom_herald', // 둠 = 둠 헤럴드
  'factory-new': 'military_one', // 공장 신품(그레이브즈)
  'galaxy-hunter': 'celestial_killer', // 은하 사냥꾼(제드)
  'gun-goddess': 'war_god', // 총의 여신(미스 포츈)
  oracle: 'oracle',
  'party-animal-blitzcrank': 'woof_bot', // 파티 블리츠
  redeemer: 'savior', // 구원자
}

// ============================================================
// 1. 시너지 한글명 → 챔피언 목록 자동 인덱싱
//    positioning.js의 CHAMPIONS는 synergies 배열에 한글 라벨을 담고 있습니다.
// ============================================================
const championsBySynergyKr = (() => {
  const map = new Map()
  for (const c of CHAMPIONS) {
    for (const synKr of c.synergies) {
      if (!map.has(synKr)) map.set(synKr, [])
      map.get(synKr).push({
        id: c.id,
        name: c.name,
        image: c.image,
        cost: c.cost,
      })
    }
  }
  // 각 시너지의 챔피언 목록을 코스트 내림차순으로 정렬, 최상위 1명을 highlighted 처리.
  for (const list of map.values()) {
    list.sort((a, b) => (b.cost ?? 0) - (a.cost ?? 0))
    if (list.length > 0) list[0].highlighted = true
  }
  return map
})()

// ============================================================
// 2. 시너지 카테고리 필터
// ============================================================
export const SYNERGY_FILTERS = [
  { id: 'all', label: '전체 보기', category: null },
  { id: 'origin', label: '원천', category: 'origin' },
  { id: 'class', label: '직업', category: 'class' },
  { id: 'unique', label: '고유', category: 'unique' },
]

// ============================================================
// 3. 빌더 헬퍼
// ============================================================
function buildSynergy({
  slug,
  name,
  englishName,
  category,
  icon = 'auto_awesome',
  iconFilled = false,
  tierLabel = '',
  description,
  detailDescription,
  tierEffects = [],
  tacticalNote = '',
}) {
  return {
    id: slug,
    slug,
    name,
    englishName,
    category,
    emblem: getEmblem(SLUG_TO_EMBLEM[slug]),
    icon,
    iconFilled,
    iconBg: 'bg-surface-container-highest',
    iconColor: 'text-primary',
    tierLabel,
    tierLabelHighlight: false,
    description,
    detailDescription: detailDescription || description,
    tierEffects,
    champions: championsBySynergyKr.get(name) ?? [],
    tacticalNote,
  }
}

// ============================================================
// 4. 시너지 목록 (Augments_and_Synergies.md 295~329행)
//    한글 명칭은 positioning.js의 SYNERGY_KR과 동일해야 챔피언이 자동 매칭됩니다.
// ============================================================
export const SYNERGIES = [
  // ───── 직업 (Class) ─────
  buildSynergy({
    slug: 'bastion',
    name: '보루',
    englishName: 'Bastion',
    category: 'class',
    icon: 'shield',
    tierLabel: 'Tier 2 / 4 / 6',
    description:
      '아군 전체가 12 방어력과 마법 저항력을 얻습니다. 보루는 더 많이 얻으며, 전투 시작 후 첫 10초간 수치가 두 배가 됩니다.',
    detailDescription:
      '초반 교전에서 2배 보너스가 적용되어 안정적인 라인전을 만들어 주는 대표 탱킹 시너지입니다. 2/4/6 단계로 활성화하기 쉬워 거의 모든 조합에 무리 없이 섞을 수 있습니다.',
    tierEffects: [
      { tier: 2, title: '벽 구축', description: '아군 +16 방어력 & 마법 저항력.', active: true },
      { tier: 4, title: '견고한 진형', description: '아군 +35 방어력 & 마법 저항력.', active: false },
      {
        tier: 6,
        title: '난공불락',
        description: '아군 +55 방어력 & 마법 저항력. 보루가 아닌 아군은 추가로 +20 방어/마저를 얻습니다.',
        active: false,
      },
    ],
    tacticalNote: '초반 흔들리지 않게 받쳐 주는 만능 받침. 2단계만 켜둬도 라운드 안정성이 크게 올라갑니다.',
  }),
  buildSynergy({
    slug: 'brawler',
    name: '격투가',
    englishName: 'Brawler',
    category: 'class',
    icon: 'fitness_center',
    tierLabel: 'Tier 2 / 4 / 6',
    description: '아군 전체가 7% 체력을 얻습니다. 격투가는 더 많이 얻습니다.',
    detailDescription:
      '단순하지만 효율 높은 체력 버프 시너지. 전방 탱커뿐 아니라 후방 캐리에게도 추가 체력을 제공하여 종합 생존력을 끌어올립니다.',
    tierEffects: [
      { tier: 2, title: '단단한 몸', description: '격투가 +25% 최대 체력.', active: true },
      { tier: 4, title: '근육의 벽', description: '격투가 +45% 최대 체력.', active: false },
      { tier: 6, title: '불가사의한 맷집', description: '격투가 +65% 최대 체력.', active: false },
    ],
    tacticalNote: '체력 기반 아이템(워모그/거인의 결의)과 궁합 최상. 탱커 라인의 기본 베이스로 추천합니다.',
  }),
  buildSynergy({
    slug: 'challenger',
    name: '도전자',
    englishName: 'Challenger',
    category: 'class',
    icon: 'bolt',
    tierLabel: 'Tier 2 / 3 / 4 / 5',
    description:
      '아군 전체가 10% 공격 속도를 얻습니다. 도전자는 추가 공격 속도를 얻으며 처치 관여 시 새 표적으로 돌진하고 2.5초간 공격 속도가 50% 더 증가합니다.',
    detailDescription:
      '도전자는 적을 처치하면 즉시 다른 적에게 돌진하기 때문에 후방 캐리 위협이 강력합니다. 핵심 도전자를 빠르게 키워 적 진형을 무너뜨리는 진형 파괴형 시너지입니다.',
    tierEffects: [
      { tier: 2, title: '추격 본능', description: '도전자 +15% 공격 속도.', active: true },
      { tier: 3, title: '맹공', description: '도전자 +22% 공격 속도.', active: false },
      { tier: 4, title: '광폭', description: '도전자 +30% 공격 속도.', active: false },
      { tier: 5, title: '챔피언 본색', description: '도전자 +40% 공격 속도.', active: false },
    ],
    tacticalNote: '쇼진의 창과 구인수의 격노검을 두른 도전자가 후방 라인을 휩쓰는 그림이 이상적입니다.',
  }),
  buildSynergy({
    slug: 'channeler',
    name: '전송체',
    englishName: 'Conduit',
    category: 'class',
    icon: 'flash_on',
    tierLabel: 'Tier 2 / 3 / 4 / 5',
    description:
      '전송체는 모든 출처에서 얻는 마나가 20% 증가합니다. 아군은 마나 재생을 얻고, 전송체는 더 큰 마나 재생을 얻습니다.',
    detailDescription:
      '마나가 마른 캐스터에게 생명을 불어넣는 서포트 시너지. 마나 의존도가 큰 메인 딜러 곁에 전송체를 두면 스킬 사이클이 눈에 띄게 빨라집니다.',
    tierEffects: [
      { tier: 2, title: '연결', description: '아군 +1, 전송체 +3 마나 재생.', active: true },
      { tier: 3, title: '공명', description: '아군 +1, 전송체 +4 마나 재생.', active: false },
      { tier: 4, title: '증폭', description: '아군 +2, 전송체 +6 마나 재생.', active: false },
      { tier: 5, title: '초전도', description: '아군 +2, 전송체 +7 마나 재생.', active: false },
    ],
    tacticalNote: '캐스터 캐리에 푸른 파수꾼/쇼진의 창을 둘렀다면 전송체 한 명 추가만으로도 DPS가 크게 뜁니다.',
  }),
  buildSynergy({
    slug: 'eradicator',
    name: '박멸자',
    englishName: 'Eradicator',
    category: 'class',
    icon: 'remove_moderator',
    tierLabel: '',
    description: '적의 방어력과 마법 저항력이 14% 감소합니다.',
    detailDescription:
      '단일 챔피언으로 발현되는 패시브형 시너지. 아군 전반의 종합 딜을 끌어올리는 윤활제 역할을 합니다.',
    tierEffects: [],
    tacticalNote: '메인 캐리의 관통 아이템(최후의 속삭임/공허의 지팡이)과 곱해져 큰 효율을 냅니다.',
  }),
  buildSynergy({
    slug: 'fateweaver',
    name: '운명을 짜는 자',
    englishName: 'Fateweaver',
    category: 'class',
    icon: 'casino',
    tierLabel: 'Tier 2 / 4',
    description: '운명을 짜는 자는 정밀 효과를 얻습니다.',
    detailDescription:
      '치명타와 확률 효과의 안정성을 끌어올리는 운빨 보정 시너지. 치명타 빌드와 결합 시 폭발적인 후반 캐리가 가능합니다.',
    tierEffects: [
      {
        tier: 2,
        title: '정밀',
        description: '스킬의 확률 효과가 행운(연속 발동 시 확률 증가)으로 작동합니다.',
        active: true,
      },
      {
        tier: 4,
        title: '운명 조작',
        description: '치명타 확률 +20%, 치명타 피해 +10%. 치명타 또한 행운으로 처리됩니다.',
        active: false,
      },
    ],
    tacticalNote: '무한의 대검 + 보석 장갑 빌드를 노리는 캐리 시너지로 매우 강력합니다.',
  }),
  buildSynergy({
    slug: 'marauder',
    name: '약탈자',
    englishName: 'Marauder',
    category: 'class',
    icon: 'water_drop',
    tierLabel: 'Tier 2 / 4 / 6',
    description:
      '아군 전체가 5% 모든 피해 흡혈을 얻습니다. 약탈자는 더 큰 흡혈과 공격력을 얻으며, 초과 회복량은 최대 체력 25%까지 보호막으로 전환됩니다.',
    detailDescription:
      '맞으면서 회복하고 남는 회복은 보호막으로 적립하는 브루저 라인. 후반 장기전에서 무한히 버티며 약탈하는 직업군입니다.',
    tierEffects: [
      { tier: 2, title: '약탈의 흔적', description: '+5% 흡혈, +20% 공격력.', active: true },
      { tier: 4, title: '피의 약탈자', description: '+7% 흡혈, +30% 공격력.', active: false },
      { tier: 6, title: '무자비한 도살', description: '+10% 흡혈, +40% 공격력.', active: false },
    ],
    tacticalNote: '피바라기 + 거인의 결의 + 스테락의 도전 정석 빌드와 환상적인 시너지.',
  }),
  buildSynergy({
    slug: 'replicator',
    name: '복제자',
    englishName: 'Replicator',
    category: 'class',
    icon: 'content_copy',
    tierLabel: 'Tier 2 / 4',
    description: '복제자의 스킬 효과가 감소된 위력으로 한 번 더 발동합니다.',
    detailDescription:
      '스킬 캐리가 한 번 더 일하게 만드는 강력한 더블 캐스트 시너지. 마나 회복과 결합하면 사실상 스킬 폭격이 가능합니다.',
    tierEffects: [
      { tier: 2, title: '잔향', description: '복제 발동 위력 25%.', active: true },
      { tier: 4, title: '복제 폭풍', description: '복제 발동 위력 50%.', active: false },
    ],
    tacticalNote: '쇼진의 창 + 푸른 파수꾼 빌드와 함께 메인 캐스터의 DPS를 약 1.5배로 끌어올립니다.',
  }),
  buildSynergy({
    slug: 'rogue',
    name: '무법자',
    englishName: 'Rogue',
    category: 'class',
    icon: 'visibility_off',
    tierLabel: 'Tier 2 / 3 / 4 / 5',
    description:
      '무법자는 공격력과 주문력을 얻습니다. 체력이 50% 미만으로 떨어지면 처음 한 번 그림자에 숨어 어그로가 다른 아군(주로 탱커)에게 옮겨갑니다.',
    detailDescription:
      '죽기 직전에 어그로를 빼면서 다시 일어나는 끈질긴 후방 침투 시너지. 보호막 + 피해 흡혈과 잘 어울립니다.',
    tierEffects: [
      { tier: 2, title: '그림자 매복', description: '+15% 공격력 & 주문력.', active: true },
      { tier: 3, title: '암살', description: '+30% 공격력 & 주문력.', active: false },
      { tier: 4, title: '독무대', description: '+45% 공격력 & 주문력.', active: false },
      { tier: 5, title: '어둠의 군주', description: '+60% 공격력 & 주문력.', active: false },
    ],
    tacticalNote: '제드/탈론처럼 후방으로 침투하는 캐리에게 보호막 인생을 한 번 더 부여합니다.',
  }),
  buildSynergy({
    slug: 'shepherd',
    name: '양치기',
    englishName: 'Shepherd',
    category: 'class',
    icon: 'flutter_dash',
    tierLabel: 'Tier 3 / 5 / 7',
    description: '비아와 바인의 힘이 양치기들의 별 단계 합만큼 강해집니다.',
    detailDescription:
      '소환수 비아/바인의 힘을 키우는 소환사 시너지. 양치기 챔피언을 3성으로 올릴수록 강해집니다.',
    tierEffects: [
      { tier: 3, title: '비아 소환', description: '비아를 소환합니다.', active: true },
      { tier: 5, title: '바인 소환', description: '바인을 소환합니다.', active: false },
      { tier: 7, title: '결속', description: '비아와 바인의 결속이 더 깊어집니다.', active: false },
    ],
    tacticalNote: '양치기 챔피언을 3성으로 만들수록 소환수 한 마리가 챔피언 한 명 몫을 합니다.',
  }),
  buildSynergy({
    slug: 'sniper',
    name: '저격수',
    englishName: 'Sniper',
    category: 'class',
    icon: 'gps_fixed',
    tierLabel: 'Tier 2 / 3 / 4 / 5',
    description: '저격수는 표적과의 거리가 멀수록 피해 증폭치가 커집니다.',
    detailDescription:
      '거리 1칸당 피해량이 추가로 증폭되는 원거리 캐리 시너지. 자리만 잘 잡으면 한방 한방이 무겁습니다.',
    tierEffects: [
      { tier: 2, title: '거리 확보', description: '+18% 피해 증폭, 거리 1칸당 +2%.', active: true },
      { tier: 3, title: '정밀 조준', description: '+24% 피해 증폭, 거리 1칸당 +3%.', active: false },
      { tier: 4, title: '저격', description: '+28% 피해 증폭, 거리 1칸당 +4%.', active: false },
      { tier: 5, title: '신의 한 발', description: '+32% 피해 증폭, 거리 1칸당 +5%.', active: false },
    ],
    tacticalNote: '구석 끝자리에 배치하고 무한의 대검/거인 학살자 빌드를 둘러 주는 정석 캐리.',
  }),
  buildSynergy({
    slug: 'vanguard',
    name: '선봉대',
    englishName: 'Vanguard',
    category: 'class',
    icon: 'security',
    tierLabel: 'Tier 2 / 4 / 6',
    description:
      '선봉대는 보호막이 있는 동안 5% 추가 피해 감소를 얻습니다. 전투 시작 시와 체력 50%에서 최대 체력 비례 보호막을 10초간 두릅니다.',
    detailDescription:
      '두 번 발동되는 자체 보호막으로 받는 피해를 흘리는 탱커 시너지. 보호막 동안 추가 감쇄가 붙어 단단함이 배가됩니다.',
    tierEffects: [
      { tier: 2, title: '방어선 구축', description: '최대 체력의 16% 보호막.', active: true },
      { tier: 4, title: '견고한 성벽', description: '최대 체력의 28% 보호막.', active: false },
      {
        tier: 6,
        title: '난공불락',
        description: '최대 체력의 40% 보호막, 보호막 동안 추가 10% 피해 감소.',
        active: false,
      },
    ],
    tacticalNote: '보호막을 더 늘려주는 워모그 + 구원 빌드와 곱연산을 일으킵니다.',
  }),
  buildSynergy({
    slug: 'voyager',
    name: '항해자',
    englishName: 'Voyager',
    category: 'class',
    icon: 'travel_explore',
    tierLabel: 'Tier 2 / 3 / 4 / 5 / 6',
    description:
      '전투 시작 시: 탱커/전사 아군에게 15초간 보호막을 부여하고, 나머지 아군에게는 피해 증폭을 부여합니다. 항해자는 두 배 적용됩니다.',
    detailDescription:
      '전 라인을 골고루 보강하는 만능 서포트 시너지. 탱커는 보호막, 딜러는 피해 증폭으로 받는 이중 버프가 핵심입니다.',
    tierEffects: [
      { tier: 2, title: '출항', description: '175 보호막 / 9% 피해 증폭.', active: true },
      { tier: 3, title: '순항', description: '250 보호막 / 15% 피해 증폭.', active: false },
      { tier: 4, title: '원정', description: '350 보호막 / 18% 피해 증폭.', active: false },
      { tier: 5, title: '대항해', description: '500 보호막 / 22% 피해 증폭.', active: false },
      { tier: 6, title: '전설의 항해', description: '700 보호막 / 27% 피해 증폭.', active: false },
    ],
    tacticalNote: '거의 모든 조합에 무리 없이 섞일 수 있는 보편 서포트 시너지입니다.',
  }),
  buildSynergy({
    slug: 'arbiter',
    name: '중재자',
    englishName: 'Arbiter',
    category: 'class',
    icon: 'gavel',
    tierLabel: 'Tier 2 / 3',
    description:
      '고유 신성한 법을 새겨 특정 원인이 발생할 때 중재자에게 효과를 부여할 수 있습니다.',
    detailDescription:
      '게임 내내 직접 효과를 디자인할 수 있는 자유도가 높은 시너지. 원인-결과 조합에 따라 게임을 풀어 가는 묘미가 있습니다.',
    tierEffects: [
      { tier: 2, title: '법 제정', description: '원인과 결과를 한 가지 선택할 수 있습니다.', active: true },
      { tier: 3, title: '강화된 법', description: '선택한 효과가 강화됩니다.', active: false },
    ],
    tacticalNote: '메인 캐리에게 유리한 효과(처치 시 흡혈 등)를 골라 시너지를 극대화하세요.',
  }),
  buildSynergy({
    slug: 'psionic',
    name: '사이오닉',
    englishName: 'Psionic',
    category: 'class',
    icon: 'psychology',
    tierLabel: 'Tier 2 / 4',
    description: '아군 누구에게나 장착할 수 있는 사이오닉 아이템을 획득합니다.',
    detailDescription:
      '추가 아이템을 부여하는 자원형 시너지. 메인 캐리에게 잘 어울리는 효과를 가진 사이오닉 아이템을 골라 빌드를 완성합니다.',
    tierEffects: [
      { tier: 2, title: '사이오닉 1', description: '사이오닉 아이템 1을 획득합니다.', active: true },
      {
        tier: 4,
        title: '사이오닉 2',
        description: '사이오닉 아이템 2 추가 획득. 사이오닉 유닛이 장착 시 추가 효과 발동.',
        active: false,
      },
    ],
    tacticalNote: '챔피언 슬롯을 추가로 차지하지 않고도 아이템 풀이 커지는 강력한 자원 시너지.',
  }),

  // ───── 원천 (Origin) ─────
  buildSynergy({
    slug: 'nova',
    name: 'N.O.V.A.',
    englishName: 'N.O.V.A.',
    category: 'origin',
    icon: 'flare',
    iconFilled: true,
    tierLabel: 'Tier 2 / 5',
    description:
      '전투 시작 6초 후 N.O.V.A. 유닛들이 챔피언에 따라 다양한 고조 효과를 아군에게 부여합니다.',
    detailDescription:
      '아트록스(피해 약화/방관), 케이틀린(공속), 아칼리(정밀), 마오카이(체력 회복), 킨드레드(보호막)이 각자 다른 고조 효과를 부여합니다. 5단계에서는 위성 타격 선택기로 강력한 광역 피해를 입힙니다.',
    tierEffects: [
      {
        tier: 2,
        title: '힘의 고조',
        description: '6초 후 챔피언별 고유 버프가 아군에게 부여됩니다.',
        active: true,
      },
      {
        tier: 5,
        title: '위성 타격',
        description: '타격 선택기 획득. 선택된 N.O.V.A.가 고조 시점에 위성 타격을 발동합니다.',
        active: false,
      },
    ],
    tacticalNote: '6초 전까지 버티는 것이 핵심. 보루/선봉대 같은 탱킹 시너지와 조합하면 강력합니다.',
  }),
  buildSynergy({
    slug: 'anima',
    name: '영혼 사도',
    englishName: 'Anima Squad',
    category: 'origin',
    icon: 'pets',
    tierLabel: 'Tier 3 / 6',
    description:
      '플레이어 전투 패배 시 15 테크 + 연패 길이 × 5 테크를 얻고, 처치 관여 시 2 테크씩 추가 적립. 100 테크마다 영혼 사도 무기를 시제 제작합니다.',
    detailDescription:
      '연패할수록 보상이 누적되는 자원형 원천 시너지. 라운드를 거듭할수록 강력한 시제 무기를 챔피언에게 무료로 장착시킬 수 있습니다.',
    tierEffects: [
      { tier: 3, title: '연구 개시', description: '테크 시스템을 가동합니다.', active: true },
      { tier: 6, title: '추가 보상', description: '승리 시 추가 전리품 구를 획득.', active: false },
    ],
    tacticalNote: '연패 빌드와 자연스럽게 결합되는 시너지. 테크를 모아 한 번에 강한 무기를 노려보세요.',
  }),
  buildSynergy({
    slug: 'dark-star',
    name: '다크 스타',
    englishName: 'Dark Star',
    category: 'origin',
    icon: 'dark_mode',
    iconFilled: true,
    tierLabel: 'Tier 2 / 4 / 6 / 9',
    description:
      '다크 스타는 체력 10% 이하 적을 삼키는 블랙홀을 생성합니다. 단계가 오를수록 더욱 강력해집니다.',
    detailDescription:
      '낮은 체력의 적을 즉시 처형하는 광폭한 우주적 처형형 시너지. 9단계에서는 모든 다크 스타가 초질량화되어 전장을 잠식합니다.',
    tierEffects: [
      { tier: 2, title: '블랙홀', description: '체력 10% 이하 적을 삼킵니다.', active: true },
      { tier: 4, title: '암흑 가속', description: '+30% 공격력 & 주문력.', active: false },
      {
        tier: 6,
        title: '초질량',
        description: '최강 다크 스타가 초질량화되어 다크 스타 효과 100% 강화, 미니 블랙홀 2개 생성.',
        active: false,
      },
      { tier: 9, title: '모든 것을 삼키다', description: '모든 다크 스타가 초질량화. 10레벨에서는 전체 소거.', active: false },
    ],
    tacticalNote: '체력 깎기 + 처형 효과가 곱연산. 박멸자/저격수와 함께 채용하면 최후반 폭발력이 극대화됩니다.',
  }),
  buildSynergy({
    slug: 'mecha',
    name: '메카',
    englishName: 'Mecha',
    category: 'origin',
    icon: 'smart_toy',
    tierLabel: 'Tier 3 / 4 / 6',
    description:
      '메카 유닛은 궁극의 형태로 변신해 스킬이 강화되고 체력 60%를 얻습니다. 변신한 메카는 슬롯 2칸을 차지하고 메카 트레이트 카운트가 2회 적용됩니다.',
    detailDescription:
      '메카 챔피언이 합체해 거대한 메카로 변신하는 박력 만점 시너지. 한 명의 메인 메카에게 모든 자원을 집중하는 원맨 캐리형 빌드에 어울립니다.',
    tierEffects: [
      { tier: 3, title: '에너지 셀', description: '메카 +20% 공격력 & 주문력.', active: true },
      { tier: 4, title: '과부하 셀', description: '메카 +35% 공격력 & 주문력.', active: false },
      { tier: 6, title: '정밀 공학', description: '팀 슬롯 최대치 +1.', active: false },
    ],
    tacticalNote: '메인 메카 한 명에게 모든 탱킹/딜링 아이템을 몰아주는 빌드가 정석입니다.',
  }),
  buildSynergy({
    slug: 'meeple',
    name: '미플',
    englishName: 'Meeple',
    category: 'origin',
    icon: 'extension',
    tierLabel: 'Tier 3 / 5 / 7 / 10',
    description:
      '우주인은 미플들을 끌어들여 스킬을 미플답게 강화하고 추가 체력을 얻습니다. 복제 시간은 챔피언 코스트와 같습니다.',
    detailDescription:
      '미플 클론을 생성해 추가 챔피언을 얻는 독특한 시너지. 후반에는 1성 복제본으로도 강력한 라인업을 구축할 수 있습니다.',
    tierEffects: [
      { tier: 3, title: '소소한 도움', description: '+2% 위력, +125 체력.', active: true },
      { tier: 5, title: '미플 동맹', description: '+3% 위력, +250 체력.', active: false },
      {
        tier: 7,
        title: '복제 슬롯',
        description: '+4% 위력, +400 체력. 벤치에 복제 슬롯 추가, 복제 완료 시 골드 + 1성 복제 획득.',
        active: false,
      },
      { tier: 10, title: '네 명의 미플 군주', description: '+6% 위력, +1000 체력. 네 미플 군주 강림!', active: false },
    ],
    tacticalNote: '7단계 복제 슬롯이 본격 가동되면 매 라운드 자원이 끊임없이 들어옵니다.',
  }),
  buildSynergy({
    slug: 'primordian',
    name: '원시 생물',
    englishName: 'Primordian',
    category: 'origin',
    icon: 'bug_report',
    tierLabel: 'Tier 2 / 3',
    description: '받은 피해의 8%가 가하는 피해에 추가됩니다.',
    detailDescription:
      '맞은 만큼 돌려주는 보복형 시너지. 단단한 챔피언에게 사이오닉 아이템을 둘러 보복 피해를 극대화합니다.',
    tierEffects: [
      {
        tier: 2,
        title: '스왐링 소환',
        description: '피해를 가할 때 원시 생물의 별 단계에 비례한 스왐링을 소환합니다.',
        active: true,
      },
      {
        tier: 3,
        title: '대군 강림',
        description: '더 많은 스왐링 + 매 라운드 무작위 1~2코스트 챔피언 획득.',
        active: false,
      },
    ],
    tacticalNote: '체력 + 방어력 빌드가 핵심. 워모그/거인의 결의 + 가고일 빌드와 잘 어울립니다.',
  }),
  buildSynergy({
    slug: 'stargazer',
    name: '별보기',
    englishName: 'Stargazer',
    category: 'origin',
    icon: 'auto_awesome',
    tierLabel: '',
    description:
      '별보기들은 게임마다 다른 별자리를 새깁니다(뱀/사냥꾼/산/제단/메달/샘/멧돼지 등). 각 별자리에 따라 강화 핵스 위 아군에게 고유 효과가 부여됩니다.',
    detailDescription:
      '게임마다 등장하는 별자리에 따라 효과가 완전히 달라지는 가변형 원천 시너지. 매 게임 새로운 빌드를 시도하는 재미가 있습니다.',
    tierEffects: [],
    tacticalNote: '강화 핵스 위치를 기억하고 별자리에 맞춰 배치를 매번 갱신해야 합니다.',
  }),
  buildSynergy({
    slug: 'space-groove',
    name: '우주 그루브',
    englishName: 'Space Groove',
    category: 'origin',
    icon: 'queue_music',
    tierLabel: 'Tier 1 / 3 / 5 / 7 / 10',
    description:
      '그루비안은 그루브 상태에 진입할 수 있습니다. 그루브 상태일 때 공격 속도와 체력 재생이 증가하며, 팀 내 그루비안 수에 비례해 효과가 강해집니다.',
    detailDescription:
      '시간이 지날수록 강해지는 점진형 시너지. 충분한 그루비안을 확보하면 후반 캐리력이 폭발적으로 증가합니다.',
    tierEffects: [
      { tier: 1, title: '리듬 타기', description: '그루브 상태 진입 가능.', active: true },
      { tier: 3, title: '시작부터 그루브', description: '전투 시작 3초간 모든 그루비안이 그루브.', active: false },
      {
        tier: 5,
        title: '쌓이는 그루브',
        description: '그루브 1초당 +3% 누적 공격력 & 주문력.',
        active: false,
      },
      { tier: 7, title: '폭발적 리듬', description: '효과 +20%.', active: false },
      { tier: 10, title: '더 그루브', description: '궁극의 그루브 상태 진입.', active: false },
    ],
    tacticalNote: '5단계부터 시간 경과에 비례한 스택이 본격적으로 쌓이므로 전투를 길게 끌수록 유리합니다.',
  }),
  buildSynergy({
    slug: 'timebreaker',
    name: '시간 파괴자',
    englishName: 'Timebreaker',
    category: 'origin',
    icon: 'schedule',
    tierLabel: 'Tier 2 / 3 / 4',
    description:
      '패배 시 무료 리롤을 얻고, 승리 시 시간 코어에 경험치를 적립합니다(스테이지에 비례).',
    detailDescription:
      '경제와 전투력을 동시에 잡는 하이브리드 원천. 시간이 흐를수록 자원이 누적되어 강력한 후반 빌드를 완성합니다.',
    tierEffects: [
      {
        tier: 2,
        title: '시간 적립',
        description: '패배 시 무료 리롤, 승리 시 시간 코어에 경험치 적립.',
        active: true,
      },
      { tier: 3, title: '시간 가속', description: '아군 +15% 공격 속도.', active: false },
      { tier: 4, title: '시간 왜곡', description: '시간 파괴자 +50% 추가 공격 속도.', active: false },
    ],
    tacticalNote: '리롤 빌드와 패치 적립 빌드 모두에 어울리는 만능 경제 시너지.',
  }),

  // ───── 고유 (Unique) ─────
  buildSynergy({
    slug: 'divine-duelist',
    name: '신성한 결투가',
    englishName: 'Divine Duelist',
    category: 'unique',
    icon: 'self_improvement',
    tierLabel: '',
    description: '플레이어에게 가한 피해의 15%만큼 체력을 회복합니다. 피오라는 1:1 대결에서 항상 승리합니다.',
    detailDescription: '피오라 단독 시너지. 1:1 상황으로 끌고 가면 극단적으로 강력해집니다.',
    tierEffects: [],
    tacticalNote: '피오라를 전방으로 빼서 단독 교전 상황을 자주 만들면 효과가 극대화됩니다.',
  }),
  buildSynergy({
    slug: 'bulwark',
    name: '방벽',
    englishName: 'Bulwark',
    category: 'unique',
    icon: 'fort',
    tierLabel: '',
    description:
      '배치 가능한 유물을 소환합니다. 전투 시작 시 인접 아군에게 18% 최대 체력 보호막과 20% 공격 속도를 부여합니다.',
    detailDescription: '단일 챔피언 고유 유물 시너지. 메인 캐리 주변에 유물을 배치해 시너지를 극대화합니다.',
    tierEffects: [],
    tacticalNote: '메인 캐리 한 명을 정해서 그 주위에 유물을 두는 것이 정석입니다.',
  }),
  buildSynergy({
    slug: 'commander',
    name: '사령관',
    englishName: 'Commander',
    category: 'unique',
    icon: 'campaign',
    tierLabel: '',
    description:
      '소나가 2라운드마다 무작위 명령 모드를 부여해 아군의 전투 행동을 바꿀 수 있습니다. 명령 모드는 장착 해제 후에도 2 플레이어 전투 동안 유지됩니다.',
    detailDescription: '소나 고유 시너지. 매 라운드 명령 모드를 갱신해 캐리를 강화합니다.',
    tierEffects: [],
    tacticalNote: '딜링이 약한 라운드에서 캐리에게 가장 도움이 되는 명령을 골라 주세요.',
  }),
  buildSynergy({
    slug: 'dark-lady',
    name: '어둠의 여인',
    englishName: 'Dark Lady',
    category: 'unique',
    icon: 'nightlight',
    tierLabel: '',
    description:
      '아군은 스킬 피해를 5% 덜 받습니다. 모르가나가 어둠의 형상일 때는 10%로 증가합니다.',
    detailDescription: '모르가나 고유 시너지. 아군 전체에 스킬 피해 감소 효과를 부여합니다.',
    tierEffects: [],
    tacticalNote: '적의 핵심 캐스터를 카운터할 때 매우 효과적입니다.',
  }),
  buildSynergy({
    slug: 'doomer',
    name: '둠',
    englishName: 'Doomer',
    category: 'unique',
    icon: 'mood_bad',
    tierLabel: '',
    description:
      '전투 시작 시 모든 적을 둠으로 표시합니다. 처음 피해를 입을 때 둠이 소비되어 8% 공격력과 주문력을 빼앗고 가장 강한 벡스에게 부여합니다.',
    detailDescription: '벡스 단일 시너지. 적의 핵심 캐리를 약화시키고 벡스를 폭주시킵니다.',
    tierEffects: [],
    tacticalNote: '벡스가 늦지 않게 전투에 참가해야 효과를 누릴 수 있습니다.',
  }),
  buildSynergy({
    slug: 'factory-new',
    name: '공장 신품',
    englishName: 'Factory New',
    category: 'unique',
    icon: 'precision_manufacturing',
    tierLabel: '',
    description:
      '전투에 참가한 뒤 아머리에서 가장 강한 그레이브즈를 위한 영구 강화를 구매할 수 있습니다. 3회 강화마다 다음 강화에는 1라운드가 더 걸립니다.',
    detailDescription: '그레이브즈 고유 시너지. 단계적으로 강화해 후반 캐리 1인을 완성합니다.',
    tierEffects: [],
    tacticalNote: '그레이브즈에 모든 자원을 몰아주는 원맨 캐리 빌드의 핵심.',
  }),
  buildSynergy({
    slug: 'galaxy-hunter',
    name: '은하 사냥꾼',
    englishName: 'Galaxy Hunter',
    category: 'unique',
    icon: 'rocket_launch',
    tierLabel: '',
    description: '제드는 침공자 제드 증강체에서 등장합니다. 클론이 살아 있는 한 제드는 +40% 공격력을 얻습니다.',
    detailDescription: '제드 고유 시너지. 분신을 살려두면 본체가 매우 강해집니다.',
    tierEffects: [],
    tacticalNote: '분신을 보호하는 배치가 핵심. 분신을 탱커 뒤에 숨기세요.',
  }),
  buildSynergy({
    slug: 'gun-goddess',
    name: '총의 여신',
    englishName: 'Gun Goddess',
    category: 'unique',
    icon: 'auto_fix_high',
    tierLabel: '',
    description:
      '미스 포츈을 배치하면 전송체/도전자/복제자 모드 중 하나를 고를 수 있습니다. 각 모드에 따라 미스 포츈의 스킬과 트레이트가 달라집니다.',
    detailDescription: '미스 포츈 고유 시너지. 조합에 맞는 모드를 골라 추가 시너지 카운트를 확보할 수 있습니다.',
    tierEffects: [],
    tacticalNote: '메인 시너지에 맞는 모드를 선택해 트레이트 단계를 끌어올리세요.',
  }),
  buildSynergy({
    slug: 'oracle',
    name: '신탁자',
    englishName: 'Oracle',
    category: 'unique',
    icon: 'visibility',
    tierLabel: '',
    description: '3라운드마다 탐 켄치가 보상을 부여합니다.',
    detailDescription: '탐 켄치 고유 시너지. 일정 라운드마다 보상이 누적되어 경제 운영이 매우 안정됩니다.',
    tierEffects: [],
    tacticalNote: '경제형 빌드/리롤 빌드 중 어디에든 안정성을 더해 줍니다.',
  }),
  buildSynergy({
    slug: 'party-animal-blitzcrank',
    name: '파티 블리츠크랭크',
    englishName: 'Party Animal',
    category: 'unique',
    icon: 'celebration',
    tierLabel: '',
    description:
      '체력이 45% 이하로 떨어지면 한 번 무적이 되고 초당 최대 체력 15%를 회복합니다. 완전 회복 시 그루브 상태에 진입하며 패시브가 4배 속도로 발동됩니다.',
    detailDescription:
      '블리츠크랭크 고유 시너지. 위기 상황에서 완전히 살아 돌아오면 본격적인 캐리가 시작됩니다.',
    tierEffects: [],
    tacticalNote: '치유 효과를 막는 적(필멸)이 있는지 잘 살피세요.',
  }),
  buildSynergy({
    slug: 'redeemer',
    name: '구원자',
    englishName: 'Redeemer',
    category: 'unique',
    icon: 'volunteer_activism',
    tierLabel: '',
    description:
      '활성화된 트레이트(고유 제외) 1개당 아군 +2~4% 공격 속도, +2~4 방어력/마법 저항력을 얻습니다.',
    detailDescription: '다양한 트레이트를 켤수록 더 강해지는 보너스형 시너지. 다양성 빌드에 가장 잘 맞습니다.',
    tierEffects: [],
    tacticalNote: '한 시너지를 4단계로 올리기보다, 여러 시너지를 2단계로 켜는 빌드와 어울립니다.',
  }),
]

// ============================================================
// 5. 기본 선택 시너지 ID
// ============================================================
export const DEFAULT_SELECTED_SYNERGY_ID = SYNERGIES[0]?.id ?? 'bastion'
