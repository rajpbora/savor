import { useState } from 'react'
import PreferencesForm from './components/preferences/PreferencesForm'
import RestaurantResults from './components/results/RestaurantResults'

function App() {
  const [preferences, setPreferences] = useState(null)
  const [currentStep, setCurrentStep] = useState('preferences')

  const handlePreferencesSubmit = (formData) => {
    setPreferences(formData)
    setCurrentStep('results')
  }

  const handleBackToPreferences = () => {
    setCurrentStep('preferences')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            QuickMeet Restaurant Finder
          </h1>
          <p className="text-gray-600 mt-2">
            Find the perfect restaurant for your group in seconds
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {currentStep === 'preferences' && (
          <PreferencesForm onSubmit={handlePreferencesSubmit} />
        )}
        
        {currentStep === 'results' && (
          <RestaurantResults 
            preferences={preferences}
            onBackToPreferences={handleBackToPreferences}
          />
        )}
      </main>
    </div>
  )
}

export default App