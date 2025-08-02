import { Clock, CheckCircle, XCircle, Play, Users, Target } from 'lucide-react';
import { ScrapingRun } from '@/shared/types';

interface RunsHistoryPanelProps {
  runs: ScrapingRun[];
}

export default function RunsHistoryPanel({ runs }: RunsHistoryPanelProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'running':
        return <Clock className="w-5 h-5 text-blue-400 animate-spin" />;
      default:
        return <Play className="w-5 h-5 text-purple-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 border-green-500/30 text-green-200';
      case 'failed':
        return 'bg-red-500/20 border-red-500/30 text-red-200';
      case 'running':
        return 'bg-blue-500/20 border-blue-500/30 text-blue-200';
      default:
        return 'bg-purple-500/20 border-purple-500/30 text-purple-200';
    }
  };

  if (runs.length === 0) {
    return (
      <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No Scraping History</h3>
        <p className="text-purple-300">Your scraping operations will appear here once you start searching for leads.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-4">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Clock className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-white">Scraping History</h2>
        </div>
        <p className="text-purple-300 text-sm">Track your lead scraping operations and their results.</p>
      </div>

      <div className="grid gap-4">
        {runs.map((run) => {
          const keywords = JSON.parse(run.keywords);
          const successRate = run.total_found > 0 ? (run.total_qualified / run.total_found * 100) : 0;
          
          return (
            <div key={run.id} className="bg-black/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(run.status)}
                  <div>
                    <div className="font-medium text-white capitalize">
                      {run.platform} Scraping
                    </div>
                    <div className="text-sm text-purple-400">
                      {new Date(run.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(run.status)}`}>
                  {run.status}
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-purple-300 mb-1">
                    <Target className="w-4 h-4" />
                    <span className="text-sm">Keywords</span>
                  </div>
                  <div className="text-white font-medium">{keywords.length}</div>
                  <div className="text-xs text-purple-400 truncate">
                    {keywords.slice(0, 3).join(', ')}
                    {keywords.length > 3 && '...'}
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-purple-300 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Found</span>
                  </div>
                  <div className="text-white font-medium">{run.total_found}</div>
                  <div className="text-xs text-purple-400">Total results</div>
                </div>

                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-purple-300 mb-1">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Qualified</span>
                  </div>
                  <div className="text-white font-medium">{run.total_qualified}</div>
                  <div className="text-xs text-purple-400">
                    {successRate.toFixed(1)}% success rate
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-purple-300 mb-1">
                    <span className="text-sm">Followers</span>
                  </div>
                  <div className="text-white font-medium">
                    {run.min_followers.toLocaleString()} - {run.max_followers.toLocaleString()}
                  </div>
                  <div className="text-xs text-purple-400">Range filter</div>
                </div>
              </div>

              {/* Keywords Display */}
              <div className="mb-4">
                <div className="text-sm text-purple-300 mb-2">Search Keywords:</div>
                <div className="flex flex-wrap gap-1">
                  {keywords.map((keyword: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded text-purple-200 text-xs"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress Bar for Success Rate */}
              {run.status === 'completed' && run.total_found > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-purple-300 mb-1">
                    <span>Qualification Rate</span>
                    <span>{successRate.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-purple-500/20 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(successRate, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {run.error_message && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-red-300 mb-1">
                    <XCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Error</span>
                  </div>
                  <div className="text-red-200 text-sm">{run.error_message}</div>
                </div>
              )}

              {/* Cost Information */}
              {run.apify_cost_credits && (
                <div className="text-right">
                  <div className="text-xs text-purple-400">
                    Cost: {run.apify_cost_credits} Apify credits
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Summary Statistics</h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {runs.length}
            </div>
            <div className="text-sm text-purple-300">Total Runs</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {runs.reduce((sum, run) => sum + run.total_qualified, 0)}
            </div>
            <div className="text-sm text-purple-300">Qualified Leads</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {runs.filter(run => run.status === 'completed').length}
            </div>
            <div className="text-sm text-purple-300">Successful Runs</div>
          </div>
        </div>
      </div>
    </div>
  );
}
