/**
 * Testing library/framework: Vitest with jsdom environment.
 * If your repo uses Jest, replace:
 *   import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
 * with:
 *   import { describe, it, expect, beforeEach, afterEach, jest as vi } from "@jest/globals";
 * and keep the rest as-is (we alias jest -> vi for API parity).
 *
 * Focus: Inline module in index.html (functions: loadJSON, normalizePalette, applyDocumentPalette)
 * and bootstrap behavior (status text, CSS vars, renderHelix invocation).
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

/* Inline module source extracted from index.html <script type="module"> ... </script> */
const SCRIPT_SOURCE = `
import { renderHelix } from "./js/helix-renderer.mjs";

const elStatus = document.getElementById("status");
const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");

async function loadJSON(path) {
  try {
    const res = await fetch(path, { cache: "no-store" });
    if (\!res.ok) throw new Error(String(res.status));
    return await res.json();
  } catch (err) {
    console.warn("Palette unavailable, using fallback palette.", err);
    return null;
  }
}

function normalizePalette(candidate, fallback) {
  if (\!candidate) return fallback;
  const bg = typeof candidate.bg === "string" ? candidate.bg : fallback.bg;
  const ink = typeof candidate.ink === "string" ? candidate.ink : fallback.ink;
  const hasLayers = Array.isArray(candidate.layers) && candidate.layers.length >= 6;
  const rawLayers = hasLayers ? candidate.layers.slice(0, 6) : fallback.layers;
  const trimmed = rawLayers.map((value) => (typeof value === "string" ? value.trim() : ""));
  const layers = trimmed.map((value, index) => value || fallback.layers[index]);
  return { bg, ink, layers };
}

function applyDocumentPalette(palette) {
  const root = document.documentElement.style;
  root.setProperty("--bg", palette.bg);
  root.setProperty("--ink", palette.ink);
}

const defaults = {
  palette: {
    bg:"#0b0b12",
    ink:"#e8e8f0",
    layers:["#b1c7ff","#89f7fe","#a0ffa1","#ffd27f","#f5a3ff","#d0d0e6"]
  }
};

const paletteData = await loadJSON("./data/palette.json");
const active = normalizePalette(paletteData, defaults.palette);
applyDocumentPalette(active);
elStatus.textContent = paletteData ? "Palette loaded." : "Palette missing; using safe fallback.";

// Numerology constants used by geometry routines (3, 7, 9, 11, 22, 33, 99, 144)
const NUM = { THREE:3, SEVEN:7, NINE:9, ELEVEN:11, TWENTYTWO:22, THIRTYTHREE:33, NINETYNINE:99, ONEFORTYFOUR:144 };

// ND-safe rationale: render once, no motion, layered order preserves depth gently.
renderHelix(ctx, { width:canvas.width, height:canvas.height, palette:active, NUM });
`;

/* Helpers to evaluate the inline module inside the jsdom test environment */
function stripImport(script) {
  return script.replace(/^[ \\t]*import\\s+\\{[^}]+\\}\\s+from\\s+["'][^"']+["'];?\\s*/m, "");
}

function prepareDom() {
  document.body.innerHTML = `
    <header>
      <div><strong>Cosmic Helix Renderer</strong> — layered sacred geometry (offline, ND-safe)</div>
      <div class="status" id="status">Loading palette...</div>
    </header>
    <canvas id="stage" width="1440" height="900" aria-label="Layered sacred geometry canvas"></canvas>
  `;
}

async function runModule({ fetchImpl, renderHelixImpl } = {}) {
  const code = stripImport(SCRIPT_SOURCE) + `
    return { loadJSON, normalizePalette, applyDocumentPalette, defaults, NUM, elStatus, canvas, ctx, active, paletteData };
  `;
  // Inject window/document/fetch/renderHelix/console into an async IIFE
  const runner = new Function(
    "window",
    "document",
    "fetch",
    "renderHelix",
    "console",
    "return (async () => { " + code + " })()"
  );
  return runner(window, document, fetchImpl ?? fetch, renderHelixImpl ?? (() => {}), console);
}

let ctxStub;

beforeEach(() => {
  prepareDom();
  ctxStub = {};
  // Provide a minimal canvas context to avoid jsdom limitations
  Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
    configurable: true,
    writable: true,
    value: vi.fn(() => ctxStub)
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

describe("index.html module", () => {
  describe("bootstrap integration", () => {
    it("applies loaded palette and calls renderHelix with normalized options", async () => {
      const palette = {
        bg: "#101010",
        ink: "#fafafa",
        layers: ["  #1  ", "#2", "#3", "#4", "#5", "#6", "#7"] // extra layer ignored; trims whitespace
      };
      const fetchMock = vi.fn(async () => ({ ok: true, json: async () => palette }));
      const renderMock = vi.fn();

      const api = await runModule({ fetchImpl: fetchMock, renderHelixImpl: renderMock });

      expect(fetchMock).toHaveBeenCalledOnce();
      expect(document.getElementById("status").textContent).toBe("Palette loaded.");
      expect(document.documentElement.style.getPropertyValue("--bg")).toBe("#101010");
      expect(document.documentElement.style.getPropertyValue("--ink")).toBe("#fafafa");

      expect(renderMock).toHaveBeenCalledTimes(1);
      const [ctxArg, opts] = renderMock.mock.calls[0];
      expect(ctxArg).toBe(ctxStub);
      expect(opts.width).toBe(1440);
      expect(opts.height).toBe(900);
      expect(opts.palette.bg).toBe("#101010");
      expect(opts.palette.ink).toBe("#fafafa");
      expect(opts.palette.layers).toEqual(["#1", "#2", "#3", "#4", "#5", "#6"]);
      expect(opts.NUM).toEqual({
        THREE: 3,
        SEVEN: 7,
        NINE: 9,
        ELEVEN: 11,
        TWENTYTWO: 22,
        THIRTYTHREE: 33,
        NINETYNINE: 99,
        ONEFORTYFOUR: 144
      });

      // Sanity check: the active palette on the module is normalized as expected
      expect(api.active.layers.length).toBe(6);
    });

    it("falls back to defaults when palette fetch fails", async () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const fetchMock = vi.fn(async () => { throw new Error("network"); });
      const renderMock = vi.fn();

      const api = await runModule({ fetchImpl: fetchMock, renderHelixImpl: renderMock });

      expect(warnSpy).toHaveBeenCalled();
      expect(document.getElementById("status").textContent).toBe("Palette missing; using safe fallback.");
      expect(document.documentElement.style.getPropertyValue("--bg")).toBe("#0b0b12");
      expect(document.documentElement.style.getPropertyValue("--ink")).toBe("#e8e8f0");
      expect(renderMock).toHaveBeenCalledTimes(1);
      const [, opts] = renderMock.mock.calls[0];
      expect(opts.palette).toEqual(api.defaults.palette);
    });

    it("falls back to defaults when response is non-ok", async () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const fetchMock = vi.fn(async () => ({ ok: false, status: 500, json: async () => ({}) }));
      const renderMock = vi.fn();

      const api = await runModule({ fetchImpl: fetchMock, renderHelixImpl: renderMock });

      expect(warnSpy).toHaveBeenCalled();
      expect(document.getElementById("status").textContent).toBe("Palette missing; using safe fallback.");
      const [, opts] = renderMock.mock.calls[0];
      expect(opts.palette).toEqual(api.defaults.palette);
    });
  });

  describe("normalizePalette (pure)", () => {
    it("returns fallback when candidate is null/undefined", async () => {
      const api = await runModule({
        fetchImpl: vi.fn(async () => ({ ok: true, json: async () => null })),
        renderHelixImpl: vi.fn()
      });
      expect(api.normalizePalette(null, api.defaults.palette)).toEqual(api.defaults.palette);
      expect(api.normalizePalette(undefined, api.defaults.palette)).toEqual(api.defaults.palette);
    });

    it("uses fallback layers when candidate provides fewer than six layers", async () => {
      const api = await runModule({
        fetchImpl: vi.fn(async () => ({ ok: true, json: async () => ({}) })),
        renderHelixImpl: vi.fn()
      });
      const candidate = { bg: "#222", ink: "#eee", layers: ["#a", "#b", "#c", "#d", "#e"] }; // only 5
      const out = api.normalizePalette(candidate, api.defaults.palette);
      expect(out.layers).toEqual(api.defaults.palette.layers);
    });

    it("merges candidate with fallback, trimming strings and limiting to six layers", async () => {
      const api = await runModule({
        fetchImpl: vi.fn(async () => ({ ok: true, json: async () => ({}) })),
        renderHelixImpl: vi.fn()
      });

      const candidate = {
        bg: null,
        ink: "  #abc  ",
        layers: ["  #111  ", "", undefined, "#444", 5, "#666", "#777", "#888"]
      };
      const out = api.normalizePalette(candidate, api.defaults.palette);

      expect(out.bg).toBe(api.defaults.palette.bg);       // bg falls back
      expect(out.ink).toBe("#abc");                       // ink trimmed
      expect(out.layers).toHaveLength(6);                 // limited to 6
      expect(out.layers).toEqual([
        "#111",
        api.defaults.palette.layers[1],
        api.defaults.palette.layers[2],
        "#444",
        api.defaults.palette.layers[4],
        "#666"
      ]);
    });
  });

  describe("applyDocumentPalette", () => {
    it("sets CSS custom properties on :root", async () => {
      const api = await runModule({
        fetchImpl: vi.fn(async () => ({ ok: true, json: async () => ({}) })),
        renderHelixImpl: vi.fn()
      });

      api.applyDocumentPalette({ bg: "#222", ink: "#eee", layers: [] });
      expect(document.documentElement.style.getPropertyValue("--bg")).toBe("#222");
      expect(document.documentElement.style.getPropertyValue("--ink")).toBe("#eee");
    });
  });

  describe("loadJSON", () => {
    it("resolves with parsed JSON on success", async () => {
      const payload = { x: 1 };
      const fetchMock = vi.fn(async () => ({ ok: true, json: async () => payload }));
      const api = await runModule({ fetchImpl: fetchMock, renderHelixImpl: vi.fn() });
      await expect(api.loadJSON("/any")).resolves.toEqual(payload);
    });

    it("returns null when response is non-ok", async () => {
      const fetchMock = vi.fn(async () => ({ ok: false, status: 404, json: async () => ({}) }));
      const api = await runModule({ fetchImpl: fetchMock, renderHelixImpl: vi.fn() });
      await expect(api.loadJSON("/missing")).resolves.toBeNull();
    });

    it("returns null on fetch error", async () => {
      const fetchMock = vi.fn(async () => { throw new Error("boom"); });
      const api = await runModule({ fetchImpl: fetchMock, renderHelixImpl: vi.fn() });
      await expect(api.loadJSON("/err")).resolves.toBeNull();
    });
  });
});