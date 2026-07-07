import { Report } from '../types';

const STORAGE_KEY = 'validator_ai_reports_v1';

const API_BASE = '/api';

async function tryFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
      ...init,
    });
    if (!res.ok) return null;
    if (res.status === 204) return null as unknown as T;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export const saveReport = async (report: Report): Promise<void> => {
  try {
    // Try backend first
    const ok = await tryFetch<{ ok: boolean }>(`/reports`, {
      method: 'POST',
      body: JSON.stringify(report),
    });
    // Always mirror to localStorage so the UI has immediate access
    const existing = getReports();
    const filtered = existing.filter(r => r.id !== report.id);
    const updated = [report, ...filtered];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save report', e);
  }
};

export const getReports = (): Report[] => {
  try {
    // Try backend first (sync wrapper calling async is not allowed; so keep it simple)
    // Consumers call this synchronously; provide best-effort sync from local cache and let UI refresh on save.
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to load reports', e);
    return [];
  }
};

export const getReportById = (id: string): Report | undefined => {
  const reports = getReports();
  return reports.find((r) => r.id === id);
};

export const deleteReport = async (id: string): Promise<void> => {
    try {
        // Try backend
        await tryFetch<{ ok: boolean }>(`/reports/${encodeURIComponent(id)}`, { method: 'DELETE' });
        // Mirror to localStorage
        const reports = getReports();
        const updated = reports.filter(r => r.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
        console.error('Failed to delete report', e);
    }
}