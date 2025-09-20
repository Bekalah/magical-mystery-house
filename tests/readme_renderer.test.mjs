/**
 * Cosmic Helix Renderer — README-constrained behavior tests
 *
 * Framework note:
 * - Written for a Jest or Vitest environment with jsdom (or happy-dom) so DOM APIs are available.
 * - No new dependencies introduced. Uses Node fs + DOM parsing to inspect index.html and inline scripts.
 *
 * Scope:
 * - Validates public interface and ND-safe promises stated in the README/diff snippet:
 *   - NUM constants exposed on window as NUM with required members.
 *   - No network calls on load (offline-first).
 *   - Palette fallback message when data/palette.json is missing or fetch fails.
 *   - Single-pass rendering (no animation / no requestAnimationFrame).
 *   - Layer ordering and cardinalities where accessible (best-effort without private internals).
 */

import fs from 'node:fs';
import path from 'node:path';

// Attempt to import JSDOM if available in environment; otherwise, provide a minimal shim.
// This keeps the test compatible across Jest/Vitest setups that already use jsdom.

let JSDOM;
try {
  // eslint-disable-next-line import/no-extraneous-dependencies
  ({ JSDOM } = await import('jsdom'));
} catch {
  // Minimal fallback: parse HTML as string and expose window/document stubs.
  // Many assertions below are guarded to skip if DOM is unavailable.
  JSDOM = class {
    constructor(html) {
      this.window = {
        document: {
          body: { innerHTML: html },
          querySelector: () => null,
          querySelectorAll: () => [],
          createElement: () => ({ getContext: () => ({}) }),
        },
      };
    }
  };
}

// Utility to load and execute index.html within a fresh DOM, capturing global side effects.
function loadIndexHTML({ mockFetch } = { mockFetch: null }) {
  const repoRoot = process.cwd();
  // Try common locations for index.html from project root.
  const candidatePaths = [
    'index.html',
    'public/index.html',
    'app/index.html',
    'web/index.html',
    'site/index.html',
    'docs/index.html'
  ].map(p => path.join(repoRoot, p));

  const indexPath = candidatePaths.find(p => fs.existsSync(p));
  if (!indexPath) {
    // If the project intentionally doesn't include index.html, skip tests meaningfully.
    return { dom: new JSDOM('<!doctype html><html><head></head><body></body></html>'), executed: false };
  }

  const html = fs.readFileSync(indexPath, 'utf8');
  const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable', url: 'https://example.org' });

  const { window } = dom;

  // Provide canvas stub if needed by renderer
  if (!window.HTMLCanvasElement) {
    window.HTMLCanvasElement = class {};
  }
  if (!window.document.querySelector) {
    window.document.querySelector = () => null;
  }

  // Mock requestAnimationFrame to detect if it's called (README says no animation).
  let rafCalls = 0;
  const originalRAF = window.requestAnimationFrame;
  window.requestAnimationFrame = (...args) => {
    rafCalls += 1;
    return typeof originalRAF === 'function' ? originalRAF(...args) : 1;
  };

  // Trap network APIs to ensure offline-first (no calls at load).
  let fetchCalls = [];
  let xhrCalls = 0;
  let imageLoads = 0;

  window.fetch = async (...args) => {
    fetchCalls.push(args);
    if (typeof mockFetch === 'function') {
      return mockFetch(...args);
    }
    // Default: fulfill with empty JSON.
    return Promise.resolve(new window.Response('{}', { status: 200, headers: { 'Content-Type': 'application/json' } }));
  };

  const OriginalXHR = window.XMLHttpRequest;
  window.XMLHttpRequest = class extends (OriginalXHR || class {}) {
    open(...args) {
      xhrCalls += 1;
      if (super.open) return super.open(...args);
    }
  };

  const OriginalImage = window.Image || function(){};
  window.Image = function(...args) {
    imageLoads += 1;
    return new OriginalImage(...args);
  };

  // Execute inline scripts in index.html if present
  // If external scripts are referenced with <script src>, jsdom with resources: 'usable' will try to load them,
  // but since we are offline, we limit ourselves to inline scripts for determinism.
  // We also manually eval script contents to ensure globals are set in this window.
  const scripts = Array.from(window.document.querySelectorAll?.('script') || []);
  for (const s of scripts) {
    if (s.src) {
      // Ignore external script sources to keep tests hermetic; authors should inline minimal bootstrapping.
      continue;
    }
    try {
      // eslint-disable-next-line no-new-func
      const fn = new window.Function(s.textContent || s.innerHTML || '');
      fn.call(window);
    } catch (err) {
      // Swallow to let tests report capability rather than crash here.
      // console.warn('Script eval failed:', err);
    }
  }

  return {
    dom,
    executed: true,
    metrics: {
      get rafCalls() { return rafCalls; },
      get fetchCalls() { return fetchCalls; },
      get xhrCalls() { return xhrCalls; },
      get imageLoads() { return imageLoads; },
    }
  };
}

describe('README-constrained behavior: Cosmic Helix Renderer', () => {
  it('exposes NUM on window with required harmonic constants', () => {
    const { dom, executed } = loadIndexHTML();
    const win = dom.window;
    if (!executed) {
      // If index.html is absent, mark as skipped with an informative assertion.
      expect(executed).toBe(true);
      return;
    }
    expect(win).toBeDefined();

    const NUM = win.NUM;
    expect(NUM).toBeDefined();

    // Required constants per README: 3, 7, 9, 11, 22, 33, 99, 144
    const required = [3, 7, 9, 11, 22, 33, 99, 144];
    for (const k of required) {
      expect(NUM).toHaveProperty(String(k));
      expect(typeof NUM[String(k)]).toBe('number');
      expect(NUM[String(k)]).toBe(k);
    }
  });

  it('does not perform network calls on initial load (offline-first, ND-safe)', async () => {
    const { dom, executed, metrics } = loadIndexHTML();
    if (!executed) {
      expect(executed).toBe(true);
      return;
    }
    // Allow any microtasks to flush
    await new Promise(r => setTimeout(r, 10));

    expect(metrics.fetchCalls.length).toBe(0);
    expect(metrics.xhrCalls).toBe(0);
    expect(metrics.imageLoads).toBe(0);
  });

  it('shows palette fallback notice and uses defaults when palette.json fetch fails', async () => {
    const { dom, executed } = loadIndexHTML({
      mockFetch: async (url) => {
        if (typeof url === 'string' && /palette\.json$/.test(url)) {
          // Simulate missing palette.json
          return Promise.reject(new Error('ENOENT: missing'));
        }
        return Promise.resolve(new dom.window.Response('{}', { status: 200 }));
      }
    });

    if (!executed) {
      expect(executed).toBe(true);
      return;
    }

    const { document } = dom.window;
    // Heuristic selectors per README: "header shows a calm fallback notice"
    const header = document.querySelector('header, .header, #header');
    const notice = header && (header.textContent || '').toLowerCase();
    // Accept a range of wording, assert presence of a calm notice about palette fallback.
    expect(header).toBeTruthy();
    expect(notice).toMatch(/palette/i);
    expect(notice).toMatch(/fallback|default/i);
    expect(notice).toMatch(/calm|gentle|using default/i);
  });

  it('renders each layer once; no requestAnimationFrame used', async () => {
    const { dom, executed, metrics } = loadIndexHTML();
    if (!executed) {
      expect(executed).toBe(true);
      return;
    }
    // Give any timers a chance (should be none).
    await new Promise(r => setTimeout(r, 10));
    expect(metrics.rafCalls).toBe(0);
  });

  it('declares layers in correct order in the UI (best-effort)', () => {
    const { dom, executed } = loadIndexHTML();
    if (!executed) {
      expect(executed).toBe(true);
      return;
    }
    const bodyText = (dom.window.document.body.textContent || '').toLowerCase();
    const order = [
      'vesica',
      'tree-of-life',
      'fibonacci',
      'double-helix'
    ];
    // Ensure each keyword exists
    order.forEach(k => expect(bodyText).toMatch(new RegExp(k.replace(/[-/]/g, '.'), 'i')));

    // Check order by index positions
    const idx = order.map(k => bodyText.indexOf(k));
    // All should be found
    idx.forEach(i => expect(i).toBeGreaterThanOrEqual(0));
    // Should be strictly increasing
    for (let i = 1; i < idx.length; i++) {
      expect(idx[i]).toBeGreaterThan(idx[i - 1]);
    }
  });

  it('spiral samples and lattice counts match documented numerology when accessible', () => {
    const { dom, executed } = loadIndexHTML();
    if (!executed) {
      expect(executed).toBe(true);
      return;
    }
    const exposed = dom.window.COSMIC || {};
    // Optional properties: exposed.fibonacciSampleCount, exposed.latticeCrossRungs, exposed.treeNodes, exposed.treePaths
    if ('fibonacciSampleCount' in exposed) {
      expect(exposed.fibonacciSampleCount).toBe(144);
    }
    if ('latticeCrossRungs' in exposed) {
      expect(exposed.latticeCrossRungs).toBe(33);
    }
    if ('treeNodes' in exposed) {
      expect(exposed.treeNodes).toBe(10);
    }
    if ('treePaths' in exposed) {
      expect(exposed.treePaths).toBe(22);
    }
  });

  it('maintains gentle contrast: dark background with readable ink colors (heuristic)', () => {
    const { dom, executed } = loadIndexHTML();
    if (!executed) {
      expect(executed).toBe(true);
      return;
    }
    const compStyles = dom.window.getComputedStyle
      ? dom.window.getComputedStyle(dom.window.document.body)
      : null;
    if (!compStyles) {
      // Environment cannot compute styles; skip.
      expect(Boolean(compStyles)).toBe(true);
      return;
    }
    const bg = compStyles.backgroundColor || compStyles.background || '';
    const color = compStyles.color || '';
    // Heuristic assertions: background should not be white; text color should not be too dark.
    expect(bg).not.toMatch(/rgb\(255,\s*255,\s*255\)|#fff\b|white/i);
    expect(color).not.toMatch(/rgb\(0,\s*0,\s*0\)|#000\b|black(?!.*contrast)/i);
  });
});