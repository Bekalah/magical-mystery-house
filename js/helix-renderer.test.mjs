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