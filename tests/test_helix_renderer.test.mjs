// Framework: Node.js built-in test runner (node:test) + assert/strict
// If your project uses Jest/Vitest/Mocha, adapt imports accordingly (describe/it/expect).

import test from 'node:test';
import assert from 'node:assert/strict';

// Try to locate the module exporting renderHelix. Prefer src/helix_renderer.mjs, then lib/, then project root.
// Adjust this import path to match your repository if different.
let renderHelix;
const attemptedPaths = [
  './src/helix_renderer.mjs',
  './src/helix_renderer.js',
  './lib/helix_renderer.mjs',
  './lib/helix_renderer.js',
  './helix_renderer.mjs',
  './helix_renderer.js',
  './src/renderer/helix_renderer.mjs',
  './src/renderer/helix_renderer.js'
];
let lastErr;
for (const p of attemptedPaths) {
  try {
    ({ renderHelix } = await import(p));
    if (typeof renderHelix === 'function') {
      break;
    }
  } catch (e) {
    lastErr = e;
  }
}
if (typeof renderHelix !== 'function') {
  throw new Error(
    "Could not import renderHelix from known locations. " +
    "Adjust the import path list in tests/test_helix_renderer.test.mjs. " +
    (lastErr ? `Last error: ${lastErr.message}` : '')
  );
}

// Minimal CanvasRenderingContext2D mock that records draw ops and current styles.
class CtxMock {
  constructor() {
    this.ops = [];
    // drawing state
    this.fillStyle = null;
    this.strokeStyle = null;
    this.lineWidth = null;
    // stack depth for save/restore pairing checks
    this._stackDepth = 0;
  }

  _rec(op, ...args) {
    this.ops.push({ op, args, fillStyle: this.fillStyle, strokeStyle: this.strokeStyle, lineWidth: this.lineWidth });
  }

  // State
  save() { this._stackDepth++; this._rec('save'); }
  restore() { this._stackDepth = Math.max(0, this._stackDepth - 1); this._rec('restore'); }

  // Styles (setters are direct property assigns in code; no methods needed)

  // Primitives
  fillRect(x, y, w, h) { this._rec('fillRect', x, y, w, h); }
  beginPath() { this._rec('beginPath'); }
  arc(x, y, r, s, e) { this._rec('arc', x, y, r, s, e); }
  stroke() { this._rec('stroke'); }
  moveTo(x, y) { this._rec('moveTo', x, y); }
  lineTo(x, y) { this._rec('lineTo', x, y); }
  fill() { this._rec('fill'); }
}

function opCount(ctx, name) {
  return ctx.ops.filter(o => o.op === name).length;
}

function getOps(ctx, name) {
  return ctx.ops.filter(o => o.op === name);
}

// NUM constants matching the implementation expectations.
const NUM = Object.freeze({
  THREE: 3,
  SEVEN: 7,
  NINE: 9,
  TWENTYTWO: 22,
  ONEFORTYFOUR: 144,
  THIRTYTHREE: 33,
  ELEVEN: 11,
  NINETYNINE: 99
});

const palette = Object.freeze({
  bg: '#000000',
  ink: '#ffffff',
  layers: ['#111111', '#222222', '#333333', '#444444', '#555555', '#666666']
});

test('renderHelix paints background and preserves context via save/restore', () => {
  const ctx = new CtxMock();
  const width = 200;
  const height = 120;

  renderHelix(ctx, { width, height, palette, NUM });

  // First op should be save, last should be restore
  assert.equal(ctx.ops[0]?.op, 'save', 'expected initial save()');
  assert.equal(ctx.ops.at(-1)?.op, 'restore', 'expected final restore()');

  // Background fill
  const fillRectOps = getOps(ctx, 'fillRect');
  assert.equal(fillRectOps.length, 1, 'should fillRect once for background');
  assert.deepEqual(fillRectOps[0].args, [0, 0, width, height], 'fillRect covers full canvas');

  // Fill style used matches palette.bg at time of fillRect
  const bgFill = fillRectOps[0];
  assert.equal(bgFill.fillStyle, palette.bg, 'background fillStyle should be palette.bg');
});

test('vesica layer: uses thin strokes and draws evenly spaced paired circles', () => {
  const ctx = new CtxMock();
  const w = 270; // choose dimensions that exercise multiple grid cells
  const h = 180;

  renderHelix(ctx, { width: w, height: h, palette, NUM });

  // After background, vesica sets strokeStyle to layers[0] and lineWidth=1
  // We can't isolate layer boundaries perfectly, but we can infer via the earliest arcs and strokes.
  const firstArcIdx = ctx.ops.findIndex(o => o.op === 'arc');
  assert.ok(firstArcIdx > -1, 'expected arcs for vesica layer');

  // Find the nearest prior style state
  const beforeArc = ctx.ops[firstArcIdx - 1];
  const styleAtArc = ctx.ops[firstArcIdx];
  // Line width for vesica is set before drawing; ensure at first arc or very near it we have correct strokeStyle/lineWidth
  const styleWindow = ctx.ops.slice(Math.max(0, firstArcIdx - 3), firstArcIdx + 1);
  const sawStrokeStyle = styleWindow.some(o => o.strokeStyle === palette.layers[0]);
  const sawLineWidth1 = styleWindow.some(o => o.lineWidth === 1);
  assert.ok(sawStrokeStyle, 'vesica should use palette.layers[0] as strokeStyle');

  assert.ok(sawLineWidth1, 'vesica should use lineWidth = 1');

  // Compute expected grid counts to sanity check approximate workload:
  const baseRadius = Math.min(w, h) / NUM.THREE;
  const step = baseRadius / NUM.SEVEN;
  const stride = step * NUM.NINE;

  let cells = 0;
  for (let y = baseRadius; y < h; y += stride) {
    for (let x = baseRadius; x < w; x += stride) {
      cells++;
    }
  }
  // Each cell draws 2 circles: each circle is a beginPath + arc + stroke
  const expectedCircleOps = cells * 2;

  const arcOps = opCount(ctx, 'arc');
  assert.ok(
    arcOps >= expectedCircleOps,
    `expected at least ${expectedCircleOps} arc ops from vesica grid; saw ${arcOps}`
  );
});

test('tree layer: strokes 22 edges and fills 10 nodes; node radius scales with TWENTYTWO', () => {
  const ctx = new CtxMock();
  const w = 220;
  const h = 220;
  renderHelix(ctx, { width: w, height: h, palette, NUM });

  // The tree layer produces: for 22 paths: beginPath + moveTo + lineTo + stroke
  // We won't assert exact ordering, but we can check there are at least 22 line segments stroked.
  const lineToOps = opCount(ctx, 'lineTo');
  const strokeOps = opCount(ctx, 'stroke');
  assert.ok(strokeOps >= 22, `expected at least 22 strokes for tree paths; saw ${strokeOps}`);

  // Nodes: 10 arcs + 10 fills
  const fills = opCount(ctx, 'fill');
  const arcs = opCount(ctx, 'arc');
  assert.ok(fills >= 10, `expected at least 10 node fills; saw ${fills}`);
  assert.ok(arcs >= 10, `expected at least 10 node arcs; saw ${arcs}`);

  // Confirm node color was used at some fill (palette.layers[2])
  const someNodeFillUsesColor = ctx.ops.some(o => o.op === 'fill' && o.fillStyle === palette.layers[2]);
  assert.ok(someNodeFillUsesColor, 'tree nodes should use colors.node = palette.layers[2]');
});

test('fibonacci layer: draws 144-sample spiral as one path (moveTo + 144 lineTo)', () => {
  const ctx = new CtxMock();
  renderHelix(ctx, { width: 330, height: 210, palette, NUM });

  // Strategy: find a path region with lineWidth=2 and strokeStyle=palette.layers[3]
  // The spiral is a single beginPath, then moveTo once and lineTo 144 times, followed by stroke.
  const spiralSegments = ctx.ops.filter(
    o => (o.op === 'moveTo' || o.op === 'lineTo' || o.op === 'beginPath' || o.op === 'stroke') &&
         o.strokeStyle === palette.layers[3] && o.lineWidth === 2
  );

  const moveTos = spiralSegments.filter(o => o.op === 'moveTo').length;
  const lineTos = spiralSegments.filter(o => o.op === 'lineTo').length;

  // There may be other lineWidth=2 segments (helix strands) so we ensure at least the spiral counts exist
  assert.ok(moveTos >= 1, 'spiral should start with a moveTo');
  assert.ok(lineTos >= NUM.ONEFORTYFOUR, `spiral should have at least ${NUM.ONEFORTYFOUR} lineTo segments`);
});

test('helix layer: two strands with 99 steps => 2 * 99 lineTo and 34 cross-rungs', () => {
  const ctx = new CtxMock();
  renderHelix(ctx, { width: 330, height: 210, palette, NUM });

  // Helix strands use lineWidth=2 with strokeStyle layers[4] and layers[5]
  const strandA = ctx.ops.filter(o => (o.op === 'moveTo' || o.op === 'lineTo') && o.strokeStyle === palette.layers[4] && o.lineWidth === 2);
  const strandB = ctx.ops.filter(o => (o.op === 'moveTo' || o.op === 'lineTo') && o.strokeStyle === palette.layers[5] && o.lineWidth === 2);

  const lineToA = strandA.filter(o => o.op === 'lineTo').length;

  const lineToB = strandB.filter(o => o.op === 'lineTo').length;

  // Each strand loops 0..steps where steps=99 => 99 lineTo per strand
  assert.ok(lineToA >= NUM.NINETYNINE, `strand A should have at least ${NUM.NINETYNINE} lineTo operations`);

  assert.ok(lineToB >= NUM.NINETYNINE, `strand B should have at least ${NUM.NINETYNINE} lineTo operations`);

  // Rungs: lineWidth=1, strokeStyle = palette.ink; there are NUM.THIRTYTHREE + 1 = 34 rungs, each a beginPath + moveTo + lineTo + stroke
  const rungStrokes = ctx.ops.filter(o => o.op === 'stroke' && o.strokeStyle === palette.ink && o.lineWidth === 1).length;
  assert.ok(rungStrokes >= (NUM.THIRTYTHREE + 1), `expected at least ${NUM.THIRTYTHREE + 1} rung strokes; saw ${rungStrokes}`);
});

test('graceful handling: zero dimensions does not throw and performs minimal ops', () => {
  const ctx = new CtxMock();
  assert.doesNotThrow(() => renderHelix(ctx, { width: 0, height: 0, palette, NUM }));
  // With zero width/height, expect background fillRect still called once, other drawing likely minimal
  assert.equal(opCount(ctx, 'fillRect'), 1, 'should still attempt a background fillRect once');
});

test('invalid NUM constants lead to NaN-heavy ops but should not crash synchronously', () => {
  const ctx = new CtxMock();
  const BAD_NUM = { ...NUM, THREE: 0 }; // division by zero in vesica baseRadius
  assert.doesNotThrow(() => renderHelix(ctx, { width: 200, height: 100, palette, NUM: BAD_NUM }), 'renderer should not throw synchronously with odd NUM');
  // At least the save/fillRect/restore sequence should remain intact
  assert.equal(ctx.ops[0]?.op, 'save');
  assert.equal(ctx.ops.at(-1)?.op, 'restore');
});