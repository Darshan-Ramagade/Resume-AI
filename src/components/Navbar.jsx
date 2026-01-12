import { useState } from 'react';
import { FileText, LogOut, Home, BarChart3, AlertCircle } from 'lucide-react';
import { getCurrentUser, logout } from '../services/authService';

function Navbar() {
  const user = getCurrentUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <a href="/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">ResumeAI</span>
              </a>
              
              <div className="hidden md:flex gap-6">
                <a 
                  href="/dashboard" 
                  className="flex items-center gap-2 text-gray-700 hover:text-slate-900 font-medium transition"
                >
                  <Home className="w-5 h-5" />
                  Dashboard
                </a>
                <a 
                  href="/analyze" 
                  className="flex items-center gap-2 text-gray-700 hover:text-slate-900 font-medium transition"
                >
                  <BarChart3 className="w-5 h-5" />
                  New Analysis
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-gray-700 hidden sm:block font-medium">
                {user?.name || 'User'}
              </span>
              <button 
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-rose-600 transition"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Confirm Logout
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to logout? You'll need to login again to access your dashboard.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleLogout}
                    className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium transition"
                  >
                    Yes, Logout
                  </button>
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;