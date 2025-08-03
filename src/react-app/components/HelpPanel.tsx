import { ExternalLink, Key, Cookie, Youtube, Instagram, Search, Settings } from 'lucide-react';

export default function HelpPanel() {
  return (
    <div className="space-y-6">
      <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-purple-500/20 p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Search className="w-6 h-6 text-purple-400" />
          How to Use LeadHunter
        </h2>
        
        {/* Quick Start Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-purple-300 mb-4">Quick Start Guide</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <h4 className="font-medium text-white mb-2">1. Configure API Settings</h4>
              <p className="text-gray-300 text-sm">Set up your Apify API token and Instagram session cookies in the Settings page.</p>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <h4 className="font-medium text-white mb-2">2. Start Scraping</h4>
              <p className="text-gray-300 text-sm">Use the Search tab to find leads on YouTube or Instagram by keywords, hashtags, or profiles.</p>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <h4 className="font-medium text-white mb-2">3. Review & Export Leads</h4>
              <p className="text-gray-300 text-sm">Check the Leads tab to review qualified leads and export them as CSV or JSON.</p>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <h4 className="font-medium text-white mb-2">4. Send DM Campaigns</h4>
              <p className="text-gray-300 text-sm">Create and send personalized DM campaigns to your leads using the DM Campaigns tab.</p>
            </div>
          </div>
        </div>

        {/* Apify API Key Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2">
            <Key className="w-5 h-5" />
            Getting Your Apify API Token
          </h3>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600/50">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                <div>
                  <p className="text-white font-medium">Create Apify Account</p>
                  <p className="text-gray-300 text-sm">Sign up for a free account if you don't have one</p>
                  <a 
                    href="https://apify.com/sign-up" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm mt-1"
                  >
                    Sign up at Apify <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                <div>
                  <p className="text-white font-medium">Go to Integrations</p>
                  <p className="text-gray-300 text-sm">Navigate to Account {'>'} Integrations in your Apify dashboard</p>
                  <a 
                    href="https://console.apify.com/account/integrations" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm mt-1"
                  >
                    Open Integrations Page <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                <div>
                  <p className="text-white font-medium">Copy API Token</p>
                  <p className="text-gray-300 text-sm">Find your API token and copy it to the Settings page</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-yellow-200 text-sm">
                <strong>💡 Tip:</strong> Keep your API token secure and never share it publicly. You can regenerate it if needed.
              </p>
            </div>
          </div>
        </div>

        {/* Instagram Cookies Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2">
            <Cookie className="w-5 h-5" />
            Getting Instagram Session Cookies
          </h3>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600/50">
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                Instagram session cookies are required for DM campaigns and some scraping features. Here are two methods:
              </p>
              
              {/* Method 1: Browser Developer Tools */}
              <div className="border border-slate-600/50 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Method 1: Browser Developer Tools (Manual)
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                    <div>
                      <p className="text-white text-sm">Log into Instagram in your browser</p>
                      <a 
                        href="https://instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm"
                      >
                        Open Instagram <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                    <div>
                      <p className="text-white text-sm">Open Developer Tools (F12 or Right-click → Inspect)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                    <div>
                      <p className="text-white text-sm">Go to Application → Cookies → instagram.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">4</div>
                    <div>
                      <p className="text-white text-sm">Find and copy the <code className="bg-slate-700 px-1 rounded text-purple-300">sessionid</code> value</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Method 2: Chrome Extension */}
              <div className="border border-slate-600/50 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Method 2: Chrome Extension (Recommended)
                </h4>
                <div className="space-y-3">
                  <p className="text-gray-300 text-sm">Use a browser extension to easily extract cookies:</p>
                  
                  <div className="space-y-2">
                    <a 
                      href="https://chrome.google.com/webstore/detail/cookie-editor/hlkenndednhfkekhgcdicdfddnkalmdm" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-300 px-3 py-2 rounded-lg border border-green-500/30 transition-colors text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Cookie Editor (Chrome)
                    </a>
                    
                    <a 
                      href="https://chrome.google.com/webstore/detail/editthiscookie/fngmhnnpilhplaeedifhccceomclgfbg" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-300 px-3 py-2 rounded-lg border border-green-500/30 transition-colors text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      EditThisCookie (Chrome)
                    </a>
                  </div>
                  
                  <p className="text-gray-400 text-sm">
                    After installing, visit Instagram, click the extension, and copy the sessionid cookie value.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-200 text-sm">
                <strong>⚠️ Important:</strong> Session cookies expire periodically. If DM campaigns stop working, refresh your cookies.
              </p>
            </div>
          </div>
        </div>

        {/* Platform Specific Tips */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-purple-300 mb-4">Platform-Specific Tips</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
              <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                <Youtube className="w-5 h-5 text-red-400" />
                YouTube Scraping
              </h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Search by keywords or channel names</li>
                <li>• Comments from popular videos work best</li>
                <li>• Use specific niches for better targeting</li>
                <li>• Results include channel stats and contact info</li>
              </ul>
            </div>
            
            <div className="bg-pink-500/10 rounded-lg p-4 border border-pink-500/20">
              <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                <Instagram className="w-5 h-5 text-pink-400" />
                Instagram Scraping
              </h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Search by hashtags (#business, #startup)</li>
                <li>• Profile scraping for followers/following</li>
                <li>• Post engagement analysis</li>
                <li>• Requires valid session cookies</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div>
          <h3 className="text-lg font-semibold text-purple-300 mb-4">Troubleshooting</h3>
          <div className="space-y-3">
            <div className="bg-slate-700/30 rounded-lg p-3">
              <h4 className="text-white font-medium text-sm">Scraping Returns No Results</h4>
              <p className="text-gray-400 text-sm">Check your API token, try different keywords, or verify the platform is accessible.</p>
            </div>
            
            <div className="bg-slate-700/30 rounded-lg p-3">
              <h4 className="text-white font-medium text-sm">DM Campaigns Not Sending</h4>
              <p className="text-gray-400 text-sm">Refresh your Instagram session cookies and ensure they're from a logged-in account.</p>
            </div>
            
            <div className="bg-slate-700/30 rounded-lg p-3">
              <h4 className="text-white font-medium text-sm">Export Not Working</h4>
              <p className="text-gray-400 text-sm">Select at least one lead before trying to export. Check browser popup blockers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}