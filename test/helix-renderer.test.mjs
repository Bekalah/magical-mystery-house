// Framework: Node.js built-in test runner (node:test) with assert (ESM).
// If the repository uses another framework (e.g., Vitest/Jest/Mocha), this file can be adapted to match.
// Tests focus on public export renderHelix and validate sequencing and geometry counts via a canvas 2D mock.

import test from 'node:test';
import assert from 'node:assert/strict';

// Import the module under test. Adjust path if helix-renderer.mjs resides elsewhere.
import { renderHelix } from '../helix-renderer.mjs';

// Utilities: recording 2D context mock
function createCtxMock() {
  const log = [];
  const state = {
    fillStyle: null,
    strokeStyle: null,
    globalAlpha: 1,
    lineWidth: 1,
    saveCount: 0,
    restoreCount: 0,
  };

  const record = (type, args = []) => log.push({ type, args, snapshot: {
    fillStyle: state.fillStyle,
    strokeStyle: state.strokeStyle,
    globalAlpha: state.globalAlpha,
    lineWidth: state.lineWidth,
  }});

  const ctx = {
    // properties with setters that record
    get fillStyle() { return state.fillStyle; },
    set fillStyle(v) { state.fillStyle = v; record('set:fillStyle', [v]); },

    get strokeStyle() { return state.strokeStyle; },
    set strokeStyle(v) { state.strokeStyle = v; record('set:strokeStyle', [v]); },

    get globalAlpha() { return state.globalAlpha; },
    set globalAlpha(v) { state.globalAlpha = v; record('set:globalAlpha', [v]); },

    get lineWidth() { return state.lineWidth; },
    set lineWidth(v) { state.lineWidth = v; record('set:lineWidth', [v]); },

    save() { state.saveCount += 1; record('save'); },
    restore() { state.restoreCount += 1; record('restore'); },

    beginPath() { record('beginPath'); },
    moveTo(x, y) { record('moveTo', [x, y]); },
    lineTo(x, y) { record('lineTo', [x, y]); },
    arc(x, y, r, s, e) { record('arc', [x, y, r, s, e]); },
    stroke() { record('stroke'); },
    fill() { record('fill'); },
    fillRect(x, y, w, h) { record('fillRect', [x, y, w, h]); },
  };

  return { ctx, log, state };
}

// A minimal NUM object matching symbolic constants used in the renderer.
const NUM = {
  THREE: 3,
  SEVEN: 7,
  NINE: 9,
  ELEVEN: 11,
  TWENTYTWO: 22,
  THIRTYTHREE: 33,
  NINETYNINE: 99,
  ONEFORTYFOUR: 144,
};

const basePalette = {
  bg: '#000011',
  ink: '#ffffff',
  layers: ['#336699', '#88cc88', '#ffeeaa', '#ff66aa', '#66ddff', '#cc66ff'],
};

function run(width = 300, height = 200, palette = basePalette, num = NUM) {
  const { ctx, log, state } = createCtxMock();
  renderHelix(ctx, { width, height, palette, NUM: num });
  return { log, state };
}

function findIndices(log, predicate) {
  const idxs = [];
  for (let i = 0; i < log.length; i += 1) {
    if (predicate(log[i], i)) idxs.push(i);
  }
  return idxs;
}

test('renderHelix: performs top-level save->background->restore', () => {
  const { log, state } = run(330, 231);
  // At least one save and restore at top level
  assert.ok(state.saveCount >= 1, 'expects ctx.save() to be called');
  assert.ok(state.restoreCount >= 1, 'expects ctx.restore() to be called');

  // Background fill: set fillStyle to palette.bg then fillRect(0,0,width,height)
  const bgSetIdx = log.findIndex(e => e.type === 'set:fillStyle' && e.args[0] === basePalette.bg);
  assert.ok(bgSetIdx !== -1, 'background fillStyle is set');

  const bgRectIdx = log.findIndex((e, i) =>
    e.type === 'fillRect' &&
    e.args[0] === 0 && e.args[1] === 0 && e.args[2] === 330 && e.args[3] === 231 &&
    i > bgSetIdx
  );
  assert.ok(bgRectIdx !== -1, 'background fillRect covers full canvas');
});

test('Layer order: vesica -> tree -> fibonacci -> helix (strandA, strandB, rungs)', () => {
  const { log } = run(330, 231);

  // Vesica stroke color first set to layers[0]
  const vesicaColorIdx = log.findIndex(e => e.type === 'set:strokeStyle' && e.args[0] === basePalette.layers[0]);
  assert.ok(vesicaColorIdx !== -1, 'vesica strokeStyle set to layers[0]');

  // Tree path color set to layers[1] after vesica
  const treePathColorIdx = log.findIndex((e, i) => i > vesicaColorIdx && e.type === 'set:strokeStyle' && e.args[0] === basePalette.layers[1]);
  assert.ok(treePathColorIdx !== -1, 'tree strokeStyle set to layers[1] and occurs after vesica');

  // Tree node fill color set to layers[2] after path strokes begin
  const treeNodeFillIdx = log.findIndex((e, i) => i > treePathColorIdx && e.type === 'set:fillStyle' && e.args[0] === basePalette.layers[2]);
  assert.ok(treeNodeFillIdx !== -1, 'tree node fillStyle set to layers[2]');

  // Fibonacci stroke color set to layers[3] after tree
  const fibColorIdx = log.findIndex((e, i) => i > treeNodeFillIdx && e.type === 'set:strokeStyle' && e.args[0] === basePalette.layers[3]);
  assert.ok(fibColorIdx !== -1, 'fibonacci strokeStyle set to layers[3]');

  // Helix strand colors set to layers[4] then layers[5] after fibonacci
  const helixAColorIdx = log.findIndex((e, i) => i > fibColorIdx && e.type === 'set:strokeStyle' && e.args[0] === basePalette.layers[4]);
  assert.ok(helixAColorIdx !== -1, 'helix strandA strokeStyle set to layers[4]');

  const helixBColorIdx = log.findIndex((e, i) => i > helixAColorIdx && e.type === 'set:strokeStyle' && e.args[0] === basePalette.layers[5]);
  assert.ok(helixBColorIdx !== -1, 'helix strandB strokeStyle set to layers[5]');

  // Rungs use ink color after strands
  const rungColorIdx = log.findIndex((e, i) => i > helixBColorIdx && e.type === 'set:strokeStyle' && e.args[0] === basePalette.ink);
  assert.ok(rungColorIdx !== -1, 'rungs strokeStyle set to ink color');
});

test('Vesica: sets line width and alpha; draws overlapping circle strokes', () => {
  const { log } = run(330, 231);

  // Look in the vesica window: after first set:strokeStyle layers[0] and before tree color layers[1]
  const start = log.findIndex(e => e.type === 'set:strokeStyle' && e.args[0] === basePalette.layers[0]);

  const end = log.findIndex((e, i) => i > start && e.type === 'set:strokeStyle' && e.args[0] === basePalette.layers[1]);
  assert.ok(start !== -1 && end !== -1, 'found vesica segment');

  const vesicaSegment = log.slice(start, end);
  assert.ok(vesicaSegment.some(e => e.type === 'set:lineWidth' && e.args[0] === 1), 'vesica lineWidth = 1');
  assert.ok(vesicaSegment.some(e => e.type === 'set:globalAlpha' && Math.abs(e.args[0] - 0.75) < 1e-9), 'vesica globalAlpha = 0.75');

  // Expect arcs with beginPath/arc/stroke repeating; validate at least a few arcs exist
  const arcCount = vesicaSegment.filter(e => e.type === 'arc').length;
  const strokeCount = vesicaSegment.filter(e => e.type === 'stroke').length;
  assert.ok(arcCount >= 4, 'vesica draws multiple arcs');
  assert.ok(strokeCount >= 2, 'vesica strokes multiple times');
});

test('Tree-of-Life: draws edges then 10 node fills with correct styles', () => {
  const { log } = run(330, 231);

  const treeStart = log.findIndex(e => e.type === 'set:strokeStyle' && e.args[0] === basePalette.layers[1]);
  const treeFillStyleIdx = log.findIndex((e, i) => i > treeStart && e.type === 'set:fillStyle' && e.args[0] === basePalette.layers[2]);
  assert.ok(treeStart !== -1 && treeFillStyleIdx !== -1, 'tree path and node color changes found');

  // Validate path style before node fills
  const treePathWindow = log.slice(treeStart, treeFillStyleIdx);
  assert.ok(treePathWindow.some(e => e.type === 'set:lineWidth' && Math.abs(e.args[0] - 1.5) < 1e-9), 'tree path lineWidth = 1.5');
  assert.ok(treePathWindow.some(e => e.type === 'set:globalAlpha' && Math.abs(e.args[0] - 0.9) < 1e-9), 'tree globalAlpha = 0.9');
  assert.ok(treePathWindow.some(e => e.type === 'moveTo') && treePathWindow.some(e => e.type === 'lineTo') && treePathWindow.some(e => e.type === 'stroke'), 'tree draws edges');

  // Node fills occur after fillStyle is set
  const nodeWindow = log.slice(treeFillStyleIdx);
  const nodeFillCount = nodeWindow.filter(e => e.type === 'fill').length;
  // Should be exactly 10 fills (one per node)
  assert.equal(nodeFillCount, 10, 'tree draws 10 node fills');
});

test('Fibonacci: draws single polyline with 144 points (143 lineTo) and correct style', () => {
  const { log } = run(330, 231);

  const fibStart = log.findIndex(e => e.type === 'set:strokeStyle' && e.args[0] === basePalette.layers[3]);
  assert.ok(fibStart !== -1, 'found fibonacci color set');

  // The polyline segment runs until the next set:strokeStyle (strandA color)
  const nextStyleIdx = log.findIndex((e, i) => i > fibStart && e.type === 'set:strokeStyle');
  const fibWindow = log.slice(fibStart, nextStyleIdx === -1 ? log.length : nextStyleIdx);

  // Expect lineWidth 2 and globalAlpha 0.85 set in this window
  assert.ok(fibWindow.some(e => e.type === 'set:lineWidth' && e.args[0] === 2), 'fibonacci lineWidth = 2');
  assert.ok(fibWindow.some(e => e.type === 'set:globalAlpha' && Math.abs(e.args[0] - 0.85) < 1e-9), 'fibonacci globalAlpha = 0.85');

  // The drawPolyline sequence: beginPath -> moveTo -> 143 lineTo -> stroke (counts may not be interleaved in this window)
  const beginIdx = fibWindow.findIndex(e => e.type === 'beginPath');
  const moveToIdx = fibWindow.findIndex((e, i) => i > beginIdx && e.type === 'moveTo');
  const strokeIdx = fibWindow.findIndex((e, i) => i > moveToIdx && e.type === 'stroke');
  assert.ok(beginIdx !== -1 && moveToIdx !== -1 && strokeIdx !== -1, 'fibonacci polyline basic sequence found');

  const between = fibWindow.slice(moveToIdx + 1, strokeIdx);
  const lineToCount = between.filter(e => e.type === 'lineTo').length;
  assert.equal(lineToCount, 143, 'fibonacci draws 143 line segments (144 points)');
});

test('Helix: draws two strands (98 segments each) and 33 rungs with correct styles', () => {
  const { log } = run(330, 231);

  // Strand A window
  const aStart = log.findIndex(e => e.type === 'set:strokeStyle' && e.args[0] === basePalette.layers[4]);
  assert.ok(aStart !== -1, 'strandA color set');
  const bStart = log.findIndex((e, i) => i > aStart && e.type === 'set:strokeStyle' && e.args[0] === basePalette.layers[5]);
  assert.ok(bStart !== -1, 'strandB color set');
  const rungStart = log.findIndex((e, i) => i > bStart && e.type === 'set:strokeStyle' && e.args[0] === basePalette.ink);
  assert.ok(rungStart !== -1, 'rungs color set');

  // Strand A polyline stroke is within [aStart, bStart)
  const aWindow = log.slice(aStart, bStart);
  const aBegin = aWindow.findIndex(e => e.type === 'beginPath');
  const aMove = aWindow.findIndex((e, i) => i > aBegin && e.type === 'moveTo');
  const aStroke = aWindow.findIndex((e, i) => i > aMove && e.type === 'stroke');
  assert.ok(aBegin !== -1 && aMove !== -1 && aStroke !== -1, 'strandA polyline sequence present');
  const aLineTo = aWindow.slice(aMove + 1, aStroke).filter(e => e.type === 'lineTo').length;
  assert.equal(aLineTo, 98, 'strandA draws 98 line segments (99 points)');

  // Strand B polyline stroke is within [bStart, rungStart)
  const bWindow = log.slice(bStart, rungStart);
  const bBegin = bWindow.findIndex(e => e.type === 'beginPath');
  const bMove = bWindow.findIndex((e, i) => i > bBegin && e.type === 'moveTo');
  const bStroke = bWindow.findIndex((e, i) => i > bMove && e.type === 'stroke');
  assert.ok(bBegin !== -1 && bMove !== -1 && bStroke !== -1, 'strandB polyline sequence present');
  const bLineTo = bWindow.slice(bMove + 1, bStroke).filter(e => e.type === 'lineTo').length;
  assert.equal(bLineTo, 98, 'strandB draws 98 line segments (99 points)');

  // Rungs: after rungStart, expect 33 stroke() calls (one per rung)
  const rungWindow = log.slice(rungStart);
  const rungStrokeCount = rungWindow.filter(e => e.type === 'stroke').length;
  assert.equal(rungStrokeCount, 33, 'draws 33 rung strokes');
});

test('Graceful handling: drawPolyline no-ops for invalid inputs (indirect via minimal NUM)', () => {
  // Create a NUM that leads to minimal or degenerate sampling for Fibonacci (force ONEFORTYFOUR=1)
  const MIN_NUM = { ...NUM, ONEFORTYFOUR: 1, NINETYNINE: 2, THIRTYTHREE: 2, ELEVEN: 11, TWENTYTWO: 22 };
  const { log } = run(330, 231, basePalette, MIN_NUM);

  // We only assert that nothing throws and there are no negative index assumptions.
  // Additionally, ensure that fibonacci segment either doesn't stroke or has zero/very few lineTo calls.
  const fibStart = log.findIndex(e => e.type === 'set:strokeStyle' && e.args[0] === basePalette.layers[3]);
  assert.ok(fibStart !== -1, 'fibonacci phase reached');

  const nextStyleIdx = log.findIndex((e, i) => i > fibStart && e.type === 'set:strokeStyle');
  const fibWindow = log.slice(fibStart, nextStyleIdx === -1 ? log.length : nextStyleIdx);

  const lineToCount = fibWindow.filter(e => e.type === 'lineTo').length;
  assert.ok(lineToCount <= 1, 'degenerate fibonacci results in <=1 line segment');
});

test('Style integrity: each layer sets its own alpha/width without leaking across layers', () => {
  const { log } = run(330, 231);

  // For each layer, capture the first seen globalAlpha/lineWidth after its color set.
  const expectStyleNear = (color, alpha, width, afterIdx = -1) => {
    const start = log.findIndex((e,i) => i > afterIdx && e.type === 'set:strokeStyle' && e.args[0] === color);
    assert.ok(start !== -1, `found color ${color}`);
    const window = log.slice(start, start + 30); // local neighborhood should include style sets
    assert.ok(window.some(e => e.type === 'set:globalAlpha' && Math.abs(e.args[0] - alpha) < 1e-9), `alpha ${alpha} set near color ${color}`);
    assert.ok(window.some(e => e.type === 'set:lineWidth' && Math.abs(e.args[0] - width) < 1e-9), `lineWidth ${width} set near color ${color}`);
    return start;
  };

  let idx = -1;
  // Vesica styles
  idx = expectStyleNear(basePalette.layers[0], 0.75, 1, idx);
  // Tree path styles
  idx = expectStyleNear(basePalette.layers[1], 0.9, 1.5, idx);
  // Fibonacci styles
  idx = expectStyleNear(basePalette.layers[3], 0.85, 2, idx);
  // Helix strands share globalAlpha 0.9 and lineWidth 2
  idx = expectStyleNear(basePalette.layers[4], 0.9, 2, idx);
  idx = expectStyleNear(basePalette.layers[5], 0.9, 2, idx);
  // Rungs: alpha continues 0.9, width set to 1
  const rungStart = log.findIndex((e,i) => i > idx && e.type === 'set:strokeStyle' && e.args[0] === basePalette.ink);
  assert.ok(rungStart !== -1, 'rungs color observed');
  const rungWindow = log.slice(rungStart, rungStart + 30);
  assert.ok(rungWindow.some(e => e.type === 'set:lineWidth' && e.args[0] === 1), 'rungs set lineWidth = 1');
});