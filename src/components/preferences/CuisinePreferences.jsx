import { useState } from 'react'

const CuisinePreferences = ({ value, onChange }) => {
  const [selected, setSelected] = useState(value || [])

  const cuisines = [
    { id: 'italian', label: 'Italian' },
    { id: 'mexican', label: 'Mexican' },
    { id: 'asian', label: 'Asian' },
    { id: 'american', label: 'American' },
    { id: 'mediterranean', label: 'Mediterranean' },
    { id: 'indian', label: 'Indian' },
    { id: 'french', label: 'French' },
    { id: 'all', label: 'All/Open' }
  ]

  const handleToggle = (cuisineId) => {
    let updated
    if (cuisineId === 'all') {
      updated = selected.includes('all') ? [] : ['all']
    } else {
      updated = selected.filter(id => id !== 'all')
      if (selected.includes(cuisineId)) {
        updated = updated.filter(id => id !== cuisineId)
      } else {
        updated = [...updated, cuisineId]
      }
    }
    
    setSelected(updated)
    onChange(updated)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Cuisine Preferences</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {cuisines.map(cuisine => (
          <label
            key={cuisine.id}
            className={`
              flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all
              ${selected.includes(cuisine.id)
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <input
              type="checkbox"
              checked={selected.includes(cuisine.id)}
              onChange={() => handleToggle(cuisine.id)}
              className="sr-only"
            />
            <span className={`
              w-4 h-4 rounded border-2 mr-3 flex items-center justify-center
              ${selected.includes(cuisine.id)
                ? 'border-primary-500 bg-primary-500'
                : 'border-gray-300'
              }
            `}>
              {selected.includes(cuisine.id) && (
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {cuisine.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default CuisinePreferences