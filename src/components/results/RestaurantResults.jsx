import { useState, useEffect } from 'react'
import RestaurantCard from './RestaurantCard'
import { delay } from '../../utils/mockData'
import claudeService from '../../utils/claude'

const RestaurantResults = ({ preferences, onBackToPreferences }) => {
  const [restaurants, setRestaurants] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState('best-match')
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Simulate thinking time
        await delay(1500)
        
        // Get AI-powered restaurant recommendations
        const recommendedRestaurants = await claudeService.getRestaurantRecommendations(preferences)
        setRestaurants(recommendedRestaurants)
        
      } catch (err) {
        setError('Failed to find restaurants. Please try again.')
        console.error('Error fetching restaurants:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRestaurants()
  }, [preferences])


  const sortRestaurants = (restaurants, sortType) => {
    const sorted = [...restaurants]
    
    switch (sortType) {
      case 'best-match':
        return sorted.sort((a, b) => b.matchScore - a.matchScore)
      case 'highest-rated':
        return sorted.sort((a, b) => b.rating - a.rating)
      case 'price-low':
        const priceOrder = ['$', '$$', '$$$', '$$$$']
        return sorted.sort((a, b) => priceOrder.indexOf(a.priceRange) - priceOrder.indexOf(b.priceRange))
      case 'price-high':
        const priceOrderDesc = ['$$$$', '$$$', '$$', '$']
        return sorted.sort((a, b) => priceOrderDesc.indexOf(a.priceRange) - priceOrderDesc.indexOf(b.priceRange))
      default:
        return sorted
    }
  }

  const sortedRestaurants = sortRestaurants(restaurants, sortBy)

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Finding Perfect Restaurants</h2>
        <p className="text-gray-600">AI is analyzing your preferences...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button onClick={onBackToPreferences} className="btn-primary">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Perfect Restaurants for You
          </h2>
          <p className="text-gray-600 mt-1">
            Found {sortedRestaurants.length} restaurants matching your preferences
          </p>
        </div>
        <button
          onClick={onBackToPreferences}
          className="btn-secondary"
        >
          New Search
        </button>
      </div>

      {/* Sort Controls */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort by:
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="form-input w-48"
        >
          <option value="best-match">Best Match</option>
          <option value="highest-rated">Highest Rated</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Results Grid */}
      {sortedRestaurants.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No restaurants found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your preferences to see more options.
          </p>
          <button onClick={onBackToPreferences} className="btn-primary">
            Modify Search
          </button>
        </div>
      )}
    </div>
  )
}

export default RestaurantResults