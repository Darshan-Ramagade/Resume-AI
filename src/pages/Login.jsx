import { useState } from 'react';
import { Mail, Lock, ArrowRight, FileText, AlertCircle, CheckCircle2, Shield } from 'lucide-react';
import { login } from '../services/authService';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
    setApiError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setApiError('');

    try {
      await login({
        email: formData.email,
        password: formData.password,
      });

      window.location.href = '/dashboard';

    } catch (error) {
      setApiError(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@600;700&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .mono {
          font-family: 'JetBrains Mono', monospace;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .input-field {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .input-field:focus {
          transform: translateY(-1px);
        }

        .btn-submit {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .btn-submit:active:not(:disabled) {
          transform: translateY(0px);
        }

        .feature-card {
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateX(8px);
        }
      `}</style>

      {/* Left Side - Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-neutral-900 text-white p-16 flex-col justify-between relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 border-2 border-neutral-800 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 border-2 border-neutral-800 rounded-full -ml-48 -mb-48"></div>
        <div className="absolute top-1/2 right-1/4 w-40 h-40 border-2 border-neutral-800 rounded-full"></div>
        
        <div className="relative z-10 animate-fade-in-up">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl">
              <FileText className="w-8 h-8 text-neutral-900" strokeWidth={2.5} />
            </div>
            <span className="text-3xl font-bold tracking-tight">ResumeAI</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 leading-tight tracking-tight">
            Land Your Dream Job with AI-Powered Analysis
          </h1>
          <p className="text-neutral-400 text-xl leading-relaxed max-w-md">
            Get instant insights on how well your resume matches job descriptions. Optimize for ATS systems and stand out.
          </p>
        </div>
        
        <div className="relative z-10 space-y-5 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="feature-card flex items-start gap-4 p-5 bg-neutral-800/50 rounded-2xl border-2 border-neutral-800">
            <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-neutral-700">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Instant Match Scoring</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">See how well you match job requirements in seconds</p>
            </div>
          </div>
          
          <div className="feature-card flex items-start gap-4 p-5 bg-neutral-800/50 rounded-2xl border-2 border-neutral-800">
            <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-neutral-700">
              <Shield className="w-6 h-6 text-orange-500" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">ATS Optimization</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">Ensure your resume passes automated screening systems</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold">ResumeAI</span>
          </div>

          {/* Header */}
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-neutral-900 mb-3 tracking-tight">Welcome back</h2>
            <p className="text-neutral-600 text-lg">Sign in to your account to continue</p>
          </div>

          {/* Error Alert */}
          {apiError && (
            <div className="mb-6 p-4 bg-rose-50 border-l-4 border-rose-600 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                <p className="text-sm font-medium text-rose-700">{apiError}</p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-neutral-900 mb-2.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" strokeWidth={2.5} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`input-field w-full pl-12 pr-4 py-3.5 border-2 rounded-xl outline-none font-medium ${
                    errors.email 
                      ? 'border-rose-500 bg-rose-50 text-rose-900 placeholder-rose-400' 
                      : 'border-neutral-200 bg-white hover:border-neutral-300 focus:border-neutral-900 focus:bg-neutral-50'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-sm font-medium text-rose-600 mt-2 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" strokeWidth={2.5} />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="block text-sm font-semibold text-neutral-900">
                  Password
                </label>
                <a href="#" className="text-sm font-bold text-neutral-900 hover:underline decoration-2 underline-offset-4">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" strokeWidth={2.5} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`input-field w-full pl-12 pr-4 py-3.5 border-2 rounded-xl outline-none font-medium ${
                    errors.password 
                      ? 'border-rose-500 bg-rose-50 text-rose-900 placeholder-rose-400' 
                      : 'border-neutral-200 bg-white hover:border-neutral-300 focus:border-neutral-900 focus:bg-neutral-50'
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-sm font-medium text-rose-600 mt-2 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" strokeWidth={2.5} />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input 
                id="remember" 
                type="checkbox" 
                className="w-5 h-5 rounded-md border-2 border-neutral-300 text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 cursor-pointer"
              />
              <label htmlFor="remember" className="ml-3 text-sm font-medium text-neutral-700 cursor-pointer select-none">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="btn-submit w-full flex items-center justify-center gap-3 px-6 py-4 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 font-bold text-lg transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
            >
              {loading ? (
                <>
                  <div className="relative w-5 h-5">
                    <div className="absolute inset-0 border-2 border-white/30 rounded-full"></div>
                    <div className="absolute inset-0 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                  </div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-neutral-600 text-base">
              Don't have an account?{' '}
              <a href="/register" className="font-bold text-neutral-900 hover:underline decoration-2 underline-offset-4">
                Sign up for free
              </a>
            </p>
          </div>

          {/* Social Proof */}
          <div className="mt-12 pt-8 border-t-2 border-neutral-200">
            <div className="flex items-center justify-center gap-8 text-center">
              <div>
                <div className="mono text-2xl font-bold text-neutral-900">10K+</div>
                <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-1">Active Users</div>
              </div>
              <div className="w-px h-12 bg-neutral-200"></div>
              <div>
                <div className="mono text-2xl font-bold text-neutral-900">50K+</div>
                <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-1">Analyses</div>
              </div>
              <div className="w-px h-12 bg-neutral-200"></div>
              <div>
                <div className="mono text-2xl font-bold text-neutral-900">100%</div>
                <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-1">Free</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;