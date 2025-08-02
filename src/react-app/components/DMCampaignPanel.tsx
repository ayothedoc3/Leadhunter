import { useState, useEffect } from 'react';
import { MessageSquare, Send, Users, CheckCircle2, XCircle, Clock, Plus } from 'lucide-react';
import { DMCampaign, DMMessage, InstagramSession } from '@/shared/types';

interface DMCampaignPanelProps {
  selectedLeads: number[];
  onSelectionChange: (ids: number[]) => void;
}

export default function DMCampaignPanel({ selectedLeads, onSelectionChange }: DMCampaignPanelProps) {
  const [campaigns, setCampaigns] = useState<DMCampaign[]>([]);
  const [sessions, setSessions] = useState<InstagramSession[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<DMCampaign | null>(null);
  const [campaignMessages, setCampaignMessages] = useState<DMMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showSessionForm, setShowSessionForm] = useState(false);

  // Form states
  const [campaignName, setCampaignName] = useState('');
  const [messageTemplate, setMessageTemplate] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [sessionCookie, setSessionCookie] = useState('');
  const [sessionUsername, setSessionUsername] = useState('');

  useEffect(() => {
    loadCampaigns();
    loadSessions();
  }, []);

  useEffect(() => {
    if (selectedCampaign) {
      loadCampaignMessages(selectedCampaign.id);
    }
  }, [selectedCampaign]);

  const loadCampaigns = async () => {
    try {
      const response = await fetch('/api/campaigns');
      const data = await response.json();
      setCampaigns(data.campaigns || []);
    } catch (error) {
      console.error('Error loading campaigns:', error);
    }
  };

  const loadSessions = async () => {
    try {
      const response = await fetch('/api/sessions');
      const data = await response.json();
      setSessions(data.sessions || []);
    } catch (error) {
      console.error('Error loading sessions:', error);
    }
  };

  const loadCampaignMessages = async (campaignId: number) => {
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/messages`);
      const data = await response.json();
      setCampaignMessages(data.messages || []);
    } catch (error) {
      console.error('Error loading campaign messages:', error);
    }
  };

  const createCampaign = async () => {
    if (!campaignName || !messageTemplate || selectedLeads.length === 0) {
      alert('Please fill in all fields and select leads');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: campaignName,
          platform: 'instagram',
          message_template: messageTemplate,
          lead_ids: selectedLeads
        })
      });

      const result = await response.json();
      if (result.success) {
        alert(`Campaign created with ${result.total_messages} messages!`);
        setCampaignName('');
        setMessageTemplate('');
        setShowCreateForm(false);
        loadCampaigns();
        onSelectionChange([]);
      } else {
        alert('Failed to create campaign');
      }
    } catch (error) {
      alert('Error creating campaign');
    } finally {
      setIsLoading(false);
    }
  };

  const sendCampaign = async (campaignId: number) => {
    const activeSessions = sessions.filter(s => s.is_active);
    if (activeSessions.length === 0) {
      alert('No active Instagram sessions available. Please add a session first.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaign_id: campaignId,
          session_ids: activeSessions.map(s => s.session_id),
          batch_size: 10,
          delay_between_messages: 30
        })
      });

      const result = await response.json();
      if (result.success) {
        alert(`Campaign sent! ${result.sent} successful, ${result.failed} failed`);
        loadCampaigns();
        if (selectedCampaign?.id === campaignId) {
          loadCampaignMessages(campaignId);
        }
      } else {
        alert('Failed to send campaign');
      }
    } catch (error) {
      alert('Error sending campaign');
    } finally {
      setIsLoading(false);
    }
  };

  const addSession = async () => {
    if (!sessionId || !sessionCookie) {
      alert('Please fill in session ID and cookie');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          session_cookie: sessionCookie,
          username: sessionUsername || undefined
        })
      });

      const result = await response.json();
      if (result.success) {
        alert('Session added successfully!');
        setSessionId('');
        setSessionCookie('');
        setSessionUsername('');
        setShowSessionForm(false);
        loadSessions();
      } else {
        alert('Failed to add session');
      }
    } catch (error) {
      alert('Error adding session');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'text-green-400';
      case 'failed': return 'text-red-400';
      case 'sending': return 'text-yellow-400';
      case 'pending': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <CheckCircle2 className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      case 'sending': return <Clock className="w-4 h-4 animate-spin" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-6 h-6 text-purple-400" />
          <div>
            <h2 className="text-xl font-bold text-white">DM Campaigns</h2>
            <p className="text-purple-300 text-sm">Create and manage Instagram DM campaigns</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setShowSessionForm(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Session</span>
          </button>
          <button
            onClick={() => setShowCreateForm(true)}
            disabled={selectedLeads.length === 0}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            <span>Create Campaign ({selectedLeads.length} leads)</span>
          </button>
        </div>
      </div>

      {/* Sessions Overview */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-3">Instagram Sessions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700/50 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-400">{sessions.filter(s => s.is_active).length}</div>
            <div className="text-sm text-gray-300">Active Sessions</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-3">
            <div className="text-2xl font-bold text-yellow-400">{sessions.reduce((sum, s) => sum + s.daily_dm_count, 0)}</div>
            <div className="text-sm text-gray-300">DMs Sent Today</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-3">
            <div className="text-2xl font-bold text-blue-400">{sessions.length}</div>
            <div className="text-sm text-gray-300">Total Sessions</div>
          </div>
        </div>
      </div>

      {/* Campaign List */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Campaigns</h3>
        
        {campaigns.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400">No campaigns yet. Create your first campaign!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                  selectedCampaign?.id === campaign.id
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                }`}
                onClick={() => setSelectedCampaign(campaign)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-semibold text-white">{campaign.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        campaign.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        campaign.status === 'running' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-300">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{campaign.total_leads} leads</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span>{campaign.success_count} sent</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <XCircle className="w-4 h-4 text-red-400" />
                        <span>{campaign.failed_count} failed</span>
                      </div>
                    </div>
                  </div>
                  
                  {campaign.status === 'draft' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sendCampaign(campaign.id);
                      }}
                      disabled={isLoading}
                      className="flex items-center space-x-2 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Campaign Messages */}
      {selectedCampaign && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Messages for "{selectedCampaign.name}"</h3>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {campaignMessages.map((message) => (
              <div key={message.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={getStatusColor(message.status)}>
                    {getStatusIcon(message.status)}
                  </div>
                  <div>
                    <div className="font-medium text-white">@{message.recipient_username}</div>
                    <div className="text-sm text-gray-400 truncate max-w-md">
                      {message.message_content}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-sm font-medium ${getStatusColor(message.status)}`}>
                    {message.status}
                  </div>
                  {message.sent_at && (
                    <div className="text-xs text-gray-500">
                      {new Date(message.sent_at).toLocaleString()}
                    </div>
                  )}
                  {message.error_message && (
                    <div className="text-xs text-red-400 max-w-32 truncate">
                      {message.error_message}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Campaign Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Create DM Campaign</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Campaign Name</label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  placeholder="e.g., Fitness Coach Outreach Q1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message Template</label>
                <textarea
                  value={messageTemplate}
                  onChange={(e) => setMessageTemplate(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  placeholder="Hi {name}! I saw your amazing content and would love to connect..."
                />
                <p className="text-xs text-gray-400 mt-1">
                  Use {'{name}'} for channel name and {'{username}'} for username
                </p>
              </div>
              
              <div className="text-sm text-gray-300">
                <strong>{selectedLeads.length}</strong> leads selected for this campaign
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createCampaign}
                disabled={isLoading}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? 'Creating...' : 'Create Campaign'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Session Modal */}
      {showSessionForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-xl font-bold text-white mb-4">Add Instagram Session</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Session ID</label>
                <input
                  type="text"
                  value={sessionId}
                  onChange={(e) => setSessionId(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  placeholder="Instagram session ID"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Session Cookie</label>
                <textarea
                  value={sessionCookie}
                  onChange={(e) => setSessionCookie(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  placeholder="Instagram session cookie"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Username (Optional)</label>
                <input
                  type="text"
                  value={sessionUsername}
                  onChange={(e) => setSessionUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  placeholder="@username"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowSessionForm(false)}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addSession}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Adding...' : 'Add Session'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}