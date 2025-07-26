import Anthropic from '@anthropic-ai/sdk'
import { mockRestaurants } from './mockData'

class ClaudeService {
  constructor() {
    this.client = null
    this.initializeClient()
  }

  initializeClient() {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
    
    if (!apiKey || apiKey === 'your_anthropic_api_key_here') {
      console.warn('⚠️ Claude API key not configured. Using mock data.')
      return
    }

    try {
      this.client = new Anthropic({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Note: In production, API calls should go through your backend
      })
    } catch (error) {
      console.error('Failed to initialize Claude client:', error)
    }
  }

  generateRestaurantRecommendationPrompt(preferences, restaurants) {
    const {
      eventDetails,
      dietaryRestrictions,
      cuisinePreferences,
      budgetRange,
      atmospherePreferences,
      additionalContext
    } = preferences

    return `You are a restaurant recommendation expert. Based on the user's preferences, analyze and score the following restaurants.

USER PREFERENCES:
- Event: ${eventDetails.eventType} for ${eventDetails.partySize} people
- Date & Time: ${eventDetails.date} at ${eventDetails.time}
- Budget Range: ${budgetRange}
- Dietary Restrictions: ${dietaryRestrictions.length ? dietaryRestrictions.join(', ') : 'None'}
- Cuisine Preferences: ${cuisinePreferences.length ? cuisinePreferences.join(', ') : 'Open to all'}
- Atmosphere: ${atmospherePreferences.length ? atmospherePreferences.join(', ') : 'No specific preference'}
- Additional Context: ${additionalContext || 'None'}

RESTAURANTS TO ANALYZE:
${restaurants.map((r, i) => `
${i + 1}. ${r.name}
   - Cuisine: ${r.cuisine}
   - Price: ${r.priceRange}
   - Rating: ${r.rating}/5
   - Features: ${r.features?.join(', ') || 'N/A'}
   - Description: ${r.description}
   - Hours: ${r.hours.open} - ${r.hours.close}
`).join('')}

For each restaurant, provide:
1. A match score (0-100) based on how well it fits the user's preferences
2. A 1-2 sentence explanation of why it matches (focus on specific preferences met)

Format your response as JSON:
{
  "recommendations": [
    {
      "restaurantIndex": 0,
      "matchScore": 85,
      "reasoning": "Perfect for your casual dinner - excellent Mediterranean cuisine matches your preferences, cozy atmosphere ideal for conversation, and great vegetarian options for your dietary needs."
    }
  ]
}

Focus on matching:
- Budget constraints
- Dietary restrictions (critical)
- Atmosphere preferences
- Cuisine preferences
- Event type appropriateness
- Party size suitability`
  }

  async generateOptionalQuestions(excludedQuestions = [], count = 3) {
    const prompt = `You are a food finder assistant. Generate a light-hearted but grounded and direct question to gauge the preferences of the user. These questions should not be related to cuisine, budget, or dietary preferences. Don't make the question related to these previous ones: "${excludedQuestions.join(', ')}"

Here are some example questions for inspiration:

text: 'What atmosphere are you looking for?', placeholder: 'Casual, romantic, family-friendly, lively...',
text: 'What's the occasion?', placeholder: 'Date night, business meeting, celebration...',
text: 'Who are you dining with?', placeholder: 'Solo, couple, family, large group...',
text: 'Any specific cuisine preferences?', placeholder: 'Italian, Asian, Mexican, local specialties...',
text: 'Any special features you want?', placeholder: 'Outdoor seating, live music, bar area...'

Generate exactly ${count} unique questions in this JSON format:
{
  "questions": [
    {
      "id": "unique_id",
      "text": "Question text?",
      "placeholder": "Example answers..."
    }
  ]
}

Make sure each question is different from the examples and from any excluded questions. Focus on aspects like timing preferences, ambiance, special needs, location preferences, or dining style preferences.`

    // For development, return mock questions if Claude API is not available
    if (!this.client) {
      return this.getMockOptionalQuestions(excludedQuestions)
    }

    try {
      const response = await this.client.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1000,
        temperature: 0.8,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })

      const content = response.content[0].text
      const result = JSON.parse(content)
      return result.questions
    } catch (error) {
      console.error('Claude API error generating questions:', error)
      console.log('Falling back to mock questions')
      return this.getMockOptionalQuestions(excludedQuestions, count)
    }
  }

  getMockOptionalQuestions(excludedQuestions = [], count = 3) {
    const allMockQuestions = [
      { id: 'atmosphere', text: 'What atmosphere are you looking for?', placeholder: 'Casual, romantic, family-friendly, lively...' },
      { id: 'occasion', text: 'What\'s the occasion?', placeholder: 'Date night, business meeting, celebration...' },
      { id: 'group', text: 'Who are you dining with?', placeholder: 'Solo, couple, family, large group...' },
      { id: 'features', text: 'Any special features you want?', placeholder: 'Outdoor seating, live music, bar area...' },
      { id: 'timing', text: 'What time of day works best?', placeholder: 'Lunch, early dinner, late night...' },
      { id: 'location', text: 'Any location preferences?', placeholder: 'Downtown, waterfront, quiet neighborhood...' },
      { id: 'noise', text: 'How do you feel about noise level?', placeholder: 'Quiet and intimate, lively and social...' },
      { id: 'service', text: 'What service style do you prefer?', placeholder: 'Quick and casual, attentive full service...' },
      { id: 'parking', text: 'Any parking preferences?', placeholder: 'Valet, street parking, parking garage...' }
    ]

    // Filter out excluded questions and return the requested count
    const availableQuestions = allMockQuestions.filter(q => 
      !excludedQuestions.includes(q.text) && !excludedQuestions.includes(q.id)
    )

    return availableQuestions.slice(0, count)
  }

  async getRestaurantRecommendations(preferences) {
    // For development, use mock data with simulated Claude reasoning
    if (!this.client) {
      return this.getMockRecommendations(preferences)
    }

    try {
      const restaurants = mockRestaurants
      const prompt = this.generateRestaurantRecommendationPrompt(preferences, restaurants)

      const response = await this.client.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 2000,
        temperature: 0.7,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })

      const content = response.content[0].text
      const recommendations = JSON.parse(content)

      // Apply Claude's recommendations to our restaurant data
      return restaurants.map((restaurant, index) => {
        const recommendation = recommendations.recommendations.find(
          r => r.restaurantIndex === index
        )

        return {
          ...restaurant,
          matchScore: recommendation?.matchScore || 50,
          matchReasoning: recommendation?.reasoning || 'Good option for your preferences.'
        }
      }).sort((a, b) => b.matchScore - a.matchScore)

    } catch (error) {
      console.error('Claude API error:', error)
      console.log('Falling back to mock recommendations')
      return this.getMockRecommendations(preferences)
    }
  }

  getMockRecommendations(preferences) {
    // Simulate Claude's intelligent matching with mock data
    return mockRestaurants.map(restaurant => {
      let score = 60 // Base score
      let reasoning = []

      // Budget matching
      const budgetOrder = ['$', '$$', '$$$', '$$$$']
      const userBudgetIndex = budgetOrder.indexOf(preferences.budgetRange)
      const restaurantBudgetIndex = budgetOrder.indexOf(restaurant.priceRange)
      
      if (restaurantBudgetIndex <= userBudgetIndex) {
        score += 15
        if (restaurantBudgetIndex === userBudgetIndex) {
          reasoning.push(`perfect ${restaurant.priceRange} budget match`)
        } else {
          reasoning.push(`budget-friendly ${restaurant.priceRange} option`)
        }
      } else {
        score -= 10
      }

      // Cuisine matching
      if (preferences.cuisinePreferences.includes('all') || preferences.cuisinePreferences.length === 0) {
        score += 10
      } else if (preferences.cuisinePreferences.some(cuisine => 
        restaurant.cuisine.toLowerCase().includes(cuisine.toLowerCase())
      )) {
        score += 20
        reasoning.push(`excellent ${restaurant.cuisine} cuisine`)
      }

      // Atmosphere matching
      if (preferences.atmospherePreferences.length > 0) {
        const matchingFeatures = preferences.atmospherePreferences.filter(pref =>
          restaurant.features?.some(feature => 
            feature.toLowerCase().includes(pref.toLowerCase()) ||
            pref.toLowerCase().includes(feature.toLowerCase())
          )
        )
        
        if (matchingFeatures.length > 0) {
          score += matchingFeatures.length * 5
          reasoning.push(`${matchingFeatures.join(' and ')} atmosphere`)
        }
      }

      // Event type matching
      const eventBonus = {
        'casual': restaurant.priceRange === '$' || restaurant.priceRange === '$$' ? 10 : 0,
        'date': restaurant.features?.includes('romantic') ? 15 : 5,
        'business': restaurant.priceRange === '$$$' || restaurant.priceRange === '$$$$' ? 10 : 0,
        'hangout': restaurant.features?.includes('casual') ? 10 : 5
      }
      score += eventBonus[preferences.eventDetails.eventType] || 0

      // Party size consideration
      if (preferences.eventDetails.partySize <= 4) {
        score += 5
        reasoning.push(`perfect for groups of ${preferences.eventDetails.partySize}`)
      }

      // Rating bonus
      score += Math.floor(restaurant.rating * 2)

      // Cap the score
      score = Math.min(100, Math.max(30, score))

      const finalReasoning = reasoning.length > 0 
        ? `Perfect for your ${preferences.eventDetails.eventType} - ${reasoning.join(', ')}.`
        : `Good option for your ${preferences.eventDetails.eventType} event.`

      return {
        ...restaurant,
        matchScore: score,
        matchReasoning: finalReasoning
      }
    }).sort((a, b) => b.matchScore - a.matchScore)
  }
}

export default new ClaudeService()