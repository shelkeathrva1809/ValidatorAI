import React, { useState } from 'react';
import { Loader2, Sparkles, Target, Briefcase, ChevronRight, Search, Zap, AlertCircle, Info } from 'lucide-react';
import { AnalysisRequest } from '../types';

interface NewAnalysisProps {
  onSubmit: (request: AnalysisRequest) => void;
  isLoading: boolean;
}

export const NewAnalysis: React.FC<NewAnalysisProps> = ({ onSubmit, isLoading }) => {
  const [idea, setIdea] = useState('');
  const [industry, setIndustry] = useState('');
  const [audience, setAudience] = useState('');
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) {
        setTouched(true);
        return;
    }
    onSubmit({
      idea,
      industry,
      targetAudience: audience
    });
  };

  const isError = touched && !idea.trim();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] animate-in fade-in duration-700">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
          <div className="relative w-24 h-24 bg-white rounded-full shadow-2xl flex items-center justify-center border border-indigo-100">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
          </div>
          <div className="absolute -bottom-2 right-0 bg-green-500 rounded-full p-2 border-4 border-white shadow-sm">
             <Search className="w-4 h-4 text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-slate-800 mb-3 text-center">Analyst Agent Working</h2>
        <div className="flex flex-col gap-3 w-full max-w-sm mt-6">
            <div className="flex items-center gap-3 text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-100 shadow-sm animate-pulse">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                Scanning market conditions...
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-100 shadow-sm animate-pulse delay-150">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                Identifying real competitors...
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-100 shadow-sm animate-pulse delay-300">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                Calculating financial projections...
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-500">
      <div className="text-center space-y-4 mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Validate Your Next Big Idea</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Get an investor-grade analysis in seconds. We use live market data to give you a brutal, honest assessment.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden relative">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
            
            {/* Idea Input */}
            <div className="space-y-3 group">
                <div className="flex justify-between items-baseline">
                    <label htmlFor="idea" className="block text-sm font-bold text-slate-700 uppercase tracking-wide group-focus-within:text-indigo-600 transition-colors">
                        The Pitch <span className="text-rose-500">*</span>
                    </label>
                    <span className={`text-xs text-rose-500 font-medium transition-opacity duration-300 ${isError ? 'opacity-100' : 'opacity-0'}`}>
                        Please describe your idea
                    </span>
                </div>
                
                <div className="relative">
                    <div className={`absolute top-5 left-5 transition-all duration-300 ${isError ? 'text-rose-400' : 'text-slate-400 group-focus-within:text-indigo-500 group-focus-within:scale-110'}`}>
                        {isError ? <AlertCircle className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
                    </div>
                    <textarea
                        id="idea"
                        value={idea}
                        onChange={(e) => {
                            setIdea(e.target.value);
                            if (touched) setTouched(false);
                        }}
                        onBlur={() => !idea.trim() && setTouched(true)}
                        placeholder="Describe your startup idea in detail. What problem does it solve? Who is it for? E.g. 'A B2B SaaS platform that helps dentists manage inventory using computer vision...'"
                        className={`w-full h-52 pl-14 pr-6 py-5 rounded-2xl border-2 outline-none transition-all duration-300 resize-none text-lg leading-relaxed
                            ${isError 
                                ? 'border-rose-200 bg-rose-50 text-rose-900 placeholder:text-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-100' 
                                : 'border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:shadow-xl focus:shadow-indigo-500/5'
                            }
                        `}
                    />
                    <div className="absolute bottom-4 right-4 text-xs font-medium text-slate-400 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
                        {idea.length} chars
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Industry Input */}
                <div className="space-y-3 group">
                    <label htmlFor="industry" className="block text-sm font-bold text-slate-700 uppercase tracking-wide group-focus-within:text-indigo-600 transition-colors">
                        Industry
                    </label>
                    <div className="relative">
                        <div className="absolute top-1/2 -translate-y-1/2 left-5 text-slate-400 group-focus-within:text-indigo-500 group-focus-within:scale-110 transition-all duration-300">
                            <Briefcase className="w-5 h-5" />
                        </div>
                        <input
                            id="industry"
                            type="text"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            placeholder="e.g. Fintech, EdTech"
                            className="w-full pl-14 pr-6 py-4 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:shadow-lg focus:shadow-indigo-500/5"
                        />
                    </div>
                </div>

                {/* Audience Input */}
                <div className="space-y-3 group">
                    <label htmlFor="audience" className="block text-sm font-bold text-slate-700 uppercase tracking-wide group-focus-within:text-indigo-600 transition-colors">
                        Target Audience
                    </label>
                    <div className="relative">
                        <div className="absolute top-1/2 -translate-y-1/2 left-5 text-slate-400 group-focus-within:text-indigo-500 group-focus-within:scale-110 transition-all duration-300">
                            <Target className="w-5 h-5" />
                        </div>
                        <input
                            id="audience"
                            type="text"
                            value={audience}
                            onChange={(e) => setAudience(e.target.value)}
                            placeholder="e.g. SMB Owners, Gen Z"
                            className="w-full pl-14 pr-6 py-4 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:shadow-lg focus:shadow-indigo-500/5"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-6">
                <button
                    type="submit"
                    disabled={!idea.trim()}
                    className={`w-full bg-slate-900 text-white px-8 py-5 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-3 group
                        ${!idea.trim() 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:bg-indigo-600 hover:shadow-indigo-500/25 hover:-translate-y-1'
                        }`}
                >
                    <span>Run Validation Analysis</span>
                    <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${idea.trim() ? 'group-hover:translate-x-1' : ''}`} />
                </button>
                <div className="mt-6 flex items-center justify-center gap-6 text-sm text-slate-500 flex-wrap">
                     <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-500"/> Instant AI Analysis</span>
                     <span className="w-1 h-1 rounded-full bg-slate-300 hidden sm:block"></span>
                     <span className="flex items-center gap-1.5"><Search className="w-4 h-4 text-blue-500"/> Live Market Data</span>
                     <span className="w-1 h-1 rounded-full bg-slate-300 hidden sm:block"></span>
                     <span className="flex items-center gap-1.5"><Info className="w-4 h-4 text-emerald-500"/> Private & Secure</span>
                </div>
            </div>
        </form>
      </div>
    </div>
  );
};
