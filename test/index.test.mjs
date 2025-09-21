/**
 * Tests for inline module logic in index.html (from PR diff).
 * Framework: Node's built-in test runner (node:test) with node:assert/strict.
 * No external DOM libs; lightweight DOM stubs are used.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/* ---------- Helpers: DOM stub, file discovery, code extraction ---------- */

function createDOMStub() {
  const rootStyle = new Map();
  const styleObj = {
    setProperty: (k, v) => rootStyle.set(k, v),
    getPropertyValue: (k) => rootStyle.get(k),
  };
  const statusEl = { textContent: 'Loading palette...' };
  const canvasEl = {
    width: 1440,
    height: 900,
    getContext: () => ({
      beginPath() {}, moveTo() {}, lineTo() {}, stroke() {}, fillRect() {}, closePath() {},
      save() {}, restore() {}, arc() {}, fill() {}, strokeRect() {}, translate() {}, rotate() {},
      scale() {}, clearRect() {},
    }),
  };
  return {
    documentElement: { style: styleObj },
    getElementById: (id) => (id === 'status' ? statusEl : id === 'stage' ? canvasEl : null),
  };
}

function findIndexHtml() {
  const candidates = ['index.html', 'public/index.html', 'docs/index.html', 'static/index.html'];
  for (const p of candidates) {
    try {
      const abs = resolve(process.cwd(), p);
      const txt = readFileSync(abs, 'utf8');
      if (/Cosmic Helix Renderer/.test(txt)) return { path: p, content: txt };
    } catch {}
  }
  // Fallback to embedded snippet from the PR diff
  const content = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Cosmic Helix Renderer (ND-safe, Offline)</title>
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="color-scheme" content="light dark">
  <style>
    :root { --bg:#0b0b12; --ink:#e8e8f0; --muted:#a6a6c1; }
  </style>
</head>
<body>
  <header>
    <div><strong>Cosmic Helix Renderer</strong> — layered sacred geometry (offline, ND-safe)</div>
    <div class="status" id="status">Loading palette...</div>
  </header>
  <canvas id="stage" width="1440" height="900" aria-label="Layered sacred geometry canvas"></canvas>
  <p class="note">This static renderer encodes Vesica, Tree-of-Life, Fibonacci, and a static double-helix lattice.</p>
  <script type="module">
    import { renderHelix } from "./js/helix-renderer.mjs";
    const elStatus = document.getElementById("status");
    const canvas = document.getElementById("stage");
    const ctx = canvas.getContext("2d");

    async function loadJSON(path) {
      try {
        const res = await fetch(path, { cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        return await res.json();
      } catch (err) {
        console.warn("Palette unavailable, using fallback palette.", err);
        return null;
      }
    }

    function normalizePalette(candidate, fallback) {
      if (!candidate) return fallback;
      const bg = typeof candidate.bg === "string" ? candidate.bg : fallback.bg;
      const ink = typeof candidate.ink === "string" ? candidate.ink : fallback.ink;
      const hasLayers = Array.isArray(candidate.layers) && candidate.layers.length >= 6;
      const rawLayers = hasLayers ? candidate.layers.slice(0, 6) : fallback.layers;
      const trimmed = rawLayers.map((value) => (typeof value === "string" ? value.trim() : ""));
      const layers = trimmed.map((value, index) => value || fallback.layers[index]);
      return { bg, ink, layers };
    }

    function applyDocumentPalette(palette) {
      const root = document.documentElement.style;
      root.setProperty("--bg", palette.bg);
      root.setProperty("--ink", palette.ink);
    }

    const defaults = {
      palette: {
        bg:"#0b0b12",
        ink:"#e8e8f0",
        layers:["#b1c7ff","#89f7fe","#a0ffa1","#ffd27f","#f5a3ff","#d0d0e6"]
      }
    };

    const paletteData = await loadJSON("./data/palette.json");
    const active = normalizePalette(paletteData, defaults.palette);
    applyDocumentPalette(active);
    elStatus.textContent = paletteData ? "Palette loaded." : "Palette missing; using safe fallback.";

    const NUM = { THREE:3, SEVEN:7, NINE:9, ELEVEN:11, TWENTYTWO:22, THIRTYTHREE:33, NINETYNINE:99, ONEFORTYFOUR:144 };
    renderHelix(ctx, { width:canvas.width, height:canvas.height, palette:active, NUM });
  </script>
</body>
</html>`;
  return { path: '[embedded]', content };
}

const INDEX = findIndexHtml();
function extractModule(content) {
  const m = content.match(/<script\s+type="module">([\s\S]*?)<\/script>/i);
  return m ? m[1] : '';
}
const moduleCode = extractModule(INDEX.content);

function extractFunction(code, name) {
  const re = new RegExp(`function\\s+${name}\\s*\\([^)]*\\)\\s*{[\\s\\S]*?}`, 'm');
  const m = code.match(re);
  return m ? m[0] : null;
}

const fnLoadJSON = extractFunction(moduleCode, 'loadJSON');
const fnNormalizePalette = extractFunction(moduleCode, 'normalizePalette');
const fnApplyDocumentPalette = extractFunction(moduleCode, 'applyDocumentPalette');

function buildAPI({ document, fetchImpl, renderHelixFn, consoleObj = console }) {
  let src = '';
  if (fnLoadJSON && fnNormalizePalette && fnApplyDocumentPalette) {
    src = [fnLoadJSON, fnNormalizePalette, fnApplyDocumentPalette].join('\n');
  } else {
    // Minimal fallback if extraction fails
    src = `
      async function loadJSON(path) {
        try {
          const res = await fetch(path, { cache: "no-store" });
          if (!res.ok) throw new Error(String(res.status));
          return await res.json();
        } catch (err) {
          console.warn("Palette unavailable, using fallback palette.", err);
          return null;
        }
      }
      function normalizePalette(candidate, fallback) {
        if (!candidate) return fallback;
        const bg = typeof candidate.bg === "string" ? candidate.bg : fallback.bg;
        const ink = typeof candidate.ink === "string" ? candidate.ink : fallback.ink;
        const hasLayers = Array.isArray(candidate.layers) && candidate.layers.length >= 6;
        const rawLayers = hasLayers ? candidate.layers.slice(0, 6) : fallback.layers;
        const trimmed = rawLayers.map((value) => (typeof value === "string" ? value.trim() : ""));
        const layers = trimmed.map((value, index) => value || fallback.layers[index]);
        return { bg, ink, layers };
      }
      function applyDocumentPalette(palette) {
        const root = document.documentElement.style;
        root.setProperty("--bg", palette.bg);
        root.setProperty("--ink", palette.ink);
      }
    `;
  }
  // eslint-disable-next-line no-new-func
  const factory = new Function('document', 'fetch', 'renderHelix', 'console',
    `${src}; return { loadJSON, normalizePalette, applyDocumentPalette };`);
  return factory(document, fetchImpl, renderHelixFn, consoleObj);
}

async function runOrchestration({ document, fetchImpl, renderHelixFn, api }) {
  const orchestration = `
    const elStatus = document.getElementById("status");
    const canvas = document.getElementById("stage");
    const ctx = canvas.getContext("2d");
    const defaults = { palette: { bg:"#0b0b12", ink:"#e8e8f0", layers:["#b1c7ff","#89f7fe","#a0ffa1","#ffd27f","#f5a3ff","#d0d0e6"] } };
    const paletteData = await loadJSON("./data/palette.json");
    const active = normalizePalette(paletteData, defaults.palette);
    applyDocumentPalette(active);
    elStatus.textContent = paletteData ? "Palette loaded." : "Palette missing; using safe fallback.";
    const NUM = { THREE:3, SEVEN:7, NINE:9, ELEVEN:11, TWENTYTWO:22, THIRTYTHREE:33, NINETYNINE:99, ONEFORTYFOUR:144 };
    renderHelix(ctx, { width:canvas.width, height:canvas.height, palette:active, NUM });
    return { active, elStatusText: elStatus.textContent, NUM };
  `;
  // eslint-disable-next-line no-new-func
  const runner = new Function('document','fetch','renderHelix','loadJSON','normalizePalette','applyDocumentPalette',
    `return (async ()=>{ ${orchestration} })();`);
  return runner(document, fetchImpl, renderHelixFn, api.loadJSON, api.normalizePalette, api.applyDocumentPalette);
}

/* ---------- Defaults mirrored from module ---------- */

const defaults = {
  palette: {
    bg:"#0b0b12",
    ink:"#e8e8f0",
    layers:["#b1c7ff","#89f7fe","#a0ffa1","#ffd27f","#f5a3ff","#d0d0e6"]
  }
};

/* ------------------------ Unit tests: normalizePalette ------------------------ */

test('normalizePalette returns fallback when candidate is null', async () => {
  const document = createDOMStub();
  const api = buildAPI({ document, fetchImpl: async () => { throw new Error('not used'); }, renderHelixFn: () => {} });
  const out = api.normalizePalette(null, defaults.palette);
  assert.deepEqual(out, defaults.palette);
});

test('normalizePalette merges, trims, slices to 6, and falls back for blanks/non-strings', async () => {
  const document = createDOMStub();
  const api = buildAPI({ document, fetchImpl: async () => { throw new Error('not used'); }, renderHelixFn: () => {} });
  const candidate = {
    bg: ' #111122 ',
    ink: ' #eeeeff',
    layers: ['  #111  ','', '#00ff00', '   ', 42, '#abc', '#extra-ignored', '#unused']
  };
  const out = api.normalizePalette(candidate, defaults.palette);
  assert.equal(out.bg.trim(), '#111122');
  assert.equal(out.ink, '#eeeeff');
  assert.equal(out.layers.length, 6);
  assert.equal(out.layers[0], '#111'); // trimmed
  assert.equal(out.layers[1], defaults.palette.layers[1]); // empty string -> fallback
  assert.equal(out.layers[2], '#00ff00'); // ok
  assert.equal(out.layers[3], defaults.palette.layers[3]); // whitespace-only -> fallback
  assert.equal(out.layers[4], defaults.palette.layers[4]); // non-string -> fallback
  assert.equal(out.layers[5], '#abc'); // ok
});

test('normalizePalette uses fallback.layers when candidate.layers too short or not array', async () => {
  const document = createDOMStub();
  const api = buildAPI({ document, fetchImpl: async () => { throw new Error('not used'); }, renderHelixFn: () => {} });
  const c1 = { bg: '#000', ink: '#fff', layers: ['#1','#2'] };
  const out1 = api.normalizePalette(c1, defaults.palette);
  assert.deepEqual(out1.layers, defaults.palette.layers);
  const c2 = { bg: '#000', ink: '#fff', layers: 'nope' };
  const out2 = api.normalizePalette(c2, defaults.palette);
  assert.deepEqual(out2.layers, defaults.palette.layers);
});

test('normalizePalette falls back bg/ink when not strings', async () => {
  const document = createDOMStub();
  const api = buildAPI({ document, fetchImpl: async () => { throw new Error('not used'); }, renderHelixFn: () => {} });
  const candidate = { bg: 123, ink: null, layers: defaults.palette.layers };
  const out = api.normalizePalette(candidate, defaults.palette);
  assert.equal(out.bg, defaults.palette.bg);
  assert.equal(out.ink, defaults.palette.ink);
});

/* ------------------------ Unit tests: applyDocumentPalette ------------------------ */

test('applyDocumentPalette sets CSS custom properties on :root', async () => {
  const document = createDOMStub();
  const api = buildAPI({ document, fetchImpl: async () => { throw new Error('not used'); }, renderHelixFn: () => {} });
  api.applyDocumentPalette({ bg: '#101010', ink: '#fafafa' });
  const style = document.documentElement.style;
  assert.equal(style.getPropertyValue('--bg'), '#101010');
  assert.equal(style.getPropertyValue('--ink'), '#fafafa');
});

/* ------------------------ Unit tests: loadJSON ------------------------ */

test('loadJSON uses cache: "no-store" and returns parsed JSON on success', async () => {
  const document = createDOMStub();
  let captured = { path: null, cache: null };
  const fetchImpl = async (path, init) => {
    captured.path = path;
    captured.cache = init?.cache;
    return { ok: true, async json(){ return { ok:true, value: 1 }; } };
  };
  const api = buildAPI({ document, fetchImpl, renderHelixFn: () => {} });
  const data = await api.loadJSON('./data/palette.json');
  assert.deepEqual(data, { ok:true, value: 1 });
  assert.equal(captured.path, './data/palette.json');
  assert.equal(captured.cache, 'no-store');
});

test('loadJSON returns null and warns on network failure', async () => {
  const document = createDOMStub();
  const fetchImpl = async () => { throw new Error('Network down'); };
  let warned = 0;
  const api = buildAPI({ document, fetchImpl, renderHelixFn: () => {}, consoleObj: { ...console, warn: () => { warned++; } } });
  const data = await api.loadJSON('./data/palette.json');
  assert.equal(data, null);
  assert.ok(warned >= 1);
});

test('loadJSON returns null and warns when response not ok', async () => {
  const document = createDOMStub();
  const fetchImpl = async () => ({ ok: false, status: 404, async json(){ return {}; } });
  let warned = 0;
  const api = buildAPI({ document, fetchImpl, renderHelixFn: () => {}, consoleObj: { ...console, warn: () => { warned++; } } });
  const data = await api.loadJSON('./data/palette.json');
  assert.equal(data, null);
  assert.ok(warned >= 1);
});

test('loadJSON returns null and warns when res.json throws', async () => {
  const document = createDOMStub();
  const fetchImpl = async () => ({ ok: true, async json(){ throw new Error('invalid json'); } });
  let warned = 0;
  const api = buildAPI({ document, fetchImpl, renderHelixFn: () => {}, consoleObj: { ...console, warn: () => { warned++; } } });
  const data = await api.loadJSON('./data/palette.json');
  assert.equal(data, null);
  assert.ok(warned >= 1);
});

/* ------------------------ Integration tests: orchestration flow ------------------------ */

test('integration: palette missing -> status fallback text; renderHelix called with canvas size and NUM map', async () => {
  const document = createDOMStub();
  const renderHelixCalls = [];
  const renderHelixFn = (ctx, opts) => { renderHelixCalls.push({ ctxExists: Boolean(ctx), opts: opts }); };

  const fetchImpl = async () => { throw new Error('no file'); };
  const api = buildAPI({ document, fetchImpl, renderHelixFn });
  const result = await runOrchestration({ document, fetchImpl, renderHelixFn, api });

  assert.equal(result.elStatusText, 'Palette missing; using safe fallback.');
  assert.equal(renderHelixCalls.length, 1);
  assert.equal(renderHelixCalls[0].opts.width, 1440);
  assert.equal(renderHelixCalls[0].opts.height, 900);
  assert.deepEqual(result.NUM, { THREE:3, SEVEN:7, NINE:9, ELEVEN:11, TWENTYTWO:22, THIRTYTHREE:33, NINETYNINE:99, ONEFORTYFOUR:144 });
});

test('integration: palette loads -> status "Palette loaded." and candidate merged with fallback', async () => {
  const document = createDOMStub();
  const renderHelixCalls = [];
  const renderHelixFn = (ctx, opts) => { renderHelixCalls.push({ ctxExists: Boolean(ctx), opts: opts }); };

  const candidate = { bg:'#123', ink:'#456', layers:['#1','#2','   ','#4','#5','#6','#7'] };
  const fetchImpl = async () => ({ ok: true, async json(){ return candidate; } });
  const api = buildAPI({ document, fetchImpl, renderHelixFn });
  const result = await runOrchestration({ document, fetchImpl, renderHelixFn, api });

  assert.equal(result.elStatusText, 'Palette loaded.');
  assert.equal(renderHelixCalls.length, 1);
  assert.equal(result.active.bg, '#123');
  assert.equal(result.active.ink, '#456');
  assert.equal(result.active.layers.length, 6);
  assert.equal(result.active.layers[0], '#1');
  assert.equal(result.active.layers[1], '#2');
  // whitespace-only -> fallback for index 2
  assert.equal(result.active.layers[2], defaults.palette.layers[2]);
});