"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Accordion, AccordionItem, Button } from '@heroui/react'
import { ArrowLeft } from 'lucide-react'

import { usePracticeSystem } from '@/hooks/usePracticeSystem'
import { useDeckCards } from '@/hooks/useDeckCards'

export default function PracticePage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [sessionStats, setSessionStats] = useState({
    correctAnswers: 0,
    wrongAnswers: 0
  })
  const [showCompletion, setShowCompletion] = useState(false)

  const { cards, updateCard } = useDeckCards(id as string)
  const {
    currentCard,
    currentCardIndex,
    totalCards,
    progress,
    showAnswer,
    setShowAnswer,
    answerCard,
    skipCard,
    hasNextCard,
    isSessionCompleted,
    resetSession
  } = usePracticeSystem(cards)

  // Handle session completion
  useEffect(() => {
    if (isSessionCompleted && totalCards > 0) {
      setShowCompletion(true)
    }
  }, [isSessionCompleted, totalCards])

  const handleShowAnswer = () => {
    setShowAnswer(true)
  }

  const handleAnswer = async (quality: number) => {
    if (!currentCard) return

    // Update session stats
    if (quality >= 3) {
      setSessionStats(prev => ({ ...prev, correctAnswers: prev.correctAnswers + 1 }))
    } else {
      setSessionStats(prev => ({ ...prev, wrongAnswers: prev.wrongAnswers + 1 }))
    }

    const updatedCard = answerCard(quality)
    if (updatedCard) {
      try {
        await updateCard(currentCard.id, updatedCard)
      } catch (error) {
        console.error('Failed to update card:', error)
      }
    }
  }

  const handleRestartSession = () => {
    setSessionStats({ correctAnswers: 0, wrongAnswers: 0 })
    setShowCompletion(false)
    resetSession()
  }

  const handleBackToDeck = () => {
    router.back()
  }

  // Session Completed Screen
  if (showCompletion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
        <div className="max-w-md mx-auto pt-20">
          <div className="text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-3xl font-bold mb-4">Session Completed!</h1>

            <div className="bg-slate-800 rounded-2xl p-6 mb-6 border border-slate-700">
              <div className="space-y-3 text-lg">
                <div className="flex justify-between">
                  <span className="text-slate-300">Total Cards:</span>
                  <span className="font-semibold">{totalCards}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-green-400">Correct:</span>
                  <span className="font-semibold text-green-400">{sessionStats.correctAnswers}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-red-400">Wrong:</span>
                  <span className="font-semibold text-red-400">{sessionStats.wrongAnswers}</span>
                </div>

                <div className="flex justify-between border-t border-slate-700 pt-3">
                  <span className="text-blue-400">Accuracy:</span>
                  <span className="font-semibold text-blue-400">
                    {totalCards > 0 ? Math.round((sessionStats.correctAnswers / totalCards) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="flat"
                className="flex-1 bg-slate-700 text-white border border-slate-600"
                onPress={handleBackToDeck}
              >
                Back to Deck
              </Button>

              <Button
                color="primary"
                className="flex-1"
                onPress={handleRestartSession}
              >
                Practice Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // No Cards Screen
  if (!currentCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
        <div className="max-w-md mx-auto pt-20 text-center">
          <div className="text-6xl mb-6">📚</div>
          <h1 className="text-3xl font-bold mb-4">No cards to practice!</h1>
          <p className="text-slate-300 mb-8">All cards are up to date or no cards available.</p>
          <Button
            color="primary"
            onPress={handleBackToDeck}
            className="px-8"
          >
            Back to Deck
          </Button>
        </div>
      </div>
    )
  }

  // Main Practice Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
      {/* Header */}
      <div className="max-w-2xl mx-auto">
        <Button
          variant="light"
          className="mb-6 text-slate-300 hover:text-white"
          startContent={<ArrowLeft size={20} />}
          onPress={handleBackToDeck}
        >
          Back to Deck
        </Button>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-slate-300 mb-3">
            <span className="text-sm">Card {currentCardIndex + 1} of {totalCards}</span>
            <span className="text-sm">{Math.round(progress)}% Complete</span>
          </div>

          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Session Stats */}
        <div className="flex justify-center gap-8 mb-8 text-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{sessionStats.correctAnswers}</div>
            <div className="text-sm text-slate-400">Correct</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{sessionStats.wrongAnswers}</div>
            <div className="text-sm text-slate-400">Wrong</div>
          </div>
        </div>

        {/* Card Content */}
        <div className="bg-slate-800 rounded-2xl p-8 mb-8 border border-slate-700 shadow-2xl">
          {/* Front of Card */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 text-white">{currentCard.front}</h2>
            <div className="text-slate-300 mb-3 text-lg">{currentCard.phonetic}</div>
            <div className="text-sm text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full inline-block border border-blue-400/20">
              {currentCard.pos}
            </div>
          </div>

          {/* Answer Section */}
          {showAnswer ? (
            <div className="space-y-6 animate-fade-in">
              <div className="p-4 bg-slate-700/50 rounded-xl border border-slate-600">
                <h3 className="font-semibold mb-3 text-slate-200">Definition</h3>
                <p className="text-white text-lg">{currentCard.definition}</p>
              </div>

              {currentCard.examples && currentCard.examples.length > 0 && (
                <div className="p-4 bg-slate-700/50 rounded-xl border border-slate-600">

                  <Accordion>
                    <AccordionItem title={
                      <h3 className="font-semibold mb-3 text-slate-200">Examples ({currentCard.examples.length})</h3>
                    }>
                      <ul className="space-y-3">
                        {currentCard.examples.map((example, idx) => (
                          <li key={idx} className="space-y-2">
                            <div className='font-medium text-white'>{example.from}</div>
                            <div className='text-sm text-slate-400'>{example.to}</div>
                          </li>
                        ))}
                      </ul>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}

              {currentCard.note && (
                <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                  <h3 className="font-semibold mb-2 text-amber-200">Note</h3>
                  <p className="text-amber-100 text-sm">{currentCard.note}</p>
                </div>
              )}

              {/* Answer Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => handleAnswer(0)}
                  className="py-4 text-lg font-semibold border border-red-500/20"
                >
                  Again
                </Button>
                <Button
                  color="warning"
                  variant="flat"
                  onPress={() => handleAnswer(2)}
                  className="py-4 text-lg font-semibold border border-orange-500/20"
                >
                  Hard
                </Button>
                <Button
                  color="primary"
                  variant="flat"
                  onPress={() => handleAnswer(3)}
                  className="py-4 text-lg font-semibold border border-blue-500/20"
                >
                  Good
                </Button>
                <Button
                  color="success"
                  variant="flat"
                  onPress={() => handleAnswer(5)}
                  className="py-4 text-lg font-semibold border border-green-500/20"
                >
                  Easy
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <Button
                color="primary"
                onPress={handleShowAnswer}
                className="w-full py-4 text-lg font-semibold"
                size="lg"
              >
                Show Answer
              </Button>

              <div className="flex gap-3 justify-center">
                <Button
                  variant="flat"
                  className="text-slate-300 border border-slate-600"
                  onPress={skipCard}
                  size="sm"
                >
                  Skip Card
                </Button>
                <Button
                  variant="flat"
                  className="text-slate-300 border border-slate-600"
                  onPress={() => setShowCompletion(true)}
                  size="sm"
                >
                  End Session
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Card Progress */}
        <div className="text-center text-slate-400 text-sm">
          <div className="mb-1">
            Status: <span className="font-medium text-white capitalize">{currentCard.status}</span>
          </div>
          <div>
            Next Review: <span className="font-medium text-white">
              {currentCard.nextReviewDate.toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
