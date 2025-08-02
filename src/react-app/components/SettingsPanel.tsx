import { useState, useEffect } from 'react';
import { Settings, Save, Eye, EyeOff, Plus, Trash2, Check, X } from 'lucide-react';

interface SettingsData {
  apifyApiToken: string;
  instagramSessions: Array<{
    id: string;
    name: string;
    sessionId: string;
    isActive: boolean;
  }>;
  apifyActors: {
    youtubeCommentsScraper: string;
    instagramProfileScraper: string;
    instagramDmSender: string;
  };
}

export default function SettingsPanel() {
  const [settings, setSettings] = useState<SettingsData>({
    apifyApiToken: '',
    instagramSessions: [],
    apifyActors: {
      youtubeCommentsScraper: 'dtrungtin/youtube-comments-scraper',
      instagramProfileScraper: 'apify/instagram-profile-scraper',
      instagramDmSender: 'custom/instagram-dm-sender'
    }
  });
  
  const [showTokens, setShowTokens] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [newSession, setNewSession] = useState({ name: '', sessionId: '' });
  const [isAddingSession, setIsAddingSession] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const saveSettings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      
      if (response.ok) {
        setMessage('Settings saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to save settings');
      }
    } catch (error) {
      setMessage('Failed to save settings');
      console.error('Save error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addInstagramSession = () => {
    if (newSession.name && newSession.sessionId) {
      const session = {
        id: Date.now().toString(),
        name: newSession.name,
        sessionId: newSession.sessionId,
        isActive: true
      };
      setSettings(prev => ({
        ...prev,
        instagramSessions: [...prev.instagramSessions, session]
      }));
      setNewSession({ name: '', sessionId: '' });
      setIsAddingSession(false);
    }
  };

  const removeSession = (id: string) => {
    setSettings(prev => ({
      ...prev,
      instagramSessions: prev.instagramSessions.filter(s => s.id !== id)
    }));
  };

  const toggleSessionActive = (id: string) => {
    setSettings(prev => ({
      ...prev,
      instagramSessions: prev.instagramSessions.map(s => 
        s.id === id ? { ...s, isActive: !s.isActive } : s
      )
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-md ${
          message.includes('success') 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      <div className="space-y-8">
        {/* Apify API Token */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Apify API Token
          </label>
          <div className="relative">
            <input
              type={showTokens ? 'text' : 'password'}
              value={settings.apifyApiToken}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                apifyApiToken: e.target.value
              }))}
              className="w-full p-3 border border-gray-300 rounded-md pr-10"
              placeholder="Enter your Apify API token"
            />
            <button
              onClick={() => setShowTokens(!showTokens)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showTokens ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Get your API token from <a href="https://apify.com/account#/integrations" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Apify Dashboard</a>
          </p>
        </div>

        {/* Apify Actors */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Apify Actors</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                YouTube Comments Scraper
              </label>
              <input
                type="text"
                value={settings.apifyActors.youtubeCommentsScraper}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  apifyActors: { ...prev.apifyActors, youtubeCommentsScraper: e.target.value }
                }))}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="username/actor-name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instagram Profile Scraper
              </label>
              <input
                type="text"
                value={settings.apifyActors.instagramProfileScraper}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  apifyActors: { ...prev.apifyActors, instagramProfileScraper: e.target.value }
                }))}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="username/actor-name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instagram DM Sender
              </label>
              <input
                type="text"
                value={settings.apifyActors.instagramDmSender}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  apifyActors: { ...prev.apifyActors, instagramDmSender: e.target.value }
                }))}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="username/actor-name"
              />
            </div>
          </div>
        </div>

        {/* Instagram Sessions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Instagram Sessions</h3>
            <button
              onClick={() => setIsAddingSession(true)}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Add Session
            </button>
          </div>

          {isAddingSession && (
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <input
                  type="text"
                  placeholder="Session name (e.g., Account 1)"
                  value={newSession.name}
                  onChange={(e) => setNewSession(prev => ({ ...prev, name: e.target.value }))}
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Instagram session cookie"
                  value={newSession.sessionId}
                  onChange={(e) => setNewSession(prev => ({ ...prev, sessionId: e.target.value }))}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={addInstagramSession}
                  className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                >
                  <Check className="h-4 w-4" />
                  Add
                </button>
                <button
                  onClick={() => {
                    setIsAddingSession(false);
                    setNewSession({ name: '', sessionId: '' });
                  }}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {settings.instagramSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleSessionActive(session.id)}
                    className={`w-4 h-4 rounded-full border-2 ${
                      session.isActive 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300'
                    }`}
                  />
                  <div>
                    <p className="font-medium text-gray-900">{session.name}</p>
                    <p className="text-sm text-gray-500">
                      {showTokens ? session.sessionId : '•'.repeat(20)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeSession(session.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            {settings.instagramSessions.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                No Instagram sessions configured. Add one to enable DM functionality.
              </p>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            To get session cookies: Login to Instagram → F12 → Application → Cookies → instagram.com → Copy 'sessionid' value
          </p>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={saveSettings}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="h-5 w-5" />
            {isLoading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}