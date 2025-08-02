#!/bin/bash

echo "🚀 Deploying LeadHunter to Cloudflare..."

# Build the worker
npm run build:worker

# Build the frontend
npm run build

# Deploy to Cloudflare Pages + Workers
npx wrangler pages deploy dist/client --project-name leadhunter --compatibility-date 2025-06-17

# Deploy the worker
npx wrangler deploy

echo "✅ Deployment complete!"
echo "🌐 Your app will be available at: https://leadhunter.pages.dev"
echo ""
echo "📋 Setup Instructions for Client:"
echo "1. Go to the deployed URL"
echo "2. Navigate to 'DM Campaigns' tab"
echo "3. Click 'Add Session' and paste Instagram cookies"
echo "4. Go to 'Search' tab and start scraping"
echo "5. Select leads and create DM campaign"