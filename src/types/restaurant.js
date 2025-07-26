// Restaurant data type definitions

export const RestaurantSchema = {
  id: 'string',
  name: 'string',
  address: 'string',
  cuisine: 'string',
  priceRange: 'string', // $, $$, $$$, $$$$
  rating: 'number', // 0-5
  hours: 'object',
  description: 'string',
  image: 'string',
  reservationLink: 'string',
  matchReasoning: 'string', // AI-generated explanation
  matchScore: 'number', // 0-100
  features: 'array', // ['outdoor seating', 'live music', etc.]
  reviewHighlights: 'array' // Key points from reviews
}

export const PreferencesSchema = {
  eventDetails: {
    date: 'string',
    time: 'string',
    partySize: 'number',
    eventType: 'string'
  },
  dietaryRestrictions: 'array',
  cuisinePreferences: 'array',
  budgetRange: 'string',
  atmospherePreferences: 'array',
  additionalContext: 'string'
}