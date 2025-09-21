/* 
  Tests for helix-renderer.mjs
  This suite uses describe/it/expect API compatible with Vitest and Jest.
  Detected framework: will be determined by project config; tests avoid framework-specific imports.
*/
const assertLike = (() => {
  // Lightweight expect-like API that delegates to global expect if available (Vitest/Jest),
  // otherwise falls back to Node's built-in assertions for basic checks.
  const hasExpect = typeof globalThis.expect === "function";
  if (hasExpect) {
    return {
      toBe: (received, expected) => expect(received).toBe(expected),
      toBeGreaterThan: (received, expected) => expect(received).toBeGreaterThan(expected),
      toBeGreaterThanOrEqual: (received, expected) => expect(received).toBeGreaterThanOrEqual(expected),
      toBeLessThanOrEqual: (received, expected) => expect(received).toBeLessThanOrEqual(expected),
      toBeCloseTo: (received, expected, numDigits) => expect(received).toBeCloseTo(expected, numDigits),
      toHaveBeenCalled: (spy) => expect(spy).toHaveBeenCalled(),
      toHaveBeenCalledTimes: (spy, n) => expect(spy).toHaveBeenCalledTimes(n),
      toEqual: (received, expected) => expect(received).toEqual(expected),
      toMatch: (received, re) => expect(received).toMatch(re),
      truthy: (v) => expect(v).toBeTruthy(),
      falsy: (v) => expect(v).toBeFalsy(),
    };
  }
  // Fallback minimal assertions
  const assert = function(cond, msg) { if (!cond) throw new Error(msg || "Assertion failed"); };
  return {
    toBe: (a, b) => assert(Object.is(a, b), `Expected ${a} to be ${b}`),
    toBeGreaterThan: (a, b) => assert(a > b, `Expected ${a} > ${b}`),
    toBeGreaterThanOrEqual: (a, b) => assert(a >= b, `Expected ${a} >= ${b}`),
    toBeLessThanOrEqual: (a, b) => assert(a <= b, `Expected ${a} <= ${b}`),
    toBeCloseTo: (a, b, d = 2) => assert(Math.abs(a - b) < Math.pow(10, -d), `Expected ${a} ≈ ${b}`),
    toHaveBeenCalled: (spy) => assert(spy.__calls && spy.__calls.length > 0, "Expected spy to have been called"),
    toHaveBeenCalledTimes: (spy, n) => assert(spy.__calls && spy.__calls.length === n, `Expected ${n} calls, got ${spy.__calls?.length || 0}`),
    toEqual: (a, b) => assert(JSON.stringify(a) === JSON.stringify(b), `Expected deep equal`),
    toMatch: (s, re) => assert(re.test(s), `Expected ${s} to match ${re}`),
    truthy: function(v) { assert(!!v, `Expected value to be truthy`); },
    falsy: function(v) { assert(!v, `Expected value to be falsy`); },
  };
})();

function makeSpy(name) {
  const fn = function(...args) {
    fn.__calls.push(args);
    return undefined;
  };
  Object.defineProperty(fn, "name", { value: name });
  fn.__calls = [];
  return fn;
}

function makeCtx() {
  // Minimal 2D context mock capturing drawing calls
  const ctx = {
    // stateful properties (we don't assert values, but they shouldn't throw)
    fillStyle: null,
    strokeStyle: null,
    lineWidth: null,
    globalAlpha: 1,
    globalCompositeOperation: null,
    shadowColor: null,
    shadowBlur: 0,
    font: null,
    textBaseline: null,

    // path/draw
    save: makeSpy("save"),
    restore: makeSpy("restore"),
    beginPath: makeSpy("beginPath"),
    moveTo: makeSpy("moveTo"),
    lineTo: makeSpy("lineTo"),
    stroke: makeSpy("stroke"),
    arc: makeSpy("arc"),
    fill: makeSpy("fill"),
    fillRect: makeSpy("fillRect"),
    fillText: makeSpy("fillText"),

    // gradients
    createLinearGradient: (...args) => {
      const grad = {
        __type: "linear",
        __args: args,
        stops: [],
        addColorStop: function(offset, color) {
          this.stops.push([offset, color]);
        }
      };
      // Track gradient creations
      ctx.__linearGrads.push(grad);
      return grad;
    },
    createRadialGradient: (...args) => {
      const grad = {
        __type: "radial",
        __args: args,
        stops: [],
        addColorStop: function(offset, color) {
          this.stops.push([offset, color]);
        }
      };
      ctx.__radialGrads.push(grad);
      return grad;
    },

    // diagnostics
    __linearGrads: [],
    __radialGrads: [],
  };
  return ctx;
}

// NUM constants required by the renderer
const NUM = Object.freeze({
  NINE: 9,
  THREE: 3,
  SEVEN: 7,
  TWENTYTWO: 22,
  ONEFORTYFOUR: 144,
  ELEVEN: 11,
  NINETYNINE: 99,
  THIRT YTHREE: 33,
});

// Simple palette with valid hex colors
const palette = {
  bg: "#0a0a0f",
  ink: "#ffffff",
  layers: [
    "#8ecae6", // 0
    "#219ebc", // 1
    "#023047", // 2
    "#ffb703", // 3
    "#fb8500", // 4
    "#fad2e1", // 5
  ],
};

// Try to import the module from likely locations
async function importRenderer() {
  const candidates = [
    "./helix-renderer.mjs",
    "../helix-renderer.mjs",
    "helix-renderer.mjs",
    "src/helix-renderer.mjs",
    "../src/helix-renderer.mjs",
    "lib/helix-renderer.mjs",
    "../lib/helix-renderer.mjs",
  ];
  let lastErr;
  for (const p of candidates) {
    try {
      // Dynamic import relative to test file
      return await import(p);
    } catch (e) {
      lastErr = e;
    }
  }
  throw new Error("Unable to locate helix-renderer.mjs via common paths. Last error: " + (lastErr && lastErr.message));
}

const D = (typeof describe === "function" ? describe : (name, fn) => { fn(); });
const IT = (typeof it === "function" ? it : (name, fn) => { fn(); });

D("helix-renderer: renderHelix orchestration", () => {
  IT("draws background layers, geometry, helix, and optional notice; uses save/restore", async () => {
    const { renderHelix } = await importRenderer();
    const ctx = makeCtx();
    renderHelix(ctx, {
      width: 300,
      height: 200,
      palette,
      NUM,
      notice: "Test Notice",
    });

    // save/restore exactly once each
    assertLike.toHaveBeenCalledTimes(ctx.save, 1);
    assertLike.toHaveBeenCalledTimes(ctx.restore, 1);

    // fillRect called 3 times by fillBackground (bg, radial, linear)
    assertLike.toHaveBeenCalledTimes(ctx.fillRect, 3);

    // gradients created by background (1 radial + 1 linear), fibonacci (1 linear), helix (1 linear) => total >= 3 linear, >=1 radial
    // Minimum assertions to be robust across refactors:
    assertLike.toBeGreaterThanOrEqual(ctx.__radialGrads.length, 1);
    assertLike.toBeGreaterThanOrEqual(ctx.__linearGrads.length, 2);

    // vesica + tree should have invoked arc at least for grid circles and 10 nodes
    assertLike.toBeGreaterThan(ctx.arc.__calls.length, 10);

    // helix should produce many line segments (polylines + rungs)
    assertLike.toBeGreaterThan(ctx.lineTo.__calls.length, 50);

    // notice should be drawn once with the trimmed message near bottom
    assertLike.toHaveBeenCalledTimes(ctx.fillText, 1);
    const [msgArg] = ctx.fillText.__calls[0];
    assertLike.toBe(msgArg, "Test Notice");
  });

  IT("does not draw notice when notice is blank or whitespace", async () => {
    const { renderHelix } = await importRenderer();
    const ctx = makeCtx();
    renderHelix(ctx, {
      width: 320,
      height: 180,
      palette,
      NUM,
      notice: "   \n  ",
    });
    // No fillText calls
    assertLike.toHaveBeenCalledTimes(ctx.fillText, 0);
  });

  IT("handles minimal canvas size without throwing and still paints background", async () => {
    const { renderHelix } = await importRenderer();
    const ctx = makeCtx();
    renderHelix(ctx, {
      width: 1,
      height: 1,
      palette,
      NUM,
      notice: "",
    });
    // Even in tiny canvas, background should paint 3 rects
    assertLike.toHaveBeenCalledTimes(ctx.fillRect, 3);
    // No notice
    assertLike.toHaveBeenCalledTimes(ctx.fillText, 0);
  });
});

D("helix-renderer: gradient composition and parameters", () => {
  IT("background radial gradient is centered near top and spans canvas", async () => {
    const { renderHelix } = await importRenderer();
    const width = 400;
    const height = 300;
    const ctx = makeCtx();
    renderHelix(ctx, { width, height, palette, NUM, notice: "" });

    // At least one radial gradient should exist
    assertLike.toBeGreaterThanOrEqual(ctx.__radialGrads.length, 1);
    const rg = ctx.__radialGrads[0];
    // createRadialGradient(cx1, cy1, r1, cx2, cy2, r2)
    const [cx1, cy1, r1, cx2, cy2, r2] = rg.__args;
    // center x should be width/2 for both, per implementation
    assertLike.toBeCloseTo(cx1, width / 2, 5);
    assertLike.toBeCloseTo(cx2, width / 2, 5);
    // focus y near 0.18 * height for cy1
    assertLike.toBeCloseTo(cy1, height * 0.18, 5);
    // outer center y is height/2
    assertLike.toBeCloseTo(cy2, height / 2, 5);
    // stops should include 0 and 1 (fuzzy)
    const stopOffsets = rg.stops.map(s => s[0]);
    const has0 = stopOffsets.some(o => Math.abs(o - 0) < 1e-6);
    const has1 = stopOffsets.some(o => Math.abs(o - 1) < 1e-6);
    assertLike.truthy(has0);
    assertLike.truthy(has1);
  });
});

D("helix-renderer: robustness with unusual inputs", () => {
  IT("handles extremely large canvas sizes without exceeding safe call patterns", async () => {
    const { renderHelix } = await importRenderer();
    const ctx = makeCtx();
    renderHelix(ctx, {
      width: 4000,
      height: 3000,
      palette,
      NUM,
      notice: "Big",
    });
    // Ensure it finished orchestration
    assertLike.toHaveBeenCalledTimes(ctx.save, 1);
    assertLike.toHaveBeenCalledTimes(ctx.restore, 1);
    // Background still exactly 3 rect fills
    assertLike.toHaveBeenCalledTimes(ctx.fillRect, 3);
  });

  IT("trims notice and still renders when extra spaces present", async () => {
    const { renderHelix } = await importRenderer();
    const ctx = makeCtx();
    renderHelix(ctx, {
      width: 600,
      height: 400,
      palette,
      NUM,
      notice: "   Sacred   ",
    });
    assertLike.toHaveBeenCalledTimes(ctx.fillText, 1);
    const [msg] = ctx.fillText.__calls[0];
    assertLike.toBe(msg, "Sacred");
  });
});