import { useState } from 'react'
import { Footer } from '../components/layout/Footer'
import { TopAppBar } from '../components/layout/TopAppBar'

// ─── Static quiz data ────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    type: 'synergy',
    label: 'SYNERGY MASTERY',
    question: "다음 중 '전사' 시너지를 가진 챔피언은?",
    options: [
      { name: '아트록스', correct: true,  img: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=200' },
      { name: '럭스',    correct: false, img: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&q=80&w=200' },
      { name: '신드라',  correct: false, img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=200' },
      { name: '애쉬',    correct: false, img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=200' },
    ],
  },
  {
    type: 'item',
    label: 'ITEM CRAFTING',
    question: "'구인수의 격노검'을 만들기 위해 필요한 조합 아이템은?",
    options: [
      { name: '곡궁 + 지팡이', correct: true  },
      { name: 'B.F + 지팡이', correct: false },
      { name: '곡궁 + 장갑',  correct: false },
      { name: '벨트 + 지팡이', correct: false },
    ],
  },
  {
    type: 'augment',
    label: 'AUGMENT CHOICE',
    question: "설명에 맞는 증강체는?: '아군 유닛이 처치될 때마다 남은 아군이 체력을 회복합니다.'",
    options: [
      { name: '사이버네틱 외피', correct: false },
      { name: '임시변통 방어구', correct: false },
      { name: '천상의 축복',    correct: true  },
      { name: '재생의 바람',    correct: false },
    ],
  },
]

const TOTAL_STEPS = 5

const RANKS = ['IRON', 'SILVER', 'GOLD', 'PLATINUM', 'CHALLENGER']

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

function QuizResult({ score, total, onReset }) {
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
        <button className="flex-1 py-md bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary-container transition-all">
          노트 확인하기
        </button>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function QuizDashboard() {
  const [gameStatus, setGameStatus] = useState('welcome') // 'welcome' | 'playing' | 'results'
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null) // null | { isCorrect: boolean }

  const question = QUESTIONS[currentIndex % QUESTIONS.length]

  function handleStart() {
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
    if (nextIndex >= TOTAL_STEPS) {
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
                total={TOTAL_STEPS}
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
            <QuizResult score={score} total={TOTAL_STEPS} onReset={handleReset} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
