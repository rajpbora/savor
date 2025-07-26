import { useState } from 'react'

const DietaryRestrictions = ({ value, onChange }) => {
  const [selected, setSelected] = useState(value || [])

  const restrictions = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten-free', label: 'Gluten-free' },
    { id: 'halal', label: 'Halal' },
    { id: 'kosher', label: 'Kosher' },
    { id: 'nut-allergies', label: 'Nut allergies' },
    { id: 'none', label: 'None' }
  ]

  const handleToggle = (restrictionId) => {
    let updated
    if (restrictionId === 'none') {
      updated = selected.includes('none') ? [] : ['none']
    } else {
      updated = selected.filter(id => id !== 'none')
      if (selected.includes(restrictionId)) {
        updated = updated.filter(id => id !== restrictionId)
      } else {
        updated = [...updated, restrictionId]
      }
    }
    
    setSelected(updated)
    onChange(updated)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Dietary Restrictions</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {restrictions.map(restriction => (
          <label
            key={restriction.id}
            className={`
              flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all
              ${selected.includes(restriction.id)
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <input
              type="checkbox"
              checked={selected.includes(restriction.id)}
              onChange={() => handleToggle(restriction.id)}
              className="sr-only"
            />
            <span className={`
              w-4 h-4 rounded border-2 mr-3 flex items-center justify-center
              ${selected.includes(restriction.id)
                ? 'border-primary-500 bg-primary-500'
                : 'border-gray-300'
              }
            `}>
              {selected.includes(restriction.id) && (
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {restriction.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default DietaryRestrictions