import { useState } from 'react';
import { Search, Settings, Zap } from 'lucide-react';
import { TARGET_KEYWORDS, PLATFORM_CONFIG } from '@/shared/types';

interface SearchFormProps {
  onSearch: (params: any) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [platform, setPlatform] = useState<'youtube' | 'instagram' | 'skool' | 'whop'>('youtube');
  const [keywords, setKeywords] = useState<string[]>(['Coach', 'Mentor', 'Entrepreneur']);
  const [customKeyword, setCustomKeyword] = useState('');
  const [minFollowers, setMinFollowers] = useState(5000);
  const [maxFollowers, setMaxFollowers] = useState(100000);
  const [limit, setLimit] = useState(50);
  const [sessionIds, setSessionIds] = useState<string[]>([]);
  const [newSessionId, setNewSessionId] = useState('');

  const handleAddKeyword = () => {
    if (customKeyword.trim() && !keywords.includes(customKeyword.trim())) {
      setKeywords([...keywords, customKeyword.trim()]);
      setCustomKeyword('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const handleAddSessionId = () => {
    if (newSessionId.trim() && !sessionIds.includes(newSessionId.trim())) {
      setSessionIds([...sessionIds, newSessionId.trim()]);
      setNewSessionId('');
    }
  };

  const handleRemoveSessionId = (sessionId: string) => {
    setSessionIds(sessionIds.filter(id => id !== sessionId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keywords.length === 0) return;
    
    onSearch({
      platform,
      keywords,
      min_followers: minFollowers,
      max_followers: maxFollowers,
      limit,
      session_ids: sessionIds
    });
  };

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
          <Search className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-white">Lead Search Configuration</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Platform Selection */}
        <div>
          <label className="block text-sm font-medium text-purple-300 mb-3">Platform</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(PLATFORM_CONFIG).map(([key, config]) => (
              <button
                key={key}
                type="button"
                onClick={() => setPlatform(key as any)}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  platform === key
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400 text-white shadow-lg'
                    : 'bg-white/5 border-purple-500/30 text-purple-300 hover:bg-white/10 hover:border-purple-400'
                }`}
              >
                <div className="font-medium">{config.name}</div>
                <div className="text-xs opacity-75 mt-1">{config.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Keywords Section */}
        <div>
          <label className="block text-sm font-medium text-purple-300 mb-3">Target Keywords</label>
          
          {/* Selected Keywords */}
          <div className="flex flex-wrap gap-2 mb-3">
            {keywords.map((keyword) => (
              <span
                key={keyword}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-sm text-purple-200"
              >
                {keyword}
                <button
                  type="button"
                  onClick={() => handleRemoveKeyword(keyword)}
                  className="text-purple-400 hover:text-red-400 ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* Add Custom Keyword */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={customKeyword}
              onChange={(e) => setCustomKeyword(e.target.value)}
              placeholder="Add custom keyword..."
              className="flex-1 px-3 py-2 bg-white/5 border border-purple-500/30 rounded-lg text-white placeholder-purple-400 focus:border-purple-400 focus:outline-none"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
            />
            <button
              type="button"
              onClick={handleAddKeyword}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200"
            >
              Add
            </button>
          </div>

          {/* Suggested Keywords */}
          <div>
            <div className="text-xs text-purple-400 mb-2">Suggested keywords:</div>
            <div className="flex flex-wrap gap-1">
              {TARGET_KEYWORDS.filter(k => !keywords.includes(k)).slice(0, 8).map((keyword) => (
                <button
                  key={keyword}
                  type="button"
                  onClick={() => setKeywords([...keywords, keyword])}
                  className="px-2 py-1 text-xs bg-white/5 border border-purple-500/20 rounded text-purple-300 hover:bg-purple-500/20 hover:text-white transition-all duration-200"
                >
                  + {keyword}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Follower Range */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-purple-300 mb-2">
              Min Followers: {minFollowers.toLocaleString()}
            </label>
            <input
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={minFollowers}
              onChange={(e) => setMinFollowers(parseInt(e.target.value))}
              className="w-full h-2 bg-purple-500/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-purple-300 mb-2">
              Max Followers: {maxFollowers.toLocaleString()}
            </label>
            <input
              type="range"
              min="50000"
              max="1000000"
              step="10000"
              value={maxFollowers}
              onChange={(e) => setMaxFollowers(parseInt(e.target.value))}
              className="w-full h-2 bg-purple-500/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {/* Session IDs for Instagram */}
        {platform === 'instagram' && (
          <div>
            <label className="block text-sm font-medium text-purple-300 mb-3">
              Instagram Session IDs
              <span className="text-purple-400 text-xs ml-2">(Add multiple accounts for better results)</span>
            </label>
            
            {/* Selected Session IDs */}
            {sessionIds.length > 0 && (
              <div className="mb-3">
                <div className="text-xs text-purple-400 mb-2">Added accounts ({sessionIds.length}):</div>
                <div className="space-y-2">
                  {sessionIds.map((sessionId, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-white/5 border border-purple-500/20 rounded-lg"
                    >
                      <span className="text-purple-200 text-sm font-mono">
                        {sessionId.slice(0, 20)}...{sessionId.slice(-10)}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSessionId(sessionId)}
                        className="text-purple-400 hover:text-red-400 ml-2"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Add New Session ID */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newSessionId}
                onChange={(e) => setNewSessionId(e.target.value)}
                placeholder="299291933:Y2eZ3hvFqsbWhe:12:AYd6ClDKczxx7CkujZZwutI2ukplqtuPjtuuTQUWwQ"
                className="flex-1 px-3 py-2 bg-white/5 border border-purple-500/30 rounded-lg text-white placeholder-purple-400 focus:border-purple-400 focus:outline-none text-sm"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSessionId())}
              />
              <button
                type="button"
                onClick={handleAddSessionId}
                disabled={!newSessionId.trim()}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Add
              </button>
            </div>
            
            <div className="text-xs text-purple-400">
              <div className="mb-2">
                <span className="font-medium">Benefits of multiple accounts:</span>
                <ul className="list-disc list-inside mt-1 space-y-1 text-purple-400">
                  <li>Access different follower networks</li>
                  <li>Avoid rate limits by distributing requests</li>
                  <li>Get more diverse and comprehensive data</li>
                  <li>Increase scraping speed with parallel processing</li>
                </ul>
              </div>
              <div>
                <span className="font-medium">How to get Session IDs:</span>
                <ol className="list-decimal list-inside mt-1 space-y-1 text-purple-400">
                  <li>Log into each Instagram account in separate browser profiles</li>
                  <li>Open Developer Tools (F12) → Application → Cookies → instagram.com</li>
                  <li>Copy the "sessionid" value for each account</li>
                  <li>Add each session ID using the form above</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Results Limit */}
        <div>
          <label className="block text-sm font-medium text-purple-300 mb-2">
            Results Limit: {limit}
          </label>
          <input
            type="range"
            min="10"
            max="200"
            step="10"
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
            className="w-full h-2 bg-purple-500/20 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-purple-400 mt-1">
            <span>10</span>
            <span>200</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || keywords.length === 0 || (platform === 'instagram' && sessionIds.length === 0)}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
        >
          {isLoading ? (
            <>
              <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></div>
              <span>Scraping in progress...</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              <span>Start Scraping</span>
            </>
          )}
        </button>
      </form>

      {/* Cost Estimate */}
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <div className="flex items-center space-x-2 text-blue-300">
          <Settings className="w-4 h-4" />
          <span className="text-sm font-medium">Estimated Cost</span>
        </div>
        <div className="text-blue-200 text-sm mt-1">
          ~{Math.ceil(limit / 50)} Apify credits • Expected results: {Math.floor(limit * 0.3)}-{Math.floor(limit * 0.7)} qualified leads
        </div>
      </div>
    </div>
  );
}
