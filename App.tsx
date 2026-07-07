import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { NewAnalysis } from './components/NewAnalysis';
import { ReportView } from './components/ReportView';
import { Landing } from './components/Landing';
import { Report, AnalysisRequest } from './types';
import { analyzeIdea } from './services/gemini';
import { saveReport, getReports, deleteReport } from './services/storage';

type View = 'landing' | 'dashboard' | 'new' | 'report';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Load reports on mount
    const saved = getReports();
    setReports(saved);
    // If reports exist, we could skip landing, but for this demo let's always show landing or check if user has 'visited'
    // For now, default to landing unless manually navigating
  }, []);

  const handleNavigate = (view: 'dashboard' | 'new') => {
    setCurrentView(view);
    if (view === 'dashboard') {
        setReports(getReports()); // Refresh
        setSelectedReport(null);
    }
  };

  const handleAnalysisSubmit = async (request: AnalysisRequest) => {
    setIsAnalyzing(true);
    try {
      const report = await analyzeIdea(request);
      saveReport(report);
      setReports(getReports());
      setSelectedReport(report);
      setCurrentView('report');
    } catch (error: any) {
      alert(error.message || "Analysis failed. Please check your API key and try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectReport = (report: Report) => {
    setSelectedReport(report);
    setCurrentView('report');
  };

  const handleDeleteReport = (id: string) => {
      deleteReport(id);
      setReports(getReports());
      if (selectedReport?.id === id) {
          setSelectedReport(null);
          setCurrentView('dashboard');
      }
  };

  if (currentView === 'landing') {
    return <Landing onStart={() => setCurrentView('dashboard')} />;
  }

  return (
    <Layout currentView={currentView === 'report' ? 'dashboard' : currentView} onNavigate={handleNavigate}>
      {currentView === 'dashboard' && (
        <Dashboard 
            reports={reports} 
            onSelect={handleSelectReport} 
            onDelete={handleDeleteReport}
            onNew={() => setCurrentView('new')} 
        />
      )}
      
      {currentView === 'new' && (
        <NewAnalysis onSubmit={handleAnalysisSubmit} isLoading={isAnalyzing} />
      )}

      {currentView === 'report' && selectedReport && (
        <ReportView report={selectedReport} onBack={() => setCurrentView('dashboard')} />
      )}
    </Layout>
  );
};

export default App;