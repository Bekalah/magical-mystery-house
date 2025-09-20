// Framework note: This suite uses standard describe/it/expect compatible with Vitest or Jest.
// If using Vitest, ensure test environment is jsdom (e.g., in vitest.config: test.environment = "jsdom").
// If using Jest, ensure testEnvironment is "jsdom" or use @jest-environment jsdom per-file.

/* @jest-environment jsdom */

// Utilities to simulate the inline module logic of index.html without executing the real module loader.
// We reconstruct the critical parts (DOM, fetch, and renderHelix import) and assert behaviors.

const HTML_SNIPPET = String.raw`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Cosmic Helix Renderer (ND-safe, Offline)</title>
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="color-scheme" content="light dark">
</head>
<body>
  <header>
    <div><strong>Cosmic Helix Renderer</strong> &mdash; layered sacred geometry (offline, ND-safe)</div>
    <div class="status" id="status">Loading palette...</div>
  </header>

  <canvas id="stage" width="1440" height="900" aria-label="Layered sacred geometry canvas"></canvas>
  <p class="note">This static renderer encodes Vesica, Tree-of-Life, Fibonacci, and a static double-helix lattice. No animation, no autoplay, no external libraries. Open this file directly.</p>
</body>
</html>`;

// Minimal shim matching index.html logic, but with DI hooks for fetch and renderHelix.
async function boot({ fetchImpl, renderHelixImpl, doc = document }) {
  const elStatus = doc.getElementById("status");
  const canvas = doc.getElementById("stage");

  // Guard: canvas might be missing in some environments
  const ctx = canvas && canvas.getContext ? canvas.getContext("2d") : null;

  async function loadJSON(path) {
    try {
      const res = await fetchImpl(path, { cache: "no-store" });
      if (!res || !("ok" in res)) throw new Error("invalid response");
      if (!res.ok) throw new Error(String(res.status));
      return await res.json();
    } catch (error) {
      return null;
    }
  }

  const defaults = {
    palette: {
      bg: "#0b0b12",
      ink: "#e8e8f0",
      layers: ["#b1c7ff", "#89f7fe", "#a0ffa1", "#ffd27f", "#f5a3ff", "#d0d0e6"]
    }
  };

  const palette = await loadJSON("./data/palette.json");
  const active = palette || defaults.palette;
  if (elStatus) {
    elStatus.textContent = palette ? "Palette loaded." : "Palette missing; using safe fallback.";
  }

  const NUM = {
    THREE: 3,
    SEVEN: 7,
    NINE: 9,
    ELEVEN: 11,
    TWENTYTWO: 22,
    THIRTYTHREE: 33,
    NINETYNINE: 99,
    ONEFORTYFOUR: 144
  };

  // Only attempt render if we have a 2D context
  if (ctx) {
    renderHelixImpl(ctx, { width: canvas.width, height: canvas.height, palette: active, NUM });
  }

  return { palette, active, NUM, statusText: (elStatus && elStatus.textContent) || "" };
}

// Helper: Setup DOM per test
function setupDOM(html = HTML_SNIPPET) {
  document.documentElement.innerHTML = "";
  document.body.innerHTML = "";
  document.open();
  document.write(html);
  document.close();
}

describe("index.html structure", () => {
  it("renders expected header, status, and canvas elements", () => {
    setupDOM();
    const title = document.querySelector("title");
    const status = document.getElementById("status");
    const canvas = document.getElementById("stage");

    expect(title).toBeTruthy();
    expect(title.textContent).toContain("Cosmic Helix Renderer");
    expect(status).toBeTruthy();
    expect(status.textContent).toBe("Loading palette...");
    expect(canvas).toBeTruthy();
    expect(canvas.getAttribute("aria-label")).toBe("Layered sacred geometry canvas");
    expect(Number(canvas.getAttribute("width"))).toBe(1440);
    expect(Number(canvas.getAttribute("height"))).toBe(900);
  });
});

describe("palette loading and fallback", () => {
  it("uses remote palette when fetch succeeds and updates status", async () => {
    setupDOM();
    const mockPalette = {
      palette: {
        bg: "#000111",
        ink: "#ffffff",
        layers: ["#111", "#222"]
      }
    };
    const fetchImpl = (typeof vi !== "undefined" && vi && typeof vi.fn === "function") ? vi.fn() : jest.fn();
    fetchImpl.mockResolvedValue({
      ok: true,
      json: async () => mockPalette
    });

    const renderHelixImpl = (typeof vi !== "undefined" && vi && typeof vi.fn === "function") ? vi.fn() : jest.fn();

    const result = await boot({ fetchImpl, renderHelixImpl });

    expect(fetchImpl).toHaveBeenCalledWith("./data/palette.json", { cache: "no-store" });
    expect(result.palette).toEqual(mockPalette);
    expect(result.active).toEqual(mockPalette); // active should be the loaded palette object
    expect(result.statusText).toBe("Palette loaded.");
    expect(renderHelixImpl).toHaveBeenCalledTimes(1);
    const [ctxArg, optsArg] = renderHelixImpl.mock.calls[0];

    expect(ctxArg).toBeTruthy();
    expect(optsArg.width).toBe(1440);
    expect(optsArg.height).toBe(900);
    expect(optsArg.palette).toEqual(mockPalette);
    // NUM integrity
    expect(optsArg.NUM).toMatchObject({
      THREE: 3, SEVEN: 7, NINE: 9, ELEVEN: 11, TWENTYTWO: 22, THIRTYTHREE: 33, NINETYNINE: 99, ONEFORTYFOUR: 144
    });
  });

  it("falls back to defaults and updates status when fetch returns non-OK", async () => {
    setupDOM();
    const fetchImpl = (typeof vi !== "undefined" && vi && typeof vi.fn === "function") ? vi.fn() : jest.fn();
    fetchImpl.mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => { throw new Error("no json"); }
    });
    const renderHelixImpl = (typeof vi !== "undefined" && vi && typeof vi.fn === "function") ? vi.fn() : jest.fn();

    const result = await boot({ fetchImpl, renderHelixImpl });

    expect(result.palette).toBeNull();
    expect(result.active).toEqual({
      bg: "#0b0b12",
      ink: "#e8e8f0",
      layers: ["#b1c7ff", "#89f7fe", "#a0ffa1", "#ffd27f", "#f5a3ff", "#d0d0e6"]
    });
    expect(result.statusText).toBe("Palette missing; using safe fallback.");
    expect(renderHelixImpl).toHaveBeenCalledTimes(1);
  });

  it("falls back when fetch throws (network error) and still renders", async () => {
    setupDOM();
    const fetchImpl = (typeof vi !== "undefined" && vi && typeof vi.fn === "function") ? vi.fn() : jest.fn();
    fetchImpl.mockRejectedValue(new Error("network down"));
    const renderHelixImpl = (typeof vi !== "undefined" && vi && typeof vi.fn === "function") ? vi.fn() : jest.fn();

    const result = await boot({ fetchImpl, renderHelixImpl });

    expect(result.palette).toBeNull();
    expect(result.active.layers.length).toBeGreaterThan(0);
    expect(result.statusText).toBe("Palette missing; using safe fallback.");
    expect(renderHelixImpl).toHaveBeenCalledTimes(1);
  });
});

describe("rendering safety", () => {
  it("does not crash if canvas is missing a 2D context", async () => {
    // Remove canvas getContext by replacing canvas element with a stub
    setupDOM();
    const realCanvas = document.getElementById("stage");
    const stub = realCanvas.cloneNode(true);
    // remove getContext
    stub.getContext = undefined;
    realCanvas.replaceWith(stub);

    const fetchImpl = (typeof vi !== "undefined" && vi && typeof vi.fn === "function") ? vi.fn() : jest.fn();
    fetchImpl.mockResolvedValue({ ok: true, json: async () => ({ palette: { bg: "#111", ink: "#eee", layers: [] } })});
    const renderHelixImpl = (typeof vi !== "undefined" && vi && typeof vi.fn === "function") ? vi.fn() : jest.fn();

    const result = await boot({ fetchImpl, renderHelixImpl });

    expect(result.statusText).toBeDefined();
    expect(renderHelixImpl).not.toHaveBeenCalled(); // no ctx -> no render
  });

  it("passes the exact canvas dimensions to renderer", async () => {
    setupDOM();
    const canvas = document.getElementById("stage");
    canvas.setAttribute("width", "1024");
    canvas.setAttribute("height", "576");

    const fetchImpl = (typeof vi !== "undefined" && vi && typeof vi.fn === "function") ? vi.fn() : jest.fn();
    fetchImpl.mockResolvedValue({ ok: true, json: async () => ({ palette: { bg: "#222", ink: "#ddd", layers: ["#abc"] } })});
    const renderHelixImpl = (typeof vi !== "undefined" && vi && typeof vi.fn === "function") ? vi.fn() : jest.fn();

    await boot({ fetchImpl, renderHelixImpl });

    const [, opts] = renderHelixImpl.mock.calls[0];
    expect(opts.width).toBe(1024);
    expect(opts.height).toBe(576);
  });
});

// Back-compat: provide globals for either Vitest or Jest
function ensureTestGlobals() {
  if (typeof vi === "undefined" && typeof jest === "undefined") {
    // Minimal fake to avoid ReferenceErrors if neither is present (should not happen in real runs)
    globalThis.jest = {
      fn: ((impl) => {
        const calls = [];
        const f = (...args) => { calls.push(args); return impl && impl(...args); };
        f.mock = { calls };
        f.mockResolvedValue = (v) => { impl = async () => v; return f; };
        f.mockRejectedValue = (e) => { impl = async () => { throw e; }; return f; };
        return f;
      })
    };
    globalThis.describe = (name, fn) => fn();
    globalThis.it = (name, fn) => fn();
    globalThis.expect = (val) => ({
      toBe: (x) => { if (val !== x) throw new Error("Expectation failed"); },
      toBeTruthy: () => { if (!val) throw new Error("Expectation failed"); },
      toEqual: (x) => {
        const a = JSON.stringify(val); const b = JSON.stringify(x);
        if (a !== b) throw new Error(`Expectation failed: ${a} !== ${b}`);
      },
      toMatchObject: (x) => {
        const ok = Object.entries(x).every(([k,v]) => (val && val[k]) === v);
        if (!ok) throw new Error("Expectation failed");
      },
      toHaveBeenCalledTimes: (n) => {
        const calls = (val.mock && val.mock.calls) || [];
        if (calls.length !== n) throw new Error(`Expected ${n} calls, got ${calls.length}`);
      },
      toHaveBeenCalledWith: (...args) => {
        const calls = (val.mock && val.mock.calls) || [];
        const found = calls.some(c => JSON.stringify(c) === JSON.stringify(args));
        if (!found) throw new Error("Call with args not found");
      },
      toBeDefined: () => { if (typeof val === "undefined") throw new Error("Expected defined"); },
      toBeGreaterThan: (n) => { if (!(val > n)) throw new Error("Expected greater than"); }
    });
  }
}
ensureTestGlobals();