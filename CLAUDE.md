# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start development server:**
```bash
npm run dev
```

**Start frontend only (if worker issues):**
```bash
npm run dev:frontend
```

**Build for production:**
```bash
npm run build
```

**Build worker separately:**
```bash
npm run build:worker
```

**Lint code:**
```bash
npm run lint
```

**Type checking and deployment check:**
```bash
npm run check
```

**Generate Cloudflare types:**
```bash
npm run cf-typegen
```

## Environment Setup

1. **Copy environment template:**
```bash
cp .env.example .env
```

2. **Required Environment Variables:**
   - `APIFY_API_TOKEN`: Get from https://apify.com/account#/integrations
   - `CLOUDFLARE_API_TOKEN`: Get from Cloudflare dashboard
   - `INSTAGRAM_SESSION_*`: Browser session cookies for Instagram accounts

3. **Get Instagram Session Cookies:**
   - Log into Instagram in browser
   - Open Developer Tools (F12)
   - Go to Application > Cookies > instagram.com
   - Copy the `sessionid` value

4. **Set up Cloudflare D1 Database:**
```bash
npx wrangler d1 create leadhunter-db
npx wrangler d1 execute leadhunter-db --file=./migrations/1.sql
```

## Architecture Overview

This is a **Cloudflare Pages + Workers** application built for lead generation and social media scraping. The app uses a **dual-build system**:

- **Frontend**: React SPA built with Vite, deployed as static assets
- **Backend**: Hono-based worker that handles API requests and integrates with Apify for scraping

### Key Components

**Worker Layer (`src/worker/index.ts`):**
- Hono API server with CORS enabled
- Cloudflare D1 database integration
- Apify client for YouTube/Instagram scraping
- Lead qualification and export functionality

**React App (`src/react-app/`):**
- Single-page application with React Router
- Three main sections: Search form, Leads table, History panel
- Tailwind CSS with custom gradient theme

**Database Schema (`migrations/1.sql`):**
- `leads` table: stores scraped lead data
- `scraping_runs` table: tracks scraping operations and status

**Shared Types (`src/shared/types.ts`):**
- Zod schemas for type validation
- API request/response interfaces
- Platform configuration constants

### Build Configuration

- **Vite config** handles React app bundling with Cloudflare Pages plugin
- **Webpack config** bundles the worker separately for Cloudflare Workers runtime
- **Multiple TypeScript configs** for different build targets (app, node, worker)
- Path alias `@/` maps to `src/` directory

### Deployment

Uses Cloudflare Wrangler for deployment:
- D1 database binding configured in `wrangler.jsonc`
- Assets served as SPA with fallback routing
- Environment requires `APIFY_API_TOKEN` for scraping functionality

### DM Functionality

**New Features Added:**
- DM campaign management with templates
- Instagram session management for automation
- Personalized message templates with variables
- Batch DM sending with rate limiting
- Message status tracking and analytics

**API Endpoints:**
- `GET /api/campaigns` - List DM campaigns
- `POST /api/campaigns` - Create new campaign
- `POST /api/campaigns/:id/send` - Send campaign DMs
- `GET /api/campaigns/:id/messages` - Get campaign messages
- `GET /api/sessions` - List Instagram sessions
- `POST /api/sessions` - Add Instagram session

**Database Tables:**
- `dm_campaigns` - Campaign metadata
- `dm_messages` - Individual DM records
- `instagram_sessions` - Session management

### Testing & Debugging

The worker includes mock data generation for testing when:
- Apify scraping fails
- No valid session IDs provided for Instagram
- Network or API errors occur
- DM sending simulation (90% success rate for testing)

**Known Issues:**
- Development server configuration needs fixing for local testing
- Real Instagram DM actors need to be implemented (currently simulated)
- Rate limiting and session rotation should be enhanced