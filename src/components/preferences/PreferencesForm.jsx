import { useState } from 'react'
import EventDetails from './EventDetails'
import DietaryRestrictions from './DietaryRestrictions'
import CuisinePreferences from './CuisinePreferences'
import BudgetRange from './BudgetRange'
import AtmospherePreferences from './AtmospherePreferences'

const PreferencesForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    eventDetails: {},
    dietaryRestrictions: [],
    cuisinePreferences: [],
    budgetRange: '$$',
    atmospherePreferences: [],
    additionalContext: ''
  })

  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const steps = [
    { component: EventDetails, key: 'eventDetails', title: 'Event Details' },
    { component: DietaryRestrictions, key: 'dietaryRestrictions', title: 'Dietary Restrictions' },
    { component: CuisinePreferences, key: 'cuisinePreferences', title: 'Cuisine Preferences' },
    { component: BudgetRange, key: 'budgetRange', title: 'Budget Range' },
    { component: AtmospherePreferences, key: 'atmospherePreferences', title: 'Atmosphere' }
  ]

  const handleStepChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    handleNext()
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Error submitting preferences:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const CurrentStepComponent = steps[currentStep].component
  const currentStepKey = steps[currentStep].key

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm text-gray-500">
            {steps[currentStep].title}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Form content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <CurrentStepComponent
          value={formData[currentStepKey]}
          onChange={(value) => handleStepChange(currentStepKey, value)}
        />

        {/* Additional context field on last step */}
        {currentStep === steps.length - 1 && (
          <div className="mt-8 space-y-4">
            <label className="form-label">
              Additional Context (Optional)
            </label>
            <textarea
              value={formData.additionalContext}
              onChange={(e) => handleStepChange('additionalContext', e.target.value)}
              placeholder="Any specific dishes you're craving, special requirements, or other preferences..."
              className="form-input h-24 resize-none"
            />
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between items-center">
        <div>
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="btn-secondary"
            >
              Back
            </button>
          )}
        </div>

        <div className="flex space-x-3">
          {currentStep < steps.length - 1 && (
            <button
              onClick={handleSkip}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Skip
            </button>
          )}
          
          <button
            onClick={handleNext}
            disabled={isLoading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Finding Restaurants...
              </span>
            ) : currentStep === steps.length - 1 ? (
              'Find Restaurants'
            ) : (
              'Next'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PreferencesForm