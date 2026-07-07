import { GoogleGenAI } from "@google/genai";
import { Report, AnalysisRequest } from '../types';

const SYSTEM_INSTRUCTION = `
You are a world-class Venture Capital Analyst and Startup Validator. 
Your goal is to provide a brutal, honest, and data-backed analysis of startup ideas.
You MUST use Google Search to find real competitors and market data.
Do not hallucinate competitors; find real ones.

Output Format:
You must return ONLY a strictly valid JSON object. 
Do not include any conversational text, preamble, or markdown code blocks (like \`\`\`json).
Just the raw JSON string.
The JSON must match this structure:
{
  "title": "Short catchy name for the idea",
  "summary": "2-3 sentence executive summary",
  "decision": "GO" | "CAUTION" | "NO-GO",
  "decisionRationale": "Why this decision? Be direct.",
  "market": {
    "tam": "Just the number/currency for Total Addressable Market (e.g. '$45B')",
    "sam": "Just the number/currency for Serviceable Available Market",
    "som": "Just the number/currency for Serviceable Obtainable Market",
    "growthRate": "CAGR percentage (e.g. '12.5%')",
    "overview": "A detailed paragraph analyzing the market dynamics, trends, and saturation.",
    "marketDrivers": ["Driver 1", "Driver 2"],
    "segments": ["Segment A", "Segment B"]
  },
  "competitors": [
    {
      "name": "Competitor Name",
      "type": "Direct" | "Indirect",
      "description": "What they do",
      "strengths": ["Strength 1", "Strength 2"],
      "weaknesses": ["Weakness 1", "Weakness 2"]
    }
  ],
  "businessModel": "How it makes money (e.g. SaaS, Marketplace, etc)",
  "technical": {
    "complexity": "Low" | "Medium" | "High" | "Very High",
    "suggestedStack": ["Tech A", "Tech B"],
    "developmentTimeline": "Estimate for MVP (e.g. 3 months)",
    "keyChallenges": ["Challenge 1", "Challenge 2"]
  },
  "financials": {
    "initialFundingEstimate": "Estimate for first 12 months (e.g. $50k - $100k)",
    "breakEvenTimeline": "Estimate (e.g. 18 months)",
    "revenueStreams": ["Stream 1", "Stream 2"],
    "costStructure": ["Cost 1", "Cost 2"]
  },
  "risks": ["Critical Risk 1", "Critical Risk 2", "Critical Risk 3"],
  "nextSteps": ["Step 1", "Step 2", "Step 3", "Step 4"]
}
`;

export const analyzeIdea = async (request: AnalysisRequest): Promise<Report> => {
  // Prefer OpenRouter if configured
  if (process.env.OPENROUTER_API_KEY) {
    return analyzeWithOpenRouter(request);
  }

  if (!process.env.API_KEY) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Analyze this startup idea:
    Idea: ${request.idea}
    ${request.industry ? `Industry: ${request.industry}` : ''}
    ${request.targetAudience ? `Target Audience: ${request.targetAudience}` : ''}

    Perform deep research using Google Search to validate the market and find REAL competitors.
    Provide a professional investor-grade report in the specified JSON format.
    Ensure TAM, SAM, and SOM are concise estimates (e.g. "$10B"), not full sentences. Use the 'overview' field for text analysis.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
        temperature: 0.4, 
      },
    });

    let text = response.text || '';
    
    // Robust JSON extraction
    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}');

    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      text = text.substring(startIndex, endIndex + 1);
    } else {
      text = text.replace(/```json\n/g, '').replace(/```/g, '').trim();
    }

    let data;
    try {
        data = JSON.parse(text);
    } catch (parseError) {
        console.error("Failed to parse JSON:", text);
        throw new Error("The AI response was not valid JSON.");
    }
    
    // Extract sources
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web?.uri && chunk.web?.title)
      .map((chunk: any) => ({
        title: chunk.web.title,
        uri: chunk.web.uri
      }));

    const uniqueSources = Array.from(new Map(sources.map((s: any) => [s.uri, s])).values()) as Array<{title: string, uri: string}>;

    return {
      id: crypto.randomUUID(),
      ideaDescription: request.idea,
      createdAt: Date.now(),
      ...data,
      sources: uniqueSources
    };

  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    
    if (error.message === "The AI response was not valid JSON." || error.message === "API Key is missing.") {
        throw error;
    }

    if (error.status === 429 || error.message?.includes('429') || error.message?.includes('quota')) {
         throw new Error("API Quota Exceeded. Please try again later or check your API plan.");
    }
    
    throw new Error("Failed to generate analysis. Please try again.");
  }
};

// OpenRouter variant (OpenAI-compatible chat completions)
const OPENROUTER_SYSTEM_INSTRUCTION = `
You are a world-class Venture Capital Analyst and Startup Validator.
Provide a brutal, honest, and data-backed analysis of startup ideas.
– Find real competitors and market data. Cite reputable sources when you can; if unsure, return "Unknown" rather than fabricating.
– Return ONLY a strictly valid JSON object matching the required schema below.

JSON schema to follow exactly (same as original app expects):
{
  "title": "Short catchy name for the idea",
  "summary": "2-3 sentence executive summary",
  "decision": "GO" | "CAUTION" | "NO-GO",
  "decisionRationale": "Why this decision? Be direct.",
  "market": {
    "tam": "Just the number/currency for Total Addressable Market (e.g. '$45B')",
    "sam": "Just the number/currency for Serviceable Available Market",
    "som": "Just the number/currency for Serviceable Obtainable Market",
    "growthRate": "CAGR percentage (e.g. '12.5%')",
    "overview": "A detailed paragraph analyzing the market dynamics, trends, and saturation.",
    "marketDrivers": ["Driver 1", "Driver 2"],
    "segments": ["Segment A", "Segment B"]
  },
  "competitors": [
    {
      "name": "Competitor Name",
      "type": "Direct" | "Indirect",
      "description": "What they do",
      "strengths": ["Strength 1", "Strength 2"],
      "weaknesses": ["Weakness 1", "Weakness 2"]
    }
  ],
  "businessModel": "How it makes money (e.g. SaaS, Marketplace, etc)",
  "technical": {
    "complexity": "Low" | "Medium" | "High" | "Very High",
    "suggestedStack": ["Tech A", "Tech B"],
    "developmentTimeline": "Estimate for MVP (e.g. 3 months)",
    "keyChallenges": ["Challenge 1", "Challenge 2"]
  },
  "financials": {
    "initialFundingEstimate": "Estimate for first 12 months (e.g. $50k - $100k)",
    "breakEvenTimeline": "Estimate (e.g. 18 months)",
    "revenueStreams": ["Stream 1", "Stream 2"],
    "costStructure": ["Cost 1", "Cost 2"]
  },
  "risks": ["Critical Risk 1", "Critical Risk 2", "Critical Risk 3"],
  "nextSteps": ["Step 1", "Step 2", "Step 3", "Step 4"]
}
`;

async function analyzeWithOpenRouter(request: AnalysisRequest): Promise<Report> {
  const apiKey = process.env.OPENROUTER_API_KEY as string;
  const model = (process.env.OPENROUTER_MODEL as string) || 'google/gemini-2.0-flash-exp:free';

  const prompt = `
    Analyze this startup idea:
    Idea: ${request.idea}
    ${request.industry ? `Industry: ${request.industry}` : ''}
    ${request.targetAudience ? `Target Audience: ${request.targetAudience}` : ''}

    Provide a professional investor-grade report in the specified JSON format.
    Ensure TAM, SAM, and SOM are concise estimates (e.g. "$10B"), not full sentences. Use the 'overview' field for text analysis.
  `;

  const headers: Record<string, string> = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'X-Title': 'ValidatorAI'
  };
  try {
    // Optional but recommended by OpenRouter: include referer
    if (typeof window !== 'undefined' && window.location?.origin) {
      headers['HTTP-Referer'] = window.location.origin;
    }

    const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: OPENROUTER_SYSTEM_INSTRUCTION },
          { role: 'user', content: prompt }
        ],
        temperature: 0.4
      })
    });

    if (!resp.ok) {
      // Try to extract useful error details
      let details = '';
      try {
        const j = await resp.json();
        details = j?.error?.message || JSON.stringify(j);
      } catch {
        details = await resp.text();
      }
      throw new Error(`OpenRouter request failed (${resp.status}): ${details}`);
    }

    const data = await resp.json();
    let text: string = data?.choices?.[0]?.message?.content ?? '';

    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}');
    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      text = text.substring(startIndex, endIndex + 1);
    } else {
      text = text.replace(/```json\n/g, '').replace(/```/g, '').trim();
    }

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      console.error('Failed to parse JSON from OpenRouter:', text);
      throw new Error('The AI response was not valid JSON.');
    }

    return {
      id: crypto.randomUUID(),
      ideaDescription: request.idea,
      createdAt: Date.now(),
      ...parsed,
      sources: [] // OpenRouter response does not include grounding metadata
    } as Report;
  } catch (error: any) {
    if (error.message?.includes('429') || error.message?.toLowerCase().includes('quota')) {
      throw new Error('API Quota Exceeded. Please try again later or check your API plan.');
    }
    // Surface the underlying error message to the UI for easier debugging
    console.error('OpenRouter error:', error);
    throw new Error(error?.message || 'Failed to generate analysis. Please try again.');
  }
}