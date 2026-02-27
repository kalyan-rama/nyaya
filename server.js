// server.js — NYAYA Server (serves React frontend + health check)
// No Gemini API needed — chatbot is 100% offline via legalKnowledgeBase.js
const http = require('http');
const fs   = require('fs');
const path = require('path');

// Load .env if present
try {
  const env = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
  env.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) return;
    const key = trimmed.substring(0, eqIdx).trim();
    let val = trimmed.substring(eqIdx + 1).trim();
    if (val.indexOf(' #') !== -1) val = val.substring(0, val.indexOf(' #')).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
    if (key) process.env[key] = val;
  });
  console.log('✅ .env loaded');
} catch(e) { console.log('⚠️  No .env file — that is OK, chatbot is fully offline'); }

const PORT = process.env.PORT || 3001;

// MIME types for static file serving
const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
  '.svg':  'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.txt':  'text/plain',
};

// Serve a static file; falls back to index.html for React Router
function serveStatic(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Not found → serve index.html (React Router catch-all)
      const idx = path.join(__dirname, 'build', 'index.html');
      fs.readFile(idx, (err2, html) => {
        if (err2) { res.writeHead(404); res.end('Not found'); return; }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
      });
      return;
    }
    const ct = MIME[path.extname(filePath)] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': ct });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }

  // ── Health check ──────────────────────────────────────
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      mode: 'offline-legal-engine',
      chatbot: '100% offline — no API key needed',
      laws: '30+ Indian laws in knowledge base'
    }));
    return;
  }

  // ── Serve React frontend ──────────────────────────────
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.join(__dirname, 'build', urlPath);
  serveStatic(res, filePath);
});

server.listen(PORT, () => {
  console.log('\n🟢 NYAYA Server — Offline Legal Engine Mode');
  console.log('   URL:     http://localhost:' + PORT);
  console.log('   Chatbot: 100% Offline — No API key needed');
  console.log('   Laws:    30+ Indian laws in knowledge base');
  console.log('\nApp live at: http://localhost:' + PORT + '\n');
});
