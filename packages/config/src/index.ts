/**
 * index
 * 
 * @package @cathedral/config
 */
/**
 * @cathedral/config
 * Shared configuration constants for Cathedral monorepo
 */

const getEnv = (key: string, fallback = ""): string => {
    const env =
        (globalThis as any)?.process?.env as Record<string, string | undefined> | undefined;
    return env?.[key] ?? fallback;
};

export const CATHEDRAL_CONFIG = {
    codex: {
        nodeCount: 144,
        ratio: "144:99",
        categories: 8,
    },
    arcana: {
        majorCount: 22,
        aspectCount: 3, // divine, shadow, harmony
    },
    build: {
        nodeEnv: getEnv("NODE_ENV", "development"),
        target: "esnext",
        minify: true,
    },
    azure: {
        endpoint: getEnv("AZURE_AI_STUDIO_ENDPOINT", ""),
        apiKey: getEnv("AZURE_AI_STUDIO_KEY", ""),
    },
} as const;

export const SACRED_GEOMETRY_PATTERNS = [
  "flower-of-life",
  "metatrons-cube",
  "vesica-piscis",
  "golden-spiral",
  "seed-of-life",
  "tree-of-life",
] as const;

export const ARCANA_ELEMENTS = {
  fire: [1, 8, 13, 19], // Magician, Strength, Death, Sun
  water: [2, 7, 12, 18], // High Priestess, Chariot, Hanged Man, Moon
  air: [0, 6, 15, 20], // Fool, Lovers, Devil, Judgement
  earth: [3, 4, 5, 21], // Empress, Emperor, Hierophant, World
  spirit: [9, 10, 11, 14, 16, 17], // Hermit, Wheel, Justice, Temperance, Tower, Star
} as const;

/**
 * ⚗️ SacredPattern - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export type SacredPattern = (typeof SACRED_GEOMETRY_PATTERNS)[number];
