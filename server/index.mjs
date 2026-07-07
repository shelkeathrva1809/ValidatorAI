import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';

const PORT = process.env.PORT ? Number(process.env.PORT) : 8787;
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
const DB_PATH = process.env.DB_PATH || path.join(DATA_DIR, 'validatorai.db');

fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.prepare(`
  CREATE TABLE IF NOT EXISTS reports (
    id TEXT PRIMARY KEY,
    createdAt INTEGER NOT NULL,
    title TEXT,
    ideaDescription TEXT,
    json TEXT NOT NULL
  )
`).run();

const insertStmt = db.prepare(
  'INSERT OR REPLACE INTO reports (id, createdAt, title, ideaDescription, json) VALUES (@id, @createdAt, @title, @ideaDescription, @json)'
);
const allStmt = db.prepare('SELECT json FROM reports ORDER BY createdAt DESC');
const getStmt = db.prepare('SELECT json FROM reports WHERE id = ?');
const delStmt = db.prepare('DELETE FROM reports WHERE id = ?');

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/api/reports', (req, res) => {
  try {
    const rows = allStmt.all();
    const reports = rows.map(r => JSON.parse(r.json));
    res.json(reports);
  } catch (e) {
    console.error('List reports failed', e);
    res.status(500).json({ error: 'Failed to list reports' });
  }
});

app.get('/api/reports/:id', (req, res) => {
  try {
    const row = getStmt.get(req.params.id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(JSON.parse(row.json));
  } catch (e) {
    console.error('Get report failed', e);
    res.status(500).json({ error: 'Failed to get report' });
  }
});

app.post('/api/reports', (req, res) => {
  try {
    const report = req.body;
    if (!report?.id) return res.status(400).json({ error: 'Missing id' });
    insertStmt.run({
      id: report.id,
      createdAt: report.createdAt ?? Date.now(),
      title: report.title ?? null,
      ideaDescription: report.ideaDescription ?? null,
      json: JSON.stringify(report)
    });
    res.json({ ok: true });
  } catch (e) {
    console.error('Save report failed', e);
    res.status(500).json({ error: 'Failed to save report' });
  }
});

app.delete('/api/reports/:id', (req, res) => {
  try {
    delStmt.run(req.params.id);
    res.status(204).end();
  } catch (e) {
    console.error('Delete report failed', e);
    res.status(500).json({ error: 'Failed to delete report' });
  }
});

app.listen(PORT, () => {
  console.log(`ValidatorAI DB server listening on http://localhost:${PORT}`);
  console.log(`DB path: ${DB_PATH}`);
});
