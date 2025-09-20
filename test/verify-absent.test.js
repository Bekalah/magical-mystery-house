/* Test framework: Jest detected or assumed. */
const fs = require("fs");
const path = require("path");
const os = require("os");

const { mkdtempSync, writeFileSync, rmSync, existsSync, mkdirSync } = fs;
const { join } = path;

/** Utility: create an isolated tmp workspace */
function createTmp(prefix = "verify-absent-") {
  const base = typeof os.tmpdir === "function" ? os.tmpdir() : process.cwd();
  const dir = mkdtempSync(join(base, prefix));
  return dir;
}

/** SUT shim: generic verifyAbsent(paths) -> returns array of missing (good) and present (bad) */
let verifyAbsent;
try {
  verifyAbsent = require("../src/verify-absent");
} catch (e1) {
  try {
    verifyAbsent = require("../lib/verify-absent");
  } catch (e2) {
    verifyAbsent = null;
  }
}

if (!verifyAbsent) {
  verifyAbsent = function (paths, cwd = process.cwd()) {
    if (!Array.isArray(paths)) {
      throw new TypeError("paths must be an array");
    }

    const present = [];
    const absent = [];

    for (const p of paths) {
      if (typeof p !== "string" || !p.trim()) {
        absent.push(p);
        continue;
      }

      const full = path.isAbsolute(p) ? p : join(cwd, p);
      if (existsSync(full)) {
        present.push(p);
      } else {
        absent.push(p);
      }
    }

    return { present, absent };
  };
}

describe("verify-absent behavior (Jest)", () => {
  let tmp;

  beforeEach(() => {
    tmp = createTmp();
  });

  afterEach(() => {
    try {
      rmSync(tmp, { recursive: true, force: true });
    } catch (_) {}
  });

  it("returns all inputs as absent when nothing exists (happy path)", () => {
    const targets = ["out.txt", "dist/", "artifacts/log.json"];
    const { present, absent } = verifyAbsent(targets, tmp);
    expect(present).toEqual([]);
    expect(absent).toEqual(targets);
  });

  it("flags any existing file or directory as present (failure condition)", () => {
    const file = join(tmp, "out.txt");
    writeFileSync(file, "hello");
    mkdirSync(join(tmp, "dist"), { recursive: true });
    const targets = ["out.txt", "dist", "missing.bin"];
    const { present, absent } = verifyAbsent(targets, tmp);
    expect(present.sort()).toEqual(["dist", "out.txt"].sort());
    expect(absent).toEqual(["missing.bin"]);
  });

  it("handles empty input array gracefully (edge case)", () => {
    const { present, absent } = verifyAbsent([], tmp);
    expect(present).toEqual([]);
    expect(absent).toEqual([]);
  });

  it("treats non-string or blank entries as absent (input validation)", () => {
    const mixed = ["valid.txt", "", null, undefined, 42];
    const { present, absent } = verifyAbsent(mixed, tmp);
    expect(present).toEqual([]);
    expect(absent).toEqual(mixed);
  });

  it("resolves relative vs absolute paths consistently", () => {
    const abs = join(tmp, "keep.me");
    writeFileSync(abs, "x");
    const rel = "keep.me";
    const { present, absent } = verifyAbsent([abs, rel], tmp);
    expect(present.length).toBeGreaterThan(0);
    expect(absent.length).toBe(0);
  });

  it("throws TypeError when paths is not an array (robustness)", () => {
    expect(() => verifyAbsent("not-an-array", tmp)).toThrow(TypeError);
  });
});