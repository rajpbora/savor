import { useState } from 'react'

const AtmospherePreferences = ({ value, onChange }) => {
  const [selected, setSelected] = useState(value || [])

  const vibes = [
    { id: 'live-music', label: 'Live Music' },
    { id: 'quiet', label: 'Quiet/Conversation-friendly' },
    { id: 'outdoor', label: 'Outdoor Seating' },
    { id: 'romantic', label: 'Romantic' },
    { id: 'casual', label: 'Casual' },
    { id: 'upscale', label: 'Upscale' },
    { id: 'family-friendly', label: 'Family-friendly' },
    { id: 'bar-scene', label: 'Bar Scene' },
    { id: 'rooftop', label: 'Rooftop' },
    { id: 'cozy', label: 'Cozy' }
  ]

  const handleToggle = (vibeId) => {
    const updated = selected.includes(vibeId)
      ? selected.filter(id => id !== vibeId)
      : [...selected, vibeId]
    
    setSelected(updated)
    onChange(updated)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Atmosphere Preferences</h3>
      <p className="text-sm text-gray-600">Select all that apply</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {vibes.map(vibe => (
          <label
            key={vibe.id}
            className={`
              flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all
              ${selected.includes(vibe.id)
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <input
              type="checkbox"
              checked={selected.includes(vibe.id)}
              onChange={() => handleToggle(vibe.id)}
              className="sr-only"
            />
            <span className={`
              w-4 h-4 rounded border-2 mr-3 flex items-center justify-center
              ${selected.includes(vibe.id)
                ? 'border-primary-500 bg-primary-500'
                : 'border-gray-300'
              }
            `}>
              {selected.includes(vibe.id) && (
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {vibe.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default AtmospherePreferences