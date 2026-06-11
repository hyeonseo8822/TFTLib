// ==========================================
// 1. 시너지 필터 정의 (계열/직업 삭제 -> 전체 필터로 통합)
// ==========================================
export const SYNERGY_FILTERS = [
  { id: 'all', label: '전체 보기', category: null }
];

// ==========================================
// 2. 시즌 17 시너지 및 챔피언 매칭 데이터 (최소 10개 이상 구성)
// ==========================================
export const SYNERGIES = [
  {
    id: 'nova',
    name: 'N.O.V.A.',
    englishName: 'N.O.V.A.',
    icon: 'flare',
    iconFilled: true,
    iconBg: 'bg-primary-container',
    iconColor: 'text-on-primary-container',
    tierLabel: 'Tier 2 / 5',
    tierLabelHighlight: true,
    description: '전투 시작 6초 후 아군에게 강력한 고유 버프인 고조 효과를 부여합니다.',
    detailDescription: '5시너지 달성 시 타격 선택기를 획득하여 전투 중 강력한 위성의 지원 사격을 발동시킬 수 있습니다.',
    category: null,
    tierEffects: [
      { tier: 2, title: '힘의 고조', description: '6초 후 N.O.V.A. 유닛들이 주변 아군에게 공격 속도 및 체력 회복 버프를 부여합니다.', active: true },
      { tier: 5, title: '위성 타격', description: '타격 선택기를 통해 맵 전체에 광역 고정 피해와 파열을 적용합니다.', active: false },
    ],
    champions: [
      { id: 'caitlyn', name: '케이틀린', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Caitlyn.png', highlighted: true },
      { id: 'akali', name: '아칼리', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Akali.png' },
      { id: 'aatrox', name: '아트록스', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Aatrox.png' },
      { id: 'kindred', name: '킨드레드', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Kindred.png' },
      { id: 'maokai', name: '마오카이', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Maokai.png' }
    ],
    tacticalNote: '케이틀린의 강력한 후방 딜링과 마오카이의 전방 탱킹력을 기반으로 밸런스를 잡기 좋은 시너지입니다.'
  },
  {
    id: 'space-groove',
    name: '우주 그루브',
    englishName: 'Space Groove',
    icon: 'queue_music',
    iconFilled: false,
    iconBg: 'bg-surface-container-highest',
    iconColor: 'text-primary',
    tierLabel: 'Tier 3 / 5 / 7',
    tierLabelHighlight: false,
    description: '디스코 리듬을 타며 매 초마다 공격 속도가 상승하고 스킬 피해량이 증폭됩니다.',
    detailDescription: '그루브 스택이 최대치에 도달하면 아군 전체가 짜릿한 에너지를 얻어 질주 상태가 됩니다.',
    category: null,
    tierEffects: [
      { tier: 3, title: '펑키 리듬', description: '매 3초마다 공격 속도가 15%씩 증가합니다.', active: true },
      { tier: 5, title: '댄스 파티', description: '공격 속도 증가량이 30%로 상승하며, 초당 마나가 추가로 회복됩니다.', active: false },
      { tier: 7, title: '은하계 클럽', description: '최대 스택 시 주변 적들에게 주기적으로 광역 마법 피해를 입힙니다.', active: false },
    ],
    champions: [
      { id: 'blitzcrank', name: '블리츠크랭크', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Blitzcrank.png', highlighted: true },
      { id: 'lulu', name: '룰루', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Lulu.png' },
      { id: 'nunu', name: '누누와 윌럼프', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Nunu.png' },
      { id: 'rumble', name: '럼블', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Rumble.png' },
      { id: 'lux', name: '럭스', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Lux.png' }
    ],
    tacticalNote: '룰루와 럭스의 강력한 AP 원거리 포킹을 블리츠크랭크와 누누가 앞에서 버텨주는 정석적인 조합입니다.'
  },
  {
    id: 'celestial-gods',
    name: '천상의 신',
    englishName: 'Celestial Gods',
    icon: 'auto_awesome',
    iconFilled: false,
    iconBg: 'bg-surface-container-highest',
    iconColor: 'text-primary',
    tierLabel: 'Tier 3 / 6 / 9',
    tierLabelHighlight: false,
    description: '신성한 빛의 가호를 받아 아군 전체가 모든 피해 흡혈을 얻고 적을 심판합니다.',
    detailDescription: '고코스트 위주의 강력한 신들이 포진해 있으며, 9시너지 달성 시 사망한 아군이 1회 부활합니다.',
    category: null,
    tierEffects: [
      { tier: 3, title: '신의 은총', description: '아군 전체가 모든 피해 흡혈 15%를 획득합니다.', active: true },
      { tier: 6, title: '신의 분노', description: '흡혈량이 35%로 증가하며 5초마다 적에게 낙뢰를 떨어뜨립니다.', active: false },
      { tier: 9, title: '신세계 강림', description: '흡혈량 70% 및 낙뢰 피해 3배, 아군이 쓰러질 때 신성한 형태로 부활합니다.', active: false },
    ],
    champions: [
      { id: 'soraka', name: '소라카', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Soraka.png' },
      { id: 'kayle', name: '케일', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Kayle.png', highlighted: true },
      { id: 'taric', name: '타릭', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Taric.png' },
      { id: 'pantheon', name: '판테온', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Pantheon.png' },
      { id: 'aurelionsol', name: '아우렐리온 솔', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/AurelionSol.png' }
    ],
    tacticalNote: '소라카와 타릭의 무지막지한 유지력 힐링을 바탕으로 케일과 아우렐리온 솔이 후반을 폭파시키는 밸류 덱입니다.'
  },
  {
    id: 'star-guardian',
    name: '별 수호자',
    englishName: 'Star Guardian',
    icon: 'star',
    iconFilled: false,
    iconBg: 'bg-surface-container-highest',
    iconColor: 'text-primary',
    tierLabel: 'Tier 3 / 5 / 7',
    tierLabelHighlight: false,
    description: '스킬을 시전할 때마다 다른 별 수호자 동료들에게 마나를 전송합니다.',
    detailDescription: '시너지가 켜지면 마나 회복 속도가 폭발적으로 증가하여 끊임없이 스킬을 연사할 수 있는 배터리 조합입니다.',
    category: null,
    tierEffects: [
      { tier: 3, title: '반짝이는 빛', description: '스킬 시전 시 다른 별 수호자들의 마나가 15 회복됩니다.', active: true },
      { tier: 5, title: '은하의 연대', description: '마나 회복량이 35로 증가하며 주문력이 20% 상승합니다.', active: false },
      { tier: 7, title: '우주 수호의 서약', description: '마나 회복량이 60으로 폭증하며 스킬이 20%의 추가 고정 피해를 입힙니다.', active: false },
    ],
    champions: [
      { id: 'ahri', name: '아리', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Ahri.png', highlighted: true },
      { id: 'ezreal', name: '이즈리얼', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Ezreal.png' },
      { id: 'neeko', name: '니코', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Neeko.png' },
      { id: 'syndra', name: '신드라', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Syndra.png' },
      { id: 'janna', name: '잔나', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Janna.png' }
    ],
    tacticalNote: '푸른 파수꾼(블루)이나 쇼진의 창을 장착한 아리가 끊임없이 여우구슬을 던져 적을 섬멸하게 만듭니다.'
  },
  {
    id: 'void-walker',
    name: '공허 방랑자',
    englishName: 'Void Walker',
    icon: 'dark_mode',
    iconFilled: false,
    iconBg: 'bg-surface-container-highest',
    iconColor: 'text-primary',
    tierLabel: 'Tier 2 / 4 / 6',
    tierLabelHighlight: false,
    description: '체력이 낮은 후방의 적을 포착하면 차원을 넘나들며 암살을 감행합니다.',
    detailDescription: '체력이 30% 이하인 적에게 순간이동하여 강력한 치명타 타격을 입히고 일시적으로 은신합니다.',
    category: null,
    tierEffects: [
      { tier: 2, title: '차원 침투', description: '치명타 확률이 20% 증가하며 후방 적을 우선 타겟팅합니다.', active: true },
      { tier: 4, title: '공허의 습격', description: '처치 관여 시 최대 체력의 25%에 해당하는 공허 보호막을 얻습니다.', active: false },
      { tier: 6, title: '무한의 심연', description: '순간이동 쿨타임이 초기화되며 처형선이 적 체력 40%로 상승합니다.', active: false },
    ],
    champions: [
      { id: 'kassadin', name: '카사딘', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Kassadin.png' },
      { id: 'khazix', name: '카직스', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Khazix.png', highlighted: true },
      { id: 'malzahar', name: '말자하', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Malzahar.png' },
      { id: 'chogath', name: '초가스', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Chogath.png' },
      { id: 'kaisa', name: '카이사', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Kaisa.png' }
    ],
    tacticalNote: '상대의 메인 원거리 딜러 배치를 저격하기 가장 좋은 정통 암살 및 유틸형 진형 파괴 덱입니다.'
  },
  {
    id: 'mecha-pilot',
    name: '메카 파일럿',
    englishName: 'Mecha Pilot',
    icon: 'smart_toy',
    iconFilled: false,
    iconBg: 'bg-surface-container-highest',
    iconColor: 'text-primary',
    tierLabel: 'Tier 3 / 5',
    tierLabelHighlight: false,
    description: '선택된 메카 챔피언이 아군의 체력을 흡수해 거대한 하이퍼 메카로 합체합니다.',
    detailDescription: '팀 슬롯을 추가로 차지하는 대신, 상상을 초월하는 깡체력과 넓은 광역 스킬 범위를 얻습니다.',
    category: null,
    tierEffects: [
      { tier: 3, title: '출격 준비', description: '지정된 메카 유닛이 주변 아군 2명의 체력을 흡수해 메카로 변신합니다.', active: true },
      { tier: 5, title: '초인류 메카', description: '메카가 흡수하는 능력치가 50% 증가하며 기물에 기절 면역이 부여됩니다.', active: false },
    ],
    champions: [
      { id: 'garen', name: '가렌', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Garen.png', highlighted: true },
      { id: 'jax', name: '잭스', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Jax.png' },
      { id: 'sett', name: '세트', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Sett.png' },
      { id: 'leona', name: '레오나', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Leona.png' },
      { id: 'wukong', name: '오공', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Wukong.png' }
    ],
    tacticalNote: '모든 탱킹 및 방어 아이템을 메인 조종사(가렌 또는 세트)에게 몰아주어 괴물을 만드는 원맨 캐리 덱입니다.'
  },
  {
    id: 'marauder',
    name: '습격자',
    englishName: 'Marauder',
    icon: 'water_drop',
    iconFilled: false,
    iconBg: 'bg-surface-container-highest',
    iconColor: 'text-primary',
    tierLabel: 'Tier 2 / 4 / 6',
    tierLabelHighlight: false,
    description: '공격력과 모든 피해 흡혈을 얻고, 초과된 회복량은 단단한 보호막으로 전환됩니다.',
    detailDescription: '전투가 길어질수록 죽지 않고 끊임없이 흡혈하며 피통을 복구하는 전형적인 브루저 직업군입니다.',
    category: null,
    tierEffects: [
      { tier: 2, title: '약탈의 흔적', description: '공격력 +15%, 모든 피해 흡혈 10%를 얻습니다.', active: true },
      { tier: 4, title: '피의 약탈자', description: '공격력 +35%, 모든 피해 흡혈 25% 및 초과 흡혈의 50%가 보호막이 됩니다.', active: false },
      { tier: 6, title: '무자비한 도살', description: '공격력 +60%, 모든 피해 흡혈 45% 및 초과 흡혈 전체가 보호막으로 치환됩니다.', active: false },
    ],
    champions: [
      { id: 'olaf', name: '올라프', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Olaf.png', highlighted: true },
      { id: 'darius', name: '다리우스', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Darius.png' },
      { id: 'sion', name: '사이온', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Sion.png' },
      { id: 'warwick', name: '워윅', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Warwick.png' },
      { id: 'samira', name: '사미라', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Samira.png' }
    ],
    tacticalNote: '스테락의 도전, 피바라기, 거인의 결의를 둘러준 올라프와 사미라가 미쳐 날뛸 수 있는 판을 만들어 줍니다.'
  },
  {
    id: 'vanguard',
    name: '선봉대',
    englishName: 'Vanguard',
    icon: 'shield',
    iconFilled: false,
    iconBg: 'bg-surface-container-highest',
    iconColor: 'text-primary',
    tierLabel: 'Tier 2 / 4 / 6',
    tierLabelHighlight: false,
    description: '기본 방어력과 마법 저항력이 증가하며, 전투 시작 시 거대한 최대 체력 비례 보호막을 두릅니다.',
    detailDescription: '보호막이 켜져 있는 동안에는 적에게 받는 모든 제어 효과(CC기)에 면역이 되는 철벽 방어선입니다.',
    category: null,
    tierEffects: [
      { tier: 2, title: '방어선 구축', description: '방/마저 +30, 전투 시작 시 최대 체력의 15% 보호막을 얻습니다.', active: true },
      { tier: 4, title: '견고한 성벽', description: '방/마저 +65, 보호막 수치가 최대 체력의 35%로 상승합니다.', active: false },
      { tier: 6, title: '난공불락', description: '방/마저 +120, 보호막 수치 55% 및 보호막 유지 동안 받는 피해가 15% 감소합니다.', active: false },
    ],
    champions: [
      { id: 'poppy', name: '뽀삐', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Poppy.png' },
      { id: 'nautilus', name: '노틸러스', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Nautilus.png', highlighted: true },
      { id: 'thresh', name: '쓰레쉬', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Thresh.png' },
      { id: 'mordekaiser', name: '모르데카이저', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Mordekaiser.png' },
      { id: 'malphite', name: '말파이트', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Malphite.png' }
    ],
    tacticalNote: '워모그의 갑옷과 구원을 장착시켜 뻥튀기된 체력을 기반으로 아군 원딜들이 프리딜을 넣을 시간을 벌어줍니다.'
  },
  {
    id: 'rogue',
    name: '불한당',
    englishName: 'Rogue',
    icon: 'visibility_off',
    iconFilled: false,
    iconBg: 'bg-surface-container-highest',
    iconColor: 'text-primary',
    tierLabel: 'Tier 2 / 4 / 6',
    tierLabelHighlight: false,
    description: '체력이 50% 이하로 내려가면 즉시 연막탄을 터트려 타겟팅을 해제하고 광분 상태가 됩니다.',
    detailDescription: '어그로를 핑퐁하며 적의 치명적인 공격을 흘리고 역으로 뒤를 잡는 기습 특화 직업군입니다.',
    category: null,
    tierEffects: [
      { tier: 2, title: '그림자 은신', description: '체력이 떨어지면 1초간 은신하며 공격력이 15% 증가합니다.', active: true },
      { tier: 4, title: '기습 공격', description: '은신 시간이 2초로 늘어나며 은신 후 첫 평타가 100% 치명타로 적중합니다.', active: false },
      { tier: 6, title: '어둠의 처형자', description: '적 처치 시 은신 쿨타임이 초기화되며 치명타 피해량이 40% 증폭됩니다.', active: false },
    ],
    champions: [
      { id: 'zed', name: '제드', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Zed.png', highlighted: true },
      { id: 'katarina', name: '카타리나', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Katarina.png' },
      { id: 'talon', name: '탈론', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Talon.png' },
      { id: 'shaco', name: '샤코', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Shaco.png' },
      { id: 'pyke', name: '파이크', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Pyke.png' }
    ],
    tacticalNote: '제드와 카타리나가 적의 주요 광역 스킬 타이밍에 은신으로 어그로를 빼면서 적 진형을 야금야금 갉아먹습니다.'
  },
  {
    id: 'sniper',
    name: '저격수',
    englishName: 'Sniper',
    icon: 'gps_fixed',
    iconFilled: false,
    iconBg: 'bg-surface-container-highest',
    iconColor: 'text-primary',
    tierLabel: 'Tier 2 / 4 / 6',
    tierLabelHighlight: false,
    description: '대상의 거리가 멀면 멀수록 공격 및 스킬 데미지가 칸당 비례하여 대폭 증가합니다.',
    detailDescription: '이번 시즌의 핵심 물리 AD 캐리 라인으로 무한의 대검, 죽음의 무도 등 극딜 템 효율이 최상입니다.',
    category: null,
    tierEffects: [
      { tier: 2, title: '거리 확보', description: '대상과의 거리 1칸당 입히는 피해량이 8% 증가합니다.', active: true },
      { tier: 4, title: '정밀 조준', description: '거리 1칸당 피해량 18% 증가 및 기본 사거리가 1칸 늘어납니다.', active: false },
      { tier: 6, title: '신의 한 발', description: '거리 1칸당 피해량 32% 증가 및 사거리 2칸 증가, 물리 관통력 20%를 얻습니다.', active: false },
    ],
    champions: [
      { id: 'jhin', name: '진', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Jhin.png', highlighted: true },
      { id: 'ashe', name: '애쉬', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Ashe.png' },
      { id: 'jinx', name: '징크스', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Jinx.png' },
      { id: 'aphelios', name: '아펠리오스', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Aphelios.png' },
      { id: 'missfortune', name: '미스 포츈', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/MissFortune.png' }
    ],
    tacticalNote: '무조건 구석에 배치해야 하며, 서풍이나 침묵의 장막 같은 유틸 아이템 배치를 가장 신경 써야 하는 덱입니다.'
  },
  {
    id: 'party-animal',
    name: '파티 애니멀',
    englishName: 'Party Animal',
    icon: 'celebration',
    iconFilled: false,
    iconBg: 'bg-surface-container-highest',
    iconColor: 'text-primary',
    tierLabel: 'Tier 2 / 4',
    tierLabelHighlight: false,
    description: '플레이어 전투에서 승리할 때마다 상자에서 축하 골드와 특수 아이템 조각을 드랍합니다.',
    detailDescription: '연승을 길게 유지할수록 리턴 보상이 기하급수적으로 늘어나는 이번 시즌 대표 스노우볼링 경제 특성입니다.',
    category: null,
    tierEffects: [
      { tier: 2, title: '파티 분위기', description: '전투 승리 시 무조건 3골드를 획득합니다.', active: true },
      { tier: 4, title: '골든 페스티벌', description: '승리 시 6골드 및 35% 확률로 완성 아이템을 획득할 수 있는 행운 구를 얻습니다.', active: false },
    ],
    champions: [
      { id: 'gragas', name: '그라가스', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Gragas.png', highlighted: true },
      { id: 'fizz', name: '피즈', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Fizz.png' },
      { id: 'gnar', name: '나르', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Gnar.png' },
      { id: 'bard', name: '바드', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Bard.png' },
      { id: 'yuumi', name: '유미', image: 'https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/Yuumi.png' }
    ],
    tacticalNote: '초반 2성 빌드업이 잘 붙었을 때 빠르게 켜서 이자를 극대화하고 9레벨 상위 초고밸류 덱으로 전환하는 용도입니다.'
  }
];

// ==========================================
// 3. 앱 기본 선택 상숫값
// ==========================================
export const DEFAULT_SELECTED_SYNERGY_ID = 'nova';