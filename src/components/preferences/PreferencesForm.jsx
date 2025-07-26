import { useState, useEffect } from 'react'
import BudgetRange from './BudgetRange'
import claudeService from '../../utils/claude'

// Add Instrument Serif font to heading and serif text
const PreferencesForm = ({ onSubmit }) => {
  // Carousel step: 0 = budget, 1 = dietary q, 2 = dietary text, 3 = optional questions, 4 = results
  const [step, setStep] = useState(0)
  const [budget, setBudget] = useState('')
  const [hasDietary, setHasDietary] = useState(null)
  const [dietaryText, setDietaryText] = useState('')
  const [showNext, setShowNext] = useState(false)
  const [showGiveMe, setShowGiveMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [optionalQuestions, setOptionalQuestions] = useState([])
  const [availableQuestions, setAvailableQuestions] = useState([])
  const [questionsLoading, setQuestionsLoading] = useState(false)
  
  // Generate questions when component mounts
  useEffect(() => {
    generateInitialQuestions()
  }, [])

  // Generate initial set of 3 questions
  const generateInitialQuestions = async () => {
    setQuestionsLoading(true)
    try {
      const newQuestions = await claudeService.generateOptionalQuestions([], 3)
      setAvailableQuestions(newQuestions)
    } catch (error) {
      console.error('Error generating initial questions:', error)
      // Fallback to default questions if API fails
      setAvailableQuestions([
        { id: 'atmosphere', text: 'What atmosphere are you looking for?', placeholder: 'Casual, romantic, family-friendly, lively...' },
        { id: 'occasion', text: 'What\'s the occasion?', placeholder: 'Date night, business meeting, celebration...' },
        { id: 'group', text: 'Who are you dining with?', placeholder: 'Solo, couple, family, large group...' }
      ])
    } finally {
      setQuestionsLoading(false)
    }
  }

  // Generate additional questions (1 at a time)
  const generateMoreQuestions = async () => {
    setQuestionsLoading(true)
    try {
      const excludedQuestions = [...availableQuestions, ...optionalQuestions].map(q => q.text)
      const newQuestions = await claudeService.generateOptionalQuestions(excludedQuestions, 1)
      setAvailableQuestions(prev => [...prev, ...newQuestions])
    } catch (error) {
      console.error('Error generating additional questions:', error)
    } finally {
      setQuestionsLoading(false)
    }
  }

  // Handle budget select
  const handleBudgetChange = (val) => {
    setBudget(val)
    setShowNext(true)
  }

  // Handle dietary yes/no
  const handleDietary = (val) => {
    setHasDietary(val)
    if (val === false) {
      // Skip dietary text step and go straight to optional questions
      setStep(3)
    } else {
      setShowNext(false)
    }
  }

  // Handle dietary text
  const handleDietaryText = (e) => {
    setDietaryText(e.target.value)
    setShowNext(!!e.target.value)
    setShowGiveMe(!!e.target.value)
  }

  // Handle adding optional questions
  const addOptionalQuestion = (questionId) => {
    const question = availableQuestions.find(q => q.id === questionId)
    if (question && !optionalQuestions.find(q => q.id === questionId)) {
      setOptionalQuestions(prev => [...prev, { ...question, answer: '' }])
    }
  }

  // Handle optional question answer change
  const handleOptionalAnswer = (questionId, answer) => {
    setOptionalQuestions(prev => 
      prev.map(q => q.id === questionId ? { ...q, answer } : q)
    )
  }

  // Remove optional question
  const removeOptionalQuestion = (questionId) => {
    setOptionalQuestions(prev => prev.filter(q => q.id !== questionId))
  }

  // Move to next step
  const next = () => {
    setShowNext(false)
    setStep(step + 1)
  }

  // Submit and get results
  const getRecommendations = async () => {
    setIsLoading(true)
    // Compose preferences object
    const preferences = {
      budget,
      dietaryRestrictions: hasDietary ? dietaryText : '',
      optionalPreferences: optionalQuestions.reduce((acc, q) => {
        if (q.answer.trim()) {
          acc[q.id] = q.answer.trim()
        }
        return acc
      }, {})
    }
    try {
      const res = await onSubmit(preferences)
      setResults(res)
      setStep(4)
    } finally {
      setIsLoading(false)
    }
  }

  // Carousel screens
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative w-full max-w-xl overflow-hidden" style={{minHeight: 600}}>
        {/* Screen 1: Budget (Frame 1 style) */}
        <div className={`absolute inset-0 transition-transform duration-500 ${step === 0 ? 'translate-x-0 opacity-100 z-10' : '-translate-x-full opacity-0 z-0'}`}>
          <div className="flex flex-col items-center justify-center h-full min-h-[600px] flex-grow">
            <h2 className="mb-2 mt-0 text-center" style={{ fontFamily: 'Instrument Serif, serif', fontSize: '36px', fontWeight: 'normal' }}>You hungry? I’ve got ideas.</h2>
            <div className="text-gray-700 mb-12 mt-2 text-center font-light" style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}>“I want to find a place to eat”</div>
            <div className="mb-0 flex flex-col items-center">
              <div className="mb-4 mt-2" style={{ fontFamily: 'Instrument Serif, serif', fontSize: '24px', color: '#000' }}>What’s your budget?</div>
              <div className="flex gap-3 mb-6 select-none">
                {[1,2,3,4,5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    aria-label={`Select budget level ${num}`}
                    onClick={() => handleBudgetChange('$'.repeat(num))}
                    onMouseEnter={e => setHovered(num)}
                    onMouseLeave={e => setHovered(null)}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '48px',
                      fontWeight: 500,
                      color: (hovered ? num <= hovered : budget.length >= num) ? '#000' : '#737373',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'color 0.2s',
                      textShadow: '0 1px 2px rgba(0,0,0,0.08)',
                    }}
                  >
                    $
                  </button>
                ))}
              </div>
            </div>
            {showNext && (
              <button className="mt-6 text-base font-medium text-gray-700 hover:underline transition-all" onClick={next}>Next &rarr;</button>
            )}
          </div>
        </div>
        {/* Screen 2: Dietary Q */}
        <div className={`absolute inset-0 transition-transform duration-500 ${step === 1 ? 'translate-x-0 opacity-100 z-10' : step < 1 ? 'translate-x-full opacity-0 z-0' : '-translate-x-full opacity-0 z-0'}`}>
          <div className="flex flex-row items-center justify-center h-full w-full gap-12">
            {/* Left: Budget summary */}
            <div className="flex flex-col items-start justify-center min-w-[180px]">
              <div className="mb-2" style={{ fontFamily: 'Instrument Serif, serif', fontSize: '24px', color: '#000' }}>What’s your budget?</div>
              <div className="flex gap-1 select-none">
                {[1,2,3,4,5].map((num) => (
                  <span
                    key={num}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '32px',
                      fontWeight: 500,
                      color: budget.length >= num ? '#000' : '#737373',
                      transition: 'color 0.2s',
                    }}
                  >
                    $
                  </span>
                ))}
              </div>
            </div>
            {/* Right: Dietary question */}
            <div className="flex flex-col items-center justify-center flex-1">
              <div className="text-lg mb-4" style={{ fontFamily: 'Instrument Serif, serif', fontSize: '24px', color: '#000' }}>Do you have any dietary restrictions?</div>
              <div className="flex gap-6">
                <button className={`btn-primary ${hasDietary === true ? '' : 'opacity-60'}`} onClick={() => {handleDietary(true); next();}}>Yes</button>
                <button className={`btn-primary ${hasDietary === false ? '' : 'opacity-60'}`} onClick={() => handleDietary(false)}>No</button>
              </div>
            </div>
          </div>
        </div>
        {/* Screen 3: Dietary Text (if yes) */}
        <div className={`absolute inset-0 transition-transform duration-500 ${step === 2 ? 'translate-x-0 opacity-100 z-10' : step < 2 ? 'translate-x-full opacity-0 z-0' : '-translate-x-full opacity-0 z-0'}`}>
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-lg text-gray-700 mb-8 mt-8" style={{ fontFamily: 'Instrument Serif, serif', fontSize: '24px', color: '#000' }}>I want to find a place to eat, that has <span className="text-primary-700">non-peanut food options</span></div>
            <textarea
              className="form-input w-full max-w-md h-24 mb-4"
              placeholder="Vegan, gluten-free, lactose intolerant..."
              value={dietaryText}
              onChange={handleDietaryText}
            />
            {showNext && (
              <button className="mt-2 btn-primary" onClick={next}>Next &rarr;</button>
            )}
            {showGiveMe && (
              <button className="mt-2 underline text-primary-700" onClick={next}>Continue &rarr;</button>
            )}
          </div>
        </div>
        {/* Screen 4: Optional Questions */}
        <div className={`absolute inset-0 transition-transform duration-500 ${step === 3 ? 'translate-x-0 opacity-100 z-10' : step < 3 ? 'translate-x-full opacity-0 z-0' : '-translate-x-full opacity-0 z-0'}`}>
          <div className="flex flex-col items-center justify-center h-full px-8">
            <div className="text-center mb-8">
              <div className="text-lg mb-4" style={{ fontFamily: 'Instrument Serif, serif', fontSize: '24px', color: '#000' }}>
                Want to help me find something even more perfect?
              </div>
              <div className="text-gray-600 text-sm mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                Click on any questions below to add them (optional)
              </div>
            </div>

            {/* Available Questions to Add */}
            {questionsLoading ? (
              <div className="flex justify-center mb-6">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3 justify-center mb-6">
                {availableQuestions
                  .filter(q => !optionalQuestions.find(oq => oq.id === q.id))
                  .map(question => (
                    <button
                      key={question.id}
                      onClick={() => addOptionalQuestion(question.id)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      + {question.text}
                    </button>
                  ))
                }
                {/* Plus button to generate more questions */}
                {availableQuestions.filter(q => !optionalQuestions.find(oq => oq.id === q.id)).length > 0 && (
                  <button
                    onClick={generateMoreQuestions}
                    disabled={questionsLoading}
                    className="px-4 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-full text-sm text-blue-700 transition-colors disabled:opacity-50"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    + More questions
                  </button>
                )}
              </div>
            )}

            {/* Active Questions */}
            <div className="w-full max-w-md space-y-4 mb-8">
              {optionalQuestions.map(question => (
                <div key={question.id} className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {question.text}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={question.answer}
                      onChange={(e) => handleOptionalAnswer(question.id, e.target.value)}
                      placeholder={question.placeholder}
                      className="form-input w-full pr-8"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                    <button
                      onClick={() => removeOptionalQuestion(question.id)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Button */}
            <button 
              className="btn-primary"
              onClick={getRecommendations}
            >
              Give me recommendations &rarr;
            </button>
          </div>
        </div>
        {/* Screen 5: Results */}
        <div className={`absolute inset-0 transition-transform duration-500 ${step === 4 ? 'translate-x-0 opacity-100 z-10' : 'translate-x-full opacity-0 z-0'}`}>
          <div className="flex flex-col items-center justify-center h-full w-full">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Finding Perfect Restaurants</h2>
                <p className="text-gray-600">AI is analyzing your preferences...</p>
              </div>
            ) : results && results.length > 0 ? (
              <div className="w-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Here are some places you might like:</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {results.map(r => (
                    <a key={r.id} href={r.reservationLink} target="_blank" rel="noopener noreferrer" className="block">
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="text-lg font-semibold mb-2">{r.name}</div>
                        <div className="text-gray-600 text-sm mb-1">{r.address}</div>
                        <div className="text-sm text-gray-700 mb-2">{r.cuisine} &bull; {r.priceRange}</div>
                        <div className="text-xs text-gray-500">{r.matchReasoning}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No restaurants found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your preferences to see more options.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreferencesForm