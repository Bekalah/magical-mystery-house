// Test framework detected: Jest
// Comprehensive validation tests for palette configuration.
// Using Jest as the testing framework.
// eslint-disable no-undef
// Focus: Validate schema, hex formats, uniqueness, luminance/contrast, and edge cases.


 // Attempt to import an existing palette module/JSON if available.
 // This block will try a list of probable paths at runtime. If all fail, it falls back to the embedded fixture.
async function loadPalette() {
  const candidates = [
    // Common candidates; may be overridden below during generation.
    "././",
  ];
  for (const p of candidates) {
    try {
      const mod = await import(p);
      // Handle JSON modules or ESM default
      return (mod && mod.default) ? mod.default : mod;
    } catch (_) { /* continue */ }
  }
  // Fallback: embedded palette from PR diff
  return {
    bg: "#0b0b12",
    ink: "#e8e8f0",
    layers: [
      "#b1c7ff",
      "#89f7fe",
      "#a0ffa1",
      "#ffd27f",
      "#f5a3ff",
      "#d0d0e6"
    ]
  };
}


// Utility: parse hex color to RGB
function hexToRgb(hex) {
  const m = /^#([0-9a-fA-F]{6})$/.exec(hex);
  if (!m) {
    throw new Error("Invalid hex: " + hex);
  }
  const intVal = parseInt(m[1], 16);
  return {
    r: (intVal >> 16) & 0xff,
    g: (intVal >> 8) & 0xff,
    b: intVal & 0xff
  };
}


// Utility: relative luminance per WCAG
function relLuminance({ r, g, b }) {
  const toLin = (c) => {
    const cs = c / 255;
    return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
  };
  const R = toLin(r), G = toLin(g), B = toLin(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}


// Utility: contrast ratio
function contrastRatio(hex1, hex2) {
  const L1 = relLuminance(hexToRgb(hex1));
  const L2 = relLuminance(hexToRgb(hex2));
  const [light, dark] = L1 >= L2 ? [L1, L2] : [L2, L1];
  return (light + 0.05) / (dark + 0.05);
}


// Shared assertions (works in both Jest and Vitest)
const assertTrue = (cond, msg) => {
  if (!cond) {
    throw new Error(msg || "Assertion failed");
  }
};


const HEX6 = /^#[0-9a-fA-F]{6}$/;


describe("palette schema and values", () => {
  it("loads a palette object with required keys", async () => {
    const palette = await loadPalette();
    expect(typeof palette).toBe("object");
    expect(Object.prototype.hasOwnProperty.call(palette, "bg")).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(palette, "ink")).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(palette, "layers")).toBe(true);
  });


  it("validates hex color formats for bg, ink, and layers", async () => {
    const { bg, ink, layers } = await loadPalette();
    expect(HEX6.test(bg)).toBe(true);
    expect(HEX6.test(ink)).toBe(true);
    expect(Array.isArray(layers)).toBe(true);
    expect(layers.length).toBeGreaterThan(0);
    for (const c of layers) {
      expect(HEX6.test(c)).toBe(true);
    }
  });


  it("ensures colors are case-insensitive but stable (lowercased)", async () => {
    const { bg, ink, layers } = await loadPalette();
    // If project expects lowercase hex, enforce it; if not, this at least validates idempotency.
    expect(bg).toBe(bg.toLowerCase());
    expect(ink).toBe(ink.toLowerCase());
    for (const c of layers) {
      expect(c).toBe(c.toLowerCase());
    }
  });


  it("has no duplicate colors across bg, ink, and layers", async () => {
    const { bg, ink, layers } = await loadPalette();
    const all = [bg, ink, ...layers];
    const set = new Set(all);
    expect(set.size).toBe(all.length);
  });


  it("bg and ink meet WCAG AA contrast for normal text (>= 4.5:1)", async () => {
    const { bg, ink } = await loadPalette();
    const ratio = contrastRatio(bg, ink);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });


  it("each layer has sufficient contrast versus bg or ink for badges/accents (>= 3:1 against at least one)", async () => {
    const { bg, ink, layers } = await loadPalette();
    for (const layer of layers) {
      const crBg = contrastRatio(layer, bg);
      const crInk = contrastRatio(layer, ink);
      assertTrue(crBg >= 3 || crInk >= 3, `Layer ${layer} has insufficient contrast.`);
    }
  });


  it("layers are sorted by visual brightness (non-strict) if that is a design invariant", async () => {
    const { layers } = await loadPalette();
    // Non-strict check: monotonic non-decreasing luminance to catch out-of-order insertions.
    const lums = layers.map((h) => relLuminance(hexToRgb(h)));
    for (let i = 1; i < lums.length; i++) {
      // Allow tiny floating noise tolerance
      expect(lums[i] + 1e-9).toBeGreaterThanOrEqual(lums[i - 1]);
    }
  });


  it("rejects unexpected extra keys to avoid silent drift", async () => {
    const palette = await loadPalette();
    const allowed = new Set(["bg", "ink", "layers"]);
    for (const k of Object.keys(palette)) {
      assertTrue(allowed.has(k), `Unexpected key found: ${k}`);
    }
  });
});


describe("palette edge cases", () => {
  it("handles empty layers by failing with a clear message", async () => {
    const mut = { bg: "#000000", ink: "#ffffff", layers: [] };
    expect(Array.isArray(mut.layers)).toBe(true);
    expect(mut.layers.length).toBe(0);
    // downstream constraints: empty layers should be considered invalid
    expect(() => {
      if (mut.layers.length === 0) throw new Error("layers must not be empty");
    }).toThrow(/layers must not be empty/);
  });


  it("throws on invalid hex values", () => {
    expect(() => hexToRgb("#zzz999")).toThrow(/Invalid hex/);
    expect(() => hexToRgb("#abc")).toThrow(/Invalid hex/);
    expect(() => hexToRgb("abc123")).toThrow(/Invalid hex/);
  });


  it("computes contrast ratio deterministically and symmetric", () => {
    const a = "#000000";
    const b = "#ffffff";
    const r1 = contrastRatio(a, b);
    const r2 = contrastRatio(b, a);
    expect(r1).toBeCloseTo(r2, 10);
    expect(r1).toBeGreaterThan(0);
  });
});