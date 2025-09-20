// Test framework detected: vitest
/**
 * Tests for helix renderer (Runner: Vitest)
 * Focus: renderHelix determinism and layer outputs; internal routines via observable canvas ops.
 */
import { describe, it, expect } from 'vitest';
import { renderHelix } from "..//home/jailuser/git/js/helix-renderer.mjs";

class MockCtx {
  constructor() {
    this.calls = [];
    this._strokeStyle = null;
    this._fillStyle = null;
    this._lineWidth = null;
    const record = (op, args = []) => {
      this.calls.push({ op, args, strokeStyle: this._strokeStyle, fillStyle: this._fillStyle, lineWidth: this._lineWidth });
    };
    this.save = () => record('save');
    this.restore = () => record('restore');
    this.fillRect = (...args) => record('fillRect', args);
    this.beginPath = () => record('beginPath');
    this.arc = (...args) => record('arc', args);
    this.moveTo = (...args) => record('moveTo', args);
    this.lineTo = (...args) => record('lineTo', args);
    this.stroke = () => record('stroke');
    this.fill = () => record('fill');

    Object.defineProperty(this, 'strokeStyle', {
      get: () => this._strokeStyle,
      set: (v) => { this._strokeStyle = v; this.calls.push({ op: 'setStrokeStyle', args: [v] }); }
    });
    Object.defineProperty(this, 'fillStyle', {
      get: () => this._fillStyle,
      set: (v) => { this._fillStyle = v; this.calls.push({ op: 'setFillStyle', args: [v] }); }
    });
    Object.defineProperty(this, 'lineWidth', {
      get: () => this._lineWidth,
      set: (v) => { this._lineWidth = v; this.calls.push({ op: 'setLineWidth', args: [v] }); }
    });
  }
}

const WIDTH = 100;
const HEIGHT = 100;

const NUM = {
  THREE: 50,       // -> baseRadius=2
  SEVEN: 2,        // -> step=1
  NINE: 97,        // -> grid step ~97
  TWENTYTWO: 22,   // -> node radius scale
  ONEFORTYFOUR: 12, // reduced samples for test speed
  ELEVEN: 3,        // helical turns
  THIRTYTHREE: 6,   // rungs => 7
  NINETYNINE: 18    // helix steps per strand
};

const palette = {
  bg: '#000000',
  layers: ['#111111','#222222','#333333','#444444','#555555','#666666'],
  ink: '#ABCDEF'
};

function computeVesicaStrokeCount(w, h, NUM) {
  const baseRadius = Math.min(w, h) / NUM.THREE;
  const step = baseRadius / NUM.SEVEN;
  let count = 0;
  for (let y = baseRadius; y < h; y += step * NUM.NINE) {
    for (let x = baseRadius; x < w; x += step * NUM.NINE) {
      count += 2; // two circle strokes per grid position
    }
  }
  return count;
}

function count(calls, op, pred = () => true) {
  return calls.filter(e => e.op === op && pred(e)).length;
}

function firstIndexOfStyle(calls, color) {
  return calls.findIndex(e => e.op === 'setStrokeStyle' && e.args[0] === color);
}

describe('renderHelix() static composition', () => {
  it('clears background and restores canvas state', () => {
    const ctx = new MockCtx();
    renderHelix(ctx, { width: WIDTH, height: HEIGHT, palette, NUM });
    const bgFill = ctx.calls.find(e => e.op === 'fillRect');
    expect(bgFill?.args).toEqual([0,0,WIDTH,HEIGHT]);
    const bgStyleSet = ctx.calls.find(e => e.op === 'setFillStyle' && e.args[0] === palette.bg);
    expect(bgStyleSet).toBeTruthy();
    expect(count(ctx.calls, 'save')).toBe(count(ctx.calls, 'restore'));
  });

  it('draws layers in the specified order (vesica -> tree -> fibonacci -> helix)', () => {
    const ctx = new MockCtx();
    renderHelix(ctx, { width: WIDTH, height: HEIGHT, palette, NUM });

    const iVesica = firstIndexOfStyle(ctx.calls, palette.layers[0]);
    const iTreePath = firstIndexOfStyle(ctx.calls, palette.layers[1]);
    const iTreeNodeFill = ctx.calls.findIndex(e => e.op === 'setFillStyle' && e.args[0] === palette.layers[2]);
    const iFib = firstIndexOfStyle(ctx.calls, palette.layers[3]);
    const iHelixA = firstIndexOfStyle(ctx.calls, palette.layers[4]);
    const iHelixB = firstIndexOfStyle(ctx.calls, palette.layers[5]);
    const iRung = firstIndexOfStyle(ctx.calls, palette.ink);

    expect(iVesica).toBeGreaterThan(-1);
    expect(iTreePath).toBeGreaterThan(-1);
    expect(iTreeNodeFill).toBeGreaterThan(-1);
    expect(iFib).toBeGreaterThan(-1);
    expect(iHelixA).toBeGreaterThan(-1);
    expect(iHelixB).toBeGreaterThan(-1);
    expect(iRung).toBeGreaterThan(-1);

    expect(iVesica).toBeLessThan(iTreePath);
    expect(iTreePath).toBeLessThan(iFib);
    expect(iFib).toBeLessThan(iHelixA);
    expect(iHelixA).toBeLessThan(iHelixB);
    expect(iHelixB).toBeLessThan(iRung);

    // ensure node fill style set between tree path and fibonacci
    expect(iTreePath).toBeLessThan(iTreeNodeFill);
    expect(iTreeNodeFill).toBeLessThan(iFib);
  });

  it('vesica field: expected number of circle strokes', () => {
    const ctx = new MockCtx();
    renderHelix(ctx, { width: WIDTH, height: HEIGHT, palette, NUM });
    const expected = computeVesicaStrokeCount(WIDTH, HEIGHT, NUM);
    const actual = count(ctx.calls, 'stroke', e => e.strokeStyle === palette.layers[0] && e.lineWidth === 1);
    expect(actual).toBe(expected);
  });

  it('tree scaffold: 22 path strokes and 10 node fills', () => {
    const ctx = new MockCtx();
    renderHelix(ctx, { width: WIDTH, height: HEIGHT, palette, NUM });
    const pathStrokes = count(ctx.calls, 'stroke', e => e.strokeStyle === palette.layers[1] && e.lineWidth === 1);
    const nodeFills = count(ctx.calls, 'fill', e => e.fillStyle === palette.layers[2]);
    expect(pathStrokes).toBe(22);
    expect(nodeFills).toBe(10);
  });

  it('fibonacci spiral: samples translated to line segments (ONEFORTYFOUR lineTo ops)', () => {
    const ctx = new MockCtx();
    renderHelix(ctx, { width: WIDTH, height: HEIGHT, palette, NUM });
    const lineTos = count(ctx.calls, 'lineTo', e => e.strokeStyle === palette.layers[3]);
    expect(lineTos).toBe(NUM.ONEFORTYFOUR);
    const strokes = count(ctx.calls, 'stroke', e => e.strokeStyle === palette.layers[3] && e.lineWidth === 2);
    expect(strokes).toBe(1);
  });

  it('double helix: two strands and THIRTYTHREE+1 rungs', () => {
    const ctx = new MockCtx();
    renderHelix(ctx, { width: WIDTH, height: HEIGHT, palette, NUM });
    const strandA = count(ctx.calls, 'lineTo', e => e.strokeStyle === palette.layers[4]);
    const strandB = count(ctx.calls, 'lineTo', e => e.strokeStyle === palette.layers[5]);
    expect(strandA).toBe(NUM.NINETYNINE);
    expect(strandB).toBe(NUM.NINETYNINE);
    const rungs = count(ctx.calls, 'stroke', e => e.strokeStyle === palette.ink && e.lineWidth === 1);
    expect(rungs).toBe(NUM.THIRTYTHREE + 1);
  });

  it('deterministic output: same inputs yield identical call traces', () => {
    const ctx1 = new MockCtx();
    const ctx2 = new MockCtx();
    renderHelix(ctx1, { width: WIDTH, height: HEIGHT, palette, NUM });
    renderHelix(ctx2, { width: WIDTH, height: HEIGHT, palette, NUM });
    expect(ctx1.calls).toEqual(ctx2.calls);
  });

  it('gracefully handles incomplete palette without throwing', () => {
    const ctx = new MockCtx();
    const badPalette = { bg: '#101010', layers: ['#a','#b','#c'], ink: '#fff' };
    expect(() => renderHelix(ctx, { width: WIDTH, height: HEIGHT, palette: badPalette, NUM })).not.toThrow();
    // still clears background
    const bgFill = ctx.calls.find(e => e.op === 'fillRect');
    expect(bgFill).toBeTruthy();
  });
});