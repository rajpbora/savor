import { useState } from 'react'

const BudgetRange = ({ value, onChange }) => {
  const [selectedBudget, setSelectedBudget] = useState(value || '$$')

  const budgetOptions = [
    { value: '$', label: '$', description: 'Budget-friendly ($10-20)' },
    { value: '$$', label: '$$', description: 'Moderate ($20-40)' },
    { value: '$$$', label: '$$$', description: 'Upscale ($40-70)' },
    { value: '$$$$', label: '$$$$', description: 'Fine dining ($70+)' }
  ]

  const handleBudgetChange = (budget) => {
    setSelectedBudget(budget)
    onChange(budget)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Budget Range</h3>
      
      <div className="space-y-3">
        {budgetOptions.map(option => (
          <label
            key={option.value}
            className={`
              flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all
              ${selectedBudget === option.value
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <input
              type="radio"
              name="budget"
              value={option.value}
              checked={selectedBudget === option.value}
              onChange={() => handleBudgetChange(option.value)}
              className="sr-only"
            />
            <span className={`
              w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center
              ${selectedBudget === option.value
                ? 'border-primary-500'
                : 'border-gray-300'
              }
            `}>
              {selectedBudget === option.value && (
                <span className="w-2.5 h-2.5 rounded-full bg-primary-500"></span>
              )}
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">
                  {option.label}
                </span>
                <span className="text-sm text-gray-600">
                  {option.description}
                </span>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}

export default BudgetRange