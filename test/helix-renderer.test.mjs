// Testing framework note:
// Detected/Assumed: Node.js built-in test runner (node:test) with strict assertions.
// If your project uses Vitest/Jest/Mocha, replace the imports accordingly.
//
// Vitest equivalent:
//   import { describe, it, beforeEach } from 'vitest';
//   import { strict as assert } from 'assert';
// Jest equivalent:
//   describe/it are global; use expect or assert as needed.
//
// These tests validate the public renderHelix(ctx, opts) interface and assert
// deterministic, ND-safe drawing semantics based on the provided implementation.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Import the module under test.
// If your helix renderer lives elsewhere, adjust the relative path below.
// Common locations we searched for: src/helix-renderer.mjs, helix-renderer.mjs
let renderHelix;
try {
  // Try typical src path first
  ({ renderHelix } = await import('../src/helix-renderer.mjs'));
} catch {
  // Fallback to root-level module
  ({ renderHelix } = await import('../helix-renderer.mjs'));
}

// Minimal NUM constants used by the renderer
const NUM = Object.freeze({
  THREE: 3,
  SEVEN: 7,
  NINE: 9,
  TWENTYTWO: 22,
  ONEFORTYFOUR: 144,
  THIRTYTHREE: 33,
  ELEVEN: 11,
  NINETYNINE: 99,
});

// Utility: deep clone for snapshotting input immutability
const deepClone = (x) => JSON.parse(JSON.stringify(x));

// Canvas context test double that logs operations and style state
function makeCtx() {
  const stateStack = [];
  let strokeStyle = '#000';
  let fillStyle = '#000';
  let lineWidth = 1;

  const log = [];

  const ctx = {
    // Style properties with setters to track changes
    get strokeStyle() { return strokeStyle; },
    set strokeStyle(v) { strokeStyle = v; log.push({ op: 'setStrokeStyle', value: v }); },

    get fillStyle() { return fillStyle; },
    set fillStyle(v) { fillStyle = v; log.push({ op: 'setFillStyle', value: v }); },

    get lineWidth() { return lineWidth; },
    set lineWidth(v) { lineWidth = v; log.push({ op: 'setLineWidth', value: v }); },

    // State
    save() { stateStack.push({ strokeStyle, fillStyle, lineWidth }); log.push({ op: 'save' }); },
    restore() {
      const st = stateStack.pop();
      if (st) { strokeStyle = st.strokeStyle; fillStyle = st.fillStyle; lineWidth = st.lineWidth; }
      log.push({ op: 'restore' });
    },

    // Drawing ops
    fillRect(x, y, w, h) { log.push({ op: 'fillRect', x, y, w, h, fillStyle, lineWidth }); },
    beginPath() { log.push({ op: 'beginPath' }); },
    arc(x, y, r, s, e) { log.push({ op: 'arc', x, y, r, s, e, strokeStyle, fillStyle, lineWidth }); },
    moveTo(x, y) { log.push({ op: 'moveTo', x, y, strokeStyle, lineWidth }); },
    lineTo(x, y) { log.push({ op: 'lineTo', x, y, strokeStyle, lineWidth }); },
    stroke() { log.push({ op: 'stroke', strokeStyle, lineWidth }); },
    fill() { log.push({ op: 'fill', fillStyle }); },

    // Expose log for assertions
    __getLog() { return log.slice(); },
  };

  return ctx;
}

function makePalette() {
  return {
    bg: '#101010',
    ink: '#eeeeee', // rungs
    layers: [
      '#1', // vesica
      '#2', // tree path
      '#3', // tree node
      '#4', // fibonacci
      '#5', // helix strand A
      '#6', // helix strand B
    ],
  };
}

describe('renderHelix - background and state', () => {
  let ctx; let width; let height; let palette;

  beforeEach(() => {
    ctx = makeCtx();
    width = 300;
    height = 200;
    palette = makePalette();
  });

  it('fills the canvas background once with the correct color and dimensions', () => {
    renderHelix(ctx, { width, height, palette, NUM });
    const log = ctx.__getLog();

    // Expect first operations: save, setFillStyle(bg), fillRect(0,0,w,h)
    assert.equal(log[0].op, 'save');
    const setFillIndex = log.findIndex(e => e.op === 'setFillStyle' && e.value === palette.bg);
    assert.ok(setFillIndex >= 0, 'background fillStyle should be set to palette.bg');

    const rectIndex = log.findIndex(e => e.op === 'fillRect' && e.x === 0 && e.y === 0 && e.w === width && e.h === height);
    assert.ok(rectIndex >= 0, 'should call fillRect with full canvas dimensions');
    assert.ok(setFillIndex < rectIndex, 'fill style must be set before filling rect');

    // renderHelix should end with restore
    assert.equal(log.at(-1).op, 'restore');
  });

  it('balances ctx.save()/ctx.restore() across layers', () => {
    renderHelix(ctx, { width, height, palette, NUM });
    const log = ctx.__getLog();
    const saves = log.filter(e => e.op === 'save').length;
    const restores = log.filter(e => e.op === 'restore').length;
    // renderHelix + 4 layers = 5 saves/restores
    assert.equal(saves, 5);
    assert.equal(restores, 5);
  });

  it('does not mutate input palette or NUM (immutability)', () => {
    const paletteBefore = deepClone(palette);
    const numBefore = deepClone(NUM);
    renderHelix(ctx, { width, height, palette, NUM });
    assert.deepEqual(palette, paletteBefore);
    assert.deepEqual(NUM, numBefore);
  });

  it('is deterministic for same inputs (pure rendering)', () => {
    renderHelix(ctx, { width, height, palette, NUM });
    const log1 = ctx.__getLog();

    const ctx2 = makeCtx();
    renderHelix(ctx2, { width, height, palette, NUM });
    const log2 = ctx2.__getLog();

    assert.deepEqual(log2, log1);
  });
});

describe('renderHelix - layer sequencing and colors', () => {
  it('draws layers in expected order: vesica -> tree -> fibonacci -> helix', () => {
    const ctx = makeCtx();
    const width = 300, height = 200;
    const palette = makePalette();

    renderHelix(ctx, { width, height, palette, NUM });
    const log = ctx.__getLog();

    // Find first stroke occurrence for each distinctive layer color
    const firstIndexForColor = (color) =>
      log.findIndex(e =>
        (e.op === 'setStrokeStyle' && e.value === color) ||
        (e.op === 'stroke' && e.strokeStyle === color) ||
        (e.op === 'lineTo' && e.strokeStyle === color) ||
        (e.op === 'arc' && e.strokeStyle === color)
      );

    const iVesica = firstIndexForColor(palette.layers[0]);
    const iTreePath = firstIndexForColor(palette.layers[1]);
    const iFibo = firstIndexForColor(palette.layers[3]);
    const iHelixA = firstIndexForColor(palette.layers[4]);

    assert.ok(iVesica >= 0, 'vesica strokes should exist');
    assert.ok(iTreePath > iVesica, 'tree paths should occur after vesica');
    assert.ok(iFibo > iTreePath, 'fibonacci should occur after tree');
    assert.ok(iHelixA > iFibo, 'helix should occur after fibonacci');
  });
});

describe('renderHelix - quantitative checks per layer', () => {
  it('vesica: draws multiple circle arcs with vesica color', () => {
    const ctx = makeCtx();
    renderHelix(ctx, { width: 300, height: 200, palette: makePalette(), NUM });
    const log = ctx.__getLog();

    // Count arcs under vesica stroke color
    const vesicaColor = makePalette().layers[0];
    const vesicaArcs = log.filter(e => e.op === 'arc' && e.strokeStyle === vesicaColor);
    assert.ok(vesicaArcs.length >= 2, 'vesica should draw at least one pair of arcs');
    assert.equal(vesicaArcs.length % 2, 0, 'vesica arcs should come in pairs');
  });

  it('tree: draws exactly 22 path strokes and 10 node fills with correct colors', () => {
    const ctx = makeCtx();
    const palette = makePalette();
    renderHelix(ctx, { width: 300, height: 200, palette, NUM });
    const log = ctx.__getLog();

    const pathColor = palette.layers[1];
    const nodeColor = palette.layers[2];

    const treePathStrokes = log.filter(e => e.op === 'stroke' && e.strokeStyle === pathColor);
    assert.equal(treePathStrokes.length, 22, 'tree should stroke exactly 22 paths');

    const nodeFills = log.filter(e => e.op === 'fill' && e.fillStyle === nodeColor);
    assert.equal(nodeFills.length, 10, 'tree should fill exactly 10 nodes');
  });

  it('fibonacci: draws one polyline (144 segments) with lineWidth 2 and correct color', () => {
    const ctx = makeCtx();
    const palette = makePalette();
    renderHelix(ctx, { width: 320, height: 240, palette, NUM });
    const log = ctx.__getLog();

    const fiboColor = palette.layers[3];

    // While fibonacci is active, there should be 144 lineTo operations with its stroke color
    const fiboLineTos = log.filter(e => e.op === 'lineTo' && e.strokeStyle === fiboColor);
    assert.equal(fiboLineTos.length, 144, 'fibonacci should have 144 line segments');

    // Ensure the stroke happened with lineWidth 2 and correct color
    const fiboStrokes = log.filter(e => e.op === 'stroke' && e.strokeStyle === fiboColor);
    assert.ok(fiboStrokes.length >= 1, 'fibonacci stroke should occur');
    const hadWidth2 = log.some(e => e.op === 'setLineWidth' && e.value === 2);
    assert.ok(hadWidth2, 'fibonacci should set lineWidth to 2');
  });

  it('helix: draws two strands (99 segments each) and 34 rungs with expected styles', () => {
    const ctx = makeCtx();
    const palette = makePalette();
    renderHelix(ctx, { width: 330, height: 210, palette, NUM });
    const log = ctx.__getLog();

    const strandA = palette.layers[4];
    const strandB = palette.layers[5];
    const rungColor = palette.ink;

    const strandALineTos = log.filter(e => e.op === 'lineTo' && e.strokeStyle === strandA);
    const strandBLineTos = log.filter(e => e.op === 'lineTo' && e.strokeStyle === strandB);
    assert.equal(strandALineTos.length, 99, 'strand A should have 99 line segments');
    assert.equal(strandBLineTos.length, 99, 'strand B should have 99 line segments');

    // Rungs: loop i=0..33 inclusive → 34 strokes with rung color and lineWidth 1
    const rungStrokes = log.filter(e => e.op === 'stroke' && e.strokeStyle === rungColor);
    // Filter out possible non-rung strokes by checking lineWidth 1 (rungs set 1)
    const rungStrokesLW1 = rungStrokes.filter(e => e.lineWidth === 1);
    assert.equal(rungStrokesLW1.length, NUM.THIRTYTHREE + 1, 'should draw 34 rung strokes (0..33 inclusive)');
  });
});

describe('renderHelix - resilience', () => {
  it('does not throw for very small canvases (still fills background)', () => {
    const ctx = makeCtx();
    assert.doesNotThrow(() => {
      renderHelix(ctx, { width: 10, height: 10, palette: makePalette(), NUM });
    });
    const rect = ctx.__getLog().find(e => e.op === 'fillRect');
    assert.ok(rect, 'background fill should still occur');
  });

  it('returns undefined (no return value contract)', () => {
    const ctx = makeCtx();
    const ret = renderHelix(ctx, { width: 300, height: 200, palette: makePalette(), NUM });
    assert.equal(ret, undefined);
  });
});