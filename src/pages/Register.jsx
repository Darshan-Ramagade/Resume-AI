import { useState } from 'react';
import { Mail, Lock, User, ArrowRight, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { register } from '../services/authService';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setSuccess(true);
      
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);

    } catch (error) {
      setApiError(error);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@600;700&display=swap');
          
          * {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          }
          
          .mono {
            font-family: 'JetBrains Mono', monospace;
          }
        `}</style>
        <div className="bg-white rounded-2xl border-2 border-emerald-600 p-12 max-w-md w-full text-center shadow-lg">
          <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl font-bold text-neutral-900 mb-3">Account Created!</h2>
          <p className="text-neutral-600 text-lg mb-6">
            Redirecting to login page...
          </p>
          <div className="relative w-12 h-12 mx-auto">
            <div className="absolute inset-0 border-4 border-neutral-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-neutral-900 rounded-full border-t-transparent animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

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

        .stat-number {
          transition: all 0.3s ease;
        }

        .stat-item:hover .stat-number {
          transform: scale(1.1);
        }
      `}</style>

      {/* Left Side - Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-neutral-900 text-white p-16 flex-col justify-between relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 border-2 border-neutral-800 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 border-2 border-neutral-800 rounded-full -ml-48 -mb-48"></div>
        
        <div className="relative z-10 animate-fade-in-up">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl">
              <FileText className="w-8 h-8 text-neutral-900" strokeWidth={2.5} />
            </div>
            <span className="text-3xl font-bold tracking-tight">ResumeAI</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 leading-tight tracking-tight">
            Start Your Journey to<br />Your Dream Job
          </h1>
          <p className="text-neutral-400 text-xl leading-relaxed max-w-md">
            Join thousands of job seekers who are using AI to optimize their resumes and land better opportunities.
          </p>
        </div>
        
        <div className="relative z-10 grid grid-cols-3 gap-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="stat-item text-center">
            <div className="stat-number mono text-4xl font-bold mb-2">100%</div>
            <div className="text-neutral-500 text-sm font-semibold uppercase tracking-wider">Free</div>
          </div>
          <div className="stat-item text-center border-l-2 border-r-2 border-neutral-800">
            <div className="stat-number mono text-4xl font-bold mb-2">10K+</div>
            <div className="text-neutral-500 text-sm font-semibold uppercase tracking-wider">Users</div>
          </div>
          <div className="stat-item text-center">
            <div className="stat-number mono text-4xl font-bold mb-2">50K+</div>
            <div className="text-neutral-500 text-sm font-semibold uppercase tracking-wider">Analyses</div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
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
            <h2 className="text-4xl font-bold text-neutral-900 mb-3 tracking-tight">Create your account</h2>
            <p className="text-neutral-600 text-lg">Get started in seconds — it's free!</p>
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-neutral-900 mb-2.5">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" strokeWidth={2.5} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`input-field w-full pl-12 pr-4 py-3.5 border-2 rounded-xl outline-none font-medium ${
                    errors.name 
                      ? 'border-rose-500 bg-rose-50 text-rose-900 placeholder-rose-400' 
                      : 'border-neutral-200 bg-white hover:border-neutral-300 focus:border-neutral-900 focus:bg-neutral-50'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-sm font-medium text-rose-600 mt-2 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" strokeWidth={2.5} />
                  {errors.name}
                </p>
              )}
            </div>

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
              <label className="block text-sm font-semibold text-neutral-900 mb-2.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" strokeWidth={2.5} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
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

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-semibold text-neutral-900 mb-2.5">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" strokeWidth={2.5} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={`input-field w-full pl-12 pr-4 py-3.5 border-2 rounded-xl outline-none font-medium ${
                    errors.confirmPassword 
                      ? 'border-rose-500 bg-rose-50 text-rose-900 placeholder-rose-400' 
                      : 'border-neutral-200 bg-white hover:border-neutral-300 focus:border-neutral-900 focus:bg-neutral-50'
                  }`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-sm font-medium text-rose-600 mt-2 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" strokeWidth={2.5} />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="btn-submit w-full flex items-center justify-center gap-3 px-6 py-4 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 font-bold text-lg transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
            >
              {loading ? (
                <>
                  <div className="relative w-5 h-5">
                    <div className="absolute inset-0 border-2 border-white/30 rounded-full"></div>
                    <div className="absolute inset-0 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                  </div>
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-neutral-600 text-base">
              Already have an account?{' '}
              <a href="/login" className="font-bold text-neutral-900 hover:underline decoration-2 underline-offset-4">
                Sign in
              </a>
            </p>
          </div>

          {/* Terms */}
          <div className="mt-8 text-center">
            <p className="text-xs text-neutral-500">
              By creating an account, you agree to our{' '}
              <a href="#" className="font-semibold text-neutral-700 hover:text-neutral-900">Terms</a>
              {' '}and{' '}
              <a href="#" className="font-semibold text-neutral-700 hover:text-neutral-900">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;