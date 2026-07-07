import React from 'react';
import { Report } from '../types';
import { ChevronRight, Trash2, Calendar, TrendingUp, DollarSign, Activity } from 'lucide-react';

interface DashboardProps {
  reports: Report[];
  onSelect: (report: Report) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
}

const DecisionBadge = ({ decision }: { decision: string }) => {
  const styles = {
    'GO': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'CAUTION': 'bg-amber-100 text-amber-700 border-amber-200',
    'NO-GO': 'bg-rose-100 text-rose-700 border-rose-200',
  };
  const style = styles[decision as keyof typeof styles] || styles['CAUTION'];
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${style} tracking-wide`}>
      {decision}
    </span>
  );
};

export const Dashboard: React.FC<DashboardProps> = ({ reports, onSelect, onDelete, onNew }) => {
  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <TrendingUp className="w-10 h-10 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">No analyses yet</h2>
        <p className="text-slate-500 mb-8 max-w-md">
          Your dashboard is empty. Submit your first startup idea to get a comprehensive validation report.
        </p>
        <button
          onClick={onNew}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1"
        >
          Create First Report
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-slate-200 pb-6">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-slate-500 mt-1">Manage your validation reports and insights.</p>
        </div>
        <button
          onClick={onNew}
          className="bg-slate-900 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md transition-all flex items-center gap-2"
        >
          + New Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reports.map((report) => {
            const borderColor = 
                report.decision === 'GO' ? 'border-l-emerald-500' : 
                report.decision === 'CAUTION' ? 'border-l-amber-500' : 'border-l-rose-500';

            return (
                <div
                    key={report.id}
                    onClick={() => onSelect(report)}
                    className={`group relative bg-white p-6 rounded-xl border-t border-r border-b border-l-[6px] ${borderColor} border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1`}
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <DecisionBadge decision={report.decision} />
                                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(report.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                                {report.title || "Untitled Analysis"}
                            </h3>
                        </div>
                    </div>

                    <p className="text-slate-500 text-sm line-clamp-2 mb-6 h-10 leading-relaxed">
                        {report.summary}
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                        <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                                <Activity className="w-3 h-3" /> Market Size
                            </p>
                            <p className="text-sm font-semibold text-slate-700 font-mono">{report.market.tam}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                                <DollarSign className="w-3 h-3" /> Funding
                            </p>
                            <p className="text-sm font-semibold text-slate-700 font-mono">{report.financials.initialFundingEstimate}</p>
                        </div>
                    </div>

                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if(confirm('Are you sure you want to delete this report?')) {
                                    onDelete(report.id);
                                }
                            }}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                             <ChevronRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
};