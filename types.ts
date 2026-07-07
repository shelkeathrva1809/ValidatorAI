export type Decision = 'GO' | 'CAUTION' | 'NO-GO';

export interface Competitor {
  name: string;
  type: 'Direct' | 'Indirect';
  description: string;
  strengths: string[];
  weaknesses: string[];
  url?: string;
}

export interface MarketData {
  tam: string;
  sam: string;
  som: string;
  growthRate: string;
  marketDrivers: string[];
  segments: string[];
  overview?: string; // New field for detailed market analysis
}

export interface Financials {
  initialFundingEstimate: string;
  breakEvenTimeline: string;
  revenueStreams: string[];
  costStructure: string[];
}

export interface Technical {
  complexity: 'Low' | 'Medium' | 'High' | 'Very High';
  suggestedStack: string[];
  developmentTimeline: string;
  keyChallenges: string[];
}

export interface Report {
  id: string;
  title: string;
  ideaDescription: string;
  createdAt: number;
  summary: string;
  decision: Decision;
  decisionRationale: string;
  market: MarketData;
  competitors: Competitor[];
  businessModel: string;
  technical: Technical;
  financials: Financials;
  risks: string[];
  nextSteps: string[];
  sources: Array<{ title: string; uri: string }>;
}

export interface AnalysisRequest {
  idea: string;
  industry?: string;
  targetAudience?: string;
}