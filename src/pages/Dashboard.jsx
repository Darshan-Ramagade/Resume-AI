import { useState, useEffect } from 'react';
import { FileText, TrendingUp, Clock, Trash2, Eye, Plus, BarChart, Award, Calendar, Filter, Download } from 'lucide-react';
import Navbar from '../components/Navbar';
import { getAnalysisHistory, getAnalysisStats, deleteAnalysis } from '../services/analysisService';

function Dashboard() {
  const [analyses, setAnalyses] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterPeriod, setFilterPeriod] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [historyResponse, statsResponse] = await Promise.all([
        getAnalysisHistory(1, 10),
        getAnalysisStats(),
      ]);
      
      setAnalyses(historyResponse.data.analyses);
      setStats(statsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this analysis?')) {
      return;
    }

    try {
      await deleteAnalysis(id);
      setAnalyses(analyses.filter(a => a.id !== id));
    } catch (error) {
      alert('Failed to delete analysis');
    }
  };

  const getMatchColor = (score) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-rose-600';
  };

  const getMatchBg = (score) => {
    if (score >= 80) return 'bg-emerald-50';
    if (score >= 60) return 'bg-orange-50';
    return 'bg-rose-50';
  };

  const getMatchBorder = (score) => {
    if (score >= 80) return 'border-emerald-600';
    if (score >= 60) return 'border-orange-600';
    return 'border-rose-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=swap');
          
          * {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          }
          
          .mono {
            font-family: 'JetBrains Mono', monospace;
          }
        `}</style>
        <Navbar />
        <div className="flex flex-col items-center justify-center h-96">
          <div className="relative w-16 h-16 mb-6">
            <div className="absolute inset-0 border-4 border-neutral-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-neutral-900 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-neutral-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .mono {
          font-family: 'JetBrains Mono', monospace;
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.4s ease-out forwards;
        }

        .stat-card {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stat-card:hover {
          transform: translateY(-2px);
        }

        .analysis-row {
          transition: all 0.15s ease;
        }

        .analysis-row:hover {
          background-color: #fafafa;
        }

        .icon-btn {
          transition: all 0.15s ease;
        }

        .icon-btn:hover {
          transform: scale(1.05);
        }

        .icon-btn:active {
          transform: scale(0.95);
        }

        .filter-btn {
          transition: all 0.2s ease;
        }

        .filter-btn.active {
          background-color: #171717;
          color: white;
        }
      `}</style>

      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 animate-slide-up">
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 mb-2 tracking-tight">Dashboard</h1>
            <p className="text-neutral-600 text-lg">Track and manage your resume analyses</p>
          </div>
          <a href="/analyze" className="mt-6 sm:mt-0">
            <button className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 font-semibold transition-all shadow-sm hover:shadow-md active:scale-95">
              <Plus className="w-5 h-5" strokeWidth={2.5} />
              New Analysis
            </button>
          </a>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            <div className="stat-card bg-white rounded-xl border-2 border-neutral-200 p-6 shadow-sm animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Total</div>
              </div>
              <div className="mono text-4xl font-bold text-neutral-900 mb-1">
                {stats.totalAnalyses || 0}
              </div>
              <p className="text-sm font-medium text-neutral-500">Analyses Completed</p>
            </div>

            <div className="stat-card bg-white rounded-xl border-2 border-emerald-200 p-6 shadow-sm animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Average</div>
              </div>
              <div className="mono text-4xl font-bold text-emerald-600 mb-1">
                {Math.round(stats.averageMatchScore || 0)}%
              </div>
              <p className="text-sm font-medium text-neutral-500">Match Score</p>
            </div>

            <div className="stat-card bg-white rounded-xl border-2 border-orange-200 p-6 shadow-sm animate-slide-up" style={{animationDelay: '0.3s'}}>
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div className="text-xs font-semibold text-orange-600 uppercase tracking-wider">Best</div>
              </div>
              <div className="mono text-4xl font-bold text-orange-600 mb-1">
                {Math.round(stats.highestMatchScore || 0)}%
              </div>
              <p className="text-sm font-medium text-neutral-500">Highest Score</p>
            </div>

            <div className="stat-card bg-white rounded-xl border-2 border-neutral-200 p-6 shadow-sm animate-slide-up" style={{animationDelay: '0.4s'}}>
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center">
                  <BarChart className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Lowest</div>
              </div>
              <div className="mono text-4xl font-bold text-neutral-900 mb-1">
                {Math.round(stats.lowestMatchScore || 0)}%
              </div>
              <p className="text-sm font-medium text-neutral-500">Room to Grow</p>
            </div>
          </div>
        )}

        {/* Quick Actions Bar */}
        <div className="bg-white rounded-xl border-2 border-neutral-200 p-6 shadow-sm mb-8 animate-slide-up" style={{animationDelay: '0.5s'}}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-neutral-500" strokeWidth={2.5} />
              <span className="text-sm font-semibold text-neutral-900">Filter by period:</span>
              <div className="flex gap-2">
                {['all', '7d', '30d', '90d'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setFilterPeriod(period)}
                    className={`filter-btn px-4 py-2 text-sm font-semibold rounded-lg border-2 ${
                      filterPeriod === period 
                        ? 'active border-neutral-900' 
                        : 'border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    {period === 'all' ? 'All Time' : period === '7d' ? '7 Days' : period === '30d' ? '30 Days' : '90 Days'}
                  </button>
                ))}
              </div>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-neutral-700 border-2 border-neutral-200 rounded-lg hover:border-neutral-900 hover:bg-neutral-50 transition">
              <Download className="w-4 h-4" strokeWidth={2.5} />
              Export Data
            </button>
          </div>
        </div>

        {/* Analysis History */}
        <div className="bg-white rounded-xl border-2 border-neutral-200 overflow-hidden shadow-sm animate-slide-up" style={{animationDelay: '0.6s'}}>
          <div className="p-6 border-b-2 border-neutral-200 bg-neutral-50">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Recent Analyses</h2>
              {analyses.length > 0 && (
                <span className="mono text-sm font-bold text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
                  {analyses.length} {analyses.length === 1 ? 'result' : 'results'}
                </span>
              )}
            </div>
          </div>
          
          {analyses.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-20 h-20 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-6 border-2 border-neutral-200">
                <FileText className="w-10 h-10 text-neutral-400" strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-3">No analyses yet</h3>
              <p className="text-neutral-600 text-lg mb-8 max-w-md mx-auto">Start by analyzing your first resume and get actionable insights!</p>
              <a href="/analyze">
                <button className="inline-flex items-center gap-2.5 px-8 py-4 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 font-semibold transition-all shadow-sm hover:shadow-md active:scale-95">
                  <Plus className="w-5 h-5" strokeWidth={2.5} />
                  Create Analysis
                </button>
              </a>
            </div>
          ) : (
            <div className="divide-y-2 divide-neutral-100">
              {analyses.map((analysis, index) => (
                <div key={analysis.id} className="analysis-row p-6" style={{animationDelay: `${0.7 + index * 0.05}s`}}>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`mono text-5xl font-bold ${getMatchColor(analysis.matchScore)}`}>
                          {analysis.matchScore}%
                        </div>
                        <span className={`px-4 py-2 rounded-lg text-sm font-bold border-2 ${getMatchBg(analysis.matchScore)} ${getMatchColor(analysis.matchScore)} ${getMatchBorder(analysis.matchScore)} uppercase tracking-wide`}>
                          {analysis.matchCategory}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-neutral-600">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" strokeWidth={2.5} />
                          <span className="mono">{new Date(analysis.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}</span>
                        </span>
                        <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
                        <span className="mono">{analysis.missingSkillsCount} missing skills</span>
                        <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
                        <span className="mono">ATS: {analysis.atsScore}%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <a href={`/analysis/${analysis.id}`}>
                        <button className="icon-btn p-3 text-neutral-700 hover:bg-neutral-100 rounded-lg border-2 border-neutral-200 hover:border-neutral-900">
                          <Eye className="w-5 h-5" strokeWidth={2.5} />
                        </button>
                      </a>
                      <button 
                        onClick={() => handleDelete(analysis.id)}
                        className="icon-btn p-3 text-rose-600 hover:bg-rose-50 rounded-lg border-2 border-rose-200 hover:border-rose-600"
                      >
                        <Trash2 className="w-5 h-5" strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tips Section */}
        {analyses.length > 0 && (
          <div className="mt-8 grid md:grid-cols-2 gap-6 animate-slide-up" style={{animationDelay: '0.8s'}}>
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">Improve Your Score</h3>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    Add missing skills and keywords from your analyses to increase your match rate by up to 40%.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">Track Progress</h3>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    Compare your analyses over time to see how your resume optimization is improving.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Info */}
        {analyses.length > 0 && (
          <div className="mt-8 text-center animate-slide-up" style={{animationDelay: '0.9s'}}>
            <p className="text-sm font-medium text-neutral-500">
              Showing <span className="mono font-bold text-neutral-900">{analyses.length}</span> recent {analyses.length === 1 ? 'analysis' : 'analyses'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;