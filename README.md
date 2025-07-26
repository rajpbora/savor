# QuickMeet Restaurant Finder

A 4-hour MVP for instant restaurant discovery using AI-powered recommendations. Find the perfect restaurant for your group in seconds with Claude-curated suggestions.

## Features

- **No Sign-up Required**: Direct access to preferences form
- **AI-Powered Matching**: Claude explains why each restaurant matches your preferences  
- **Smart Filtering**: Budget, dietary restrictions, cuisine, and atmosphere preferences
- **Real-time Recommendations**: Get personalized suggestions in seconds
- **Mobile-First Design**: Responsive design that works on all devices

## Tech Stack

- **Frontend**: Vite + React + Tailwind CSS
- **AI**: Anthropic Claude API for intelligent restaurant matching
- **Data**: Mock restaurant data (n8n integration ready)
- **Hosting**: Static hosting compatible (Vercel, Netlify)

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd savor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Anthropic API key:
   ```
   VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## How It Works

1. **Preferences Collection**: Users fill out a simple form with event details, dietary restrictions, cuisine preferences, budget, and atmosphere preferences

2. **AI Processing**: Claude analyzes preferences and scores restaurants based on:
   - Budget constraints
   - Dietary restrictions (critical matching)
   - Atmosphere preferences  
   - Cuisine preferences
   - Event type appropriateness
   - Party size suitability

3. **Results Display**: Get top 5-8 restaurant recommendations with:
   - AI match reasoning explaining why each restaurant fits
   - Match scores (0-100%)
   - Direct reservation links
   - Sort options (best match, highest rated, price)

## API Integration

### Claude API Setup

1. Get your API key from [Anthropic Console](https://console.anthropic.com/)
2. Add it to your `.env` file
3. The app automatically uses Claude for intelligent matching when available
4. Falls back to smart mock recommendations when API key is not configured

### n8n Integration (Optional)

Ready for n8n workflow integration for real restaurant data:

1. Set up n8n workflow for Google Business scraping
2. Add webhook URL to `.env`:
   ```
   VITE_N8N_WEBHOOK_URL=your_n8n_webhook_url_here
   ```

## Project Structure

```
src/
├── components/
│   ├── preferences/     # Form components
│   │   ├── PreferencesForm.jsx
│   │   ├── EventDetails.jsx
│   │   ├── DietaryRestrictions.jsx
│   │   ├── CuisinePreferences.jsx
│   │   ├── BudgetRange.jsx
│   │   └── AtmospherePreferences.jsx
│   └── results/         # Results display
│       ├── RestaurantResults.jsx
│       └── RestaurantCard.jsx
├── utils/
│   ├── claude.js        # Claude API integration
│   └── mockData.js      # Development data
├── types/
│   └── restaurant.js    # Data schemas
└── App.jsx             # Main application
```

## Configuration

### Environment Variables

- `VITE_ANTHROPIC_API_KEY`: Your Claude API key (required for AI features)
- `VITE_N8N_WEBHOOK_URL`: n8n webhook for live restaurant data (optional)
- `VITE_APP_NAME`: Application name
- `VITE_APP_VERSION`: Version number

### Tailwind CSS

Custom design system with:
- Primary color scheme (blue tones)
- Form component styles
- Button variants
- Responsive grid layouts

## Contributing

This is a 4-hour MVP focused on core functionality. Future enhancements:

- Real restaurant APIs integration
- Group voting on recommendations  
- Calendar integration
- Advanced filters (parking, accessibility)
- Machine learning for better matching

## License

MIT License - see LICENSE file for details
