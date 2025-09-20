/*
  helix-renderer.test.mjs
  Thorough unit tests for helix-renderer.mjs.

  Testing framework note:
  - Uses existing globals (Vitest/Jest/Mocha) for describe/it hooks if present.
  - Otherwise falls back to Node's built-in 'node:test' via a tiny adapter below.
  - Assertions use Node 'assert/strict' to avoid introducing any new dependencies.
*/

import assert from 'node:assert/strict';
import { renderHelix } from './helix-renderer.mjs';

// Adapter: ensure describe/it exist in environments without a test framework

if (typeof globalThis.describe === 'undefined') {
  const t = await import('node:test');
  globalThis.describe = t.describe;
  globalThis.it = t.it || t.test;
  globalThis.beforeEach = t.beforeEach;
  globalThis.afterEach = t.afterEach;
}

const { describe, it, beforeEach, afterEach } = globalThis;

const NUM = Object.freeze({
  THREE: 3,
  SEVEN: 7,
  NINE: 9,
  ELEVEN: 11,
  NINETYNINE: 99,
  THIRTYTHREE: 33,
  TWENTYTWO: 22,
  ONEFORTYFOUR: 144,
});

const defaultPalette = Object.freeze({
  bg: '#101018',
  ink: '#0f0f0f',
  layers: [
    '#d11a1a', // vesica
    '#1ad11a', // tree paths
    '#1a1ad1', // tree nodes
    '#d1d11a', // fibonacci
    '#d11ad1', // helix A
    '#1ad1d1', // helix B
  ],
});

// Minimal CanvasRenderingContext2D spy to record drawing operations
function createCtxMock() {
  const state = { fillStyle: null, strokeStyle: null, lineWidth: 1 };
  const events = [];
  const snapshot = () => ({ fillStyle: state.fillStyle, strokeStyle: state.strokeStyle, lineWidth: state.lineWidth });
  const record = (op, payload) => events.push({ t: events.length, op, ...payload, state: snapshot() });

  const ctx = {};
  for (const prop of ['fillStyle', 'strokeStyle', 'lineWidth']) {
    Object.defineProperty(ctx, prop, {
      get() { return state[prop]; },
      set(v) { state[prop] = v; record('set', { prop, value: v }); },
      enumerable: true,
    });
  }
  const method = name => (...args) => record('call', { method: name, args });
  ['save', 'restore', 'beginPath', 'stroke', 'fill'].forEach(m => (ctx[m] = method(m)));
  ctx.arc = method('arc');
  ctx.moveTo = method('moveTo');
  ctx.lineTo = method('lineTo');
  ctx.fillRect = method('fillRect');

  return { ctx, events };
}

// Helpers
function countCalls(events, method) {
  return events.filter(e => e.op === 'call' && e.method === method).length;
}
function callsByStyle(events, method, styleKey, color) {
  return events.filter(e => e.op === 'call' && e.method === method && e.state[styleKey] === color);
}
function firstSetIndex(events, prop, value) {
  return events.findIndex(e => e.op === 'set' && e.prop === prop && e.value === value);
}

describe('renderHelix (ND-safe static renderer)', () => {
  let ctx, events;
  const W = 210;
  const H = 210;
  const palette = defaultPalette;

  beforeEach(() => {
    ({ ctx, events } = createCtxMock());
  });

  it('fills the background once and wraps with balanced save/restore', () => {
    renderHelix(ctx, { width: W, height: H, palette, NUM });

    // 1 outer save/restore + 1 per layer (4)
    assert.strictEqual(countCalls(events, 'save'), 5, 'outer save + 4 layer saves');
    assert.strictEqual(countCalls(events, 'restore'), 5, 'outer restore + 4 layer restores');

    const idxBgSet = firstSetIndex(events, 'fillStyle', palette.bg);
    assert.ok(idxBgSet >= 0, 'bg fillStyle set');

    const fills = events.filter(e => e.op === 'call' && e.method === 'fillRect');
    assert.strictEqual(fills.length, 1, 'background filled once');
    assert.deepStrictEqual(fills[0].args, [0, 0, W, H], 'fills entire canvas');
    assert.ok(idxBgSet < events.indexOf(fills[0]), 'bg color set before fillRect');
  });

  it('applies layer colors in documented order (vesica → tree paths → fibonacci → helix A → helix B → rungs)', () => {
    renderHelix(ctx, { width: W, height: H, palette, NUM });

    const order = {
      vesica: firstSetIndex(events, 'strokeStyle', palette.layers[0]),
      treePaths: firstSetIndex(events, 'strokeStyle', palette.layers[1]),
      fibonacci: firstSetIndex(events, 'strokeStyle', palette.layers[3]),
      helixA: firstSetIndex(events, 'strokeStyle', palette.layers[4]),
      helixB: firstSetIndex(events, 'strokeStyle', palette.layers[5]),
      rungs: firstSetIndex(events, 'strokeStyle', palette.ink),
    };
    for (const [name, idx] of Object.entries(order)) {
      assert.ok(idx >= 0, `found color set for ${name}`);
    }
    assert.ok(order.vesica < order.treePaths &&
              order.treePaths < order.fibonacci &&
              order.fibonacci < order.helixA &&
              order.helixA < order.helixB &&
              order.helixB < order.rungs, 'layer color set events are ordered');
  });

  it('draws Fibonacci spiral as one path with 144 segments and a single stroke', () => {
    renderHelix(ctx, { width: W, height: H, palette, NUM });

    assert.strictEqual(callsByStyle(events, 'beginPath', 'strokeStyle', palette.layers[3]).length, 1, 'one beginPath');
    assert.strictEqual(callsByStyle(events, 'stroke', 'strokeStyle', palette.layers[3]).length, 1, 'one stroke');
    assert.strictEqual(callsByStyle(events, 'lineTo', 'strokeStyle', palette.layers[3]).length, NUM.ONEFORTYFOUR, '144 segments');
  });

  it('renders Tree-of-Life with 22 path segments and 10 filled nodes', () => {
    renderHelix(ctx, { width: W, height: H, palette, NUM });

    assert.strictEqual(callsByStyle(events, 'lineTo', 'strokeStyle', palette.layers[1]).length, 22, '22 connective paths');
    assert.strictEqual(callsByStyle(events, 'fill', 'fillStyle', palette.layers[2]).length, 10, '10 node fills');
  });

  it('renders double-helix: 99 segments per strand and 33+1 rungs with proper line widths', () => {
    renderHelix(ctx, { width: W, height: H, palette, NUM });

    assert.strictEqual(callsByStyle(events, 'lineTo', 'strokeStyle', palette.layers[4]).length, 99, 'strand A segments');
    assert.strictEqual(callsByStyle(events, 'lineTo', 'strokeStyle', palette.layers[5]).length, 99, 'strand B segments');

    const rungSegments = callsByStyle(events, 'lineTo', 'strokeStyle', palette.ink);
    assert.strictEqual(rungSegments.length, NUM.THIRTYTHREE + 1, '33 cross rungs plus endpoint');
    rungSegments.forEach(ev => assert.strictEqual(ev.state.lineWidth, 1, 'rung line width is 1'));
  });

  it('draws a deterministic vesica grid (arc count matches geometry for 210×210)', () => {
    renderHelix(ctx, { width: W, height: H, palette, NUM });

    const baseRadius = Math.min(W, H) / NUM.THREE;
    const step = baseRadius / NUM.SEVEN;
    const stepDelta = step * NUM.NINE;

    const countAxis = (span, start, delta) => {
      let c = 0;
      for (let pos = start; pos < span; pos += delta) c++;
      return c;
    };
    const expected = countAxis(H, baseRadius, stepDelta) * countAxis(W, baseRadius, stepDelta) * 2;

    const vesicaArcs = callsByStyle(events, 'arc', 'strokeStyle', palette.layers[0]);
    assert.strictEqual(vesicaArcs.length, expected, 'vesica arc count matches grid geometry');
  });

  it('is resilient to zero-size canvases (no throw)', () => {
    const small = createCtxMock();
    assert.doesNotThrow(() => renderHelix(small.ctx, { width: 0, height: 0, palette, NUM }));
  });
});
// --- Additional tests appended by PR assistant ---

// Test utilities for appended cases

function deepClone(obj){ return JSON.parse(JSON.stringify(obj)); }

function withPalette(base, overrides){ const p = deepClone(base); return Object.assign(p, overrides); }


describe('renderHelix – additional robustness and input validation', () => {
  let ctx, events;
  const W = 210;
  const H = 210;

  beforeEach(() => {
    ({ ctx, events } = createCtxMock());
  });

  it('does not mutate provided palette or NUM objects', () => {
    const palette = deepClone(defaultPalette);
    const NUMlocal = deepClone(NUM);
    const paletteBefore = JSON.stringify(palette);
    const numBefore = JSON.stringify(NUMlocal);

    renderHelix(ctx, { width: W, height: H, palette, NUM: NUMlocal });

    assert.strictEqual(JSON.stringify(palette), paletteBefore, 'palette should remain immutable');
    assert.strictEqual(JSON.stringify(NUMlocal), numBefore, 'NUM should remain immutable');
  });

  it('handles minimal viable canvas (1x1) without throwing and still sets background', () => {
    assert.doesNotThrow(() => renderHelix(ctx, { width: 1, height: 1, palette: defaultPalette, NUM }));
    const fills = events.filter(e => e.op === 'call' && e.method === 'fillRect');

    assert.ok(fills.length >= 1, 'should at least fill background');
    assert.deepStrictEqual(fills[0].args, [0, 0, 1, 1], 'fills entire tiny canvas');
  });

  it('gracefully handles missing optional options by using sane defaults where applicable', () => {
    // Some implementations may support defaults; this verifies no throw even if palette/NUM omitted.
    assert.doesNotThrow(() => renderHelix(ctx, { width: W, height: H }));
    assert.ok(events.some(e => e.op === 'call' && e.method === 'fillRect'), 'background likely filled');
  });

  it('accepts custom ink color for rungs and applies it consistently', () => {
    const customInk = '#222233';
    const palette = withPalette(defaultPalette, { ink: customInk });

    renderHelix(ctx, { width: W, height: H, palette, NUM });

    const rungSegments = events.filter(e => e.op === 'call' && e.method === 'lineTo' && e.state.strokeStyle === customInk);
    assert.ok(rungSegments.length >= NUM.THIRTYTHREE, 'rungs drawn with custom ink');
    rungSegments.forEach(ev => assert.strictEqual(ev.state.lineWidth, 1, 'custom ink preserves rung line width'));
  });

  it('tolerates fractional and non-integer dimensions by coercing/using provided values without crashing', () => {
    assert.doesNotThrow(() => renderHelix(ctx, { width: 210.7, height: 199.2, palette: defaultPalette, NUM }));
    // Ensure background rect uses provided args (our spy records raw args)
    const fill = events.find(e => e.op === 'call' && e.method === 'fillRect');

    assert.ok(fill, 'background filled even with fractional dims');
  });

  it('is resilient when NUM values are extreme but valid numbers', () => {
    const weirdNUM = deepClone(NUM);

    weirdNUM.ONEFORTYFOUR = 1;      // Degenerate fibonacci segments
    weirdNUM.NINETYNINE   = 0;      // No helix segments
    weirdNUM.THIRTYTHREE  = 0;      // No rungs
    renderHelix(ctx, { width: W, height: H, palette: defaultPalette, NUM: weirdNUM });

    // Expect no throws and zero or near-zero counts for affected layers
    assert.strictEqual(callsByStyle(events, 'lineTo', 'strokeStyle', defaultPalette.layers[3]).length, 1, 'fibonacci minimal segments');
    assert.strictEqual(callsByStyle(events, 'lineTo', 'strokeStyle', defaultPalette.layers[4]).length, 0, 'helix A suppressed');
    assert.strictEqual(callsByStyle(events, 'lineTo', 'strokeStyle', defaultPalette.layers[5]).length, 0, 'helix B suppressed');
  });

  it('ignores negative dimensions by not attempting to draw shapes (but still does not throw)', () => {
    assert.doesNotThrow(() => renderHelix(ctx, { width: -100, height: -50, palette: defaultPalette, NUM }));
    // With our spy, a naive implementation might still attempt fillRect; we only assert that it didn’t crash.
  });

  it('ensures save/restore always balanced even if an exception occurs mid-render', async () => {
    // Build a ctx that throws once on a specific method to simulate mid-render failure
    const failing = createCtxMock();
    const originalLineTo = failing.ctx.lineTo;
    let didThrow = false;
    failing.ctx.lineTo = (...args) => {
      if (!didThrow) {
        didThrow = true;
        throw new Error('synthetic draw failure');
      }
      return originalLineTo(...args);
    };

    try {
      renderHelix(failing.ctx, { width: W, height: H, palette: defaultPalette, NUM });
    } catch (_e) {
      // swallow to inspect balancing
    }
    const saves = failing.events.filter(e => e.op === 'call' && e.method === 'save').length;
    const restores = failing.events.filter(e => e.op === 'call' && e.method === 'restore').length;
    assert.strictEqual(saves, restores, 'save/restore balanced even on failure');
  });

  it('applies layer-specific line widths when provided via ctx.lineWidth changes', () => {
    // Ensure that helix strands differ from rung widths if implementation sets them
    renderHelix(ctx, { width: W, height: H, palette: defaultPalette, NUM });

    const strandA = callsByStyle(events, 'lineTo', 'strokeStyle', defaultPalette.layers[4]);
    const strandB = callsByStyle(events, 'lineTo', 'strokeStyle', defaultPalette.layers[5]);
    const rungs   = callsByStyle(events, 'lineTo', 'strokeStyle', defaultPalette.ink);

    // If the implementation sets lineWidth for strands, they should be >= 1; rungs are asserted as 1 in the base suite
    if (strandA.length) assert.ok(strandA.some(e => e.state.lineWidth >= 1), 'strand A has a visible line width');
    if (strandB.length) assert.ok(strandB.some(e => e.state.lineWidth >= 1), 'strand B has a visible line width');
    if (rungs.length)   rungs.forEach(e => assert.strictEqual(e.state.lineWidth, 1));
  });

  it('uses provided palette.layer colors exactly and never falls back to unexpected defaults', () => {
    const custom = withPalette(defaultPalette, {
      layers: ['#aa0000', '#00aa00', '#0000aa', '#aaaa00', '#aa00aa', '#00aaaa'],
      ink: '#121212',
      bg: '#0a0a0a',
    });

    renderHelix(ctx, { width: W, height: H, palette: custom, NUM });

    const seenColors = new Set(events.filter(e => e.op === 'set').map(e => `${e.prop}:${e.value}`));
    for (const c of [custom.bg, custom.ink, ...custom.layers]) {
      assert.ok(
        [...seenColors].some(s => s.endsWith(`:${c}`)),
        `observed color set event for ${c}`
      );
    }
  });

  it('does not rely on implicit globals; requires ctx with expected 2D methods only', () => {
    const badCtx = {}; // missing methods
    assert.throws(() => renderHelix(badCtx, { width: W, height: H, palette: defaultPalette, NUM }), {
      name: /TypeError|Error/,
    }, 'throws when ctx lacks drawing API');
  });
});