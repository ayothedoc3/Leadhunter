# LeadHunter - Instagram Lead Generation & DM Automation

🎯 **Automated Instagram lead scraping and DM campaigns powered by Apify**

## 🚀 Quick Start for Testing

### For Clients Testing the App:

1. **Access the app**: [Your deployed URL here]
2. **Add Instagram Sessions**:
   - Go to "DM Campaigns" tab
   - Click "Add Session"
   - Paste your Instagram session cookie (see instructions below)
3. **Start Scraping**:
   - Go to "Search" tab
   - Select "Instagram" platform
   - Add keywords like "fitness coach", "business mentor"
   - Set follower range (e.g., 5000-50000)
   - Click "Start Scraping"
4. **Create DM Campaign**:
   - Go to "Leads" tab
   - Select leads you want to message
   - Go to "DM Campaigns" tab
   - Click "Create Campaign"
   - Write your message template using `{name}` and `{username}`
   - Send the campaign!

### 🍪 How to Get Instagram Session Cookies:

1. **Login to Instagram** in your browser
2. **Open Developer Tools** (F12 key)
3. **Go to Application tab** → Cookies → instagram.com
4. **Find "sessionid"** and copy the value
5. **Paste into the app** when adding a session

### 🎯 Testing Workflow:

1. **Scrape**: Find Instagram coaches/mentors in your niche
2. **Filter**: System auto-qualifies leads based on keywords
3. **Message**: Send personalized DMs with templates
4. **Track**: Monitor delivery rates and responses

## ⚙️ Environment Setup (For Developers)

```bash
# Clone the repository
git clone [your-repo-url]
cd LeadHunter

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Add your APIFY_API_TOKEN

# Run locally
npm run dev
```

## 🔧 Required Environment Variables:

- `APIFY_API_TOKEN`: Get from [Apify Console](https://console.apify.com/account#/integrations)
- Instagram session cookies (added through the UI)

## 📊 Features:

- ✅ **Multi-platform scraping** (Instagram, YouTube, etc.)
- ✅ **Smart lead qualification** with keyword matching
- ✅ **Personalized DM templates** with variables
- ✅ **Batch sending** with rate limiting
- ✅ **Real-time analytics** and tracking
- ✅ **Session management** for multiple accounts
- ✅ **Export functionality** (CSV/JSON)

## 🛠️ Built With:

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Cloudflare Workers + Hono
- **Database**: Cloudflare D1
- **Scraping**: Apify actors
- **Deployment**: Cloudflare Pages + Workers

---

**⚠️ Important**: This tool is for legitimate business outreach only. Always comply with Instagram's terms of service and applicable laws.