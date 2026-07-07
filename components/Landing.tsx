import React, { useEffect, useState } from 'react';
import { Rocket, ChevronRight, CheckCircle, BarChart3, Zap, ShieldCheck, Search } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden font-sans">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3 font-bold text-xl tracking-tight">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span>ValidatorAI</span>
          </div>
          <button 
            onClick={onStart}
            className="hidden md:flex bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-2.5 rounded-full font-medium transition-all border border-white/10"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Grids */}
        <div className="absolute inset-0 hero-grid-bg opacity-20 pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 delay-100 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Powered by Gemini 2.5 Flash
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
              Validate your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                startup idea
              </span>
              <br /> in seconds.
            </h1>
            
            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              Stop guessing. Get investor-grade market analysis, competitor intelligence, and a brutal feasibility score before you write a single line of code.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={onStart}
                className="group bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-900/50 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                Start Analysis
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 rounded-xl font-bold text-lg text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                  <span className="text-xs">▶</span>
                </div>
                How it works
              </button>
            </div>

            <div className="pt-8 flex items-center gap-6 text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> Free Tier
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> No Card Required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> Export to PDF
              </div>
            </div>
          </div>

          {/* Right 3D Visual */}
          <div className={`perspective-1000 relative h-[600px] hidden lg:block transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="transform-style-3d animate-float-slow w-full h-full flex items-center justify-center">
              
              {/* Back Card (Decor) */}
              <div className="absolute top-10 right-10 w-[400px] h-[500px] bg-slate-800 rounded-3xl border border-slate-700 opacity-40 transform -translate-z-20 rotate-6 shadow-2xl"></div>
              
              {/* Main Card */}
              <div className="absolute w-[420px] bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl shadow-black/50 overflow-hidden transform rotateY-12">
                {/* Card Header */}
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  </div>
                  <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20">
                    GO / VIABLE
                  </div>
                </div>
                
                {/* Card Body */}
                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <div className="h-2 w-20 bg-slate-700 rounded animate-pulse"></div>
                    <h3 className="text-2xl font-bold text-white">AI Dental Inventory</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                      <p className="text-xs text-slate-400 mb-1">Market Size (TAM)</p>
                      <p className="text-xl font-mono text-indigo-400">$4.2B</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                      <p className="text-xs text-slate-400 mb-1">Growth (CAGR)</p>
                      <p className="text-xl font-mono text-emerald-400">12.5%</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs text-slate-500 font-bold uppercase">Competitors Found</p>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs">Z</div>
                      <div className="flex-1">
                        <div className="h-2 w-24 bg-slate-700 rounded mb-1.5"></div>
                        <div className="h-1.5 w-16 bg-slate-800 rounded"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-xs">O</div>
                      <div className="flex-1">
                        <div className="h-2 w-20 bg-slate-700 rounded mb-1.5"></div>
                        <div className="h-1.5 w-12 bg-slate-800 rounded"></div>
                      </div>
                    </div>
                  </div>

                   <div className="h-32 mt-4 rounded-xl bg-gradient-to-t from-indigo-500/10 to-transparent border border-indigo-500/10 relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-900 to-transparent"></div>
                      {/* Fake Chart Lines */}
                      <svg className="w-full h-full absolute bottom-0" preserveAspectRatio="none">
                         <path d="M0,100 Q50,50 100,80 T200,40 T300,60 T400,20" fill="none" stroke="#6366f1" strokeWidth="3" />
                      </svg>
                   </div>
                </div>
              </div>

              {/* Floating Element 1 */}
              <div className="absolute -right-12 top-20 bg-white text-slate-900 p-4 rounded-2xl shadow-xl transform translate-z-10 animate-float-medium">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400">Feasibility</p>
                    <p className="text-lg font-bold">High</p>
                  </div>
                </div>
              </div>

              {/* Floating Element 2 */}
              <div className="absolute -left-8 bottom-32 bg-slate-800 text-white p-4 rounded-2xl shadow-xl border border-slate-600 transform translate-z-20 animate-float-fast">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-500/20 p-2 rounded-lg text-indigo-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400">Sources</p>
                    <p className="text-sm font-bold">12 Verified</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-slate-800/50 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why use ValidatorAI?</h2>
            <p className="text-slate-400">We replace weeks of research with 30 seconds of AI processing.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Deep Search Grounding",
                desc: "We don't just chat. We actively search the live web to find real competitors and current market trends."
              },
              {
                icon: BarChart3,
                title: "Investor-Grade Metrics",
                desc: "Get TAM/SAM/SOM calculations, CAGR estimates, and funding requirements automatically."
              },
              {
                icon: ShieldCheck,
                title: "Unbiased Feasibility",
                desc: "Our AI plays the role of a skeptical investor to help you identify risks before they become expensive failures."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-colors group">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                  <feature.icon className="w-6 h-6 text-indigo-400 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to test your hypothesis?</h2>
          <p className="text-xl text-slate-400 mb-10">
            Join thousands of founders who stopped guessing and started building with confidence.
          </p>
          <button 
            onClick={onStart}
            className="bg-white text-slate-900 hover:bg-indigo-50 px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-white/10 transition-all transform hover:-translate-y-1"
          >
            Start Your Analysis Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} ValidatorAI. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};