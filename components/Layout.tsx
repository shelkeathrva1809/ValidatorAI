import React from 'react';
import { Rocket, History, PlusCircle, LayoutDashboard } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: 'dashboard' | 'new' | 'report';
  onNavigate: (view: 'dashboard' | 'new') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row text-slate-800">
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-20 shadow-md">
        <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span>ValidatorAI</span>
        </div>
        <div className="flex gap-4">
             <button onClick={() => onNavigate('dashboard')} className={currentView === 'dashboard' ? 'text-indigo-400' : 'text-slate-400'}>
                <History className="w-6 h-6" />
             </button>
             <button onClick={() => onNavigate('new')} className={currentView === 'new' ? 'text-indigo-400' : 'text-slate-400'}>
                <PlusCircle className="w-6 h-6" />
             </button>
        </div>
      </div>

      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-slate-900 text-slate-300 h-screen sticky top-0 border-r border-slate-800 shadow-xl">
        <div className="p-8 flex items-center gap-3 font-bold text-xl text-white tracking-tight">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-900/50">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <span>ValidatorAI</span>
        </div>
        
        <div className="px-6 py-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Menu</p>
            <nav className="space-y-2">
            <button
                onClick={() => onNavigate('new')}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                currentView === 'new' 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
            >
                <PlusCircle className={`w-5 h-5 ${currentView === 'new' ? 'text-indigo-200' : 'text-slate-500 group-hover:text-slate-400'}`} />
                New Analysis
            </button>

            <button
                onClick={() => onNavigate('dashboard')}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                currentView === 'dashboard' 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
            >
                <LayoutDashboard className={`w-5 h-5 ${currentView === 'dashboard' ? 'text-indigo-200' : 'text-slate-500 group-hover:text-slate-400'}`} />
                Dashboard
            </button>
            </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-xs text-slate-400 leading-relaxed">
              Powered by <span className="text-indigo-400 font-semibold">Gemini 3 Pro</span>
              <br />& Google Search Grounding
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto p-4 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
};