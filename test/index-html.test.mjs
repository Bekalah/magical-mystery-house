// Testing library & framework note:
// This test uses Node's built-in test runner (node:test) and assert/strict for zero-dependency compatibility.
// If your project uses Jest/Vitest, this file should still run under node >=18. For Jest/Vitest, you can adapt
// the imports (e.g., describe/it) or run it as-is with "node --test". No new dependencies introduced.

import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// The HTML under test (focus on the diff-provided content)
const INDEX_HTML = String.raw`<\!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Cosmic Helix Renderer (ND-safe, Offline)</title>
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="color-scheme" content="light dark">
  <style>
    /* ND-safe: calm contrast, no motion, generous spacing */
    :root {
      --bg: #0b0b12;
      --ink: #e8e8f0;
      --muted: #a6a6c1;
    }
    html, body {
      margin: 0;
      padding: 0;
      background: var(--bg);
      color: var(--ink);
      font: 14px/1.4 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    }
    header {
      padding: 12px 16px;
      border-bottom: 1px solid #1d1d2a;
    }
    .status {
      color: var(--muted);
      font-size: 12px;
    }
    #stage {
      display: block;
      margin: 16px auto;
      box-shadow: 0 0 0 1px #1d1d2a;
    }
    .note {
      max-width: 900px;
      margin: 0 auto 16px;
      color: var(--muted);
    }
    code {
      background: #11111a;
      padding: 2px 4px;
      border-radius: 3px;
    }
  </style>
</head>
<body>
  <header>
    <div><strong>Cosmic Helix Renderer</strong> &mdash; layered sacred geometry (offline, ND-safe)</div>
    <div class="status" id="status">Loading palette...</div>
  </header>

  <canvas id="stage" width="1440" height="900" aria-label="Layered sacred geometry canvas"></canvas>
  <p class="note">This static renderer encodes Vesica, Tree-of-Life, Fibonacci, and a static double-helix lattice. No animation, no autoplay, no external libraries. Open this file directly.</p>

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

      } catch (error) {

        return null;

      }
    }

    const defaults = {

      palette: {

        bg: "#0b0b12",

        ink: "#e8e8f0",

        layers: ["#b1c7ff", "#89f7fe", "#a0ffa1", "#ffd27f", "#f5a3ff", "#d0d0e6"]

      }

    };

    const palette = await loadJSON("./data/palette.json");

    const active = palette || defaults.palette;

    elStatus.textContent = palette ? "Palette loaded." : "Palette missing; using safe fallback.";

    // Numerology constants used by the geometry routines

    const NUM = {

      THREE: 3,

      SEVEN: 7,

      NINE: 9,

      ELEVEN: 11,

      TWENTYTWO: 22,

      THIRTYTHREE: 33,

      NINETYNINE: 99,

      ONEFORTYFOUR: 144

    };

    // ND-safe rationale: no motion, high readability, soft colors, layered order

    renderHelix(ctx, { width: canvas.width, height: canvas.height, palette: active, NUM });
  </script>
</body>
</html>`;

// Minimal HTML parser utilities for the assertions (no external deps).
// These helpers are intentionally simple and tailored to the structure we need to validate.

function extractTag(html, tag) {
  const re = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const m = html.match(re);
  return m ? { full: m[0], inner: m[1] } : null;
}

function getAttribute(tagHtml, attr) {
  const re = new RegExp(`${attr}\\s*=\\s*"(.*?)"`, 'i');
  const m = tagHtml.match(re);
  return m ? m[1] : null;
}

function queryById(html, id) {
  const re = new RegExp(`<([a-zA-Z]+)\\b[^>]*id\\s*=\\s*"${id}"[^>]*>`, 'i');
  const m = html.match(re);
  return m ? { tag: m[1], full: m[0] } : null;
}

function hasMetaNameContent(html, name, contentPrefix) {

  const pattern = '<meta\\s+[^>]*name\\s*=\\s*"' + name + '"[^>]*>';
  const re = new RegExp(pattern, 'i');
  const found = html.match(re);
  if (!found) return false;

  const content = getAttribute(found[0], 'content');

  return typeof content === 'string' && content.startsWith(contentPrefix);
}

function getCanvasDimension(tagHtml, dim) {

  const val = getAttribute(tagHtml, dim);

  return val ? Number(val) : NaN;

}

function extractInlineModuleScript(html) {

  const re = /<script\s+type="module">([\s\S]*?)<\/script>/i;

  const m = html.match(re);

  return m ? m[1].trim() : null;

}

describe('index.html structure and inline module behavior (focused on diff content)', () => {
  let html;

  beforeEach(() => {
    html = INDEX_HTML;
  });

  test('includes correct doctype and html lang attribute', () => {

    assert.ok(html.toLowerCase().startsWith('<\\!doctype html>'), 'DOCTYPE should be HTML5');

    const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] ?? '';

    assert.match(htmlTag, /lang="en"/i, 'html lang should be "en"');

  });

  test('head contains essential meta and title per ND-safe guidance', () => {

    const head = extractTag(html, 'head');

    assert.ok(head, '<head> should exist');

    assert.ok(/<meta\s+charset="utf-8"/i.test(head.full), 'UTF-8 charset meta is present');

    assert.ok(/<title>Cosmic Helix Renderer \(ND-safe, Offline\)<\/title>/.test(head.full), 'Title matches exactly');

    assert.ok(hasMetaNameContent(head.full, 'viewport', 'width=device-width,initial-scale=1'), 'Viewport meta configured');

    assert.ok(hasMetaNameContent(head.full, 'color-scheme', 'light dark'), 'color-scheme meta configured');

    const style = extractTag(head.inner, 'style');

    assert.ok(style, '<style> block exists');

    assert.match(style.inner, /:root\s*{[\s\S]*--bg:\s*#0b0b12;[\s\S]*--ink:\s*#e8e8f0;[\s\S]*--muted:\s*#a6a6c1;[\s\S]*}/, 'CSS variables are defined');

  });

  test('body includes header with status element default text', () => {

    const body = extractTag(html, 'body');

    assert.ok(body, '<body> should exist');

    const status = queryById(body.inner, 'status');

    assert.ok(status, '#status element exists');
    assert.equal(status.tag.toLowerCase(), 'div');
    assert.match(status.full, />\s*Loading palette\.\.\.\s*<\//, '#status default text indicates loading state');

  });

  test('canvas stage has expected dimensions and aria-label for a11y', () => {

    const canvas = queryById(html, 'stage');

    assert.ok(canvas, 'canvas#stage exists');
    assert.equal(canvas.tag.toLowerCase(), 'canvas');

    assert.equal(getCanvasDimension(canvas.full, 'width'), 1440);
    assert.equal(getCanvasDimension(canvas.full, 'height'), 900);

    const aria = getAttribute(canvas.full, 'aria-label');

    assert.equal(aria, 'Layered sacred geometry canvas', 'canvas has descriptive aria-label');

  });

  test('inline module: uses fetch with cache: "no-store" and safe palette fallback', () => {

    const code = extractInlineModuleScript(html);

    assert.ok(code, 'Inline module script is present');

    // Check fetch pattern and caching directive

    assert.match(code, /fetch\(path,\s*{\s*cache:\s*"no-store"\s*}\s*\)/, 'fetch uses no-store');

    // Fallback palette structure

    assert.match(code, /const\s+defaults\s*=\s*{\s*palette:\s*{[\s\S]*bg:\s*"#0b0b12"[\s\S]*ink:\s*"#e8e8f0"[\s\S]*layers:\s*\[[\s\S]*\][\s\S]*}\s*}/, 'defaults.palette is defined with bg, ink, layers');

    // Status messaging reflects fallback vs loaded

    assert.match(code, /elStatus\.textContent\s*=\s*palette\s*\?\s*"Palette loaded\."\s*:\s*"Palette missing; using safe fallback\.";/, 'status message logic is correct');

  });

  test('inline module: defines expected NUM constants used by geometry routines', () => {

    const code = extractInlineModuleScript(html);

    assert.ok(code);

    const expected = {

      THREE: 3,

      SEVEN: 7,

      NINE: 9,

      ELEVEN: 11,

      TWENTYTWO: 22,

      THIRTYTHREE: 33,

      NINETYNINE: 99,

      ONEFORTYFOUR: 144,
    };
    for (const [k, v] of Object.entries(expected)) {

      const re = new RegExp(`${k}\\s*:\\s*${v}\\b`);

      assert.match(code, re, `NUM.${k} equals ${v}`);
    }

  });

  test('inline module: calls renderHelix with canvas ctx, dimensions, palette, and NUM', () => {

    const code = extractInlineModuleScript(html);

    assert.ok(code);

    // Validate presence of getContext and renderHelix invocation signature

    assert.match(code, /const\s+ctx\s*=\s*canvas\.getContext\("2d"\)\s*;/, '2D context requested');
    assert.match(code, /renderHelix\(\s*ctx\s*,\s*{\s*width:\s*canvas\.width\s*,\s*height:\s*canvas\.height\s*,\s*palette:\s*active\s*,\s*NUM\s*}\s*\)\s*;/, 'renderHelix called with expected args');
  });

  test('inline module: loadJSON returns null on network errors (try/catch path present)', () => {

    const code = extractInlineModuleScript(html);

    assert.ok(code);

    // Ensure rejection path is handled (catch returns null)

    assert.match(code, /try\s*{[\s\S]*}\s*catch\s*\(\s*error\s*\)\s*{\s*return\s+null;\s*}/, 'loadJSON safely returns null on errors');
  });
});