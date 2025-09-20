// Testing library/framework: node:test (built-in) + assert
import test from 'node:test';
import assert from 'node:assert/strict';

// Resolve module under test. Try common locations; fall back to relative import at repo root.
// Adjust this path if the file resides elsewhere.
let renderHelix;
try {
  ({ renderHelix } = await import('../helix-renderer.mjs'));
} catch {
  try {
    ({ renderHelix } = await import('../src/helix-renderer.mjs'));
  } catch {
    ({ renderHelix } = await import('../lib/helix-renderer.mjs'));
  }
}

// Minimal but thorough mock of CanvasRenderingContext2D that records ops with current state
function makeCtxRecorder() {
  const log = [];
  const state = {
    fillStyle: null,
    strokeStyle: null,
    lineWidth: null,
    globalAlpha: 1,
  };
  const push = (op, args = []) => log.push({ op, args, state: { ...state } });

  const ctx = {
    // stateful props
    set fillStyle(v) { state.fillStyle = v; push('setFillStyle', [v]); },
    get fillStyle() { return state.fillStyle; },

    set strokeStyle(v) { state.strokeStyle = v; push('setStrokeStyle', [v]); },
    get strokeStyle() { return state.strokeStyle; },

    set lineWidth(v) { state.lineWidth = v; push('setLineWidth', [v]); },
    get lineWidth() { return state.lineWidth; },

    set globalAlpha(v) { state.globalAlpha = v; push('setGlobalAlpha', [v]); },
    get globalAlpha() { return state.globalAlpha; },

    // drawing ops
    save() { push('save'); },
    restore() { push('restore'); },
    beginPath() { push('beginPath'); },
    arc(x, y, r, s, e) { push('arc', [x, y, r, s, e]); },
    moveTo(x, y) { push('moveTo', [x, y]); },
    lineTo(x, y) { push('lineTo', [x, y]); },
    stroke() { push('stroke'); },
    fill() { push('fill'); },
    fillRect(x, y, w, h) { push('fillRect', [x, y, w, h]); },
  };

  return { ctx, log };
}

// Default palette and numerology constants tuned for deterministic counts
const defaultPalette = {
  bg: '#101010',
  ink: '#eeeeee',
  layers: ['#446688', '#88aacc', '#ffffff', '#66aa88', '#cc6677', '#aa4466'],
};

const DEFAULT_NUM = Object.freeze({
  THREE: 3,
  SEVEN: 7,
  NINE: 9,
  NINETYNINE: 99,
  THIRTYTHREE: 33,
  TWENTYTWO: 22,
  ELEVEN: 11,
  ONEFORTYFOUR: 144,
});

test('renderHelix: saves, clears background, and restores exactly once at top-level', () => {
  const { ctx, log } = makeCtxRecorder();
  renderHelix(ctx, { width: 90, height: 90, palette: defaultPalette, NUM: DEFAULT_NUM });

  // First op should be save, last should be restore
  assert.equal(log[0].op, 'save', 'first op is top-level save');
  assert.equal(log.at(-1).op, 'restore', 'last op is top-level restore');

  // Background fill uses palette.bg and correct rect
  const fillStyleSet = log.find(e => e.op === 'setFillStyle' && e.args[0] === defaultPalette.bg);
  assert.ok(fillStyleSet, 'fillStyle set to bg');
  const fillRect = log.find(e => e.op === 'fillRect' && e.args[0] === 0 && e.args[1] === 0 && e.args[2] === 90 && e.args[3] === 90);
  assert.ok(fillRect, 'background fillRect covers full canvas');

  // Balanced saves/restores including layer-local save/restore pairs
  const saves = log.filter(e => e.op === 'save').length;
  const restores = log.filter(e => e.op === 'restore').length;
  assert.equal(saves, restores, 'save/restore balanced overall');
  assert.ok(saves >= 5, 'expected at least 5 save/restore calls (top-level + 4 layers)');
});

test('Vesica field: deterministic arc count and styling for small canvas', () => {
  // With w=h=90 and DEFAULT_NUM, we pre-compute 2x2 grid, 2 arcs per cell => 8 arc strokes
  const { ctx, log } = makeCtxRecorder();
  renderHelix(ctx, { width: 90, height: 90, palette: defaultPalette, NUM: DEFAULT_NUM });

  // Vesica styling
  const vesicaColor = defaultPalette.layers[0];
  const vesicaStrokes = log.filter(e => e.op === 'stroke' && e.state.strokeStyle === vesicaColor);
  const vesicaArcs = log.filter(e => e.op === 'arc' && e.state.strokeStyle === vesicaColor);
  const vesicaAlphaSet = log.find(e => e.op === 'setGlobalAlpha' && e.args[0] === 0.75);
  const vesicaLineWidthSet = log.find(e => e.op === 'setLineWidth' && e.args[0] === 1);

  assert.ok(vesicaAlphaSet, 'vesica sets globalAlpha=0.75');
  assert.ok(vesicaLineWidthSet, 'vesica sets lineWidth=1');

  // Each arc() is followed by a stroke(); arc count should be 8 for this geometry
  assert.equal(vesicaArcs.length, 8, 'expected 8 arcs in vesica lattice for 90x90 canvas');
  assert.equal(vesicaStrokes.length, 8, 'expected 8 vesica strokes (one per arc)');
});

test('Tree-of-Life: draws 22 path strokes and 10 node fills with correct colors', () => {
  const { ctx, log } = makeCtxRecorder();
  renderHelix(ctx, { width: 300, height: 300, palette: defaultPalette, NUM: DEFAULT_NUM });

  const pathColor = defaultPalette.layers[1];
  const nodeColor = defaultPalette.layers[2];

  const pathStrokes = log.filter(e => e.op === 'stroke' && e.state.strokeStyle === pathColor);
  const nodeFills = log.filter(e => e.op === 'fill' && e.state.fillStyle === nodeColor);
  const alphaSet = log.find(e => e.op === 'setGlobalAlpha' && e.args[0] === 0.9);
  const lineWidthSet = log.find(e => e.op === 'setLineWidth' && e.args[0] === 1.5);

  assert.ok(alphaSet, 'tree sets globalAlpha=0.9');
  assert.ok(lineWidthSet, 'tree sets lineWidth=1.5');
  assert.equal(pathStrokes.length, 22, 'expected 22 connective path strokes');
  assert.equal(nodeFills.length, 10, 'expected 10 node fills');
});

test('Fibonacci: single polyline stroke under its color; early-return when total=1', () => {
  // Happy path: total = 144 -> one polyline stroke under layers[3]
  {
    const { ctx, log } = makeCtxRecorder();
    renderHelix(ctx, { width: 400, height: 300, palette: defaultPalette, NUM: DEFAULT_NUM });
    const fibColor = defaultPalette.layers[3];
    const fibStrokes = log.filter(e => e.op === 'stroke' && e.state.strokeStyle === fibColor);
    const alphaSet = log.find(e => e.op === 'setGlobalAlpha' && e.args[0] === 0.85);
    const lineWidthSet = log.find(e => e.op === 'setLineWidth' && e.args[0] === 2);
    assert.ok(alphaSet, 'fibonacci sets globalAlpha=0.85');
    assert.ok(lineWidthSet, 'fibonacci sets lineWidth=2');
    assert.equal(fibStrokes.length, 1, 'fibonacci polyline should stroke once');
  }

  // Edge case: total = 1 -> drawPolyline should early-return (no stroke)
  {
    const NUM = { ...DEFAULT_NUM, ONEFORTYFOUR: 1 };
    const { ctx, log } = makeCtxRecorder();
    renderHelix(ctx, { width: 400, height: 300, palette: defaultPalette, NUM });
    const fibColor = defaultPalette.layers[3];
    const fibStrokes = log.filter(e => e.op === 'stroke' && e.state.strokeStyle === fibColor);
    assert.equal(fibStrokes.length, 0, 'fibonacci early-return: no stroke when total=1');
  }
});

test('Helix: two strand polylines + 33 rung strokes; early-return strands when samples=1', () => {
  // Happy path with DEFAULT_NUM
  {
    const { ctx, log } = makeCtxRecorder();
    renderHelix(ctx, { width: 400, height: 600, palette: defaultPalette, NUM: DEFAULT_NUM });

    const strandAColor = defaultPalette.layers[4];
    const strandBColor = defaultPalette.layers[5];
    const rungColor = defaultPalette.ink;

    const alphaSet = log.find(e => e.op === 'setGlobalAlpha' && e.args[0] === 0.9);
    const lw2 = log.find(e => e.op === 'setLineWidth' && e.args[0] === 2);
    const lw1 = log.find(e => e.op === 'setLineWidth' && e.args[0] === 1);
    assert.ok(alphaSet, 'helix sets globalAlpha=0.9');
    assert.ok(lw2, 'helix sets lineWidth=2 for strands');
    assert.ok(lw1, 'helix sets lineWidth=1 for rungs');

    const aStrokes = log.filter(e => e.op === 'stroke' && e.state.strokeStyle === strandAColor);
    const bStrokes = log.filter(e => e.op === 'stroke' && e.state.strokeStyle === strandBColor);
    const rungStrokes = log.filter(e => e.op === 'stroke' && e.state.strokeStyle === rungColor);

    assert.equal(aStrokes.length, 1, 'one polyline stroke for strand A');
    assert.equal(bStrokes.length, 1, 'one polyline stroke for strand B');
    assert.equal(rungStrokes.length, DEFAULT_NUM.THIRTYTHREE, '33 rung strokes expected');
  }

  // Edge case: samples=1 -> strands should not stroke; rungs still drawn 33 times
  {
    const NUM = { ...DEFAULT_NUM, NINETYNINE: 1, THIRTYTHREE: 33 };
    const { ctx, log } = makeCtxRecorder();
    renderHelix(ctx, { width: 400, height: 600, palette: defaultPalette, NUM });

    const strandAColor = defaultPalette.layers[4];
    const strandBColor = defaultPalette.layers[5];
    const rungColor = defaultPalette.ink;

    const aStrokes = log.filter(e => e.op === 'stroke' && e.state.strokeStyle === strandAColor);
    const bStrokes = log.filter(e => e.op === 'stroke' && e.state.strokeStyle === strandBColor);
    const rungStrokes = log.filter(e => e.op === 'stroke' && e.state.strokeStyle === rungColor);

    assert.equal(aStrokes.length, 0, 'strand A polyline early-return: no stroke when samples=1');
    assert.equal(bStrokes.length, 0, 'strand B polyline early-return: no stroke when samples=1');
    assert.equal(rungStrokes.length, 33, 'rungs still stroke 33 times even when strands have one point');
  }
});

test('Render is pure w.r.t. ctx interface: no unexpected methods accessed', () => {
  // Provide a ctx that throws if an unknown property is accessed to ensure only known API is used
  const { ctx, log } = makeCtxRecorder();
  const guarded = new Proxy(ctx, {
    get(target, prop, receiver) {
      if (prop in target) return Reflect.get(target, prop, receiver);
      throw new Error('Unexpected ctx property: ' + String(prop));
    },
  });
  assert.doesNotThrow(() => {
    renderHelix(guarded, { width: 200, height: 200, palette: defaultPalette, NUM: DEFAULT_NUM });
  }, 'renderHelix should only use known 2D ctx API');
  assert.ok(log.length > 0, 'render produced draw operations');
});