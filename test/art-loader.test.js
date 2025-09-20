/**
 * Framework: Jest
 * New comprehensive tests for src/art-loader public API.
 */
const path = require('path');

describe('art-loader', () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    process.env = { ...ORIGINAL_ENV };
  });

  afterEach(() => {
    process.env = ORIGINAL_ENV;
    jest.restoreAllMocks();
  });

  test('parses valid JSON manifest into normalized object', () => {
    jest.doMock('fs', () => ({
      readFileSync: jest.fn(() => JSON.stringify({ name: 'Poster', author: 'Eve', layers: [{ id: 'bg', src: 'bg.png' }] })),
      existsSync: jest.fn(() => true),
      statSync: jest.fn(() => ({ isFile: () => true }))
    }));
    const mod = require('../src/art-loader');
    const res = mod.loadManifest('/root/pack/art.json');
    expect(res).toEqual(expect.objectContaining({ name: 'Poster', author: 'Eve' }));
    expect(res.layers).toHaveLength(1);
  });

  test('normalizes relative layer paths against manifest directory', () => {
    const dir = path.join(process.cwd(), 'packs', 'demo');
    jest.doMock('fs', () => ({
      readFileSync: jest.fn(() => JSON.stringify({ name: 'X', author: 'Y', layers: [{ id: 'l', src: 'img/a.png' }] })),
      existsSync: jest.fn(() => true),
      statSync: jest.fn(() => ({ isFile: () => true }))
    }));
    const mod = require('../src/art-loader');
    const res = mod.loadManifest(path.join(dir, 'art.json'));
    expect(res.layers[0].src).toBe(path.join(dir, 'img', 'a.png'));
  });

  test('throws with helpful message on invalid JSON', () => {
    jest.doMock('fs', () => ({
      readFileSync: jest.fn(() => '{bad'),
      existsSync: jest.fn(() => true),
      statSync: jest.fn(() => ({ isFile: () => true }))
    }));
    const mod = require('../src/art-loader');
    expect(() => mod.loadManifest('/x.json')).toThrow(/json|parse/i);
  });

  test('rejects when image read fails', async () => {
    jest.doMock('fs', () => ({
      readFile: jest.fn((p, cb) => cb(new Error('EIO'))),
      existsSync: jest.fn(() => true)
    }));
    const mod = require('../src/art-loader');
    await expect(mod.loadImage('/img.png')).rejects.toThrow(/EIO/);
  });

  test('resolves with buffer when image read succeeds', async () => {
    const buf = Buffer.from([7, 8, 9]);
    jest.doMock('fs', () => ({
      readFile: jest.fn((p, cb) => cb(null, buf)),
      existsSync: jest.fn(() => true)
    }));
    const mod = require('../src/art-loader');
    await expect(mod.loadImage('/img.png')).resolves.toEqual(buf);
  });
});
