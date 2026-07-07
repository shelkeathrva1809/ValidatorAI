import React from 'react';
import { Report } from '../types';
import { 
  ArrowLeft, CheckCircle, AlertTriangle, XCircle, 
  BarChart3, Globe, Zap, DollarSign, Layers, ShieldAlert,
  ExternalLink, Code, Scale, TrendingUp
} from 'lucide-react';

interface ReportViewProps {
  report: Report;
  onBack: () => void;
}

const DecisionHero = ({ decision, rationale }: { decision: string, rationale: string }) => {
  const styles = {
    'GO': { 
        bg: 'bg-emerald-50', 
        border: 'border-emerald-200', 
        text: 'text-emerald-900', 
        accent: 'text-emerald-600',
        icon: CheckCircle 
    },
    'CAUTION': { 
        bg: 'bg-amber-50', 
        border: 'border-amber-200', 
        text: 'text-amber-900', 
        accent: 'text-amber-600',
        icon: AlertTriangle 
    },
    'NO-GO': { 
        bg: 'bg-rose-50', 
        border: 'border-rose-200', 
        text: 'text-rose-900', 
        accent: 'text-rose-600',
        icon: XCircle 
    },
  };

  const style = styles[decision as keyof typeof styles] || styles['CAUTION'];
  const Icon = style.icon;

  return (
    <div className={`p-8 rounded-2xl border-2 ${style.border} ${style.bg} mb-8 relative overflow-hidden`}>
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className={`p-4 rounded-xl bg-white shadow-sm ${style.accent}`}>
          <Icon className="w-10 h-10" />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 bg-white/60 rounded ${style.accent}`}>Recommendation</span>
          </div>
          <h2 className={`text-4xl font-extrabold ${style.text} tracking-tight mb-3`}>{decision}</h2>
          <p className={`${style.text} text-lg leading-relaxed max-w-3xl opacity-90`}>{rationale}</p>
        </div>
      </div>
      {/* Decorative background element */}
      <div className={`absolute -right-10 -bottom-20 w-64 h-64 rounded-full ${style.accent} opacity-10 blur-3xl`}></div>
    </div>
  );
};

const SectionHeader = ({ icon: Icon, title, color = "text-indigo-600" }: { icon: any, title: string, color?: string }) => (
  <div className="flex items-center gap-2 mb-6">
    <div className={`p-1.5 rounded-lg bg-slate-100 ${color}`}>
        <Icon className="w-4 h-4" />
    </div>
    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">{title}</h3>
  </div>
);

const Card = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}>
    {children}
  </div>
);

export const ReportView: React.FC<ReportViewProps> = ({ report, onBack }) => {
  
  return (
    <div className="animate-in slide-in-from-bottom-8 duration-700 pb-20">
      <nav className="flex items-center justify-between mb-8">
        <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-white"
        >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
        </button>
        <span className="text-xs font-mono text-slate-400">{report.id.split('-')[0]}</span>
      </nav>

      <header className="mb-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">{report.title}</h1>
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">{report.summary}</p>
      </header>

      <DecisionHero decision={report.decision} rationale={report.decisionRationale} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {/* Market Opportunity - Redesigned without chart for robustness */}
        <Card className="xl:row-span-2">
          <SectionHeader icon={Globe} title="Market Opportunity" />
          
          <div className="grid grid-cols-1 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/5 rounded-bl-full transition-transform group-hover:scale-110"></div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wide mb-1">Total Addressable (TAM)</p>
                <p className="text-2xl font-bold text-slate-900 font-mono tracking-tight">{report.market.tam}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wide mb-1">SAM</p>
                    <p className="text-lg font-bold text-slate-700 font-mono truncate" title={report.market.sam}>{report.market.sam}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wide mb-1">SOM</p>
                    <p className="text-lg font-bold text-slate-700 font-mono truncate" title={report.market.som}>{report.market.som}</p>
                </div>
            </div>
          </div>

          <div className="space-y-6">
             <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-900">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <div>
                    <p className="text-xs uppercase font-bold tracking-wide opacity-70">Projected Growth (CAGR)</p>
                    <p className="text-xl font-bold font-mono">{report.market.growthRate}</p>
                </div>
             </div>
             
             {report.market.overview && (
                 <div className="prose prose-sm prose-slate">
                     <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Market Analysis</h4>
                     <p className="text-slate-600 leading-relaxed text-sm bg-transparent">
                         {report.market.overview}
                     </p>
                 </div>
             )}

             <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Key Drivers</h4>
                <ul className="space-y-2">
                    {report.market.marketDrivers.slice(0, 4).map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                            {d}
                        </li>
                    ))}
                </ul>
             </div>
          </div>
        </Card>

        {/* Business Model */}
        <Card className="xl:col-span-2 bg-gradient-to-br from-indigo-950 to-slate-900 text-white border-none relative overflow-hidden">
            {/* Background noise texture effect */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            <div className="relative z-10">
                <div className="flex items-start justify-between">
                    <div>
                        <SectionHeader icon={DollarSign} title="Business Model" color="text-indigo-400 bg-white/10" />
                        <h3 className="text-2xl font-bold mb-4">{report.businessModel}</h3>
                    </div>
                    <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md shadow-lg">
                        <Scale className="w-6 h-6 text-indigo-300" />
                    </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                        <p className="text-[10px] text-indigo-200 uppercase font-bold tracking-wide mb-2">Funding Needed</p>
                        <p className="text-lg font-bold font-mono tracking-tight">{report.financials.initialFundingEstimate}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                        <p className="text-[10px] text-indigo-200 uppercase font-bold tracking-wide mb-2">Break-even</p>
                        <p className="text-lg font-bold font-mono tracking-tight">{report.financials.breakEvenTimeline}</p>
                    </div>
                    <div className="col-span-2 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                        <p className="text-[10px] text-indigo-200 uppercase font-bold tracking-wide mb-2">Revenue Streams</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {report.financials.revenueStreams.slice(0,3).map((s, i) => (
                                <span key={i} className="text-xs bg-indigo-500/30 px-2.5 py-1 rounded-md text-indigo-100 border border-indigo-500/30 font-medium">{s}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        {/* Competitors */}
        <Card className="xl:col-span-2">
          <SectionHeader icon={BarChart3} title="Competitive Intelligence" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.competitors.map((comp, i) => (
                <div key={i} className="group p-5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
                    <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">{comp.name}</h4>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide ${comp.type === 'Direct' ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-600'}`}>
                            {comp.type}
                        </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">{comp.description}</p>
                    
                    <div className="space-y-2 pt-2 border-t border-slate-100/50">
                         <div className="flex gap-2">
                            <div className="w-1 rounded-full bg-emerald-500 h-auto self-stretch" />
                            <p className="text-xs text-slate-500 flex-1 leading-normal"><span className="font-semibold text-slate-700 block mb-0.5">Strength</span> {comp.strengths[0]}</p>
                         </div>
                         <div className="flex gap-2 mt-2">
                            <div className="w-1 rounded-full bg-rose-500 h-auto self-stretch" />
                            <p className="text-xs text-slate-500 flex-1 leading-normal"><span className="font-semibold text-slate-700 block mb-0.5">Weakness</span> {comp.weaknesses[0]}</p>
                         </div>
                    </div>
                </div>
            ))}
            {report.competitors.length === 0 && <p className="text-slate-500 italic">No direct competitors identified.</p>}
          </div>
        </Card>

        {/* Technical */}
        <Card>
            <SectionHeader icon={Code} title="Technical Feasibility" />
             <div className="flex items-center justify-between mb-6 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-sm font-bold text-slate-700">Complexity Score</div>
                <div className={`text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wide border ${
                    report.technical.complexity === 'Low' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                    report.technical.complexity === 'Medium' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                    'bg-rose-100 text-rose-700 border-rose-200'
                }`}>
                    {report.technical.complexity}
                </div>
            </div>
            
            <div className="space-y-5">
                 <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Recommended Stack</h4>
                    <div className="flex flex-wrap gap-2">
                        {report.technical.suggestedStack.map((s, i) => (
                            <span key={i} className="px-2.5 py-1 text-xs font-mono font-medium bg-white text-slate-600 rounded-md border border-slate-200 shadow-sm">
                                {s}
                            </span>
                        ))}
                    </div>
                 </div>
                 
                 <div className="pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-400 uppercase font-bold mb-2">Time to MVP</p>
                    <div className="flex items-center gap-2 text-slate-800 font-bold bg-indigo-50 px-3 py-2 rounded-lg border border-indigo-100 text-sm">
                        <Layers className="w-4 h-4 text-indigo-500" />
                        {report.technical.developmentTimeline}
                    </div>
                 </div>
            </div>
        </Card>

        {/* Risks - Warning Style */}
        <Card className="border-l-4 border-l-rose-500 bg-gradient-to-br from-white to-rose-50/50">
            <SectionHeader icon={ShieldAlert} title="Risk Assessment" color="text-rose-600" />
            <ul className="space-y-4">
                {report.risks.map((risk, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-700 bg-white p-3 rounded-lg border border-rose-100 shadow-sm">
                        <span className="font-mono text-rose-500 font-bold bg-rose-50 w-6 h-6 rounded flex items-center justify-center text-xs shrink-0">{i+1}</span>
                        <span className="leading-relaxed">{risk}</span>
                    </li>
                ))}
            </ul>
        </Card>

         {/* Action Plan */}
         <Card className="md:col-span-2 xl:col-span-2 bg-indigo-50 border-indigo-100">
            <SectionHeader icon={Zap} title="Strategic Roadmap" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {report.nextSteps.map((step, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm flex gap-4 items-center hover:shadow-md transition-shadow">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0 border border-indigo-200">
                            {i+1}
                        </div>
                        <p className="text-sm font-medium text-slate-800 leading-relaxed">{step}</p>
                    </div>
                ))}
            </div>
        </Card>
      </div>

      {/* Sources Footer */}
      {report.sources && report.sources.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-200">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Verified Sources</h3>
                <div className="flex flex-wrap gap-3">
                    {report.sources.map((source, i) => (
                        <a 
                            key={i} 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs text-slate-500 hover:text-indigo-600 bg-white px-3 py-1.5 rounded-full border border-slate-200 hover:border-indigo-300 transition-colors shadow-sm"
                        >
                            <ExternalLink className="w-3 h-3" />
                            <span className="max-w-[250px] truncate">{source.title}</span>
                        </a>
                    ))}
                </div>
            </div>
        )}
    </div>
  );
};