const RestaurantCard = ({ restaurant }) => {
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      )
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-fill">
              <stop offset="50%" stopColor="currentColor"/>
              <stop offset="50%" stopColor="#e5e7eb"/>
            </linearGradient>
          </defs>
          <path fill="url(#half-fill)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      )
    }

    return stars
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Restaurant Image */}
      <div className="h-48 bg-gray-200 relative">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400'
          }}
        />
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-sm font-semibold">
          {restaurant.priceRange}
        </div>
      </div>

      <div className="p-6">
        {/* Restaurant Name & Basic Info */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {restaurant.name}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{restaurant.address}</p>
          
          <div className="flex items-center justify-between">
            <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
              {restaurant.cuisine}
            </span>
            <div className="flex items-center space-x-1">
              {renderStars(restaurant.rating)}
              <span className="text-sm text-gray-600 ml-1">
                ({restaurant.rating})
              </span>
            </div>
          </div>
        </div>

        {/* AI Match Reasoning */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-blue-900 mb-1">
                AI Match: {restaurant.matchScore}%
              </p>
              <p className="text-sm text-blue-800">
                {restaurant.matchReasoning}
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        {restaurant.features && restaurant.features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {restaurant.features.map((feature, index) => (
                <span 
                  key={index}
                  className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Hours */}
        <div className="mb-4 text-sm text-gray-600">
          <span className="font-medium">Hours:</span> {restaurant.hours.open} - {restaurant.hours.close}
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-6">
          {restaurant.description}
        </p>

        {/* Reservation Button */}
        <a
          href={restaurant.reservationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full btn-primary text-center block"
        >
          Make Reservation
        </a>
      </div>
    </div>
  )
}

export default RestaurantCard