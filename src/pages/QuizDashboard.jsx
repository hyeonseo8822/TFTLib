import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { TopAppBar } from '../components/layout/TopAppBar'

// ─── Static quiz data ────────────────────────────────────────────────────────

const championImages = import.meta.glob('../assets/champions/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
})

function championImage(slug) {
  return championImages[`../assets/champions/${slug}.png`]
}

const QUESTIONS = [
  {
    type: 'synergy',
    label: 'SYNERGY MASTERY',
    question: "다음 중 '보루' 시너지를 가진 챔피언은?",
    options: [
      { name: '아트록스', correct: true, img: championImage('aatrox') },
      { name: '아칼리', correct: false, img: championImage('akali') },
      { name: '케이틀린', correct: false, img: championImage('caitlyn') },
      { name: '진', correct: false, img: championImage('jhin') },
    ],
  },
  {
    type: 'synergy',
    label: 'SYNERGY MASTERY',
    question: "다음 중 '저격수' 시너지를 가진 챔피언은?",
    options: [
      { name: '진', correct: true, img: championImage('jhin') },
      { name: '피오라', correct: false, img: championImage('fiora') },
      { name: '잭스', correct: false, img: championImage('jax') },
      { name: '모르가나', correct: false, img: championImage('morgana') },
    ],
  },
  {
    type: 'synergy',
    label: 'SYNERGY MASTERY',
    question: "다음 중 '격투가' 시너지를 가진 챔피언은?",
    options: [
      { name: '초가스', correct: true, img: championImage('chogath') },
      { name: '자야', correct: false, img: championImage('xayah') },
      { name: '벡스', correct: false, img: championImage('vex') },
      { name: '오로라', correct: false, img: championImage('aurora') },
    ],
  },
  {
    type: 'synergy',
    label: 'SYNERGY MASTERY',
    question: "다음 중 '사이오닉' 시너지를 가진 챔피언은?",
    options: [
      { name: '마스터 이', correct: true, img: championImage('masteryi') },
      { name: '나르', correct: false, img: championImage('gnar') },
      { name: '징크스', correct: false, img: championImage('jinx') },
      { name: '코르키', correct: false, img: championImage('corki') },
    ],
  },
  {
    type: 'synergy',
    label: 'SYNERGY MASTERY',
    question: "다음 중 '선봉대' 시너지를 가진 챔피언은?",
    options: [
      { name: '블리츠크랭크', correct: true, img: championImage('blitzcrank') },
      { name: '카이사', correct: false, img: championImage('kaisa') },
      { name: '제드', correct: false, img: championImage('zed') },
      { name: '그레이브즈', correct: false, img: championImage('graves') },
    ],
  },
  {
    type: 'item',
    label: 'ITEM CRAFTING',
    question: "'구인수의 격노검'을 만들기 위해 필요한 조합 아이템은?",
    options: [
      { name: '곡궁 + 쓸데없이 큰 지팡이', correct: true },
      { name: 'B.F. 대검 + 쓸데없이 큰 지팡이', correct: false },
      { name: '곡궁 + 연습용 장갑', correct: false },
      { name: '거인의 허리띠 + 쓸데없이 큰 지팡이', correct: false },
    ],
  },
  {
    type: 'item',
    label: 'ITEM CRAFTING',
    question: "'쇼진의 창'을 만들기 위해 필요한 조합 아이템은?",
    options: [
      { name: 'B.F. 대검 + 여신의 눈물', correct: true },
      { name: '곡궁 + 여신의 눈물', correct: false },
      { name: 'B.F. 대검 + 음전자 망토', correct: false },
      { name: '쇠사슬 조끼 + 여신의 눈물', correct: false },
    ],
  },
  {
    type: 'item',
    label: 'ITEM CRAFTING',
    question: "'푸른 파수꾼'을 만들기 위해 필요한 조합 아이템은?",
    options: [
      { name: '여신의 눈물 + 여신의 눈물', correct: true },
      { name: '쓸데없이 큰 지팡이 + 여신의 눈물', correct: false },
      { name: '음전자 망토 + 여신의 눈물', correct: false },
      { name: '연습용 장갑 + 여신의 눈물', correct: false },
    ],
  },
  {
    type: 'item',
    label: 'ITEM CRAFTING',
    question: "'대천사의 지팡이'를 만들기 위해 필요한 조합 아이템은?",
    options: [
      { name: '쓸데없이 큰 지팡이 + 여신의 눈물', correct: true },
      { name: '쓸데없이 큰 지팡이 + 쓸데없이 큰 지팡이', correct: false },
      { name: 'B.F. 대검 + 여신의 눈물', correct: false },
      { name: '쇠사슬 조끼 + 음전자 망토', correct: false },
    ],
  },
  {
    type: 'item',
    label: 'ITEM CRAFTING',
    question: "'가시 갑옷'을 만들기 위해 필요한 조합 아이템은?",
    options: [
      { name: '쇠사슬 조끼 + 쇠사슬 조끼', correct: true },
      { name: '쇠사슬 조끼 + 음전자 망토', correct: false },
      { name: '거인의 허리띠 + 쇠사슬 조끼', correct: false },
      { name: '연습용 장갑 + 쇠사슬 조끼', correct: false },
    ],
  },
  {
    type: 'item',
    label: 'ITEM CRAFTING',
    question: "'이온 충격기'를 만들기 위해 필요한 조합 아이템은?",
    options: [
      { name: '쓸데없이 큰 지팡이 + 음전자 망토', correct: true },
      { name: 'B.F. 대검 + 음전자 망토', correct: false },
      { name: '곡궁 + 음전자 망토', correct: false },
      { name: '쇠사슬 조끼 + 음전자 망토', correct: false },
    ],
  },
  {
    type: 'item',
    label: 'ITEM CRAFTING',
    question: "'무한의 대검'을 만들기 위해 필요한 조합 아이템은?",
    options: [
      { name: 'B.F. 대검 + 연습용 장갑', correct: true },
      { name: 'B.F. 대검 + B.F. 대검', correct: false },
      { name: '곡궁 + 연습용 장갑', correct: false },
      { name: '쓸데없이 큰 지팡이 + 연습용 장갑', correct: false },
    ],
  },
  {
    type: 'item',
    label: 'ITEM CRAFTING',
    question: "'워모그의 갑옷'을 만들기 위해 필요한 조합 아이템은?",
    options: [
      { name: '거인의 허리띠 + 거인의 허리띠', correct: true },
      { name: '거인의 허리띠 + 쇠사슬 조끼', correct: false },
      { name: '거인의 허리띠 + 음전자 망토', correct: false },
      { name: '거인의 허리띠 + 연습용 장갑', correct: false },
    ],
  },
  {
    type: 'augment',
    label: 'AUGMENT CHOICE',
    question: "설명에 맞는 증강체는?: '현재 및 최대 플레이어 체력이 20 증가합니다.'",
    options: [
      { name: '꼬마 거인', correct: true },
      { name: '후반 전문가', correct: false },
      { name: '신병', correct: false },
      { name: '보석 연꽃 II', correct: false },
    ],
  },
  {
    type: 'augment',
    label: 'AUGMENT CHOICE',
    question: "설명에 맞는 증강체는?: '라운드 시작 시 대기석의 아이템이 무작위로 변합니다.'",
    options: [
      { name: '판도라의 아이템', correct: true },
      { name: '휴대용 대장간', correct: false },
      { name: '간이 대장간', correct: false },
      { name: '도둑 무리', correct: false },
    ],
  },
  {
    type: 'augment',
    label: 'AUGMENT CHOICE',
    question: "설명에 맞는 증강체는?: '대기석에 챔피언이 없다면 플레이어 대상 전투 종료 시 경험치를 얻습니다.'",
    options: [
      { name: '맑은 정신', correct: true },
      { name: '레벨 업!', correct: false },
      { name: '새로고침의 날 I', correct: false },
      { name: '후반 전문가', correct: false },
    ],
  },
  {
    type: 'augment',
    label: 'AUGMENT CHOICE',
    question: "설명에 맞는 증강체는?: '유물 4개 중 하나를 선택합니다.'",
    options: [
      { name: '휴대용 대장간', correct: true },
      { name: '아이템 꾸러미', correct: false },
      { name: '판도라의 아이템', correct: false },
      { name: '꼬마 거인', correct: false },
    ],
  },
  {
    type: 'augment',
    label: 'AUGMENT CHOICE',
    question: "설명에 맞는 증강체는?: '경험치를 구매하면 추가 경험치를 얻고, 즉시 경험치를 얻습니다.'",
    options: [
      { name: '레벨 업!', correct: true },
      { name: '맑은 정신', correct: false },
      { name: '성취', correct: false },
      { name: '생일 선물', correct: false },
    ],
  },
  {
    type: 'augment',
    label: 'AUGMENT CHOICE',
    question: "설명에 맞는 증강체는?: '아군이 치명타 확률, 치명타 피해량, 정밀을 얻습니다.'",
    options: [
      { name: '보석 연꽃 II', correct: true },
      { name: '무차별적 살인자', correct: false },
      { name: '단결된 의지', correct: false },
      { name: '거대하고 강력한', correct: false },
    ],
  },
  {
    type: 'augment',
    label: 'AUGMENT CHOICE',
    question: "설명에 맞는 증강체는?: '최대 팀 규모가 +1 증가하고 4단계 챔피언을 획득합니다.'",
    options: [
      { name: '신병', correct: true },
      { name: '레벨 업!', correct: false },
      { name: '삼인방 II', correct: false },
      { name: '성취', correct: false },
    ],
  },
]

const TOTAL_STEPS = 10

const RANKS = [
  'IRON',
  'IRON',
  'IRON',
  'SILVER',
  'SILVER',
  'GOLD',
  'GOLD',
  'PLATINUM',
  'PLATINUM',
  'CHALLENGER',
  'CHALLENGER',
]

function shuffleList(items) {
  const shuffled = [...items]
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const current = shuffled[i]
    shuffled[i] = shuffled[j]
    shuffled[j] = current
  }
  return shuffled
}

function createQuestionSet() {
  return shuffleList(QUESTIONS)
    .slice(0, Math.min(TOTAL_STEPS, QUESTIONS.length))
    .map((question) => ({
      ...question,
      options: shuffleList(question.options),
    }))
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function QuizProgress({ currentIndex, total, label }) {
  return (
    <div className="flex flex-col gap-xs">
      <div className="flex justify-between items-end">
        <span className="font-label-md text-label-md text-primary uppercase tracking-widest">
          Question {currentIndex} of {total}
        </span>
        <span className="font-caption text-caption text-on-surface-variant px-sm py-1 bg-surface-container-high rounded-full">
          {label}
        </span>
      </div>
      <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${(currentIndex / total) * 100}%` }}
        />
      </div>
    </div>
  )
}

function SynergyQuestion({ question, options, onAnswer, answered }) {
  return (
    <div className="flex flex-col items-center gap-lg w-full">
      <div className="text-center">
        <div className="w-20 h-20 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center mb-sm mx-auto shadow-md">
          <span className="material-symbols-outlined text-[40px]">groups</span>
        </div>
        <h2 className="font-headline-md text-headline-md">{question}</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-md w-full">
        {options.map((opt) => (
          <button
            key={opt.name}
            disabled={answered}
            onClick={() => onAnswer(opt.correct)}
            className={`group flex flex-col gap-sm p-sm bg-white border border-outline-variant rounded-xl hover:border-primary transition-all disabled:cursor-not-allowed`}
          >
            <div className="aspect-square bg-surface-container rounded-lg overflow-hidden">
              <img src={opt.img} alt={opt.name} className="w-full h-full object-cover" />
            </div>
            <span className="font-label-md text-label-md text-center">{opt.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function ItemQuestion({ question, options, onAnswer, answered }) {
  return (
    <div className="flex flex-col items-center gap-lg w-full">
      <div className="text-center">
        <div className="w-24 h-24 bg-surface-container-high rounded-xl flex items-center justify-center mb-md mx-auto border-2 border-dashed border-outline">
          <span className="material-symbols-outlined text-[48px] text-outline">question_mark</span>
        </div>
        <h2 className="font-headline-md text-headline-md">{question}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-sm w-full max-w-lg">
        {options.map((opt) => (
          <button
            key={opt.name}
            disabled={answered}
            onClick={() => onAnswer(opt.correct)}
            className="p-md bg-white border border-outline-variant rounded-lg text-left font-label-md text-label-md hover:bg-surface-container-low flex justify-between items-center group transition-all disabled:cursor-not-allowed"
          >
            {opt.name}
            <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity">add_circle</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function AugmentQuestion({ question, options, onAnswer, answered }) {
  return (
    <div className="flex flex-col items-center gap-lg w-full">
      <div className="text-center max-w-xl">
        <span
          className="material-symbols-outlined text-[64px] text-secondary mb-sm"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          auto_awesome
        </span>
        <h2 className="font-headline-md text-headline-md">{question}</h2>
      </div>
      <div className="grid grid-cols-1 gap-sm w-full max-w-md">
        {options.map((opt) => (
          <button
            key={opt.name}
            disabled={answered}
            onClick={() => onAnswer(opt.correct)}
            className="w-full py-md px-lg bg-white border border-outline-variant rounded-lg font-label-md text-label-md hover:border-primary transition-all disabled:cursor-not-allowed"
          >
            {opt.name}
          </button>
        ))}
      </div>
    </div>
  )
}

function QuizFeedback({ isCorrect, onNext }) {
  return (
    <div
      className={`mt-md p-md rounded-xl border flex items-center justify-between transition-all ${
        isCorrect
          ? 'bg-green-50 border-green-300 text-green-800'
          : 'bg-red-50 border-red-300 text-red-800'
      }`}
    >
      <div className="flex items-center gap-sm">
        <span className="material-symbols-outlined text-[24px]">
          {isCorrect ? 'check_circle' : 'cancel'}
        </span>
        <span className="font-label-md text-label-md">
          {isCorrect ? '정답입니다!' : '틀렸습니다. 다음에 도전해보세요!'}
        </span>
      </div>
      <button
        onClick={onNext}
        className="px-lg py-sm bg-primary text-on-primary font-label-md text-label-md rounded-lg flex items-center gap-xs hover:shadow-lg transition-all active:scale-95"
      >
        다음 문제
        <span className="material-symbols-outlined">arrow_forward</span>
      </button>
    </div>
  )
}

function QuizResult({ score, total, onReset, onOpenNotes }) {
  const rank = RANKS[Math.min(score, RANKS.length - 1)]
  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0

  return (
    <div className="flex flex-col items-center text-center space-y-lg">
      <div className="relative">
        <div className="w-48 h-48 bg-gradient-to-br from-secondary-fixed to-secondary rounded-full flex items-center justify-center shadow-xl animate-bounce">
          <span
            className="material-symbols-outlined text-[80px] text-on-secondary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            military_tech
          </span>
        </div>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-lg py-xs rounded-full font-label-md text-label-md shadow-lg whitespace-nowrap">
          {rank}
        </div>
      </div>

      <div className="space-y-xs mt-md">
        <h2 className="font-headline-lg text-headline-lg text-primary">
          {score === total ? '완벽한 승리!' : '수고하셨습니다!'}
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          최종 점수: <span className="font-bold text-secondary">{score} / {total}</span>
        </p>
      </div>

      <div className="w-full grid grid-cols-3 gap-md py-md border-y border-outline-variant">
        <div className="flex flex-col">
          <span className="font-caption text-caption text-on-surface-variant uppercase">정확도</span>
          <span className="font-headline-md text-headline-md">{accuracy}%</span>
        </div>
        <div className="flex flex-col border-x border-outline-variant">
          <span className="font-caption text-caption text-on-surface-variant uppercase">랭크</span>
          <span className="font-headline-md text-headline-md">{rank}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-caption text-caption text-on-surface-variant uppercase">LP 획득</span>
          <span className="font-headline-md text-headline-md">+{score * 10}</span>
        </div>
      </div>

      <div className="flex gap-md w-full">
        <button
          onClick={onReset}
          className="flex-1 py-md border-2 border-primary text-primary font-label-md text-label-md rounded-lg hover:bg-surface-container-high transition-all"
        >
          다시 도전
        </button>
        <button
          onClick={onOpenNotes}
          className="flex-1 py-md bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary-container transition-all"
        >
          노트 확인하기
        </button>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function QuizDashboard() {
  const navigate = useNavigate()
  const [gameStatus, setGameStatus] = useState('welcome') // 'welcome' | 'playing' | 'results'
  const [sessionQuestions, setSessionQuestions] = useState(() => createQuestionSet())
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null) // null | { isCorrect: boolean }

  const question = sessionQuestions[currentIndex]

  function handleStart() {
    setSessionQuestions(createQuestionSet())
    setGameStatus('playing')
    setCurrentIndex(0)
    setScore(0)
    setFeedback(null)
  }

  function handleAnswer(isCorrect) {
    if (feedback !== null) return
    if (isCorrect) setScore((s) => s + 1)
    setFeedback({ isCorrect })
  }

  function handleNext() {
    const nextIndex = currentIndex + 1
    if (nextIndex >= sessionQuestions.length) {
      setGameStatus('results')
    } else {
      setCurrentIndex(nextIndex)
      setFeedback(null)
    }
  }

  function handleReset() {
    setGameStatus('welcome')
    setCurrentIndex(0)
    setScore(0)
    setFeedback(null)
  }

  function handleOpenNotes() {
    navigate('/positioning')
  }

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      <TopAppBar activeNavId="quiz" />

      <main className="flex-1 pt-xl flex flex-col items-center justify-center px-gutter py-lg">
        <div className="w-full max-w-4xl bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg p-lg relative overflow-hidden">

          {/* ── Welcome screen ── */}
          {gameStatus === 'welcome' && (
            <div className="flex flex-col items-center text-center space-y-md">
              <div className="inline-flex items-center gap-xs px-sm py-xs bg-secondary-container text-on-secondary-container rounded-full font-label-md text-label-md mb-base">
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  workspace_premium
                </span>
                최고 점수: 980 LP
              </div>

              <h1 className="font-display-lg text-display-lg text-primary">TFT 퀴즈</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
                최신 패치 아이템 조합, 시너지, 그리고 증강체 숙련도를 테스트하고 랭크를 올리세요. 당신은 챌린저의 자격이 있습니까?
              </p>

              <div className="w-full h-64 rounded-xl overflow-hidden relative group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF2W2mqaU5itFIHpRb3RxezXPLrNVA8C36qHEhmyHQnHSWJ_ko1Z6aYqnyNQBZ74M_8E4lPrZaUVerIsmPUkGD3p6f_wVM_a65S6Rj1fvc9dgVSbzLqEUB6i5tSRcccAJmbv10J0aM3NavwZTO9-ir73dsOeOfwkSgk1f7yTBX9bDZYTOYdjpvTjpOSsxrC86-yOtet8DrJp9Yq5Ns24nh64iNEnem9ljPMFqR6RL6nYmU9PSENigV_F5X3Iffyo6Nikolbq_Y4Xk"
                  alt="TFT 퀴즈 배경"
                  className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              </div>

              <button
                onClick={handleStart}
                className="w-64 py-md bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary-container transition-all active:scale-95"
              >
                테스트 시작
              </button>
            </div>
          )}

          {/* ── Active quiz screen ── */}
          {gameStatus === 'playing' && (
            <div className="space-y-lg">
              <QuizProgress
                currentIndex={currentIndex + 1}
                total={sessionQuestions.length}
                label={question.label}
              />

              <div className="min-h-[400px] flex flex-col items-center justify-center gap-lg">
                {question.type === 'synergy' && (
                  <SynergyQuestion
                    question={question.question}
                    options={question.options}
                    onAnswer={handleAnswer}
                    answered={feedback !== null}
                  />
                )}
                {question.type === 'item' && (
                  <ItemQuestion
                    question={question.question}
                    options={question.options}
                    onAnswer={handleAnswer}
                    answered={feedback !== null}
                  />
                )}
                {question.type === 'augment' && (
                  <AugmentQuestion
                    question={question.question}
                    options={question.options}
                    onAnswer={handleAnswer}
                    answered={feedback !== null}
                  />
                )}
              </div>

              {feedback !== null && (
                <QuizFeedback isCorrect={feedback.isCorrect} onNext={handleNext} />
              )}
            </div>
          )}

          {/* ── Results screen ── */}
          {gameStatus === 'results' && (
            <QuizResult
              score={score}
              total={sessionQuestions.length}
              onReset={handleReset}
              onOpenNotes={handleOpenNotes}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
