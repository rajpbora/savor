import { useState } from 'react'
import PreferencesForm from './components/preferences/PreferencesForm'
import claudeService from './utils/claude'

function App() {
  const handlePreferencesSubmit = async (formData) => {
    const results = await claudeService.getRestaurantRecommendations(formData)
    return results
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <PreferencesForm onSubmit={handlePreferencesSubmit} />
      </main>
    </div>
  )
}

export default App