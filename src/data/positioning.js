// ==========================================
// 1. 레벨 설정 관련 데이터
// ==========================================
export const LEVEL_TABS = [5, 6, 7, 8, 9, 10];
export const DEFAULT_LEVEL = 8;

// ==========================================
// 2. 하단 선택 풀 챔피언 대규모 목록 (총 22명)
// ==========================================
export const CHAMPIONS = [
  // 1 코스트 (주로 초반 빌드업 및 고기방패)
  {
    id: 'maokai',
    name: '마오카이',
    cost: 1,
    synergies: ['N.O.V.A.', '선봉대'],
    image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Maokai.png',
  },
  {
    id: 'poppy',
    name: '뽀삐',
    cost: 1,
    synergies: ['선봉대'],
    image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Poppy.png',
  },
  {
    id: 'lux',
    name: '럭스',
    cost: 1,
    synergies: ['우주 그루브'],
    image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Lux.png',
  },
  {
    id: 'kassadin',
    name: '카사딘',
    cost: 1,
    synergies: ['공허 방랑자'],
    image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Kassadin.png',
  },

  // 2 코스트 (리롤 덱의 핵심 유닛들)
  {
    id: 'akali',
    name: '아칼리',
    cost: 2,
    synergies: ['N.O.V.A.', '불한당'],
    image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Akali.png',
  },
  {
    id: 'ashe',
    name: '애쉬',
    cost: 2,
    synergies: ['저격수'],
    image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Ashe.png',
  },
  {
    id: 'jax',
    name: '잭스',
    cost: 2,
    synergies: ['메카 파일럿'],
    image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Jax.png',
  },
  {
    id: 'lulu',
    name: '룰루',
    cost: 2,
    synergies: ['우주 그루브'],
    image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Lulu.png',
  },
  {
    id: 'talon',
    name: '탈론',
    cost: 2,
    synergies: ['불한당'],
    image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Talon.png',
  },

  // 3 코스트 (중반 타이밍 교전 강자)
  {
    id: 'nautilus',
    name: '노틸러스',
    cost: 3,
    synergies: ['선봉대'],
    image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Nautilus.png',
  },
  {
    id: 'aatrox',
    name: '아트록스',
    cost: 3,
    synergies: ['N.O.V.A.', '습격자'],
    image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Aatrox.png',
  },
  {
    id: 'neeko',
    name: '니코',
    cost: 3,
    synergies: ['별 수호자'],
    image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Neeko.png',
  },
  {
    id: 'katarina',
    name: '카타리나',
    cost: 3,
    synergies: ['불한당'],
    image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Katarina.png',
  },
  {
    id: 'nunu',
    name: '누누와 윌럼프',
    cost: 3,
    synergies: ['우주 그루브'],
    image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Nunu.png',
  },

  // 4 코스트 (후반 조합의 메인 뼈대/캐리 기물)
  {
    id: 'caitlyn',
    name: '케이틀린',
    cost: 4,
    synergies: ['N.O.V.A.', '저격수'],
    image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Caitlyn.png',
  },
  {
    id: 'thresh',
    name: '쓰레쉬',
    cost: 4,
    synergies: ['선봉대'],
    image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Thresh.png',
  },
  {
    id: 'garen',
    name: '가렌',
    cost: 4,
    synergies: ['메카 파일럿'],
    image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Garen.png',
  },
  {
    id: 'ahri',
    name: '아리',
    cost: 4,
    synergies: ['별 수호자'],
    image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Ahri.png',
  },
  {
    id: 'zed',
    name: '제드',
    cost: 4,
    synergies: ['불한당'],
    image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Zed.png',
  },

  // 5 코스트 (게임 승리를 확정 짓는 조커 카드)
  {
    id: 'jhin',
    name: '진',
    cost: 5,
    synergies: ['저격수'],
    image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Jhin.png',
  },
  {
    id: 'kayle',
    name: '케일',
    cost: 5,
    synergies: ['천상의 신'],
    image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Kayle.png',
  },
  {
    id: 'aurelionsol',
    name: '아우렐리온 솔',
    cost: 5,
    synergies: ['천상의 신'],
    image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/AurelionSol.png',
  }
];

// ==========================================
// 3. 4x7 배치 보드 초기 필드 챔피언 배치상태
// ==========================================
export const INITIAL_HEX_ROWS = [
  // 1열 (최전방 고기방패 라인)
  {
    offset: false,
    cells: [
      { id: 'maokai', name: '마오카이', cost: 1, image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Maokai.png' },
      { id: 'nautilus', name: '노틸러스', cost: 3, image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Nautilus.png' },
      {}, {}, {}, {}, {},
    ],
  },
  // 2열 (브루저 및 근접 암살 라인)
  {
    offset: true,
    cells: [
      {},
      { id: 'akali', name: '아칼리', cost: 2, image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Akali.png', active: true },
      { id: 'aatrox', name: '아트록스', cost: 3, image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Aatrox.png' },
      {}, {}, {}, {},
    ],
  },
  // 3열 (서브 딜러 및 버프 라인)
  {
    offset: false,
    cells: [
      {}, {},
      { id: 'ashe', name: '애쉬', cost: 2, image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Ashe.png' },
      {}, {}, {}, {},
    ],
  },
  // 4열 (최후방 메인 프리딜러 라인)
  {
    offset: true,
    cells: [
      {}, {}, {}, {}, {},
      { id: 'caitlyn', name: '케이틀린', cost: 4, image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Caitlyn.png' },
      { id: 'jhin', name: '진', cost: 5, image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Jhin.png' },
    ],
  },
];

// ==========================================
// 4. 증강체 슬롯 초기 상태 (비어 있음 3개)
// ==========================================
export const INITIAL_AUGMENT_SLOTS = [
  { id: 'slot-1', augment: null },
  { id: 'slot-2', augment: null },
  { id: 'slot-3', augment: null },
];

// ==========================================
// 5. 선택 가능한 증강체 목록
// ==========================================
export const AVAILABLE_AUGMENTS = [
  {
    id: 'bandage_toss',
    name: '붕대 감기',
    tier: 'silver',
    imgUrl: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3107.png',
    description: '전투 시작 시 아군 전체가 200의 보호막을 얻습니다.',
  },
  {
    id: 'nova_heart',
    name: 'N.O.V.A.의 심장',
    tier: 'gold',
    imgUrl: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3087.png',
    description: '조합에 N.O.V.A. 시너지 1이 추가로 활성화됩니다.',
  },
  {
    id: 'cybernetic_bulk',
    name: '사이버 강화',
    tier: 'silver',
    imgUrl: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3083.png',
    description: '아이템을 2개 이상 장착한 기물이 400 체력과 20 방어력을 추가로 얻습니다.',
  },
  {
    id: 'double_trouble',
    name: '더블 트러블',
    tier: 'gold',
    imgUrl: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3085.png',
    description: '같은 챔피언이 2명 배치되면 각각 공격력과 주문력이 15% 증가합니다.',
  },
  {
    id: 'blue_battery',
    name: '마나 충전기',
    tier: 'prismatic',
    imgUrl: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3040.png',
    description: '아군이 스킬 시전 시 5 마나를 추가로 회복합니다.',
  },
  {
    id: 'exiles',
    name: '추방자',
    tier: 'silver',
    imgUrl: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3157.png',
    description: '전투 시작 시 인접한 아군이 없는 기물이 최대 체력의 20% 보호막을 얻습니다.',
  },
  {
    id: 'final_grab_bag',
    name: '마지막 선물 보따리',
    tier: 'prismatic',
    imgUrl: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3031.png',
    description: '라운드 시작 시 무작위 완성 아이템 1개를 아군 중 한 명에게 장착합니다.',
  },
  {
    id: 'golden_ticket',
    name: '황금 티켓',
    tier: 'gold',
    imgUrl: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3089.png',
    description: '골드 티어 이상의 아이템 구성 시 골드 1개를 추가로 획득합니다.',
  },
];