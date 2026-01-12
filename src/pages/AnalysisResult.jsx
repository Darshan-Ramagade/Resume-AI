import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import { 
  CheckCircle, XCircle, AlertTriangle, TrendingUp, 
  Award, Lightbulb, ArrowLeft, Download, Target,
  FileText, BarChart3
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { getAnalysisById } from '../services/analysisService';

function AnalysisResult() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalysis();
  }, [id]);

  const fetchAnalysis = async () => {
    try {
      setLoading(true);
      const response = await getAnalysisById(id);
      setAnalysis(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // PDF Export Function
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add header background
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, 210, 40, 'F');
    
    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Resume Analysis Report', 20, 20);
    
    // Date
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated: ${new Date(analysis.createdAt).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}`, 20, 30);
    
    // Reset text color for content
    doc.setTextColor(0, 0, 0);
    
    // Scores Section
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Overall Scores', 20, 55);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Match Score: ${analysis.matchScore}% (${analysis.matchCategory || 'N/A'})`, 25, 65);
    doc.text(`ATS Compatibility Score: ${analysis.atsScore}%`, 25, 73);
    
    // Matching Skills
    let yPos = 88;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(22, 163, 74); // green-600
    doc.text('Matching Skills', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    
    if (analysis.matchingSkills && analysis.matchingSkills.length > 0) {
      analysis.matchingSkills.forEach((skill) => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(`✓ ${skill}`, 25, yPos);
        yPos += 6;
      });
    } else {
      doc.text('No matching skills found', 25, yPos);
      yPos += 6;
    }
    
    // Missing Skills
    yPos += 10;
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(220, 38, 38); // red-600
    doc.text('Missing Skills', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    
    if (analysis.missingSkills && analysis.missingSkills.length > 0) {
      analysis.missingSkills.forEach((skill) => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(`✗ ${skill}`, 25, yPos);
        yPos += 6;
      });
    } else {
      doc.setTextColor(22, 163, 74);
      doc.text('✓ Excellent! You have all required skills.', 25, yPos);
      doc.setTextColor(0, 0, 0);
      yPos += 6;
    }
    
    // ATS Issues
    if (analysis.atsIssues && analysis.atsIssues.length > 0) {
      yPos += 10;
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(234, 88, 12); // orange-600
      doc.text('ATS Issues', 20, yPos);
      yPos += 10;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      
      analysis.atsIssues.forEach((issue) => {
        if (yPos > 265) {
          doc.addPage();
          yPos = 20;
        }
        const lines = doc.splitTextToSize(`⚠ ${issue}`, 170);
        lines.forEach(line => {
          doc.text(line, 25, yPos);
          yPos += 6;
        });
      });
    }
    
    // Improvement Suggestions
    yPos += 10;
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(147, 51, 234); // purple-600
    doc.text('Improvement Suggestions', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    
    if (analysis.suggestions && analysis.suggestions.length > 0) {
      analysis.suggestions.forEach((suggestion, index) => {
        if (yPos > 255) {
          doc.addPage();
          yPos = 20;
        }
        
        // Priority badge
        doc.setFont('helvetica', 'bold');
        const priorityText = `[${suggestion.priority.toUpperCase()}]`;
        doc.text(priorityText, 25, yPos);
        
        // Suggestion text
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(`${index + 1}. ${suggestion.message}`, 160);
        lines.forEach((line, lineIndex) => {
          if (lineIndex === 0) {
            doc.text(line, 48, yPos);
          } else {
            yPos += 6;
            if (yPos > 280) {
              doc.addPage();
              yPos = 20;
            }
            doc.text(line, 28, yPos);
          }
        });
        yPos += 8;
      });
    } else {
      doc.text('No suggestions at this time', 25, yPos);
    }
    
    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Page ${i} of ${pageCount} | Generated by ResumeAI`, 
        105, 
        290, 
        { align: 'center' }
      );
    }
    
    // Save PDF
    const fileName = `Resume-Analysis-${analysis.matchScore}percent-${Date.now()}.pdf`;
    doc.save(fileName);
  };

  const getMatchColor = (score) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getMatchBg = (score) => {
    if (score >= 80) return 'bg-emerald-50';
    if (score >= 60) return 'bg-amber-50';
    return 'bg-rose-50';
  };

  const getMatchBorder = (score) => {
    if (score >= 80) return 'border-emerald-200';
    if (score >= 60) return 'border-amber-200';
    return 'border-rose-200';
  };

  const getPriorityIcon = (priority) => {
    if (priority === 'high') return <AlertTriangle className="w-5 h-5 text-rose-500" />;
    if (priority === 'medium') return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    return <Lightbulb className="w-5 h-5 text-slate-500" />;
  };

  const getPriorityColor = (priority) => {
    if (priority === 'high') return 'bg-rose-50 text-rose-700 border-rose-200';
    if (priority === 'medium') return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-slate-50 text-slate-700 border-slate-200';
  };

  const calculateCircleProgress = (score) => {
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const progress = circumference - (score / 100) * circumference;
    return { circumference, progress };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mb-4"></div>
          <p className="text-gray-600">Loading analysis...</p>
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <XCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Analysis Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The analysis you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const matchCircle = calculateCircleProgress(analysis.matchScore);
  const atsCircle = calculateCircleProgress(analysis.atsScore);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition self-start"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <div className="flex gap-3">
            <button 
              onClick={exportToPDF}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition shadow-sm"
            >
              <Download className="w-5 h-5" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>
            <button
              onClick={() => navigate('/analyze')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition shadow-sm"
            >
              <Target className="w-5 h-5" />
              <span className="hidden sm:inline">New Analysis</span>
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-slate-900 rounded-2xl p-8 mb-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">Resume Analysis Complete</h1>
              <p className="text-slate-300 mb-4">
                Analyzed on {new Date(analysis.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  <span className="text-sm">{analysis.resumeSkills?.length || 0} Skills Found</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-sm">{analysis.suggestions?.length || 0} Suggestions</span>
                </div>
              </div>
            </div>
            
            {/* Score Circles */}
            <div className="flex gap-8">
              {/* Match Score Circle */}
              <div className="text-center">
                <div className="relative w-36 h-36">
                  <svg className="transform -rotate-90 w-36 h-36">
                    <circle
                      cx="72"
                      cy="72"
                      r="60"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="72"
                      cy="72"
                      r="60"
                      stroke="white"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={matchCircle.circumference}
                      strokeDashoffset={matchCircle.progress}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold">{analysis.matchScore}%</span>
                    <span className="text-sm text-slate-300">Match</span>
                  </div>
                </div>
              </div>

              {/* ATS Score Circle */}
              <div className="text-center">
                <div className="relative w-36 h-36">
                  <svg className="transform -rotate-90 w-36 h-36">
                    <circle
                      cx="72"
                      cy="72"
                      r="60"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="72"
                      cy="72"
                      r="60"
                      stroke="white"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={atsCircle.circumference}
                      strokeDashoffset={atsCircle.progress}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold">{analysis.atsScore}%</span>
                    <span className="text-sm text-slate-300">ATS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Matching Skills */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Matching Skills</h2>
                  <p className="text-sm text-gray-500">
                    {analysis.matchingSkills?.length || 0} skills match the job requirements
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.matchingSkills && analysis.matchingSkills.length > 0 ? (
                  analysis.matchingSkills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium border border-emerald-200"
                    >
                      ✓ {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No matching skills found</p>
                )}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Missing Skills</h2>
                  <p className="text-sm text-gray-500">
                    {analysis.missingSkills?.length || 0} skills to improve your match
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.missingSkills && analysis.missingSkills.length > 0 ? (
                  analysis.missingSkills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1.5 bg-rose-50 text-rose-700 rounded-lg text-sm font-medium border border-rose-200"
                    >
                      ✕ {skill}
                    </span>
                  ))
                ) : (
                  <div className="flex items-center gap-2 text-emerald-600">
                    <CheckCircle className="w-5 h-5" />
                    <p className="font-medium">Excellent! You have all required skills.</p>
                  </div>
                )}
              </div>
            </div>

            {/* All Resume Skills */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-slate-700" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Your Skills</h2>
                  <p className="text-sm text-gray-500">
                    All {analysis.resumeSkills?.length || 0} skills found in your resume
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.resumeSkills && analysis.resumeSkills.length > 0 ? (
                  analysis.resumeSkills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No skills detected</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Suggestions */}
          <div className="space-y-6">
            {/* ATS Issues */}
            {analysis.atsIssues && analysis.atsIssues.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">ATS Issues</h2>
                    <p className="text-sm text-gray-500">
                      {analysis.atsIssues.length} issues affecting ATS compatibility
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  {analysis.atsIssues.map((issue, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{issue}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Improvement Suggestions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-slate-700" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Improvement Suggestions</h2>
                  <p className="text-sm text-gray-500">
                    {analysis.suggestions?.length || 0} actionable recommendations
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {analysis.suggestions && analysis.suggestions.length > 0 ? (
                  analysis.suggestions.map((suggestion, index) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-lg border ${getPriorityColor(suggestion.priority)}`}
                    >
                      <div className="flex items-start gap-3">
                        {getPriorityIcon(suggestion.priority)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold uppercase tracking-wide">
                              {suggestion.type}
                            </span>
                            <span className="text-xs px-2 py-0.5 bg-white rounded-full font-semibold">
                              {suggestion.priority}
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed">{suggestion.message}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No suggestions at this time</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate('/analyze')}
            className="px-8 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-semibold transition shadow-sm"
          >
            Analyze Another Resume
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition"
          >
            View All Analyses
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnalysisResult;