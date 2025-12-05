/**
 * ⊙ Rollup.Config
 * 
 * @alchemical Rollup.Config
 * @element N/A
 * @symbol ⊙
 * 
 * @license CC0-1.0 - Public Domain
 */

import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/index.mjs",
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "dist",
    }),
  ],
  external: [
    "circus",
    "d3-hierarchy",
    "d3-force",
    "d3-selection",
    "graphql",
    "async-mutex",
    "fast-xml-parser",
    "marked",
  ],
};
