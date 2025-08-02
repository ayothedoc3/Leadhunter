import { useState } from 'react';
import { ExternalLink, Mail, Users, Calendar, CheckSquare, Square, Eye } from 'lucide-react';
import { Lead } from '@/shared/types';

interface LeadsTableProps {
  leads: Lead[];
  selectedLeads: number[];
  onSelectionChange: (selected: number[]) => void;
}

export default function LeadsTable({ leads, selectedLeads, onSelectionChange }: LeadsTableProps) {
  const [sortField, setSortField] = useState<keyof Lead>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleSort = (field: keyof Lead) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(filteredLeads.map(lead => lead.id));
    }
  };

  const handleSelectLead = (leadId: number) => {
    if (selectedLeads.includes(leadId)) {
      onSelectionChange(selectedLeads.filter(id => id !== leadId));
    } else {
      onSelectionChange([...selectedLeads, leadId]);
    }
  };

  const filteredLeads = leads
    .filter(lead => filterPlatform === 'all' || lead.platform === filterPlatform)
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      
      if (aVal === null || aVal === undefined) return sortDirection === 'asc' ? -1 : 1;
      if (bVal === null || bVal === undefined) return sortDirection === 'asc' ? 1 : -1;
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      return 0;
    });

  const platforms = [...new Set(leads.map(lead => lead.platform))];

  if (leads.length === 0) {
    return (
      <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No Leads Found</h3>
        <p className="text-purple-300">Start a scraping operation to find potential leads.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters and Controls */}
      <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSelectAll}
              className="flex items-center space-x-2 text-purple-300 hover:text-white transition-colors"
            >
              {selectedLeads.length === filteredLeads.length && filteredLeads.length > 0 ? (
                <CheckSquare className="w-5 h-5" />
              ) : (
                <Square className="w-5 h-5" />
              )}
              <span>Select All ({filteredLeads.length})</span>
            </button>
            
            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
              className="bg-white/5 border border-purple-500/30 rounded-lg px-3 py-2 text-white focus:border-purple-400 focus:outline-none"
            >
              <option value="all">All Platforms</option>
              {platforms.map(platform => (
                <option key={platform} value={platform}>
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="text-purple-300 text-sm">
            {filteredLeads.length} leads • {selectedLeads.length} selected
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-purple-500/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-purple-500/10 border-b border-purple-500/20">
              <tr>
                <th className="px-4 py-3 text-left">
                  <Square className="w-4 h-4 text-purple-400" />
                </th>
                {[
                  { key: 'platform', label: 'Platform' },
                  { key: 'channel_name', label: 'Name' },
                  { key: 'follower_count', label: 'Followers' },
                  { key: 'bio', label: 'Bio' },
                  { key: 'created_at', label: 'Found' }
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    className="px-4 py-3 text-left text-sm font-medium text-purple-300 cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSort(key as keyof Lead)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{label}</span>
                      {sortField === key && (
                        <span className="text-xs">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-sm font-medium text-purple-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-500/10">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-purple-500/5 transition-colors">
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleSelectLead(lead.id)}
                      className="text-purple-400 hover:text-white transition-colors"
                    >
                      {selectedLeads.includes(lead.id) ? (
                        <CheckSquare className="w-4 h-4" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-500/30">
                      {lead.platform}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium text-white">{lead.channel_name}</div>
                      {lead.username && (
                        <div className="text-sm text-purple-400">@{lead.username}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1 text-purple-300">
                      <Users className="w-4 h-4" />
                      <span>{lead.follower_count?.toLocaleString() || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="max-w-xs truncate text-purple-300">
                      {lead.bio || 'No bio available'}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1 text-purple-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(lead.created_at).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="text-purple-400 hover:text-white transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      <a
                        href={lead.channel_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-white transition-colors"
                        title="Visit profile"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      
                      {lead.email && (
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-purple-400 hover:text-white transition-colors"
                          title="Send email"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-xl border border-purple-500/20 p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Lead Details</h3>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-purple-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-1">Platform</label>
                  <div className="text-white">{selectedLead.platform}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-1">Followers</label>
                  <div className="text-white">{selectedLead.follower_count?.toLocaleString() || 'N/A'}</div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-1">Channel Name</label>
                <div className="text-white">{selectedLead.channel_name}</div>
              </div>
              
              {selectedLead.username && (
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-1">Username</label>
                  <div className="text-white">@{selectedLead.username}</div>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-1">Bio</label>
                <div className="text-white bg-white/5 rounded-lg p-3 min-h-[100px]">
                  {selectedLead.bio || 'No bio available'}
                </div>
              </div>
              
              {selectedLead.email && (
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-1">Email</label>
                  <div className="text-white">{selectedLead.email}</div>
                </div>
              )}
              
              {selectedLead.keywords_matched && (
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-1">Matched Keywords</label>
                  <div className="flex flex-wrap gap-1">
                    {JSON.parse(selectedLead.keywords_matched).map((keyword: string) => (
                      <span
                        key={keyword}
                        className="px-2 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded text-green-200 text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-3 pt-4">
                <a
                  href={selectedLead.channel_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Visit Profile</span>
                </a>
                
                {selectedLead.email && (
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Email</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
