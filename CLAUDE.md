# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**QuickMeet Restaurant Finder** - A 4-hour MVP for instant restaurant discovery using AI-powered recommendations. This is a direct-access web application that collects user preferences through a simple form and provides Claude-curated restaurant recommendations with reservation links.

## Tech Stack & Architecture

- **Frontend**: Vite.js + Next.js with Tailwind CSS
- **Data Pipeline**: n8n workflows for Google Business scraping and review extraction
- **AI Integration**: Anthropic Claude API for restaurant scoring and recommendation reasoning
- **Hosting**: Static hosting (Vercel/Netlify)
- **No Authentication**: Direct access approach, single page application

## Core Components Architecture

### Data Flow
1. User preferences collection → Form interface
2. n8n workflow → Google Business scraping + review analysis
3. Claude API → Preference matching and reasoning generation
4. Results display → Restaurant cards with AI explanations

### Key Data Structures
- **Restaurant Data**: Name, address, cuisine, price range, hours, rating, review themes
- **User Preferences**: Event details, dietary restrictions, cuisine preferences, budget, atmosphere vibes
- **AI Scoring**: Claude-generated match scores with explanations

## Development Commands

```bash
# Project setup
npm create vite@latest . -- --template react
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Development
npm run dev

# Build
npm run build

# Preview production build
npm run preview
```

## Core Requirements Implementation

### Preferences Form (Hour 1 Priority)
- Date/time picker with defaults
- Number input for party size (1-20)
- Multi-select components for dietary restrictions and cuisine
- Budget slider ($-$$$$)
- Atmosphere checkboxes (10+ vibe options)
- Optional AI enhancement questions with skip/continue flow

### n8n Workflow Setup (Hour 2 Priority)
- Google Business API scraping workflow
- Review extraction and sentiment analysis
- Restaurant data normalization
- Real-time availability checking

### Claude Integration (Hour 3 Priority)
- Prompt engineering for preference-to-restaurant matching
- Restaurant scoring system via Claude API
- Response parsing for recommendations with reasoning
- Fallback scoring system for API limits

### Results Display (Hour 4 Priority)
- Restaurant card components with AI reasoning
- Top 5-8 recommendations
- Sort options: Best match, closest, highest rated
- Direct reservation links to Google Business listings

## Key Features

- **No Sign-up Required**: Direct access to preference form
- **AI-Powered Matching**: Claude explains why each restaurant matches user preferences
- **Real-time Data**: n8n scraping ensures current restaurant information
- **Mobile-First Design**: Responsive Tailwind components
- **Skip-Friendly UX**: Users can skip enhanced questions and proceed

## Development Timeline Priorities

1. **Hour 1**: Vite + Next.js setup, core form components, Tailwind foundation
2. **Hour 2**: n8n Google Business workflow, test data extraction
3. **Hour 3**: Claude API integration, prompt engineering, parsing logic
4. **Hour 4**: Results components, full flow integration, responsive testing

## Important Notes

- Keep restaurant data structure simple and flexible
- Focus only on core preference → recommendation flow
- Prepare fallback systems for n8n complexity and Claude API limits
- No authentication, user accounts, or complex group management in MVP
- No in-app booking - direct links to restaurant websites only