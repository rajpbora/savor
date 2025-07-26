// Mock restaurant data for development and testing

export const mockRestaurants = [
  {
    id: '1',
    name: 'The Garden Bistro',
    address: '123 Main St, Downtown',
    cuisine: 'Mediterranean',
    priceRange: '$$',
    rating: 4.5,
    hours: {
      open: '11:00',
      close: '22:00'
    },
    description: 'A cozy Mediterranean restaurant with fresh ingredients and warm atmosphere',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
    reservationLink: 'https://example.com/reserve/garden-bistro',
    matchReasoning: 'Perfect for your casual dinner - excellent Mediterranean cuisine, cozy atmosphere ideal for conversation, and great vegetarian options.',
    matchScore: 92,
    features: ['outdoor seating', 'vegetarian options', 'cozy atmosphere'],
    reviewHighlights: [
      'Great for dates and casual dinners',
      'Excellent vegetarian and vegan options',
      'Beautiful outdoor patio'
    ]
  },
  {
    id: '2',
    name: 'Sakura Ramen House',
    address: '456 Food Street, Midtown',
    cuisine: 'Asian',
    priceRange: '$',
    rating: 4.3,
    hours: {
      open: '12:00',
      close: '23:00'
    },
    description: 'Authentic Japanese ramen with rich broths and fresh noodles',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400',
    reservationLink: 'https://example.com/reserve/sakura-ramen',
    matchReasoning: 'Great budget-friendly option for your group - casual atmosphere, quick service, and delicious Asian cuisine that works well for hangouts.',
    matchScore: 87,
    features: ['quick service', 'casual dining', 'authentic flavors'],
    reviewHighlights: [
      'Best ramen in the city',
      'Great for groups and casual dining',
      'Excellent value for money'
    ]
  },
  {
    id: '3',
    name: 'Rooftop 360',
    address: '789 Sky Ave, Financial District',
    cuisine: 'American',
    priceRange: '$$$',
    rating: 4.7,
    hours: {
      open: '17:00',
      close: '01:00'
    },
    description: 'Upscale rooftop dining with panoramic city views and craft cocktails',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400',
    reservationLink: 'https://example.com/reserve/rooftop-360',
    matchReasoning: 'Stunning rooftop venue perfect for special occasions - upscale atmosphere, amazing city views, and excellent for romantic dinners or impressive business meetings.',
    matchScore: 95,
    features: ['rooftop dining', 'city views', 'craft cocktails', 'upscale atmosphere'],
    reviewHighlights: [
      'Breathtaking views of the city',
      'Perfect for special occasions',
      'Excellent cocktail menu'
    ]
  },
  {
    id: '4',
    name: 'Pasta Prima',
    address: '321 Little Italy, Westside',
    cuisine: 'Italian',
    priceRange: '$$',
    rating: 4.4,
    hours: {
      open: '16:00',
      close: '22:00'
    },
    description: 'Traditional Italian restaurant with handmade pasta and family recipes',
    image: 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=400',
    reservationLink: 'https://example.com/reserve/pasta-prima',
    matchReasoning: 'Classic Italian comfort food in a warm, family-friendly setting - perfect for your group size and offers excellent vegetarian pasta options.',
    matchScore: 89,
    features: ['family-friendly', 'handmade pasta', 'warm atmosphere'],
    reviewHighlights: [
      'Authentic Italian flavors',
      'Great for families and groups',
      'Generous portions'
    ]
  },
  {
    id: '5',
    name: 'The Jazz Lounge',
    address: '654 Music Row, Arts District',
    cuisine: 'American',
    priceRange: '$$$',
    rating: 4.6,
    hours: {
      open: '18:00',
      close: '02:00'
    },
    description: 'Sophisticated dining with live jazz music and creative cocktails',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400',
    reservationLink: 'https://example.com/reserve/jazz-lounge',
    matchReasoning: 'Perfect for an evening with live entertainment - sophisticated atmosphere with live jazz music, great for dates or special celebrations.',
    matchScore: 91,
    features: ['live music', 'sophisticated atmosphere', 'craft cocktails', 'late night dining'],
    reviewHighlights: [
      'Amazing live jazz performances',
      'Sophisticated dining experience',
      'Great cocktail selection'
    ]
  }
]

// Function to simulate API delay
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))