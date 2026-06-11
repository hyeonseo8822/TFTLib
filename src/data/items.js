// Riot 공식 Data Dragon 기반으로 깨지지 않는 정확한 이미지 주소를 매핑합니다.
export const MATERIAL_ITEMS = [
  { id: "1", name: "B.F. 대검", imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/1038.png" }, // BF Sword (공격력)
  { id: "2", name: "곡궁", imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/1043.png" }, // Recurve Bow (공속)
  { id: "3", name: "쓸데없이 큰 지팡이", imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/1058.png" }, // Large Rod (주문력)
  { id: "4", name: "여신의 눈물", imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3070.png" }, // Tear (마나)
  { id: "5", name: "쇠사슬 조끼", imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/1031.png" }, // Chain Vest (방어력)
  { id: "6", name: "음전자 망토", imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/1057.png" }, // Negatron (마저)
  { id: "7", name: "거인의 허리띠", imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/1011.png" }, // Giant's Belt (체력)
  { id: "8", name: "연습용 장갑", imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/1051.png" }, // Gloves (치명타)
  { id: "9", name: "뒤집개", imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/1102.png" } // Spatula (특수)
];

export const COMPLETED_ITEMS = [
  // === 공격형 (Offensive) - 7 Items ===
  {
    id: "infinity_edge",
    name: "무한의 대검",
    category: "공격형",
    recipe: ["1", "8"], // BF + 장갑
    imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3031.png",
    stats: [{ label: "공격력", value: "+35%" }, { label: "치명타 확률", value: "+15%" }],
    effect: "스킬의 피해에 치명타가 적용될 수 있습니다. 치명타 확률이 100%를 초과하면 초과분 1%당 치명타 피해량이 1%로 전환됩니다.",
    recommendedUnits: ["징크스", "진", "드레이븐"],
    tags: ["#AD", "#치명타", "#폭발적_피해"]
  },
  {
    id: "deathblade",
    name: "죽음의 검",
    category: "공격형",
    recipe: ["1", "1"], // BF + BF
    imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3072.png",
    stats: [{ label: "공격력", value: "+55%" }],
    effect: "추가 공격력을 대폭 얻습니다. 물리 피해 중심의 메인 캐리 기물에게 가장 직관적이고 강력한 공격력을 제공합니다.",
    recommendedUnits: ["진", "케이틀린", "코그모"],
    tags: ["#순수_AD", "#공격력", "#지속_딜링"]
  },
  {
    id: "guinsoos_rageblade",
    name: "구인수의 격노검",
    category: "공격형",
    recipe: ["2", "3"], // 곡궁 + 지팡이
    imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3124.png",
    stats: [{ label: "공격속도", value: "+15%" }, { label: "주문력", value: "+10" }],
    effect: "기본 공격 시 공격 속도가 5% 증가합니다. 이 효과는 전투 종료 시까지 무한히 중첩됩니다.",
    recommendedUnits: ["징크스", "애쉬", "칼리스타"],
    tags: ["#공격속도", "#무한중첩", "#원거리_캐리"]
  },
  {
    id: "last_whisper",
    name: "최후의 속삭임",
    category: "공격형",
    recipe: ["2", "8"], // 곡궁 + 장갑
    imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3035.png",
    stats: [{ label: "공격력", value: "+15%" }, { label: "공격속도", value: "+10%" }, { label: "치명타 확률", value: "+20%" }],
    effect: "물리 피해를 입히면 3초 동안 대상의 방어력을 30% 감소시킵니다. 물리 덱의 핵심 필수 방깎 아이템입니다.",
    recommendedUnits: ["에즈리얼", "트리스타나", "미스 포츈"],
    tags: ["#방어력_감소", "#필수_유틸", "#방깎"]
  },
  {
    id: "bloodthirster",
    name: "피바라기",
    category: "공격형",
    recipe: ["1", "6"], // BF + 망토
    imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3072.png",
    stats: [{ label: "공격력", value: "+20%" }, { label: "마법 저항력", value: "+20" }],
    effect: "피해량의 20%만큼 체력을 회복(모든 피해 흡혈)합니다. 체력이 40% 아래로 떨어지면 5초 동안 최대 체력의 25%에 해당하는 보호막을 얻습니다.",
    recommendedUnits: ["야스오", "바이", "피오라"],
    tags: ["#피흡", "#보호막", "#근접_딜러"]
  },
  {
    id: "runaans_hurricane",
    name: "루난의 허리케인",
    category: "공격형",
    recipe: ["2", "6"], // 곡궁 + 망토
    imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3085.png",
    stats: [{ label: "공격력", value: "+20%" }, { label: "공격속도", value: "+20%" }],
    effect: "기본 공격 시 주변의 다른 적 한 명에게 탄환을 발사하여 공격력의 50%만큼 물리 피해를 입힙니다.",
    recommendedUnits: ["아펠리오스", "트위치", "어그로"],
    tags: ["#멀티_타겟", "#공격속도", "#온히트"]
  },
  {
    id: "giant_slayer",
    name: "거인 학살자",
    category: "공격형",
    recipe: ["1", "2"], // BF + 곡궁
    imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3035.png",
    stats: [{ label: "공격력", value: "+30%" }, { label: "주문력", value: "+10" }, { label: "공격속도", value: "+10%" }],
    effect: "기본 피해량이 25% 증가합니다. 대상의 최대 체력이 1600을 초과할 경우 피해량 증가 효과가 50%로 대폭 상승합니다.",
    recommendedUnits: ["징크스", "진", "제이스"],
    tags: ["#탱커_카운터", "#체력_비례", "#추가_피해"]
  },

  // === 방어형 (Defensive) - 7 Items ===
  {
    id: "warmogs_armor",
    name: "워모그의 갑옷",
    category: "방어형",
    recipe: ["7", "7"], // 허리띠 + 허리띠
    imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3083.png",
    stats: [{ label: "체력", value: "+500" }],
    effect: "착용자의 최대 체력을 엄청나게 증가시킵니다. 게임 초반 빌드업과 탱커 라인의 뼈대를 잡는 데 가장 유용합니다.",
    recommendedUnits: ["블리츠크랭크", "레오나", "뽀삐"],
    tags: ["#깡체력", "#초반_빌드업", "#메인_탱커"]
  },
  {
    id: "bramble_vest",
    name: "가시 갑옷",
    category: "방어형",
    recipe: ["5", "5"], // 조끼 + 조끼
    imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3075.png",
    stats: [{ label: "방어력", value: "+75" }],
    effect: "받는 치명타 추가 피해를 무효화합니다. 기본 공격을 받으면 주변 적에게 4초마다 마법 피해를 입힙니다.",
    recommendedUnits: ["갈리오", "알리스타", "신 짜오"],
    tags: ["#방어력", "#치명타_무효", "#반사_피해"]
  },
  {
    id: "dragons_claw",
    name: "용의 발톱",
    category: "방어형",
    recipe: ["6", "6"], // 망토 + 망토
    imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3155.png",
    stats: [{ label: "마법 저항력", value: "+65" }],
    effect: "2초마다 최대 체력의 5%만큼 체력을 회복합니다. 마법 피해 중심의 AP 덱을 상대로 무지막지한 탱킹력을 자랑합니다.",
    recommendedUnits: ["레오나", "뽀삐", "세주아니"],
    tags: ["#마법_저항력", "#초당_재생", "#AP_카운터"]
  },
  {
    id: "sunfire_cape",
    name: "태양불꽃 망토",
    category: "방어형",
    recipe: ["5", "7"], // 조끼 + 허리띠
    imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3068.png",
    stats: [{ label: "방어력", value: "+20" }, { label: "체력", value: "+150" }],
    effect: "2초마다 2칸 이내에 있는 적 한 명을 불태워 10초 동안 대상 최대 체력의 10%만큼 고정 피해를 입히고 회복량을 33% 감소시킵니다.",
    recommendedUnits: ["바이", "에코", "사일러스"],
    tags: ["#치유_감소", "#초반_트럭", "#고정_피해"]
  },
  {
    id: "gargoyle_stoneplate",
    name: "가고일 돌판갑옷",
    category: "방어형",
    recipe: ["5", "6"], // 조끼 + 망토
    imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3094.png",
    stats: [{ label: "방어력", value: "+30" }, { label: "마법 저항력", value: "+30" }],
    effect: "자신을 타겟팅하는 적 한 명당 방어력과 마법 저항력이 +10씩 증가합니다. 원톱 단독 탱커 배치 시 효율이 극대화됩니다.",
    recommendedUnits: ["싱드", "아무무", "세주아니"],
    tags: ["#단독_탱킹", "#방마저_증가", "#메인_방템"]
  },
  {
    id: "titans_resolve",
    name: "타이탄의 결의",
    category: "방어형",
    recipe: ["5", "2"], // 조끼 + 곡궁
    imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3153.png",
    stats: [{ label: "방어력", value: "+20" }, { label: "공격속도", value: "+10%" }],
    effect: "공격을 받거나 입힐 때마다 공격력과 주문력이 2%씩 늘어납니다. 최대 중첩 시 방어력과 마법 저항력이 25 증가합니다.",
    recommendedUnits: ["야스오", "바이", "볼리베어"],
    tags: ["#브루저_필수", "#스택형", "#하이브리드"]
  },
  {
    id: "steadfast_heart",
    name: "강인한 심장",
    category: "방어형",
    recipe: ["7", "6"], // 허리띠 + 망토
    imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3001.png",
    stats: [{ label: "체력", value: "+200" }, { label: "방어력", value: "+20" }, { label: "치명타 확률", value: "+15%" }],
    effect: "받는 모든 피해량이 8% 감소합니다. 체력이 50% 이상일 때는 피해량 감소 효과가 15%로 증가합니다.",
    recommendedUnits: ["쓰레쉬", "요릭", "일라오이"],
    tags: ["#피해_감소", "#체력_비례_탱킹", "#신규_탱템"]
  },

  // === 마법형 (Magical) - 7 Items ===
  {
    id: "rabadons_deathcap",
    name: "라바돈의 죽음모자",
    category: "마법형",
    recipe: ["3", "3"], // 지팡이 + 지팡이
    imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3089.png",
    stats: [{ label: "주문력", value: "+70" }],
    effect: "압도적인 순수 주문력을 제공합니다. 스킬 한 방 한 방의 파괴력이 중요한 순수 메인 AP 누커형 챔피언에게 완벽한 아이템입니다.",
    recommendedUnits: ["럭스", "아리", "빅터"],
    tags: ["#순수_AP", "#폭발적_데미지", "#주문력"]
  },
  {
    id: "blue_buff",
    name: "푸른 파수꾼 (블루)",
    category: "마법형",
    recipe: ["4", "4"], // 눈물 + 눈물
    imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3040.png",
    stats: [{ label: "주문력", value: "+10" }, { label: "시작 마나", value: "+40" }],
    effect: "최대 마나가 10 감소합니다. 착용자가 스킬을 시전한 후 3초 이내에 처치 관여 시 8초 동안 피해량이 8% 증가합니다.",
    recommendedUnits: ["이즈리얼", "신드라", "조이"],
    tags: ["#마나_순환", "#스킬_난사", "#저마나_챔피언"]
  },
  {
    id: "morellonomicon",
    name: "모렐로노미콘",
    category: "마법형",
    recipe: ["3", "7"], // 지팡이 + 허리띠
    imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3165.png",
    stats: [{ label: "주문력", value: "+25" }, { label: "체력", value: "+150" }],
    effect: "스킬로 마법 피해를 입히면 대상을 불태워 10초 동안 최대 체력의 10%만큼 고정 피해를 입히고 치유량을 33% 감소시킵니다.",
    recommendedUnits: ["모르가나", "트위스티드 페이트", "에코"],
    tags: ["#광역_치유감소", "#고정_피해", "#디버프"]
  },
  {
    id: "archangels_staff",
    name: "대천사의 지팡이",
    category: "마법형",
    recipe: ["3", "4"], // 지팡이 + 눈물
    imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3003.png",
    stats: [{ label: "주문력", value: "+20" }, { label: "마나", value: "+15" }],
    effect: "전투가 시작되면 5초마다 주문력이 20씩 상승합니다. 탱커 라인이 든든하여 전투가 길어질수록 화력이 무한대로 강력해집니다.",
    recommendedUnits: ["라이즈", "소나", "티모"],
    tags: ["#시간비례_성장", "#장기전_특화", "#AP_지속딜"]
  },
  {
    id: "spear_of_shojin",
    name: "쇼진의 창",
    category: "마법형",
    recipe: ["1", "4"], // BF + 눈물
    imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3124.png",
    stats: [{ label: "공격력", value: "+15" }, { label: "주문력", value: "+15" }, { label: "마나", value: "+15" }],
    effect: "기본 공격 시 5의 마나를 추가로 획득합니다. 스킬 마나통이 크거나 유틸 스킬을 자주 굴려야 하는 챔피언에게 필수적입니다.",
    recommendedUnits: ["소라카", "밀리오", "카르마"],
    tags: ["#평타당_마나", "#고마나_챔피언", "#스킬_순환"]
  },
  {
    id: "hextech_gunblade",
    name: "마법공학 총검",
    category: "마법형",
    recipe: ["1", "3"], // BF + 지팡이
    imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3146.png",
    stats: [{ label: "공격력", value: "+10%" }, { label: "주문력", value: "+25" }],
    effect: "모든 피해 흡혈 20%를 얻습니다. 추가로 자신이 입힌 피해량에 비례해 아군 중 체력이 가장 낮은 기물의 체력을 치유합니다.",
    recommendedUnits: ["카타리나", "피들스틱", "스웨인"],
    tags: ["#하이브리드_흡혈", "#아군_케어", "#생존력"]
  },
  {
    id: "jeweled_gauntlet",
    name: "보석 건틀릿",
    category: "마법형",
    recipe: ["3", "8"], // 지팡이 + 장갑
    imgUrl: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3157.png",
    stats: [{ label: "주문력", value: "+30" }, { label: "치명타 확률", value: "+15%" }],
    effect: "마법 및 고정 피해 스킬에 치명타가 적용될 수 있습니다. 주문력 기반 덱에서 대미지의 폭발력을 극한으로 올릴 때 탑재합니다.",
    recommendedUnits: ["럭스", "신드라", "벡스"],
    tags: ["#AP_치명타", "#스킬_폭딜", "#누커"]
  }
];

export const CATEGORY_FILTERS = [
  { id: 'all', label: '전체' },
  { id: '공격형', label: '공격형' },
  { id: '방어형', label: '방어형' },
  { id: '마법형', label: '마법형' },
];