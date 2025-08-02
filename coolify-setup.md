# Coolify Deployment Guide for LeadHunter

## 🚀 Deploy to Coolify (Your VPS)

### Step 1: Push to GitHub

```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial LeadHunter deployment"

# Add your GitHub remote
git remote add origin https://github.com/yourusername/leadhunter.git
git push -u origin main
```

### Step 2: Coolify Configuration

1. **Login to your Coolify dashboard**
2. **Create New Project** → "LeadHunter"
3. **Add GitHub Repository**: Connect your LeadHunter repo
4. **Set Build Settings**:
   - Build Command: `npm run build`
   - Start Command: `serve -s dist/client -l 3000`
   - Port: `3000`

### Step 3: Environment Variables in Coolify

Add these environment variables in Coolify:

```
APIFY_API_TOKEN=your_apify_token_here
NODE_ENV=production
```

### Step 4: Deploy

1. **Click Deploy** in Coolify
2. **Wait for build** to complete
3. **Access your app** at the provided URL

## 🎯 Client Testing Instructions

Send your client this URL format:
`https://leadhunter.yourdomain.com`

### Testing Checklist for Client:

1. ✅ **Access the app** via the deployed URL
2. ✅ **Navigate through tabs** (Search, Leads, DM Campaigns, History)
3. ✅ **Add Instagram session**:
   - Go to DM Campaigns tab
   - Click "Add Session"
   - Paste their Instagram cookie
4. ✅ **Test scraping**:
   - Go to Search tab
   - Select Instagram
   - Add keywords: "fitness coach", "business mentor"
   - Set followers: 5000-50000
   - Click "Start Scraping"
5. ✅ **Create DM campaign**:
   - Select scraped leads
   - Create campaign with template
   - Send test DMs

## 🔧 Alternative: Simple Static Hosting

If you prefer a simpler approach:

```bash
# Build the frontend only
npm run build

# Upload dist/client folder to any static host
# The API calls will fail gracefully, showing the UI functionality
```

## 📞 Support

If client has issues:
1. Check browser console for errors
2. Verify Instagram cookies are valid
3. Ensure Apify API token is set
4. Check Coolify logs for backend issues