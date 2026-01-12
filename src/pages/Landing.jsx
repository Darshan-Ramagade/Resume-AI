import {
  ArrowRight,
  FileText,
  Target,
  TrendingUp,
  Shield,
  CheckCircle2,
  Sparkles,
  Zap,
  Users,
  BarChart3,
  Award,
} from "lucide-react";

function Landing() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
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
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .float-animation {
          animation: float 3s ease-in-out infinite;
        }

        .feature-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-card:hover {
          transform: translateY(-8px);
        }

        .btn-primary {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
        }

        .btn-primary:active {
          transform: translateY(0px);
        }

        .stat-number {
          transition: all 0.3s ease;
        }

        .stat-card:hover .stat-number {
          transform: scale(1.1);
        }
      `}</style>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-2 border-neutral-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              ResumeAI
            </span>
          </div>

          <nav className="flex items-center gap-6">
            <a href="#features" className="text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition">
              How It Works
            </a>
            <a href="/login" className="text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition">
              Login
            </a>
            <a
              href="/register"
              className="px-6 py-3 text-sm font-bold text-white bg-neutral-900 rounded-xl hover:bg-neutral-800 transition shadow-lg hover:shadow-xl"
            >
              Get Started
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 border-2 border-neutral-200 rounded-full"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 border-2 border-neutral-200 rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-neutral-900 text-white text-xs font-bold rounded-full uppercase tracking-wider">
              <Sparkles className="w-4 h-4" strokeWidth={2.5} />
              Resume Intelligence Platform
            </div>

            <h1 className="text-7xl leading-tight font-black tracking-tight mb-8">
              Build resumes that hiring systems{' '}
              <span className="relative inline-block">
                <span className="relative z-10">actually understand</span>
                <span className="absolute bottom-2 left-0 w-full h-4 bg-yellow-300 -z-0"></span>
              </span>
            </h1>

            <p className="text-xl text-neutral-600 leading-relaxed mb-12 max-w-2xl">
              ResumeAI analyzes your resume against job descriptions, identifies
              gaps, and helps you align with modern ATS systems used by recruiters.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <a
                href="/register"
                className="btn-primary inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 text-white text-lg font-bold rounded-xl hover:bg-neutral-800 transition shadow-xl hover:shadow-2xl"
              >
                Analyze Resume
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </a>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-orange-500 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white"></div>
                </div>
                <div className="text-sm font-semibold text-neutral-600">
                  <span className="mono text-neutral-900">10,000+</span> users trust us
                </div>
              </div>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-500">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" strokeWidth={2.5} />
              Free • No credit card required • Takes 2 minutes
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-white border-y-2 border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="stat-card text-center">
              <div className="stat-number mono text-4xl font-bold text-neutral-900 mb-2">10K+</div>
              <div className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Active Users</div>
            </div>
            <div className="stat-card text-center border-l-2 border-neutral-200">
              <div className="stat-number mono text-4xl font-bold text-neutral-900 mb-2">50K+</div>
              <div className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Analyses Done</div>
            </div>
            <div className="stat-card text-center border-l-2 border-neutral-200">
              <div className="stat-number mono text-4xl font-bold text-neutral-900 mb-2">95%</div>
              <div className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Match Accuracy</div>
            </div>
            <div className="stat-card text-center border-l-2 border-neutral-200">
              <div className="stat-number mono text-4xl font-bold text-neutral-900 mb-2">100%</div>
              <div className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Free Forever</div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE SECTION */}
      <section id="features" className="py-28 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-neutral-900 text-white text-xs font-bold rounded-full uppercase tracking-wider">
              <Zap className="w-4 h-4" strokeWidth={2.5} />
              Why Choose Us
            </div>
            <h2 className="text-5xl font-bold tracking-tight mb-4">
              Everything you need to land your dream job
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Powerful AI-driven insights that help you stand out from the crowd
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={<Target />}
              title="Match Accuracy"
              desc="Clear percentage-based scoring that shows how closely your resume matches a job role."
              color="emerald"
            />

            <Feature
              icon={<TrendingUp />}
              title="Skill Intelligence"
              desc="Pinpoint missing skills, keywords, and experience recruiters expect to see."
              color="orange"
            />

            <Feature
              icon={<Shield />}
              title="ATS Confidence"
              desc="Designed to align with real Applicant Tracking Systems used in hiring pipelines."
              color="blue"
            />

            <Feature
              icon={<BarChart3 />}
              title="Detailed Analytics"
              desc="Get comprehensive reports on your resume performance and areas for improvement."
              color="purple"
            />

            <Feature
              icon={<Award />}
              title="Expert Recommendations"
              desc="Receive actionable suggestions to optimize your resume for specific roles."
              color="rose"
            />

            <Feature
              icon={<Users />}
              title="Industry Insights"
              desc="Understand what top companies are looking for in candidates like you."
              color="teal"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-28 bg-white border-y-2 border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold tracking-tight mb-4">
              Three simple steps
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Get professional insights in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <Step
              number="1"
              title="Upload Resume"
              desc="Upload your resume in PDF format. Our AI will scan and parse it in seconds."
            />
            <Step
              number="2"
              title="Add Job Description"
              desc="Paste the job description you're targeting. We'll analyze the requirements."
            />
            <Step
              number="3"
              title="Get Insights"
              desc="Receive detailed match scores, missing skills, and optimization suggestions."
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-28 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl border-2 border-neutral-200 p-12 shadow-xl">
            <div className="flex items-start gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-2xl">★</span>
              ))}
            </div>
            <p className="text-2xl font-semibold text-neutral-900 leading-relaxed mb-8">
              "ResumeAI helped me identify gaps in my resume that I never noticed. After optimizing based on their suggestions, I landed 3x more interviews!"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500"></div>
              <div>
                <div className="font-bold text-neutral-900">Sarah Johnson</div>
                <div className="text-sm text-neutral-500">Senior Product Manager</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 border-2 border-neutral-800 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 border-2 border-neutral-800 rounded-full -ml-36 -mb-36"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white/10 border-2 border-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider">
            <Sparkles className="w-4 h-4" strokeWidth={2.5} />
            Start Your Journey
          </div>

          <h2 className="text-6xl font-black tracking-tight mb-6">
            Make your resume speak the recruiter's language
          </h2>

          <p className="text-2xl text-neutral-400 mb-12">
            Upload once. Improve forever. Land your dream job.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="/register"
              className="btn-primary inline-flex items-center gap-3 px-10 py-5 bg-white text-neutral-900 rounded-xl font-bold text-lg hover:bg-neutral-100 transition shadow-2xl"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-3 px-10 py-5 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition"
            >
              Learn More
            </a>
          </div>

          <div className="mt-12 inline-flex items-center gap-2 text-sm font-medium text-neutral-400">
            <CheckCircle2 className="w-5 h-5" strokeWidth={2.5} />
            No credit card required • Free forever • 2 minute setup
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-white border-t-2 border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold">ResumeAI</span>
            </div>
            
            <div className="flex items-center gap-8 text-sm font-semibold text-neutral-600">
              <a href="#" className="hover:text-neutral-900">Privacy</a>
              <a href="#" className="hover:text-neutral-900">Terms</a>
              <a href="#" className="hover:text-neutral-900">Contact</a>
            </div>
            
            <div className="text-sm text-neutral-500 font-medium">
              © 2024 ResumeAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, desc, color }) {
  const colorMap = {
    emerald: 'bg-emerald-600 border-emerald-600',
    orange: 'bg-orange-600 border-orange-600',
    blue: 'bg-blue-600 border-blue-600',
    purple: 'bg-purple-600 border-purple-600',
    rose: 'bg-rose-600 border-rose-600',
    teal: 'bg-teal-600 border-teal-600',
  };

  return (
    <div className="feature-card bg-white rounded-2xl border-2 border-neutral-200 p-8 shadow-lg hover:shadow-2xl">
      <div className={`w-14 h-14 flex items-center justify-center rounded-xl ${colorMap[color]} text-white mb-6 shadow-lg`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 text-neutral-900">{title}</h3>
      <p className="text-neutral-600 leading-relaxed text-base">{desc}</p>
    </div>
  );
}

function Step({ number, title, desc }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-neutral-900 text-white text-3xl font-black mb-6 shadow-xl border-4 border-neutral-200 mono">
        {number}
      </div>
      <h3 className="text-2xl font-bold mb-3 text-neutral-900">{title}</h3>
      <p className="text-neutral-600 leading-relaxed text-base">{desc}</p>
    </div>
  );
}

export default Landing;