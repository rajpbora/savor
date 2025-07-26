# Restaurant Finder MVP - Product Requirements Document

## Product Overview

**Product Name:** QuickMeet Restaurant Finder  
**Development Timeline:** 4 hours  
**Target:** Simple demo/prototype for instant restaurant discovery based on user preferences

## Problem Statement

Finding the right restaurant that matches your preferences and group size is time-consuming. Users need a quick way to get personalized restaurant recommendations without complex setup.

## Solution

A direct-access web application that collects basic preferences through a simple form and provides AI-curated restaurant recommendations with reservation links.

## Core User Flow

1. **Direct Access** → No sign-up required
2. **Preferences Collection** → Simple questionnaire
3. **AI Processing** → Match preferences with scraped restaurant data
4. **Results Display** → Curated list with reasoning and reservation links

## Detailed Requirements

### 1. Preferences Collection Interface

#### Required Fields:
**Event Details:**
- Date & time picker (default: current date/time)
- Number of people: Number input (1-20)
- Event type dropdown: Date, Hangout, Business, Casual (default: Casual)

**Dining Preferences:**
- Dietary restrictions: Multi-select checkboxes (Vegetarian, Vegan, Gluten-free, Halal, Kosher, Nut allergies, None)
- Cuisine preferences: Multi-select (Italian, Mexican, Asian, American, Mediterranean, Indian, French, All/Open)
- Budget range: Slider ($, $$, $$$, $$$$)

**Atmosphere Preferences:**
- Vibe checkboxes: Live music, Quiet/conversation-friendly, Outdoor seating, Romantic, Casual, Upscale, Family-friendly, Bar scene, Rooftop, Cozy

**Optional:**
- Free text prompt for additional context

#### Enhanced AI Questions (Optional):
- "How important is proximity vs. food quality?" (slider)
- "Prefer new experiences or tried-and-true favorites?"
- "How flexible is your timing?" (very/somewhat/not at all)
- "Any specific dishes you're craving?"
- **Skip/Continue buttons** available at any point

### 2. Restaurant Discovery Engine

#### Data Requirements:
- **n8n workflow:** Scrape Google Business results and reviews
- **Real-time data:** Restaurant name, address, cuisine, price range, hours, rating
- **Review analysis:** Extract key themes and sentiment from Google reviews
- **Location data:** Address and basic proximity calculation

#### AI Matching with Claude:
- **Prompt engineering:** Structure user preferences into Claude prompt
- **Filter logic:** Open during event time, dietary restrictions, budget range  
- **Scoring system:** Use Claude to score restaurants against user preferences
- **Reasoning generation:** Claude explains why each restaurant matches

### 3. Results Display

#### Restaurant Card Format:
- **Restaurant name & image**
- **Basic location info**
- **Price range & cuisine type**
- **AI match reasoning:** "Perfect for your casual hangout - cozy atmosphere, great reviews mention it's ideal for groups of 4, excellent vegetarian options"
- **Key details:** Google rating, hours, brief description from reviews
- **Reservation button:** Direct link to restaurant website/Google Business listing

#### List Features:
- **Top 5-8 recommendations**
- **Sort options:** Best match, closest, highest rated
- **Map view toggle** (if time permits)

## Technical Requirements

### Frontend Stack:
- **Vite.js + Next.js** for fast development and hot reload
- **Tailwind CSS** for rapid styling
- **No authentication** - direct access to form
- **Single page application** approach

### Data Pipeline:
- **n8n workflows** for Google Business scraping
- **Google Reviews extraction** via n8n
- **Claude API integration** for preference matching and reasoning
- **Static hosting** (Vercel/Netlify)

### AI Integration:
- **Anthropic Claude API** for restaurant scoring and recommendation reasoning
- **Prompt engineering** to structure user preferences into effective prompts
- **Response parsing** to extract scores and explanations

## Success Metrics (Post-MVP)
- User completes full preference flow: >80%
- User clicks on reservation link: >30%
- Average session time: 3-5 minutes
- User returns within 7 days: >20%

## Out of Scope (V1)
- User authentication/accounts
- Complex group management
- In-app reservation booking
- User reviews/ratings
- Social features
- Advanced filtering
- Mobile app
- Payment integration

## Development Priorities (4-hour timeline)

### Hour 1: Setup & Core UI
- Vite + Next.js project setup
- Basic preferences form components
- Tailwind CSS styling foundation

### Hour 2: n8n Workflow & Data
- n8n workflow for Google Business scraping
- Test data extraction and formatting
- Basic restaurant data structure

### Hour 3: Claude Integration
- Claude API integration
- Prompt engineering for restaurant matching
- Response parsing and display logic

### Hour 4: Results & Polish
- Results display components
- Complete user flow integration
- Basic responsive design testing

## Risk Mitigation
- **n8n complexity:** Start with simple Google Business scraping, expand if time allows
- **Claude API limits:** Prepare fallback simple scoring system
- **Data structure:** Keep restaurant data format simple and flexible
- **Feature creep:** Focus only on core preference → recommendation flow

## Future Enhancements (Post-MVP)
- Real restaurant APIs integration
- Machine learning for better matching
- Group voting on recommendations
- Calendar integration
- Favorite restaurants
- Price alerts and deals
- Advanced filters (parking, accessibility)
- Integration with delivery apps for backup options