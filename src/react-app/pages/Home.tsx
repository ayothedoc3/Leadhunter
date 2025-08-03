import { useState, useEffect } from 'react';
import { Search, Database, Download, Play, AlertCircle, CheckCircle2, MessageSquare, Settings, HelpCircle } from 'lucide-react';
import { Link } from 'react-router';
import SearchForm from '@/react-app/components/SearchForm';
import LeadsTable from '@/react-app/components/LeadsTable';
import RunsHistoryPanel from '@/react-app/components/RunsHistoryPanel';
import DMCampaignPanel from '@/react-app/components/DMCampaignPanel';
import HelpPanel from '@/react-app/components/HelpPanel';
import { Lead, ScrapingRun } from '@/shared/types';

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [runs, setRuns] = useState<ScrapingRun[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'leads' | 'campaigns' | 'history' | 'help'>('search');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    loadLeads();
    loadRuns();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const loadLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      const data = await response.json();
      setLeads(data.leads || []);
    } catch (error) {
      console.error('Error loading leads:', error);
    }
  };

  const loadRuns = async () => {
    try {
      const response = await fetch('/api/runs');
      const data = await response.json();
      setRuns(data.runs || []);
    } catch (error) {
      console.error('Error loading runs:', error);
    }
  };

  const handleSearch = async (searchParams: any) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchParams)
      });
      
      const result = await response.json();
      
      if (result.success) {
        setNotification({
          type: 'success',
          message: `Found ${result.total_qualified} qualified leads from ${result.total_found} total results`
        });
        await loadLeads();
        await loadRuns();
        setActiveTab('leads');
      } else {
        setNotification({
          type: 'error',
          message: result.error || 'Scraping failed'
        });
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to start scraping operation'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async (format: 'csv' | 'json' = 'csv') => {
    if (selectedLeads.length === 0) {
      setNotification({
        type: 'error',
        message: 'Please select leads to export'
      });
      return;
    }

    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_ids: selectedLeads,
          format
        })
      });
      
      if (format === 'csv') {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'leads.csv';
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        const data = await response.json();
        const blob = new Blob([JSON.stringify(data.leads, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'leads.json';
        a.click();
        window.URL.revokeObjectURL(url);
      }
      
      setNotification({
        type: 'success',
        message: `Exported ${selectedLeads.length} leads as ${format.toUpperCase()}`
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to export leads'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">LeadHunter</h1>
                <p className="text-purple-300 text-sm">Internal Lead Scraping Tool</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/settings"
                className="flex items-center gap-2 px-4 py-2 bg-purple-600/50 hover:bg-purple-600/70 text-white rounded-lg transition-colors"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <div className="text-right">
                <div className="text-white font-medium">{leads.length} Total Leads</div>
                <div className="text-purple-300 text-sm">{selectedLeads.length} Selected</div>
              </div>
              
              {selectedLeads.length > 0 && (
                <button
                  onClick={() => handleExport('csv')}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center space-x-2 px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm ${
          notification.type === 'success' 
            ? 'bg-green-500/20 border border-green-500/30 text-green-100' 
            : 'bg-red-500/20 border border-red-500/30 text-red-100'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <div className="flex space-x-1 bg-black/20 backdrop-blur-sm rounded-lg p-1">
          {[
            { id: 'search', label: 'Search', icon: Search },
            { id: 'leads', label: 'Leads', icon: Database },
            { id: 'campaigns', label: 'DM Campaigns', icon: MessageSquare },
            { id: 'history', label: 'History', icon: Play },
            { id: 'help', label: 'Help', icon: HelpCircle }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                activeTab === id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-purple-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {activeTab === 'search' && (
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        )}
        
        {activeTab === 'leads' && (
          <LeadsTable
            leads={leads}
            selectedLeads={selectedLeads}
            onSelectionChange={setSelectedLeads}
          />
        )}

        {activeTab === 'campaigns' && (
          <DMCampaignPanel
            selectedLeads={selectedLeads}
            onSelectionChange={setSelectedLeads}
          />
        )}
        
        {activeTab === 'history' && (
          <RunsHistoryPanel runs={runs} />
        )}

        {activeTab === 'help' && (
          <HelpPanel />
        )}
      </div>
    </div>
  );
}
